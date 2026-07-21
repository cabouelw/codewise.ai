import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About CodeWise AI - Who Runs This Site',
  description: 'CodeWise AI is an independent, one-person project curating and writing about AI tools for developers. Learn who runs it, how tools are picked, and how the site is funded.',
  keywords: ['about CodeWise AI', 'AI tools platform', 'developer resources platform', 'AI for developers', 'coding tools platform', 'independent developer blog', 'AI development platform'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://codewize-ai.website/about',
  },
  openGraph: {
    title: 'About CodeWise AI - Who Runs This Site',
    description: 'An independent, one-person project curating AI tools and writing about them for developers.',
    type: 'website',
    url: 'https://codewize-ai.website/about',
    images: [
      {
        url: '/images/blog/AI_vs_Human.png',
        width: 1200,
        height: 628,
        alt: 'About CodeWise AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About CodeWise AI',
    description: 'An independent project curating AI tools for developers.',
  },
}

export default function AboutPage() {
  return (
    <div className="py-20 bg-white dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            About CodeWise AI
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            An independent site where I track, test, and write about AI tools worth a developer's time.
          </p>
        </div>

        {/* Who runs this */}
        <div className="mb-16">
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Who runs this</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              I'm Choaib, a web developer, and I own and run CodeWise AI on my own. There's no
              editorial team behind it — every tool review and blog post here is written by me,
              based on tools I've actually used while building things. If something reads as
              wrong or out of date, that's on me, and you can tell me about it through the{' '}
              <a href="/contact" className="text-teal-600 dark:text-teal-400 underline">contact page</a>.
            </p>
          </div>
        </div>

        {/* How this site works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">How this site works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧪</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">How tools get picked</h3>
              <p className="text-slate-600 dark:text-slate-300">
                I add a tool because I've used it myself or a specific need surfaced it during my own
                work — not because a vendor asked to be listed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✍️</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">How posts get written</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Posts come from real problems I've hit as a developer, plus reading the docs and
                changelogs myself before writing anything down.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">How it's funded</h3>
              <p className="text-slate-600 dark:text-slate-300">
                The site runs on ads and occasional affiliate links, disclosed in the{' '}
                <a href="/disclaimer" className="underline">disclaimer</a>. That never decides what
                gets a positive review.
              </p>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Why I started this</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none prose-lg">
            <p>
              I kept losing time trying new AI tools that turned out to be thin wrappers around
              the same underlying model, or that looked good in a demo and fell apart on a real
              codebase. I started keeping notes on what actually held up, and CodeWise AI grew out
              of those notes.
            </p>
            <p>
              It's a small, one-person project. I'd rather it stay honest and useful for a smaller
              audience than pad it out with claims that aren't true.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Have a Tool I Should Look At?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            If you use an AI tool that deserves a real review, or you spot something wrong
            on this site, let me know.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tools"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Explore Tools
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold px-6 py-3 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}