import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ScrollToTop from "@/components/ScrollToTop"
import CookieConsent from "@/components/CookieConsent"
import { Toaster } from "react-hot-toast"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
		default: "Codewise.ai - Smart AI Tools for Developers",
		template: "%s | Codewise.ai",
	},
	description:
		"Empower your coding with smart AI tools — all in one place. Discover, learn, and enhance your development workflow with our curated collection of AI and developer tools.",
	keywords: ["AI tools", "developer tools", "coding", "programming", "artificial intelligence", "web development"],
	authors: [{ name: "Codewise.ai" }],
	creator: "Codewise.ai",
	metadataBase: new URL("https://codewise.ai"),
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://codewise.ai",
		siteName: "Codewise.ai",
		title: "Codewise.ai - Smart AI Tools for Developers",
		description: "Empower your coding with smart AI tools — all in one place.",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Codewise.ai - Smart AI Tools for Developers",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Codewise.ai - Smart AI Tools for Developers",
		description: "Empower your coding with smart AI tools — all in one place.",
		images: ["/og-image.jpg"],
		creator: "@codewise_ai",
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
	verification: {
		google: "your-google-verification-code",
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
				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8652734840791356"
					crossOrigin="anonymous"></script>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
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
			</body>
		</html>
	)
}
