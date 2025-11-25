"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "./theme-provider"

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10)
		}
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	const navItems = [
		{ href: "/", label: "Home" },
		{ href: "/tools", label: "Tools" },
		{ href: "/blog", label: "Blog" },
		{ href: "/about", label: "About" },
		{ href: "/contact", label: "Contact" },
	]

	const toggleTheme = () => {
		if (theme === "light") setTheme("dark")
		else if (theme === "dark") setTheme("system")
		else setTheme("light")
	}

	const getThemeIcon = () => {
		switch (theme) {
			case "light":
				return (
					<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>
				)
			case "dark":
				return (
					<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg>
				)
			default:
				return (
					<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
				)
		}
	}

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 `}>
			<nav className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-sm">C</span>
						</div>
						<span className="text-xl font-bold text-slate-900 dark:text-white">CodeWise-AI</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors duration-200 font-medium">
								{item.label}
							</Link>
						))}
					</div>

					{/* Theme Toggle & Mobile Menu */}
					<div className="flex items-center space-x-4">
						<button
							onClick={toggleTheme}
							className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
							aria-label="Toggle theme">
							{getThemeIcon()}
						</button>

						{/* Mobile menu button */}
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
							aria-label="Toggle menu">
							{isOpen ? (
								<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							) : (
								<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							)}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className="md:hidden overflow-hidden border-t border-slate-200 dark:border-slate-700 animate-slide-down">
						<div className="py-4 space-y-2">
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsOpen(false)}
									className="block px-4 py-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 font-medium">
									{item.label}
								</Link>
							))}
						</div>
					</div>
				)}
			</nav>
		</header>
	)
}

export default Header
