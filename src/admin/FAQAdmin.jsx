import { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const empty = { q: '', a: '', sort_order: 0 }

export default function FAQAdmin() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [form, setForm] = useState(null)

  const load = () => fetch('/api/faq').then(r => r.json()).then(setItems).catch(() => {})
  useEffect(() => { load() }, [])

  const save = async () => {
    const method = form.id ? 'PUT' : 'POST'
    const url = form.id ? `/api/faq/${form.id}` : '/api/faq'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    })
    setForm(null)
    load()
  }

  const remove = async (id) => {
    if (!confirm('Delete this FAQ?')) return
    await fetch(`/api/faq/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">FAQ</h1>
        <button onClick={() => setForm({ ...empty })} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition cursor-pointer">
          Add FAQ
        </button>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium">{item.q}</p>
                <p className="text-[13px] text-neutral-500 mt-1 line-clamp-2">{item.a}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setForm({ ...item })} className="text-indigo-400 hover:text-indigo-300 text-xs cursor-pointer">Edit</button>
                <button onClick={() => remove(item.id)} className="text-red-400/60 hover:text-red-400 text-xs cursor-pointer">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-8 text-neutral-600 text-sm">No FAQs yet</div>
        )}
      </div>

      {form && (
        <div className="mt-6 rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-6">
          <h2 className="text-sm font-semibold text-white mb-4">{form.id ? 'Edit FAQ' : 'New FAQ'}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-medium text-neutral-500 mb-1">Question</label>
              <input type="text" value={form.q} onChange={e => setForm({ ...form, q: e.target.value })} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500/50 transition" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-neutral-500 mb-1">Answer</label>
              <textarea value={form.a} onChange={e => setForm({ ...form, a: e.target.value })} rows={4} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500/50 transition" />
            </div>
            <div className="w-32">
              <label className="block text-[11px] font-medium text-neutral-500 mb-1">Sort Order</label>
              <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) })} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500/50 transition" />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={save} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition cursor-pointer">Save</button>
            <button onClick={() => setForm(null)} className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium rounded-lg transition cursor-pointer">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
