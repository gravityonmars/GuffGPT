import Hero from '../components/Hero'
import Features from '../components/Features'
import Stats from '../components/Stats'
import UseCases from '../components/UseCases'
import RecentUpdates from '../components/RecentUpdates'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-6xl mx-auto px-5"><div className="border-t border-neutral-800/30" /></div>
      <Features />
      <Stats />
      <div className="max-w-6xl mx-auto px-5"><div className="border-t border-neutral-800/30" /></div>
      <UseCases />
      <div className="max-w-6xl mx-auto px-5"><div className="border-t border-neutral-800/30" /></div>
      <RecentUpdates />
      <div className="max-w-6xl mx-auto px-5"><div className="border-t border-neutral-800/30" /></div>
      <FAQ />
      <Footer />
    </>
  )
}
