interface CategoryCardProps {
  title: string
  description: string
  icon: string
  href: string
  toolCount: number
  gradient: string
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon,
  href,
  toolCount,
  gradient
}) => {
  return (
    <a
      href={href}
      className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${gradient}`}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <span className="text-2xl">{icon}</span>
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg mb-1">
              {title}
            </h3>
            <span className="text-white/80 text-sm">
              {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
            </span>
          </div>
        </div>

        <p className="text-white/90 text-sm mb-4">
          {description}
        </p>

        <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-white/90 transition-colors">
          Explore Tools
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
        </div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-gradient-to-br from-white/20 to-transparent"></div>
      </div>
    </a>
  )
}

export default CategoryCard