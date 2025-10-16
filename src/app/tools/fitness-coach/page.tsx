'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Dumbbell, Apple, TrendingUp, Target, Calendar, Activity } from 'lucide-react';
import FormattedMessage from '@/components/FormattedMessage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const FITNESS_STATS = [
  { icon: Activity, label: 'Workouts', value: '12', change: '+3', color: 'text-green-600' },
  { icon: Apple, label: 'Calories', value: '2,450', change: '-150', color: 'text-orange-600' },
  { icon: TrendingUp, label: 'Progress', value: '75%', change: '+10%', color: 'text-blue-600' },
  { icon: Target, label: 'Goals Met', value: '8/10', change: '+2', color: 'text-purple-600' },
];

export default function FitnessCoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your AI Fitness Coach. I can help you with workout plans, nutrition advice, goal setting, and tracking your progress. What would you like to work on today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickActions = [
    { icon: '🍽️', label: 'Get Meal Plan', prompt: 'Create a balanced meal plan for me' },
    { icon: '💪', label: 'Workout Routine', prompt: 'Design a workout routine for my goals' },
    { icon: '💡', label: 'Quick Tips', prompt: 'Give me fitness tips for today' },
  ];

  const handleSend = async (message?: string) => {
    const userMessage = message || input.trim();
    if (!userMessage) return;

    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/fitness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(-10),
        }),
      });

      const data = await response.json();

      if (data.response) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (prompt: string) => {
    handleSend(prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-50 dark:from-slate-900 dark:via-green-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-lime-600 rounded-2xl mb-4">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Health & Fitness Coach
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Your AI-powered personal trainer for workouts, nutrition, and wellness
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {FITNESS_STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col"
              style={{ height: '600px' }}
            >
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                        ? 'bg-gradient-to-r from-green-500 to-lime-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                        }`}
                    >
                      {message.role === 'user' ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      ) : (
                        <FormattedMessage content={message.content} accentColor="green" />
                      )}
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.4s' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    placeholder="Ask about workouts, nutrition, goals..."
                    className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-lime-600 hover:from-green-600 hover:to-lime-700 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.prompt)}
                    disabled={isLoading}
                    className="w-full text-left px-4 py-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{action.icon}</span>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {action.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Today's Plan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-slate-900 dark:text-white">Today's Plan</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">Morning Cardio</div>
                    <div className="text-slate-600 dark:text-slate-400">30 min run</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5"></div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">Healthy Breakfast</div>
                    <div className="text-slate-600 dark:text-slate-400">Oatmeal & fruits</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">Strength Training</div>
                    <div className="text-slate-600 dark:text-slate-400">Upper body workout</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-green-500 to-lime-600 rounded-2xl p-6 text-white"
            >
              <h3 className="font-semibold mb-2">💡 Fitness Tip</h3>
              <p className="text-sm opacity-90">
                Stay hydrated! Drink at least 8 glasses of water daily for optimal performance and
                recovery.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
