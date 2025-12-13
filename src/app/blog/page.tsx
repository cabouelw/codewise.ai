import { Metadata } from 'next'
import BlogCard from '@/components/BlogCard'
import { getAllPosts } from '@/lib/mdx/blog'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'

const POSTS_PER_PAGE = 9

export const metadata: Metadata = {
  title: 'AI Development Blog - Tutorials, Tips & Best Practices | CodeWise AI',
  description: 'Expert tutorials, in-depth guides, and latest trends in AI development. Learn how to leverage AI tools, improve your coding workflow, and stay ahead in software development.',
  keywords: ['AI development blog', 'coding tutorials', 'AI tools tutorials', 'developer guides', 'programming tips', 'AI best practices', 'software development blog', 'coding tips', 'AI trends'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://codewise-ai.vercel.app/blog',
  },
  openGraph: {
    title: 'AI Development Blog - Tutorials & Best Practices | CodeWise AI',
    description: 'Expert tutorials and guides on AI development, coding best practices, and the latest trends in software development.',
    type: 'website',
    url: 'https://codewise-ai.vercel.app/blog',
    images: [
      {
        url: '/images/blog/AI_vs_Human.png',
        width: 1200,
        height: 628,
        alt: 'AI Development Blog - Tutorials & Best Practices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Development Blog | CodeWise AI',
    description: 'Expert tutorials and guides on AI development and coding best practices.',
  },
}

export default async function BlogPage() {
  // Get all blog posts from MDX
  const blogPosts = await getAllPosts()
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE)

  // Get first page of posts
  const paginatedPosts = blogPosts.slice(0, POSTS_PER_PAGE)

  // Transform MDX posts to match BlogCard props
  const allPosts = paginatedPosts.map(post => ({
    id: post.slug,
    title: post.title,
    excerpt: post.description,
    slug: post.slug,
    publishedAt: post.date,
    readTime: post.readingTime,
    category: post.category,
    image: post.image,
    author: post.author
  }))

  // Extract unique categories from posts
  const postCategories = Array.from(new Set(blogPosts.map(post => post.category)))
  const categories = ['All', ...postCategories]

  // CollectionPage structured data
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Development Blog",
    description: "Expert tutorials, in-depth guides, and latest trends in AI development",
    url: "https://codewise-ai.vercel.app/blog",
    publisher: {
      "@type": "Organization",
      name: "CodeWise AI",
      logo: {
        "@type": "ImageObject",
        url: "https://codewise-ai.vercel.app/logo.png"
      }
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://codewise-ai.vercel.app/blog/${post.slug}`,
        name: post.title
      }))
    }
  }

  // BreadcrumbList structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://codewise-ai.vercel.app"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://codewise-ai.vercel.app/blog"
      }
    ]
  }

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Add structured data */}
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Latest Insights
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Stay updated with the latest trends, tutorials, and insights in AI and development.
            Learn from industry experts and enhance your skills.
          </p>
        </div>

        {/* Categories Filter - SEO-friendly links */}
        <div className="mb-12">
          <nav className="flex flex-wrap gap-2 justify-center" aria-label="Blog categories">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-sky-500 text-white"
              aria-current="page"
            >
              All
            </Link>
            {postCategories.map((category) => (
              <Link
                key={category}
                href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600"
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>

        {/* Featured Post */}
        {allPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Featured Article</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BlogCard {...allPosts[0]} featured={true} />
              <div className="lg:col-span-1">
                <div className="h-full flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    {allPosts[0].title}
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                    {allPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span>{new Date(allPosts[0].publishedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{allPosts[0].readTime}</span>
                    <span>•</span>
                    <span className="bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 px-2 py-1 rounded-full">
                      {allPosts[0].category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.slice(1).map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </div>

        {/* SEO-Friendly Pagination */}
        {totalPages > 1 && (
          <nav className="mt-12 flex justify-center" aria-label="Blog pagination">
            <Link
              href="/blog/page/2"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              rel="next"
            >
              View More Articles
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </nav>
        )}
      </div>
    </div>
  )
}