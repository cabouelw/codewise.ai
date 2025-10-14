import { Metadata } from 'next'
import BlogCard from '@/components/BlogCard'
import { getAllPosts } from '@/lib/mdx/blog'

export const metadata: Metadata = {
  title: 'Blog - Latest Insights',
  description: 'Stay updated with the latest trends, tutorials, and insights in AI and development.',
}

export default async function BlogPage() {
  // Get all blog posts from MDX
  const blogPosts = await getAllPosts()

  // Transform MDX posts to match BlogCard props
  const allPosts = blogPosts.map(post => ({
    id: post.slug,
    title: post.title,
    excerpt: post.description,
    slug: post.slug,
    publishedAt: post.date,
    readTime: post.readingTime,
    category: post.category,
    image: post.image
  }))

  // Extract unique categories from posts
  const postCategories = Array.from(new Set(allPosts.map(post => post.category)))
  const categories = ['All', ...postCategories]

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Latest Insights
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Stay updated with the latest trends, tutorials, and insights in AI and development.
            Learn from industry experts and enhance your skills.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${category === 'All'
                  ? 'bg-sky-500 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {allPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Featured Article</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BlogCard {...allPosts[0]} featured={true} />
              <div className="lg:col-span-1">
                <div className="h-full flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    {allPosts[0].title}
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                    {allPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span>{new Date(allPosts[0].publishedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{allPosts[0].readTime}</span>
                    <span>•</span>
                    <span className="bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 px-2 py-1 rounded-full">
                      {allPosts[0].category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.slice(1).map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300">
            Load More Articles
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}