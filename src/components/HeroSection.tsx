import Link from 'next/link'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-bg opacity-30"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-sky-300/20 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-sky-200 dark:border-sky-800 rounded-full px-4 py-2 mb-8 animate-fade-in-down">
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Discover the future of coding
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            <span className="block animate-fade-in-up animate-delay-100">Empower your</span>
            <span className="block gradient-text animate-fade-in-up animate-delay-200">coding with smart</span>
            <span className="block animate-fade-in-up animate-delay-300">AI tools</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-400">
            All in one place. Discover, learn, and enhance your development workflow
            with our curated collection of AI and developer tools.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animate-delay-500">
            <Link
              href="/tools"
              className="btn-glow inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Explore Tools
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold px-8 py-4 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Read Blog
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center animate-scale-in animate-delay-100">
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">50+</div>
              <div className="text-slate-700 dark:text-slate-300">AI Tools</div>
            </div>
            <div className="text-center animate-scale-in animate-delay-200">
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">10k+</div>
              <div className="text-slate-700 dark:text-slate-300">Developers</div>
            </div>
            <div className="text-center animate-scale-in animate-delay-300">
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">24/7</div>
              <div className="text-slate-700 dark:text-slate-300">Support</div>
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