import { generateToolMetadata } from '@/lib/seo'

export const metadata = generateToolMetadata('content-generator')

export default function ContentGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
