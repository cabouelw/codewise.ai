import { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';

export const metadata: Metadata = generateToolMetadata('paraphraser');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
