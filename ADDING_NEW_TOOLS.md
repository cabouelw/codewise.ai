# 🚀 Adding New Tools Guide

## Overview

This guide explains how to add new AI-powered tools to the codewise-ai.vercel.app platform. Follow these steps to maintain consistency and best practices.

---

## Quick Start Checklist

- [ ] Create API route in `/src/app/api/`
- [ ] Create tool page in `/src/app/tools/[tool-name]/`
- [ ] Add tool metadata in `/src/lib/seo.ts`
- [ ] Update tools array in `/src/app/tools/page.tsx`
- [ ] Create layout.tsx for SEO metadata
- [ ] Test API route with mock responses
- [ ] Test UI components and interactions
- [ ] Add tool to documentation

---

## Step-by-Step Guide

### Step 1: Create the API Route

Create a new file: `/src/app/api/[tool-name]/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || "",
})

export const runtime = "edge"

export async function POST(request: NextRequest) {
	try {
		// 1. Parse request body
		const { input, option1, option2 } = await request.json()

		// 2. Validate input
		if (!input || typeof input !== "string") {
			return NextResponse.json({ error: "Input is required and must be a string" }, { status: 400 })
		}

		// Add more validation as needed
		if (input.length < 10) {
			return NextResponse.json({ error: "Input must be at least 10 characters" }, { status: 400 })
		}

		// 3. Mock response for development
		if (!process.env.OPENAI_API_KEY) {
			console.warn("⚠️  OpenAI API key not configured. Returning mock response.")

			return NextResponse.json({
				result: "This is a mock response. Configure OpenAI API key for real results.",
				mock: true,
			})
		}

		// 4. Call OpenAI API
		const completion = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system",
					content: "Your system prompt here...",
				},
				{
					role: "user",
					content: input,
				},
			],
			temperature: 0.7,
			max_tokens: 1000,
		})

		const result = completion.choices[0]?.message?.content || ""

		// 5. Return response
		return NextResponse.json({
			result,
			tokensUsed: completion.usage?.total_tokens || 0,
		})
	} catch (error: unknown) {
		console.error("❌ Error in /api/[tool-name]:", error)

		if (error instanceof OpenAI.APIError) {
			return NextResponse.json({ error: `OpenAI API Error: ${error.message}` }, { status: error.status || 500 })
		}

		return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
	}
}
```

### Step 2: Create the Tool Page

Create: `/src/app/tools/[tool-name]/page.tsx`

```typescript
"use client"

import { useState } from "react"
import { YourIcon } from "lucide-react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import ToolLayout from "@/components/tools/ToolLayout"
import ResultDisplay from "@/components/tools/ResultDisplay"
import LoadingSpinner from "@/components/tools/LoadingSpinner"

export default function YourToolPage() {
	const [input, setInput] = useState("")
	const [result, setResult] = useState("")
	const [metadata, setMetadata] = useState<{
		// Add your metadata types
		mock?: boolean
	} | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async () => {
		if (!input.trim()) {
			toast.error("Please enter some input")
			return
		}

		setIsLoading(true)
		setResult("")
		setMetadata(null)

		try {
			// Track usage
			const usageKey = "tool-usage-/tools/[tool-name]"
			const currentCount = parseInt(localStorage.getItem(usageKey) || "0", 10)
			localStorage.setItem(usageKey, String(currentCount + 1))

			// Call API
			const response = await fetch("/api/[tool-name]", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ input }),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || "Failed to process request")
			}

			setResult(data.result)
			setMetadata({ mock: data.mock })

			if (data.mock) {
				toast("Using mock response - configure OpenAI API key", {
					icon: "⚠️",
					duration: 5000,
				})
			} else {
				toast.success("Request processed successfully!")
			}
		} catch (error: unknown) {
			console.error("Error:", error)
			toast.error(error instanceof Error ? error.message : "Failed to process request")
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<ToolLayout
			title="Your Tool Name"
			description="Description of what your tool does."
			icon={YourIcon}
			gradient="from-blue-500 to-purple-500">
			<div className="space-y-8">
				{/* Input Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
					<h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Enter Your Input</h2>

					<div className="space-y-4">
						{/* Add your form fields here */}
						<textarea
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Enter your input..."
							rows={8}
							className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
						/>

						<motion.button
							onClick={handleSubmit}
							disabled={isLoading}
							whileHover={{ scale: isLoading ? 1 : 1.02 }}
							whileTap={{ scale: isLoading ? 1 : 0.98 }}
							className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
							{isLoading ? "Processing..." : "Submit"}
						</motion.button>
					</div>
				</motion.div>

				{/* Loading State */}
				{isLoading && <LoadingSpinner size="lg" message="Processing your request..." />}

				{/* Result Section */}
				{result && metadata && (
					<ResultDisplay
						result={result}
						title="Result"
						metadata={
							<div className="flex flex-wrap gap-4 text-sm">
								{metadata.mock && <div className="text-amber-600 dark:text-amber-400">⚠️ Mock Response</div>}
							</div>
						}
					/>
				)}
			</div>
		</ToolLayout>
	)
}
```

