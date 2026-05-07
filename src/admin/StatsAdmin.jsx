import { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const empty = { value: 0, suffix: '+', label: '', sort_order: 0 }

export default function StatsAdmin() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [form, setForm] = useState(null)

  const load = () => fetch('/api/stats').then(r => r.json()).then(setItems).catch(() => {})
  useEffect(() => { load() }, [])

  const save = async () => {
    const method = form.id ? 'PUT' : 'POST'
    const url = form.id ? `/api/stats/${form.id}` : '/api/stats'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    })
    setForm(null)
    load()
  }

  const remove = async (id) => {
    if (!confirm('Delete this stat?')) return
    await fetch(`/api/stats/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">Stats</h1>
        <button onClick={() => setForm({ ...empty })} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition cursor-pointer">
          Add Stat
        </button>
      </div>

      <div className="rounded-xl border border-neutral-800/50 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-900/80 text-neutral-500 text-[11px] uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">#</th>
              <th className="text-left px-4 py-3 font-medium">Value</th>
              <th className="text-left px-4 py-3 font-medium">Suffix</th>
              <th className="text-left px-4 py-3 font-medium">Label</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t border-neutral-800/30 hover:bg-neutral-900/40">
                <td className="px-4 py-3 text-neutral-600">{item.sort_order}</td>
                <td className="px-4 py-3 text-white font-semibold">{item.value}</td>
                <td className="px-4 py-3 text-neutral-400">{item.suffix}</td>
                <td className="px-4 py-3 text-neutral-300">{item.label}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => setForm({ ...item })} className="text-indigo-400 hover:text-indigo-300 text-xs cursor-pointer">Edit</button>
                  <button onClick={() => remove(item.id)} className="text-red-400/60 hover:text-red-400 text-xs cursor-pointer">Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-neutral-600">No stats yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {form && (
        <div className="mt-6 rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-6">
          <h2 className="text-sm font-semibold text-white mb-4">{form.id ? 'Edit Stat' : 'New Stat'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-neutral-500 mb-1">Value</label>
              <input type="number" value={form.value} onChange={e => setForm({ ...form, value: Number(e.target.value) })} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500/50 transition" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-neutral-500 mb-1">Suffix</label>
              <input type="text" value={form.suffix} onChange={e => setForm({ ...form, suffix: e.target.value })} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500/50 transition" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-neutral-500 mb-1">Label</label>
              <input type="text" value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500/50 transition" />
            </div>
            <div>
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
