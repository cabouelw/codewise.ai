/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://codewise.ai',
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
      const blogFiles = fs.readdirSync(blogDir)
      blogFiles.forEach((file) => {
        if (file.endsWith('.mdx')) {
          const slug = file.replace(/\.mdx$/, '')
          result.push({
            loc: `/blog/${slug}`,
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: new Date().toISOString(),
          })
        }
      })
    } catch (error) {
      console.warn('Could not read blog directory:', error)
    }

    // Add tools
    const toolsPath = path.join(process.cwd(), 'src/data/tools.json')
    try {
      const toolsData = JSON.parse(fs.readFileSync(toolsPath, 'utf8'))
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