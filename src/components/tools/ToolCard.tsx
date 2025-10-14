'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  category: string;
  gradient: string;
}

export default function ToolCard({
  title,
  description,
  icon: Icon,
  href,
  category,
  gradient
}: ToolCardProps) {
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    // Get usage count from localStorage
    const count = localStorage.getItem(`tool-usage-${href}`) || '0';
    setUsageCount(parseInt(count, 10));
  }, [href]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={href}>
        <div className="group relative h-full bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700">
          {/* Gradient Background */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${gradient}`} />

          {/* Content */}
          <div className="relative p-6">
            {/* Category Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300">
                {category}
              </span>
              {usageCount > 0 && (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Used {usageCount}×
                </span>
              )}
            </div>

            {/* Icon */}
            <div className={`w-12 h-12 mb-4 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {title}
            </h3>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {description}
            </p>

            {/* Arrow Icon */}
            <div className="mt-4 flex items-center text-sky-600 dark:text-sky-400 font-medium text-sm group-hover:gap-2 transition-all">
              <span>Try it now</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
