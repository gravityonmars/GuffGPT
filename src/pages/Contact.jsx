import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import Footer from '../components/Footer'

const info = [
  {
    icon: (
      <svg className="w-5 h-5 text-indigo-400/80" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    value: 'contact@guffgpt.com',
    href: 'mailto:contact@guffgpt.com',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-indigo-400/80" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    label: 'Website',
    value: 'guffgpt.com',
    href: 'https://guffgpt.com',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-indigo-400/80" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: 'Location',
    value: 'Nepal',
    href: null,
  },
]

export default function Contact() {
  const [heroRef, heroVisible] = useReveal(0.1)
  const [formRef, formVisible] = useReveal(0.08)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <main className="pt-[60px]">
        {/* Hero */}
        <section className="px-5 pt-20 md:pt-28 pb-16 md:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 30%, rgba(99,102,241,0.16) 0%, transparent 70%)' }} />
          <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          <div
            ref={heroRef}
            className="relative max-w-3xl mx-auto text-center"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: `translateY(${heroVisible ? 0 : 24}px)`,
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <p className="inline-flex rounded-full border border-indigo-300/15 bg-indigo-400/10 px-4 py-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-indigo-300 mb-4">Contact</p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white tracking-[-0.04em] leading-[1.05]">
              Get in Touch
            </h1>
            <p className="mt-5 text-[16px] text-slate-400 max-w-lg mx-auto leading-relaxed">
              Have a question, feedback, or just want to say hi? We'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact form + info */}
        <section className="relative px-5 pb-24 md:pb-32">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          <div
            ref={formRef}
            className="relative glass-panel max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 rounded-[2rem] p-5 md:p-8"
            style={{
              opacity: formVisible ? 1 : 0,
              transform: `translateY(${formVisible ? 0 : 24}px)`,
              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-10 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-100 mb-2">Message Sent!</h3>
                  <p className="text-[14px] text-neutral-500">Thank you for reaching out. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13px] font-medium text-neutral-400 mb-2">Name</label>
                      <input
                        type="text"
                        required
                        className="glass-input w-full px-4 py-3 rounded-xl text-[14px] text-slate-200 placeholder-slate-600 outline-none transition-all duration-200"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-neutral-400 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="glass-input w-full px-4 py-3 rounded-xl text-[14px] text-slate-200 placeholder-slate-600 outline-none transition-all duration-200"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-neutral-400 mb-2">Subject</label>
                    <input
                      type="text"
                      className="glass-input w-full px-4 py-3 rounded-xl text-[14px] text-slate-200 placeholder-slate-600 outline-none transition-all duration-200"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-neutral-400 mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      className="glass-input w-full px-4 py-3 rounded-xl text-[14px] text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="magnetic-btn inline-flex items-center gap-2.5 px-7 py-3 bg-white hover:bg-slate-200 text-slate-950 text-[15px] font-semibold rounded-2xl transition-colors duration-200 cursor-pointer"
                  >
                    Send Message
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </button>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {info.map((item) => (
                <div key={item.label} className="lift-card rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-600 mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-[15px] text-slate-300 hover:text-indigo-300 transition-colors" target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[15px] text-slate-300">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="pt-6 mt-6 border-t border-white/[0.08]">
                <p className="text-[13px] text-slate-600 leading-[1.7]">
                  GuffGPT is built by Dikshant Pandey in Nepal. For business inquiries, partnerships, or press, reach out via email.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
