import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useReveal from '../hooks/useReveal'
import Footer from '../components/Footer'
import AdUnit from '../components/AdSense'

const defaultPosts = {
  'voice-chat': {
    title: 'Voice Chat is Here',
    date: 'Apr 10, 2026',
    tag: 'Product',
    color: '#c4b5fd',
    heroImage: 'https://images.unsplash.com/photo-1589254065878-42c014d33c7e?w=1400&h=700&fit=crop&q=80',
    intro: 'GuffGPT now supports real-time voice conversations in both Nepali and English. Just tap the mic and start talking.',
    sections: [
      {
        heading: 'Talk naturally, get instant answers.',
        body: 'Voice Chat brings a whole new way to interact with GuffGPT. Instead of typing, just speak. Ask questions in Nepali, switch to English mid-sentence, or mix both \u2014 GuffGPT understands it all. The voice engine processes your speech in real-time with under 500ms latency, so conversations feel natural and fluid.',
      },
      {
        heading: 'How it works',
        body: 'Tap the microphone icon in any chat. GuffGPT listens, transcribes your speech, generates a response, and reads it back to you \u2014 all in one smooth flow. You can interrupt at any time, ask follow-up questions, or switch to text whenever you prefer. Voice Chat works on desktop, mobile browsers, and our upcoming native apps.',
      },
      {
        heading: 'Built for Nepali speakers',
        body: 'Most voice AI tools struggle with Nepali. We trained our speech recognition on thousands of hours of Nepali audio \u2014 from formal Nepali to colloquial Kathmandu dialect, Terai accents, and code-mixed Nepali-English. Whether you say "machine learning bhaneko ke ho?" or speak pure Nepali, GuffGPT gets it right.',
      },
      {
        heading: 'Use cases',
        body: 'Students use Voice Chat for hands-free study sessions \u2014 ask GuffGPT to quiz them while cooking or commuting. Professionals dictate emails and get them polished instantly. Elders who find typing difficult can now access AI by simply speaking. Voice Chat makes GuffGPT truly accessible to everyone in Nepal.',
      },
      {
        heading: 'Privacy and control',
        body: 'Voice data is processed in real-time and never stored permanently. You can delete your voice history at any time from settings. Voice Chat can be disabled entirely if you prefer text-only interaction. We believe AI should empower you without compromising your privacy.',
      },
      {
        heading: "What's next",
        body: 'We are working on voice personas \u2014 choose different speaking styles for GuffGPT, from formal to friendly. Custom wake words and continuous listening mode are also on the roadmap. Voice Chat is just the beginning of making GuffGPT feel like a real conversation partner.',
      },
    ],
  },
  'faster-responses': {
    title: 'Faster Responses, Smarter Answers',
    date: 'Mar 22, 2026',
    tag: 'Update',
    color: '#818cf8',
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&h=700&fit=crop&q=80',
    intro: 'We upgraded our AI infrastructure from the ground up. GuffGPT now responds 3x faster with significantly more accurate answers.',
    sections: [
      {
        heading: 'Speed matters.',
        body: 'Every millisecond counts when you are in the flow. Our new inference engine reduces average response time from 2.4 seconds to under 800 milliseconds for most queries. Complex tasks like code generation and long-form writing are now 3x faster. You will notice the difference immediately.',
      },
      {
        heading: 'Smarter reasoning',
        body: 'Speed without accuracy is useless. Alongside the infrastructure upgrade, we fine-tuned our models on Nepali-language datasets, improving factual accuracy by 40%. GuffGPT now handles multi-step reasoning, math problems, and nuanced Nepali grammar questions with much higher reliability.',
      },
      {
        heading: 'New model architecture',
        body: 'Under the hood, we migrated to a mixture-of-experts architecture that routes each query to specialized sub-models. A math question goes to the math expert, a creative writing request goes to the language expert. This means better answers across every category without slowing down.',
      },
      {
        heading: 'Reduced errors',
        body: 'Hallucinations \u2014 when AI confidently says something wrong \u2014 have been reduced by 60% in our testing. GuffGPT now says "I am not sure" when it genuinely does not know, rather than making up answers. We believe honest AI is better AI.',
      },
      {
        heading: 'Infrastructure in South Asia',
        body: 'We deployed new inference servers closer to Nepal and South Asia, cutting network latency dramatically. Users in Kathmandu, Pokhara, Biratnagar, and across the region will experience noticeably snappier responses. We are committed to building infrastructure that serves our users, not just the West.',
      },
    ],
  },
  'image-understanding': {
    title: 'Image Understanding Launched',
    date: 'Feb 15, 2026',
    tag: 'Feature',
    color: '#f9a8d4',
    heroImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1400&h=700&fit=crop&q=80',
    intro: 'Upload any image and ask GuffGPT about it. From textbook pages to screenshots, receipts to memes \u2014 GuffGPT sees and understands.',
    sections: [
      {
        heading: 'Show, don\u2019t just tell.',
        body: 'Sometimes a picture really is worth a thousand words. Instead of trying to describe a math problem or a confusing error message, just take a photo and upload it to GuffGPT. It will analyze the image and respond in context \u2014 explaining, translating, or solving whatever you need.',
      },
      {
        heading: 'Perfect for students',
        body: 'Photograph a textbook page and ask GuffGPT to explain it in simple Nepali. Upload a diagram and get it broken down step by step. Take a picture of your handwritten notes and ask for a clean summary. Image Understanding turns GuffGPT into the study partner every student wishes they had.',
      },
      {
        heading: 'Document translation made easy',
        body: 'Got a document in English that you need summarized in Nepali? Or a Nepali government form you need help filling out? Upload a photo and GuffGPT will read the text, understand the context, and help you in whatever language you prefer. No more struggling with dense official documents.',
      },
      {
        heading: 'Technical capabilities',
        body: 'GuffGPT can read printed and handwritten text (OCR), identify objects and scenes, analyze charts and graphs, read code from screenshots, and understand memes and social media posts. The vision model processes images locally for privacy and returns results in under 2 seconds.',
      },
      {
        heading: 'How to use it',
        body: 'Click the image icon in the chat input, select or drag a photo, and type your question. You can upload multiple images in one conversation for comparison. Supported formats include JPG, PNG, WebP, and PDF. Maximum file size is 20MB per image.',
      },
    ],
  },
  'web-search': {
    title: 'Web Search Integration',
    date: 'Jan 28, 2026',
    tag: 'Product',
    color: '#6ee7b7',
    heroImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1400&h=700&fit=crop&q=80',
    intro: 'GuffGPT can now search the internet in real-time. Get live news, weather, sports scores, stock prices, and current information \u2014 all through chat.',
    sections: [
      {
        heading: 'AI that knows what\u2019s happening right now.',
        body: 'Traditional AI models only know what they were trained on. That means they cannot tell you today\u2019s weather, yesterday\u2019s cricket score, or the latest news from Nepal. Web Search changes that. When GuffGPT detects that your question needs current information, it automatically searches the web, reads the results, and gives you a synthesized answer with sources.',
      },
      {
        heading: 'How it works',
        body: 'Ask any question that requires up-to-date information. GuffGPT decides whether web search is needed, runs the query, reads multiple sources, cross-references the information, and presents a clean answer with links to original sources. You can also force a web search by starting your message with "Search:" for any query.',
      },
      {
        heading: 'Nepal-first search',
        body: 'We prioritized Nepali news sources, local websites, and Nepal-specific content in our search ranking. Ask about Nepal Rastra Bank interest rates, local election results, Dashain dates, or Kathmandu traffic updates \u2014 GuffGPT pulls from sources that actually cover Nepal, not just international outlets.',
      },
      {
        heading: 'Always cited',
        body: 'Every web-sourced answer includes clickable references so you can verify the information yourself. We believe AI should help you find truth, not replace your judgment. If sources conflict, GuffGPT will tell you and present both sides.',
      },
      {
        heading: 'Examples',
        body: '"Aaja Kathmandu ko mausam kasto cha?" \u2014 Gets live weather data.\n"Nepal cricket team ko latest score?" \u2014 Pulls live match data.\n"NEPSE index aaja kati cha?" \u2014 Shows current stock market data.\n"Dashain 2083 kati gate parcha?" \u2014 Searches and confirms the date.',
      },
    ],
  },
  '10k-users': {
    title: '10,000 Active Users',
    date: 'Dec 5, 2025',
    tag: 'Milestone',
    color: '#fbbf24',
    heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=700&fit=crop&q=80',
    intro: 'GuffGPT crossed 10,000 active users across Nepal. A milestone we never expected to hit this fast \u2014 and a responsibility we take seriously.',
    sections: [
      {
        heading: 'From zero to ten thousand.',
        body: 'When we launched GuffGPT in October 2025, we hoped a few hundred people might try it. Within two months, 10,000 people across Nepal were using GuffGPT every day. Students, professionals, content creators, curious minds \u2014 people from all 7 provinces found their way to Nepal\u2019s first AI chatbot.',
      },
      {
        heading: 'Who uses GuffGPT',
        body: '45% of our users are students aged 15-24, primarily using GuffGPT for homework help, exam prep, and learning. 30% are working professionals who use it for writing, translation, and research. 15% are content creators generating ideas, scripts, and social media posts. The remaining 10% are curious explorers who just enjoy having a smart conversation in Nepali.',
      },
      {
        heading: 'What we learned',
        body: 'The number one request from users: more Nepali language support. People do not just want an AI that understands Nepali \u2014 they want one that thinks in Nepali. That feedback shaped every update we have shipped since. We also learned that speed and reliability matter more than fancy features. People come back when GuffGPT is fast and dependable.',
      },
      {
        heading: 'Thank you, Nepal',
        body: 'This milestone belongs to our community. Every student who trusted GuffGPT with their exam prep, every professional who relied on it for a deadline, every person who told a friend about it \u2014 you built this. We are just the engineers behind the screen. Dhanyabad, Nepal.',
      },
      {
        heading: 'What\u2019s ahead',
        body: 'Ten thousand is just the beginning. Our goal is to make GuffGPT accessible to every Nepali speaker, everywhere. That means better Nepali language models, faster servers in South Asia, mobile apps, voice support, and offline capabilities for areas with limited internet. The journey is just getting started.',
      },
    ],
  },
  'goes-live': {
    title: 'GuffGPT Goes Live',
    date: 'Oct 1, 2025',
    tag: 'Launch',
    color: '#fb923c',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=700&fit=crop&q=80',
    intro: 'The first public release of Nepal\u2019s first AI chatbot. GuffGPT is live and ready to chat in Nepali and English.',
    sections: [
      {
        heading: 'Nepal deserves its own AI.',
        body: 'Every major AI chatbot is built for English speakers. When Nepali users try them, the experience is mediocre at best \u2014 broken translations, no cultural context, and zero understanding of local needs. GuffGPT was built from day one to change that. Today, we are making it available to everyone.',
      },
      {
        heading: 'What GuffGPT can do',
        body: 'Chat in Nepali, English, or both at once. Get homework help explained in simple Nepali. Draft emails and documents. Translate between languages. Answer questions about Nepal \u2014 from geography to government policies. Write creative content. Help with coding. And much more, all through a simple chat interface.',
      },
      {
        heading: 'Built by Nepali, for Nepal',
        body: 'GuffGPT is not a wrapper around another AI. We fine-tuned our models on Nepali text, Nepali conversations, and Nepali context. It knows the difference between Dashain and Tihar. It understands Kathmandu slang. It can explain things the way a Nepali teacher would. This is AI that actually understands us.',
      },
      {
        heading: 'Free to use',
        body: 'GuffGPT launches as a free service. We believe AI access should not depend on your income. While we will introduce premium features later for power users, the core chat experience will always remain free. Everyone in Nepal deserves access to AI that speaks their language.',
      },
      {
        heading: 'Try it now',
        body: 'Visit chat.guffgpt.com and start a conversation. No sign-up required for your first messages. Ask it anything \u2014 in Nepali, English, or a mix of both. We built this for you. Let us know what you think.',
      },
    ],
  },
}

