import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import Footer from '../components/Footer'

const mission = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364V3" />
      </svg>
    ),
    title: 'Break the Language Barrier',
    desc: 'Make AI technology available in Nepali so that language is never a limitation to accessing information and help.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    title: 'Empower Students',
    desc: 'Help Nepali students learn better by providing explanations, homework help, and study resources in their native language.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
    title: 'Support Professionals',
    desc: 'Enable Nepali professionals to leverage AI for drafting, research, and productivity without needing perfect English.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: 'Preserve Language & Culture',
    desc: 'By processing and generating Nepali content, we contribute to keeping the Nepali language relevant in the age of AI.',
  },
]

const tech = [
  { title: 'Advanced AI Models', desc: 'Latest generation models that excel at understanding and generating Nepali text, including code-switched text mixing Nepali and English.' },
  { title: 'Real-time Web Search', desc: 'When you ask about current events, prices, or facts, GuffGPT searches the web to provide accurate, up-to-date information.' },
  { title: 'Vision Capabilities', desc: 'Upload images \u2014 textbook pages, screenshots, documents \u2014 and GuffGPT can analyze and explain them.' },
  { title: 'Voice AI', desc: 'Real-time spoken conversations with AI in both Nepali and English. Talk naturally, get instant answers.' },
  { title: 'Secure Infrastructure', desc: 'Built on Azure with Firebase Authentication. Your data is encrypted and protected following industry best practices.' },
]

const values = [
  { title: 'Accessibility', desc: 'AI should be free and available to everyone, not just those who can afford subscriptions.' },
  { title: 'Privacy', desc: 'Your conversations are yours. We never sell data and we keep your chats private.' },
  { title: 'Transparency', desc: "We're honest about what GuffGPT can and cannot do. AI isn't perfect, and we don't pretend it is." },
  { title: 'Cultural Respect', desc: 'We design GuffGPT to be culturally appropriate and respectful of Nepali values and traditions.' },
]

const roadmap = [
  'Supporting more local languages spoken in Nepal',
  'Building specialized tools for Nepali students (exam prep, study aids)',
  'Improving voice chat quality and adding more language options',
  'Creating mobile apps for Android and iOS',
  'Partnering with educational institutions in Nepal',
]

function Section({ children }) {
  const [ref, visible] = useReveal(0.1)
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: 'translateY(' + (visible ? 0 : 20) + 'px)',
        transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  )
}

