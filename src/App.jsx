import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Story from './pages/Story'
import BlogPost from './pages/BlogPost'

// Admin imports
import { AuthProvider } from './admin/AuthContext'
import AdminLayout from './admin/AdminLayout'
import Login from './admin/Login'
import Dashboard from './admin/Dashboard'
import FeaturesAdmin from './admin/FeaturesAdmin'
import StatsAdmin from './admin/StatsAdmin'
import FAQAdmin from './admin/FAQAdmin'
import BlogAdmin from './admin/BlogAdmin'
import StoriesAdmin from './admin/StoriesAdmin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#18181b] text-neutral-400" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Navbar />
      <Outlet />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          {/* Public site */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/stories/:slug" element={<Story />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Route>

          {/* Admin panel */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="features" element={<FeaturesAdmin />} />
            <Route path="stats" element={<StatsAdmin />} />
            <Route path="faq" element={<FAQAdmin />} />
            <Route path="blog" element={<BlogAdmin />} />
            <Route path="stories" element={<StoriesAdmin />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
