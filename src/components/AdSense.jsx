import { useEffect } from 'react'

const clientId = import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT

export function AdSenseScript() {
  useEffect(() => {
    if (!clientId || document.querySelector('script[data-adsense="true"]')) return

    const script = document.createElement('script')
    script.async = true
    script.crossOrigin = 'anonymous'
    script.dataset.adsense = 'true'
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`
    document.head.appendChild(script)
  }, [])

  return null
}

export default function AdUnit({ slot, format = 'auto', layout, className = '' }) {
  useEffect(() => {
    if (!clientId || !slot) return

    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch {
      // Ad blockers or script timing can throw; keep the UI stable.
    }
  }, [slot])

  if (!clientId || !slot) return null

  return (
    <div className={'my-8 overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-white/[0.02] p-3 ' + className}>
      <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">Advertisement</p>
      <ins
        className="adsbygoogle block min-h-[120px]"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive="true"
      />
    </div>
  )
}
