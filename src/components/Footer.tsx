import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/tools', label: 'Tools' },
    { href: '/editorial-policy', label: 'Editorial Policy' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
    { href: '/disclaimer', label: 'Disclaimer' },
  ]

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                CodeWise AI
              </span>
            </Link>
            <p className="text-slate-700 dark:text-slate-300 max-w-md">
              Empower your coding with smart AI tools — all in one place.
              Discover, learn, and enhance your development workflow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Get in Touch
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">
              Spotted an outdated tool review or have a question? Reach out directly.
            </p>
            <Link
              href="/contact"
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors duration-200"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-700 dark:text-slate-300 text-sm">
            © {currentYear} CodeWise AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer