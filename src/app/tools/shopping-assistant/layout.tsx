import { generateToolMetadata } from '@/lib/seo'

export const metadata = generateToolMetadata('shopping-assistant')

export default function ShoppingAssistantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
