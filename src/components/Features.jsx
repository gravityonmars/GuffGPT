import { useState, useCallback } from 'react'
import useReveal from '../hooks/useReveal'
import useApiData from '../hooks/useApiData'

const defaultFeatures = [
  {
    emoji: [0x1F1F3, 0x1F1F5],
    title: 'Nepali + English',
    subtitle: 'Your language, your way.',
    desc: 'Chat in pure Nepali, English, or Romanized Nepali. GuffGPT understands "k cha bhai" just as well as formal queries. Mix languages freely in the same conversation.',
    color: '#818cf8',
    prompt: 'Malai Nepal ko bare ma batauna sakchau?',
    response: 'Nepal Himalayan range ma parcha. Yo desh ko rajdhani Kathmandu ho. Nepal ma 125 bhanda badi jatiharu ra 123 bhasha bolinchan. Sagarmatha (Mount Everest) yahi desh ma cha!',
    tag: 'Nepali + English',
  },
  {
    emoji: [0x1F50D],
    title: 'Web Search',
    subtitle: 'Real-time answers.',
    desc: 'Need live info? GuffGPT searches the web in real-time for news, prices, scores, and anything that needs fresh data. Always up to date.',
    color: '#6ee7b7',
    prompt: "What's the weather in Kathmandu today?",
    response: "Currently in Kathmandu: 24\u00B0C, partly cloudy. Humidity 45%. Wind 12 km/h from the west. No rain expected today \u2014 perfect weather for a stroll around Thamel!",
    tag: 'Live Search',
  },
  {
    emoji: [0x1F5BC, 0xFE0F],
    title: 'Image Understanding',
    subtitle: 'See and understand.',
    desc: 'Upload photos and ask questions about them. Homework, documents, screenshots \u2014 GuffGPT sees and understands it all. Perfect for students.',
    color: '#f9a8d4',
    prompt: '[Image: Math homework page] Solve question 3',
    response: 'Question 3 asks to find the derivative of f(x) = 3x\u00B2 + 2x - 5.\n\nUsing the power rule:\nf\'(x) = 6x + 2\n\nThe answer is f\'(x) = 6x + 2',
    tag: 'Vision AI',
  },
  {
    emoji: [0x1F399, 0xFE0F],
    title: 'Voice Chat',
    subtitle: 'Talk, don\'t type.',
    desc: 'Real-time voice conversations powered by AI. Speak naturally in Nepali or English. GuffGPT listens, thinks, and replies \u2014 like talking to a smart friend.',
    color: '#c4b5fd',
    prompt: '\u{1F3A4} "Hey GuffGPT, tell me a fun fact about Nepal"',
    response: '"Did you know Nepal is the only country in the world whose flag isn\'t rectangular? It\'s made of two overlapping triangles, representing the Himalayan mountains and the two major religions!"',
    tag: 'Voice AI',
  },
  {
    emoji: [0x1F512],
    title: 'Privacy First',
    subtitle: 'Your data, your control.',
    desc: 'Chat history stays private. Sign in with Google for seamless access. No data sold, ever. Delete your account and all data anytime from settings.',
    color: '#fbbf24',
    prompt: 'Is my conversation data safe?',
    response: 'Absolutely! Your conversations are encrypted and stored securely. Only you can access them. We never sell your data to third parties. You can delete all your data anytime from Settings > Privacy.',
    tag: 'Secure',
  },
  {
    emoji: [0x26A1],
    title: 'Lightning Fast',
    subtitle: 'Speed meets intelligence.',
    desc: 'Powered by cutting-edge AI models. Get responses in seconds, not minutes. Built on Azure for 99.9% uptime. Always available when you need it.',
    color: '#fb923c',
    prompt: 'Explain quantum computing in 3 sentences',
    response: 'Regular computers use bits (0 or 1). Quantum computers use qubits that can be both simultaneously through superposition. This lets them solve certain problems exponentially faster than classical computers.',
    tag: 'Fast',
  },
]

function TypingText({ text }) {
  return <span>{text}</span>
}

