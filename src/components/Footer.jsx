import useReveal from '../hooks/useReveal'

const footerLinks = {
  Product: [
    { label: 'Chat App', href: 'https://chat.guffgpt.com/' },
    { label: 'Voice Chat', href: 'https://voice.guffgpt.com/' },
    { label: 'Features', href: '#features' },
    { label: 'Blog', href: '/blog' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export default function Footer() {
  const [ctaRef, ctaVisible] = useReveal(0.15)

  return (
    <footer className="w-full">
      {/* CTA Section */}
      <div className="border-t border-white/[0.08] bg-black/20 px-5 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-[680px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-3xl pointer-events-none" />
        <div
          ref={ctaRef}
          className="glass-panel rounded-[2rem] p-8 md:p-10 relative max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: 'translateY(' + (ctaVisible ? 0 : 24) + 'px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-100 tracking-tight leading-tight">
              Ready for a real guff?
            </h2>
            <p className="mt-3 text-[15px] text-neutral-500 max-w-md leading-relaxed">
              No sign-up walls. No limits. Just start chatting with Nepal's smartest AI.
            </p>
          </div>
          <a
            href="https://chat.guffgpt.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 bg-white hover:bg-slate-200 text-slate-950 text-[15px] font-semibold rounded-2xl transition-colors duration-200"
          >
            Launch GuffGPT
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Footer links */}
      <div className="border-t border-white/[0.08] px-5 py-12 md:py-16 bg-black/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 mb-2 md:mb-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                <span className="text-indigo-300 text-xs font-bold">G</span>
              </div>
              <span className="text-neutral-200 text-[15px] font-semibold">GuffGPT</span>
            </div>
            <p className="text-[13px] text-neutral-600 leading-[1.65] max-w-[220px]">
              Nepal's own AI chatbot. Built with love in Nepal, for Nepalis and everyone who loves the Nepali language.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[12px] font-semibold tracking-[0.15em] uppercase text-neutral-500 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-neutral-500 hover:text-neutral-300 transition-colors duration-200"
                      {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-800/30 px-5 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-neutral-600">
            {String.fromCodePoint(0xA9)} 2026 GuffGPT. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="/privacy" className="text-[13px] text-neutral-600 hover:text-neutral-400 transition-colors">Privacy</a>
            <a href="/terms" className="text-[13px] text-neutral-600 hover:text-neutral-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
