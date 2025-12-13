import { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx/blog'
import BlogCard from '@/components/BlogCard'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'

interface AuthorPageProps {
  params: Promise<{
    author: string
  }>
}

// Generate static params for all authors
export async function generateStaticParams() {
  const allPosts = getAllPosts()
  const authors = Array.from(new Set(allPosts.map(post => post.author)))

  return authors.map((author) => ({
    author: author.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { author } = await params
  const displayAuthor = author.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const url = `https://codewise-ai.vercel.app/author/${author}`

  return {
    title: `${displayAuthor} - Articles & Tutorials | CodeWise AI`,
    description: `Read articles and tutorials written by ${displayAuthor}. Expert insights on AI development, coding practices, and software engineering.`,
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
      title: `${displayAuthor} - Articles | CodeWise AI`,
      description: `Expert articles and tutorials by ${displayAuthor}`,
      type: 'profile',
      url,
    },
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { author } = await params
  const allPosts = getAllPosts()

  // Find posts by this author
  const authorPosts = allPosts.filter(post =>
    post.author.toLowerCase().replace(/\s+/g, '-') === author
  )

  if (authorPosts.length === 0) {
    notFound()
  }

  const displayAuthor = author.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const authorInitial = displayAuthor.charAt(0).toUpperCase()

  // Transform posts for BlogCard
  const posts = authorPosts.map(post => ({
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

  // Person structured data for E-E-A-T
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: displayAuthor,
    url: `https://codewise-ai.vercel.app/author/${author}`,
    jobTitle: "Technical Writer & Developer",
    worksFor: {
      "@type": "Organization",
      name: "CodeWise AI"
    },
    description: `Author of ${authorPosts.length} article${authorPosts.length !== 1 ? 's' : ''} on AI development and software engineering`,
  }

  // ProfilePage structured data
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: personSchema,
    breadcrumb: {
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
          name: "Authors",
          item: "https://codewise-ai.vercel.app/blog"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: displayAuthor,
          item: `https://codewise-ai.vercel.app/author/${author}`
        }
      ]
    }
  }

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Add structured data */}
      <JsonLd data={personSchema} />
      <JsonLd data={profileSchema} />

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
                <span className="text-slate-900 dark:text-white font-medium">{displayAuthor}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Author Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-sky-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
              <span className="text-white font-bold text-4xl">
                {authorInitial}
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {displayAuthor}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-4">
            Technical Writer & Developer at CodeWise AI
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 px-3 py-1 rounded-full font-medium">
              {authorPosts.length} {authorPosts.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>
        </div>

        {/* Author Bio Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">About {displayAuthor}</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {displayAuthor} is a technical writer and developer specializing in AI development,
              software engineering best practices, and modern web technologies. With expertise in
              creating comprehensive tutorials and guides, {displayAuthor.split(' ')[0]} helps developers
              stay up-to-date with the latest trends and tools in the industry.
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Articles by {displayAuthor}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </div>

        {/* Back to Blog */}
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
