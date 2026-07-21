interface ToolContentSectionProps {
  title: string
  description: string
  howToUse: string[]
  features: { title: string; description: string }[]
  faq: { question: string; answer: string }[]
}

export default function ToolContentSection({ title, description, howToUse, features, faq }: ToolContentSectionProps) {
  return (
    <div className="mt-16 max-w-4xl mx-auto">
      {/* About This Tool */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">About {title}</h2>
        <p className="text-slate-300 leading-relaxed text-base">{description}</p>
      </div>

      {/* How to Use */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">How to Use</h2>
        <ol className="space-y-3">
          {howToUse.map((step, index) => (
            <li key={index} className="flex items-start gap-3 text-slate-300">
              <span className="flex-shrink-0 w-7 h-7 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Key Features */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="border border-slate-700/30 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faq.map((item, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-2">{item.question}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
