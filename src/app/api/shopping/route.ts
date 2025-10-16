import { NextResponse } from "next/server"

export const runtime = "edge"

// Mock product database
const MOCK_PRODUCTS = [
	{
		id: "1",
		name: "Wireless Bluetooth Headphones - Premium Sound Quality",
		price: 79.99,
		originalPrice: 129.99,
		rating: 4.5,
		reviews: 2340,
		image: "🎧",
		store: "TechMart",
		url: "https://example.com/product/1",
		category: "Electronics",
		inStock: true,
		deal: true,
	},
	{
		id: "2",
		name: "Smart Watch Fitness Tracker with Heart Rate Monitor",
		price: 149.99,
		originalPrice: 199.99,
		rating: 4.7,
		reviews: 1850,
		image: "⌚",
		store: "GadgetStore",
		url: "https://example.com/product/2",
		category: "Electronics",
		inStock: true,
		deal: true,
	},
	{
		id: "3",
		name: "Ultra HD 4K Webcam for Video Conferencing",
		price: 89.99,
		rating: 4.3,
		reviews: 890,
		image: "📹",
		store: "CameraHub",
		url: "https://example.com/product/3",
		category: "Electronics",
		inStock: true,
		deal: false,
	},
	{
		id: "4",
		name: "Ergonomic Office Chair with Lumbar Support",
		price: 299.99,
		originalPrice: 449.99,
		rating: 4.8,
		reviews: 3200,
		image: "🪑",
		store: "FurnitureMax",
		url: "https://example.com/product/4",
		category: "Home & Kitchen",
		inStock: true,
		deal: true,
	},
	{
		id: "5",
		name: "Premium Running Shoes - Lightweight & Breathable",
		price: 119.99,
		originalPrice: 159.99,
		rating: 4.6,
		reviews: 2100,
		image: "👟",
		store: "SportsZone",
		url: "https://example.com/product/5",
		category: "Sports",
		inStock: true,
		deal: true,
	},
	{
		id: "6",
		name: "Stainless Steel Water Bottle - 32oz Insulated",
		price: 24.99,
		rating: 4.4,
		reviews: 1500,
		image: "💧",
		store: "OutdoorGear",
		url: "https://example.com/product/6",
		category: "Sports",
		inStock: true,
		deal: false,
	},
	{
		id: "7",
		name: "Organic Cotton T-Shirt Pack (3 pieces)",
		price: 39.99,
		originalPrice: 59.99,
		rating: 4.2,
		reviews: 980,
		image: "👕",
		store: "ClothingCo",
		url: "https://example.com/product/7",
		category: "Clothing",
		inStock: true,
		deal: true,
	},
	{
		id: "8",
		name: "LED Desk Lamp with USB Charging Port",
		price: 34.99,
		rating: 4.5,
		reviews: 1200,
		image: "💡",
		store: "HomeEssentials",
		url: "https://example.com/product/8",
		category: "Home & Kitchen",
		inStock: true,
		deal: false,
	},
	{
		id: "9",
		name: "Wireless Gaming Mouse - RGB Lighting",
		price: 59.99,
		originalPrice: 89.99,
		rating: 4.6,
		reviews: 1750,
		image: "🖱️",
		store: "GamingWorld",
		url: "https://example.com/product/9",
		category: "Electronics",
		inStock: false,
		deal: true,
	},
	{
		id: "10",
		name: "Bestseller Fiction Book Bundle (5 books)",
		price: 49.99,
		originalPrice: 74.99,
		rating: 4.9,
		reviews: 890,
		image: "📚",
		store: "BookHaven",
		url: "https://example.com/product/10",
		category: "Books",
		inStock: true,
		deal: true,
	},
	{
		id: "11",
		name: "Yoga Mat - Non-Slip Exercise Mat",
		price: 29.99,
		rating: 4.4,
		reviews: 2200,
		image: "🧘",
		store: "FitnessPro",
		url: "https://example.com/product/11",
		category: "Sports",
		inStock: true,
		deal: false,
	},
	{
		id: "12",
		name: "Skincare Gift Set - Premium Natural Ingredients",
		price: 79.99,
		originalPrice: 119.99,
		rating: 4.7,
		reviews: 1340,
		image: "💄",
		store: "BeautyHub",
		url: "https://example.com/product/12",
		category: "Beauty",
		inStock: true,
		deal: true,
	},
]

