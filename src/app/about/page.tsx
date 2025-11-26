import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About CodeWise AI - Empowering Developers with AI Tools',
  description: 'Learn about CodeWise AI\'s mission to empower 10,000+ developers worldwide with the best free AI tools and resources. Discover our story, values, and commitment to developer success.',
  keywords: ['about CodeWise AI', 'AI tools platform', 'developer resources platform', 'AI for developers', 'coding tools platform', 'software development community', 'developer tools company', 'AI development platform'],
  openGraph: {
    title: 'About CodeWise AI - Empowering Developers with AI Tools',
    description: 'Empowering 10,000+ developers with free AI tools. Learn about our mission and values.',
    type: 'website',
    url: 'https://codewise-ai.vercel.app/about',
    images: [
      {
        url: '/images/blog/AI_vs_Human.png',
        width: 1200,
        height: 628,
        alt: 'About CodeWise AI - Empowering Developers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About CodeWise AI',
    description: 'Empowering developers with AI tools and resources.',
  },
}

export default function AboutPage() {
  return (
    <div className="py-20 bg-white dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            About codewise-ai.vercel.app
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            We're on a mission to empower developers with the best AI tools and resources
            to build better software faster.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              At codewise-ai.vercel.app, we believe that the future of software development lies in the
              intelligent collaboration between humans and AI. Our platform serves as a bridge,
              connecting developers with cutting-edge AI tools and resources that enhance
              productivity, creativity, and innovation.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Innovation</h3>
              <p className="text-slate-600 dark:text-slate-300">
                We constantly explore and curate the latest AI technologies to keep developers
                at the forefront of innovation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Community</h3>
              <p className="text-slate-600 dark:text-slate-300">
                We foster a collaborative environment where developers can share knowledge,
                learn, and grow together.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Efficiency</h3>
              <p className="text-slate-600 dark:text-slate-300">
                We focus on tools and practices that maximize developer productivity and
                streamline workflows.
              </p>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Our Story</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none prose-lg">
            <p>
              Founded in 2024, codewise-ai.vercel.app emerged from the recognition that while AI tools
              were becoming increasingly powerful, developers often struggled to discover,
              evaluate, and integrate these tools into their workflows effectively.
            </p>
            <p>
              Our team of experienced developers and AI enthusiasts set out to create a
              centralized platform where the best AI tools and resources could be discovered,
              understood, and utilized by developers of all skill levels.
            </p>
            <p>
              Today, we serve thousands of developers worldwide, helping them stay ahead of
              the curve in an rapidly evolving technological landscape.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "Founder & CEO",
                bio: "Former tech lead with 10+ years in AI and web development",
                avatar: "👨‍💻"
              },
              {
                name: "Sarah Rodriguez",
                role: "Head of Content",
                bio: "Technical writer and developer advocate with expertise in AI tools",
                avatar: "👩‍💼"
              },
              {
                name: "Marcus Johnson",
                role: "Lead Developer",
                bio: "Full-stack developer passionate about developer experience",
                avatar: "👨‍🔬"
              }
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{member.avatar}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sky-600 dark:text-sky-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Be part of a growing community of developers who are shaping the future of
            software development with AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tools"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
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