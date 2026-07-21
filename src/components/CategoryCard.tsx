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
      className="group relative block h-full w-full"
    >
      <div className="relative h-full overflow-hidden rounded-2xl bg-slate-800/60 border border-slate-700/50 p-8 transition-colors duration-200 hover:border-slate-500/60">
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <div className="mb-8">
            <div className={`w-16 h-16 rounded-xl ${gradient} flex items-center justify-center`}>
              <span className="text-3xl">{icon}</span>
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {title}
            </h3>

            {/* Tool count badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/60 border border-slate-700/50 rounded-full">
              <div className="w-2 h-2 rounded-full bg-teal-400"></div>
              <span className="text-sm font-semibold text-slate-300">
                {toolCount} {toolCount === 1 ? 'Tool' : 'Tools'}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 flex-grow">
            {description}
          </p>

          {/* CTA */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-700/50">
            <span className="text-base font-bold text-slate-400 group-hover:text-teal-400 transition-colors duration-200">
              Explore Now
            </span>
            <div className="w-10 h-10 rounded-full bg-slate-900/60 border border-slate-700/50 flex items-center justify-center transition-colors duration-200 group-hover:border-teal-500/60">
              <svg
                className="w-5 h-5 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-teal-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export default CategoryCard
