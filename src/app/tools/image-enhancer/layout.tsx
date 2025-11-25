import { generateToolMetadata } from '@/lib/seo'

export const metadata = generateToolMetadata('image-enhancer')

export default function ImageEnhancerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
