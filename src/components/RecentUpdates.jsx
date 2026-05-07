import { useState } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import useApiData from '../hooks/useApiData'

const defaultUpdates = [
  {
    slug: 'voice-chat',
    date: 'Apr 10, 2026',
    tag: 'Product',
    title: 'Voice Chat is Here',
    desc: 'Talk to GuffGPT in real-time. Voice conversations in Nepali and English, powered by next-gen AI. Available on all devices.',
    color: '#c4b5fd',
    image: 'https://images.unsplash.com/photo-1589254065878-42c014d33c7e?w=900&h=600&fit=crop&q=80',
  },
  {
    slug: 'faster-responses',
    date: 'Mar 22, 2026',
    tag: 'Update',
    title: 'Faster Responses, Smarter Answers',
    desc: 'We upgraded our AI models. GuffGPT now responds 3x faster with more accurate and nuanced answers.',
    color: '#818cf8',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&q=80',
  },
  {
    slug: 'image-understanding',
    date: 'Feb 15, 2026',
    tag: 'Feature',
    title: 'Image Understanding Launched',
    desc: 'Upload any image and ask GuffGPT about it. Perfect for homework help and document translation.',
    color: '#f9a8d4',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=400&fit=crop&q=80',
  },
  {
    slug: 'web-search',
    date: 'Jan 28, 2026',
    tag: 'Product',
    title: 'Web Search Integration',
    desc: 'GuffGPT can now search the internet in real-time for live news, weather, and current information.',
    color: '#6ee7b7',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop&q=80',
  },
  {
    slug: '10k-users',
    date: 'Dec 5, 2025',
    tag: 'Milestone',
    title: '10,000 Active Users',
    desc: 'GuffGPT reached 10,000 active users across Nepal. Thank you to our amazing community.',
    color: '#fbbf24',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80',
  },
]

function SmallCard({ item, index, anyHovered, onHover, onLeave }) {
  return (
    <Link
      to={'/blog/' + item.slug}
      className="group relative overflow-hidden block transition-opacity duration-500"
      style={{ opacity: anyHovered !== null && anyHovered !== index ? 0.4 : 1 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      <div className="relative h-full min-h-[180px] md:min-h-[195px]">
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative z-10 flex flex-col justify-end h-full p-5">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5"
              style={{ color: item.color, background: item.color + '15' }}
            >
              {item.tag}
            </span>
            <span className="text-[11px] text-neutral-500">{item.date}</span>
          </div>
          <h3 className="text-[15px] font-semibold text-white leading-snug tracking-tight">
            {item.title}
          </h3>
        </div>
      </div>
    </Link>
  )
}

export default function RecentUpdates() {
  const updates = useApiData('blog/featured', defaultUpdates)
  const [ref, visible] = useReveal(0.1)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const latest = updates[0]
  const rest = updates.slice(1)

  return (
    <section className="w-full py-24 md:py-32 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className="mb-12 md:mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: 'translateY(' + (visible ? 0 : 20) + 'px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-indigo-400/70 mb-4">Updates</p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-neutral-100 tracking-tight leading-[1.1]">
              What's new
            </h2>
            <Link
              to="/blog"
              className="text-[13px] font-medium text-neutral-500 hover:text-neutral-300 transition-colors flex items-center gap-1.5 mb-1"
            >
              View all
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bento grid: 1 big + 4 small */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Big card — latest */}
          <Link
            to={'/blog/' + latest.slug}
            className="group relative overflow-hidden block transition-opacity duration-500"
            style={{ opacity: hoveredIndex !== null && hoveredIndex !== -1 ? 0.4 : 1 }}
            onMouseEnter={() => setHoveredIndex(-1)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative h-full min-h-[400px] lg:min-h-full">
              <img
                src={latest.image}
                alt={latest.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/5" />
              <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1"
                    style={{ color: latest.color, background: latest.color + '15' }}
                  >
                    {latest.tag}
                  </span>
                  <span className="text-[12px] text-neutral-400">{latest.date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-3">
                  {latest.title}
                </h3>
                <p className="text-[14px] text-neutral-300/70 leading-relaxed max-w-md mb-4">
                  {latest.desc}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium" style={{ color: latest.color }}>Read more</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" style={{ color: latest.color }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* 4 smaller cards — 2x2 grid */}
          <div className="grid grid-cols-2 gap-4">
            {rest.map((item, i) => (
              <SmallCard
                key={item.title}
                item={item}
                index={i}
                anyHovered={hoveredIndex}
                onHover={(idx) => setHoveredIndex(idx)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
