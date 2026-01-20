/* eslint-disable no-console */

const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

function toSlug(value) {
  return String(value).toLowerCase().trim().replace(/\s+/g, "-")
}

function startOfToday() {
  const now = new Date()
  now.setUTCHours(0, 0, 0, 0)
  return now
}

const today = startOfToday()

function clampToToday(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return today
  return date > today ? today : date
}

function formatDate(date) {
  return clampToToday(date).toISOString().slice(0, 10)
}

function getSafeFileDate(filePath) {
  try {
    const stats = fs.statSync(filePath)
    return clampToToday(stats.mtime)
  } catch {
    return today
  }
}

function getLatestDate(dates) {
  return dates.reduce((latest, current) => (current > latest ? current : latest), today)
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function toEntry({ url, lastModified, changeFrequency, priority }) {
  return {
    url,
    lastModified: lastModified ? formatDate(lastModified) : undefined,
    changeFrequency,
    priority: typeof priority === "number" ? priority : undefined,
  }
}

function buildXml(entries) {
  const lines = []
  lines.push('<?xml version="1.0" encoding="UTF-8"?>')
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

  for (const entry of entries) {
    lines.push("  <url>")
    lines.push(`    <loc>${escapeXml(entry.url)}</loc>`)
    if (entry.lastModified) lines.push(`    <lastmod>${escapeXml(entry.lastModified)}</lastmod>`)
    if (entry.changeFrequency) lines.push(`    <changefreq>${escapeXml(entry.changeFrequency)}</changefreq>`)
    if (typeof entry.priority === "number") lines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`)
    lines.push("  </url>")
  }

  lines.push("</urlset>")
  lines.push("")
  return lines.join("\n")
}

function main() {
  const repoRoot = process.cwd()
  const contentDirectory = path.join(repoRoot, "src/content/blog")
  const toolsJsonPath = path.join(repoRoot, "src/data/tools.json")
  const outputPath = path.join(repoRoot, "public/sitemap.xml")

  const rawSiteUrl =
    process.env.SITE_URL ||
    // Vercel-provided URLs usually do NOT include your preferred canonical host (e.g. www).
    // Prefer explicit env vars above; otherwise default to the canonical domain.
    "https://www.codewize-ai.website"

  const siteUrl = String(rawSiteUrl).replace(/\/$/, "").startsWith("http")
    ? String(rawSiteUrl).replace(/\/$/, "")
    : `https://${String(rawSiteUrl).replace(/\/$/, "")}`

  const blogFiles = fs.existsSync(contentDirectory)
    ? fs.readdirSync(contentDirectory).filter((file) => file.endsWith(".mdx"))
    : []

  const blogPosts = blogFiles.map((file) => {
    const filePath = path.join(contentDirectory, file)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)
    const slug = file.replace(/\.mdx$/, "")

    const frontMatterDate = data.updatedAt || data.date
    const parsedFrontmatter = frontMatterDate ? clampToToday(new Date(frontMatterDate)) : null
    const lastModified =
      parsedFrontmatter && !Number.isNaN(parsedFrontmatter.getTime()) ? parsedFrontmatter : getSafeFileDate(filePath)

    return {
      slug,
      category: data.category,
      author: data.author,
      lastModified,
    }
  })

  const latestContentDate = getLatestDate(blogPosts.map((post) => post.lastModified))

  const staticPages = [
    toEntry({ url: `${siteUrl}/`, lastModified: latestContentDate, changeFrequency: "daily", priority: 1 }),
    toEntry({ url: `${siteUrl}/blog`, lastModified: latestContentDate, changeFrequency: "weekly", priority: 0.9 }),
    toEntry({ url: `${siteUrl}/tools`, changeFrequency: "weekly", priority: 0.75 }),
    toEntry({ url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.6 }),
    toEntry({ url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.6 }),
    toEntry({ url: `${siteUrl}/privacy-policy`, changeFrequency: "yearly", priority: 0.5 }),
  ]

  const postEntries = [...blogPosts]
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((post) =>
      toEntry({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: post.lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      })
    )

  const categories = new Map()
  for (const post of blogPosts) {
    if (!post.category) continue
    const slug = toSlug(post.category)
    const existing = categories.get(slug)
    const nextLastModified = !existing || post.lastModified > existing.lastModified ? post.lastModified : existing.lastModified
    categories.set(slug, {
      count: (existing?.count ?? 0) + 1,
      lastModified: nextLastModified,
    })
  }

  const categoryEntries = Array.from(categories.entries())
    .filter(([, meta]) => meta.count >= 2)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([slug, meta]) =>
      toEntry({
        url: `${siteUrl}/blog/category/${slug}`,
        lastModified: meta.lastModified,
        changeFrequency: "weekly",
        priority: 0.6,
      })
    )

  const authors = new Map()
  for (const post of blogPosts) {
    if (!post.author) continue
    const slug = toSlug(post.author)
    const existing = authors.get(slug)
    if (!existing || post.lastModified > existing) authors.set(slug, post.lastModified)
  }

  const authorEntries = Array.from(authors.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([slug, lastModified]) =>
      toEntry({
        url: `${siteUrl}/author/${slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.55,
      })
    )

  let toolsData
  try {
    toolsData = JSON.parse(fs.readFileSync(toolsJsonPath, "utf8"))
  } catch {
    toolsData = { tools: [] }
  }

  const toolEntries = [...(toolsData.tools ?? [])]
    .sort((a, b) => String(a.slug).localeCompare(String(b.slug)))
    .map((tool) =>
      toEntry({
        url: `${siteUrl}/tools/${tool.slug}`,
        changeFrequency: "weekly",
        priority: 0.7,
      })
    )

  const toolCategories = new Map()
  for (const tool of toolsData.tools ?? []) {
    if (!tool.category) continue
    const slug = toSlug(tool.category)
    toolCategories.set(slug, (toolCategories.get(slug) ?? 0) + 1)
  }

  const toolCategoryEntries = Array.from(toolCategories.entries())
    .filter(([, count]) => count >= 2)
    .map(([slug]) => slug)
    .sort((a, b) => a.localeCompare(b))
    .map((slug) =>
      toEntry({
        url: `${siteUrl}/tools/category/${slug}`,
        changeFrequency: "weekly",
        priority: 0.65,
      })
    )

  const allEntries = [
    ...staticPages,
    ...postEntries,
    ...categoryEntries,
    ...authorEntries,
    ...toolEntries,
    ...toolCategoryEntries,
  ]

  const unique = new Map()
  for (const entry of allEntries) {
    unique.set(entry.url, entry)
  }

  const finalEntries = Array.from(unique.values()).sort((a, b) => a.url.localeCompare(b.url))
  const xml = buildXml(finalEntries)

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, xml, "utf8")
  console.log(`Generated sitemap: ${path.relative(repoRoot, outputPath)} (${finalEntries.length} URLs)`)
}

main()
