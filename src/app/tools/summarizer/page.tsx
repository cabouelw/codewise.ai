'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ToolLayout from '@/components/tools/ToolLayout';
import ResultDisplay from '@/components/tools/ResultDisplay';
import LoadingSpinner from '@/components/tools/LoadingSpinner';
import { consentedStorage, hasConsentFor } from '@/lib/consent';

// Metadata is exported in a separate metadata.ts file for this client component

export default function SummarizerPage() {
  const [text, setText] = useState('');
  const [length, setLength] = useState('medium');
  const [result, setResult] = useState('');
  const [metadata, setMetadata] = useState<{
    originalLength: number;
    summaryLength: number;
    compressionRatio: number;
    mock?: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to summarize');
      return;
    }

    if (text.length < 50) {
      toast.error('Text must be at least 50 characters long');
      return;
    }

    setIsLoading(true);
    setResult('');
    setMetadata(null);

    try {
      // Track usage only if user has consented to analytics
      if (hasConsentFor('analytics')) {
        const usageKey = 'tool-usage-/tools/summarizer';
        const currentCount = parseInt(consentedStorage.getItem(usageKey, 'analytics') || '0', 10);
        consentedStorage.setItem(usageKey, String(currentCount + 1), 'analytics');
      }

      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, length }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to summarize text');
      }

      setResult(data.summary);
      setMetadata({
        originalLength: data.originalLength,
        summaryLength: data.summaryLength,
        compressionRatio: data.compressionRatio,
        mock: data.mock,
      });

      if (data.mock) {
        toast('Using mock response - configure OpenAI API key for real results', {
          icon: '⚠️',
          duration: 5000,
        });
      } else {
        toast.success('Text summarized successfully!');
      }
    } catch (error: unknown) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to summarize text');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolLayout
      title="AI Text Summarizer"
      description="Condense long texts into concise summaries. Perfect for articles, reports, and research papers."
      icon={FileText}
      gradient="from-purple-500 to-pink-500"
    >
      <div className="space-y-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Enter Text to Summarize
          </h2>

          <div className="space-y-4">
            {/* Text Area */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Text <span className="text-red-500">*</span>
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here (minimum 50 characters)..."
                rows={10}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {text.length} characters
                {text.length > 0 && text.length < 50 && (
                  <span className="text-red-500 ml-2">
                    (Minimum 50 required)
                  </span>
                )}
              </p>
            </div>

            {/* Length Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Summary Length
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['short', 'medium', 'long'].map((len) => (
                  <button
                    key={len}
                    onClick={() => setLength(len)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${length === len
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                  >
                    {len.charAt(0).toUpperCase() + len.slice(1)}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {length === 'short' && '2-3 sentences'}
                {length === 'medium' && '1-2 paragraphs'}
                {length === 'long' && '3-4 paragraphs with key points'}
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              onClick={handleSummarize}
              disabled={isLoading || text.length < 50}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Summarizing...' : 'Summarize Text'}
            </motion.button>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && <LoadingSpinner size="lg" message="Analyzing and summarizing your text..." />}

        {/* Result Section */}
        {result && metadata && (
          <ResultDisplay
            result={result}
            title="Summary"
            metadata={
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="font-medium">Original:</span> {metadata.originalLength} chars
                </div>
                <div>
                  <span className="font-medium">Summary:</span> {metadata.summaryLength} chars
                </div>
                <div>
                  <span className="font-medium">Compression:</span> {metadata.compressionRatio}%
                </div>
                {metadata.mock && (
                  <div className="text-amber-600 dark:text-amber-400">
                    ⚠️ Mock Response
                  </div>
                )}
              </div>
            }
          />
        )}
      </div>
    </ToolLayout>
  );
}
