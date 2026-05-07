import { useState, useEffect } from 'react'

const phrases = [
  'Conversations that think.',
  'Ideas brought to life.',
  'Code written in seconds.',
  'Research, redefined.',
  'Your second brain.',
]

const suggestions = [
  { emoji: String.fromCodePoint(0x1F3A8), label: 'Generate an image' },
  { emoji: String.fromCodePoint(0x270D, 0xFE0F), label: 'Write a poem' },
  { emoji: String.fromCodePoint(0x1F4BB), label: 'Debug my code' },
  { emoji: String.fromCodePoint(0x1F4DD), label: 'Summarize a topic' },
  { emoji: String.fromCodePoint(0x1F310), label: 'Translate to Nepali' },
  { emoji: String.fromCodePoint(0x1F4A1), label: 'Brainstorm ideas' },
]

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const current = phrases[phraseIndex]
    let timeout

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2400)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 28)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setPhraseIndex((prev) => (prev + 1) % phrases.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, phraseIndex])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) setQuery('')
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(99,102,241,0.05) 0%, transparent 70%)',
      }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-5 text-center">

        {/* Title */}
        <h1 className="fade-in-up text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold tracking-[-0.03em] leading-none text-white">
          GuffGPT
        </h1>

        {/* Subtitle */}
        <p className="fade-in-up-delay-1 mt-4 md:mt-5 text-sm md:text-[15px] font-medium tracking-[0.2em] uppercase text-slate-400">
          Nepal's First AI Chatbot
        </p>

        {/* Typewriter */}
        <div className="fade-in-up-delay-1 mt-5 md:mt-6 h-7 md:h-8 flex items-center justify-center">
          <span className="typewriter-cursor text-[15px] md:text-base text-slate-500 font-light tracking-wide">
            {displayed}
          </span>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSubmit} className="fade-in-up-delay-2 mt-9 md:mt-11">
          <div className="glass-input flex items-center rounded-2xl px-5 py-1.5">
            <svg className="w-[18px] h-[18px] text-slate-500 shrink-0 mr-3" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask GuffGPT anything..."
              className="flex-1 bg-transparent text-[15px] text-slate-200 placeholder-slate-600 py-3 outline-none font-light tracking-wide"
            />
            <button
              type="submit"
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/15 transition-all duration-200 ml-2"
            >
              <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
            </button>
          </div>
        </form>

        {/* Suggestion chips */}
        <div className="fade-in-up-delay-3 mt-5 flex flex-wrap items-center justify-center gap-2">
          {suggestions.map((s) => (
            <button
              key={s.label}
              onClick={() => setQuery(s.label)}
              className="chip-hover flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500 border border-slate-700/50 rounded-full px-3.5 py-[6px] hover:border-slate-600 hover:text-slate-300 hover:bg-white/[0.03]"
            >
              <span className="text-[13px]">{s.emoji}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
