import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getToolBySlug, getAllTools, getRelatedTools } from '@/lib/tools'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'
import { JsonLd } from '@/components/JsonLd'

interface ToolPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static params for all tools
export async function generateStaticParams() {
  const tools = getAllTools()
  return tools.map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    return {
      title: 'Tool Not Found',
    }
  }

  const url = `https://codewise-ai.vercel.app/tools/${slug}`

  return {
    title: `${tool.name} - ${tool.category} | CodeWise AI`,
    description: tool.description,
    keywords: [...tool.tags, tool.category, tool.name, 'AI tools', 'developer tools'],
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
      title: `${tool.name} - ${tool.category}`,
      description: tool.description,
      type: 'website',
      url,
      images: [
        {
          url: tool.image,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.name,
      description: tool.description,
      images: [tool.image],
    },
    alternates: {
      canonical: url,
    },
  }
}

// Revalidate every 24 hours (ISR)
export const revalidate = 86400

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const relatedTools = getRelatedTools(slug, 3)

  // SoftwareApplication structured data for SEO
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.longDescription,
    applicationCategory: tool.category,
    offers: {
      "@type": "Offer",
      price: tool.pricing.includes('Free') ? '0' : tool.pricing,
      priceCurrency: "USD",
    },
    aggregateRating: tool.featured ? {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    } : undefined,
    operatingSystem: "Web",
    url: tool.url,
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
        name: "Tools",
        item: "https://codewise-ai.vercel.app/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: `https://codewise-ai.vercel.app/tools/${slug}`,
      },
    ],
  }

  return (
    <div className="py-20 bg-white min-h-screen">
      {/* Add structured data */}
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: tool.name }
          ]}
        />

        {/* Hero Section with Image */}
        <div className="mb-12">
          <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-blue-50 to-purple-50">
            <Image
              src={tool.image}
              alt={tool.name}
              fill
              className="object-cover"
              priority
            />
            {tool.aiBased && (
              <div className="absolute top-4 right-4 bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                🤖 AI Powered
              </div>
            )}
          </div>

          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-4xl">{tool.icon}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                {tool.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {tool.description}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                  {tool.category}
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  {tool.pricing}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {tool.name}</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {tool.longDescription}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
              <ul className="space-y-3">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24 shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-6 text-lg">
                Tool Information
              </h3>

              <div className="space-y-5">
                <div>
                  <span className="text-sm text-gray-500 block mb-1">Category</span>
                  <div className="font-medium text-gray-900">{tool.category}</div>
                </div>

                <div>
                  <span className="text-sm text-gray-500 block mb-1">Pricing</span>
                  <div className="font-medium text-gray-900">{tool.pricing}</div>
                </div>

                <div>
                  <span className="text-sm text-gray-500 block mb-1">AI-Powered</span>
                  <div className="font-medium text-gray-900">
                    {tool.aiBased ? '✅ Yes' : '❌ No'}
                  </div>
                </div>

                {tool.featured && (
                  <div>
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
                      ⭐ Featured Tool
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8 space-y-3">
                <Link
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-center block shadow-md hover:shadow-lg"
                >
                  Visit {tool.name} →
                </Link>
                <Link
                  href="/tools"
                  className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-300 text-center block"
                >
                  ← Back to Tools
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools tools={relatedTools} />
      </div>
    </div>
  )
}