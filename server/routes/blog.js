import { Router } from 'express'
import db from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Public: blog listing
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT id, slug, date, tag, title, "desc" as desc, color FROM blog_posts ORDER BY sort_order, id').all()
  res.json(rows)
})

// Public: featured posts for homepage updates section
router.get('/featured', (req, res) => {
  const rows = db.prepare('SELECT id, slug, date, tag, title, "desc" as desc, color, image FROM blog_posts WHERE featured = 1 ORDER BY sort_order, id').all()
  res.json(rows)
})

// Public: single post with sections (must be after /featured)
router.get('/post/:slug', (req, res) => {
  const post = db.prepare('SELECT * FROM blog_posts WHERE slug = ?').get(req.params.slug)
  if (!post) return res.status(404).json({ error: 'Not found' })
  const sections = db.prepare('SELECT * FROM blog_sections WHERE post_id = ? ORDER BY sort_order, id').all(post.id)
  res.json({ ...post, sections })
})

// Admin: all posts with all fields
router.get('/all', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM blog_posts ORDER BY sort_order, id').all()
  res.json(rows)
})

// Admin: single post with sections for editing
router.get('/edit/:id', requireAuth, (req, res) => {
  const post = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(req.params.id)
  if (!post) return res.status(404).json({ error: 'Not found' })
  const sections = db.prepare('SELECT * FROM blog_sections WHERE post_id = ? ORDER BY sort_order, id').all(post.id)
  res.json({ ...post, sections })
})

router.post('/', requireAuth, (req, res) => {
  const { slug, date, tag, title, desc, color, image, heroImage, intro, featured, sort_order, sections } = req.body
  if (!slug || !title) return res.status(400).json({ error: 'Slug and title required' })
  const result = db.prepare(
    'INSERT INTO blog_posts (slug, date, tag, title, "desc", color, image, heroImage, intro, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(slug, date || '', tag || '', title, desc || '', color || '#818cf8', image || '', heroImage || '', intro || '', featured ? 1 : 0, sort_order || 0)
  if (sections?.length) {
    const stmt = db.prepare('INSERT INTO blog_sections (post_id, sort_order, heading, body) VALUES (?, ?, ?, ?)')
    sections.forEach((s, i) => stmt.run(Number(result.lastInsertRowid), i, s.heading || '', s.body || ''))
  }
  res.json({ id: Number(result.lastInsertRowid) })
})

router.put('/:id', requireAuth, (req, res) => {
  const { slug, date, tag, title, desc, color, image, heroImage, intro, featured, sort_order, sections } = req.body
  db.prepare(
    'UPDATE blog_posts SET slug=?, date=?, tag=?, title=?, "desc"=?, color=?, image=?, heroImage=?, intro=?, featured=?, sort_order=? WHERE id=?'
  ).run(slug, date || '', tag || '', title || '', desc || '', color || '#818cf8', image || '', heroImage || '', intro || '', featured ? 1 : 0, sort_order ?? 0, req.params.id)
  db.prepare('DELETE FROM blog_sections WHERE post_id = ?').run(req.params.id)
  if (sections?.length) {
    const stmt = db.prepare('INSERT INTO blog_sections (post_id, sort_order, heading, body) VALUES (?, ?, ?, ?)')
    sections.forEach((s, i) => stmt.run(Number(req.params.id), i, s.heading || '', s.body || ''))
  }
  res.json({ success: true })
})

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM blog_posts WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

export default router
