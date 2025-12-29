import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { MetadataRoute } from "next"
import toolsData from "@/data/tools.json"
import { siteConfig } from "@/lib/seo"

export const dynamic = "force-static"

interface BlogMeta {
	slug: string
	category?: string
	author?: string
	lastModified: Date
}

interface DatedEntry {
	url: string
	lastModified?: Date
	changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]
	priority?: MetadataRoute.Sitemap[number]["priority"]
}

const today = startOfToday()
const siteUrl = siteConfig.url.replace(/\/$/, "")
const contentDirectory = path.join(process.cwd(), "src/content/blog")
const toolsJsonPath = path.join(process.cwd(), "src/data/tools.json")

export default function sitemap(): MetadataRoute.Sitemap {
	const blogPosts = getBlogPosts()
	const postEntries = [...blogPosts]
		.sort((a, b) => a.slug.localeCompare(b.slug))
		.map((post) =>
			toSitemapEntry({
				url: `${siteUrl}/blog/${post.slug}`,
				lastModified: post.lastModified,
				changeFrequency: "monthly",
				priority: 0.7,
			})
		)

	const categoryEntries = buildCategoryEntries(blogPosts)
	const authorEntries = buildAuthorEntries(blogPosts)

	const { toolEntries, toolCategoryEntries } = buildToolEntries()

	const latestContentDate = getLatestDate(blogPosts.map((post) => post.lastModified))

	const staticEntries = buildStaticEntries(latestContentDate)

	return [
		...staticEntries,
		...postEntries,
		...categoryEntries,
		...authorEntries,
		...toolEntries,
		...toolCategoryEntries,
	]
}

function buildStaticEntries(latestContentDate: Date): MetadataRoute.Sitemap {
	const staticPages: DatedEntry[] = [
		{
			url: `${siteUrl}/`,
			lastModified: latestContentDate,
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${siteUrl}/blog`,
			lastModified: latestContentDate,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${siteUrl}/tools`,
			changeFrequency: "weekly",
			priority: 0.75,
		},
		{
			url: `${siteUrl}/about`,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${siteUrl}/contact`,
			changeFrequency: "monthly",
			priority: 0.6,
		},
		{
			url: `${siteUrl}/privacy-policy`,
			changeFrequency: "yearly",
			priority: 0.5,
		},
	]

	return staticPages.map((entry) => toSitemapEntry(entry))
}

function buildCategoryEntries(blogPosts: BlogMeta[]): MetadataRoute.Sitemap {
	const categories = new Map<string, { count: number; lastModified: Date }>()

	blogPosts.forEach((post) => {
		if (!post.category) return
		const slug = toSlug(post.category)
		const existing = categories.get(slug)
		const nextLastModified =
			!existing || post.lastModified > existing.lastModified ? post.lastModified : existing.lastModified
		categories.set(slug, {
			count: (existing?.count ?? 0) + 1,
			lastModified: nextLastModified,
		})
	})

	return Array.from(categories.entries())
		.filter(([, meta]) => meta.count >= 2)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([slug, meta]) =>
			toSitemapEntry({
				url: `${siteUrl}/blog/category/${slug}`,
				lastModified: meta.lastModified,
				changeFrequency: "weekly",
				priority: 0.6,
			})
		)
}

function buildAuthorEntries(blogPosts: BlogMeta[]): MetadataRoute.Sitemap {
	const authors = new Map<string, Date>()

	blogPosts.forEach((post) => {
		if (!post.author) return
		const slug = toSlug(post.author)
		const existing = authors.get(slug)
		if (!existing || post.lastModified > existing) {
			authors.set(slug, post.lastModified)
		}
	})

	return Array.from(authors.entries())
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([slug, lastModified]) =>
			toSitemapEntry({
				url: `${siteUrl}/author/${slug}`,
				lastModified,
				changeFrequency: "monthly",
				priority: 0.55,
			})
		)
}

function buildToolEntries() {
	const toolEntries: MetadataRoute.Sitemap = [...toolsData.tools]
		.sort((a, b) => a.slug.localeCompare(b.slug))
		.map((tool) =>
			toSitemapEntry({
				url: `${siteUrl}/tools/${tool.slug}`,
				changeFrequency: "weekly",
				priority: 0.7,
			})
		)

	const toolCategories = new Map<string, number>()

	toolsData.tools.forEach((tool) => {
		if (!tool.category) return
		const slug = toSlug(tool.category)
		toolCategories.set(slug, (toolCategories.get(slug) ?? 0) + 1)
	})

	const toolCategoryEntries: MetadataRoute.Sitemap = Array.from(toolCategories.entries())
		.filter(([, count]) => count >= 2)
		.map(([slug]) => slug)
		.sort((a, b) => a.localeCompare(b))
		.map((slug) =>
			toSitemapEntry({
				url: `${siteUrl}/tools/category/${slug}`,
				changeFrequency: "weekly",
				priority: 0.65,
			})
		)

	return { toolEntries, toolCategoryEntries }
}

function getBlogPosts(): BlogMeta[] {
	const files = fs.readdirSync(contentDirectory).filter((file) => file.endsWith(".mdx"))

	return files.map((file) => {
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
}

function toSitemapEntry(entry: DatedEntry): MetadataRoute.Sitemap[number] {
	return {
		url: entry.url,
		...(entry.lastModified ? { lastModified: formatDate(entry.lastModified) } : {}),
		...(entry.changeFrequency ? { changeFrequency: entry.changeFrequency } : {}),
		...(typeof entry.priority === "number" ? { priority: entry.priority } : {}),
	}
}

function toSlug(value: string): string {
	return value.toLowerCase().replace(/\s+/g, "-")
}

function formatDate(date: Date): string {
	return clampToToday(date).toISOString().slice(0, 10)
}

function startOfToday(): Date {
	const now = new Date()
	now.setUTCHours(0, 0, 0, 0)
	return now
}

function clampToToday(date: Date): Date {
	if (Number.isNaN(date.getTime())) return today
	return date > today ? today : date
}

function getSafeFileDate(filePath: string): Date {
	try {
		const stats = fs.statSync(filePath)
		return clampToToday(stats.mtime)
	} catch {
		return today
	}
}

function getLatestDate(dates: Date[]): Date {
	return dates.reduce((latest, current) => (current > latest ? current : latest), today)
}
