import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const contentDirectory = path.join(process.cwd(), "src/content/blog")

export interface BlogPost {
	slug: string
	title: string
	description: string
	date: string
	author: string
	image: string
	tags: string[]
	category: string
	featured: boolean
	readingTime: string
	wordCount?: number
	indexable?: boolean
	content?: string
}

const QUALITY_THRESHOLD = {
	minWords: 700,
	minDescriptionLength: 120,
	minTags: 2,
}

function countWords(content: string): number {
	return content.split(/\s+/).filter(Boolean).length
}

function hasStrongStructure(content: string): boolean {
	const hasSectionHeading = /(^|\n)##\s+/.test(content)
	const hasListOrCodeBlock = /(^|\n)([-*]\s+|\d+\.\s+|```)/m.test(content)
	return hasSectionHeading && hasListOrCodeBlock
}

function isPostIndexable(data: any, content: string): boolean {
	if (data?.noindex === true) return false
	if (data?.editorialReviewed === true) return true

	const wordCount = countWords(content)
	const description = typeof data?.description === "string" ? data.description.trim() : ""
	const tags = Array.isArray(data?.tags) ? data.tags : []

	return (
		wordCount >= QUALITY_THRESHOLD.minWords &&
		description.length >= QUALITY_THRESHOLD.minDescriptionLength &&
		tags.length >= QUALITY_THRESHOLD.minTags &&
		hasStrongStructure(content)
	)
}

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
	const files = fs.readdirSync(contentDirectory)
	return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""))
}

/**
 * Get blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
	try {
		const fullPath = path.join(contentDirectory, `${slug}.mdx`)
		const fileContents = fs.readFileSync(fullPath, "utf8")

		const { data, content } = matter(fileContents)
		const { text } = readingTime(content)
		const wordCount = countWords(content)
		const indexable = isPostIndexable(data, content)

		return {
			slug,
			title: data.title,
			description: data.description,
			date: data.date,
			author: data.author,
			image: data.image,
			tags: data.tags || [],
			category: data.category,
			featured: data.featured || false,
			readingTime: text,
			wordCount,
			indexable,
			content: content, // Return raw MDX content
		}
	} catch (error) {
		console.error(`Error loading post ${slug}:`, error)
		return null
	}
}

/**
 * Get all blog posts with metadata
 */
export function getAllPosts(): BlogPost[] {
	const slugs = getAllPostSlugs()

	const posts = slugs.map((slug) => {
		const fullPath = path.join(contentDirectory, `${slug}.mdx`)
		const fileContents = fs.readFileSync(fullPath, "utf8")
		const { data, content } = matter(fileContents)
		const { text } = readingTime(content)
		const wordCount = countWords(content)
		const indexable = isPostIndexable(data, content)

		return {
			slug,
			title: data.title,
			description: data.description,
			date: data.date,
			author: data.author,
			image: data.image,
			tags: data.tags || [],
			category: data.category,
			featured: data.featured || false,
			readingTime: text,
			wordCount,
			indexable,
		}
	})

	// Sort posts by date (newest first)
	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get only indexable blog posts (editorially reviewed or passing quality thresholds)
 */
export function getIndexablePosts(): BlogPost[] {
	return getAllPosts().filter((post) => post.indexable)
}

/**
 * Get related posts based on tags and category
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
	const allPosts = getIndexablePosts()
	const currentPost = allPosts.find((post) => post.slug === currentSlug)

	if (!currentPost) return []

	// Score posts by similarity
	const scoredPosts = allPosts
		.filter((post) => post.slug !== currentSlug)
		.map((post) => {
			let score = 0

			// Same category: +3 points
			if (post.category === currentPost.category) score += 3

			// Shared tags: +1 point per tag
			const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag))
			score += sharedTags.length

			return { post, score }
		})
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map(({ post }) => post)

	return scoredPosts
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogPost[] {
	return getIndexablePosts().filter((post) => post.category === category)
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
	return getIndexablePosts().filter((post) => post.tags.includes(tag))
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(limit?: number): BlogPost[] {
	const featured = getIndexablePosts().filter((post) => post.featured)
	return limit ? featured.slice(0, limit) : featured
}

/**
 * Search posts by query
 */
export function searchPosts(query: string): BlogPost[] {
	const lowercaseQuery = query.toLowerCase()

	return getIndexablePosts().filter((post) => {
		return (
			post.title.toLowerCase().includes(lowercaseQuery) ||
			post.description.toLowerCase().includes(lowercaseQuery) ||
			post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
			post.category.toLowerCase().includes(lowercaseQuery)
		)
	})
}
