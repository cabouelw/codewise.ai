/**
 * Cookie and Privacy Consent Management
 * Handles user consent for cookies, localStorage, and tracking
 */

const CONSENT_KEY = "codewise-privacy-consent"
const CONSENT_VERSION = "1.0"

export interface ConsentPreferences {
	essential: boolean // Always true - required for site functionality
	analytics: boolean // Usage tracking, statistics
	preferences: boolean // Theme, settings
	timestamp: number
	version: string
}

export const defaultConsent: ConsentPreferences = {
	essential: true,
	analytics: false,
	preferences: false,
	timestamp: Date.now(),
	version: CONSENT_VERSION,
}

/**
 * Check if user has given consent
 */
export function hasConsent(): boolean {
	if (typeof window === "undefined") return false

	try {
		const consent = localStorage.getItem(CONSENT_KEY)
		return consent !== null
	} catch {
		return false
	}
}

/**
 * Get current consent preferences
 */
export function getConsent(): ConsentPreferences | null {
	if (typeof window === "undefined") return null

	try {
		const stored = localStorage.getItem(CONSENT_KEY)
		if (!stored) return null

		const consent = JSON.parse(stored) as ConsentPreferences

		// Check if consent is outdated
		if (consent.version !== CONSENT_VERSION) {
			return null
		}

		return consent
	} catch {
		return null
	}
}

/**
 * Save consent preferences
 */
export function saveConsent(preferences: Partial<ConsentPreferences>): void {
	if (typeof window === "undefined") return

	const consent: ConsentPreferences = {
		essential: true, // Always required
		analytics: preferences.analytics ?? false,
		preferences: preferences.preferences ?? false,
		timestamp: Date.now(),
		version: CONSENT_VERSION,
	}

	try {
		localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))

		// If analytics is disabled, clear existing tracking data
		if (!consent.analytics) {
			clearAnalyticsData()
		}

		// If preferences is disabled, reset to defaults
		if (!consent.preferences) {
			clearPreferencesData()
		}
	} catch (error) {
		console.error("Failed to save consent:", error)
	}
}

/**
 * Accept all consent options
 */
export function acceptAll(): void {
	saveConsent({
		analytics: true,
		preferences: true,
	})
}

/**
 * Reject all non-essential consent options
 */
export function rejectAll(): void {
	saveConsent({
		analytics: false,
		preferences: false,
	})
}

/**
 * Clear consent (for testing or user request)
 */
export function clearConsent(): void {
	if (typeof window === "undefined") return

	try {
		localStorage.removeItem(CONSENT_KEY)
	} catch (error) {
		console.error("Failed to clear consent:", error)
	}
}

/**
 * Safe localStorage wrapper - only works if user has given consent
 */
export const consentedStorage = {
	setItem: (key: string, value: string, type: "analytics" | "preferences" = "preferences"): void => {
		if (typeof window === "undefined") return

		const consent = getConsent()
		if (!consent) {
			console.warn("Storage access attempted without consent")
			return
		}

		if (type === "analytics" && !consent.analytics) {
			console.warn("Analytics storage disabled by user")
			return
		}

		if (type === "preferences" && !consent.preferences) {
			console.warn("Preferences storage disabled by user")
			return
		}

		try {
			localStorage.setItem(key, value)
		} catch (error) {
			console.error("Failed to set localStorage:", error)
		}
	},

	getItem: (key: string, type: "analytics" | "preferences" = "preferences"): string | null => {
		if (typeof window === "undefined") return null

		const consent = getConsent()
		if (!consent) return null

		if (type === "analytics" && !consent.analytics) return null
		if (type === "preferences" && !consent.preferences) return null

		try {
			return localStorage.getItem(key)
		} catch {
			return null
		}
	},

	removeItem: (key: string): void => {
		if (typeof window === "undefined") return

		try {
			localStorage.removeItem(key)
		} catch (error) {
			console.error("Failed to remove localStorage:", error)
		}
	},
}

/**
 * Clear analytics data from localStorage
 */
function clearAnalyticsData(): void {
	if (typeof window === "undefined") return

	try {
		const keys = Object.keys(localStorage)
		keys.forEach((key) => {
			if (key.startsWith("tool-usage-")) {
				localStorage.removeItem(key)
			}
		})
	} catch (error) {
		console.error("Failed to clear analytics data:", error)
	}
}

/**
 * Clear preferences data from localStorage
 */
function clearPreferencesData(): void {
	if (typeof window === "undefined") return

	try {
		localStorage.removeItem("theme")
	} catch (error) {
		console.error("Failed to clear preferences data:", error)
	}
}

/**
 * Check if specific consent type is granted
 */
export function hasConsentFor(type: "analytics" | "preferences"): boolean {
	const consent = getConsent()
	if (!consent) return false
	return consent[type]
}
