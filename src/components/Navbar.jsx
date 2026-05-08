import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Features', href: '/#features', isHash: true },
  { label: 'About', href: '/about', isHash: false },
  { label: 'Blog', href: '/blog', isHash: false },
  { label: 'Contact', href: '/contact', isHash: false },
  { label: 'Privacy', href: '/privacy', isHash: false },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const handleNavClick = (link) => {
    setMobileOpen(false)
    if (link.isHash && location.pathname === '/') {
      const el = document.querySelector(link.href.replace('/', ''))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navClass = (href) => (
    'relative px-3.5 py-2 text-[14px] rounded-full transition-all duration-300 ' +
    (location.pathname === href
      ? 'text-white bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
      : 'text-slate-400 hover:text-white hover:bg-white/[0.06]')
  )

  return (
    <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[68px] px-5 md:px-8">
        <Link to="/" className="group flex items-center gap-2.5 shrink-0" onClick={() => setMobileOpen(false)}>
          <div className="relative w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center transition-colors duration-200 group-hover:bg-white/[0.09]">
            <span className="relative text-slate-100 text-sm font-black tracking-tight">G</span>
          </div>
          <div className="leading-none">
            <span className="block text-slate-100 text-[15px] font-bold tracking-tight">GuffGPT</span>
            <span className="hidden sm:block text-[10px] tracking-[0.18em] uppercase text-slate-500 mt-1">Nepal AI</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.035] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          {navLinks.map((link) =>
            link.isHash ? (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link)}
                className="px-3.5 py-2 text-[14px] text-slate-400 hover:text-white rounded-full hover:bg-white/[0.06] transition-all duration-300"
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.href} className={navClass(link.href)}>
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a href="https://chat.guffgpt.com/" target="_blank" rel="noopener noreferrer" className="text-[14px] text-slate-400 hover:text-white transition-colors">
            Log in
          </a>
          <a
            href="https://chat.guffgpt.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn inline-flex items-center gap-2 text-[14px] text-slate-950 bg-white hover:bg-slate-200 px-4 py-2.5 rounded-full transition-all duration-200"
          >
            Try GuffGPT
            <svg className="relative w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="w-[18px] h-[18px] text-slate-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu-pop md:hidden px-4 pb-4">
          <div className="rounded-3xl border border-white/[0.08] bg-[#0d0d15]/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) =>
                link.isHash ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => handleNavClick(link)}
                    className="text-[15px] text-slate-400 hover:text-white py-3 px-3 rounded-2xl hover:bg-white/[0.06] transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={'text-[15px] py-3 px-3 rounded-2xl transition-colors ' + (location.pathname === link.href ? 'text-white bg-white/[0.08]' : 'text-slate-400 hover:text-white hover:bg-white/[0.06]')}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
            <div className="mt-3 pt-3 border-t border-white/[0.08] grid grid-cols-2 gap-2">
              <a href="https://chat.guffgpt.com/" target="_blank" rel="noopener noreferrer" className="text-[14px] text-center text-slate-300 hover:text-white py-3 rounded-2xl bg-white/[0.04] transition-colors">
                Log in
              </a>
              <a
                href="https://chat.guffgpt.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn text-[14px] text-center text-slate-950 bg-white hover:bg-slate-200 px-4 py-3 rounded-2xl transition-colors duration-200"
              >
                Try GuffGPT
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
