import { NextResponse } from "next/server"
import OpenAI from "openai"

export const runtime = "edge"

const openai = process.env.OPENAI_API_KEY
	? new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
	  })
	: null

export async function POST(request: Request) {
	try {
		const { message, history } = await request.json()

		if (!message || typeof message !== "string") {
			return NextResponse.json({ error: "Message is required" }, { status: 400 })
		}

		// Mock response if no API key
		if (!openai) {
			const mockResponses = [
				"I can help you with that! As your AI assistant, I'm here to manage reminders, schedule events, answer questions, and provide recommendations. What would you like to do?",
				"Great question! I can assist you with various tasks like setting reminders, organizing your schedule, providing information, and offering personalized recommendations based on your needs.",
				"I'd be happy to help! Whether you need to schedule a meeting, set a reminder, or get answers to your questions, I'm here to make your day easier.",
				"Absolutely! I can help you stay organized and productive. Just let me know what you need - reminders, scheduling, information, or recommendations!",
			]

			const response = mockResponses[Math.floor(Math.random() * mockResponses.length)]

			return NextResponse.json({
				response,
				mock: true,
			})
		}

		// Build conversation history for context
		const messages = [
			{
				role: "system" as const,
				content:
					"You are a helpful AI personal assistant. You help users with reminders, scheduling, answering questions, and providing recommendations. Be friendly, concise, and helpful. When users ask for reminders or scheduling, acknowledge their request and confirm the details.",
			},
			...history.slice(-10).map((msg: any) => ({
				role: msg.role as "user" | "assistant",
				content: msg.content,
			})),
			{
				role: "user" as const,
				content: message,
			},
		]

		const completion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages,
			max_tokens: 500,
			temperature: 0.7,
		})

		const response =
			completion.choices[0]?.message?.content || "I apologize, but I couldn't process that request. Please try again."

		return NextResponse.json({
			response,
			usage: {
				promptTokens: completion.usage?.prompt_tokens,
				completionTokens: completion.usage?.completion_tokens,
				totalTokens: completion.usage?.total_tokens,
			},
		})
	} catch (error: any) {
		console.error("❌ Error in /api/chat:", error.message)

		return NextResponse.json(
			{
				error: "Failed to process chat message",
				details: error.message,
			},
			{ status: 500 }
		)
	}
}
