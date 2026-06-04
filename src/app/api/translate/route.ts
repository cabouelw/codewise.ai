import { NextResponse } from "next/server"
import { createNvidiaClient, NVIDIA_MODEL, defaultParams } from "@/lib/nvidia"

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

		// Language names for prompting
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
			tr: "Turkish",
			nl: "Dutch",
			pl: "Polish",
			sv: "Swedish",
			vi: "Vietnamese",
			th: "Thai",
			id: "Indonesian",
		}

		const nvidia = createNvidiaClient()

		// Mock mode if API key is missing
		if (!nvidia) {
			const lowerText = text.toLowerCase().trim()
			let translatedText = mockTranslations[lowerText]?.[targetLang]

			if (!translatedText) {
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
				message: "Mock mode: Add NVIDIA_API_KEY to .env for real translations.",
			})
		}

		// Real NVIDIA API translation
		try {
			const targetLangName = langNames[targetLang] || targetLang
			const sourceLangName = langNames[detectedLanguage] || detectedLanguage

			const completion = await nvidia.chat.completions.create({
				model: NVIDIA_MODEL,
				messages: [
					{
						role: "system",
						content: `You are a professional translator. Translate the given text from ${sourceLangName} to ${targetLangName}. Output ONLY the translated text, nothing else. Preserve formatting, tone, and meaning.`,
					},
					{
						role: "user",
						content: text,
					},
				],
				temperature: 0.3,
				top_p: defaultParams.top_p,
				max_tokens: 2048,
			})

			const translatedText = completion.choices[0]?.message?.content?.trim() || ""
			const processingTime = Date.now() - startTime

			return NextResponse.json({
				translatedText,
				detectedLanguage,
				sourceLang: detectedLanguage,
				targetLang,
				processingTime,
				provider: "NVIDIA Nemotron",
			})
		} catch (apiError: any) {
			console.error("NVIDIA Translation API Error:", apiError)

			// Fallback to mock mode
			const lowerText = text.toLowerCase().trim()
			const translatedText =
				mockTranslations[lowerText]?.[targetLang] || `[${langNames[targetLang] || targetLang} translation]: ${text}`
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
			{ status: 500 },
		)
	}
}
