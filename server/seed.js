import db from './db.js'
import bcrypt from 'bcryptjs'

// Only seed if database is empty
const featureCount = db.prepare('SELECT COUNT(*) as c FROM features').get().c
if (featureCount > 0) {
  console.log('Database already seeded. Skipping.')
  process.exit(0)
}

console.log('Seeding database...')

// --- Admin user ---
const hash = bcrypt.hashSync('GuffGPT@admin', 10)
db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run('admin', hash)

// --- Features ---
const insertFeature = db.prepare(
  'INSERT INTO features (sort_order, emoji, title, subtitle, "desc", color, prompt, response, tag) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
)
const featuresData = [
  [0, String.fromCodePoint(0x1F1F3, 0x1F1F5), 'Nepali + English', 'Your language, your way.', 'Chat in pure Nepali, English, or Romanized Nepali. GuffGPT understands "k cha bhai" just as well as formal queries. Mix languages freely in the same conversation.', '#818cf8', 'Malai Nepal ko bare ma batauna sakchau?', 'Nepal Himalayan range ma parcha. Yo desh ko rajdhani Kathmandu ho. Nepal ma 125 bhanda badi jatiharu ra 123 bhasha bolinchan. Sagarmatha (Mount Everest) yahi desh ma cha!', 'Nepali + English'],
  [1, String.fromCodePoint(0x1F50D), 'Web Search', 'Real-time answers.', 'Need live info? GuffGPT searches the web in real-time for news, prices, scores, and anything that needs fresh data. Always up to date.', '#6ee7b7', "What's the weather in Kathmandu today?", "Currently in Kathmandu: 24\u00B0C, partly cloudy. Humidity 45%. Wind 12 km/h from the west. No rain expected today \u2014 perfect weather for a stroll around Thamel!", 'Live Search'],
  [2, String.fromCodePoint(0x1F5BC, 0xFE0F), 'Image Understanding', 'See and understand.', 'Upload photos and ask questions about them. Homework, documents, screenshots \u2014 GuffGPT sees and understands it all. Perfect for students.', '#f9a8d4', '[Image: Math homework page] Solve question 3', "Question 3 asks to find the derivative of f(x) = 3x\u00B2 + 2x - 5.\n\nUsing the power rule:\nf'(x) = 6x + 2\n\nThe answer is f'(x) = 6x + 2", 'Vision AI'],
  [3, String.fromCodePoint(0x1F399, 0xFE0F), 'Voice Chat', "Talk, don't type.", 'Real-time voice conversations powered by AI. Speak naturally in Nepali or English. GuffGPT listens, thinks, and replies \u2014 like talking to a smart friend.', '#c4b5fd', '\u{1F3A4} "Hey GuffGPT, tell me a fun fact about Nepal"', '"Did you know Nepal is the only country in the world whose flag isn\'t rectangular? It\'s made of two overlapping triangles, representing the Himalayan mountains and the two major religions!"', 'Voice AI'],
  [4, String.fromCodePoint(0x1F512), 'Privacy First', 'Your data, your control.', 'Chat history stays private. Sign in with Google for seamless access. No data sold, ever. Delete your account and all data anytime from settings.', '#fbbf24', 'Is my conversation data safe?', 'Absolutely! Your conversations are encrypted and stored securely. Only you can access them. We never sell your data to third parties. You can delete all your data anytime from Settings > Privacy.', 'Secure'],
  [5, String.fromCodePoint(0x26A1), 'Lightning Fast', 'Speed meets intelligence.', 'Powered by cutting-edge AI models. Get responses in seconds, not minutes. Built on Azure for 99.9% uptime. Always available when you need it.', '#fb923c', 'Explain quantum computing in 3 sentences', 'Regular computers use bits (0 or 1). Quantum computers use qubits that can be both simultaneously through superposition. This lets them solve certain problems exponentially faster than classical computers.', 'Fast'],
]
featuresData.forEach(f => insertFeature.run(...f))

// --- Stats ---
const insertStat = db.prepare('INSERT INTO stats (sort_order, value, suffix, label) VALUES (?, ?, ?, ?)')
;[
  [0, 100, '+', 'Active Users'],
  [1, 600, '+', 'Conversations'],
  [2, 1800, '+', 'Messages Exchanged'],
].forEach(s => insertStat.run(...s))

