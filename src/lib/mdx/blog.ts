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
	content?: string
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
		}
	})

	// Sort posts by date (newest first)
	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get related posts based on tags and category
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
	const allPosts = getAllPosts()
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
	return getAllPosts().filter((post) => post.category === category)
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
	return getAllPosts().filter((post) => post.tags.includes(tag))
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(limit?: number): BlogPost[] {
	const featured = getAllPosts().filter((post) => post.featured)
	return limit ? featured.slice(0, limit) : featured
}

/**
 * Search posts by query
 */
export function searchPosts(query: string): BlogPost[] {
	const lowercaseQuery = query.toLowerCase()

	return getAllPosts().filter((post) => {
		return (
			post.title.toLowerCase().includes(lowercaseQuery) ||
			post.description.toLowerCase().includes(lowercaseQuery) ||
			post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
			post.category.toLowerCase().includes(lowercaseQuery)
		)
	})
}