export default function About() {
  const [heroRef, heroVisible] = useReveal(0.1)

  return (
    <>
      <main className="pt-[60px]">
        {/* Hero */}
        <section className="px-5 pt-20 md:pt-28 pb-16 md:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 30%, rgba(99,102,241,0.05) 0%, transparent 70%)' }} />
          <div
            ref={heroRef}
            className="relative max-w-3xl mx-auto text-center"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: 'translateY(' + (heroVisible ? 0 : 24) + 'px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-indigo-400/70 mb-4">About</p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-neutral-100 tracking-tight leading-[1.1]">
              Our Story
            </h1>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-5 space-y-24 md:space-y-32 pb-24 md:pb-32">

          {/* Our Story */}
          <Section>
            <div className="space-y-5">
              <p className="text-[16px] text-neutral-400 leading-[1.85]">
                GuffGPT was born from a simple observation: while the world was buzzing about AI chatbots like ChatGPT, most of the conversations were happening in English. For millions of Nepalis who think, speak, and express themselves in Nepali, there was a gap. GuffGPT was created to fill that gap.
              </p>
              <p className="text-[16px] text-neutral-400 leading-[1.85]">
                The word "Guff" ({String.fromCodePoint(0x0917, 0x092B)}) is a beloved Nepali term meaning casual, friendly conversation {String.fromCodePoint(0x2014)} the kind you have with friends over chiya at a local tapari. That's exactly the experience we wanted to create: an AI that doesn't feel like a cold, corporate tool, but like a knowledgeable friend who speaks your language.
              </p>
            </div>
          </Section>

          {/* Mission */}
          <Section>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 tracking-tight mb-4">
              Our Mission
            </h2>
            <p className="text-[16px] text-neutral-400 leading-[1.85] mb-10">
              We believe that artificial intelligence should be accessible to everyone, regardless of the language they speak.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {mission.map((m, i) => (
                <div
                  key={m.title}
                  className="rounded-xl border border-neutral-800/40 bg-neutral-900/20 p-6 transition-all duration-500 hover:border-neutral-700/50 hover:bg-neutral-800/15"
                >
                  <div className="w-10 h-10 rounded-lg bg-neutral-800/50 border border-neutral-700/30 flex items-center justify-center mb-4 text-indigo-400/80">
                    {m.icon}
                  </div>
                  <h3 className="text-[16px] font-semibold text-neutral-100 mb-2">{m.title}</h3>
                  <p className="text-[14px] text-neutral-500 leading-[1.75]">{m.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Technology */}
          <Section>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 tracking-tight mb-4">
              The Technology
            </h2>
            <p className="text-[16px] text-neutral-400 leading-[1.85] mb-10">
              GuffGPT is powered by state-of-the-art large language models, running on Microsoft Azure's cloud infrastructure. This gives us enterprise-grade reliability and performance while keeping the service free for users.
            </p>
            <div className="space-y-4">
              {tech.map((t) => (
                <div
                  key={t.title}
                  className="flex gap-4 items-start rounded-xl border border-neutral-800/30 bg-neutral-900/10 p-5 transition-all duration-300 hover:border-neutral-700/40"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 mt-2.5 shrink-0" />
                  <div>
                    <h3 className="text-[15px] font-semibold text-neutral-200 mb-1">{t.title}</h3>
                    <p className="text-[14px] text-neutral-500 leading-[1.75]">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Values */}
          <Section>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 tracking-tight mb-10">
              Our Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {values.map((v) => (
                <div key={v.title} className="p-6 rounded-xl border border-neutral-800/40 bg-neutral-900/20 transition-all duration-500 hover:border-neutral-700/50 hover:bg-neutral-800/15">
                  <h3 className="text-[16px] font-semibold text-neutral-100 mb-2">{v.title}</h3>
                  <p className="text-[14px] text-neutral-500 leading-[1.75]">{v.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* What's Next */}
          <Section>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 tracking-tight mb-4">
              What's Next
            </h2>
            <p className="text-[16px] text-neutral-400 leading-[1.85] mb-8">
              We're constantly working to improve GuffGPT. Some things we're exploring:
            </p>
            <div className="space-y-3">
              {roadmap.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/50 mt-2.5 shrink-0" />
                  <p className="text-[15px] text-neutral-400 leading-[1.7]">{item}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Meet the Creators */}
          <Section>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 tracking-tight mb-4 text-center">
              Meet the Creators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Dikshant Pandey */}
              <div className="rounded-xl border border-neutral-800/40 bg-neutral-900/20 p-7 flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold text-indigo-300 mb-2">Dikshant Pandey</h3>
                <p className="text-[15px] text-neutral-400 leading-[1.8] mb-2">Founder &amp; Lead Developer</p>
                <p className="text-[15px] text-neutral-400 leading-[1.8]">
                  Dikshant is a developer from Nepal passionate about making technology accessible. What started as a hobby project evolved into Nepal's first fully-featured AI chatbot with multilingual support, voice chat, and real-time web search. Driven by the belief that Nepalis deserve AI tools that understand their language and culture, Dikshant built GuffGPT during his spare time.
                </p>
              </div>
              {/* Prayas Bhatt */}
              <div className="rounded-xl border border-neutral-800/40 bg-neutral-900/20 p-7 flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold text-indigo-300 mb-2">Prayas Bhatt</h3>
                <p className="text-[15px] text-neutral-400 leading-[1.8] mb-2">Web Developer</p>
                <p className="text-[15px] text-neutral-400 leading-[1.8]">
                  Prayas is a web developer who joined the project to help bring GuffGPT’s vision to life on the web. He contributed to the frontend experience, admin panel, and overall usability, ensuring that GuffGPT is easy to use and visually appealing. Prayas shares the mission of making advanced AI accessible to Nepalis everywhere.
                </p>
              </div>
            </div>
          </Section>

          {/* Get in Touch */}
          <Section>
            <div className="text-center rounded-xl border border-neutral-800/40 bg-neutral-900/20 p-10 md:p-14">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-100 tracking-tight mb-4">
                Get in Touch
              </h2>
              <p className="text-[15px] text-neutral-500 leading-[1.75] mb-7 max-w-md mx-auto">
                Have questions, suggestions, or want to collaborate? We'd love to hear from you.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-[13px] font-medium px-6 py-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all duration-300"
              >
                Contact Us
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </Section>

        </div>
      </main>
      <Footer />
    </>
  )
}
