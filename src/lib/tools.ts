import toolsData from "@/data/tools.json"

export interface Tool {
	id: string
	name: string
	slug: string
	category: string
	description: string
	longDescription: string
	icon: string
	aiBased: boolean
	url: string
	pricing: string
	features: string[]
	tags: string[]
	image: string
	featured: boolean
}

/**
 * Get all tools
 */
export function getAllTools(): Tool[] {
	return (toolsData as { tools: Tool[] }).tools
}

/**
 * Get tool by slug
 */
export function getToolBySlug(slug: string): Tool | undefined {
	return getAllTools().find((tool) => tool.slug === slug)
}

/**
 * Get tools by category
 */
export function getToolsByCategory(category: string): Tool[] {
	return getAllTools().filter((tool) => tool.category === category)
}

/**
 * Get featured tools
 */
export function getFeaturedTools(limit?: number): Tool[] {
	const featured = getAllTools().filter((tool) => tool.featured)
	return limit ? featured.slice(0, limit) : featured
}

/**
 * Get AI-based tools
 */
export function getAITools(): Tool[] {
	return getAllTools().filter((tool) => tool.aiBased)
}

/**
 * Get related tools based on category and tags
 */
export function getRelatedTools(currentSlug: string, limit: number = 3): Tool[] {
	const currentTool = getToolBySlug(currentSlug)
	if (!currentTool) return []

	const allTools = getAllTools()

	// Score tools by similarity
	const scoredTools = allTools
		.filter((tool) => tool.slug !== currentSlug)
		.map((tool) => {
			let score = 0

			// Same category: +5 points
			if (tool.category === currentTool.category) score += 5

			// Same AI status: +2 points
			if (tool.aiBased === currentTool.aiBased) score += 2

			// Shared tags: +1 point per tag
			const sharedTags = tool.tags.filter((tag) => currentTool.tags.includes(tag))
			score += sharedTags.length

			return { tool, score }
		})
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map(({ tool }) => tool)

	return scoredTools
}

/**
 * Search tools by query
 */
export function searchTools(query: string): Tool[] {
	const lowercaseQuery = query.toLowerCase()

	return getAllTools().filter((tool) => {
		return (
			tool.name.toLowerCase().includes(lowercaseQuery) ||
			tool.description.toLowerCase().includes(lowercaseQuery) ||
			tool.category.toLowerCase().includes(lowercaseQuery) ||
			tool.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
			tool.features.some((feature) => feature.toLowerCase().includes(lowercaseQuery))
		)
	})
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
	const categories = getAllTools().map((tool) => tool.category)
	return Array.from(new Set(categories))
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
	const tags = getAllTools().flatMap((tool) => tool.tags)
	return Array.from(new Set(tags))
}
