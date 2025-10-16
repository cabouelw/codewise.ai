'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ToolLayout from '@/components/tools/ToolLayout';
import ResultDisplay from '@/components/tools/ResultDisplay';
import LoadingSpinner from '@/components/tools/LoadingSpinner';
import { consentedStorage, hasConsentFor } from '@/lib/consent';

export default function EmailWriterPage() {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('professional');
  const [type, setType] = useState('general');
  const [result, setResult] = useState('');
  const [subject, setSubject] = useState('');
  const [metadata, setMetadata] = useState<{ wordCount: number; mock?: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'formal', label: 'Formal' },
    { value: 'casual', label: 'Casual' },
    { value: 'persuasive', label: 'Persuasive' },
  ];

  const types = [
    { value: 'general', label: 'General', icon: '📧' },
    { value: 'followup', label: 'Follow-up', icon: '🔄' },
    { value: 'introduction', label: 'Introduction', icon: '👋' },
    { value: 'request', label: 'Request', icon: '🙏' },
    { value: 'thankyou', label: 'Thank You', icon: '🙌' },
    { value: 'apology', label: 'Apology', icon: '😔' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    if (prompt.length < 5) {
      toast.error('Prompt must be at least 5 characters long');
      return;
    }

    setIsLoading(true);
    setResult('');
    setSubject('');
    setMetadata(null);

    try {
      // Track usage only if user has consented to analytics
      if (hasConsentFor('analytics')) {
        const usageKey = 'tool-usage-/tools/email-writer';
        const currentCount = parseInt(consentedStorage.getItem(usageKey, 'analytics') || '0', 10);
        consentedStorage.setItem(usageKey, String(currentCount + 1), 'analytics');
      }

      const response = await fetch('/api/email-writer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, tone, type }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate email');
      }

      setResult(data.email);
      setSubject(data.subject);
      setMetadata({ wordCount: data.wordCount, mock: data.mock });

      if (data.mock) {
        toast('Using mock response - configure OpenAI API key', { icon: '⚠️', duration: 5000 });
      } else {
        toast.success('Email generated successfully!');
      }
    } catch (error: unknown) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolLayout
      title="AI Email Writer"
      description="Generate professional emails from simple prompts. Save time on correspondence."
      icon={Mail}
      gradient="from-green-500 to-emerald-500"
    >
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Email Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                What do you want to write about? <span className="text-red-500">*</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., Request a meeting with a client to discuss project proposal..."
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {prompt.length} characters
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {types.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setType(t.value)}
                      className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${type === t.value
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                    >
                      {t.icon} {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Tone
                </label>
                <div className="space-y-2">
                  {tones.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTone(t.value)}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition-all text-sm ${tone === t.value
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleGenerate}
              disabled={isLoading || prompt.length < 5}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Generating Email...' : 'Generate Email'}
            </motion.button>
          </div>
        </motion.div>

        {isLoading && <LoadingSpinner size="lg" message="Crafting your email..." />}

        {result && metadata && (
          <ResultDisplay
            result={`Subject: ${subject}\n\n${result}`}
            title="Generated Email"
            metadata={
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="font-medium">Word Count:</span> {metadata.wordCount}
                </div>
                <div>
                  <span className="font-medium">Type:</span> {type}
                </div>
                <div>
                  <span className="font-medium">Tone:</span> {tone}
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
