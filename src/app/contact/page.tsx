import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact CodeWise AI - Get Help & Share Feedback',
  description: 'Get in touch about CodeWise AI. Need help, spot an error, or have a tool suggestion? Send an email and I\'ll get back to you.',
  keywords: ['contact CodeWise AI', 'AI tools feedback', 'developer feedback', 'technical help', 'tool suggestions', 'partnership inquiries'],
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
    canonical: 'https://codewize-ai.website/contact',
  },
  openGraph: {
    title: 'Contact CodeWise AI - Get Help & Share Feedback',
    description: 'Get in touch for feedback, corrections, or partnership questions.',
    type: 'website',
    url: 'https://codewize-ai.website/contact',
    images: [
      {
        url: '/images/blog/AI_vs_Human.png',
        width: 1200,
        height: 628,
        alt: 'Contact CodeWise AI',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Contact CodeWise AI',
    description: 'Get in touch for support, feedback, or partnerships.',
  },
}

export default function ContactPage() {
  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Have a question, spotted something wrong, or want to suggest a tool? Send a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Email</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
                      I read every message and reply as soon as I can — usually within a few days.
                    </p>
                    <a href="mailto:hello@codewize-ai.website" className="text-teal-600 dark:text-teal-400 hover:underline">
                      hello@codewize-ai.website
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                    <span>How do I submit a new tool?</span>
                    <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Email me at hello@codewize-ai.website with details about the tool and why it's worth featuring.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                    <span>Do you offer partnerships?</span>
                    <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Open to it — reach out with specifics and I'll take a look. No guarantees, since it's just me reviewing requests.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}