import { MDXRemote } from 'next-mdx-remote/rsc'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'

interface MarkdownRendererProps {
  source: string
}

// Custom components for MDX
const components = {
  // Headings with better styling
  h1: (props: any) => (
    <h1
      className="scroll-mt-20 text-4xl font-bold mt-10 mb-6 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-4"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="scroll-mt-20 text-3xl font-bold mt-12 mb-5 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="scroll-mt-20 text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-white"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h4
      className="scroll-mt-20 text-xl font-semibold mt-6 mb-3 text-slate-800 dark:text-slate-200"
      {...props}
    />
  ),
  h5: (props: any) => (
    <h5
      className="scroll-mt-20 text-lg font-semibold mt-4 mb-2 text-slate-800 dark:text-slate-200"
      {...props}
    />
  ),
  h6: (props: any) => (
    <h6
      className="scroll-mt-20 text-base font-semibold mt-3 mb-2 text-slate-800 dark:text-slate-200"
      {...props}
    />
  ),

  // Paragraph with optimized line height
  p: (props: any) => (
    <p className="text-slate-700 dark:text-slate-300 text-lg leading-8 mb-5" {...props} />
  ),

  // Links with icon
  a: (props: any) => {
    const isExternal = props.href?.startsWith('http')
    return (
      <a
        className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium underline decoration-sky-300 dark:decoration-sky-600 decoration-2 underline-offset-2 hover:decoration-sky-500 dark:hover:decoration-sky-400 transition-all inline-flex items-center gap-1"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {props.children}
        {isExternal && (
          <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </a>
    )
  },

  // Enhanced lists
  ul: (props: any) => (
    <ul className="my-6 space-y-2 text-slate-700 dark:text-slate-300" {...props} />
  ),
  ol: (props: any) => (
    <ol className="my-6 space-y-2 text-slate-700 dark:text-slate-300" {...props} />
  ),
  li: (props: any) => (
    <li className="ml-6 pl-2" {...props} />
  ),

  // Code blocks with language badge
  pre: (props: any) => {
    const { children, className } = props
    const language = className?.replace('language-', '') || 'text'

    return (
      <div className="relative group my-6">
        <div className="absolute -top-3 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full border border-blue-200 shadow-sm">
            {language}
          </span>
        </div>
        <pre
          className="!bg-gradient-to-br !from-slate-900 !via-slate-800 !to-slate-900 !p-6 !pt-8 rounded-xl overflow-x-auto shadow-2xl border border-slate-700/50"
          data-language={language}
          {...props}
        >
          {children}
        </pre>
      </div>
    )
  },

  code: (props: any) => {
    const { className, children } = props

    // Inline code
    if (!className) {
      return (
        <code className="px-2 py-1 text-sm font-semibold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/30 rounded border border-pink-200 dark:border-pink-800 font-mono" {...props} />
      )
    }

    // Code block (will be wrapped by pre)
    return <code className={`${className} !bg-transparent text-sm`} {...props} />
  },

  // Enhanced blockquote
  blockquote: (props: any) => (
    <blockquote className="relative border-l-4 border-sky-500 dark:border-sky-400 pl-6 pr-4 py-4 my-6 bg-gradient-to-r from-sky-50 dark:from-sky-900/20 to-transparent rounded-r-lg shadow-sm">
      <div className="absolute -left-3 top-4 w-6 h-6 bg-sky-500 dark:bg-sky-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
        "
      </div>
      <div className="text-slate-700 dark:text-slate-300 italic font-medium text-lg leading-relaxed">
        {props.children}
      </div>
    </blockquote>
  ),

  // Horizontal rule
  hr: () => (
    <hr className="my-10 border-t-2 border-slate-200 dark:border-slate-700" />
  ),

  // Enhanced table with hover effects
  table: (props: any) => (
    <div className="overflow-x-auto my-8 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700" {...props} />
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700" {...props} />
  ),
  tbody: (props: any) => (
    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700" {...props} />
  ),
  tr: (props: any) => (
    <tr className="hover:bg-sky-50 dark:hover:bg-slate-700/50 transition-colors" {...props} />
  ),
  th: (props: any) => (
    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider" {...props} />
  ),
  td: (props: any) => (
    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 whitespace-nowrap" {...props} />
  ),

  // Optimized image with Next.js Image (if path is from public)
  img: (props: any) => {
    const { src, alt = 'Image' } = props

    return (
      <figure className="my-8">
        <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
        {alt && alt !== 'Image' && (
          <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 italic mt-3">
            {alt}
          </figcaption>
        )}
      </figure>
    )
  },

  // Strong/Bold
  strong: (props: any) => (
    <strong className="font-bold text-slate-900 dark:text-white" {...props} />
  ),

  // Emphasis/Italic
  em: (props: any) => (
    <em className="italic text-slate-800 dark:text-slate-200" {...props} />
  ),
}

export default async function MarkdownRenderer({ source }: MarkdownRendererProps) {
  return (
    <article className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-sky-600 dark:prose-a:text-sky-400 prose-img:rounded-xl">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypePrism as any],
          }
        }}
      />
    </article>
  )
}