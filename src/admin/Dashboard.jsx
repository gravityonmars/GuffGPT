import { useState, useEffect } from 'react'

const cards = [
  { key: 'features', label: 'Features', color: '#818cf8' },
  { key: 'stats', label: 'Stats', color: '#6ee7b7' },
  { key: 'blogPosts', label: 'Blog Posts', color: '#f9a8d4' },
  { key: 'stories', label: 'Stories', color: '#c4b5fd' },
  { key: 'faqs', label: 'FAQs', color: '#fbbf24' },
]

export default function Dashboard() {
  const [counts, setCounts] = useState({})

  useEffect(() => {
    fetch('/api/dashboard').then(r => r.json()).then(setCounts).catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="text-xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map(c => (
          <div
            key={c.key}
            className="rounded-xl border border-neutral-800/50 bg-neutral-900/50 p-5"
          >
            <p className="text-3xl font-bold text-white">{counts[c.key] ?? '-'}</p>
            <p className="text-[12px] font-medium mt-1" style={{ color: c.color }}>{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-6">
        <h2 className="text-sm font-semibold text-white mb-3">Quick Info</h2>
        <ul className="text-[13px] text-neutral-500 space-y-2">
          <li>Use the sidebar to manage each content section.</li>
          <li>Changes are saved to the database and reflected on the live site.</li>
          <li>Blog posts marked as <span className="text-indigo-400">featured</span> appear in the homepage Updates section.</li>
          <li>Stories also serve as the Use Cases cards on the homepage.</li>
        </ul>
      </div>
    </div>
  )
}
