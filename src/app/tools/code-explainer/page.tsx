'use client';

import { useState } from 'react';
import { Code, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ToolLayout from '@/components/tools/ToolLayout';
import LoadingSpinner from '@/components/tools/LoadingSpinner';
import CopyButton from '@/components/tools/CopyButton';
import ShareButton from '@/components/tools/ShareButton';
import FormattedMessage from '@/components/FormattedMessage';
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
        toast('Using mock response - configure NVIDIA API key', { icon: '⚠️', duration: 5000 });
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
      aboutContent="The AI Code Explainer is a free developer tool that uses artificial intelligence to break down complex code into plain-language explanations. Whether you're learning a new programming language, reviewing unfamiliar code during a pull request, or trying to understand legacy code in a large codebase, this tool provides line-by-line explanations that help you understand what the code does, why it works that way, and how different parts connect together. It supports all major programming languages including JavaScript, TypeScript, Python, Java, C++, Go, Rust, and many more."
      howToUse={[
        'Paste your code snippet into the input area — it can be a function, class, algorithm, or any block of code you want explained.',
        'Select the programming language from the dropdown menu for more accurate explanations.',
        'Click the "Explain Code" button to generate a detailed breakdown.',
        'Review the explanation which covers what the code does, key concepts used, and potential improvements.',
        'Use the explanation to learn, document, or share knowledge with your team.'
      ]}
      features={[
        { title: 'Multi-Language Support', description: 'Supports JavaScript, Python, TypeScript, Java, C++, Go, Rust, PHP, Ruby, and 20+ more programming languages with accurate syntax understanding.' },
        { title: 'Line-by-Line Breakdown', description: 'Get detailed explanations of each significant line or block, including what it does, data flow, and side effects.' },
        { title: 'Concept Identification', description: 'Automatically identifies design patterns, algorithms, and programming concepts used in the code.' },
        { title: 'Beginner-Friendly Output', description: 'Explanations are written in clear, accessible language suitable for developers at any skill level.' }
      ]}
      faq={[
        { question: 'What programming languages are supported?', answer: 'Our code explainer supports all popular languages including JavaScript, TypeScript, Python, Java, C#, C++, Go, Rust, PHP, Ruby, Swift, Kotlin, and more. The AI is trained on a wide variety of programming languages and can identify syntax patterns automatically.' },
        { question: 'Is my code stored or shared?', answer: 'No. Code submitted to our explainer is processed in real-time and not stored on our servers. We do not retain, share, or use your code for training purposes. Your intellectual property remains yours.' },
        { question: 'How accurate are the explanations?', answer: 'The AI provides high-quality explanations for most code patterns. However, for highly specialized domain logic or proprietary business rules, the AI may provide general explanations. Always use your judgment to verify accuracy for critical documentation.' },
        { question: 'Can I use this for learning a new language?', answer: 'Absolutely! Many developers use our code explainer to understand code examples in languages they are learning. It helps bridge the gap between seeing code and understanding the concepts behind it.' }
      ]}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <div className="px-6 py-5 bg-gradient-to-r from-orange-50 via-amber-50 to-red-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border-b border-slate-200 dark:border-slate-700">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      AI Code Explanation
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      Structured breakdown with concepts, complexity, and learning notes.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <CopyButton text={result} label="Copy Explanation" />
                    <ShareButton text={result} title="AI Code Explanation" />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200">
                    Language: {metadata.detectedLanguage}
                  </span>
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200">
                    Complexity: {metadata.complexity}
                  </span>
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                    Level: {level}
                  </span>
                  {metadata.mock && (
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200">
                      ⚠ Mock Response
                    </span>
                  )}
                </div>
              </div>

              <div className="px-6 py-6">
                <FormattedMessage content={result} accentColor="orange" />
              </div>
            </motion.div>

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
