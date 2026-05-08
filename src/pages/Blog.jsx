import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import useApiData from '../hooks/useApiData'
import Footer from '../components/Footer'

const defaultPosts = [
  {
    slug: 'voice-chat',
    date: 'Apr 10, 2026',
    tag: 'Product',
    title: 'Voice Chat is Here',
    desc: 'Talk to GuffGPT in real-time. Voice conversations in Nepali and English, powered by next-gen AI. Available on all devices.',
    color: '#c4b5fd',
  },
  {
    slug: 'faster-responses',
    date: 'Mar 22, 2026',
    tag: 'Update',
    title: 'Faster Responses, Smarter Answers',
    desc: 'We upgraded our AI models. GuffGPT now responds 3x faster with more accurate and nuanced answers across all languages.',
    color: '#818cf8',
  },
  {
    slug: 'image-understanding',
    date: 'Feb 15, 2026',
    tag: 'Feature',
    title: 'Image Understanding Launched',
    desc: 'Upload any image and ask GuffGPT about it. Perfect for homework help, document translation, and analyzing screenshots.',
    color: '#f9a8d4',
  },
  {
    slug: 'web-search',
    date: 'Jan 28, 2026',
    tag: 'Product',
    title: 'Web Search Integration',
    desc: 'GuffGPT can now search the internet in real-time. Get live news, weather, sports scores, and current information.',
    color: '#6ee7b7',
  },
  {
    slug: '10k-users',
    date: 'Dec 5, 2025',
    tag: 'Milestone',
    title: '10,000 Active Users',
    desc: 'GuffGPT reached 10,000 active users across Nepal. Thank you to our amazing community for believing in this project.',
    color: '#fbbf24',
  },
  {
    slug: 'goes-live',
    date: 'Oct 1, 2025',
    tag: 'Launch',
    title: 'GuffGPT Goes Live',
    desc: 'The first public release of GuffGPT. Nepal\'s first AI chatbot that truly understands Nepali language and culture.',
    color: '#fb923c',
  },
]

export default function Blog() {
  const posts = useApiData('blog', defaultPosts)
  const [ref, visible] = useReveal(0.1)
  const [gridRef, gridVisible] = useReveal(0.05)

  return (
    <>
      <main className="pt-[60px]">
        {/* Hero */}
        <section className="px-5 pt-20 md:pt-28 pb-16 md:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 30%, rgba(99,102,241,0.16) 0%, transparent 70%)' }} />
          <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl pointer-events-none" />
          <div
            ref={ref}
            className="relative max-w-3xl mx-auto text-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: `translateY(${visible ? 0 : 24}px)`,
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <p className="inline-flex rounded-full border border-indigo-300/15 bg-indigo-400/10 px-4 py-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-indigo-300 mb-4">Blog</p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white tracking-[-0.04em] leading-[1.05]">
              News & Updates
            </h1>
            <p className="mt-5 text-[16px] text-slate-400 max-w-lg mx-auto leading-relaxed">
              The latest from GuffGPT {String.fromCodePoint(0x2014)} new features, milestones, and what we're building next.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section className="relative px-5 pb-24 md:pb-32">
          <div className="absolute right-0 top-12 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          <div ref={gridRef} className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <Link
                to={post.slug ? '/blog/' + post.slug : '/blog'}
                key={post.title}
                className="lift-card group rounded-[1.5rem] border border-white/[0.08] bg-white/[0.035] p-7 transition-all duration-500 hover:border-white/[0.14] hover:bg-white/[0.055] block backdrop-blur-xl"
                style={{
                  transitionDelay: gridVisible ? `${i * 80}ms` : '0ms',
                  opacity: gridVisible ? 1 : 0,
                  transform: `translateY(${gridVisible ? 0 : 24}px)`,
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border"
                    style={{ color: post.color, borderColor: post.color + '25', background: post.color + '08' }}
                  >
                    {post.tag}
                  </span>
                  <span className="text-[12px] text-slate-600">{post.date}</span>
                </div>
                <h3 className="text-[18px] font-semibold text-white mb-3 tracking-tight group-hover:text-indigo-100 transition-colors">
                  {post.title}
                </h3>
                <p className="text-[14px] text-slate-500 leading-[1.75]">{post.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
