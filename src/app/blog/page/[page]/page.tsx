import { Metadata } from 'next'
import BlogCard from '@/components/BlogCard'
import { getAllPosts } from '@/lib/mdx/blog'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 9

interface BlogPageProps {
  params: Promise<{
    page: string
  }>
}

// Generate static params for pagination
export async function generateStaticParams() {
  const allPosts = getAllPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }))
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { page } = await params
  const pageNumber = parseInt(page)
  const allPosts = getAllPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  if (pageNumber < 1 || pageNumber > totalPages) {
    return {
      title: 'Page Not Found',
    }
  }

  const baseUrl = 'https://codewize-ai.website/blog'
  const currentUrl = pageNumber === 1 ? baseUrl : `${baseUrl}/page/${pageNumber}`

  // Canonical should point to page 1 if we're on page 1, otherwise current page
  const canonicalUrl = currentUrl

  // Build prev/next links for pagination
  const prevPage = pageNumber > 2 ? `${baseUrl}/page/${pageNumber - 1}` : pageNumber === 2 ? baseUrl : null
  const nextPage = pageNumber < totalPages ? `${baseUrl}/page/${pageNumber + 1}` : null

  return {
    title: `AI Development Blog - Page ${pageNumber} | CodeWise AI`,
    description: 'Expert tutorials, in-depth guides, and latest trends in AI development. Learn how to leverage AI tools and improve your coding workflow.',
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
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `AI Development Blog - Page ${pageNumber} | CodeWise AI`,
      description: 'Expert tutorials and guides on AI development and coding best practices.',
      type: 'website',
      url: currentUrl,
    },
    other: {
      ...(prevPage && { 'link-prev': prevPage }),
      ...(nextPage && { 'link-next': nextPage }),
    },
  }
}

export default async function PaginatedBlogPage({ params }: BlogPageProps) {
  const { page } = await params
  const pageNumber = parseInt(page)
  const allPosts = getAllPosts()
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  // Redirect page 1 to /blog for SEO
  if (pageNumber === 1) {
    return notFound()
  }

  if (pageNumber < 1 || pageNumber > totalPages) {
    notFound()
  }

  // Calculate pagination
  const startIndex = (pageNumber - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const paginatedPosts = allPosts.slice(startIndex, endIndex)

  // Transform posts for BlogCard
  const posts = paginatedPosts.map(post => ({
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

  // Extract unique categories
  const postCategories = Array.from(new Set(allPosts.map(post => post.category)))
  const categories = ['All', ...postCategories]

  // SEO: Prev/Next URLs
  const baseUrl = 'https://codewize-ai.website/blog'
  const prevUrl = pageNumber > 2 ? `${baseUrl}/page/${pageNumber - 1}` : pageNumber === 2 ? baseUrl : null
  const nextUrl = pageNumber < totalPages ? `${baseUrl}/page/${pageNumber + 1}` : null

  return (
    <>
      {/* Add prev/next link tags for SEO */}
      {prevUrl && (
        <link rel="prev" href={prevUrl} />
      )}
      {nextUrl && (
        <link rel="next" href={nextUrl} />
      )}

      <div className="py-20 bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Latest Insights - Page {pageNumber}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Stay updated with the latest trends, tutorials, and insights in AI and development.
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
              {postCategories.map((category) => (
                <Link
                  key={category}
                  href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          </div>

          {/* SEO-Friendly Pagination */}
          <nav className="mt-12 flex justify-center items-center gap-2" aria-label="Blog pagination">
            <div className="flex items-center gap-2">
              {/* Previous Page */}
              {pageNumber > 1 && (
                <Link
                  href={pageNumber === 2 ? '/blog' : `/blog/page/${pageNumber - 1}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-sky-50 dark:hover:bg-slate-700 transition-all duration-300"
                  rel="prev"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </Link>
              )}

              {/* Page Numbers */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage =
                    num === 1 ||
                    num === totalPages ||
                    (num >= pageNumber - 1 && num <= pageNumber + 1)

                  if (!showPage) {
                    // Show ellipsis
                    if (num === pageNumber - 2 || num === pageNumber + 2) {
                      return (
                        <span key={num} className="px-3 py-2 text-slate-400">
                          ...
                        </span>
                      )
                    }
                    return null
                  }

                  return (
                    <Link
                      key={num}
                      href={num === 1 ? '/blog' : `/blog/page/${num}`}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${num === pageNumber
                        ? 'bg-sky-500 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-sky-50 dark:hover:bg-slate-700'
                        }`}
                      aria-current={num === pageNumber ? 'page' : undefined}
                    >
                      {num}
                    </Link>
                  )
                })}
              </div>

              {/* Next Page */}
              {pageNumber < totalPages && (
                <Link
                  href={`/blog/page/${pageNumber + 1}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-sky-50 dark:hover:bg-slate-700 transition-all duration-300"
                  rel="next"
                >
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </nav>

          {/* Pagination Info for Screen Readers */}
          <div className="sr-only" aria-live="polite">
            Page {pageNumber} of {totalPages}
          </div>
        </div>
      </div>
    </>
  )
}
