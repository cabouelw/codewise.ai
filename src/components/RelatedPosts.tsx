import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/lib/mdx/blog'

interface RelatedPostsProps {
  posts: BlogPost[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16 border-t pt-12">
      <h2 className="text-3xl font-bold mb-8">Related Articles</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                  {post.category}
                </span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}