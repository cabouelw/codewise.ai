import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer - CodeWise AI',
  description: 'Disclaimer for CodeWise AI. Important information about our AI tools, third-party tool reviews, affiliate relationships, and limitations of AI-generated content.',
  keywords: ['disclaimer', 'AI tools disclaimer', 'affiliate disclosure', 'content disclaimer', 'CodeWise AI disclaimer'],
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
    canonical: 'https://codewize-ai.website/disclaimer',
  },
  openGraph: {
    title: 'Disclaimer | CodeWise AI',
    description: 'Important disclaimers about CodeWise AI tools and content.',
    type: 'website',
    url: 'https://codewize-ai.website/disclaimer',
  },
}

export default function DisclaimerPage() {
  return (
    <div className="py-20 bg-white dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Disclaimer</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Last updated: June 1, 2025
          </p>

          <h2>General Information</h2>
          <p>
            The information provided on codewize-ai.website (&quot;CodeWise AI&quot;) is for general informational and educational purposes only. While we strive to provide accurate and up-to-date information about AI tools, development practices, and technology trends, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on this website.
          </p>

          <h2>AI-Generated Content</h2>
          <p>
            Some content on this website, including tool descriptions, blog posts, and educational materials, may be created or assisted by artificial intelligence. While our editorial team reviews content for quality and accuracy, AI-generated content may contain:
          </p>
          <ul>
            <li>Factual inaccuracies or outdated information</li>
            <li>Simplified explanations that may not cover all edge cases</li>
            <li>Code examples that require additional testing before production use</li>
            <li>Opinions or recommendations that may not suit every use case</li>
          </ul>
          <p>
            We encourage readers to verify critical information independently and use their professional judgment when applying any advice or code examples found on this website.
          </p>

          <h2>Third-Party Tool Reviews and Information</h2>
          <p>
            CodeWise AI provides information, reviews, and comparisons of third-party AI tools and services. Please note:
          </p>
          <ul>
            <li>We are not affiliated with, endorsed by, or officially connected to any of the third-party tools featured on our site unless explicitly stated</li>
            <li>Tool features, pricing, and availability may change without our knowledge — always verify current information on the official tool websites</li>
            <li>Our reviews and opinions are based on publicly available information and our own evaluation at the time of writing</li>
            <li>Individual experiences with third-party tools may vary based on use case, configuration, and other factors</li>
          </ul>

          <h2>Affiliate Disclosure</h2>
          <p>
            Some links on codewize-ai.website may be affiliate links. This means that if you click on a link and make a purchase or sign up for a service, we may receive a small commission at no additional cost to you. This helps support the maintenance and development of our free tools and content. Our editorial opinions and tool evaluations are not influenced by affiliate relationships — we recommend tools based on their merit and usefulness to developers.
          </p>

          <h2>No Professional Advice</h2>
          <p>
            The content on this website does not constitute professional advice of any kind, including but not limited to:
          </p>
          <ul>
            <li><strong>Legal advice:</strong> Our terms, policies, and content discussions should not be taken as legal counsel</li>
            <li><strong>Financial advice:</strong> Tool pricing comparisons and business recommendations are informational only</li>
            <li><strong>Security advice:</strong> While we discuss security practices, always consult a qualified security professional for critical systems</li>
            <li><strong>Career advice:</strong> Our content about development practices is educational and may not apply to your specific situation</li>
          </ul>

          <h2>Use of Our AI Tools</h2>
          <p>
            The AI-powered tools available on our website (code explainer, content generator, paraphraser, translator, etc.) are provided free of charge for personal and educational use. Important limitations:
          </p>
          <ul>
            <li>AI tools may produce incorrect, biased, or inappropriate results</li>
            <li>Do not input sensitive, confidential, or personally identifiable information into our tools</li>
            <li>Generated content should be reviewed by a human before use in professional contexts</li>
            <li>We do not guarantee the availability or uptime of any tool</li>
            <li>Results may vary and are not guaranteed to be unique or plagiarism-free</li>
          </ul>

          <h2>External Links</h2>
          <p>
            Our website contains links to external websites and resources. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorsement of the views expressed within them. We are not responsible for any content, privacy practices, or actions of external websites.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            In no event shall CodeWise AI be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website or its tools.
          </p>

          <h2>Changes to This Disclaimer</h2>
          <p>
            We reserve the right to update or modify this disclaimer at any time without prior notice. Changes will be effective immediately upon posting. We recommend reviewing this page periodically for any updates.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns about this disclaimer, please reach out to us:
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
