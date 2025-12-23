export const siteConfig = {
	name: "CodeWise AI",
	title: "CodeWise AI - Smart AI Tools for Developers",
	description:
		"Empower your coding with smart AI tools — all in one place. Discover, learn, and enhance your development workflow with our curated collection of AI and developer tools.",
	url: "https://codewize-ai.website",
	ogImage: "https://codewize-ai.website/images/blog/AI_vs_Human.png",
	links: {
		twitter: "https://twitter.com/codewise_ai",
	},
}

export const toolsMetadata = {
	summarizer: {
		title: "AI Text Summarizer - CodeWise AI",
		description:
			"Condense long texts into concise summaries with AI. Perfect for articles, reports, and research papers. Free online text summarizer tool.",
		keywords: [
			"text summarizer",
			"ai summarizer",
			"summary generator",
			"text summary tool",
			"article summarizer",
			"free summarizer",
		],
		ogImage: "/og-images/summarizer.jpg",
	},
	paraphraser: {
		title: "AI Paraphraser - Rewrite Text Instantly",
		description:
			"Rewrite text while preserving meaning with AI. Choose from multiple styles and tones. Free online paraphrasing tool for students and professionals.",
		keywords: [
			"paraphraser",
			"ai paraphrase",
			"text rewriter",
			"rephrase tool",
			"reword text",
			"free paraphrasing tool",
		],
		ogImage: "/og-images/paraphraser.jpg",
	},
	"email-writer": {
		title: "AI Email Writer - Generate Professional Emails",
		description:
			"Generate professional emails from simple prompts using AI. Save time on correspondence with our intelligent email writer tool.",
		keywords: [
			"email writer",
			"ai email generator",
			"professional email",
			"email composer",
			"automated email",
			"business email tool",
		],
		ogImage: "/og-images/email-writer.jpg",
	},
	"code-explainer": {
		title: "AI Code Explainer - Understand Any Code",
		description:
			"Understand code snippets with detailed AI-powered explanations. Supports multiple programming languages including Python, JavaScript, Java, and more.",
		keywords: [
			"code explainer",
			"ai code analysis",
			"code understanding",
			"programming help",
			"code documentation",
			"learn coding",
		],
		ogImage: "/og-images/code-explainer.jpg",
	},
	translator: {
		title: "AI Language Translator - Translate 100+ Languages",
		description:
			"Real-time AI translation for 100+ languages with context-aware accuracy. Translate text, documents, and content instantly with our free online translator.",
		keywords: [
			"language translator",
			"ai translate",
			"multilingual translation",
			"free translator",
			"translate online",
			"language converter",
		],
		ogImage: "/og-images/translator.jpg",
	},
	"ai-assistant": {
		title: "AI Personal Assistant - Smart Chatbot & Virtual Helper",
		description:
			"Your intelligent AI assistant for reminders, scheduling, Q&A, and personalized recommendations. Free AI chatbot powered by advanced language models.",
		keywords: ["AI assistant", "chatbot", "virtual assistant", "personal AI", "smart assistant", "task automation"],
		ogImage: "/og-images/ai-assistant.jpg",
	},
	"image-enhancer": {
		title: "AI Image Enhancer - Upscale & Enhance Photos",
		description:
			"Enhance photos, remove backgrounds, upscale images, and apply AI-powered filters. Professional image enhancement tool with background removal and quality improvement.",
		keywords: [
			"image enhancer",
			"photo enhancer",
			"ai image upscale",
			"background remover",
			"photo editor",
			"image quality",
		],
		ogImage: "/og-images/image-enhancer.jpg",
	},
	"fitness-coach": {
		title: "AI Fitness Coach - Personal Trainer & Workout Plans",
		description:
			"AI-powered personal trainer with custom workout plans and nutrition guidance. Get personalized fitness coaching, meal plans, and exercise routines.",
		keywords: [
			"fitness coach",
			"AI personal trainer",
			"workout plans",
			"nutrition guidance",
			"exercise routines",
			"health coach",
		],
		ogImage: "/og-images/fitness-coach.jpg",
	},
	"content-generator": {
		title: "AI Content Generator - Create Blog Posts & Articles",
		description:
			"Generate blog posts, social media content, and marketing copy with AI assistance. Create high-quality content for any purpose with our AI writing tool.",
		keywords: [
			"content generator",
			"ai writer",
			"blog post generator",
			"article writer",
			"content creation",
			"marketing copy",
		],
		ogImage: "/og-images/content-generator.jpg",
	},
	"shopping-assistant": {
		title: "AI Shopping Assistant - Smart Product Recommendations",
		description:
			"Smart shopping companion that finds deals, compares prices, and recommends products. Get personalized shopping advice and price comparisons with AI.",
		keywords: [
			"shopping assistant",
			"ai shopping",
			"product recommendations",
			"price comparison",
			"deal finder",
			"smart shopping",
		],
		ogImage: "/og-images/shopping-assistant.jpg",
	},
}

export function generateToolMetadata(toolSlug: string) {
	const tool = toolsMetadata[toolSlug as keyof typeof toolsMetadata]

	if (!tool) {
		return {
			title: "Tool Not Found - CodeWise AI",
			description: siteConfig.description,
		}
	}

	return {
		title: tool.title,
		description: tool.description,
		keywords: tool.keywords,
		openGraph: {
			title: tool.title,
			description: tool.description,
			type: "website",
			url: `${siteConfig.url}/tools/${toolSlug}`,
			images: [
				{
					url: tool.ogImage,
					width: 1200,
					height: 630,
					alt: tool.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: tool.title,
			description: tool.description,
			images: [tool.ogImage],
		},
		alternates: {
			canonical: `${siteConfig.url}/tools/${toolSlug}`,
		},
	}
}
