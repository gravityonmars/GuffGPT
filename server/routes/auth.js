import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'
import db from '../db.js'
import { JWT_SECRET } from '../middleware/auth.js'

const router = Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts, try again later' },
})

router.post('/login', loginLimiter, (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' })
  }
  const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username)
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' })
  res.json({ token, username: user.username })
})

router.post('/change-password', (req, res) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET)
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'Valid current and new password required (min 6 chars)' })
    }
    const user = db.prepare('SELECT * FROM admin_users WHERE id = ?').get(payload.id)
    if (!user || !bcrypt.compareSync(currentPassword, user.password_hash)) {
      return res.status(401).json({ error: 'Current password is incorrect' })
    }
    const hash = bcrypt.hashSync(newPassword, 10)
    db.prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?').run(hash, payload.id)
    res.json({ success: true })
  } catch {
    return res.status(401).json({ error: 'Invalid token' })
  }
})

export default router
