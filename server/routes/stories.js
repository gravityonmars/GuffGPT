import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Public: card data for use cases carousel
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT id, slug, title, subtitle, image, gradient, accent FROM stories ORDER BY sort_order, id').all()
  res.json(rows)
})

// Public: single story with sections
router.get('/detail/:slug', (req, res) => {
  const story = db.prepare('SELECT * FROM stories WHERE slug = ?').get(req.params.slug)
  if (!story) return res.status(404).json({ error: 'Not found' })
  const sections = db.prepare('SELECT * FROM story_sections WHERE story_id = ? ORDER BY sort_order, id').all(story.id)
  res.json({ ...story, sections })
})

// Admin: all stories with all fields
router.get('/all', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM stories ORDER BY sort_order, id').all()
  res.json(rows)
})

// Admin: single story with sections for editing
router.get('/edit/:id', requireAuth, (req, res) => {
  const story = db.prepare('SELECT * FROM stories WHERE id = ?').get(req.params.id)
  if (!story) return res.status(404).json({ error: 'Not found' })
  const sections = db.prepare('SELECT * FROM story_sections WHERE story_id = ? ORDER BY sort_order, id').all(story.id)
  res.json({ ...story, sections })
})

router.post('/', requireAuth, (req, res) => {
  const { slug, title, subtitle, image, heroImage, gradient, accent, sort_order, sections } = req.body
  if (!slug || !title) return res.status(400).json({ error: 'Slug and title required' })
  const result = db.prepare(
    'INSERT INTO stories (slug, title, subtitle, image, heroImage, gradient, accent, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(slug, title, subtitle || '', image || '', heroImage || '', gradient || '', accent || '#818cf8', sort_order || 0)
  if (sections?.length) {
    const stmt = db.prepare(
      'INSERT INTO story_sections (story_id, sort_order, type, heading, body, "text", author, prompt, response) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )
    sections.forEach((s, i) =>
      stmt.run(Number(result.lastInsertRowid), i, s.type || 'text', s.heading || '', s.body || '', s.text || '', s.author || '', s.prompt || '', s.response || '')
    )
  }
  res.json({ id: Number(result.lastInsertRowid) })
})

router.put('/:id', requireAuth, (req, res) => {
  const { slug, title, subtitle, image, heroImage, gradient, accent, sort_order, sections } = req.body
  db.prepare(
    'UPDATE stories SET slug=?, title=?, subtitle=?, image=?, heroImage=?, gradient=?, accent=?, sort_order=? WHERE id=?'
  ).run(slug, title, subtitle || '', image || '', heroImage || '', gradient || '', accent || '#818cf8', sort_order ?? 0, req.params.id)
  db.prepare('DELETE FROM story_sections WHERE story_id = ?').run(req.params.id)
  if (sections?.length) {
    const stmt = db.prepare(
      'INSERT INTO story_sections (story_id, sort_order, type, heading, body, "text", author, prompt, response) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )
    sections.forEach((s, i) =>
      stmt.run(Number(req.params.id), i, s.type || 'text', s.heading || '', s.body || '', s.text || '', s.author || '', s.prompt || '', s.response || '')
    )
  }
  res.json({ success: true })
})

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM stories WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

export default router
