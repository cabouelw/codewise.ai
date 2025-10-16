'use client';

import { useState } from 'react';
import { Code } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ToolLayout from '@/components/tools/ToolLayout';
import ResultDisplay from '@/components/tools/ResultDisplay';
import LoadingSpinner from '@/components/tools/LoadingSpinner';
import { consentedStorage, hasConsentFor } from '@/lib/consent';

export default function CodeExplainerPage() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('auto');
  const [level, setLevel] = useState('beginner');
  const [result, setResult] = useState('');
  const [metadata, setMetadata] = useState<{
    detectedLanguage: string;
    complexity: string;
    keyPoints: string[];
    mock?: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { value: 'auto', label: 'Auto-detect' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
  ];

  const levels = [
    { value: 'beginner', label: 'Beginner', desc: 'Simple explanations' },
    { value: 'intermediate', label: 'Intermediate', desc: 'Moderate detail' },
    { value: 'advanced', label: 'Advanced', desc: 'Technical depth' },
  ];

  const handleExplain = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to explain');
      return;
    }

    if (code.length < 5) {
      toast.error('Code must be at least 5 characters long');
      return;
    }

    setIsLoading(true);
    setResult('');
    setMetadata(null);

    try {
      // Track usage only if user has consented to analytics
      if (hasConsentFor('analytics')) {
        const usageKey = 'tool-usage-/tools/code-explainer';
        const currentCount = parseInt(consentedStorage.getItem(usageKey, 'analytics') || '0', 10);
        consentedStorage.setItem(usageKey, String(currentCount + 1), 'analytics');
      }

      const response = await fetch('/api/code-explainer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, level }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to explain code');
      }

      setResult(data.explanation);
      setMetadata({
        detectedLanguage: data.detectedLanguage,
        complexity: data.complexity,
        keyPoints: data.keyPoints,
        mock: data.mock,
      });

      if (data.mock) {
        toast('Using mock response - configure OpenAI API key', { icon: '⚠️', duration: 5000 });
      } else {
        toast.success('Code explained successfully!');
      }
    } catch (error: unknown) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to explain code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolLayout
      title="AI Code Explainer"
      description="Understand code snippets with detailed explanations. Supports multiple languages."
      icon={Code}
      gradient="from-orange-500 to-red-500"
    >
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Enter Code to Explain
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Code <span className="text-red-500">*</span>
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                rows={12}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none font-mono text-sm"
              />
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {code.length} characters
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Programming Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Explanation Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {levels.map((lvl) => (
                    <button
                      key={lvl.value}
                      onClick={() => setLevel(lvl.value)}
                      className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${level === lvl.value
                        ? 'bg-orange-600 text-white shadow-lg'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                    >
                      <div className="font-semibold">{lvl.label}</div>
                      <div className="text-xs opacity-75 mt-0.5">{lvl.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleExplain}
              disabled={isLoading || code.length < 5}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Explaining Code...' : 'Explain Code'}
            </motion.button>
          </div>
        </motion.div>

        {isLoading && <LoadingSpinner size="lg" message="Analyzing your code..." />}

        {result && metadata && (
          <div className="space-y-6">
            <ResultDisplay
              result={result}
              title="Code Explanation"
              metadata={
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="font-medium">Language:</span> {metadata.detectedLanguage}
                  </div>
                  <div>
                    <span className="font-medium">Complexity:</span> {metadata.complexity}
                  </div>
                  <div>
                    <span className="font-medium">Level:</span> {level}
                  </div>
                  {metadata.mock && (
                    <div className="text-amber-600 dark:text-amber-400">⚠️ Mock Response</div>
                  )}
                </div>
              }
            />

            {metadata.keyPoints && metadata.keyPoints.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Key Points
                </h3>
                <ul className="space-y-2">
                  {metadata.keyPoints.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
