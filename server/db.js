import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const db = new Database(path.join(__dirname, 'data.db'))

db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS features (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sort_order INTEGER DEFAULT 0,
    emoji TEXT NOT NULL DEFAULT '',
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL DEFAULT '',
    "desc" TEXT NOT NULL DEFAULT '',
    color TEXT NOT NULL DEFAULT '#818cf8',
    prompt TEXT NOT NULL DEFAULT '',
    response TEXT NOT NULL DEFAULT '',
    tag TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sort_order INTEGER DEFAULT 0,
    value INTEGER NOT NULL DEFAULT 0,
    suffix TEXT NOT NULL DEFAULT '+',
    label TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS stories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sort_order INTEGER DEFAULT 0,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT '',
    heroImage TEXT NOT NULL DEFAULT '',
    gradient TEXT NOT NULL DEFAULT '',
    accent TEXT NOT NULL DEFAULT '#818cf8'
  );

  CREATE TABLE IF NOT EXISTS story_sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    story_id INTEGER NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    type TEXT NOT NULL DEFAULT 'text',
    heading TEXT DEFAULT '',
    body TEXT DEFAULT '',
    "text" TEXT DEFAULT '',
    author TEXT DEFAULT '',
    prompt TEXT DEFAULT '',
    response TEXT DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sort_order INTEGER DEFAULT 0,
    slug TEXT UNIQUE NOT NULL,
    date TEXT NOT NULL,
    tag TEXT NOT NULL DEFAULT '',
    title TEXT NOT NULL,
    "desc" TEXT NOT NULL DEFAULT '',
    color TEXT NOT NULL DEFAULT '#818cf8',
    image TEXT DEFAULT '',
    heroImage TEXT DEFAULT '',
    intro TEXT DEFAULT '',
    featured INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS blog_sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    heading TEXT NOT NULL DEFAULT '',
    body TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS faqs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sort_order INTEGER DEFAULT 0,
    q TEXT NOT NULL,
    a TEXT NOT NULL
  );
`)

export default db
