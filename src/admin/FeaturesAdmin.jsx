import { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const empty = { emoji: '', title: '', subtitle: '', desc: '', color: '#818cf8', prompt: '', response: '', tag: '', sort_order: 0 }

export default function FeaturesAdmin() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [form, setForm] = useState(null)

  const load = () => fetch('/api/features').then(r => r.json()).then(setItems).catch(() => {})
  useEffect(() => { load() }, [])

  const save = async () => {
    const method = form.id ? 'PUT' : 'POST'
    const url = form.id ? `/api/features/${form.id}` : '/api/features'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    })
    setForm(null)
    load()
  }

  const remove = async (id) => {
    if (!confirm('Delete this feature?')) return
    await fetch(`/api/features/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Features</h1>
        <button onClick={() => setForm({ ...empty })} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition cursor-pointer">
          Add Feature
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-neutral-800/50 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-900/80 text-neutral-500 text-[11px] uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">#</th>
              <th className="text-left px-4 py-3 font-medium">Emoji</th>
              <th className="text-left px-4 py-3 font-medium">Title</th>
              <th className="text-left px-4 py-3 font-medium">Tag</th>
              <th className="text-left px-4 py-3 font-medium">Color</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id} className="border-t border-neutral-800/30 hover:bg-neutral-900/40">
                <td className="px-4 py-3 text-neutral-600">{item.sort_order}</td>
                <td className="px-4 py-3 text-lg">{item.emoji}</td>
                <td className="px-4 py-3 text-neutral-200">{item.title}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 text-[11px] rounded-full border border-neutral-700 text-neutral-400">{item.tag}</span></td>
                <td className="px-4 py-3"><span className="w-4 h-4 rounded-full inline-block" style={{ background: item.color }} /></td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => setForm({ ...item })} className="text-indigo-400 hover:text-indigo-300 text-xs cursor-pointer">Edit</button>
                  <button onClick={() => remove(item.id)} className="text-red-400/60 hover:text-red-400 text-xs cursor-pointer">Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-neutral-600">No features yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Form */}
      {form && (
        <div className="mt-6 rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-6">
          <h2 className="text-sm font-semibold text-white mb-4">{form.id ? 'Edit Feature' : 'New Feature'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Emoji" value={form.emoji} onChange={v => setForm({ ...form, emoji: v })} placeholder="Paste emoji character" />
            <Field label="Title" value={form.title} onChange={v => setForm({ ...form, title: v })} />
            <Field label="Subtitle" value={form.subtitle} onChange={v => setForm({ ...form, subtitle: v })} />
            <Field label="Tag" value={form.tag} onChange={v => setForm({ ...form, tag: v })} />
            <Field label="Color" value={form.color} onChange={v => setForm({ ...form, color: v })} type="color" />
            <Field label="Sort Order" value={form.sort_order} onChange={v => setForm({ ...form, sort_order: Number(v) })} type="number" />
            <Field label="Description" value={form.desc} onChange={v => setForm({ ...form, desc: v })} textarea full />
            <Field label="Example Prompt" value={form.prompt} onChange={v => setForm({ ...form, prompt: v })} textarea full />
            <Field label="Example Response" value={form.response} onChange={v => setForm({ ...form, response: v })} textarea full />
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

function Field({ label, value, onChange, type = 'text', placeholder, textarea, full }) {
  const cls = `w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500/50 transition ${type === 'color' ? 'h-10 cursor-pointer' : ''}`
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="block text-[11px] font-medium text-neutral-500 mb-1">{label}</label>
      {textarea ? (
        <textarea value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} className={cls} />
      ) : (
        <input type={type} value={value ?? ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </div>
  )
}
