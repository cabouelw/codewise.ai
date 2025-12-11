import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	try {
		const { title, category = "Development" } = await req.json()

		if (!title) {
			return NextResponse.json({ error: "Title is required" }, { status: 400 })
		}

		// Generate SVG based on title
		const svg = generateBlogSVG(title, category)

		return new NextResponse(svg, {
			headers: {
				"Content-Type": "image/svg+xml",
				"Cache-Control": "public, max-age=31536000, immutable",
			},
		})
	} catch (error) {
		console.error("Error generating blog image:", error)
		return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
	}
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const title = searchParams.get("title") || "Blog Post"
	const category = searchParams.get("category") || "Development"

	const svg = generateBlogSVG(title, category)

	return new NextResponse(svg, {
		headers: {
			"Content-Type": "image/svg+xml",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	})
}

function generateBlogSVG(title: string, category: string): string {
	// Gradient colors based on category
	const gradients: Record<string, { start: string; end: string; accent: string }> = {
		Development: { start: "#667eea", end: "#764ba2", accent: "#f093fb" },
		Tutorial: { start: "#4facfe", end: "#00f2fe", accent: "#43e97b" },
		AI: { start: "#fa709a", end: "#fee140", accent: "#30cfd0" },
		Technology: { start: "#a8edea", end: "#fed6e3", accent: "#667eea" },
		"Best Practices": { start: "#ff9a9e", end: "#fecfef", accent: "#ffecd2" },
	}

	const colors = gradients[category] || gradients.Development

	// Split title into lines (max 50 chars per line)
	const words = title.split(" ")
	const lines: string[] = []
	let currentLine = ""

	words.forEach((word) => {
		if ((currentLine + word).length > 50) {
			lines.push(currentLine.trim())
			currentLine = word + " "
		} else {
			currentLine += word + " "
		}
	})
	if (currentLine.trim()) {
		lines.push(currentLine.trim())
	}

	// Limit to 3 lines
	const displayLines = lines.slice(0, 3)
	if (lines.length > 3) {
		displayLines[2] = displayLines[2].substring(0, 47) + "..."
	}

	// Calculate vertical positioning
	const lineHeight = 80
	const startY = 300 - (displayLines.length * lineHeight) / 2

	// Generate text elements
	const textElements = displayLines
		.map((line, index) => {
			const y = startY + index * lineHeight
			return `<text x="50%" y="${y}" class="title-text">${escapeXml(line)}</text>`
		})
		.join("\n      ")

	const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.start};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.end};stop-opacity:1" />
    </linearGradient>
    
    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:${colors.accent};stop-opacity:0" />
    </linearGradient>
    
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <style>
      .title-text {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 64px;
        font-weight: 800;
        fill: white;
        text-anchor: middle;
        letter-spacing: -0.02em;
        filter: url(#glow);
      }
      
      .category-badge {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 24px;
        font-weight: 600;
        fill: white;
        text-anchor: middle;
        opacity: 0.9;
      }
      
      .logo-text {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 32px;
        font-weight: 700;
        fill: white;
        opacity: 0.95;
      }
      
      .decorative-circle {
        opacity: 0.1;
      }
    </style>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <!-- Decorative elements -->
  <circle cx="100" cy="100" r="150" class="decorative-circle" fill="white"/>
  <circle cx="1100" cy="530" r="200" class="decorative-circle" fill="white"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#accentGradient)"/>
  
  <!-- Category badge -->
  <rect x="500" y="80" width="${category.length * 16 + 40}" height="50" rx="25" fill="rgba(255,255,255,0.2)"/>
  <text x="600" y="114" class="category-badge">${escapeXml(category)}</text>
  
  <!-- Title -->
  <g>
      ${textElements}
  </g>
  
  <!-- Logo/Branding -->
  <g transform="translate(50, 550)">
    <rect width="180" height="60" rx="30" fill="rgba(255,255,255,0.15)"/>
    <text x="90" y="42" class="logo-text" text-anchor="middle">CodeWise AI</text>
  </g>
  
  <!-- Decorative line -->
  <line x1="50" y1="500" x2="350" y2="500" stroke="rgba(255,255,255,0.3)" stroke-width="3" stroke-linecap="round"/>
</svg>`

	return svg
}

function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;")
}
