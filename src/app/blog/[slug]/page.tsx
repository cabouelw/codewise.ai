import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/mdx/blog'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import Breadcrumb from '@/components/Breadcrumb'
import ShareButtons from '@/components/ShareButtons'
import RelatedPosts from '@/components/RelatedPosts'
import { JsonLd } from '@/components/JsonLd'
import Link from 'next/link'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const url = `https://codewise-ai.vercel.app/blog/${slug}`

  return {
    title: `${post.title} | CodeWise AI`,
    description: post.description,
    authors: [{ name: post.author }],
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
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url,
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
    alternates: {
      canonical: url,
    },
  }
}

// Revalidate every 24 hours (ISR)
export const revalidate = 86400

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post || !post.content) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 3)

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const currentUrl = `https://codewise-ai.vercel.app/blog/${slug}`

  // Article structured data for SEO (BlogPosting is more specific than Article)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: {
      "@type": "ImageObject",
      url: post.image,
      width: 1200,
      height: 630
    },
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: `https://codewise-ai.vercel.app/author/${post.author.toLowerCase().replace(/\s+/g, '-')}`
    },
    publisher: {
      "@type": "Organization",
      name: "CodeWise AI",
      url: "https://codewise-ai.vercel.app",
      logo: {
        "@type": "ImageObject",
        url: "https://codewise-ai.vercel.app/logo.png",
        width: 600,
        height: 60
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentUrl,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount: post.content ? post.content.split(/\s+/).length : 0,
    inLanguage: "en-US",
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
        item: "https://codewise-ai.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://codewise-ai.vercel.app/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: currentUrl,
      },
    ],
  }

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Add structured data */}
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title }
          ]}
        />

        <article>
          {/* Header */}
          <header className="mb-12">
            <div className="mb-6">
              <span className="inline-block bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-slate-600 dark:text-slate-400 mb-8 flex-wrap">
              <Link
                href={`/author/${post.author.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold text-sm">
                    {post.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                    {post.author}
                  </div>
                  <div className="text-sm">{formattedDate}</div>
                </div>
              </Link>
              <div className="text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readingTime}
              </div>
            </div>

            {post.featured && (
              <div className="mb-8">
                <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
                  <Image
                    src={post.image}
                    alt={`${post.title} - Featured image for CodeWise AI blog post`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 896px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}

            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              {post.description}
            </p>
          </header>

          {/* Content with MDX */}
          <div className="mb-12">
            <MarkdownRenderer source={post.content} />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Share this article</h3>
            <ShareButtons
              url={currentUrl}
              title={post.title}
              description={post.description}
            />
          </div>
        </article>

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} />
      </div>
    </div>
  )
}