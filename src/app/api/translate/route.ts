import { NextResponse } from "next/server"

export const runtime = "edge"

// Mock translations for common phrases
const mockTranslations: Record<string, Record<string, string>> = {
	hello: {
		es: "Hola",
		fr: "Bonjour",
		de: "Hallo",
		it: "Ciao",
		pt: "Olá",
		ru: "Привет",
		ja: "こんにちは",
		zh: "你好",
		ko: "안녕하세요",
		ar: "مرحبا",
		hi: "नमस्ते",
	},
	"how are you": {
		es: "¿Cómo estás?",
		fr: "Comment allez-vous?",
		de: "Wie geht es dir?",
		it: "Come stai?",
		pt: "Como você está?",
		ru: "Как дела?",
		ja: "お元気ですか？",
		zh: "你好吗？",
		ko: "어떻게 지내세요?",
	},
	"thank you": {
		es: "Gracias",
		fr: "Merci",
		de: "Danke",
		it: "Grazie",
		pt: "Obrigado",
		ru: "Спасибо",
		ja: "ありがとう",
		zh: "谢谢",
		ko: "감사합니다",
		ar: "شكرا",
		hi: "धन्यवाद",
	},
}

// Language detection patterns
const languagePatterns: Record<string, RegExp> = {
	en: /^[a-zA-Z\s.,!?'-]+$/,
	es: /[áéíóúñ¿¡]/i,
	fr: /[àâäçéèêëïîôùûü]/i,
	de: /[äöüß]/i,
	pt: /[ãõçáéíóú]/i,
	ru: /[а-яА-Я]/,
	ja: /[\u3040-\u309F\u30A0-\u30FF]/,
	zh: /[\u4E00-\u9FFF]/,
	ko: /[\uAC00-\uD7AF]/,
	ar: /[\u0600-\u06FF]/,
	hi: /[\u0900-\u097F]/,
}

function detectLanguage(text: string): string {
	for (const [lang, pattern] of Object.entries(languagePatterns)) {
		if (pattern.test(text)) {
			return lang
		}
	}
	return "en"
}

export async function POST(request: Request) {
	try {
		const { text, sourceLang, targetLang } = await request.json()

		if (!text || !targetLang) {
			return NextResponse.json({ error: "Text and target language are required" }, { status: 400 })
		}

		const startTime = Date.now()

		// Auto-detect language if needed
		const detectedLanguage = sourceLang === "auto" ? detectLanguage(text) : sourceLang

		// Check if API keys are configured
		const hasGoogleTranslate = !!process.env.GOOGLE_TRANSLATE_API_KEY
		const hasDeepL = !!process.env.DEEPL_API_KEY

		if (!hasGoogleTranslate && !hasDeepL) {
			// Mock mode - use simple mock translations
			const lowerText = text.toLowerCase().trim()
			let translatedText = mockTranslations[lowerText]?.[targetLang]

			if (!translatedText) {
				// Generate a mock translation by adding language indicator
				const langNames: Record<string, string> = {
					es: "Spanish",
					fr: "French",
					de: "German",
					it: "Italian",
					pt: "Portuguese",
					ru: "Russian",
					ja: "Japanese",
					zh: "Chinese",
					ko: "Korean",
					ar: "Arabic",
					hi: "Hindi",
					en: "English",
				}
				translatedText = `[${langNames[targetLang] || targetLang} translation]: ${text}`
			}

			const processingTime = Date.now() - startTime

			return NextResponse.json({
				translatedText,
				detectedLanguage,
				sourceLang: detectedLanguage,
				targetLang,
				processingTime,
				mock: true,
				message: "Mock mode: Add GOOGLE_TRANSLATE_API_KEY or DEEPL_API_KEY to .env for real translations.",
			})
		}

		// Real API integration
		try {
			let translatedText = ""

			if (hasGoogleTranslate) {
				// Google Translate API
				const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY
				const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`

				const response = await fetch(url, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						q: text,
						target: targetLang,
						source: sourceLang === "auto" ? undefined : sourceLang,
						format: "text",
					}),
				})

				if (!response.ok) {
					throw new Error(`Google Translate API error: ${response.status}`)
				}

				const data = await response.json()
				translatedText = data.data.translations[0].translatedText
				const detectedLang = data.data.translations[0].detectedSourceLanguage || detectedLanguage

				const processingTime = Date.now() - startTime

				return NextResponse.json({
					translatedText,
					detectedLanguage: detectedLang,
					sourceLang: detectedLang,
					targetLang,
					processingTime,
					provider: "Google Translate",
				})
			} else if (hasDeepL) {
				// DeepL API
				const apiKey = process.env.DEEPL_API_KEY!
				const url = "https://api-free.deepl.com/v2/translate"

				const formData = new URLSearchParams()
				formData.append("auth_key", apiKey)
				formData.append("text", text)
				formData.append("target_lang", targetLang.toUpperCase())
				if (sourceLang !== "auto") {
					formData.append("source_lang", sourceLang.toUpperCase())
				}

				const response = await fetch(url, {
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: formData.toString(),
				})

				if (!response.ok) {
					throw new Error(`DeepL API error: ${response.status}`)
				}

				const data = await response.json()
				translatedText = data.translations[0].text
				const detectedLang = data.translations[0].detected_source_language?.toLowerCase() || detectedLanguage

				const processingTime = Date.now() - startTime

				return NextResponse.json({
					translatedText,
					detectedLanguage: detectedLang,
					sourceLang: detectedLang,
					targetLang,
					processingTime,
					provider: "DeepL",
				})
			}
		} catch (apiError: any) {
			console.error("Translation API Error:", apiError)

			// Fallback to mock mode
			const lowerText = text.toLowerCase().trim()
			const translatedText = mockTranslations[lowerText]?.[targetLang] || `[${targetLang} translation]: ${text}`
			const processingTime = Date.now() - startTime

			return NextResponse.json({
				translatedText,
				detectedLanguage,
				sourceLang: detectedLanguage,
				targetLang,
				processingTime,
				mock: true,
				error: apiError.message,
				message: "API request failed, using mock translation.",
			})
		}
	} catch (error: any) {
		console.error("❌ Error in /api/translate:", error.message)

		return NextResponse.json(
			{
				error: "Failed to translate text",
				details: error.message,
			},
			{ status: 500 }
		)
	}
}
