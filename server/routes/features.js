import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM features ORDER BY sort_order, id').all()
  res.json(rows)
})

router.post('/', requireAuth, (req, res) => {
  const { emoji, title, subtitle, desc, color, prompt, response, tag, sort_order } = req.body
  if (!title) return res.status(400).json({ error: 'Title is required' })
  const result = db.prepare(
    'INSERT INTO features (emoji, title, subtitle, "desc", color, prompt, response, tag, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(emoji || '', title, subtitle || '', desc || '', color || '#818cf8', prompt || '', response || '', tag || '', sort_order || 0)
  res.json({ id: Number(result.lastInsertRowid) })
})

router.put('/:id', requireAuth, (req, res) => {
  const { emoji, title, subtitle, desc, color, prompt, response, tag, sort_order } = req.body
  db.prepare(
    'UPDATE features SET emoji=?, title=?, subtitle=?, "desc"=?, color=?, prompt=?, response=?, tag=?, sort_order=? WHERE id=?'
  ).run(emoji || '', title || '', subtitle || '', desc || '', color || '#818cf8', prompt || '', response || '', tag || '', sort_order ?? 0, req.params.id)
  res.json({ success: true })
})

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM features WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

export default router
