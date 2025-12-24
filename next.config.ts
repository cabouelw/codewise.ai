import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */

	// Enable static optimization for better SEO
	reactStrictMode: true,

	// Optimize images for better performance
	images: {
		formats: ["image/avif", "image/webp"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},

	// Ensure trailing slashes for consistency
	trailingSlash: false,

	async redirects() {
		return [
			{
				source: "/:path*",
				has: [
					{
						type: "host",
						value: "www.codewize-ai.website",
					},
				],
				destination: "https://codewize-ai.website/:path*",
				permanent: true,
			},
		]
	},

	// Enable experimental features for better performance
	experimental: {
		optimizeCss: true,
	},

	// Configure headers for security and caching
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "X-DNS-Prefetch-Control",
						value: "on",
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
				],
			},
		]
	},
}

export default nextConfig
