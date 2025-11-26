import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - How We Protect Your Data | CodeWise AI',
  description: 'CodeWise AI privacy policy: Learn how we collect, use, and protect your data. GDPR compliant. We respect your privacy and keep your information secure.',
  keywords: ['privacy policy', 'data protection', 'user privacy', 'GDPR compliance', 'data security', 'personal information protection', 'privacy practices', 'secure platform'],
  openGraph: {
    title: 'Privacy Policy | CodeWise AI',
    description: 'Learn how we protect your data and respect your privacy.',
    type: 'website',
    url: 'https://codewise-ai.vercel.app/privacy-policy',
    images: [
      {
        url: '/images/blog/AI_vs_Human.png',
        width: 1200,
        height: 628,
        alt: 'Privacy Policy | CodeWise AI',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | CodeWise AI',
    description: 'Learn how we protect your data.',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="py-20 bg-white dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Privacy Policy</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Last updated: January 1, 2024
          </p>

          <h2>Introduction</h2>
          <p>
            At codewise-ai.vercel.app, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2>Information We Collect</h2>

          <h3>Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Register for an account</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact us through our contact form</li>
            <li>Participate in surveys or promotions</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our website, we may automatically collect certain information, including:</p>
          <ul>
            <li>IP address and browser information</li>
            <li>Operating system and device information</li>
            <li>Pages visited and time spent on our site</li>
            <li>Referring website addresses</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Send you newsletters and marketing communications (with your consent)</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Analyze usage patterns and improve our website</li>
            <li>Detect, prevent, and address technical issues</li>
          </ul>

          <h2>Information Sharing and Disclosure</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties, except:</p>
          <ul>
            <li>With your explicit consent</li>
            <li>To trusted service providers who assist us in operating our website</li>
            <li>When required by law or to protect our rights</li>
            <li>In connection with a business transfer or merger</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your
            personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your browsing experience,
            analyze site traffic, and understand where our visitors are coming from. You can control
            cookie settings through your browser preferences.
          </p>

          <h2>Third-Party Services</h2>
          <p>Our website may contain links to third-party websites or services, including:</p>
          <ul>
            <li>Google Analytics for website analytics</li>
            <li>Social media platforms</li>
            <li>External tool and service providers</li>
          </ul>
          <p>
            We are not responsible for the privacy practices of these third-party services.
            We encourage you to review their privacy policies.
          </p>

          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your personal information</li>
            <li>Object to processing of your information</li>
            <li>Data portability</li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>
            Our services are not intended for children under 13 years of age. We do not knowingly
            collect personal information from children under 13. If you become aware that a child
            has provided us with personal information, please contact us.
          </p>

          <h2>International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country
            of residence. We ensure appropriate safeguards are in place to protect your information
            during such transfers.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <ul>
            <li>Email: privacy@codewise-ai.vercel.app</li>
            <li>Address: 123 Tech Street, San Francisco, CA 94105</li>
          </ul>

          <h2>Consent</h2>
          <p>
            By using our website, you consent to our Privacy Policy and agree to its terms.
          </p>
        </div>
      </div>
    </div>
  )
}