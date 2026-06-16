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
          CodeWise AI publishes practical, developer-first content. This page explains how we create,
          review, and maintain our articles so readers can trust the quality and intent of our work.
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-lg">
          <h2>1. Our Editorial Mission</h2>
          <p>
            We publish tutorials, comparisons, and technical explainers that help developers make better
            decisions and build software more effectively. Our content prioritizes utility over hype and
            focuses on practical outcomes.
          </p>

          <h2>2. Quality Standards</h2>
          <ul>
            <li>Articles must provide original analysis, concrete examples, or implementation guidance.</li>
            <li>Posts are expected to be substantial and structured for readability.</li>
            <li>We avoid thin, repetitive, or purely templated content.</li>
            <li>When claims are factual or comparative, we include credible references where possible.</li>
          </ul>

          <h2>3. AI-Assisted Writing Disclosure</h2>
          <p>
            Some drafts may use AI assistance for ideation or formatting. Final publishing decisions,
            technical verification, and quality checks are performed by human editors.
          </p>

          <h2>4. Editorial Review Workflow</h2>
          <ul>
            <li>Draft creation and outline planning</li>
            <li>Technical fact-checking and source validation</li>
            <li>Readability, clarity, and usefulness review</li>
            <li>Final approval before publishing</li>
          </ul>

          <h2>5. Corrections and Updates</h2>
          <p>
            We update content when tools, APIs, pricing, or best practices change. If we identify material
            inaccuracies, we correct them as quickly as possible.
          </p>

          <h2>6. Monetization and Independence</h2>
          <p>
            CodeWise AI may display advertising or affiliate links. Monetization does not control rankings,
            recommendations, or editorial conclusions.
          </p>

          <h2>7. Contact for Feedback</h2>
          <p>
            To report an issue or request a correction, contact us at{' '}
            <a href="mailto:contact@codewize-ai.website">contact@codewize-ai.website</a> or via our{' '}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
