import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollToTop from "@/components/ScrollToTop"
import CookieConsent from "@/components/CookieConsent"
import { JsonLd } from "@/components/JsonLd"
import { Toaster } from "react-hot-toast"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
})

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-poppins",
	display: "swap",
})

export const metadata: Metadata = {
	title: {
		default: "CodeWise AI - 50+ Free AI Tools for Developers",
		template: "%s | CodeWise AI",
	},
	description:
		"Discover 50+ free AI tools for developers. AI code assistants, content generators, translators, and more. Boost your productivity with smart AI-powered development tools.",
	keywords: [
		"AI tools for developers",
		"free AI coding tools",
		"AI code assistant",
		"developer productivity tools",
		"programming tools",
		"artificial intelligence development",
		"web development tools",
		"code explanation AI",
		"AI content generator",
		"free developer tools 2025",
	],
	authors: [{ name: "CodeWise AI Team" }],
	creator: "CodeWise AI",
	publisher: "CodeWise AI",
	metadataBase: new URL("https://codewize-ai.website"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://codewize-ai.website",
		siteName: "CodeWise AI",
		title: "CodeWise AI - 50+ Free AI Tools for Developers",
		description:
			"Discover 50+ free AI tools for developers. AI code assistants, content generators, and more to boost your productivity.",
		images: [
			{
				url: "/images/blog/AI_vs_Human.png",
				width: 1200,
				height: 630,
				alt: "CodeWise AI - Free AI Tools for Developers",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@codewise_ai",
		creator: "@codewise_ai",
		title: "CodeWise AI - 50+ Free AI Tools for Developers",
		description: "Discover 50+ free AI tools to boost developer productivity.",
		images: ["/images/blog/AI_vs_Human.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	category: "Technology",
	classification: "Developer Tools",
	verification: {
		google: "fel0A3XBXi1TVFr8G-zcxWfcvPkexyMjHx3rFeFWtR0",
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta name="google-site-verification" content="fel0A3XBXi1TVFr8G-zcxWfcvPkexyMjHx3rFeFWtR0" />
				{/* Preconnect to external domains for performance */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />

				<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="alternate" type="application/rss+xml" title="CodeWise AI Blog RSS Feed" href="/rss.xml" />

				{/* Organization Structured Data */}
				<JsonLd
					data={{
						"@context": "https://schema.org",
						"@type": "Organization",
						name: "CodeWise AI",
						url: "https://codewize-ai.website",
						logo: "https://codewize-ai.website/logo.png",
						description:
							"Smart AI Tools for Developers - Empower your coding with AI-powered tools for code explanation, content generation, translation, and more.",
						sameAs: ["https://twitter.com/codewise_ai"],
					}}
				/>

				{/* WebSite with SearchAction Structured Data */}
				<JsonLd
					data={{
						"@context": "https://schema.org",
						"@type": "WebSite",
						url: "https://codewize-ai.website",
						name: "CodeWise AI",
						description: "Smart AI Tools for Developers",
						potentialAction: {
							"@type": "SearchAction",
							target: {
								"@type": "EntryPoint",
								urlTemplate: "https://codewize-ai.website/tools?search={search_term_string}",
							},
							"query-input": "required name=search_term_string",
						},
					}}
				/>

				{/* Inline critical theme script - executed before render to prevent FOUC */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
              try {
                const theme = localStorage.getItem('theme') || 'system';
                if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `,
					}}
				/>
			</head>
			<body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
				{/* Google AdSense - Deferred with afterInteractive to not block content rendering */}
				<Script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8652734840791356"
					crossOrigin="anonymous"
					strategy="afterInteractive"
				/>

				<ThemeProvider defaultTheme="system" enableSystem>
					<Toaster
						position="top-right"
						toastOptions={{
							duration: 4000,
							style: {
								background: "var(--toast-bg)",
								color: "var(--toast-color)",
								border: "1px solid var(--toast-border)",
							},
							success: {
								iconTheme: {
									primary: "#10b981",
									secondary: "#ffffff",
								},
							},
							error: {
								iconTheme: {
									primary: "#ef4444",
									secondary: "#ffffff",
								},
							},
						}}
					/>
					<div className="flex min-h-screen flex-col">
						<Header />
						<main className="flex-1 mt-16">
							{children}
							<SpeedInsights />
						</main>
						<Footer />
						<ScrollToTop />
						<CookieConsent />
					</div>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	)
}
