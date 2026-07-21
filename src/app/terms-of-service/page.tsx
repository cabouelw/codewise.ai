import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - CodeWise AI',
  description: 'Terms of Service for CodeWise AI. Read our terms and conditions governing the use of our AI-powered developer tools and website.',
  keywords: ['terms of service', 'terms and conditions', 'user agreement', 'legal terms', 'CodeWise AI terms'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://codewize-ai.website/terms-of-service',
  },
  openGraph: {
    title: 'Terms of Service | CodeWise AI',
    description: 'Terms and conditions governing the use of CodeWise AI tools and services.',
    type: 'website',
    url: 'https://codewize-ai.website/terms-of-service',
  },
}

export default function TermsOfServicePage() {
  return (
    <div className="py-20 bg-white dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Terms of Service</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Last updated: June 1, 2025
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using CodeWise AI (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. These terms apply to all visitors, users, and others who access or use our platform.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            CodeWise AI provides a collection of free AI-powered tools designed for developers, including but not limited to:
          </p>
          <ul>
            <li>AI code assistants and code explanation tools</li>
            <li>Content generation and paraphrasing tools</li>
            <li>Translation and summarization services</li>
            <li>Image enhancement utilities</li>
            <li>Email writing assistants</li>
            <li>Educational blog content about AI and development</li>
          </ul>
          <p>
            Our tools are provided as-is for informational and productivity purposes. We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>When using our services, you agree to:</p>
          <ul>
            <li>Use the tools only for lawful purposes and in accordance with these Terms</li>
            <li>Not use our services to generate harmful, misleading, defamatory, or illegal content</li>
            <li>Not attempt to reverse-engineer, hack, or disrupt our platform or its infrastructure</li>
            <li>Not use automated bots or scripts to excessively access our tools in a way that degrades service for other users</li>
            <li>Not impersonate another person or entity when using our services</li>
            <li>Not use our tools to infringe on the intellectual property rights of others</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            All content on CodeWise AI, including text, graphics, logos, icons, images, and software, is the property of CodeWise AI or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works from our site content without explicit written permission.
          </p>
          <p>
            Content you generate using our AI tools belongs to you. However, we do not guarantee the originality or uniqueness of AI-generated content, and you are responsible for verifying that generated content does not infringe on third-party rights before use.
          </p>

          <h2>5. AI-Generated Content Disclaimer</h2>
          <p>
            Our AI tools use machine learning models to generate responses and content. While we strive for accuracy, AI-generated content may contain errors, inaccuracies, or biases. You should:
          </p>
          <ul>
            <li>Always review and verify AI-generated content before using it in production environments</li>
            <li>Not rely solely on AI-generated code for critical systems without thorough testing</li>
            <li>Understand that AI outputs do not constitute professional advice (legal, medical, financial, etc.)</li>
          </ul>

          <h2>6. Third-Party Links and Tools</h2>
          <p>
            Our website contains information about and links to third-party AI tools and services. These links are provided for convenience and informational purposes only. We do not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party websites or services. Your interactions with third-party services are governed by their respective terms and policies.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, CodeWise AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or in connection with your use of our services. Our total liability for any claims arising from your use of the site shall not exceed the amount you paid us (if any) in the 12 months preceding the claim.
          </p>

          <h2>8. Disclaimer of Warranties</h2>
          <p>
            Our services are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, whether express or implied. We do not warrant that:
          </p>
          <ul>
            <li>The services will be uninterrupted, timely, secure, or error-free</li>
            <li>The results obtained from using the services will be accurate or reliable</li>
            <li>Any errors in the services will be corrected</li>
          </ul>

          <h2>9. Privacy</h2>
          <p>
            Your use of our services is also governed by our <a href="/privacy-policy">Privacy Policy</a>, which describes how we collect, use, and protect your personal information. By using our services, you consent to the practices described in our Privacy Policy.
          </p>

          <h2>10. Advertising</h2>
          <p>
            Our website displays advertisements provided by third-party advertising networks, including Google AdSense. These ads help us keep our tools free for all users. Ad providers may use cookies and similar technologies to serve relevant ads. Please refer to our Privacy Policy and Cookie Consent for more details on advertising data practices.
          </p>

          <h2>11. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this page. Your continued use of our services after changes are posted constitutes acceptance of the modified terms. We encourage you to review these terms periodically.
          </p>

          <h2>12. Termination</h2>
          <p>
            We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use our services will cease immediately.
          </p>

          <h2>13. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with applicable laws, without regard to conflict of law provisions. Any disputes arising from these terms or your use of our services shall be resolved through good-faith negotiation first, and if unresolved, through binding arbitration.
          </p>

          <h2>14. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <ul>
            <li>Email: <a href="mailto:contact@codewize-ai.website">contact@codewize-ai.website</a></li>
            <li>Contact Page: <a href="/contact">/contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
