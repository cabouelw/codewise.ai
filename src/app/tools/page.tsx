import { Metadata } from "next"
import { featuredTools } from "@/lib/data"
import ToolsFilter from "@/components/ToolsFilter"
import { JsonLd } from "@/components/JsonLd"

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "50+ Free AI Tools for Developers - Code, Content & More | CodeWise AI",
  description:
    "Browse 50+ free AI-powered tools for developers. AI code assistants, content generators, translators, image enhancers, and more. Boost your productivity today!",
  keywords: [
    "free AI tools",
    "AI tools for developers",
    "AI code assistant free",
    "best coding tools",
    "AI programming tools",
    "developer productivity",
    "AI content generator",
    "code explanation tool",
    "AI translator",
    "image enhancement AI",
    "free developer tools 2025",
  ],
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
    title: "50+ Free AI Tools for Developers | CodeWise AI",
    description:
      "Browse 50+ free AI-powered tools: code assistants, content generators, translators & more. Boost your productivity!",
    type: "website",
    url: "https://codewize-ai.website/tools",
    images: [
      {
        url: "/images/blog/AI_vs_Human.png",
        width: 1200,
        height: 628,
        alt: "50+ Free AI Tools for Developers | CodeWise AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "50+ Free AI Tools for Developers | CodeWise AI",
    description: "Free AI tools for coding, content generation, translation & more.",
  },
  alternates: {
    canonical: "https://codewize-ai.website/tools",
  },
}

// Get unique categories from tools
const getCategories = () => {
  const cats = new Set<string>()
  featuredTools.forEach((tool) => cats.add(tool.category))
  return ["All", ...Array.from(cats).sort()]
}

export default function ToolsPage() {
  const categories = getCategories()

  // ItemList structured data for SEO
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: featuredTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: tool.title,
        description: tool.description,
        applicationCategory: tool.category,
        url: tool.href.startsWith("http") ? tool.href : `https://codewize-ai.website${tool.href}`,
      },
    })),
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
        item: "https://codewize-ai.website",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://codewize-ai.website/tools",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Add structured data */}
      <JsonLd data={itemListSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">AI Tools</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Powerful AI-powered tools to boost your productivity. From writing to coding, we've got you covered.
          </p>
        </div>

        {/* Client-side filtering component */}
        <ToolsFilter tools={featuredTools} categories={categories} />
      </div>
    </div>
  )
}
