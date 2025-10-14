import { Metadata } from 'next';
import { generateToolMetadata } from '@/lib/seo';

export const metadata: Metadata = generateToolMetadata('code-explainer');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
