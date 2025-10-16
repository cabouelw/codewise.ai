import { NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(request: Request) {
	try {
		const formData = await request.formData()
		const image = formData.get("image") as File
		const type = formData.get("type") as string

		if (!image) {
			return NextResponse.json({ error: "Image is required" }, { status: 400 })
		}

		// Validate image type
		if (!image.type.startsWith("image/")) {
			return NextResponse.json({ error: "Invalid file type. Please upload an image." }, { status: 400 })
		}

		const startTime = Date.now()

		// Check if required API keys are configured
		const hasDeepImageKey = !!process.env.DEEPIMAGE_API_KEY
		const hasRemoveBgKey = !!process.env.REMOVEBG_API_KEY
		const needsRemoveBg = type === "remove-bg"

		// Mock mode if API keys are missing
		if ((needsRemoveBg && !hasRemoveBgKey) || (!needsRemoveBg && !hasDeepImageKey)) {
			// Mock mode - return the original image as enhanced
			const arrayBuffer = await image.arrayBuffer()
			const base64 = Buffer.from(arrayBuffer).toString("base64")
			const enhancedUrl = `data:${image.type};base64,${base64}`

			const processingTime = Date.now() - startTime

			const missingKey = needsRemoveBg ? "REMOVEBG_API_KEY" : "DEEPIMAGE_API_KEY"

			return NextResponse.json({
				enhancedUrl,
				processingTime,
				type,
				mock: true,
				message: `Mock mode: Original image returned. Add ${missingKey} to .env for real enhancement.`,
			})
		}

		// Real API integration
		try {
			// Convert image to base64
			const arrayBuffer = await image.arrayBuffer()
			const base64 = Buffer.from(arrayBuffer).toString("base64")

			// Handle background removal with Remove.bg API
			if (type === "remove-bg") {
				const removeBgApiKey = process.env.REMOVEBG_API_KEY

				if (!removeBgApiKey) {
					throw new Error("REMOVEBG_API_KEY not configured")
				}

				// Remove.bg API expects FormData with image_file_b64
				const formData = new FormData()
				formData.append("image_file_b64", base64)
				formData.append("size", "auto")

				const response = await fetch("https://api.remove.bg/v1.0/removebg", {
					method: "POST",
					headers: {
						"X-Api-Key": removeBgApiKey,
					},
					body: formData,
				})

				if (!response.ok) {
					const errorData = await response.json().catch(() => ({}))
					console.error("Remove.bg API Error Response:", {
						status: response.status,
						statusText: response.statusText,
						errorData,
					})
					throw new Error(errorData.errors?.[0]?.title || `Remove.bg API request failed with status ${response.status}`)
				}

				// Remove.bg returns binary image data
				const imageBlob = await response.arrayBuffer()
				const imageBase64 = Buffer.from(imageBlob).toString("base64")
				const processingTime = Date.now() - startTime

				return NextResponse.json({
					enhancedUrl: `data:image/png;base64,${imageBase64}`,
					processingTime,
					type,
					provider: "Remove.bg",
				})
			}

			// Handle other enhancements with Deep-Image.ai
			const deepImageApiKey = process.env.DEEPIMAGE_API_KEY

			if (!deepImageApiKey) {
				throw new Error("DEEPIMAGE_API_KEY not configured")
			}

			// Deep-Image.ai API requires base64 images with "base64," prefix in url field
			let requestBody: any = {
				url: `base64,${base64}`,
			}

			switch (type) {
				case "enhance":
					// Use AI enhancement (denoise, deblur, light correction)
					requestBody = {
						url: `base64,${base64}`,
						enhancements: ["denoise", "deblur", "light"],
						width: 2000, // Upscale to 2000px width
						no_logo: true, // Request no watermark (requires paid plan)
					}
					break
				case "upscale":
					// Use AI upscaling (2x)
					requestBody = {
						url: `base64,${base64}`,
						width: 4000, // 4x upscale
						enhancements: ["denoise"],
						no_logo: true, // Request no watermark (requires paid plan)
					}
					break
				case "restore":
					// Photo restoration (denoise, deblur, sharpen, light correction)
					requestBody = {
						url: `base64,${base64}`,
						enhancements: ["denoise", "deblur", "sharpen", "light"],
						width: 2000,
						no_logo: true, // Request no watermark (requires paid plan)
					}
					break
				default:
					requestBody = {
						url: `base64,${base64}`,
						enhancements: ["denoise", "deblur", "light"],
						width: 2000,
						no_logo: true, // Request no watermark (requires paid plan)
					}
			}

			const response = await fetch("https://deep-image.ai/rest_api/process_result", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": deepImageApiKey,
				},
				body: JSON.stringify(requestBody),
			})

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}))
				console.error("Deep-Image.ai API Error Response:", {
					status: response.status,
					statusText: response.statusText,
					errorData,
					requestType: type,
					requestBodyKeys: Object.keys(requestBody),
				})
				throw new Error(
					errorData.error || errorData.message || `Deep-Image.ai API request failed with status ${response.status}`
				)
			}

			const data = await response.json()
			const processingTime = Date.now() - startTime

			console.log("Deep-Image.ai API Success Response:", {
				responseKeys: Object.keys(data),
				fullResponse: JSON.stringify(data).substring(0, 500), // First 500 chars
				hasUrl: !!data.url,
				hasImage: !!data.image,
				hasOutputImage: !!data.output_image,
				hasResult: !!data.result,
				hasData: !!data.data,
			})

			// Deep-Image.ai returns base64 encoded image in various possible fields
			let imageData =
				data.url || data.image || data.output_image || data.result || data.data || data.result_url || data.output_url

			if (!imageData) {
				console.error("No image data in response. Full response:", JSON.stringify(data))
				throw new Error(`API returned no image data. Response keys: ${Object.keys(data).join(", ")}`)
			}

			// Handle different response formats
			if (typeof imageData === "object" && imageData.url) {
				imageData = imageData.url
			}

			// Remove "base64," prefix if present
			if (typeof imageData === "string" && imageData.startsWith("base64,")) {
				imageData = imageData.substring(7)
			}

			// If it's a URL, fetch the image and convert to base64
			if (typeof imageData === "string" && imageData.startsWith("http")) {
				const imageResponse = await fetch(imageData)
				const imageBuffer = await imageResponse.arrayBuffer()
				imageData = Buffer.from(imageBuffer).toString("base64")
			}

			const enhancedUrl = `data:image/png;base64,${imageData}`

			return NextResponse.json({
				enhancedUrl,
				processingTime,
				type,
				provider: "Deep-Image.ai",
			})
		} catch (apiError: any) {
			console.error("Deep-Image.ai API Error:", apiError)

			// Fallback to mock mode if API fails
			const arrayBuffer = await image.arrayBuffer()
			const base64 = Buffer.from(arrayBuffer).toString("base64")
			const enhancedUrl = `data:${image.type};base64,${base64}`
			const processingTime = Date.now() - startTime

			return NextResponse.json({
				enhancedUrl,
				processingTime,
				type,
				mock: true,
				error: apiError.message,
				message: "API request failed, returning original image.",
			})
		}
	} catch (error: any) {
		console.error("❌ Error in /api/image-enhance:", error.message)

		return NextResponse.json(
			{
				error: "Failed to enhance image",
				details: error.message,
			},
			{ status: 500 }
		)
	}
}
