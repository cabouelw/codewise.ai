import { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import CategoryCard from '@/components/CategoryCard'
import BlogCard from '@/components/BlogCard'
import AnimatedSection from '@/components/AnimatedSection'
import { categories } from '@/lib/data'
import { getIndexablePosts } from '@/lib/mdx/blog'
import { getAllTools } from '@/lib/tools'

export const metadata: Metadata = {
  title: 'Best AI Tools for Developers | CodeWise AI',
  description: 'Hand-picked AI tools every developer should know about, tested hands-on. AI code assistants, content generators, and more — with honest notes on what each one is actually good for.',
  keywords: ['AI tools for developers', 'best AI coding tools', 'developer productivity tools', 'AI code assistant', 'AI programming tools', 'software development tools', 'AI powered development', 'coding assistant AI'],
  openGraph: {
    title: 'Best AI Tools for Developers | CodeWise AI',
    description: 'Hand-picked AI tools, tested hands-on. Code assistants, content generation, and more.',
    type: 'website',
    url: 'https://codewize-ai.website',
    images: [
      {
        url: '/images/blog/AI_vs_Human.png',
        width: 1200,
        height: 628,
        alt: 'Best AI Tools for Developers | CodeWise AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools for Developers | CodeWise AI',
    description: 'Hand-picked AI tools, tested hands-on.',
  },
}

export default async function Home() {
  const toolCount = getAllTools().length
  // Only showcase posts that pass editorial quality checks.
  const mdxPosts = await getIndexablePosts()
  const blogPosts = mdxPosts.slice(0, 3).map(post => ({
    id: post.slug,
    title: post.title,
    excerpt: post.description,
    slug: post.slug,
    publishedAt: post.date,
    readTime: post.readingTime,
    category: post.category,
    image: post.image,
    featured: post.featured
  }))
  return (
    <>
      <HeroSection />

      {/* Featured Tools Section */}
      {/* <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Tools
            </h2>
            <p className="text-xl text-slate-700 dark:text-slate-200 max-w-2xl mx-auto">
              Discover the most popular and powerful tools that developers love to use
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTools.map((tool, index) => (
              <AnimatedSection
                key={tool.id}
                animation="fade-up"
                delay={100 + (index % 3) * 100}
              >
                <ToolCard {...tool} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="fade-up" delay={200} className="text-center mt-12">
            <a
              href="/tools"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/25"
            >
              View All Tools
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </AnimatedSection>
        </div>
      </section> */}

      {/* Categories Section */}
      <section className="relative py-24 bg-slate-900 dark:bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection animation="fade-up" className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-slate-300 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Explore by Category
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Choose Your <span className="text-teal-400">Category</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Browse tools by what you're trying to get done, not by marketing buzzwords.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {categories.map((category, index) => (
              <AnimatedSection
                key={category.id}
                animation="scale-in"
                delay={100 + index * 100}
              >
                <CategoryCard {...category} />
              </AnimatedSection>
            ))}
          </div>

          {/* Stats showcase */}
          <AnimatedSection animation="fade-up" delay={700}>
            <div className="mt-20 pt-12 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">{toolCount}</div>
                  <div className="text-sm text-slate-400 font-medium">Tools Reviewed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">{categories.length}</div>
                  <div className="text-sm text-slate-400 font-medium">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-2">0</div>
                  <div className="text-sm text-slate-400 font-medium">Paid Placements</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Latest Insights
            </h2>
            <p className="text-xl text-slate-700 dark:text-slate-200 max-w-2xl mx-auto">
              Stay updated with the latest trends, tutorials, and insights in AI and development
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <AnimatedSection
                key={post.id}
                animation="fade-up"
                delay={100 + (index % 3) * 100}
              >
                <BlogCard {...post} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="fade-up" delay={200} className="text-center mt-12">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/25"
            >
              Read More Articles
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* About Our Platform - Editorial Content */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Why Developers Choose CodeWise AI
            </h2>
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <p>
                CodeWise AI is a comprehensive platform built by developers, for developers. In today&apos;s rapidly evolving tech landscape, artificial intelligence has become an indispensable part of the software development workflow. From writing boilerplate code to debugging complex applications, AI tools save hours of manual work every single day. Our mission is to curate, review, and provide the best AI-powered tools that genuinely improve developer productivity.
              </p>
              <p>
                Unlike generic tool directories, every tool listed here has actually been used, not just scraped from a press release. I evaluate each one on real-world usability, output quality, integration effort, and whether it&apos;s worth its price. Whether you&apos;re a frontend developer looking for AI-assisted UI generation, a backend engineer seeking intelligent code completion, or a full-stack developer wanting to automate repetitive tasks — the goal is to help you find something that actually works, not just another entry in a list.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 not-prose">
                <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Hands-On Tool Reviews</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">Every AI tool featured here has been personally tested, not summarized from a press release. Reviews include honest notes on strengths, limitations, and who each tool is actually a good fit for.</p>
                </div>
                <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Free Built-In AI Tools</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">Beyond reviews, the site offers free AI-powered utilities directly in the browser — code explainers, content generators, translators, and more — no sign-up required.</p>
                </div>
                <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Developer-Focused Blog</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">The blog covers practical tutorials, industry trends, and in-depth guides on integrating AI into your development workflow — written from real usage, not templated summaries.</p>
                </div>
                <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Updated When Things Change</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">The AI landscape moves fast. Listings and reviews get revisited and corrected as tools change pricing, features, or disappear entirely.</p>
                </div>
              </div>
              <p>
                Whether you&apos;re just beginning to explore AI-assisted development or you&apos;re a seasoned engineer evaluating new tools, CodeWise AI aims to give you the context you need before you commit time to a tool. The built-in utilities on this site are free to use; the AI tools reviewed range from free to paid, and that's noted in each review.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection animation="fade-up">
        <section className="py-20 bg-gradient-to-r from-teal-500 to-teal-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Supercharge Your Development?
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Explore the list, find something that solves an actual problem you have, and skip the ones that don&apos;t.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/tools"
                className="inline-flex items-center gap-2 bg-white text-teal-600 font-semibold px-8 py-4 rounded-lg hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
              >
                Start Exploring
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-teal-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                Get in Touch
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
  )
}