function searchProducts(query: string, category?: string) {
	const lowerQuery = query.toLowerCase()

	let results = MOCK_PRODUCTS.filter((product) => {
		const matchesQuery =
			product.name.toLowerCase().includes(lowerQuery) ||
			product.category.toLowerCase().includes(lowerQuery) ||
			product.store.toLowerCase().includes(lowerQuery)

		const matchesCategory = !category || category === "All" || product.category === category

		return matchesQuery && matchesCategory
	})

	// If no results, return all products as "related"
	if (results.length === 0) {
		results = MOCK_PRODUCTS.slice(0, 6)
	}

	return results
}

function sortProducts(products: typeof MOCK_PRODUCTS, sortBy: "relevance" | "price-low" | "price-high" | "rating") {
	const sorted = [...products]

	switch (sortBy) {
		case "price-low":
			return sorted.sort((a, b) => a.price - b.price)
		case "price-high":
			return sorted.sort((a, b) => b.price - a.price)
		case "rating":
			return sorted.sort((a, b) => b.rating - a.rating)
		case "relevance":
		default:
			// Prioritize deals and in-stock items
			return sorted.sort((a, b) => {
				if (a.deal && !b.deal) return -1
				if (!a.deal && b.deal) return 1
				if (a.inStock && !b.inStock) return -1
				if (!a.inStock && b.inStock) return 1
				return b.rating - a.rating
			})
	}
}

export async function POST(request: Request) {
	try {
		const { query, category, sortBy = "relevance" } = await request.json()

		if (!query) {
			return NextResponse.json({ error: "Search query is required" }, { status: 400 })
		}

		const startTime = Date.now()

		// Check if shopping API is configured (e.g., Algolia, Amazon API, etc.)
		const hasShoppingAPI = !!process.env.ALGOLIA_API_KEY || !!process.env.AMAZON_API_KEY

		if (!hasShoppingAPI) {
			// Mock mode - use mock product data
			let products = searchProducts(query, category)
			products = sortProducts(products, sortBy)

			const processingTime = Date.now() - startTime

			return NextResponse.json({
				products,
				totalResults: products.length,
				processingTime,
				mock: true,
				message: "Mock mode: Showing sample products. Add ALGOLIA_API_KEY or AMAZON_API_KEY for real shopping data.",
			})
		}

		// Real API integration would go here
		// Example: Algolia, Amazon Product Advertising API, etc.
		try {
			// Placeholder for real API integration
			// const apiKey = process.env.ALGOLIA_API_KEY;
			// const response = await fetch(API_URL, { ... });

			// For now, fallback to mock data
			let products = searchProducts(query, category)
			products = sortProducts(products, sortBy)

			const processingTime = Date.now() - startTime

			return NextResponse.json({
				products,
				totalResults: products.length,
				processingTime,
				mock: true,
				message: "Using mock data. Configure shopping API for real product search.",
			})
		} catch (apiError: any) {
			console.error("Shopping API Error:", apiError)

			// Fallback to mock data
			let products = searchProducts(query, category)
			products = sortProducts(products, sortBy)

			const processingTime = Date.now() - startTime

			return NextResponse.json({
				products,
				totalResults: products.length,
				processingTime,
				mock: true,
				error: apiError.message,
				message: "API request failed, showing sample products.",
			})
		}
	} catch (error: any) {
		console.error("❌ Error in /api/shopping:", error.message)

		return NextResponse.json(
			{
				error: "Failed to search products",
				details: error.message,
			},
			{ status: 500 }
		)
	}
}