### Step 3: Add SEO Metadata

Create: `/src/app/tools/[tool-name]/layout.tsx`

```typescript
import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo"

export const metadata: Metadata = generateToolMetadata("your-tool-name")

export default function Layout({ children }: { children: React.ReactNode }) {
	return children
}
```

Then update `/src/lib/seo.ts`:

```typescript
export const toolsMetadata = {
	// ... existing tools
	"your-tool-name": {
		title: "Your Tool Title - codewise-ai.vercel.app",
		description: "Description of your tool for SEO",
		keywords: ["keyword1", "keyword2", "keyword3"],
		ogImage: "/og-images/your-tool.jpg",
	},
}
```

### Step 4: Add Tool to Tools Page

Update `/src/app/tools/page.tsx`:

```typescript
const tools = [
	// ... existing tools
	{
		id: "your-tool-name",
		title: "Your Tool Name",
		description: "Short description of your tool.",
		icon: YourIcon, // Import from lucide-react
		href: "/tools/your-tool-name",
		category: "YourCategory", // Content, Writing, Development, etc.
		gradient: "from-blue-500 to-purple-500",
		keywords: ["keyword1", "keyword2", "keyword3"],
	},
]

// If adding a new category:
const categories = ["All", "Content", "Writing", "Development", "YourCategory"]
```

### Step 5: Test Your Tool

#### Test API Route:

```bash
curl -X POST http://localhost:3000/api/your-tool-name \
  -H "Content-Type: application/json" \
  -d '{"input": "test input"}'
```

#### Test UI:

1. Start dev server: `npm run dev`
2. Navigate to `/tools`
3. Find your tool card
4. Click and test the form
5. Verify loading states
6. Check toast notifications
7. Test copy and share buttons

---

## Best Practices

### 1. Input Validation

- Always validate input length (min/max)
- Check for empty/null values
- Sanitize user input if needed
- Return clear error messages

### 2. Error Handling

- Catch all errors in try-catch
- Handle OpenAI-specific errors
- Provide user-friendly error messages
- Log errors for debugging

### 3. Mock Responses

- Always provide mock responses for development
- Make mocks realistic but clearly identifiable
- Show warning badges when using mocks

### 4. UI/UX

- Use consistent gradient colors
- Add loading states for better UX
- Show character/word counts
- Provide helpful placeholder text
- Include usage tracking with localStorage

### 5. SEO

- Write unique, descriptive titles
- Include relevant keywords
- Add proper meta descriptions
- Use descriptive alt text for images

### 6. Performance

- Use Edge Runtime when possible
- Set appropriate token limits
- Implement rate limiting if needed
- Cache responses where appropriate

---

## Common Pitfalls

❌ **Don't:**

- Hardcode API keys
- Skip input validation
- Forget error handling
- Ignore loading states
- Use generic error messages

✅ **Do:**

- Use environment variables
- Validate all inputs
- Handle all error cases
- Show loading indicators
- Provide specific error messages

---

## Icon Selection

Choose from [Lucide React](https://lucide.dev/icons/):

```typescript
import {
	FileText, // Documents
	RefreshCw, // Transformation
	Mail, // Email
	Code, // Programming
	Image, // Images
	MessageSquare, // Chat
	Sparkles, // AI
	Zap, // Performance
	// ... many more
} from "lucide-react"
```

---

## Color Gradients

Choose consistent gradients:

```typescript
// Content tools
"from-purple-500 to-pink-500"
"from-blue-500 to-cyan-500"

// Writing tools
"from-green-500 to-emerald-500"
"from-teal-500 to-cyan-500"

// Development tools
"from-orange-500 to-red-500"
"from-yellow-500 to-orange-500"

// Analysis tools
"from-indigo-500 to-purple-500"
"from-violet-500 to-fuchsia-500"
```

---

## Example Tools You Can Add

1. **Image Generator**: Text to image with DALL-E
2. **Translation Tool**: Translate text between languages
3. **Grammar Checker**: Fix grammar and spelling
4. **Content Expander**: Expand bullet points into paragraphs
5. **Meeting Notes Summarizer**: Summarize meeting transcripts
6. **Social Media Caption Generator**: Generate captions for posts
7. **Product Description Writer**: E-commerce descriptions
8. **Code Refactorer**: Suggest code improvements
9. **SQL Query Generator**: Natural language to SQL
10. **Regex Generator**: Natural language to regex patterns

---

## Support

Need help? Check:

- OpenAI API Documentation
- Next.js Documentation
- Existing tool implementations in `/src/app/tools/`
- Component documentation in `/src/components/tools/`

---

✨ **Happy building!**
