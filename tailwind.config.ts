import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				// Custom brand colors
				primary: {
					50: "#f0f9ff",
					100: "#e0f2fe",
					200: "#bae6fd",
					300: "#7dd3fc",
					400: "#38bdf8",
					500: "#0ea5e9", // Main brand color
					600: "#0284c7",
					700: "#0369a1",
					800: "#075985",
					900: "#0c4a6e",
					950: "#082f49",
				},
				// Dark theme colors
				dark: {
					50: "#f8fafc",
					100: "#f1f5f9",
					200: "#e2e8f0",
					300: "#cbd5e1",
					400: "#94a3b8",
					500: "#64748b",
					600: "#475569",
					700: "#334155",
					800: "#1e293b",
					900: "#0f172a", // Main dark background
					950: "#020617",
				},
			},
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
				display: ["Poppins", "Inter", "system-ui", "sans-serif"],
			},
			animation: {
				"fade-in": "fadeIn 0.5s ease-in-out",
				"slide-up": "slideUp 0.5s ease-out",
				"slide-down": "slideDown 0.3s ease-out",
				glow: "glow 2s ease-in-out infinite alternate",
				float: "float 3s ease-in-out infinite",
				"pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				slideUp: {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				slideDown: {
					"0%": { opacity: "0", transform: "translateY(-10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				glow: {
					"0%": { boxShadow: "0 0 5px #0ea5e9, 0 0 10px #0ea5e9, 0 0 15px #0ea5e9" },
					"100%": { boxShadow: "0 0 10px #0ea5e9, 0 0 20px #0ea5e9, 0 0 30px #0ea5e9" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-10px)" },
				},
			},
			boxShadow: {
				"glow-sm": "0 0 5px rgba(14, 165, 233, 0.5)",
				"glow-md": "0 0 10px rgba(14, 165, 233, 0.5)",
				"glow-lg": "0 0 20px rgba(14, 165, 233, 0.5)",
				"glow-xl": "0 0 30px rgba(14, 165, 233, 0.5)",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"hero-pattern":
					"radial-gradient(circle at 25px 25px, rgba(14, 165, 233, 0.2) 2px, transparent 0), radial-gradient(circle at 75px 75px, rgba(14, 165, 233, 0.1) 2px, transparent 0)",
			},
			backdropBlur: {
				xs: "2px",
			},
		},
	},
	plugins: [typography],
}

export default config
