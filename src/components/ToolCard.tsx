import Link from 'next/link'
import Image from 'next/image'

interface ToolCardProps {
  title: string
  description: string
  category: string
  icon: string
  href: string
  featured?: boolean
  tags?: string[]
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  category,
  icon,
  href,
  featured = false,
  tags = []
}) => {
  return (
    <div className={`group relative overflow-hidden rounded-xl border card-hover transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/10 ${featured
      ? 'border-sky-200 dark:border-sky-800 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20'
      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
      } hover:border-sky-300 dark:hover:border-sky-600`}>
      {featured && (
        <div className="absolute top-3 right-3 bg-sky-500 text-white text-xs font-medium px-2 py-1 rounded-full animate-pulse">
          Featured
        </div>
      )}

      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30 flex items-center justify-center card-icon overflow-hidden">
            <span className="text-2xl transition-transform duration-300">{icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300">
              {title}
            </h3>
            <span className="text-sm font-medium text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/30 px-2 py-1 rounded-full transition-all duration-300 group-hover:bg-sky-200 dark:group-hover:bg-sky-800/50 group-hover:scale-105">
              {category}
            </span>
          </div>
        </div>

        <p className="text-slate-700 dark:text-slate-200 text-sm mb-4 line-clamp-3 transition-colors duration-300">
          {description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={tag}
                className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 py-1 rounded-md transition-all duration-300 group-hover:bg-slate-200 dark:group-hover:bg-slate-600"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}

        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-all duration-300 group/link"
        >
          Use Tool
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
    </div>
  )
}

export default ToolCard