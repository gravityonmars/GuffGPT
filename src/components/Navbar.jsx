import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Features', href: '/#features', isHash: true },
  { label: 'About', href: '/about', isHash: false },
  { label: 'Blog', href: '/blog', isHash: false },
  { label: 'Contact', href: '/contact', isHash: false },
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#18181b]/80 backdrop-blur-md border-b border-neutral-800/30">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[60px] px-5 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-md bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
            <span className="text-indigo-300 text-xs font-bold">G</span>
          </div>
          <span className="text-slate-200 text-[15px] font-semibold tracking-tight">GuffGPT</span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
            link.isHash ? (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link)}
                className="px-3 py-1.5 text-[14px] text-slate-400 hover:text-slate-100 rounded-md hover:bg-white/[0.04] transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className={'px-3 py-1.5 text-[14px] rounded-md transition-colors ' + (location.pathname === link.href ? 'text-slate-100 bg-white/[0.04]' : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]')}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a href="https://chat.guffgpt.com/" target="_blank" rel="noopener noreferrer" className="text-[14px] text-slate-400 hover:text-slate-100 transition-colors">
            Log in
          </a>
          <a
            href="https://chat.guffgpt.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] text-slate-200 bg-indigo-500/15 border border-indigo-500/20 hover:bg-indigo-500/25 px-4 py-[7px] rounded-lg transition-colors"
          >
            Try GuffGPT
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-md hover:bg-white/[0.04] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-[18px] h-[18px] text-neutral-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#18181b]/95 backdrop-blur-md border-t border-neutral-800/40 px-5 pb-5 pt-3">
          <div className="flex flex-col gap-0.5">
            {navLinks.map((link) =>
              link.isHash ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleNavClick(link)}
                  className="text-[15px] text-neutral-400 hover:text-neutral-100 py-2.5 px-2 rounded-md hover:bg-white/[0.04] transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={'text-[15px] py-2.5 px-2 rounded-md transition-colors ' + (location.pathname === link.href ? 'text-neutral-100 bg-white/[0.04]' : 'text-neutral-400 hover:text-neutral-100 hover:bg-white/[0.04]')}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-800/60 flex flex-col gap-2">
            <a href="https://chat.guffgpt.com/" target="_blank" rel="noopener noreferrer" className="text-[15px] text-neutral-400 hover:text-neutral-100 py-2 px-2 transition-colors">
              Log in
            </a>
            <a
              href="https://chat.guffgpt.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-center text-neutral-200 bg-neutral-700 hover:bg-neutral-600 px-4 py-2.5 rounded-lg transition-colors"
            >
              Try GuffGPT
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
