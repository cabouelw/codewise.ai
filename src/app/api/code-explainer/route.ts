import { NextRequest, NextResponse } from "next/server"
import { createNvidiaClient, NVIDIA_MODEL, defaultParams } from "@/lib/nvidia"

// Initialize NVIDIA client
const nvidia = createNvidiaClient()

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
		if (!process.env.NVIDIA_API_KEY) {
			// Mock response for development
			console.warn("⚠️  NVIDIA API key not configured. Returning mock response.")

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

		// Call NVIDIA API
		const completion = await nvidia!.chat.completions.create({
			model: NVIDIA_MODEL,
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
			top_p: defaultParams.top_p,
			max_tokens: defaultParams.max_tokens,
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
			/(?:Key (?:Concepts|Points)):\s*((?:\d+\.|[-•]|\n)+[^\n]+(?:\n(?:\d+\.|[-•])[^\n]+)*)/i,
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

		const message = error instanceof Error ? error.message : "An unexpected error occurred"
		return NextResponse.json({ error: `NVIDIA API Error: ${message}` }, { status: 500 })
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
2. This is a mock explanation - configure NVIDIA API key for detailed analysis
3. Understanding the logic requires knowledge of programming fundamentals

## Complexity
**Time Complexity:** O(n) - estimated based on code structure

---
*Note: This is a mock response for development. Configure your NVIDIA API key to get AI-powered code explanations.*`

	return {
		explanation,
		detectedLanguage,
		complexity: "O(n) - estimated",
		keyPoints: [
			`Uses ${detectedLanguage} syntax`,
			"Mock explanation - configure NVIDIA API",
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
