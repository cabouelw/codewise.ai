import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { firstName, lastName, email, subject, message } = body

		// Validate required fields
		if (!firstName || !email || !message) {
			return NextResponse.json(
				{ error: "Please fill in all required fields (name, email, and message)." },
				{ status: 400 },
			)
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 })
		}

		// Rate limiting: simple in-memory check (in production, use Redis or similar)
		// For now, just log the contact submission
		console.log("Contact form submission:", {
			name: `${firstName} ${lastName}`,
			email,
			subject,
			message: message.substring(0, 100) + "...",
			timestamp: new Date().toISOString(),
		})

		// In production, you would send an email here using a service like:
		// - Resend (resend.com)
		// - SendGrid
		// - AWS SES
		// - Nodemailer with SMTP

		return NextResponse.json(
			{ success: true, message: "Thank you for your message! We will get back to you soon." },
			{ status: 200 },
		)
	} catch {
		return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 })
	}
}
