import { generateToolMetadata } from '@/lib/seo'

export const metadata = generateToolMetadata('ai-assistant')

export default function AIAssistantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
