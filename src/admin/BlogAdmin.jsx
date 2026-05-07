import { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const emptyPost = { slug: '', date: '', tag: '', title: '', desc: '', color: '#818cf8', image: '', heroImage: '', intro: '', featured: 0, sort_order: 0, sections: [] }
const emptySection = { heading: '', body: '' }

export default function BlogAdmin() {
  const { token } = useAuth()
  const [posts, setPosts] = useState([])
  const [editing, setEditing] = useState(null)

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  const load = () => fetch('/api/blog/all', { headers }).then(r => r.json()).then(setPosts).catch(() => {})
  useEffect(() => { load() }, [])

  const editPost = async (id) => {
    const res = await fetch(`/api/blog/edit/${id}`, { headers })
    const data = await res.json()
    setEditing(data)
  }

  const save = async () => {
    const method = editing.id ? 'PUT' : 'POST'
    const url = editing.id ? `/api/blog/${editing.id}` : '/api/blog'
    await fetch(url, { method, headers, body: JSON.stringify(editing) })
    setEditing(null)
    load()
  }

  const remove = async (id) => {
    if (!confirm('Delete this post and all its sections?')) return
    await fetch(`/api/blog/${id}`, { method: 'DELETE', headers })
    load()
  }

  const addSection = () => setEditing({ ...editing, sections: [...(editing.sections || []), { ...emptySection }] })
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
          <h1 className="text-xl font-bold text-white">{editing.id ? 'Edit Post' : 'New Post'}</h1>
          <button onClick={() => setEditing(null)} className="text-neutral-500 hover:text-neutral-300 text-xs cursor-pointer">Back to list</button>
        </div>

        <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Inp label="Title" value={editing.title} onChange={v => setEditing({ ...editing, title: v })} />
            <Inp label="Slug" value={editing.slug} onChange={v => setEditing({ ...editing, slug: v })} placeholder="url-friendly-slug" />
            <Inp label="Date" value={editing.date} onChange={v => setEditing({ ...editing, date: v })} placeholder="Apr 10, 2026" />
            <Inp label="Tag" value={editing.tag} onChange={v => setEditing({ ...editing, tag: v })} />
            <Inp label="Color" value={editing.color} onChange={v => setEditing({ ...editing, color: v })} type="color" />
            <Inp label="Sort Order" value={editing.sort_order} onChange={v => setEditing({ ...editing, sort_order: Number(v) })} type="number" />
            <Inp label="Description" value={editing.desc} onChange={v => setEditing({ ...editing, desc: v })} textarea full />
            <Inp label="Thumbnail Image URL (homepage)" value={editing.image} onChange={v => setEditing({ ...editing, image: v })} full />
            <Inp label="Hero Image URL (detail page)" value={editing.heroImage} onChange={v => setEditing({ ...editing, heroImage: v })} full />
            <Inp label="Intro Paragraph" value={editing.intro} onChange={v => setEditing({ ...editing, intro: v })} textarea full />
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={!!editing.featured} onChange={e => setEditing({ ...editing, featured: e.target.checked ? 1 : 0 })} className="rounded border-neutral-700" />
                <span className="text-sm text-neutral-300">Featured on homepage (Updates section)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white">Sections ({editing.sections?.length || 0})</h2>
            <button onClick={addSection} className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg transition cursor-pointer">
              + Add Section
            </button>
          </div>
          <div className="space-y-3">
            {(editing.sections || []).map((s, i) => (
              <div key={i} className="rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] text-neutral-600 font-medium">Section {i + 1}</span>
                  <button onClick={() => removeSection(i)} className="text-red-400/60 hover:text-red-400 text-[11px] cursor-pointer">Remove</button>
                </div>
                <div className="space-y-3">
                  <Inp label="Heading" value={s.heading} onChange={v => updateSection(i, 'heading', v)} />
                  <Inp label="Body" value={s.body} onChange={v => updateSection(i, 'body', v)} textarea />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={save} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition cursor-pointer">Save Post</button>
          <button onClick={() => setEditing(null)} className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium rounded-lg transition cursor-pointer">Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Blog / Updates</h1>
        <button onClick={() => setEditing({ ...emptyPost })} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition cursor-pointer">
          New Post
        </button>
      </div>

      <div className="rounded-xl border border-neutral-800/50 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-900/80 text-neutral-500 text-[11px] uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">#</th>
              <th className="text-left px-4 py-3 font-medium">Title</th>
              <th className="text-left px-4 py-3 font-medium">Tag</th>
              <th className="text-left px-4 py-3 font-medium">Date</th>
              <th className="text-left px-4 py-3 font-medium">Featured</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.id} className="border-t border-neutral-800/30 hover:bg-neutral-900/40">
                <td className="px-4 py-3 text-neutral-600">{p.sort_order}</td>
                <td className="px-4 py-3 text-neutral-200">{p.title}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 text-[11px] rounded-full border border-neutral-700 text-neutral-400">{p.tag}</span></td>
                <td className="px-4 py-3 text-neutral-500">{p.date}</td>
                <td className="px-4 py-3">{p.featured ? <span className="text-indigo-400 text-xs">Yes</span> : <span className="text-neutral-700 text-xs">No</span>}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => editPost(p.id)} className="text-indigo-400 hover:text-indigo-300 text-xs cursor-pointer">Edit</button>
                  <button onClick={() => remove(p.id)} className="text-red-400/60 hover:text-red-400 text-xs cursor-pointer">Delete</button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-neutral-600">No blog posts yet</td></tr>
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
