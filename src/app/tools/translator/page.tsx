'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Languages, Volume2, Copy, RefreshCw, Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'auto', name: 'Auto-detect', flag: '🌐' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
];

export default function TranslatorPage() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [detectedLang, setDetectedLang] = useState('');

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setIsTranslating(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sourceText,
          sourceLang,
          targetLang,
        }),
      });

      const data = await response.json();
      if (data.translatedText) {
        setTranslatedText(data.translatedText);
        if (data.detectedLanguage) {
          setDetectedLang(data.detectedLanguage);
        }
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSwapLanguages = () => {
    if (sourceLang === 'auto') return;

    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSpeak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'auto' ? 'en-US' : `${lang}-${lang.toUpperCase()}`;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl mb-4">
            <Languages className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Language Translator
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Translate text between 100+ languages instantly with AI-powered accuracy
          </p>
        </motion.div>

        {/* Translator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Language Selectors */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between gap-4">
              {/* Source Language */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  From
                </label>
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <button
                onClick={handleSwapLanguages}
                disabled={sourceLang === 'auto'}
                className="mt-7 p-3 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>

              {/* Target Language */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  To
                </label>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {LANGUAGES.filter(lang => lang.code !== 'auto').map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {detectedLang && (
              <div className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                <Globe className="w-4 h-4 inline mr-1" />
                Detected language: {LANGUAGES.find(l => l.code === detectedLang)?.name || detectedLang}
              </div>
            )}
          </div>

          {/* Translation Area */}
          <div className="grid md:grid-cols-2 gap-px bg-slate-200 dark:bg-slate-700">
            {/* Source Text */}
            <div className="bg-white dark:bg-slate-800 p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Source Text
                </span>
                <div className="flex items-center gap-2">
                  {sourceText && (
                    <>
                      <button
                        onClick={() => handleSpeak(sourceText, sourceLang)}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </button>
                      <button
                        onClick={() => handleCopy(sourceText)}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        title="Copy"
                      >
                        <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-64 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              />
              <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {sourceText.length} characters
              </div>
            </div>

            {/* Translated Text */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Translation
                </span>
                <div className="flex items-center gap-2">
                  {translatedText && (
                    <>
                      <button
                        onClick={() => handleSpeak(translatedText, targetLang)}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </button>
                      <button
                        onClick={() => handleCopy(translatedText)}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Copy"
                      >
                        <Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="w-full h-64 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white overflow-y-auto">
                {isTranslating ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                  </div>
                ) : translatedText ? (
                  <p className="whitespace-pre-wrap">{translatedText}</p>
                ) : (
                  <p className="text-slate-400">Translation will appear here...</p>
                )}
              </div>
              <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {translatedText.length} characters
              </div>
            </div>
          </div>

          {/* Translate Button */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={handleTranslate}
              disabled={!sourceText.trim() || isTranslating}
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isTranslating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Translating...
                </>
              ) : (
                <>
                  <Languages className="w-5 h-5" />
                  Translate
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
              🌍
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">100+ Languages</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Translate between over 100 languages with high accuracy
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center mb-4">
              ⚡
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Real-time Translation</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Get instant translations powered by advanced AI
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              🎯
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Context-Aware</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              AI understands context for more accurate translations
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
