import { useState, useEffect, useRef } from 'react'
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
        className="max-w-4xl mx-auto flex items-center justify-center"
      >
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center">
            <div
              className="text-center px-8 md:px-14"
              style={{
                opacity: visible ? 1 : 0,
                transform: 'translateY(' + (visible ? 0 : 20) + 'px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: visible ? (i * 100) + 'ms' : '0ms',
              }}
            >
              <p className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} started={visible} />
              </p>
              <p className="mt-2 text-[13px] text-neutral-500 font-medium tracking-wide">
                {stat.label}
              </p>
            </div>
            {i < stats.length - 1 && (
              <div className="w-px h-12 bg-neutral-800/60 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
