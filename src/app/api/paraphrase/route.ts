import { NextRequest, NextResponse } from "next/server"
import { createNvidiaClient, NVIDIA_MODEL, defaultParams } from "@/lib/nvidia"

// Initialize NVIDIA client
const nvidia = createNvidiaClient()

export async function POST(request: NextRequest) {
	try {
		// Parse request body
		const { text, style = "professional" } = await request.json()

		// Validate input
		if (!text || typeof text !== "string") {
			return NextResponse.json({ error: "Text is required and must be a string" }, { status: 400 })
		}

		if (text.length < 10) {
			return NextResponse.json({ error: "Text must be at least 10 characters long" }, { status: 400 })
		}

		if (text.length > 5000) {
			return NextResponse.json({ error: "Text must be less than 5,000 characters" }, { status: 400 })
		}

		// Check if API key is configured
		if (!process.env.NVIDIA_API_KEY) {
			// Mock response for development
			console.warn("⚠️  NVIDIA API key not configured. Returning mock response.")

			const mockParaphrase = generateMockParaphrase(text, style as string)

			return NextResponse.json({
				paraphrase: mockParaphrase,
				style,
				originalLength: text.length,
				newLength: mockParaphrase.length,
				mock: true,
			})
		}

		// Determine style instructions
		const styleInstructions: Record<string, string> = {
			professional: "Use a professional and formal tone",
			casual: "Use a casual and friendly tone",
			creative: "Use creative and engaging language",
			simple: "Use simple and easy-to-understand language",
			academic: "Use an academic and scholarly tone",
		}

		const instruction = styleInstructions[style as string] || styleInstructions.professional

		// Call NVIDIA API
		const completion = await nvidia!.chat.completions.create({
			model: NVIDIA_MODEL,
			messages: [
				{
					role: "system",
					content: `You are a professional paraphrasing assistant. Rewrite the given text while preserving its original meaning. ${instruction}. Maintain clarity and coherence.`,
				},
				{
					role: "user",
					content: `Paraphrase this text:\n\n${text}`,
				},
			],
			temperature: defaultParams.temperature,
			top_p: defaultParams.top_p,
			max_tokens: 2048,
		})

		const paraphrase = completion.choices[0]?.message?.content || ""

		// Return response
		return NextResponse.json({
			paraphrase,
			style,
			originalLength: text.length,
			newLength: paraphrase.length,
			tokensUsed: completion.usage?.total_tokens || 0,
		})
	} catch (error: unknown) {
		console.error("❌ Error in /api/paraphrase:", error)

		const message = error instanceof Error ? error.message : "An unexpected error occurred"
		return NextResponse.json({ error: `NVIDIA API Error: ${message}` }, { status: 500 })
	}
}

// Mock paraphrase generator for development
function generateMockParaphrase(text: string, style: string): string {
	const prefixes: Record<string, string> = {
		professional: "In a professional manner: ",
		casual: "Put simply: ",
		creative: "Creatively speaking: ",
		simple: "To put it simply: ",
		academic: "From an academic perspective: ",
	}

	const prefix = prefixes[style] || prefixes.professional
	const words = text.split(" ")

	// Simple word reordering for mock
	const shuffled = words
		.map((word) => word.toLowerCase())
		.reverse()
		.join(" ")

	return `${prefix}${shuffled}. [This is a mock paraphrase - configure NVIDIA API key for real results]`
}
