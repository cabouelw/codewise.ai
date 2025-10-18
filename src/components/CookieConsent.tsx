'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield, Settings, X } from 'lucide-react';
import { hasConsent, acceptAll, rejectAll, saveConsent, type ConsentPreferences } from '@/lib/consent';

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

  const handleRejectAll = () => {
    rejectAll();
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
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Confidentialité et Cookies</h2>
                  <p className="text-sm text-white/90 mt-1">
                    Nous respectons votre vie privée
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
                    Nous utilisons des cookies et le stockage local pour améliorer votre expérience.
                    Cela nous aide à mémoriser vos préférences (comme le thème) et à comprendre
                    comment vous utilisez nos outils.
                  </p>

                  <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <Cookie className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-900 dark:text-blue-100">
                      <strong className="font-semibold">Ce que nous stockons :</strong>
                      <ul className="mt-2 space-y-1 ml-4 list-disc">
                        <li>Vos préférences de thème (clair/sombre)</li>
                        <li>Statistiques d&apos;utilisation des outils (anonymes)</li>
                        <li>Paramètres de l&apos;interface</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Nous ne vendons jamais vos données. Toutes les données sont stockées localement
                    sur votre appareil.
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    Accepter tout
                  </button>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="px-6 py-3 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Personnaliser
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Detailed View */}
                <div className="space-y-4">
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    Choisissez quelles données vous souhaitez autoriser :
                  </p>

                  {/* Essential Cookies */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                          Cookies Essentiels
                          <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                            Obligatoire
                          </span>
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          Nécessaires au fonctionnement du site. Ne peuvent pas être désactivés.
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
                          Préférences
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          Mémorise vos préférences (thème, langue, paramètres d&apos;interface).
                        </p>
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => setPreferences(prev => ({ ...prev, preferences: !prev.preferences }))}
                          className={`w-12 h-6 rounded-full transition-colors flex items-center ${preferences.preferences
                              ? 'bg-blue-500 justify-end'
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
                          Statistiques d&apos;utilisation
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          Nous aide à comprendre quels outils sont les plus utiles (données anonymes).
                        </p>
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                          className={`w-12 h-6 rounded-full transition-colors flex items-center ${preferences.analytics
                              ? 'bg-blue-500 justify-end'
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
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    Enregistrer mes choix
                  </button>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-medium rounded-xl transition-all"
                  >
                    Retour
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
              En utilisant ce site, vous acceptez notre utilisation des cookies conformément à cette politique.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
