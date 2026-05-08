import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useReveal from '../hooks/useReveal'
import Footer from '../components/Footer'

const defaultStories = {
  students: {
    title: 'For Students',
    subtitle: 'From SEE prep to +2 exams \u2014 GuffGPT helps Nepali students learn in their own language.',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&h=700&fit=crop&q=80',
    accent: '#818cf8',
    sections: [
      {
        type: 'text',
        heading: 'Studying shouldn\u2019t mean struggling with language.',
        body: 'For thousands of Nepali students preparing for SEE, SLC, and +2 level exams, the biggest barrier isn\u2019t the subject itself \u2014 it\u2019s finding resources that explain things clearly in their own language. Most AI tools respond in English. Textbooks are dense. Tuition classes are expensive. GuffGPT changes that equation.',
      },
      {
        type: 'text',
        body: 'Whether it\u2019s breaking down Newton\u2019s laws in simple Nepali, solving quadratic equations step by step, or helping draft an essay for English class, GuffGPT acts like a tutor who\u2019s available 24/7 \u2014 and actually speaks your language.',
      },
      {
        type: 'quote',
        text: 'Malai physics ekdam garo lagthyo. Tara GuffGPT le Nepali ma explain gardiyo ani sabai clear bhayo.',
        author: 'SEE Student, Kathmandu',
      },
      {
        type: 'chat',
        prompt: 'Newton ko third law lai simple Nepali ma explain garnus',
        response: 'Newton ko third law bhanchha: "Prati kriya ko barabar ra biparit pratikriya hunchha."\n\nSajilo bhasha ma: Jaba timi wall lai push garchau, wall le pani timilai utikai force le push garchha. Ball lai laat hanyo bhane, ball agadi janchha \u2014 tara timro khutta lai pani force lagchha.\n\nYo law le explain garchha kina rocket udchha \u2014 gas tala janchha, rocket mathi janchha!',
      },
      {
        type: 'text',
        heading: 'Upload your textbook, get instant help.',
        body: 'Students can photograph a textbook page and ask GuffGPT to explain it. Whether it\u2019s a chemistry diagram, a math problem set, or a passage in English literature \u2014 GuffGPT reads the image and breaks it down in the language you think in.',
      },
      {
        type: 'chat',
        prompt: '[Image: Biology textbook page on photosynthesis] Yo chapter lai Nepali ma summarize garnus',
        response: 'Photosynthesis bhaneko biruwa le sunlight, pani, ra CO2 bata food (glucose) banaune process ho.\n\nFormula: 6CO\u2082 + 6H\u2082O + Light \u2192 C\u2086H\u2081\u2082O\u2086 + 6O\u2082\n\nKey points:\n\u2022 Chlorophyll le sunlight absorb garchha\n\u2022 Stomata bata CO2 bhitra aunchha\n\u2022 Glucose energy ko lagi use hunchha\n\u2022 Oxygen release hunchha \u2014 yo nai hami sas ferne hawa ho!',
      },
      {
        type: 'text',
        heading: 'Exam prep that actually works.',
        body: 'Ask GuffGPT to quiz you on any subject. It generates practice questions, checks your answers, and explains where you went wrong \u2014 all in Nepali or English, your choice. No more memorizing without understanding.',
      },
    ],
  },
  professionals: {
    title: 'For Professionals',
    subtitle: 'Draft, translate, research, and code \u2014 GuffGPT helps you work faster.',
    heroImage: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1400&h=700&fit=crop&q=80',
    accent: '#a78bfa',
    sections: [
      {
        type: 'text',
        heading: 'Work moves faster when AI speaks your language.',
        body: 'Professionals across Nepal use GuffGPT to handle daily tasks that used to eat hours. Drafting emails in English, translating documents from Nepali, researching market data, summarizing long reports \u2014 all through a simple chat interface.',
      },
      {
        type: 'quote',
        text: 'I used to spend 30 minutes drafting a single English email. Now I tell GuffGPT what I want to say in Nepali, and it writes a perfect professional email in seconds.',
        author: 'Marketing Manager, Lalitpur',
      },
      {
        type: 'chat',
        prompt: 'Write a professional email declining a meeting invitation politely',
        response: 'Subject: Re: Meeting Request \u2014 March 15\n\nDear Mr. Sharma,\n\nThank you for the meeting invitation for March 15. Unfortunately, I have a prior commitment that day and won\u2019t be able to attend.\n\nI\u2019d be happy to review any notes or materials afterward, or we could schedule a brief call at a time that works for both of us.\n\nThank you for understanding.\n\nBest regards,\n[Your Name]',
      },
      {
        type: 'text',
        heading: 'Research without the rabbit hole.',
        body: 'Instead of spending hours searching Google, ask GuffGPT to research a topic and summarize findings. Need competitive analysis? Market trends? Technical documentation explained simply? GuffGPT delivers concise, actionable answers \u2014 with real-time web search when you need the latest data.',
      },
      {
        type: 'chat',
        prompt: 'Nepal ko IT industry ko current trend k cha? Key points ma batauna',
        response: 'Nepal IT Industry Trends (2026):\n\n\u2022 Remote work boom: 40%+ IT professionals now work for international clients\n\u2022 Fintech growth: Digital wallets (eSewa, Khalti) driving tech adoption\n\u2022 AI adoption: Companies integrating AI tools for productivity\n\u2022 Outsourcing hub: Nepal emerging as affordable dev talent source\n\u2022 Government push: Digital Nepal Framework accelerating tech infrastructure\n\u2022 Startup ecosystem: 200+ active tech startups, growing VC interest\n\nKey challenge: Brain drain to Gulf countries and Western nations.',
      },
      {
        type: 'text',
        body: 'From code generation to contract drafting, GuffGPT handles the heavy lifting so professionals can focus on decisions that matter.',
      },
    ],
  },
  everyday: {
    title: 'For Everyday Life',
    subtitle: 'Weather, recipes, translations, or just a good conversation \u2014 in your language.',
    heroImage: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1400&h=700&fit=crop&q=80',
    accent: '#c084fc',
    sections: [
      {
        type: 'text',
        heading: 'AI that fits into your daily life.',
        body: 'GuffGPT isn\u2019t just for work or studies. It\u2019s for the moments in between \u2014 when you want to know today\u2019s weather in Pokhara, need a quick recipe, want to translate a government document, or just feel like having a conversation in Nepali.',
      },
      {
        type: 'chat',
        prompt: 'Aaja Kathmandu ko mausam kasto cha?',
        response: 'Aaja Kathmandu ma:\n\n\u2022 Temperature: 24\u00B0C (dinma), 12\u00B0C (ratma)\n\u2022 Mausam: Aaanshik badali, paani parne sambhawana chhaina\n\u2022 Humidity: 45%\n\u2022 Hawa: 10 km/h paschim bata\n\nBaira ghumnako lagi ramro din! Thamel side jaane plan cha bhane light jacket linu \u2014 beluka chiso hunchha.',
      },
      {
        type: 'quote',
        text: 'Mero ama lai English aaudaina. Tara GuffGPT sanga Nepali ma kura garna sakchhin. Usle recipe, health tips, sabai Nepali ma dinthyo.',
        author: 'Software Developer, Bhaktapur',
      },
      {
        type: 'chat',
        prompt: 'Dal bhat tarkari banaune recipe dinus, 4 jana ko lagi',
        response: 'Dal Bhat Tarkari (4 jana ko lagi):\n\nDAL:\n\u2022 1 cup masoor dal, dhoyera 20 min pakaaune\n\u2022 Haldi, noon, jimbu, lasun, golbheda ko chhounk\n\nBHAT:\n\u2022 2 cup chamal, 3.5 cup paani\n\u2022 Medium heat ma 15-18 min pakaaune\n\nTARKARI (Aloo Gobi):\n\u2022 3 ota aloo + 1 gobi, sano sano kaatne\n\u2022 Tel ma jeera, methi dana, haldi, besaar halera bhutne\n\u2022 Noon, kukhura masala, dhaniya powder\n\u2022 15 min pakaaune\n\nACHAAR:\n\u2022 2 ota golbheda + khursani + lasun miksera ma pisne\n\u2022 Noon ra nuni tel halera mix\n\nKhana taiyar! Mitho banaune rahasya: dal ma ghiu halnus!',
      },
      {
        type: 'text',
        heading: 'Translate anything, understand everything.',
        body: 'Government forms, medical prescriptions, official letters \u2014 GuffGPT translates between Nepali and English instantly, with context that Google Translate misses. It understands formal Nepali, colloquial speech, and even Romanized Nepali.',
      },
    ],
  },
  creators: {
    title: 'For Content Creators',
    subtitle: 'Write, script, caption, and create \u2014 in Nepali, English, or both.',
    heroImage: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1400&h=700&fit=crop&q=80',
    accent: '#e879f9',
    sections: [
      {
        type: 'text',
        heading: 'Content creation in your mother tongue.',
        body: 'Nepali content creators face a unique challenge: most AI tools generate content in English, but their audience speaks Nepali. GuffGPT bridges that gap \u2014 generating blog posts, social media captions, video scripts, and even poetry in natural Nepali that doesn\u2019t sound translated.',
      },
      {
        type: 'chat',
        prompt: 'Nepal travel vlog ko lagi YouTube video script lekhnus. Topic: Pokhara trip',
        response: 'POKHARA TRAVEL VLOG SCRIPT\n\nINTRO (Hook):\n"Namaste dost haru! Aaja hami Pokhara ma chhau \u2014 Nepal ko sabse ramro city. Phewa Tal dekhi Sarangkot samma, aaunu hai hamro sanga!"\n\nSECTION 1: Lakeside\n"Phewa Tal ko chheuma basera yo view hernus... Machapuchre ekdam clear dekhiracha aaja. Yaha boat ride Rs 500 ma paaincha."\n\nSECTION 2: Food Tour\n"Lakeside ma momos khana aayau. Yo thakali set Rs 350 \u2014 dal, bhat, gundruk, timur ko achar... Mitho cha ki chhaina bhannus!"\n\nSECTION 3: Sarangkot Sunrise\n"Bihana 4:30 ma uthera Sarangkot pugiyau... Ra yo hernus \u2014 sunrise with Himalaya range. Yo view ko lagi Nepal aaunu parchha!"\n\nOUTRO:\n"Pokhara aaye pachhi subscribe garna nabirsinu hai! Next video: Mustang trip!"',
      },
      {
        type: 'quote',
        text: 'GuffGPT le mero content game nai change garidiyo. Nepali captions lekhdaina bhanera tension hanthyo, aba 2 minute ma ready hunchha.',
        author: 'Travel Vlogger, Pokhara',
      },
      {
        type: 'text',
        heading: 'From idea to published \u2014 in minutes.',
        body: 'Need Instagram captions in Nepali? Blog posts about Nepali culture? Twitter threads about tech in Nepal? GuffGPT matches your tone and style, whether you want casual conversational Nepali or formal literary Nepali. It even generates hashtags and SEO-optimized titles.',
      },
      {
        type: 'chat',
        prompt: 'Instagram caption lekha Nepali ma, Himalaya ko photo ko lagi. Engaging ra hashtags sahit',
        response: '\u2728 Himal herda mann shanta hunchha, sansaar birsindochha.\n\nKahile kahi, phone rakhera, yo drishya lai aafnai aankha le hernuparchha. Nepal ma janmiyeko hami kati bhagyamani!\n\nYo hamro dharohar ho. Yo hamro gaurab ho. \u{1F1F3}\u{1F1F5}\n\n#Nepal #Himalayas #MountEverest #NepalTravel #ExploreNepal #NepaliPride #Mountains #SagarmathaZone #VisitNepal2026 #NatureLovers',
      },
    ],
  },
}

