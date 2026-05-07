import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import path from 'path'
import authRoutes from './routes/auth.js'
import featuresRoutes from './routes/features.js'
import statsRoutes from './routes/stats.js'
import storiesRoutes from './routes/stories.js'
import blogRoutes from './routes/blog.js'
import faqRoutes from './routes/faq.js'
import db from './db.js'

const app = express()
const PORT = process.env.PORT || 3001
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(cors())
app.use(express.json({ limit: '10mb' }))

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/features', featuresRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/stories', storiesRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/faq', faqRoutes)

// Dashboard counts
app.get('/api/dashboard', (req, res) => {
  res.json({
    features: db.prepare('SELECT COUNT(*) as c FROM features').get().c,
    stats: db.prepare('SELECT COUNT(*) as c FROM stats').get().c,
    stories: db.prepare('SELECT COUNT(*) as c FROM stories').get().c,
    blogPosts: db.prepare('SELECT COUNT(*) as c FROM blog_posts').get().c,
    faqs: db.prepare('SELECT COUNT(*) as c FROM faqs').get().c,
  })
})

// Serve static files in production
const distPath = path.join(__dirname, '..', 'dist')
app.use(express.static(distPath))
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