// --- FAQ ---
const insertFaq = db.prepare('INSERT INTO faqs (sort_order, q, a) VALUES (?, ?, ?)')
;[
  [0, 'Is GuffGPT free to use?', 'Yes! GuffGPT is completely free. Visit chat.guffgpt.com, sign in with your Google account, and start chatting. No hidden charges or premium tiers.'],
  [1, 'What languages does GuffGPT support?', 'GuffGPT supports Nepali (\u0926\u0947\u0935\u0928\u093E\u0917\u0930\u0940), Romanized Nepali (like "k cha bro"), and English. You can freely mix languages in the same conversation.'],
  [2, 'Can I use GuffGPT on my phone?', 'Absolutely! GuffGPT works on any device with a web browser \u2014 phones, tablets, laptops, and desktops. No app installation needed.'],
  [3, 'How is GuffGPT different from ChatGPT?', 'GuffGPT is specifically designed for Nepali users. It understands Nepali language and culture natively, includes real-time web search, supports image uploads, and has a voice chat feature. Plus, it has a fun personality that feels like chatting with a Nepali friend.'],
  [4, 'Is my data safe?', "Yes. Your conversations are stored securely and only accessible to you. We don\u2019t sell data to third parties. You can delete your account and all data anytime from chat settings."],
  [5, 'Can GuffGPT help with studies?', 'Yes! Many students use GuffGPT for homework help, exam prep, essays, and understanding difficult concepts. Upload photos of textbook pages and ask GuffGPT to explain them.'],
  [6, 'Who built GuffGPT?', 'GuffGPT was built by Dikshant Pandey, a developer from Nepal. The goal is to make AI accessible to all Nepalis.'],
].forEach(f => insertFaq.run(...f))

// --- Blog Posts ---
const insertPost = db.prepare(
  'INSERT INTO blog_posts (sort_order, slug, date, tag, title, "desc", color, image, heroImage, intro, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
)
const insertBlogSection = db.prepare(
  'INSERT INTO blog_sections (post_id, sort_order, heading, body) VALUES (?, ?, ?, ?)'
)

