interface SEOProps {
  title: string
  description: string
  canonical?: string
  keywords?: string[]
  image?: string
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  keywords = [],
  image
}) => {
  // This is a placeholder component for SEO
  // In a real app, you would use next-seo or implement meta tags
  // For now, we'll just return null since Next.js handles meta tags in layout.tsx
  return null
}

export default SEO