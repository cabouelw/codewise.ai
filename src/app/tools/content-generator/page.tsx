'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FormattedMessage from '@/components/FormattedMessage'

type ContentType = 'blog' | 'social' | 'marketing' | 'email'
type Tone = 'professional' | 'casual' | 'creative' | 'friendly' | 'formal'
type Length = 'short' | 'medium' | 'long'

interface GeneratedContent {
  title: string
  content: string
  wordCount: number
  readTime: string
}

export default function ContentGenerator() {
  const [contentType, setContentType] = useState<ContentType>('blog')
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState<Tone>('professional')
  const [length, setLength] = useState<Length>('medium')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<GeneratedContent | null>(null)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic')
      return
    }

    setIsGenerating(true)
    setError('')

    try {
      const response = await fetch('/api/content-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType,
          topic: topic.trim(),
          tone,
          length,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Generation failed')
      }

      setResult({
        title: data.title,
        content: data.content,
        wordCount: data.wordCount,
        readTime: data.readTime,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to generate content')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(`${result.title}\n\n${result.content}`)
  }

  const contentTypes = [
    { value: 'blog' as ContentType, icon: '📝', label: 'Blog Post', desc: 'Full article with intro, body, conclusion' },
    { value: 'social' as ContentType, icon: '📱', label: 'Social Media', desc: 'Engaging posts for social platforms' },
    { value: 'marketing' as ContentType, icon: '📢', label: 'Marketing Copy', desc: 'Persuasive sales and ad copy' },
    { value: 'email' as ContentType, icon: '📧', label: 'Email', desc: 'Professional email templates' },
  ]

  const tones = [
    { value: 'professional' as Tone, label: 'Professional' },
    { value: 'casual' as Tone, label: 'Casual' },
    { value: 'creative' as Tone, label: 'Creative' },
    { value: 'friendly' as Tone, label: 'Friendly' },
    { value: 'formal' as Tone, label: 'Formal' },
  ]

  const lengths = [
    { value: 'short' as Length, label: 'Short', words: '100-300' },
    { value: 'medium' as Length, label: 'Medium', words: '300-600' },
    { value: 'long' as Length, label: 'Long', words: '600-1000' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Content <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Generator</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Create high-quality content for blogs, social media, marketing, and emails with AI assistance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Input & Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Type */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Content Type</h2>

              <div className="grid grid-cols-2 gap-4">
                {contentTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setContentType(type.value)}
                    disabled={isGenerating}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${contentType === type.value
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-600 hover:border-slate-500 bg-slate-700/30'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <div className="text-white font-semibold mb-1 text-sm">{type.label}</div>
                    <div className="text-slate-400 text-xs">{type.desc}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Topic Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Topic</h2>

              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your topic or keywords... (e.g., 'The future of AI in healthcare')"
                disabled={isGenerating}
                className="w-full h-32 bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50"
              />
            </motion.div>

            {/* Tone & Length */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 space-y-6"
            >
              {/* Tone */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Tone</h3>
                <div className="flex flex-wrap gap-2">
                  {tones.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTone(t.value)}
                      disabled={isGenerating}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tone === t.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Length */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Length</h3>
                <div className="space-y-2">
                  {lengths.map((l) => (
                    <button
                      key={l.value}
                      onClick={() => setLength(l.value)}
                      disabled={isGenerating}
                      className={`w-full p-3 rounded-lg text-left transition-all ${length === l.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{l.label}</span>
                        <span className="text-sm opacity-75">{l.words} words</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Generate Content</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column - Result */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 h-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Generated Content</h2>
                {result && (
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </button>
                )}
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-6"
                  >
                    <p className="text-red-400 text-sm">{error}</p>
                  </motion.div>
                )}

                {!result && !error && !isGenerating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center text-center py-20"
                  >
                    <div>
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
                        <span className="text-5xl">✍️</span>
                      </div>
                      <p className="text-slate-400">
                        Configure your settings and click "Generate Content" to create amazing content
                      </p>
                    </div>
                  </motion.div>
                )}

                {isGenerating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center py-20"
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-white font-semibold mb-2">Creating your content...</p>
                      <p className="text-slate-400 text-sm">This may take a few moments</p>
                    </div>
                  </motion.div>
                )}

                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                        <div className="text-blue-400 font-semibold text-2xl mb-1">{result.wordCount}</div>
                        <div className="text-slate-400 text-xs">Words</div>
                      </div>
                      <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                        <div className="text-cyan-400 font-semibold text-2xl mb-1">{result.readTime}</div>
                        <div className="text-slate-400 text-xs">Read Time</div>
                      </div>
                      <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                        <div className="text-purple-400 font-semibold text-2xl mb-1 capitalize">{contentType}</div>
                        <div className="text-slate-400 text-xs">Type</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="bg-slate-700/30 rounded-xl p-6 max-h-[600px] overflow-y-auto">
                      <h3 className="text-2xl font-bold text-white mb-4">{result.title}</h3>
                      <div className="text-slate-300">
                        <FormattedMessage content={result.content} accentColor="blue" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
