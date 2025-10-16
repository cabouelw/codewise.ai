'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { featuredTools } from '@/lib/data';

// Get unique categories from tools
const getCategories = () => {
  const cats = new Set<string>();
  featuredTools.forEach(tool => cats.add(tool.category));
  return ['All', ...Array.from(cats).sort()];
};

// Define gradients for different categories
const categoryGradients: Record<string, string> = {
  'AI Assistant': 'from-purple-500 to-pink-500',
  'Deployment': 'from-blue-500 to-cyan-500',
  'Design': 'from-green-500 to-emerald-500',
  'CSS Framework': 'from-orange-500 to-red-500',
  'API Tools': 'from-indigo-500 to-purple-500',
  'Image Processing': 'from-pink-500 to-rose-500',
  'Content Creation': 'from-amber-500 to-orange-500',
  'Translation': 'from-teal-500 to-cyan-500',
  'Health & Fitness': 'from-green-500 to-lime-500',
  'Shopping': 'from-violet-500 to-purple-500',
};

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => getCategories(), []);

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return featuredTools.filter(tool => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Split tools into internal and external
  const internalTools = useMemo(() => {
    return filteredTools.filter(tool => !tool.href.startsWith('http'));
  }, [filteredTools]);

  const externalTools = useMemo(() => {
    return filteredTools.filter(tool => tool.href.startsWith('http'));
  }, [filteredTools]);

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
            Showing {filteredTools.length} of {featuredTools.length} tools
            {internalTools.length > 0 && externalTools.length > 0 && (
              <span className="ml-2">
                ({internalTools.length} internal, {externalTools.length} external)
              </span>
            )}
          </p>
        </motion.div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="space-y-16">
            {/* Internal Tools Section */}
            {internalTools.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Our AI Tools
                    </h2>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {internalTools.length} {internalTools.length === 1 ? 'tool' : 'tools'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {internalTools.map((tool, index) => {
                    const gradient = categoryGradients[tool.category] || 'from-slate-500 to-slate-700';
                    const isExternal = false;

                    return (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index }}
                        whileHover={{ y: -5 }}
                      >
                        <Link
                          href={tool.href}
                          className="block h-full"
                        >
                          <div className="group relative h-full bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700">
                            {/* Gradient Background */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${gradient}`} />

                            {/* Content */}
                            <div className="relative p-6">
                              {/* Category Badge & Featured */}
                              <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300">
                                  {tool.category}
                                </span>
                                {tool.featured && (
                                  <span className="text-xs font-semibold px-2 py-1 rounded bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300">
                                    ⭐ Featured
                                  </span>
                                )}
                              </div>

                              {/* Icon */}
                              <div className={`w-12 h-12 mb-4 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl`}>
                                {tool.icon}
                              </div>

                              {/* Title */}
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                {tool.title}
                              </h3>

                              {/* Description */}
                              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                                {tool.description}
                              </p>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {tool.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              {/* Arrow Icon */}
                              <div className="flex items-center text-sky-600 dark:text-sky-400 font-medium text-sm group-hover:gap-2 transition-all">
                                <span>Try it now</span>
                                <svg
                                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* External Tools Section */}
            {externalTools.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      External Tools
                    </h2>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {externalTools.length} {externalTools.length === 1 ? 'tool' : 'tools'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {externalTools.map((tool, index) => {
                    const gradient = categoryGradients[tool.category] || 'from-slate-500 to-slate-700';
                    const isExternal = true;

                    return (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index }}
                        whileHover={{ y: -5 }}
                      >
                        <Link
                          href={tool.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block h-full"
                        >
                          <div className="group relative h-full bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700">
                            {/* Gradient Background */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${gradient}`} />

                            {/* Content */}
                            <div className="relative p-6">
                              {/* Category Badge & External Badge */}
                              <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300">
                                  {tool.category}
                                </span>
                                <div className="flex items-center gap-1">
                                  {tool.featured && (
                                    <span className="text-xs font-semibold px-2 py-1 rounded bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300">
                                      ⭐
                                    </span>
                                  )}
                                  <span className="text-xs font-semibold px-2 py-1 rounded bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300">
                                    🔗
                                  </span>
                                </div>
                              </div>

                              {/* Icon */}
                              <div className={`w-12 h-12 mb-4 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl`}>
                                {tool.icon}
                              </div>

                              {/* Title */}
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                {tool.title}
                              </h3>

                              {/* Description */}
                              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                                {tool.description}
                              </p>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {tool.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-xs px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              {/* Arrow Icon */}
                              <div className="flex items-center text-sky-600 dark:text-sky-400 font-medium text-sm group-hover:gap-2 transition-all">
                                <span>Visit site</span>
                                <svg
                                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
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