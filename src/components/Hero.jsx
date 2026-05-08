import { useState } from 'react'

const suggestions = [
  'Explain a topic in Nepali',
  'Help me write an email',
  'Summarize this article',
  'Plan my study routine',
]

const highlights = ['Nepali + English', 'Useful for study', 'Work and writing', 'Simple answers']

export default function Hero() {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) setQuery('')
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-5 pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[48%] bg-[radial-gradient(ellipse_at_top,rgba(129,140,248,0.14),transparent_68%)]" />
        <div className="absolute left-1/2 top-[46%] h-px w-[min(720px,82vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        <h1 className="fade-in-up text-[4rem] sm:text-7xl md:text-8xl lg:text-[8rem] font-black tracking-[-0.065em] leading-[0.9] text-white">
          GuffGPT
        </h1>

        <p className="fade-in-up-delay-1 mt-6 md:mt-7 text-sm md:text-[15px] font-semibold tracking-[0.24em] uppercase text-slate-500">
          Nepal's First AI Chatbot
        </p>

        <p className="fade-in-up-delay-2 mx-auto mt-6 max-w-2xl text-[16px] md:text-[18px] leading-8 text-slate-400">
          A simple assistant for learning, writing, translating, and getting things done in Nepali, English, or both.
        </p>

        <form onSubmit={handleSubmit} className="fade-in-up-delay-2 mx-auto mt-9 max-w-2xl">
          <div className="glass-input flex items-center rounded-[1.35rem] px-4 py-2 sm:px-5">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent text-[15px] sm:text-base text-slate-100 placeholder-slate-500 py-3.5 outline-none font-light tracking-wide"
            />
            <button
              type="submit"
              className="magnetic-btn shrink-0 h-11 w-11 sm:w-auto sm:px-4 flex items-center justify-center rounded-xl bg-white text-slate-950 transition-all duration-200 ml-2 hover:bg-slate-200"
              aria-label="Submit prompt"
            >
              <span className="relative hidden sm:inline text-[13px] font-semibold mr-2">Ask</span>
              <svg className="relative w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
            </button>
          </div>
        </form>

        <div className="fade-in-up-delay-3 mt-5 flex flex-wrap items-center justify-center gap-2.5">
          {suggestions.map((label) => (
            <button
              key={label}
              onClick={() => setQuery(label)}
              className="chip-hover text-[12.5px] font-medium text-slate-500 border border-white/[0.08] rounded-full px-3.5 py-2 hover:text-slate-200 bg-white/[0.02]"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="fade-in-up-delay-3 mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2 text-[12px] text-slate-600">
          {highlights.map((item) => (
            <span key={item} className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
