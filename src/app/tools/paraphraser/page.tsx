'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ToolLayout from '@/components/tools/ToolLayout';
import ResultDisplay from '@/components/tools/ResultDisplay';
import LoadingSpinner from '@/components/tools/LoadingSpinner';
import { consentedStorage, hasConsentFor } from '@/lib/consent';

export default function ParaphraserPage() {
  const [text, setText] = useState('');
  const [style, setStyle] = useState('professional');
  const [result, setResult] = useState('');
  const [metadata, setMetadata] = useState<{
    originalLength: number;
    newLength: number;
    mock?: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const styles = [
    { value: 'professional', label: 'Professional', desc: 'Formal business tone' },
    { value: 'casual', label: 'Casual', desc: 'Friendly and relaxed' },
    { value: 'creative', label: 'Creative', desc: 'Engaging and unique' },
    { value: 'simple', label: 'Simple', desc: 'Easy to understand' },
    { value: 'academic', label: 'Academic', desc: 'Scholarly tone' },
  ];

  const handleParaphrase = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to paraphrase');
      return;
    }

    if (text.length < 10) {
      toast.error('Text must be at least 10 characters long');
      return;
    }

    setIsLoading(true);
    setResult('');
    setMetadata(null);

    try {
      // Track usage only if user has consented to analytics
      if (hasConsentFor('analytics')) {
        const usageKey = 'tool-usage-/tools/paraphraser';
        const currentCount = parseInt(consentedStorage.getItem(usageKey, 'analytics') || '0', 10);
        consentedStorage.setItem(usageKey, String(currentCount + 1), 'analytics');
      }

      const response = await fetch('/api/paraphrase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, style }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to paraphrase text');
      }

      setResult(data.paraphrase);
      setMetadata({
        originalLength: data.originalLength,
        newLength: data.newLength,
        mock: data.mock,
      });

      if (data.mock) {
        toast('Using mock response - configure OpenAI API key', { icon: '⚠️', duration: 5000 });
      } else {
        toast.success('Text paraphrased successfully!');
      }
    } catch (error: unknown) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to paraphrase text');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolLayout
      title="AI Paraphraser"
      description="Rewrite text while preserving meaning. Choose from multiple styles and tones."
      icon={RefreshCw}
      gradient="from-blue-500 to-cyan-500"
    >
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Enter Text to Paraphrase
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Text <span className="text-red-500">*</span>
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to paraphrase (minimum 10 characters)..."
                rows={8}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {text.length} characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Writing Style
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {styles.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setStyle(s.value)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all text-left ${style === s.value
                      ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-400'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                  >
                    <div className="font-semibold">{s.label}</div>
                    <div className="text-xs opacity-75">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              onClick={handleParaphrase}
              disabled={isLoading || text.length < 10}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Paraphrasing...' : 'Paraphrase Text'}
            </motion.button>
          </div>
        </motion.div>

        {isLoading && <LoadingSpinner size="lg" message="Rewriting your text..." />}

        {result && metadata && (
          <ResultDisplay
            result={result}
            title="Paraphrased Text"
            metadata={
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="font-medium">Original:</span> {metadata.originalLength} chars
                </div>
                <div>
                  <span className="font-medium">Paraphrased:</span> {metadata.newLength} chars
                </div>
                <div>
                  <span className="font-medium">Style:</span> {style}
                </div>
                {metadata.mock && (
                  <div className="text-amber-600 dark:text-amber-400">⚠️ Mock Response</div>
                )}
              </div>
            }
          />
        )}
      </div>
    </ToolLayout>
  );
}
