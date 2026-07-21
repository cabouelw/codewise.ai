import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Editorial Policy | CodeWise AI',
  description:
    'Learn how CodeWise AI reviews, updates, and publishes developer-focused content, including quality standards, sources, corrections, and AI-assistance disclosures.',
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
    canonical: 'https://codewize-ai.website/editorial-policy',
  },
  openGraph: {
    title: 'Editorial Policy | CodeWise AI',
    description:
      'Our standards for technical accuracy, originality, source validation, and transparent updates.',
    type: 'website',
    url: 'https://codewize-ai.website/editorial-policy',
  },
}

export default function EditorialPolicyPage() {
  return (
    <div className="py-20 bg-white dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
          Editorial Policy
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">
          CodeWise AI is an independent, one-person site. This page explains how articles here actually
          get written and reviewed, so you know what you're reading.
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-lg">
          <h2>1. Editorial Mission</h2>
          <p>
            The goal is practical, developer-first writing: tutorials, comparisons, and explainers that
            come from real usage, not marketing copy. Utility over hype.
          </p>

          <h2>2. Quality Standards</h2>
          <ul>
            <li>Every article should provide original analysis, concrete examples, or implementation guidance — not a rehash of a product page.</li>
            <li>Thin, repetitive, or purely templated posts get rewritten or removed when found.</li>
            <li>Factual or comparative claims link to a credible source where possible.</li>
          </ul>

          <h2>3. AI-Assisted Writing Disclosure</h2>
          <p>
            Some posts are drafted with AI assistance for research or a first pass, then edited by me
            before publishing. I do not use a fully automated publish-without-review pipeline — any
            automation that once bypassed review has been turned off.
          </p>

          <h2>4. Review Process</h2>
          <ul>
            <li>Draft and outline</li>
            <li>Fact-check against docs, changelogs, or hands-on testing</li>
            <li>Edit for clarity and remove filler</li>
            <li>Manual approval before it goes live</li>
          </ul>

          <h2>5. Corrections and Updates</h2>
          <p>
            Content gets updated when tools, APIs, pricing, or best practices change. If you spot an
            inaccuracy, I'll correct it as soon as I can verify it.
          </p>

          <h2>6. Monetization and Independence</h2>
          <p>
            CodeWise AI displays advertising and occasional affiliate links. Monetization does not decide
            which tools get a good review.
          </p>

          <h2>7. Contact for Feedback</h2>
          <p>
            To report an issue or request a correction, reach out at{' '}
            <a href="mailto:contact@codewize-ai.website">contact@codewize-ai.website</a> or via the{' '}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
