import { Metadata } from 'next'
import BlogCard from '@/components/BlogCard'
import { getAllPosts } from '@/lib/mdx/blog'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

// Generate static params for all categories
export async function generateStaticParams() {
  const allPosts = getAllPosts()
  const categories = Array.from(new Set(allPosts.map(post => post.category)))

  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const displayCategory = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const url = `https://codewize-ai.website/blog/category/${category}`

  return {
    title: `${displayCategory} Articles | CodeWise AI Blog`,
    description: `Explore expert tutorials and guides on ${displayCategory}. Learn from industry professionals and enhance your development skills.`,
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
      canonical: url,
    },
    openGraph: {
      title: `${displayCategory} Articles | CodeWise AI`,
      description: `Expert tutorials and guides on ${displayCategory}`,
      type: 'website',
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${displayCategory} Articles | CodeWise AI`,
      description: `Expert tutorials and guides on ${displayCategory}`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const allPosts = getAllPosts()

  // Find posts matching this category
  const categoryPosts = allPosts.filter(post =>
    post.category.toLowerCase().replace(/\s+/g, '-') === category
  )

  if (categoryPosts.length === 0) {
    notFound()
  }

  const displayCategory = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  // Transform posts for BlogCard
  const posts = categoryPosts.map(post => ({
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

  // Extract all unique categories for filter
  const postCategories = Array.from(new Set(allPosts.map(post => post.category)))

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-slate-400">/</span>
                <Link href="/blog" className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400">
                  Blog
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-slate-400">/</span>
                <span className="text-slate-900 dark:text-white font-medium">{displayCategory}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Category
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {displayCategory}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category
          </p>
        </div>

        {/* Categories Filter - SEO-friendly links */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600"
            >
              All
            </Link>
            {postCategories.map((cat) => {
              const catSlug = cat.toLowerCase().replace(/\s+/g, '-')
              const isActive = catSlug === category

              return (
                <Link
                  key={cat}
                  href={`/blog/category/${catSlug}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                    ? 'bg-sky-500 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600'
                    }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {cat}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Posts Grid */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </div>

        {/* Back to All Posts */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            View All Articles
          </Link>
        </div>
      </div>
    </div>
  )
}
