import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

// Initialize OpenAI client
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || "",
})

export const runtime = "edge"

export async function POST(request: NextRequest) {
	try {
		// Parse request body
		const { code, language = "auto", level = "beginner" } = await request.json()

		// Validate input
		if (!code || typeof code !== "string") {
			return NextResponse.json({ error: "Code is required and must be a string" }, { status: 400 })
		}

		if (code.length < 5) {
			return NextResponse.json({ error: "Code must be at least 5 characters long" }, { status: 400 })
		}

		if (code.length > 5000) {
			return NextResponse.json({ error: "Code must be less than 5,000 characters" }, { status: 400 })
		}

		// Check if API key is configured
		if (!process.env.OPENAI_API_KEY) {
			// Mock response for development
			console.warn("⚠️  OpenAI API key not configured. Returning mock response.")

			const mockExplanation = generateMockExplanation(code, language as string, level as string)

			return NextResponse.json({
				explanation: mockExplanation.explanation,
				detectedLanguage: mockExplanation.detectedLanguage,
				complexity: mockExplanation.complexity,
				keyPoints: mockExplanation.keyPoints,
				level,
				mock: true,
			})
		}

		// Determine explanation level
		const levelInstructions: Record<string, string> = {
			beginner: "Explain in simple terms for someone new to programming. Use analogies and avoid jargon.",
			intermediate: "Explain with moderate technical detail for someone with programming experience.",
			advanced: "Provide a detailed technical explanation with advanced concepts and best practices.",
		}

		const instruction = levelInstructions[level as string] || levelInstructions.beginner

		// Detect language if auto
		const languageHint =
			language !== "auto" ? `The code is written in ${language}.` : "Detect the programming language."

		// Call OpenAI API
		const completion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system",
					content: `You are an expert programming instructor. ${instruction} ${languageHint} Explain what the code does, break down key components, and highlight important concepts. Provide the response in a structured format with sections.`,
				},
				{
					role: "user",
					content: `Explain this code:\n\n\`\`\`\n${code}\n\`\`\`\n\nProvide:\n1. Detected Language (if auto)\n2. Overview\n3. Line-by-line or section explanation\n4. Key concepts\n5. Complexity assessment`,
				},
			],
			temperature: 0.6,
			max_tokens: 1500,
		})

		const fullResponse = completion.choices[0]?.message?.content || ""

		// Parse the response to extract components
		const detectedLanguageMatch = fullResponse.match(/(?:Language|Detected Language):\s*([^\n]+)/i)
		const detectedLanguage = detectedLanguageMatch
			? detectedLanguageMatch[1].trim()
			: language !== "auto"
			? language
			: "Unknown"

		const complexityMatch = fullResponse.match(/(?:Complexity|Time Complexity):\s*([^\n]+)/i)
		const complexity = complexityMatch ? complexityMatch[1].trim() : "Not specified"

		// Extract key points (look for numbered lists or bullet points)
		const keyPointsMatch = fullResponse.match(
			/(?:Key (?:Concepts|Points)):\s*((?:\d+\.|[-•]|\n)+[^\n]+(?:\n(?:\d+\.|[-•])[^\n]+)*)/i
		)
		let keyPoints: string[] = []

		if (keyPointsMatch) {
			keyPoints = keyPointsMatch[1]
				.split(/\n/)
				.filter((line) => line.trim().length > 0)
				.map((line) => line.replace(/^\d+\.\s*|^[-•]\s*/, "").trim())
				.filter((point) => point.length > 0)
		}

		// Return response
		return NextResponse.json({
			explanation: fullResponse,
			detectedLanguage,
			complexity,
			keyPoints: keyPoints.length > 0 ? keyPoints : ["Check the full explanation for details"],
			level,
			codeLength: code.length,
			tokensUsed: completion.usage?.total_tokens || 0,
		})
	} catch (error: unknown) {
		console.error("❌ Error in /api/code-explainer:", error)

		// Handle OpenAI specific errors
		if (error instanceof OpenAI.APIError) {
			return NextResponse.json({ error: `OpenAI API Error: ${error.message}` }, { status: error.status || 500 })
		}

		// Generic error response
		return NextResponse.json({ error: "An unexpected error occurred while processing your request" }, { status: 500 })
	}
}

// Mock explanation generator for development
function generateMockExplanation(code: string, language: string, level: string) {
	const detectedLanguage = language !== "auto" ? language : detectLanguage(code)

	const levelDescriptions: Record<string, string> = {
		beginner: "simple and easy to understand",
		intermediate: "moderately detailed",
		advanced: "technically comprehensive",
	}

	const explanation = `## Detected Language: ${detectedLanguage}

## Overview
This code snippet appears to perform operations typical of ${detectedLanguage} programming. The explanation is ${
		levelDescriptions[level] || "detailed"
	}.

## Breakdown
${code
	.split("\n")
	.slice(0, 5)
	.map((line, i) => `**Line ${i + 1}:** ${line}`)
	.join("\n")}

## Key Concepts
1. The code uses ${detectedLanguage} syntax
2. This is a mock explanation - configure OpenAI API key for detailed analysis
3. Understanding the logic requires knowledge of programming fundamentals

## Complexity
**Time Complexity:** O(n) - estimated based on code structure

---
*Note: This is a mock response for development. Configure your OpenAI API key to get AI-powered code explanations.*`

	return {
		explanation,
		detectedLanguage,
		complexity: "O(n) - estimated",
		keyPoints: [
			`Uses ${detectedLanguage} syntax`,
			"Mock explanation - configure OpenAI API",
			"Requires programming fundamentals knowledge",
		],
	}
}

// Simple language detection for mock
function detectLanguage(code: string): string {
	if (code.includes("function") || code.includes("=>") || code.includes("const ") || code.includes("let ")) {
		return "JavaScript/TypeScript"
	}
	if (code.includes("def ") || code.includes("import ") || code.includes("print(")) {
		return "Python"
	}
	if (code.includes("public class") || code.includes("System.out")) {
		return "Java"
	}
	if (code.includes("#include") || code.includes("std::")) {
		return "C++"
	}
	if (code.includes("func ") || code.includes("package main")) {
		return "Go"
	}
	return "Unknown"
}
