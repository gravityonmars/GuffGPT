import { useState, useEffect } from 'react'
import useReveal from '../hooks/useReveal'
import useApiData from '../hooks/useApiData'

const defaultStats = [
  { value: 100, suffix: '+', label: 'Active Users' },
  { value: 600, suffix: '+', label: 'Conversations' },
  { value: 1800, suffix: '+', label: 'Messages Exchanged' },
]

function AnimatedNumber({ target, suffix, started }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let frame
    const duration = 2000
    const start = performance.now()

    function tick(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, target])

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Stats() {
  const stats = useApiData('stats', defaultStats)
  const [ref, visible] = useReveal(0.2)

  return (
    <section className="w-full py-20 md:py-24 px-5">
      <div
        ref={ref}
        className="glass-panel relative max-w-5xl mx-auto overflow-hidden rounded-[2rem] p-4 md:p-5"
      >
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200/40 to-transparent" />
        <div className="absolute -left-20 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="lift-card rounded-[1.5rem] border border-white/[0.07] bg-white/[0.035] px-8 py-8 text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: 'translateY(' + (visible ? 0 : 20) + 'px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: visible ? (i * 100) + 'ms' : '0ms',
              }}
            >
              <p className="text-4xl md:text-5xl font-black text-white tracking-tight">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} started={visible} />
              </p>
              <p className="mt-2 text-[12px] text-slate-500 font-semibold tracking-[0.18em] uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
