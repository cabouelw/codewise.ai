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
      {/* Main card container */}
      <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 p-8 transition-all duration-700 hover:border-slate-600/50 hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-3">

        {/* Top decorative line with gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Background glow effect */}
        <div className={`absolute -inset-1 ${gradient} opacity-0 group-hover:opacity-30 blur-3xl transition-all duration-700 -z-10`}></div>

        {/* Content wrapper */}
        <div className="relative z-10 flex flex-col h-full">

          {/* Icon section */}
          <div className="mb-8">
            <div className="relative inline-block">
              {/* Icon background with gradient */}
              <div className={`relative w-20 h-20 rounded-2xl ${gradient} p-0.5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                  <span className="text-5xl transform transition-transform duration-500 group-hover:scale-110">{icon}</span>
                </div>
              </div>
              {/* Glow behind icon */}
              <div className={`absolute inset-0 w-20 h-20 rounded-2xl ${gradient} blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-500 -z-10`}></div>
            </div>
          </div>

          {/* Title section */}
          <div className="mb-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:to-blue-500">
              {title}
            </h3>

            {/* Tool count badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-full transition-all duration-300 group-hover:bg-slate-700/80 group-hover:border-sky-500/50">
              <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></div>
              <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                {toolCount} {toolCount === 1 ? 'Tool' : 'Tools'}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 flex-grow group-hover:text-slate-300 transition-colors duration-300">
            {description}
          </p>

          {/* CTA button */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-700/50 group-hover:border-sky-500/30 transition-colors duration-300">
            <span className="text-base font-bold text-slate-400 group-hover:text-sky-400 transition-colors duration-300">
              Explore Now
            </span>

            {/* Animated arrow */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center transition-all duration-300 group-hover:bg-sky-500 group-hover:border-sky-400 group-hover:scale-110">
                <svg
                  className="w-5 h-5 text-slate-400 transition-all duration-300 group-hover:text-white group-hover:translate-x-1"
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

        {/* Decorative corner elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-sky-500/5 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-20 translate-y-20"></div>

        {/* Shimmer sweep effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>
        </div>
      </div>

      {/* Outer glow effect */}
      <div className={`absolute inset-0 rounded-3xl ${gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700 -z-20`}></div>
    </a>
  )
}

export default CategoryCard