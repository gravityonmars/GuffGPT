import Footer from '../components/Footer'

const sections = [
  {
    title: 'Information we collect',
    body: 'GuffGPT may collect information you provide directly, such as messages sent through forms, account details for authenticated services, and basic usage information needed to keep the service reliable and secure.',
  },
  {
    title: 'How we use information',
    body: 'We use information to operate GuffGPT, improve user experience, respond to support requests, protect against abuse, and maintain the performance and safety of the website and related services.',
  },
  {
    title: 'Cookies, analytics, and advertising',
    body: 'This website may use cookies and similar technologies for essential functionality, analytics, and advertising. When Google AdSense is enabled, Google and its partners may use cookies to personalize or measure ads based on visits to this and other websites.',
  },
  {
    title: 'Third-party services',
    body: 'We may link to or integrate third-party services, including hosting providers, analytics tools, authentication providers, and Google advertising services. These services may process data according to their own privacy policies.',
  },
  {
    title: 'Your choices',
    body: 'You can disable cookies in your browser settings, use available ad personalization controls from Google, and contact us to request support related to your personal information.',
  },
  {
    title: 'Contact',
    body: 'For questions about this privacy policy, contact us at contact@guffgpt.com.',
  },
]

export default function Privacy() {
  return (
    <>
      <main className="pt-[60px] overflow-hidden">
        <section className="relative px-5 pt-20 md:pt-28 pb-14 text-center">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 30%, rgba(99,102,241,0.16) 0%, transparent 70%)' }} />
          <div className="relative max-w-3xl mx-auto">
            <p className="inline-flex rounded-full border border-indigo-300/15 bg-indigo-400/10 px-4 py-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-indigo-300 mb-4">Legal</p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white tracking-[-0.04em] leading-[1.05]">Privacy Policy</h1>
            <p className="mt-5 text-[15px] text-slate-500">Last updated: May 8, 2026</p>
          </div>
        </section>

        <section className="relative px-5 pb-24 md:pb-32">
          <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          <div className="relative glass-panel max-w-3xl mx-auto rounded-[2rem] p-6 md:p-9">
            <p className="text-[16px] text-slate-400 leading-[1.85]">
              GuffGPT respects your privacy. This policy explains the types of information that may be collected when you use this website and how that information is handled.
            </p>
            <div className="mt-10 space-y-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xl font-bold text-white tracking-tight mb-3">{section.title}</h2>
                  <p className="text-[15px] text-slate-400 leading-[1.8]">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
