/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://codewise-ai.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/api/', '/_next/'],
      },
    ],
  },
  transform: async (config, path) => {
    // Custom priority for different pages
    let priority = 0.7
    let changefreq = 'weekly'

    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path.startsWith('/blog')) {
      priority = 0.8
      changefreq = 'weekly'
    } else if (path.startsWith('/tools')) {
      priority = 0.9
      changefreq = 'daily'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  additionalPaths: async (config) => {
    const result = []

    // Add blog posts
    const fs = require('fs')
    const path = require('path')
    const blogDir = path.join(process.cwd(), 'src/content/blog')

    try {
      const files = fs.readdirSync(blogDir)
      const mdxFiles = files.filter(file => file.endsWith('.mdx'))

      // Add individual blog posts
      mdxFiles.forEach(file => {
        const slug = file.replace(/\.mdx$/, '')
        result.push({
          loc: `/blog/${slug}`,
          changefreq: 'monthly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        })
      })

      // Add paginated blog pages
      const POSTS_PER_PAGE = 9
      const totalPages = Math.ceil(mdxFiles.length / POSTS_PER_PAGE)
      for (let page = 2; page <= totalPages; page++) {
        result.push({
          loc: `/blog/page/${page}`,
          changefreq: 'weekly',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        })
      }

      // Add category pages
      const matter = require('gray-matter')
      const categories = new Set()

      mdxFiles.forEach(file => {
        const filePath = path.join(blogDir, file)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        if (data.category) {
          categories.add(data.category)
        }
      })

      categories.forEach(category => {
        const categorySlug = category.toLowerCase().replace(/\s+/g, '-')
        result.push({
          loc: `/blog/category/${categorySlug}`,
          changefreq: 'weekly',
          priority: 0.7,
          lastmod: new Date().toISOString(),
        })
      })

      // Add author pages
      const authors = new Set()
      mdxFiles.forEach(file => {
        const filePath = path.join(blogDir, file)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        if (data.author) {
          authors.add(data.author)
        }
      })

      authors.forEach(author => {
        const authorSlug = author.toLowerCase().replace(/\s+/g, '-')
        result.push({
          loc: `/author/${authorSlug}`,
          changefreq: 'monthly',
          priority: 0.6,
          lastmod: new Date().toISOString(),
        })
      })

    } catch (error) {
      console.error('Error generating blog sitemap:', error)
    }

    // Add tools category pages
    const toolsPath = path.join(process.cwd(), 'src/data/tools.json')
    try {
      const toolsData = JSON.parse(fs.readFileSync(toolsPath, 'utf8'))
      const toolCategories = new Set()

      toolsData.tools.forEach((tool) => {
        if (tool.category) {
          toolCategories.add(tool.category)
        }
      })

      toolCategories.forEach(category => {
        const categorySlug = category.toLowerCase().replace(/\s+/g, '-')
        result.push({
          loc: `/tools/category/${categorySlug}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        })
      })

      // Add individual tool pages
      toolsData.tools.forEach((tool) => {
        result.push({
          loc: `/tools/${tool.slug}`,
          changefreq: 'daily',
          priority: 0.9,
          lastmod: new Date().toISOString(),
        })
      })
    } catch (error) {
      console.warn('Could not read tools data:', error)
    }

    return result
  },
}