export default function Features() {
  const features = useApiData('features', defaultFeatures)
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [ref, visible] = useReveal(0.08)

  const goTo = useCallback((idx) => {
    setDirection(idx > active ? 1 : -1)
    setActive(idx)
  }, [active])

  const next = useCallback(() => {
    setDirection(1)
    setActive(p => (p + 1) % features.length)
  }, [features.length])

  const prev = useCallback(() => {
    setDirection(-1)
    setActive(p => (p - 1 + features.length) % features.length)
  }, [features.length])

  const f = features[active]

  return (
    <section
      id="features"
      className="relative w-full px-5 pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden"
    >
      <div className="absolute left-1/2 top-28 h-64 w-64 -translate-x-1/2 rounded-full bg-white/[0.025] blur-3xl pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-14 md:mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: 'translateY(' + (visible ? 0 : 20) + 'px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <p className="inline-flex rounded-full border border-indigo-300/15 bg-indigo-300/[0.06] px-3 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-indigo-300/80 mb-4">Features</p>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-neutral-100 tracking-tight leading-[1.1]">
            Not just another chatbot.
          </h2>
          <p className="mt-4 text-[15.5px] text-neutral-500 max-w-lg mx-auto leading-relaxed">
            Multilingual, smart, and designed for how Nepalis actually talk.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative glass-panel rounded-[2.25rem] p-5 md:p-8 lg:p-10">
          {/* Main content area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center min-h-[420px] md:min-h-[460px]">

            {/* Left: Text */}
            <div
              key={active + '-text'}
              className="carousel-slide-in"
              style={{ '--slide-dir': direction > 0 ? '40px' : '-40px' }}
            >
              {/* Feature tag */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
                style={{ borderColor: f.color + '25', background: f.color + '08' }}
              >
                <span className="text-base">{typeof f.emoji === 'string' ? f.emoji : String.fromCodePoint(...f.emoji)}</span>
                <span className="text-[11px] font-semibold tracking-wide uppercase" style={{ color: f.color }}>
                  {f.tag}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-neutral-100 tracking-tight leading-[1.12] mb-2">
                {f.title}
              </h3>
              <p className="text-lg md:text-xl text-neutral-400 font-medium mb-4">
                {f.subtitle}
              </p>
              <p className="text-[15px] text-neutral-500 leading-[1.75] max-w-md mb-8">
                {f.desc}
              </p>

              {/* Progress dots */}
              <div className="flex items-center gap-2">
                {features.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 cursor-pointer"
                    style={{
                      width: i === active ? '40px' : '12px',
                      background: i === active ? 'transparent' : 'rgba(63,63,70,0.6)',
                    }}
                    aria-label={'Go to feature ' + (i + 1)}
                  >
                    {i === active && (
                      <>
                        <div className="absolute inset-0 rounded-full" style={{ background: f.color + '30' }} />
                        <div
                          className="absolute inset-y-0 left-0 rounded-full carousel-progress"
                          style={{ background: f.color, animationDuration: '0.001s' }}
                        />
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Chat Demo */}
            <div
              key={active + '-demo'}
              className="carousel-slide-in"
              style={{ '--slide-dir': direction > 0 ? '50px' : '-50px' }}
            >
              <div
                className="relative rounded-[1.75rem] border overflow-hidden transition-all duration-500 backdrop-blur-2xl"
                style={{
                  borderColor: f.color + '15',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(16,16,25,0.78))',
                  boxShadow: '0 30px 80px -20px rgba(0,0,0,0.5), 0 0 60px -15px ' + f.color + '12',
                }}
              >
                {/* Window chrome */}
                <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: f.color + '10' }}>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-700/60" />
                  </div>
                  <span className="text-[11px] font-medium text-neutral-600">chat.guffgpt.com</span>
                  <div className="w-12" />
                </div>

                {/* Chat content */}
                <div className="p-5 md:p-6 space-y-5 min-h-[280px]">
                  {/* User message */}
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-neutral-700/50 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[11px] font-medium text-neutral-600 block mb-1">You</span>
                      <p className="text-[14px] text-neutral-300 leading-relaxed">{f.prompt}</p>
                    </div>
                  </div>

                  {/* GuffGPT response */}
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: f.color + '15' }}>
                      <span className="text-[10px] font-bold" style={{ color: f.color }}>G</span>
                    </div>
                    <div>
                      <span className="text-[11px] font-medium text-neutral-600 block mb-1">GuffGPT</span>
                      <p className="text-[14px] text-neutral-400 leading-[1.75] whitespace-pre-line">
                        <TypingText text={f.response} />
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center justify-center gap-3 mt-10 lg:hidden">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/[0.1] bg-white/[0.05] flex items-center justify-center hover:bg-white/[0.09] transition-colors cursor-pointer" aria-label="Previous">
              <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <span className="text-[12px] text-neutral-600 font-mono tabular-nums">{String(active + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}</span>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/[0.1] bg-white/[0.05] flex items-center justify-center hover:bg-white/[0.09] transition-colors cursor-pointer" aria-label="Next">
              <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>

          {/* Desktop side arrows */}
          <button onClick={prev} className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/[0.1] bg-black/30 backdrop-blur-xl items-center justify-center hover:bg-white/[0.08] hover:border-indigo-300/30 transition-all cursor-pointer" aria-label="Previous">
            <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <button onClick={next} className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/[0.1] bg-black/30 backdrop-blur-xl items-center justify-center hover:bg-white/[0.08] hover:border-indigo-300/30 transition-all cursor-pointer" aria-label="Next">
            <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>
      </div>
    </section>
  )
}