const blogData = [
  {
    sort_order: 0, slug: 'voice-chat', date: 'Apr 10, 2026', tag: 'Product',
    title: 'Voice Chat is Here',
    desc: 'Talk to GuffGPT in real-time. Voice conversations in Nepali and English, powered by next-gen AI. Available on all devices.',
    color: '#c4b5fd',
    image: 'https://images.unsplash.com/photo-1589254065878-42c014d33c7e?w=900&h=600&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1589254065878-42c014d33c7e?w=1400&h=700&fit=crop&q=80',
    intro: 'GuffGPT now supports real-time voice conversations in both Nepali and English. Just tap the mic and start talking.',
    featured: 1,
    sections: [
      { heading: 'Talk naturally, get instant answers.', body: 'Voice Chat brings a whole new way to interact with GuffGPT. Instead of typing, just speak. Ask questions in Nepali, switch to English mid-sentence, or mix both \u2014 GuffGPT understands it all. The voice engine processes your speech in real-time with under 500ms latency, so conversations feel natural and fluid.' },
      { heading: 'How it works', body: 'Tap the microphone icon in any chat. GuffGPT listens, transcribes your speech, generates a response, and reads it back to you \u2014 all in one smooth flow. You can interrupt at any time, ask follow-up questions, or switch to text whenever you prefer. Voice Chat works on desktop, mobile browsers, and our upcoming native apps.' },
      { heading: 'Built for Nepali speakers', body: 'Most voice AI tools struggle with Nepali. We trained our speech recognition on thousands of hours of Nepali audio \u2014 from formal Nepali to colloquial Kathmandu dialect, Terai accents, and code-mixed Nepali-English. Whether you say "machine learning bhaneko ke ho?" or speak pure Nepali, GuffGPT gets it right.' },
      { heading: 'Use cases', body: 'Students use Voice Chat for hands-free study sessions \u2014 ask GuffGPT to quiz them while cooking or commuting. Professionals dictate emails and get them polished instantly. Elders who find typing difficult can now access AI by simply speaking. Voice Chat makes GuffGPT truly accessible to everyone in Nepal.' },
      { heading: 'Privacy and control', body: 'Voice data is processed in real-time and never stored permanently. You can delete your voice history at any time from settings. Voice Chat can be disabled entirely if you prefer text-only interaction. We believe AI should empower you without compromising your privacy.' },
      { heading: "What's next", body: 'We are working on voice personas \u2014 choose different speaking styles for GuffGPT, from formal to friendly. Custom wake words and continuous listening mode are also on the roadmap. Voice Chat is just the beginning of making GuffGPT feel like a real conversation partner.' },
    ],
  },
  {
    sort_order: 1, slug: 'faster-responses', date: 'Mar 22, 2026', tag: 'Update',
    title: 'Faster Responses, Smarter Answers',
    desc: 'We upgraded our AI models. GuffGPT now responds 3x faster with more accurate and nuanced answers.',
    color: '#818cf8',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&h=700&fit=crop&q=80',
    intro: 'We upgraded our AI infrastructure from the ground up. GuffGPT now responds 3x faster with significantly more accurate answers.',
    featured: 1,
    sections: [
      { heading: 'Speed matters.', body: 'Every millisecond counts when you are in the flow. Our new inference engine reduces average response time from 2.4 seconds to under 800 milliseconds for most queries. Complex tasks like code generation and long-form writing are now 3x faster. You will notice the difference immediately.' },
      { heading: 'Smarter reasoning', body: 'Speed without accuracy is useless. Alongside the infrastructure upgrade, we fine-tuned our models on Nepali-language datasets, improving factual accuracy by 40%. GuffGPT now handles multi-step reasoning, math problems, and nuanced Nepali grammar questions with much higher reliability.' },
      { heading: 'New model architecture', body: 'Under the hood, we migrated to a mixture-of-experts architecture that routes each query to specialized sub-models. A math question goes to the math expert, a creative writing request goes to the language expert. This means better answers across every category without slowing down.' },
      { heading: 'Reduced errors', body: 'Hallucinations \u2014 when AI confidently says something wrong \u2014 have been reduced by 60% in our testing. GuffGPT now says "I am not sure" when it genuinely does not know, rather than making up answers. We believe honest AI is better AI.' },
      { heading: 'Infrastructure in South Asia', body: 'We deployed new inference servers closer to Nepal and South Asia, cutting network latency dramatically. Users in Kathmandu, Pokhara, Biratnagar, and across the region will experience noticeably snappier responses. We are committed to building infrastructure that serves our users, not just the West.' },
    ],
  },
  {
    sort_order: 2, slug: 'image-understanding', date: 'Feb 15, 2026', tag: 'Feature',
    title: 'Image Understanding Launched',
    desc: 'Upload any image and ask GuffGPT about it. Perfect for homework help and document translation.',
    color: '#f9a8d4',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=400&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1400&h=700&fit=crop&q=80',
    intro: 'Upload any image and ask GuffGPT about it. From textbook pages to screenshots, receipts to memes \u2014 GuffGPT sees and understands.',
    featured: 1,
    sections: [
      { heading: 'Show, don\u2019t just tell.', body: 'Sometimes a picture really is worth a thousand words. Instead of trying to describe a math problem or a confusing error message, just take a photo and upload it to GuffGPT. It will analyze the image and respond in context \u2014 explaining, translating, or solving whatever you need.' },
      { heading: 'Perfect for students', body: 'Photograph a textbook page and ask GuffGPT to explain it in simple Nepali. Upload a diagram and get it broken down step by step. Take a picture of your handwritten notes and ask for a clean summary. Image Understanding turns GuffGPT into the study partner every student wishes they had.' },
      { heading: 'Document translation made easy', body: 'Got a document in English that you need summarized in Nepali? Or a Nepali government form you need help filling out? Upload a photo and GuffGPT will read the text, understand the context, and help you in whatever language you prefer. No more struggling with dense official documents.' },
      { heading: 'Technical capabilities', body: 'GuffGPT can read printed and handwritten text (OCR), identify objects and scenes, analyze charts and graphs, read code from screenshots, and understand memes and social media posts. The vision model processes images locally for privacy and returns results in under 2 seconds.' },
      { heading: 'How to use it', body: 'Click the image icon in the chat input, select or drag a photo, and type your question. You can upload multiple images in one conversation for comparison. Supported formats include JPG, PNG, WebP, and PDF. Maximum file size is 20MB per image.' },
    ],
  },
  {
    sort_order: 3, slug: 'web-search', date: 'Jan 28, 2026', tag: 'Product',
    title: 'Web Search Integration',
    desc: 'GuffGPT can now search the internet in real-time for live news, weather, and current information.',
    color: '#6ee7b7',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1400&h=700&fit=crop&q=80',
    intro: 'GuffGPT can now search the internet in real-time. Get live news, weather, sports scores, stock prices, and current information \u2014 all through chat.',
    featured: 1,
    sections: [
      { heading: 'AI that knows what\u2019s happening right now.', body: 'Traditional AI models only know what they were trained on. That means they cannot tell you today\u2019s weather, yesterday\u2019s cricket score, or the latest news from Nepal. Web Search changes that. When GuffGPT detects that your question needs current information, it automatically searches the web, reads the results, and gives you a synthesized answer with sources.' },
      { heading: 'How it works', body: 'Ask any question that requires up-to-date information. GuffGPT decides whether web search is needed, runs the query, reads multiple sources, cross-references the information, and presents a clean answer with links to original sources. You can also force a web search by starting your message with "Search:" for any query.' },
      { heading: 'Nepal-first search', body: 'We prioritized Nepali news sources, local websites, and Nepal-specific content in our search ranking. Ask about Nepal Rastra Bank interest rates, local election results, Dashain dates, or Kathmandu traffic updates \u2014 GuffGPT pulls from sources that actually cover Nepal, not just international outlets.' },
      { heading: 'Always cited', body: 'Every web-sourced answer includes clickable references so you can verify the information yourself. We believe AI should help you find truth, not replace your judgment. If sources conflict, GuffGPT will tell you and present both sides.' },
      { heading: 'Examples', body: '"Aaja Kathmandu ko mausam kasto cha?" \u2014 Gets live weather data.\n"Nepal cricket team ko latest score?" \u2014 Pulls live match data.\n"NEPSE index aaja kati cha?" \u2014 Shows current stock market data.\n"Dashain 2083 kati gate parcha?" \u2014 Searches and confirms the date.' },
    ],
  },
  {
    sort_order: 4, slug: '10k-users', date: 'Dec 5, 2025', tag: 'Milestone',
    title: '10,000 Active Users',
    desc: 'GuffGPT reached 10,000 active users across Nepal. Thank you to our amazing community.',
    color: '#fbbf24',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=700&fit=crop&q=80',
    intro: 'GuffGPT crossed 10,000 active users across Nepal. A milestone we never expected to hit this fast \u2014 and a responsibility we take seriously.',
    featured: 1,
    sections: [
      { heading: 'From zero to ten thousand.', body: 'When we launched GuffGPT in October 2025, we hoped a few hundred people might try it. Within two months, 10,000 people across Nepal were using GuffGPT every day. Students, professionals, content creators, curious minds \u2014 people from all 7 provinces found their way to Nepal\u2019s first AI chatbot.' },
      { heading: 'Who uses GuffGPT', body: '45% of our users are students aged 15-24, primarily using GuffGPT for homework help, exam prep, and learning. 30% are working professionals who use it for writing, translation, and research. 15% are content creators generating ideas, scripts, and social media posts. The remaining 10% are curious explorers who just enjoy having a smart conversation in Nepali.' },
      { heading: 'What we learned', body: 'The number one request from users: more Nepali language support. People do not just want an AI that understands Nepali \u2014 they want one that thinks in Nepali. That feedback shaped every update we have shipped since. We also learned that speed and reliability matter more than fancy features. People come back when GuffGPT is fast and dependable.' },
      { heading: 'Thank you, Nepal', body: 'This milestone belongs to our community. Every student who trusted GuffGPT with their exam prep, every professional who relied on it for a deadline, every person who told a friend about it \u2014 you built this. We are just the engineers behind the screen. Dhanyabad, Nepal.' },
      { heading: 'What\u2019s ahead', body: 'Ten thousand is just the beginning. Our goal is to make GuffGPT accessible to every Nepali speaker, everywhere. That means better Nepali language models, faster servers in South Asia, mobile apps, voice support, and offline capabilities for areas with limited internet. The journey is just getting started.' },
    ],
  },
  {
    sort_order: 5, slug: 'goes-live', date: 'Oct 1, 2025', tag: 'Launch',
    title: 'GuffGPT Goes Live',
    desc: 'The first public release of Nepal\u2019s first AI chatbot. GuffGPT is live and ready to chat.',
    color: '#fb923c',
    image: '',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=700&fit=crop&q=80',
    intro: 'The first public release of Nepal\u2019s first AI chatbot. GuffGPT is live and ready to chat in Nepali and English.',
    featured: 0,
    sections: [
      { heading: 'Nepal deserves its own AI.', body: 'Every major AI chatbot is built for English speakers. When Nepali users try them, the experience is mediocre at best \u2014 broken translations, no cultural context, and zero understanding of local needs. GuffGPT was built from day one to change that. Today, we are making it available to everyone.' },
      { heading: 'What GuffGPT can do', body: 'Chat in Nepali, English, or both at once. Get homework help explained in simple Nepali. Draft emails and documents. Translate between languages. Answer questions about Nepal \u2014 from geography to government policies. Write creative content. Help with coding. And much more, all through a simple chat interface.' },
      { heading: 'Built by Nepali, for Nepal', body: 'GuffGPT is not a wrapper around another AI. We fine-tuned our models on Nepali text, Nepali conversations, and Nepali context. It knows the difference between Dashain and Tihar. It understands Kathmandu slang. It can explain things the way a Nepali teacher would. This is AI that actually understands us.' },
      { heading: 'Free to use', body: 'GuffGPT launches as a free service. We believe AI access should not depend on your income. While we will introduce premium features later for power users, the core chat experience will always remain free. Everyone in Nepal deserves access to AI that speaks their language.' },
      { heading: 'Try it now', body: 'Visit chat.guffgpt.com and start a conversation. No sign-up required for your first messages. Ask it anything \u2014 in Nepali, English, or a mix of both. We built this for you. Let us know what you think.' },
    ],
  },
]

