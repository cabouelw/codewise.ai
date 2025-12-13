import { Metadata } from 'next'
import { getAllTools, getToolsByCategory } from '@/lib/tools'
import ToolCard from '@/components/ToolCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateStaticParams() {
  const tools = getAllTools()
  const categories = Array.from(new Set(tools.map(tool => tool.category)))

  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const displayCategory = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const url = `https://codewise-ai.vercel.app/tools/category/${category}`

  return {
    title: `${displayCategory} Tools - Free AI & Developer Tools | CodeWise AI`,
    description: `Explore the best ${displayCategory} tools. Free AI-powered tools to boost your productivity and development workflow.`,
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
      title: `${displayCategory} Tools | CodeWise AI`,
      description: `Best ${displayCategory} tools for developers`,
      type: 'website',
      url,
    },
  }
}

export default async function ToolCategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const allTools = getAllTools()

  const categoryTools = allTools.filter(tool =>
    tool.category.toLowerCase().replace(/\s+/g, '-') === category
  )

  if (categoryTools.length === 0) {
    notFound()
  }

  const displayCategory = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const allCategories = Array.from(new Set(allTools.map(tool => tool.category)))

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
        name: "Tools",
        item: "https://codewise-ai.vercel.app/tools"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: displayCategory,
        item: `https://codewise-ai.vercel.app/tools/category/${category}`
      }
    ]
  }

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <JsonLd data={breadcrumbSchema} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-sky-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-slate-400">/</span>
                <Link href="/tools" className="text-slate-600 dark:text-slate-400 hover:text-sky-600">
                  Tools
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

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {displayCategory} Tools
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {categoryTools.length} {categoryTools.length === 1 ? 'tool' : 'tools'} to enhance your workflow
          </p>
        </div>

        <div className="mb-12">
          <nav className="flex flex-wrap gap-2 justify-center" aria-label="Tool categories">
            <Link
              href="/tools"
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600"
            >
              All Tools
            </Link>
            {allCategories.map((cat) => {
              const catSlug = cat.toLowerCase().replace(/\s+/g, '-')
              const isActive = catSlug === category

              return (
                <Link
                  key={cat}
                  href={`/tools/category/${catSlug}`}
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
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryTools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.name}
              description={tool.description}
              category={tool.category}
              icon={tool.icon}
              href={`/tools/${tool.slug}`}
              featured={tool.featured}
              tags={tool.tags}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            View All Tools
          </Link>
        </div>
      </div>
    </div>
  )
}
