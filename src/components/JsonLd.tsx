/**
 * JsonLd Component
 * 
 * Renders structured data (Schema.org) in JSON-LD format for SEO.
 * This helps search engines understand your content better and enables rich snippets.
 * 
 * @example
 * <JsonLd data={{
 *   "@context": "https://schema.org",
 *   "@type": "Organization",
 *   "name": "CodeWise AI"
 * }} />
 */
export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
