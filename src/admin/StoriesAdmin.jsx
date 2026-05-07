import { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const emptyStory = { slug: '', title: '', subtitle: '', image: '', heroImage: '', gradient: '', accent: '#818cf8', sort_order: 0, sections: [] }
const sectionDefaults = {
  text: { type: 'text', heading: '', body: '', text: '', author: '', prompt: '', response: '' },
  quote: { type: 'quote', heading: '', body: '', text: '', author: '', prompt: '', response: '' },
  chat: { type: 'chat', heading: '', body: '', text: '', author: '', prompt: '', response: '' },
}

export default function StoriesAdmin() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  const load = () => fetch('/api/stories/all', { headers }).then(r => r.json()).then(setItems).catch(() => {})
  useEffect(() => { load() }, [])

  const editStory = async (id) => {
    const res = await fetch(`/api/stories/edit/${id}`, { headers })
    const data = await res.json()
    setEditing(data)
  }

  const save = async () => {
    const method = editing.id ? 'PUT' : 'POST'
    const url = editing.id ? `/api/stories/${editing.id}` : '/api/stories'
    await fetch(url, { method, headers, body: JSON.stringify(editing) })
    setEditing(null)
    load()
  }

  const remove = async (id) => {
    if (!confirm('Delete this story and all its sections?')) return
    await fetch(`/api/stories/${id}`, { method: 'DELETE', headers })
    load()
  }

  const addSection = (type) => setEditing({ ...editing, sections: [...(editing.sections || []), { ...sectionDefaults[type] }] })
  const removeSection = (i) => setEditing({ ...editing, sections: editing.sections.filter((_, idx) => idx !== i) })
  const updateSection = (i, key, val) => {
    const s = [...editing.sections]
    s[i] = { ...s[i], [key]: val }
    setEditing({ ...editing, sections: s })
  }

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-white">{editing.id ? 'Edit Story' : 'New Story'}</h1>
          <button onClick={() => setEditing(null)} className="text-neutral-500 hover:text-neutral-300 text-xs cursor-pointer">Back to list</button>
        </div>

        <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Inp label="Title" value={editing.title} onChange={v => setEditing({ ...editing, title: v })} />
            <Inp label="Slug" value={editing.slug} onChange={v => setEditing({ ...editing, slug: v })} placeholder="url-friendly-slug" />
            <Inp label="Subtitle" value={editing.subtitle} onChange={v => setEditing({ ...editing, subtitle: v })} full />
            <Inp label="Card Image URL (homepage carousel)" value={editing.image} onChange={v => setEditing({ ...editing, image: v })} full />
            <Inp label="Hero Image URL (detail page)" value={editing.heroImage} onChange={v => setEditing({ ...editing, heroImage: v })} full />
            <Inp label="Gradient Classes" value={editing.gradient} onChange={v => setEditing({ ...editing, gradient: v })} placeholder="from-indigo-600/40 via-indigo-900/60 to-black/80" full />
            <Inp label="Accent Color" value={editing.accent} onChange={v => setEditing({ ...editing, accent: v })} type="color" />
            <Inp label="Sort Order" value={editing.sort_order} onChange={v => setEditing({ ...editing, sort_order: Number(v) })} type="number" />
          </div>
        </div>

        {/* Sections */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white">Sections ({editing.sections?.length || 0})</h2>
            <div className="flex gap-2">
              <button onClick={() => addSection('text')} className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg transition cursor-pointer">+ Text</button>
              <button onClick={() => addSection('quote')} className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg transition cursor-pointer">+ Quote</button>
              <button onClick={() => addSection('chat')} className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg transition cursor-pointer">+ Chat</button>
            </div>
          </div>
          <div className="space-y-3">
            {(editing.sections || []).map((s, i) => (
              <div key={i} className="rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${s.type === 'text' ? 'bg-blue-500/10 text-blue-400' : s.type === 'quote' ? 'bg-amber-500/10 text-amber-400' : 'bg-green-500/10 text-green-400'}`}>
                      {s.type}
                    </span>
                    <span className="text-[11px] text-neutral-600">Section {i + 1}</span>
                  </span>
                  <button onClick={() => removeSection(i)} className="text-red-400/60 hover:text-red-400 text-[11px] cursor-pointer">Remove</button>
                </div>
                {s.type === 'text' && (
                  <div className="space-y-3">
                    <Inp label="Heading (optional)" value={s.heading} onChange={v => updateSection(i, 'heading', v)} />
                    <Inp label="Body" value={s.body} onChange={v => updateSection(i, 'body', v)} textarea />
                  </div>
                )}
                {s.type === 'quote' && (
                  <div className="space-y-3">
                    <Inp label="Quote Text" value={s.text} onChange={v => updateSection(i, 'text', v)} textarea />
                    <Inp label="Author" value={s.author} onChange={v => updateSection(i, 'author', v)} />
                  </div>
                )}
                {s.type === 'chat' && (
                  <div className="space-y-3">
                    <Inp label="User Prompt" value={s.prompt} onChange={v => updateSection(i, 'prompt', v)} textarea />
                    <Inp label="GuffGPT Response" value={s.response} onChange={v => updateSection(i, 'response', v)} textarea />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={save} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition cursor-pointer">Save Story</button>
          <button onClick={() => setEditing(null)} className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium rounded-lg transition cursor-pointer">Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Stories / Use Cases</h1>
        <button onClick={() => setEditing({ ...emptyStory })} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition cursor-pointer">
          New Story
        </button>
      </div>

      <div className="rounded-xl border border-neutral-800/50 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-900/80 text-neutral-500 text-[11px] uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">#</th>
              <th className="text-left px-4 py-3 font-medium">Title</th>
              <th className="text-left px-4 py-3 font-medium">Slug</th>
              <th className="text-left px-4 py-3 font-medium">Accent</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t border-neutral-800/30 hover:bg-neutral-900/40">
                <td className="px-4 py-3 text-neutral-600">{item.sort_order}</td>
                <td className="px-4 py-3 text-neutral-200">{item.title}</td>
                <td className="px-4 py-3 text-neutral-500">{item.slug}</td>
                <td className="px-4 py-3"><span className="w-4 h-4 rounded-full inline-block" style={{ background: item.accent }} /></td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => editStory(item.id)} className="text-indigo-400 hover:text-indigo-300 text-xs cursor-pointer">Edit</button>
                  <button onClick={() => remove(item.id)} className="text-red-400/60 hover:text-red-400 text-xs cursor-pointer">Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-neutral-600">No stories yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Inp({ label, value, onChange, type = 'text', placeholder, textarea, full }) {
  const cls = 'w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500/50 transition'
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
