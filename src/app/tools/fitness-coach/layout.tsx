import { generateToolMetadata } from '@/lib/seo'

export const metadata = generateToolMetadata('fitness-coach')

export default function FitnessCoachLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
