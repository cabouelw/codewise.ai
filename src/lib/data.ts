// Sample data for tools - in a real app, this would come from a CMS or API
export interface Tool {
	id: string
	title: string
	description: string
	category: string
	icon: string
	href: string
	featured?: boolean
	tags: string[]
}

export interface BlogPost {
	id: string
	title: string
	excerpt: string
	slug: string
	publishedAt: string
	readTime: string
	category: string
	image?: string
	featured?: boolean
}

export interface Category {
	id: string
	title: string
	description: string
	icon: string
	href: string
	toolCount: number
	gradient: string
}

export const featuredTools: Tool[] = [
	{
		id: "1",
		title: "GitHub Copilot",
		description: "AI pair programmer that helps you write code faster with intelligent suggestions and completions.",
		category: "AI Assistant",
		icon: "🤖",
		href: "https://github.com/features/copilot",
		featured: true,
		tags: ["AI", "Code Generation", "VS Code"],
	},
	{
		id: "2",
		title: "ChatGPT",
		description: "Advanced AI conversational model for coding questions, debugging, and technical explanations.",
		category: "AI Assistant",
		icon: "💬",
		href: "https://chat.openai.com",
		featured: true,
		tags: ["AI", "Debugging", "Learning"],
	},
	{
		id: "3",
		title: "Vercel",
		description: "Deploy your web applications instantly with zero configuration and automatic scaling.",
		category: "Deployment",
		icon: "🚀",
		href: "https://vercel.com",
		featured: true,
		tags: ["Deployment", "Hosting", "CI/CD"],
	},
	{
		id: "4",
		title: "Figma",
		description: "Collaborative design tool for creating user interfaces and prototypes with your team.",
		category: "Design",
		icon: "🎨",
		href: "https://figma.com",
		tags: ["Design", "UI/UX", "Collaboration"],
	},
	{
		id: "5",
		title: "Tailwind CSS",
		description: "Utility-first CSS framework for rapidly building custom user interfaces.",
		category: "CSS Framework",
		icon: "💨",
		href: "https://tailwindcss.com",
		tags: ["CSS", "Framework", "Design"],
	},
	{
		id: "6",
		title: "Postman",
		description: "API development environment for building, testing, and documenting APIs.",
		category: "API Tools",
		icon: "📮",
		href: "https://postman.com",
		tags: ["API", "Testing", "Documentation"],
	},
	{
		id: "7",
		title: "AI Personal Assistant",
		description: "Smart chatbot that helps with reminders, scheduling, Q&A, and personalized recommendations.",
		category: "AI Assistant",
		icon: "🤖",
		href: "/tools/ai-assistant",
		featured: true,
		tags: ["AI", "Chatbot", "Assistant"],
	},
	{
		id: "8",
		title: "Image Enhancement AI",
		description: "Enhance photos, remove backgrounds, upscale images, and apply AI-powered filters.",
		category: "Image Processing",
		icon: "🖼️",
		href: "/tools/image-enhancer",
		featured: true,
		tags: ["AI", "Image", "Enhancement"],
	},
	{
		id: "9",
		title: "Content Generator",
		description: "Generate blog posts, social media content, and marketing copy with AI assistance.",
		category: "Content Creation",
		icon: "✍️",
		href: "/tools/content-generator",
		tags: ["AI", "Writing", "Content"],
	},
	{
		id: "10",
		title: "Language Translator",
		description: "Real-time translation for 100+ languages with context-aware AI translation.",
		category: "Translation",
		icon: "🌐",
		href: "/tools/translator",
		tags: ["AI", "Translation", "Language"],
	},
	{
		id: "11",
		title: "Health & Fitness Coach",
		description: "AI-powered personal trainer with custom workout plans and nutrition guidance.",
		category: "Health & Fitness",
		icon: "💪",
		href: "/tools/fitness-coach",
		tags: ["AI", "Health", "Fitness"],
	},
	{
		id: "12",
		title: "Shopping Assistant",
		description: "Smart shopping companion that finds deals, compares prices, and recommends products.",
		category: "Shopping",
		icon: "🛍️",
		href: "/tools/shopping-assistant",
		tags: ["AI", "Shopping", "Recommendations"],
	},
]

export const categories: Category[] = [
	{
		id: "1",
		title: "AI Assistants",
		description: "Smart AI-powered tools for productivity, content creation, and personalized assistance.",
		icon: "🤖",
		href: "/tools?category=AI%20Assistant",
		toolCount: 6,
		gradient: "bg-gradient-to-br from-purple-500 to-indigo-600",
	},
	{
		id: "2",
		title: "Content Tools",
		description: "Writing, paraphrasing, and content generation tools for all your creative needs.",
		icon: "✍️",
		href: "/tools?category=Content%20Creation",
		toolCount: 4,
		gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
	},
	{
		id: "3",
		title: "Developer Tools",
		description: "Code explanation, email writing, and text processing utilities for developers.",
		icon: "⚙️",
		href: "/tools?category=Developer%20Tools",
		toolCount: 3,
		gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
	},
	{
		id: "4",
		title: "Image Processing",
		description: "AI-powered image enhancement, upscaling, and background removal tools.",
		icon: "🖼️",
		href: "/tools?category=Image%20Processing",
		toolCount: 1,
		gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
	},
	{
		id: "5",
		title: "Translation",
		description: "Real-time language translation with AI-powered context awareness.",
		icon: "🌐",
		href: "/tools?category=Translation",
		toolCount: 1,
		gradient: "bg-gradient-to-br from-orange-500 to-amber-600",
	},
	{
		id: "6",
		title: "Lifestyle & Shopping",
		description: "Personal fitness coaching and smart shopping assistant for everyday needs.",
		icon: "🛍️",
		href: "/tools?category=Shopping",
		toolCount: 2,
		gradient: "bg-gradient-to-br from-violet-500 to-purple-600",
	},
]

export const blogPosts: BlogPost[] = [
	{
		id: "1",
		title: "The Future of AI in Software Development",
		excerpt:
			"Explore how artificial intelligence is revolutionizing the way we write, test, and deploy software applications.",
		slug: "future-of-ai-in-software-development",
		publishedAt: "2024-01-15",
		readTime: "5 min read",
		category: "AI & Development",
		image: "/blog/ai-development.jpg",
		featured: true,
	},
	{
		id: "2",
		title: "Building Scalable Web Applications with Next.js",
		excerpt:
			"Learn best practices for creating high-performance, scalable web applications using Next.js and modern tools.",
		slug: "building-scalable-web-applications-nextjs",
		publishedAt: "2024-01-10",
		readTime: "8 min read",
		category: "Web Development",
		image: "/blog/nextjs-guide.jpg",
	},
	{
		id: "3",
		title: "Top 10 VS Code Extensions for Developers",
		excerpt:
			"Discover the essential VS Code extensions that will boost your productivity and improve your coding workflow.",
		slug: "top-10-vscode-extensions",
		publishedAt: "2024-01-05",
		readTime: "6 min read",
		category: "Tools & Productivity",
		image: "/blog/vscode-extensions.jpg",
	},
]
