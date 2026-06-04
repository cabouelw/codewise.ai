import { NextRequest, NextResponse } from "next/server"
import { createNvidiaClient, NVIDIA_MODEL, defaultParams } from "@/lib/nvidia"

// Initialize NVIDIA client
const nvidia = createNvidiaClient()

export async function POST(request: NextRequest) {
	try {
		// Parse request body
		const { text, length = "medium" } = await request.json()

		// Validate input
		if (!text || typeof text !== "string") {
			return NextResponse.json({ error: "Text is required and must be a string" }, { status: 400 })
		}

		if (text.length < 50) {
			return NextResponse.json({ error: "Text must be at least 50 characters long" }, { status: 400 })
		}

		if (text.length > 10000) {
			return NextResponse.json({ error: "Text must be less than 10,000 characters" }, { status: 400 })
		}

		// Check if API key is configured
		if (!process.env.NVIDIA_API_KEY) {
			// Mock response for development
			console.warn("⚠️  NVIDIA API key not configured. Returning mock response.")

			const mockSummary = generateMockSummary(text, length)

			return NextResponse.json({
				summary: mockSummary,
				originalLength: text.length,
				summaryLength: mockSummary.length,
				compressionRatio: Math.round((mockSummary.length / text.length) * 100),
				mock: true,
			})
		}

		// Determine summary length instructions
		const lengthMap: Record<string, string> = {
			short: "in 2-3 sentences",
			medium: "in 1-2 paragraphs",
			long: "in 3-4 paragraphs with key points",
		}
		const lengthInstructions = lengthMap[length as string] || "in 1-2 paragraphs"

		// Call NVIDIA API
		const completion = await nvidia!.chat.completions.create({
			model: NVIDIA_MODEL,
			messages: [
				{
					role: "system",
					content: `You are a professional text summarizer. Summarize the given text ${lengthInstructions}. Focus on the main ideas and key points. Be concise and clear.`,
				},
				{
					role: "user",
					content: text,
				},
			],
			temperature: 0.5,
			top_p: defaultParams.top_p,
			max_tokens: length === "short" ? 500 : length === "long" ? 2048 : 1024,
		})

		const summary = completion.choices[0]?.message?.content || ""

		// Return response
		return NextResponse.json({
			summary,
			originalLength: text.length,
			summaryLength: summary.length,
			compressionRatio: Math.round((summary.length / text.length) * 100),
			tokensUsed: completion.usage?.total_tokens || 0,
		})
	} catch (error: unknown) {
		console.error("❌ Error in /api/summarize:", error)

		const message = error instanceof Error ? error.message : "An unexpected error occurred"
		return NextResponse.json({ error: `NVIDIA API Error: ${message}` }, { status: 500 })
	}
}

// Mock summary generator for development
function generateMockSummary(text: string, length: string): string {
	const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)

	const numSentences =
		{
			short: Math.min(2, sentences.length),
			medium: Math.min(4, sentences.length),
			long: Math.min(6, sentences.length),
		}[length] || 3

	const selectedSentences = sentences
		.slice(0, numSentences)
		.map((s) => s.trim())
		.join(". ")

	return selectedSentences + (selectedSentences.endsWith(".") ? "" : ".")
}
