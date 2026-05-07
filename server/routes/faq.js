import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM faqs ORDER BY sort_order, id').all()
  res.json(rows)
})

router.post('/', requireAuth, (req, res) => {
  const { q, a, sort_order } = req.body
  if (!q || !a) return res.status(400).json({ error: 'Question and answer required' })
  const result = db.prepare(
    'INSERT INTO faqs (q, a, sort_order) VALUES (?, ?, ?)'
  ).run(q, a, sort_order || 0)
  res.json({ id: Number(result.lastInsertRowid) })
})

router.put('/:id', requireAuth, (req, res) => {
  const { q, a, sort_order } = req.body
  db.prepare(
    'UPDATE faqs SET q=?, a=?, sort_order=? WHERE id=?'
  ).run(q || '', a || '', sort_order ?? 0, req.params.id)
  res.json({ success: true })
})

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM faqs WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

export default router
