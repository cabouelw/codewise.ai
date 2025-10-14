'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import CopyButton from './CopyButton';
import ShareButton from './ShareButton';

interface ResultDisplayProps {
  result: string;
  title?: string;
  metadata?: ReactNode;
  className?: string;
}

export default function ResultDisplay({
  result,
  title = 'Result',
  metadata,
  className = ''
}: ResultDisplayProps) {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
        {metadata && (
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {metadata}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed">
            {result}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex gap-3">
        <CopyButton text={result} />
        <ShareButton text={result} title={title} />
      </div>
    </motion.div>
  );
}
