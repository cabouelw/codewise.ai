'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield, Settings } from 'lucide-react';
import { hasConsent, acceptAll, saveConsent } from '@/lib/consent';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: true,
    preferences: true,
  });

  useEffect(() => {
    // Check if user has already given consent
    const hasUserConsent = hasConsent();
    setIsVisible(!hasUserConsent);
  }, []);

  const handleAcceptAll = () => {
    acceptAll();
    setIsVisible(false);
    // Reload to apply consent
    window.location.reload();
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setIsVisible(false);
    // Reload to apply consent
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-teal-700 p-6 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Privacy &amp; Cookies</h2>
                  <p className="text-sm text-white/90 mt-1">
                    We respect your privacy
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {!showDetails ? (
              <>
                {/* Simple View */}
                <div className="space-y-4">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    This site uses cookies and local storage to improve your experience —
                    remembering preferences like your theme, and understanding how the
                    tools get used.
                  </p>

                  <div className="flex items-start gap-3 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                    <Cookie className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-teal-900 dark:text-teal-100">
                      <strong className="font-semibold">What gets stored:</strong>
                      <ul className="mt-2 space-y-1 ml-4 list-disc">
                        <li>Your theme preference (light/dark)</li>
                        <li>Anonymous tool usage stats</li>
                        <li>Interface settings</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Your data is never sold. Everything is stored locally on your device.
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl transition-colors shadow-lg"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="px-6 py-3 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Customize
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Detailed View */}
                <div className="space-y-4">
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    Choose what you want to allow:
                  </p>

                  {/* Essential Cookies */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                          Essential
                          <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                            Required
                          </span>
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          Needed for the site to function. Can&apos;t be turned off.
                        </p>
                      </div>
                      <div className="ml-4">
                        <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          Preferences
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          Remembers settings like theme and interface options.
                        </p>
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => setPreferences(prev => ({ ...prev, preferences: !prev.preferences }))}
                          className={`w-12 h-6 rounded-full transition-colors flex items-center ${preferences.preferences
                              ? 'bg-teal-600 justify-end'
                              : 'bg-slate-300 dark:bg-slate-700 justify-start'
                            } px-1`}
                        >
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          Usage Analytics
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          Helps me understand which tools and posts are actually useful (anonymous data).
                        </p>
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                          className={`w-12 h-6 rounded-full transition-colors flex items-center ${preferences.analytics
                              ? 'bg-teal-600 justify-end'
                              : 'bg-slate-300 dark:bg-slate-700 justify-start'
                            } px-1`}
                        >
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSavePreferences}
                    className="flex-1 px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl transition-colors shadow-lg"
                  >
                    Save My Choices
                  </button>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-medium rounded-xl transition-all"
                  >
                    Back
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
              By using this site, you agree to this cookie policy.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
