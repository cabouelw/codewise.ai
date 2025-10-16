import { NextResponse } from "next/server"
import OpenAI from "openai"

export const runtime = "edge"

const SYSTEM_PROMPT = `You are a professional AI Fitness Coach and Personal Trainer. Your role is to:

1. Create personalized workout plans based on user's fitness level, goals, and available equipment
2. Provide nutrition advice and meal plans tailored to fitness goals
3. Help users set realistic and achievable fitness goals
4. Track progress and provide motivation
5. Answer questions about exercises, form, and technique
6. Suggest modifications for injuries or limitations
7. Give advice on recovery, rest, and injury prevention

Be encouraging, supportive, and professional. Always prioritize safety and recommend consulting healthcare professionals for medical concerns.

Keep responses concise, actionable, and motivating. Use emojis occasionally to keep the tone friendly.`

// Mock responses for common fitness questions
const mockResponses: Record<string, string> = {
	"create a personalized workout plan for me": `💪 **Beginner Full-Body Workout Plan**

**Monday, Wednesday, Friday:**
- Warm-up: 5 min light cardio
- Squats: 3 sets x 12 reps
- Push-ups: 3 sets x 10 reps
- Dumbbell rows: 3 sets x 12 reps
- Plank: 3 sets x 30 seconds
- Cool-down: 5 min stretching

**Tuesday, Thursday:**
- 30 min brisk walking or cycling

**Saturday:**
- Active recovery (yoga or swimming)

**Sunday:**
- Rest day

Start slow and focus on form! 🎯`,

	"design a healthy meal plan for my fitness goals": `🍎 **Healthy Meal Plan**

**Breakfast:**
- Oatmeal with berries and almonds
- Greek yogurt
- Green tea

**Lunch:**
- Grilled chicken breast
- Quinoa
- Mixed vegetables
- Olive oil dressing

**Dinner:**
- Baked salmon
- Sweet potato
- Steamed broccoli

**Snacks:**
- Apple with peanut butter
- Protein shake
- Nuts and seeds

💧 Don't forget: Drink 8+ glasses of water daily!`,

	"help me set realistic fitness goals": `🎯 **SMART Fitness Goals Framework**

Let's set goals that are:
- **S**pecific: Define exactly what you want
- **M**easurable: Track your progress
- **A**chievable: Be realistic
- **R**elevant: Align with your lifestyle
- **T**ime-bound: Set a deadline

**Example Goals:**
✅ Lose 10 pounds in 3 months
✅ Run a 5K in under 30 minutes by June
✅ Do 20 push-ups in a row by end of quarter
✅ Work out 4 times per week consistently

What specific goal would you like to focus on? 💪`,

	"how can i effectively track my fitness progress": `📊 **Effective Progress Tracking Methods**

**1. Measurements:**
- Weekly weigh-ins (same day/time)
- Body measurements (waist, arms, legs)
- Progress photos (monthly)

**2. Performance Metrics:**
- Reps/sets completed
- Weight lifted
- Distance/time for cardio
- Heart rate recovery

**3. Tracking Tools:**
- Fitness app or journal
- Workout log
- Food diary
- Sleep tracker

**4. Qualitative Measures:**
- Energy levels
- Mood improvements
- Clothes fitting better
- Strength gains

Remember: Progress isn't always linear! Focus on trends over time. 📈`,
}

export async function POST(request: Request) {
	try {
		const { message, history } = await request.json()

		if (!message) {
			return NextResponse.json({ error: "Message is required" }, { status: 400 })
		}

		const startTime = Date.now()

		// Check if OpenAI API key is configured
		if (!process.env.OPENAI_API_KEY) {
			// Mock mode
			const lowerMessage = message.toLowerCase().trim()
			let response = ""

			// Find matching mock response
			for (const [key, value] of Object.entries(mockResponses)) {
				if (lowerMessage.includes(key.toLowerCase())) {
					response = value
					break
				}
			}

			// Default mock response
			if (!response) {
				response = `💪 Great question! Here's some fitness advice:

Based on your question, I recommend:
1. Start with the basics and build consistency
2. Focus on proper form over weight/reps
3. Listen to your body and rest when needed
4. Stay hydrated and eat nutritious foods
5. Track your progress regularly

Remember, fitness is a journey, not a destination! Keep going! 🎯

*Note: This is a mock response. Add OPENAI_API_KEY to .env for personalized AI coaching.*`
			}

			const processingTime = Date.now() - startTime

			return NextResponse.json({
				response,
				processingTime,
				mock: true,
			})
		}

		// Real OpenAI integration
		try {
			const openai = new OpenAI({
				apiKey: process.env.OPENAI_API_KEY,
			})

			// Build conversation history
			const messages: any[] = [
				{
					role: "system",
					content: SYSTEM_PROMPT,
				},
			]

			// Add conversation history (last 10 messages)
			if (history && Array.isArray(history)) {
				history.slice(-10).forEach((msg: any) => {
					messages.push({
						role: msg.role,
						content: msg.content,
					})
				})
			}

			// Add current message
			messages.push({
				role: "user",
				content: message,
			})

			const completion = await openai.chat.completions.create({
				model: "gpt-4o-mini",
				messages,
				temperature: 0.7,
				max_tokens: 500,
			})

			const response = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response."
			const processingTime = Date.now() - startTime

			return NextResponse.json({
				response,
				processingTime,
				model: "gpt-4o-mini",
			})
		} catch (apiError: any) {
			console.error("OpenAI API Error:", apiError)

			// Fallback to mock response
			const mockResponse = `💪 I'm here to help with your fitness journey!

While I'm experiencing a temporary connection issue, here's general advice:
- Stay consistent with your workouts
- Focus on progressive overload
- Prioritize recovery and sleep
- Eat a balanced diet with adequate protein
- Stay hydrated throughout the day

What specific aspect of fitness would you like to focus on? 🎯

*Note: Experiencing API issues. Response may be limited.*`

			const processingTime = Date.now() - startTime

			return NextResponse.json({
				response: mockResponse,
				processingTime,
				mock: true,
				error: apiError.message,
			})
		}
	} catch (error: any) {
		console.error("❌ Error in /api/fitness:", error.message)

		return NextResponse.json(
			{
				error: "Failed to process fitness request",
				details: error.message,
			},
			{ status: 500 }
		)
	}
}
