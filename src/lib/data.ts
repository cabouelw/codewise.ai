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
]

export const categories: Category[] = [
	{
		id: "1",
		title: "AI Tools",
		description: "Intelligent assistants and automation tools powered by artificial intelligence.",
		icon: "🧠",
		href: "/tools?category=ai",
		toolCount: 15,
		gradient: "bg-gradient-to-br from-purple-500 to-indigo-600",
	},
	{
		id: "2",
		title: "Developer Utilities",
		description: "Essential tools and utilities that every developer needs in their toolkit.",
		icon: "⚙️",
		href: "/tools?category=utilities",
		toolCount: 23,
		gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
	},
	{
		id: "3",
		title: "Design Tools",
		description: "Creative tools for designers and developers to build beautiful interfaces.",
		icon: "🎨",
		href: "/tools?category=design",
		toolCount: 12,
		gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
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
