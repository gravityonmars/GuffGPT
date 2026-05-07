import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM stats ORDER BY sort_order, id').all()
  res.json(rows)
})

router.post('/', requireAuth, (req, res) => {
  const { value, suffix, label, sort_order } = req.body
  if (!label) return res.status(400).json({ error: 'Label is required' })
  const result = db.prepare(
    'INSERT INTO stats (value, suffix, label, sort_order) VALUES (?, ?, ?, ?)'
  ).run(value ?? 0, suffix || '+', label, sort_order || 0)
  res.json({ id: Number(result.lastInsertRowid) })
})

router.put('/:id', requireAuth, (req, res) => {
  const { value, suffix, label, sort_order } = req.body
  db.prepare(
    'UPDATE stats SET value=?, suffix=?, label=?, sort_order=? WHERE id=?'
  ).run(value ?? 0, suffix || '+', label || '', sort_order ?? 0, req.params.id)
  res.json({ success: true })
})

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM stats WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

export default router