function ChatDemo({ prompt, response, accent }) {
  return (
    <div className="glass-panel overflow-hidden rounded-[1.5rem] my-8">
      <div className="px-6 py-4 border-b border-white/[0.08] bg-white/[0.025]">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-6 h-6 rounded-full bg-white/[0.08] flex items-center justify-center">
            <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
            </svg>
          </div>
          <span className="text-[12px] text-slate-500 font-medium">You</span>
        </div>
        <p className="text-[14px] text-slate-300 leading-relaxed pl-[34px]">{prompt}</p>
      </div>
      <div className="px-6 py-5">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: accent + '18' }}>
            <span className="text-[10px] font-bold" style={{ color: accent }}>G</span>
          </div>
          <span className="text-[12px] text-slate-500 font-medium">GuffGPT</span>
        </div>
        <p className="text-[14px] text-slate-400 leading-[1.75] pl-[34px] whitespace-pre-line">{response}</p>
      </div>
    </div>
  )
}

export default function StoryPage() {
  const { slug } = useParams()
  const [story, setStory] = useState(defaultStories[slug] || null)
  const [heroRef, heroVisible] = useReveal(0.05)
  const [contentRef, contentVisible] = useReveal(0.05)

  useEffect(() => {
    fetch(`/api/stories/detail/${slug}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(setStory)
      .catch(() => {})
  }, [slug])

  if (!story) {
    return (
      <div className="pt-[60px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Story not found</h1>
          <Link to="/" className="text-indigo-400 hover:text-indigo-300 text-[14px]">Back to home</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <main className="pt-[60px] overflow-hidden">
        {/* Hero image */}
        <div
          ref={heroRef}
          className="relative w-full h-[54vh] md:h-[64vh] overflow-hidden"
          style={{
            opacity: heroVisible ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        >
          <img
            src={story.heroImage}
            alt={story.title}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-[#08080c]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080c]/55 via-transparent to-[#08080c]/20" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08080c] to-transparent" />
          <div className="absolute -bottom-20 left-1/2 h-64 w-[720px] -translate-x-1/2 rounded-full blur-3xl" style={{ background: story.accent + '22' }} />

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-10 md:pb-14">
            <div className="max-w-3xl mx-auto">
              <Link
                to="/#use-cases"
                className="chip-hover inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-black/25 px-3.5 py-2 text-[13px] font-medium mb-4 hover:gap-2.5 transition-all backdrop-blur-xl"
                style={{ color: story.accent }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to stories
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.035em] leading-[1.05]">
                {story.title}
              </h1>
              <p className="mt-5 text-[16px] md:text-[18px] text-slate-300/85 max-w-xl leading-relaxed">
                {story.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="relative px-5 py-16 md:py-20"
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: `translateY(${contentVisible ? 0 : 20}px)`,
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto">
            {story.sections.map((section, i) => {
              if (section.type === 'text') return (
                <div key={i} className="mb-10">
                  {section.heading && (
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 leading-[1.2]">
                      {section.heading}
                    </h2>
                  )}
                  <p className="text-[16px] text-slate-400 leading-[1.85]">{section.body}</p>
                </div>
              )
              if (section.type === 'quote') return (
                <blockquote key={i} className="glass-panel my-10 md:my-14 rounded-[1.5rem] border-l-2 px-6 py-6" style={{ borderColor: story.accent + '55' }}>
                  <p className="text-[18px] md:text-[20px] text-slate-100 leading-[1.7] italic font-light">
                    "{section.text}"
                  </p>
                  <cite className="block mt-3 text-[14px] not-italic font-medium" style={{ color: story.accent }}>
                    {section.author}
                  </cite>
                </blockquote>
              )
              if (section.type === 'chat') return (
                <ChatDemo key={i} prompt={section.prompt} response={section.response} accent={story.accent} />
              )
              return null
            })}

            {/* CTA */}
            <div className="glass-panel mt-16 rounded-[2rem] p-8 md:p-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                Ready to try it yourself?
              </h3>
              <p className="text-[15px] text-slate-500 mb-8 max-w-md mx-auto">
                Start chatting with GuffGPT for free. No downloads, no sign-up walls.
              </p>
              <a
                href="https://chat.guffgpt.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn inline-flex items-center gap-2.5 px-7 py-3.5 text-white text-[15px] font-semibold rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: story.accent, boxShadow: '0 8px 30px -8px ' + story.accent + '40' }}
              >
                Launch GuffGPT
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
