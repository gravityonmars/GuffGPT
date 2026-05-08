import { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import useApiData from '../hooks/useApiData'

const defaultCases = [
  {
    slug: 'students',
    title: 'For Students',
    subtitle: 'From SEE prep to +2 exams',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&h=600&fit=crop&q=80',
    gradient: 'from-indigo-600/40 via-indigo-900/60 to-black/80',
    accent: '#818cf8',
  },
  {
    slug: 'professionals',
    title: 'For Professionals',
    subtitle: 'Work smarter, not harder',
    image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=900&h=600&fit=crop&q=80',
    gradient: 'from-violet-600/40 via-violet-900/60 to-black/80',
    accent: '#a78bfa',
  },
  {
    slug: 'everyday',
    title: 'For Everyday Life',
    subtitle: 'Your AI companion in Nepal',
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=900&h=600&fit=crop&q=80',
    gradient: 'from-purple-600/40 via-purple-900/60 to-black/80',
    accent: '#c084fc',
  },
  {
    slug: 'creators',
    title: 'For Content Creators',
    subtitle: 'Create content that connects',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=900&h=600&fit=crop&q=80',
    gradient: 'from-fuchsia-600/40 via-fuchsia-900/60 to-black/80',
    accent: '#e879f9',
  },
]

function CarouselCard({ c }) {
  return (
    <Link
      to={'/stories/' + c.slug}
      className="use-case-card group relative flex-shrink-0 w-[340px] sm:w-[420px] md:w-[500px] lg:w-[580px] h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden cursor-pointer block transition-opacity duration-300"
      style={{ '--card-accent': c.accent }}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={c.image}
          alt={c.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Gradient overlay */}
      <div className={'absolute inset-0 bg-gradient-to-t ' + c.gradient + ' opacity-75'} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col justify-end h-full p-7 md:p-9">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: c.accent }}>
          Story
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
          {c.title}
        </h3>
        <p className="text-[14px] text-neutral-300/80 mb-4">
          {c.subtitle}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium" style={{ color: c.accent }}>Read story</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" style={{ color: c.accent }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default function UseCases() {
  const cases = useApiData('stories', defaultCases)
  const [ref, visible] = useReveal(0.1)
  const scrollRef = useRef(null)
  const autoScrollRef = useRef(null)
  const pauseTimeoutRef = useRef(null)
  const isAutoScrollingRef = useRef(false)
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate cards for seamless infinite loop
  const loopedCases = cases

  // Auto-scroll logic
  const startAutoScroll = useCallback(() => {
    // Keep this section user-controlled; no automatic movement.
    isAutoScrollingRef.current = false
  }, [])

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current)
      autoScrollRef.current = null
    }
    isAutoScrollingRef.current = false
  }, [])

  // Keep the row static by default; users can scroll it manually.
  useEffect(() => {
    return () => stopAutoScroll()
  }, [stopAutoScroll])

  // Pause on hover or user interaction, resume after
  const pauseAndResume = useCallback((duration = 3000) => {
    stopAutoScroll()
    setIsPaused(true)
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
      startAutoScroll()
    }, duration)
  }, [startAutoScroll, stopAutoScroll])

  // Pause on hover
  const handleMouseEnter = () => {
    stopAutoScroll()
    setIsPaused(true)
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  // Pause on manual scroll (trackpad/touch), resume after idle
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let scrollTimer = null
    const onScroll = () => {
      // Ignore scroll events caused by auto-scroll itself
      if (isAutoScrollingRef.current) return
      if (!isPaused) {
        stopAutoScroll()
      }
      if (scrollTimer) clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        if (!isPaused) startAutoScroll()
      }, 2000)
    }
    // Use wheel for trackpad detection
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > 0) {
        pauseAndResume(2500)
      }
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('wheel', onWheel)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [isPaused, startAutoScroll, stopAutoScroll, pauseAndResume])

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
    }
  }, [])

  return (
    <section id="use-cases" className="relative w-full py-24 md:py-32 overflow-hidden">
      <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-white/[0.025] blur-3xl pointer-events-none" />
      <div className="relative max-w-[100vw]">
        {/* Header */}
        <div
          ref={ref}
          className="text-center mb-12 md:mb-16 px-5"
          style={{
            opacity: visible ? 1 : 0,
            transform: 'translateY(' + (visible ? 0 : 20) + 'px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <p className="inline-flex rounded-full border border-indigo-300/15 bg-indigo-300/[0.06] px-3 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-indigo-300/80 mb-4">Stories</p>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-neutral-100 tracking-tight leading-[1.1]">
            What can you do with GuffGPT?
          </h2>
          <p className="mt-4 text-[15.5px] text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Real people, real stories {String.fromCodePoint(0x2014)} discover how GuffGPT helps across Nepal.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto px-5 md:px-10 pb-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {loopedCases.map((c, i) => (
              <CarouselCard
                key={c.slug + '-' + i}
                c={c}
              />
            ))}
          </div>

          {/* Fade edges */}
          <div className="absolute top-0 left-0 bottom-4 w-16 md:w-28 bg-gradient-to-r from-[#09090f] to-transparent pointer-events-none z-20" />
          <div className="absolute top-0 right-0 bottom-4 w-16 md:w-28 bg-gradient-to-l from-[#09090f] to-transparent pointer-events-none z-20" />
        </div>
      </div>
    </section>
  )
}
