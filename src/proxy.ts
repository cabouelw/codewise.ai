import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export const config = {
	matcher: ["/sitemap.xml"],
}

export function proxy(_request: NextRequest) {
	const response = NextResponse.next()

	// Best-effort: prevent any upstream/provider from emitting 103 Early Hints for the sitemap.
	// Some platforms honor this header (others will ignore it).
	response.headers.set("x-vercel-disable-early-hints", "1")

	// 103 Early Hints is commonly triggered by `Link` preload headers.
	// Ensure the sitemap response doesn't carry Link headers.
	response.headers.delete("link")

	return response
}
