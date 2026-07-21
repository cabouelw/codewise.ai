import Link from 'next/link'
import { getAllTools } from '@/lib/tools'

const HeroSection = () => {
  const toolCount = getAllTools().length

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950">
      {/* Subtle grid backdrop, single hue */}
      <div className="absolute inset-0 hero-bg opacity-40"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 lg:mt-0 mt-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-full px-4 py-2 mb-8 animate-fade-in-down">
            <div className="w-2 h-2 bg-teal-600 dark:bg-teal-400 rounded-full"></div>
            <span className="text-sm font-medium text-teal-800 dark:text-teal-200">
              Independent, hands-on tool reviews
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            <span className="block animate-fade-in-up animate-delay-100">AI Tools for Developers,</span>
            <span className="block text-teal-700 dark:text-teal-400 animate-fade-in-up animate-delay-200">Tested Hands-On</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-400">
            No stock descriptions copied from vendor pages. Every tool listed here has
            actually been used for real work before it made the list.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animate-delay-500">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Explore Tools
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold px-8 py-4 rounded-lg hover:border-teal-400 dark:hover:border-teal-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Read the Blog
            </Link>
          </div>

          {/* Facts, not vanity metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center animate-scale-in animate-delay-100">
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{toolCount}</div>
              <div className="text-slate-700 dark:text-slate-300">Tools Reviewed</div>
            </div>
            <div className="text-center animate-scale-in animate-delay-200">
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">1</div>
              <div className="text-slate-700 dark:text-slate-300">Person Behind It</div>
            </div>
            <div className="text-center animate-scale-in animate-delay-300">
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">0</div>
              <div className="text-slate-700 dark:text-slate-300">Sponsored Rankings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection