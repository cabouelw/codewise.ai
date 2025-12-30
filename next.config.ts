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

	// Configure headers for security and caching
	async headers() {
		return [
			{
				source: "/sitemap.xml",
				headers: [
					{
						key: "x-vercel-disable-early-hints",
						value: "1",
					},
					{
						key: "Cache-Control",
						value: "public, max-age=0, s-maxage=86400, stale-while-revalidate=3600",
					},
				],
			},
			{
				source: "/((?!sitemap.xml|robots.txt).*)",
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
