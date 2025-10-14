import Link from 'next/link'
import Image from 'next/image'

interface BlogCardProps {
  title: string
  excerpt: string
  slug: string
  publishedAt: string
  readTime: string
  category: string
  image?: string
  featured?: boolean
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  slug,
  publishedAt,
  readTime,
  category,
  image,
  featured = false
}) => {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <article className={`group relative overflow-hidden rounded-xl border card-hover transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/10 ${featured
      ? 'border-sky-200 dark:border-sky-800 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20'
      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
      } hover:border-sky-300 dark:hover:border-sky-600`}>
      {featured && (
        <div className="absolute top-3 right-3 z-10 bg-sky-500 text-white text-xs font-medium px-2 py-1 rounded-full animate-pulse">
          Featured
        </div>
      )}

      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {image && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      <div className="relative p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-medium text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/30 px-2 py-1 rounded-full transition-all duration-300 group-hover:bg-sky-200 dark:group-hover:bg-sky-800/50 group-hover:scale-105">
            {category}
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-300 transition-colors duration-300">
            {formattedDate}
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-300 transition-colors duration-300">
            • {readTime}
          </span>
        </div>

        <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-3 line-clamp-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-slate-700 dark:text-slate-200 text-sm mb-4 line-clamp-3 transition-colors duration-300">
          {excerpt}
        </p>

        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-all duration-300 group/link"
        >
          Read More
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </article>
  )
}

export default BlogCard