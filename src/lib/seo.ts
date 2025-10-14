export const siteConfig = {
	name: "Codewise.ai",
	title: "Codewise.ai - Smart AI Tools for Developers",
	description:
		"Empower your coding with smart AI tools — all in one place. Discover, learn, and enhance your development workflow with our curated collection of AI and developer tools.",
	url: "https://codewise.ai",
	ogImage: "https://codewise.ai/og-image.jpg",
	links: {
		twitter: "https://twitter.com/codewise_ai",
		github: "https://github.com/codewise-ai",
	},
}

export const toolsMetadata = {
	summarizer: {
		title: "AI Text Summarizer - Codewise.ai",
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
}

export function generateToolMetadata(toolSlug: string) {
	const tool = toolsMetadata[toolSlug as keyof typeof toolsMetadata]

	if (!tool) {
		return {
			title: "Tool Not Found - Codewise.ai",
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
