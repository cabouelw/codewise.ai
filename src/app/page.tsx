import HeroSection from '@/components/HeroSection'
import ToolCard from '@/components/ToolCard'
import CategoryCard from '@/components/CategoryCard'
import BlogCard from '@/components/BlogCard'
import AnimatedSection from '@/components/AnimatedSection'
import { featuredTools, categories } from '@/lib/data'
import { getAllPosts } from '@/lib/mdx/blog'

export default async function Home() {
  // Get blog posts from MDX
  const mdxPosts = await getAllPosts()
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
      <section className="py-20 bg-white dark:bg-slate-900">
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
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/25"
            >
              View All Tools
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Explore Categories
            </h2>
            <p className="text-xl text-slate-700 dark:text-slate-200 max-w-2xl mx-auto">
              Find tools organized by category to suit your specific development needs
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <AnimatedSection
                key={category.id}
                animation="scale-in"
                delay={100 + index * 150}
              >
                <CategoryCard {...category} />
              </AnimatedSection>
            ))}
          </div>
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
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/25"
            >
              Read More Articles
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection animation="fade-up">
        <section className="py-20 bg-gradient-to-r from-sky-500 to-blue-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Supercharge Your Development?
            </h2>
            <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already using these amazing tools to build better software faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/tools"
                className="inline-flex items-center gap-2 bg-white text-sky-600 font-semibold px-8 py-4 rounded-lg hover:bg-sky-50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
              >
                Start Exploring
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-sky-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
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