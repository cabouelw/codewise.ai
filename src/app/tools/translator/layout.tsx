import { generateToolMetadata } from '@/lib/seo'

export const metadata = generateToolMetadata('translator')

export default function TranslatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
