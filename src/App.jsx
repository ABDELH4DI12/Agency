import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Designs from './components/Designs'
import Montage from './components/Montage'
import Photography from './components/Photography'
import Automation from './components/Automation'
import Printing from './components/Printing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'
import './App.css'

const EMPTY_CONTENT = {
  websites: [],
  collections: [],
  marchendise: [],
}

function App() {
  const currentPath = window.location.pathname.toLowerCase()
  const currentHash = window.location.hash.toLowerCase()
  const isAdminPanel = currentPath.startsWith('/admin') || currentHash === '#admin'
  const [content, setContent] = useState(EMPTY_CONTENT)
  const [contentStatus, setContentStatus] = useState({
    isLoading: !isAdminPanel,
    error: '',
  })

  useEffect(() => {
    if (isAdminPanel) {
      return undefined
    }

    const controller = new AbortController()

    async function loadContent() {
      setContentStatus({ isLoading: true, error: '' })

      try {
        const response = await fetch('/api/content', {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        })
        const payload = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(payload.message || 'Unable to load website content.')
        }

        setContent({
          websites: payload.websites || [],
          collections: payload.collections || [],
          marchendise: payload.marchendise || [],
        })
        setContentStatus({ isLoading: false, error: '' })
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        setContent(EMPTY_CONTENT)
        setContentStatus({
          isLoading: false,
          error: error.message || 'Unable to load website content.',
        })
      }
    }

    loadContent()

    return () => {
      controller.abort()
    }
  }, [isAdminPanel])

  if (isAdminPanel) {
    return <AdminPanel />
  }

  return (
    <div className="bg-gray-950 text-white font-outfit overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects websites={content.websites} isLoading={contentStatus.isLoading} error={contentStatus.error} />
      <Designs collections={content.collections} isLoading={contentStatus.isLoading} error={contentStatus.error} />
      <Montage />
      <Photography />
      <Automation />
      <Printing items={content.marchendise} isLoading={contentStatus.isLoading} error={contentStatus.error} />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
