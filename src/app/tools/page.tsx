import { Metadata } from "next"
import { featuredTools } from "@/lib/data"
import ToolsFilter from "@/components/ToolsFilter"
import { JsonLd } from "@/components/JsonLd"

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Free AI Tools for Developers - Code, Content & More | CodeWise AI",
  description:
    "Browse our collection of free AI-powered tools for developers. AI code assistants, content generators, translators, image enhancers, and more. Boost your productivity today!",
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
    title: "Free AI Tools for Developers | CodeWise AI",
    description:
      "Browse our free AI-powered tools: code assistants, content generators, translators & more. Boost your productivity!",
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
    title: "Free AI Tools for Developers | CodeWise AI",
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

        {/* Editorial Content Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">About Our AI Tools Collection</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              CodeWise AI offers a growing collection of free, browser-based AI tools designed specifically for developers and content creators. Each tool leverages state-of-the-art artificial intelligence models to automate tedious tasks, spark creativity, and accelerate your workflow — all without requiring any sign-up, installation, or payment.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Our tools span multiple categories to address different aspects of the development and content creation process. The <strong>Code Explainer</strong> helps you understand unfamiliar code by providing detailed plain-language breakdowns. The <strong>Content Generator</strong> produces blog posts, social media copy, and marketing materials from simple prompts. The <strong>Paraphraser</strong> and <strong>Summarizer</strong> help you rewrite and condense text efficiently. The <strong>Translator</strong> enables seamless communication across 20+ languages with context-aware accuracy.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              We built these tools because we believe developers deserve access to AI capabilities without friction. Whether you are a solo developer working on a side project, a student learning to code, or a team lead looking for productivity boosters, our tools are designed to integrate seamlessly into your existing workflow. Simply open the tool, provide your input, and get results in seconds.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              All tools are continuously improved based on user feedback and advances in AI technology. If you have a suggestion for a new tool or an improvement to an existing one, we would love to hear from you on our <a href="/contact" className="text-sky-600 dark:text-sky-400 hover:underline">contact page</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
