'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, RefreshCw, Mail, Code, Filter } from 'lucide-react';
import ToolCard from '@/components/tools/ToolCard';

// Tool definitions
const tools = [
  {
    id: 'summarizer',
    title: 'AI Text Summarizer',
    description: 'Condense long texts into concise summaries. Perfect for articles, reports, and research papers.',
    icon: FileText,
    href: '/tools/summarizer',
    category: 'Content',
    gradient: 'from-purple-500 to-pink-500',
    keywords: ['summarize', 'summary', 'condense', 'shorten', 'text', 'article'],
  },
  {
    id: 'paraphraser',
    title: 'AI Paraphraser',
    description: 'Rewrite text while preserving meaning. Choose from multiple styles and tones.',
    icon: RefreshCw,
    href: '/tools/paraphraser',
    category: 'Content',
    gradient: 'from-blue-500 to-cyan-500',
    keywords: ['paraphrase', 'rewrite', 'rephrase', 'reword', 'text'],
  },
  {
    id: 'email-writer',
    title: 'AI Email Writer',
    description: 'Generate professional emails from simple prompts. Save time on correspondence.',
    icon: Mail,
    href: '/tools/email-writer',
    category: 'Writing',
    gradient: 'from-green-500 to-emerald-500',
    keywords: ['email', 'write', 'professional', 'correspondence', 'letter'],
  },
  {
    id: 'code-explainer',
    title: 'AI Code Explainer',
    description: 'Understand code snippets with detailed explanations. Supports multiple languages.',
    icon: Code,
    href: '/tools/code-explainer',
    category: 'Development',
    gradient: 'from-orange-500 to-red-500',
    keywords: ['code', 'explain', 'programming', 'development', 'understand'],
  },
];

const categories = ['All', 'Content', 'Writing', 'Development'];

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
            AI Tools
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Powerful AI-powered tools to boost your productivity. From writing to coding, we've got you covered.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category
                    ? 'bg-sky-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}>
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8">
          <p className="text-slate-600 dark:text-slate-400">
            Showing {filteredTools.length} of {tools.length} tools
          </p>
        </motion.div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <ToolCard {...tool} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No tools found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}