export default function BlogPost() {
  const { slug } = useParams()
  const [heroRef, heroVisible] = useReveal(0.1)
  const [post, setPost] = useState(defaultPosts[slug] || null)

  useEffect(() => {
    fetch(`/api/blog/post/${slug}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(setPost)
      .catch(() => {})
  }, [slug])

  if (!post) {
    return (
      <>
        <main className="pt-[60px] min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">404</h1>
            <p className="text-neutral-500 mb-8">Post not found.</p>
            <Link to="/blog" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <main className="pt-[60px] overflow-hidden">
        {/* Hero image */}
        <div className="relative w-full h-[54vh] md:h-[60vh] overflow-hidden">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-[#08080c]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080c]/45 via-transparent to-[#08080c]/20" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08080c] to-transparent" />
          <div className="absolute -bottom-20 left-1/2 h-64 w-[720px] -translate-x-1/2 rounded-full blur-3xl" style={{ background: post.color + '22' }} />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-3xl mx-auto w-full">
            <Link
              to="/blog"
              className="chip-hover inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/25 px-3.5 py-2 text-[12px] font-medium text-slate-400 hover:text-white transition-colors mb-5 backdrop-blur-xl"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Blog
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border"
                style={{ color: post.color, background: post.color + '18' }}
              >
                {post.tag}
              </span>
              <span className="text-[12px] text-slate-400">{post.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-[-0.035em] leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Article content */}
        <article className="relative max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          <p
            ref={heroRef}
            className="relative glass-panel rounded-[1.75rem] p-6 text-[17px] md:text-lg text-slate-300 leading-relaxed mb-12"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: 'translateY(' + (heroVisible ? 0 : 16) + 'px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {post.intro}
          </p>

          <AdUnit slot={import.meta.env.VITE_GOOGLE_ADSENSE_ARTICLE_SLOT} />

          <div className="space-y-10">
            {post.sections.map((section, i) => (
              <Section key={i} section={section} color={post.color} />
            ))}
          </div>

          {/* Bottom nav */}
          <div className="glass-panel mt-16 rounded-[1.75rem] p-4 md:p-5 flex items-center justify-between gap-4">
            <Link
              to="/blog"
              className="chip-hover rounded-full px-3 py-2 text-[13px] font-medium text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              All updates
            </Link>
            <a
              href="https://chat.guffgpt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn rounded-full text-[13px] font-semibold px-5 py-2.5 transition-colors"
              style={{ color: post.color, borderColor: post.color + '30', border: '1px solid' }}
            >
              Try GuffGPT
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

function Section({ section }) {
  const [ref, visible] = useReveal(0.1)

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: 'translateY(' + (visible ? 0 : 14) + 'px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {section.heading && (
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">
          {section.heading}
        </h2>
      )}
      <p className="text-[15px] text-slate-400 leading-[1.8] whitespace-pre-line">
        {section.body}
      </p>
    </div>
  )
}
