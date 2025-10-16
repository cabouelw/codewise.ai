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
		const { contentType, topic, tone, length } = await request.json()

		if (!topic || typeof topic !== "string") {
			return NextResponse.json({ error: "Topic is required" }, { status: 400 })
		}

		// Mock response if no API key
		if (!openai) {
			const mockContent = generateMockContent(contentType, topic, tone, length)
			return NextResponse.json(mockContent)
		}

		// Build prompt based on content type
		let systemPrompt = ""
		let userPrompt = ""

		switch (contentType) {
			case "blog":
				systemPrompt = `You are an expert blog writer. Create engaging, well-structured blog posts with clear introductions, informative body sections, and compelling conclusions. Write in a ${tone} tone.`
				userPrompt = `Write a ${length} blog post about: ${topic}`
				break
			case "social":
				systemPrompt = `You are a social media expert. Create engaging, shareable social media posts that capture attention and drive engagement. Write in a ${tone} tone.`
				userPrompt = `Create a ${length} social media post about: ${topic}`
				break
			case "marketing":
				systemPrompt = `You are a marketing copywriter. Create persuasive, benefit-focused copy that drives action. Write in a ${tone} tone.`
				userPrompt = `Write ${length} marketing copy about: ${topic}`
				break
			case "email":
				systemPrompt = `You are an email marketing specialist. Create professional, action-oriented emails with clear subject lines and CTAs. Write in a ${tone} tone.`
				userPrompt = `Write a ${length} email about: ${topic}`
				break
			default:
				systemPrompt = `You are a professional content writer. Create high-quality content in a ${tone} tone.`
				userPrompt = `Write ${length} content about: ${topic}`
		}

		const completion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{ role: "system", content: systemPrompt },
				{ role: "user", content: userPrompt },
			],
			max_tokens: length === "short" ? 500 : length === "medium" ? 1000 : 1500,
			temperature: tone === "creative" ? 0.9 : 0.7,
		})

		const generatedText = completion.choices[0]?.message?.content || ""

		// Extract title (first line) and content
		const lines = generatedText.split("\n").filter((line: string) => line.trim())
		const title = lines[0].replace(/^#+\s*/, "").trim()
		const content = lines.slice(1).join("\n\n").trim()

		// Calculate stats
		const wordCount = content.split(/\s+/).length
		const readTime = Math.ceil(wordCount / 200) + " min"

		return NextResponse.json({
			title,
			content,
			wordCount,
			readTime,
			usage: {
				promptTokens: completion.usage?.prompt_tokens,
				completionTokens: completion.usage?.completion_tokens,
				totalTokens: completion.usage?.total_tokens,
			},
		})
	} catch (error: any) {
		console.error("❌ Error in /api/content-generate:", error.message)

		return NextResponse.json(
			{
				error: "Failed to generate content",
				details: error.message,
			},
			{ status: 500 }
		)
	}
}

function generateMockContent(contentType: string, topic: string, tone: string, length: string) {
	const wordCounts: Record<string, number> = {
		short: 200,
		medium: 400,
		long: 700,
	}

	const mockTitles: Record<string, string> = {
		blog: `Understanding ${topic}: A Comprehensive Guide`,
		social: `${topic} - What You Need to Know`,
		marketing: `Transform Your Business with ${topic}`,
		email: `Important Update: ${topic}`,
	}

	const mockContent: Record<string, string> = {
		blog: `In today's fast-paced world, ${topic} has become increasingly important. This comprehensive guide will help you understand the key concepts and practical applications.

Introduction
${topic} represents a significant opportunity for growth and innovation. Whether you're just starting out or looking to deepen your understanding, this guide provides valuable insights.

Key Points
First, it's essential to understand the fundamentals. ${topic} involves several critical components that work together to create value. By mastering these basics, you'll be well-positioned for success.

Second, implementation requires careful planning and execution. Consider your specific needs and goals as you develop your strategy. This personalized approach ensures the best possible outcomes.

Best Practices
Following industry best practices is crucial for success with ${topic}. Start with small, manageable steps and gradually scale your efforts. This measured approach reduces risk while maximizing learning opportunities.

Conclusion
${topic} offers tremendous potential for those willing to invest time and effort. By following the principles outlined in this guide, you'll be well-equipped to achieve your goals. Remember that success comes from consistent application and continuous learning.`,

		social: `🚀 Excited to share insights about ${topic}!

Did you know that ${topic} is transforming the way we work and live? Here are 3 key takeaways:

✨ Innovation: ${topic} is driving unprecedented change
💡 Opportunity: Early adopters are seeing amazing results
🎯 Action: Now is the perfect time to get started

What's your experience with ${topic}? Drop a comment below! 👇

#${topic.replace(/\s+/g, "")} #Innovation #Growth #Success`,

		marketing: `Discover the Power of ${topic}

Are you ready to transform your results? ${topic} is the solution you've been searching for.

Why Choose ${topic}?
✓ Proven results that exceed expectations
✓ Easy to implement and use
✓ Backed by industry experts
✓ Trusted by thousands of satisfied customers

Limited Time Offer
Get started today and unlock exclusive benefits:
• 30-day money-back guarantee
• Free expert consultation
• Comprehensive support and training
• Regular updates and improvements

Don't Miss Out
Join the thousands who have already discovered the benefits of ${topic}. Your success story starts here.

[Call to Action] Get Started Now →

Experience the difference ${topic} can make in your business today!`,

		email: `Subject: Discover How ${topic} Can Help You Succeed

Hi there,

I wanted to reach out because ${topic} is something that could really benefit you.

${topic} has helped countless others achieve their goals, and I believe it could do the same for you. Here's why:

• Proven track record of success
• Easy to get started
• Comprehensive support available
• Results you can see

We're offering a special opportunity for new users to try ${topic} risk-free. This is the perfect chance to see the benefits firsthand.

Would you be interested in learning more? Simply reply to this email, and I'll send you additional information.

Looking forward to hearing from you!

Best regards,
[Your Name]

P.S. This offer won't last long, so don't wait to take advantage of this opportunity.`,
	}

	const title = mockTitles[contentType] || `${topic} - Complete Guide`
	const content = mockContent[contentType] || mockContent.blog
	const wordCount = wordCounts[length]
	const readTime = Math.ceil(wordCount / 200) + " min"

	return {
		title,
		content,
		wordCount,
		readTime,
		mock: true,
		message: "Mock mode: Sample content generated. Add OPENAI_API_KEY to .env for AI-generated content.",
	}
}
