'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FormattedMessage from '@/components/FormattedMessage'
import ToolContentSection from '@/components/ToolContentSection'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Personal Assistant. I can help you with reminders, scheduling, answering questions, and providing recommendations. How can I assist you today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input.trim(), history: messages })
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const quickActions = [
    { label: 'Set a reminder', icon: '⏰' },
    { label: 'Schedule meeting', icon: '📅' },
    { label: 'Get recommendations', icon: '💡' },
    { label: 'Answer question', icon: '❓' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Assistant</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Your intelligent companion for daily tasks and questions
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${message.role === 'user'
                        ? 'bg-gradient-to-br from-sky-500 to-blue-600'
                        : 'bg-gradient-to-br from-purple-500 to-pink-600'
                        }`}>
                        <span className="text-xl">{message.role === 'user' ? '👤' : '🤖'}</span>
                      </div>

                      {/* Message */}
                      <div className={`rounded-2xl p-4 ${message.role === 'user'
                        ? 'bg-gradient-to-br from-sky-500 to-blue-600 text-white'
                        : 'bg-slate-700/50 text-slate-100'
                        }`}>
                        {message.role === 'user' ? (
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        ) : (
                          <FormattedMessage content={message.content} accentColor="purple" />
                        )}
                        <p className="text-xs mt-2 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div className="bg-slate-700/50 rounded-2xl p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-6 py-4 border-t border-slate-700/50">
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInput(action.label)}
                  className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full text-sm transition-all duration-300 flex items-center gap-2"
                >
                  <span>{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-6 border-t border-slate-700/50">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:scale-105"
              >
                <span>Send</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { icon: '⏰', title: 'Reminders', desc: 'Never forget important tasks' },
            { icon: '📅', title: 'Scheduling', desc: 'Manage your calendar easily' },
            { icon: '💡', title: 'Recommendations', desc: 'Get personalized suggestions' },
            { icon: '❓', title: 'Q&A', desc: 'Ask anything you need' }
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

        <ToolContentSection
          title="AI Personal Assistant"
          description="The AI Personal Assistant is a free, intelligent chatbot designed to help developers and professionals manage their daily tasks more efficiently. It can answer questions on a wide range of topics, help you brainstorm ideas, draft quick responses, set reminders, and provide personalized recommendations based on your needs. Unlike basic chatbots, our AI assistant maintains context throughout your conversation, allowing for natural follow-up questions and multi-step problem solving. It's ideal for quick research, planning sessions, and getting instant answers without leaving your workflow."
          howToUse={[
            'Type your question or request in the message input at the bottom of the chat.',
            'Press Enter or click Send to submit your message.',
            'The AI will process your request and respond with helpful information or suggestions.',
            'Continue the conversation naturally — the assistant remembers context from earlier messages.',
            'Use the quick action buttons for common tasks like setting reminders or getting recommendations.'
          ]}
          features={[
            { title: 'Contextual Conversations', description: 'The assistant remembers your conversation history within a session, enabling natural multi-turn dialogues and follow-up questions.' },
            { title: 'General Knowledge', description: 'Ask about programming, technology, science, business, or any topic. The AI draws from broad training data to provide informative answers.' },
            { title: 'Task Planning', description: 'Describe a project or goal and get step-by-step plans, time estimates, and actionable next steps to move forward.' },
            { title: 'Writing Assistance', description: 'Get help drafting messages, emails, documentation, or any written content quickly and professionally.' }
          ]}
          faq={[
            { question: 'Is the AI assistant free to use?', answer: 'Yes, the AI Personal Assistant is completely free. There are no hidden fees, subscriptions, or usage limits for casual use.' },
            { question: 'Does it remember previous conversations?', answer: 'The assistant maintains context within your current session. Once you close or refresh the page, the conversation history is cleared for your privacy.' },
            { question: 'Can it help with coding questions?', answer: 'Absolutely! You can ask about programming concepts, debug approaches, algorithm explanations, best practices, and more. For code-specific analysis, try our dedicated Code Explainer tool.' },
            { question: 'How is my data handled?', answer: 'Your conversations are processed in real-time and are not stored on our servers after the session ends. We do not use your messages for training purposes.' }
          ]}
        />
      </div>
    </div>
  )
}
