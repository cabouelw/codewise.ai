'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, LucideIcon } from 'lucide-react';

interface ToolLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  aboutContent?: string;
  howToUse?: string[];
  features?: { title: string; description: string }[];
  faq?: { question: string; answer: string }[];
}

export default function ToolLayout({
  children,
  title,
  description,
  icon: Icon,
  gradient,
  aboutContent,
  howToUse,
  features,
  faq
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tools</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-start gap-6">
            {/* Icon */}
            <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
            </div>

            {/* Text */}
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
                {title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {children}
        </motion.div>

        {/* About Section */}
        {aboutContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">About {title}</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{aboutContent}</p>
            </div>

            {howToUse && howToUse.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How to Use</h2>
                <ol className="space-y-3">
                  {howToUse.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                      <span className="flex-shrink-0 w-7 h-7 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {features && features.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                      <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{feature.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {faq && faq.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {faq.map((item, index) => (
                    <div key={index}>
                      <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{item.question}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