blogData.forEach(p => {
  const result = insertPost.run(
    p.sort_order, p.slug, p.date, p.tag, p.title, p.desc, p.color,
    p.image, p.heroImage, p.intro, p.featured
  )
  p.sections.forEach((s, i) => insertBlogSection.run(result.lastInsertRowid, i, s.heading, s.body))
})

// --- Stories ---
const insertStory = db.prepare(
  'INSERT INTO stories (sort_order, slug, title, subtitle, image, heroImage, gradient, accent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
)
const insertStorySection = db.prepare(
  'INSERT INTO story_sections (story_id, sort_order, type, heading, body, "text", author, prompt, response) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
)

const storiesData = [
  {
    sort_order: 0, slug: 'students',
    title: 'For Students',
    subtitle: 'From SEE prep to +2 exams \u2014 GuffGPT helps Nepali students learn in their own language.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&h=600&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&h=700&fit=crop&q=80',
    gradient: 'from-indigo-600/40 via-indigo-900/60 to-black/80',
    accent: '#818cf8',
    sections: [
      { type: 'text', heading: 'Studying shouldn\u2019t mean struggling with language.', body: 'For thousands of Nepali students preparing for SEE, SLC, and +2 level exams, the biggest barrier isn\u2019t the subject itself \u2014 it\u2019s finding resources that explain things clearly in their own language. Most AI tools respond in English. Textbooks are dense. Tuition classes are expensive. GuffGPT changes that equation.', text: '', author: '', prompt: '', response: '' },
      { type: 'text', heading: '', body: 'Whether it\u2019s breaking down Newton\u2019s laws in simple Nepali, solving quadratic equations step by step, or helping draft an essay for English class, GuffGPT acts like a tutor who\u2019s available 24/7 \u2014 and actually speaks your language.', text: '', author: '', prompt: '', response: '' },
      { type: 'quote', heading: '', body: '', text: 'Malai physics ekdam garo lagthyo. Tara GuffGPT le Nepali ma explain gardiyo ani sabai clear bhayo.', author: 'SEE Student, Kathmandu', prompt: '', response: '' },
      { type: 'chat', heading: '', body: '', text: '', author: '', prompt: 'Newton ko third law lai simple Nepali ma explain garnus', response: 'Newton ko third law bhanchha: "Prati kriya ko barabar ra biparit pratikriya hunchha."\n\nSajilo bhasha ma: Jaba timi wall lai push garchau, wall le pani timilai utikai force le push garchha. Ball lai laat hanyo bhane, ball agadi janchha \u2014 tara timro khutta lai pani force lagchha.\n\nYo law le explain garchha kina rocket udchha \u2014 gas tala janchha, rocket mathi janchha!' },
      { type: 'text', heading: 'Upload your textbook, get instant help.', body: 'Students can photograph a textbook page and ask GuffGPT to explain it. Whether it\u2019s a chemistry diagram, a math problem set, or a passage in English literature \u2014 GuffGPT reads the image and breaks it down in the language you think in.', text: '', author: '', prompt: '', response: '' },
      { type: 'chat', heading: '', body: '', text: '', author: '', prompt: '[Image: Biology textbook page on photosynthesis] Yo chapter lai Nepali ma summarize garnus', response: 'Photosynthesis bhaneko biruwa le sunlight, pani, ra CO2 bata food (glucose) banaune process ho.\n\nFormula: 6CO\u2082 + 6H\u2082O + Light \u2192 C\u2086H\u2081\u2082O\u2086 + 6O\u2082\n\nKey points:\n\u2022 Chlorophyll le sunlight absorb garchha\n\u2022 Stomata bata CO2 bhitra aunchha\n\u2022 Glucose energy ko lagi use hunchha\n\u2022 Oxygen release hunchha \u2014 yo nai hami sas ferne hawa ho!' },
      { type: 'text', heading: 'Exam prep that actually works.', body: 'Ask GuffGPT to quiz you on any subject. It generates practice questions, checks your answers, and explains where you went wrong \u2014 all in Nepali or English, your choice. No more memorizing without understanding.', text: '', author: '', prompt: '', response: '' },
    ],
  },
  {
    sort_order: 1, slug: 'professionals',
    title: 'For Professionals',
    subtitle: 'Draft, translate, research, and code \u2014 GuffGPT helps you work faster.',
    image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=900&h=600&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1400&h=700&fit=crop&q=80',
    gradient: 'from-violet-600/40 via-violet-900/60 to-black/80',
    accent: '#a78bfa',
    sections: [
      { type: 'text', heading: 'Work moves faster when AI speaks your language.', body: 'Professionals across Nepal use GuffGPT to handle daily tasks that used to eat hours. Drafting emails in English, translating documents from Nepali, researching market data, summarizing long reports \u2014 all through a simple chat interface.', text: '', author: '', prompt: '', response: '' },
      { type: 'quote', heading: '', body: '', text: 'I used to spend 30 minutes drafting a single English email. Now I tell GuffGPT what I want to say in Nepali, and it writes a perfect professional email in seconds.', author: 'Marketing Manager, Lalitpur', prompt: '', response: '' },
      { type: 'chat', heading: '', body: '', text: '', author: '', prompt: 'Write a professional email declining a meeting invitation politely', response: 'Subject: Re: Meeting Request \u2014 March 15\n\nDear Mr. Sharma,\n\nThank you for the meeting invitation for March 15. Unfortunately, I have a prior commitment that day and won\u2019t be able to attend.\n\nI\u2019d be happy to review any notes or materials afterward, or we could schedule a brief call at a time that works for both of us.\n\nThank you for understanding.\n\nBest regards,\n[Your Name]' },
      { type: 'text', heading: 'Research without the rabbit hole.', body: 'Instead of spending hours searching Google, ask GuffGPT to research a topic and summarize findings. Need competitive analysis? Market trends? Technical documentation explained simply? GuffGPT delivers concise, actionable answers \u2014 with real-time web search when you need the latest data.', text: '', author: '', prompt: '', response: '' },
      { type: 'chat', heading: '', body: '', text: '', author: '', prompt: 'Nepal ko IT industry ko current trend k cha? Key points ma batauna', response: 'Nepal IT Industry Trends (2026):\n\n\u2022 Remote work boom: 40%+ IT professionals now work for international clients\n\u2022 Fintech growth: Digital wallets (eSewa, Khalti) driving tech adoption\n\u2022 AI adoption: Companies integrating AI tools for productivity\n\u2022 Outsourcing hub: Nepal emerging as affordable dev talent source\n\u2022 Government push: Digital Nepal Framework accelerating tech infrastructure\n\u2022 Startup ecosystem: 200+ active tech startups, growing VC interest\n\nKey challenge: Brain drain to Gulf countries and Western nations.' },
      { type: 'text', heading: '', body: 'From code generation to contract drafting, GuffGPT handles the heavy lifting so professionals can focus on decisions that matter.', text: '', author: '', prompt: '', response: '' },
    ],
  },
  {
    sort_order: 2, slug: 'everyday',
    title: 'For Everyday Life',
    subtitle: 'Weather, recipes, translations, or just a good conversation \u2014 in your language.',
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=900&h=600&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1400&h=700&fit=crop&q=80',
    gradient: 'from-purple-600/40 via-purple-900/60 to-black/80',
    accent: '#c084fc',
    sections: [
      { type: 'text', heading: 'AI that fits into your daily life.', body: 'GuffGPT isn\u2019t just for work or studies. It\u2019s for the moments in between \u2014 when you want to know today\u2019s weather in Pokhara, need a quick recipe, want to translate a government document, or just feel like having a conversation in Nepali.', text: '', author: '', prompt: '', response: '' },
      { type: 'chat', heading: '', body: '', text: '', author: '', prompt: 'Aaja Kathmandu ko mausam kasto cha?', response: 'Aaja Kathmandu ma:\n\n\u2022 Temperature: 24\u00B0C (dinma), 12\u00B0C (ratma)\n\u2022 Mausam: Aaanshik badali, paani parne sambhawana chhaina\n\u2022 Humidity: 45%\n\u2022 Hawa: 10 km/h paschim bata\n\nBaira ghumnako lagi ramro din! Thamel side jaane plan cha bhane light jacket linu \u2014 beluka chiso hunchha.' },
      { type: 'quote', heading: '', body: '', text: 'Mero ama lai English aaudaina. Tara GuffGPT sanga Nepali ma kura garna sakchhin. Usle recipe, health tips, sabai Nepali ma dinthyo.', author: 'Software Developer, Bhaktapur', prompt: '', response: '' },
      { type: 'chat', heading: '', body: '', text: '', author: '', prompt: 'Dal bhat tarkari banaune recipe dinus, 4 jana ko lagi', response: 'Dal Bhat Tarkari (4 jana ko lagi):\n\nDAL:\n\u2022 1 cup masoor dal, dhoyera 20 min pakaaune\n\u2022 Haldi, noon, jimbu, lasun, golbheda ko chhounk\n\nBHAT:\n\u2022 2 cup chamal, 3.5 cup paani\n\u2022 Medium heat ma 15-18 min pakaaune\n\nTARKARI (Aloo Gobi):\n\u2022 3 ota aloo + 1 gobi, sano sano kaatne\n\u2022 Tel ma jeera, methi dana, haldi, besaar halera bhutne\n\u2022 Noon, kukhura masala, dhaniya powder\n\u2022 15 min pakaaune\n\nACHAAR:\n\u2022 2 ota golbheda + khursani + lasun miksera ma pisne\n\u2022 Noon ra nuni tel halera mix\n\nKhana taiyar! Mitho banaune rahasya: dal ma ghiu halnus!' },
      { type: 'text', heading: 'Translate anything, understand everything.', body: 'Government forms, medical prescriptions, official letters \u2014 GuffGPT translates between Nepali and English instantly, with context that Google Translate misses. It understands formal Nepali, colloquial speech, and even Romanized Nepali.', text: '', author: '', prompt: '', response: '' },
    ],
  },
  {
    sort_order: 3, slug: 'creators',
    title: 'For Content Creators',
    subtitle: 'Write, script, caption, and create \u2014 in Nepali, English, or both.',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=900&h=600&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1400&h=700&fit=crop&q=80',
    gradient: 'from-fuchsia-600/40 via-fuchsia-900/60 to-black/80',
    accent: '#e879f9',
    sections: [
      { type: 'text', heading: 'Content creation in your mother tongue.', body: 'Nepali content creators face a unique challenge: most AI tools generate content in English, but their audience speaks Nepali. GuffGPT bridges that gap \u2014 generating blog posts, social media captions, video scripts, and even poetry in natural Nepali that doesn\u2019t sound translated.', text: '', author: '', prompt: '', response: '' },
      { type: 'chat', heading: '', body: '', text: '', author: '', prompt: 'Nepal travel vlog ko lagi YouTube video script lekhnus. Topic: Pokhara trip', response: 'POKHARA TRAVEL VLOG SCRIPT\n\nINTRO (Hook):\n"Namaste dost haru! Aaja hami Pokhara ma chhau \u2014 Nepal ko sabse ramro city. Phewa Tal dekhi Sarangkot samma, aaunu hai hamro sanga!"\n\nSECTION 1: Lakeside\n"Phewa Tal ko chheuma basera yo view hernus... Machapuchre ekdam clear dekhiracha aaja. Yaha boat ride Rs 500 ma paaincha."\n\nSECTION 2: Food Tour\n"Lakeside ma momos khana aayau. Yo thakali set Rs 350 \u2014 dal, bhat, gundruk, timur ko achar... Mitho cha ki chhaina bhannus!"\n\nSECTION 3: Sarangkot Sunrise\n"Bihana 4:30 ma uthera Sarangkot pugiyau... Ra yo hernus \u2014 sunrise with Himalaya range. Yo view ko lagi Nepal aaunu parchha!"\n\nOUTRO:\n"Pokhara aaye pachhi subscribe garna nabirsinu hai! Next video: Mustang trip!"' },
      { type: 'quote', heading: '', body: '', text: 'GuffGPT le mero content game nai change garidiyo. Nepali captions lekhdaina bhanera tension hanthyo, aba 2 minute ma ready hunchha.', author: 'Travel Vlogger, Pokhara', prompt: '', response: '' },
      { type: 'text', heading: 'From idea to published \u2014 in minutes.', body: 'Need Instagram captions in Nepali? Blog posts about Nepali culture? Twitter threads about tech in Nepal? GuffGPT matches your tone and style, whether you want casual conversational Nepali or formal literary Nepali. It even generates hashtags and SEO-optimized titles.', text: '', author: '', prompt: '', response: '' },
      { type: 'chat', heading: '', body: '', text: '', author: '', prompt: 'Instagram caption lekha Nepali ma, Himalaya ko photo ko lagi. Engaging ra hashtags sahit', response: '\u2728 Himal herda mann shanta hunchha, sansaar birsindochha.\n\nKahile kahi, phone rakhera, yo drishya lai aafnai aankha le hernuparchha. Nepal ma janmiyeko hami kati bhagyamani!\n\nYo hamro dharohar ho. Yo hamro gaurab ho. \u{1F1F3}\u{1F1F5}\n\n#Nepal #Himalayas #MountEverest #NepalTravel #ExploreNepal #NepaliPride #Mountains #SagarmathaZone #VisitNepal2026 #NatureLovers' },
    ],
  },
]

storiesData.forEach(s => {
  const result = insertStory.run(
    s.sort_order, s.slug, s.title, s.subtitle, s.image, s.heroImage, s.gradient, s.accent
  )
  s.sections.forEach((sec, i) =>
    insertStorySection.run(result.lastInsertRowid, i, sec.type, sec.heading || '', sec.body || '', sec.text || '', sec.author || '', sec.prompt || '', sec.response || '')
  )
})

console.log('Database seeded successfully!')
console.log('Admin login: username=admin, password=GuffGPT@admin')
