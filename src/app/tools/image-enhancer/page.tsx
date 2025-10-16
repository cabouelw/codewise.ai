'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type EnhancementType = 'enhance' | 'remove-bg' | 'upscale' | 'restore'

interface EnhancementResult {
  originalUrl: string
  enhancedUrl: string
  type: EnhancementType
  processingTime: number
}

export default function ImageEnhancer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [enhancementType, setEnhancementType] = useState<EnhancementType>('enhance')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<EnhancementResult | null>(null)
  const [error, setError] = useState<string>('')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB')
      return
    }

    setSelectedFile(file)
    setError('')
    setResult(null)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleEnhance = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('type', enhancementType)

      const response = await fetch('/api/image-enhance', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Enhancement failed')
      }

      setResult({
        originalUrl: previewUrl,
        enhancedUrl: data.enhancedUrl,
        type: enhancementType,
        processingTime: data.processingTime,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to enhance image')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!result) return

    const link = document.createElement('a')
    link.href = result.enhancedUrl
    link.download = `enhanced-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleReset = () => {
    setSelectedFile(null)
    setPreviewUrl('')
    setResult(null)
    setError('')
  }

  const enhancementOptions = [
    {
      type: 'enhance' as EnhancementType,
      icon: '✨',
      label: 'Enhance',
      desc: 'Improve clarity and colors'
    },
    {
      type: 'remove-bg' as EnhancementType,
      icon: '🎭',
      label: 'Remove Background',
      desc: 'Transparent background'
    },
    {
      type: 'upscale' as EnhancementType,
      icon: '📐',
      label: 'Upscale',
      desc: 'Increase resolution 2x'
    },
    {
      type: 'restore' as EnhancementType,
      icon: '🔧',
      label: 'Restore',
      desc: 'Fix old or damaged photos'
    },
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
            Image Enhancement <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">AI</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Enhance your photos with AI-powered tools. Remove backgrounds, upscale, restore, and more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload & Options */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Upload Area */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Upload Image</h2>

              {!selectedFile ? (
                <label className="block cursor-pointer group">
                  <div className="border-2 border-dashed border-slate-600 hover:border-pink-500 rounded-2xl p-12 text-center transition-all duration-300 group-hover:bg-slate-700/30">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                      <span className="text-4xl">📸</span>
                    </div>
                    <p className="text-white font-semibold mb-2">Click to upload image</p>
                    <p className="text-slate-400 text-sm">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-600">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-64 object-contain bg-slate-900"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{selectedFile.name}</span>
                    <span className="text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                  >
                    Change Image
                  </button>
                </div>
              )}
            </div>

            {/* Enhancement Options */}
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Enhancement Type</h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {enhancementOptions.map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setEnhancementType(option.type)}
                      disabled={isProcessing}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${enhancementType === option.type
                          ? 'border-pink-500 bg-pink-500/10'
                          : 'border-slate-600 hover:border-slate-500 bg-slate-700/30'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="text-white font-semibold mb-1">{option.label}</div>
                      <div className="text-slate-400 text-xs">{option.desc}</div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleEnhance}
                  disabled={isProcessing}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Enhance Image</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Result */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Result</h2>

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

              {!result && !error && !isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center text-center py-20"
                >
                  <div>
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
                      <span className="text-5xl">🖼️</span>
                    </div>
                    <p className="text-slate-400">
                      {selectedFile ? 'Select enhancement type and click "Enhance Image"' : 'Upload an image to get started'}
                    </p>
                  </div>
                </motion.div>
              )}

              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center py-20"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-white font-semibold mb-2">Processing your image...</p>
                    <p className="text-slate-400 text-sm">This may take a few seconds</p>
                  </div>
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-slate-600">
                    <img
                      src={result.enhancedUrl}
                      alt="Enhanced"
                      className="w-full h-96 object-contain bg-slate-900"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Enhanced
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-slate-700/30 rounded-xl p-4">
                      <div className="text-slate-400 mb-1">Processing Time</div>
                      <div className="text-white font-semibold">{result.processingTime}ms</div>
                    </div>
                    <div className="bg-slate-700/30 rounded-xl p-4">
                      <div className="text-slate-400 mb-1">Enhancement</div>
                      <div className="text-white font-semibold capitalize">{result.type}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleDownload}
                      className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>New Image</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { icon: '✨', title: 'AI Enhancement', desc: 'Automatic quality improvement' },
            { icon: '🎭', title: 'Background Removal', desc: 'Clean transparent backgrounds' },
            { icon: '📐', title: 'Smart Upscaling', desc: 'Increase resolution without loss' },
            { icon: '🔧', title: 'Photo Restoration', desc: 'Fix old or damaged photos' }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-center hover:bg-slate-800/50 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
