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
		const { prompt, tone = "professional", type = "general" } = await request.json()

		// Validate input
		if (!prompt || typeof prompt !== "string") {
			return NextResponse.json({ error: "Prompt is required and must be a string" }, { status: 400 })
		}

		if (prompt.length < 5) {
			return NextResponse.json({ error: "Prompt must be at least 5 characters long" }, { status: 400 })
		}

		if (prompt.length > 500) {
			return NextResponse.json({ error: "Prompt must be less than 500 characters" }, { status: 400 })
		}

		// Check if API key is configured
		if (!process.env.OPENAI_API_KEY) {
			// Mock response for development
			console.warn("⚠️  OpenAI API key not configured. Returning mock response.")

			const mockEmail = generateMockEmail(prompt, tone as string, type as string)

			return NextResponse.json({
				email: mockEmail,
				subject: generateMockSubject(prompt),
				tone,
				type,
				wordCount: mockEmail.split(" ").length,
				mock: true,
			})
		}

		// Determine email type and tone
		const emailTypes: Record<string, string> = {
			general: "a general business email",
			followup: "a follow-up email",
			introduction: "an introduction email",
			request: "a request email",
			thankyou: "a thank you email",
			apology: "an apology email",
		}

		const toneInstructions: Record<string, string> = {
			professional: "professional and formal",
			friendly: "friendly and warm",
			formal: "very formal and respectful",
			casual: "casual and relaxed",
			persuasive: "persuasive and convincing",
		}

		const emailType = emailTypes[type as string] || emailTypes.general
		const toneInstruction = toneInstructions[tone as string] || toneInstructions.professional

		// Call OpenAI API
		const completion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system",
					content: `You are a professional email writer. Write ${emailType} with a ${toneInstruction} tone. Include a proper greeting, body, and closing. Make it clear, concise, and well-structured.`,
				},
				{
					role: "user",
					content: `Write an email based on this prompt:\n\n${prompt}`,
				},
			],
			temperature: 0.7,
			max_tokens: 800,
		})

		const emailContent = completion.choices[0]?.message?.content || ""

		// Extract subject line if present, or generate one
		const subjectMatch = emailContent.match(/Subject:\s*(.+)/i)
		let subject = ""
		let email = emailContent

		if (subjectMatch) {
			subject = subjectMatch[1].trim()
			email = emailContent.replace(/Subject:\s*.+\n*/i, "").trim()
		} else {
			// Generate subject with another API call
			const subjectCompletion = await openai.chat.completions.create({
				model: "gpt-4o-mini",
				messages: [
					{
						role: "system",
						content: "Generate a concise email subject line (5-10 words) based on the prompt.",
					},
					{
						role: "user",
						content: prompt,
					},
				],
				temperature: 0.5,
				max_tokens: 50,
			})
			subject = subjectCompletion.choices[0]?.message?.content?.trim() || "Important Message"
		}

		// Return response
		return NextResponse.json({
			email,
			subject,
			tone,
			type,
			wordCount: email.split(/\s+/).length,
			tokensUsed: completion.usage?.total_tokens || 0,
		})
	} catch (error: unknown) {
		console.error("❌ Error in /api/email-writer:", error)

		// Handle OpenAI specific errors
		if (error instanceof OpenAI.APIError) {
			return NextResponse.json({ error: `OpenAI API Error: ${error.message}` }, { status: error.status || 500 })
		}

		// Generic error response
		return NextResponse.json({ error: "An unexpected error occurred while processing your request" }, { status: 500 })
	}
}

// Mock email generator for development
function generateMockEmail(prompt: string, tone: string, type: string): string {
	const greetings: Record<string, string> = {
		professional: "Dear [Recipient],",
		friendly: "Hi there,",
		formal: "Dear Sir/Madam,",
		casual: "Hey!",
		persuasive: "Hello,",
	}

	const closings: Record<string, string> = {
		professional: "Best regards,\n[Your Name]",
		friendly: "Warm regards,\n[Your Name]",
		formal: "Sincerely,\n[Your Name]",
		casual: "Cheers,\n[Your Name]",
		persuasive: "Looking forward to hearing from you,\n[Your Name]",
	}

	const greeting = greetings[tone] || greetings.professional
	const closing = closings[tone] || closings.professional

	return `${greeting}\n\n${prompt}\n\nThis is a mock email generated for development purposes. Configure your OpenAI API key to get real AI-generated emails.\n\n${closing}`
}

// Mock subject generator for development
function generateMockSubject(prompt: string): string {
	const words = prompt.split(" ").slice(0, 5)
	return words.join(" ").replace(/[^a-zA-Z0-9\s]/g, "")
}
