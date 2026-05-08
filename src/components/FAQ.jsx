import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import useApiData from '../hooks/useApiData'

const defaultFaqs = [
  {
    q: 'Is GuffGPT free to use?',
    a: 'Yes! GuffGPT is completely free. Visit chat.guffgpt.com, sign in with your Google account, and start chatting. No hidden charges or premium tiers.',
  },
  {
    q: 'What languages does GuffGPT support?',
    a: 'GuffGPT supports Nepali (\u0926\u0947\u0935\u0928\u093E\u0917\u0930\u0940), Romanized Nepali (like "k cha bro"), and English. You can freely mix languages in the same conversation.',
  },
  {
    q: 'Can I use GuffGPT on my phone?',
    a: 'Absolutely! GuffGPT works on any device with a web browser \u2014 phones, tablets, laptops, and desktops. No app installation needed.',
  },
  {
    q: 'How is GuffGPT different from ChatGPT?',
    a: 'GuffGPT is specifically designed for Nepali users. It understands Nepali language and culture natively, includes real-time web search, supports image uploads, and has a voice chat feature. Plus, it has a fun personality that feels like chatting with a Nepali friend.',
  },
  {
    q: 'Is my data safe?',
    a: "Yes. Your conversations are stored securely and only accessible to you. We don\u2019t sell data to third parties. You can delete your account and all data anytime from chat settings.",
  },
  {
    q: 'Can GuffGPT help with studies?',
    a: 'Yes! Many students use GuffGPT for homework help, exam prep, essays, and understanding difficult concepts. Upload photos of textbook pages and ask GuffGPT to explain them.',
  },
  {
    q: 'Who built GuffGPT?',
    a: 'GuffGPT was built by Dikshant Pandey, a developer from Nepal. The goal is to make AI accessible to all Nepalis.',
  },
]

function FAQItem({ faq, index, visible }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 mb-3"
      style={{
        transitionDelay: visible ? `${index * 60}ms` : '0ms',
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : 12}px)`,
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left group cursor-pointer"
      >
        <span className="text-[15px] md:text-[16px] font-medium text-neutral-300 group-hover:text-neutral-100 transition-colors duration-200 pr-6">
          {faq.q}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
            open
              ? 'bg-indigo-500/15 border-indigo-500/25 rotate-45'
              : 'border-neutral-700/50 group-hover:border-neutral-600'
          }`}
        >
          <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="text-[14px] text-neutral-500 leading-[1.75] pb-5 md:pb-6 pr-14">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const faqs = useApiData('faq', defaultFaqs)
  const [ref, visible] = useReveal(0.1)
  const [listRef, listVisible] = useReveal(0.05)

  return (
    <section id="faq" className="relative w-full px-5 py-24 md:py-32 overflow-hidden">
      <div className="absolute right-1/4 top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
          {/* Left — sticky heading */}
          <div
            ref={ref}
            className="lg:sticky lg:top-24 lg:self-start"
            style={{
              opacity: visible ? 1 : 0,
              transform: 'translateY(' + (visible ? 0 : 20) + 'px)',
              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <p className="inline-flex rounded-full border border-indigo-300/15 bg-indigo-300/[0.06] px-3 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-indigo-300/80 mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 tracking-tight leading-tight">
              Frequently<br className="hidden lg:block" /> Asked<br className="hidden lg:block" /> Questions
            </h2>
            <p className="mt-4 text-[14px] text-neutral-500 leading-relaxed max-w-xs">
              Everything you need to know about GuffGPT. Can't find what you're looking for? Reach out.
            </p>
          </div>

          {/* Right — questions */}
          <div ref={listRef} className="glass-panel rounded-[2rem] p-3 md:p-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} visible={listVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
