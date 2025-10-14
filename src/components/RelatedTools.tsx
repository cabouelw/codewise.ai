import Link from 'next/link'
import Image from 'next/image'
import { Tool } from '@/lib/tools'

interface RelatedToolsProps {
  tools: Tool[]
}

export default function RelatedTools({ tools }: RelatedToolsProps) {
  if (tools.length === 0) return null

  return (
    <section className="mt-16 border-t pt-12">
      <h2 className="text-3xl font-bold mb-8">Related Tools</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
              <Image
                src={tool.image}
                alt={tool.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {tool.aiBased && (
                <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  AI Powered
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{tool.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-gray-500">{tool.category}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {tool.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600">
                  {tool.pricing}
                </span>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}