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

const EMPTY_CONTENT = {
  websites: [],
  collections: [],
  marchendise: [],
}

const CONTENT_LOAD_ATTEMPTS = 3

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
      let lastError

      for (let attempt = 0; attempt < CONTENT_LOAD_ATTEMPTS; attempt += 1) {
        try {
          const response = await fetch('/api/content', {
            signal: controller.signal,
            cache: 'no-store',
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
          return
        } catch (error) {
          if (error.name === 'AbortError') {
            return
          }

          lastError = error

          if (attempt < CONTENT_LOAD_ATTEMPTS - 1) {
            await new Promise((resolve) => {
              const timeoutId = window.setTimeout(resolve, 500 * (attempt + 1))
              controller.signal.addEventListener('abort', () => {
                window.clearTimeout(timeoutId)
                resolve()
              }, { once: true })
            })

            if (controller.signal.aborted) {
              return
            }
          }
        }
      }

      setContent(EMPTY_CONTENT)
      setContentStatus({
        isLoading: false,
        error: lastError?.message || 'Unable to load website content.',
      })
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
    <div className="site-shell min-h-screen overflow-x-hidden">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Projects websites={content.websites} isLoading={contentStatus.isLoading} error={contentStatus.error} />
        <Designs collections={content.collections} isLoading={contentStatus.isLoading} error={contentStatus.error} />
        <Montage />
        <Photography />
        <Automation />
        <Printing items={content.marchendise} isLoading={contentStatus.isLoading} error={contentStatus.error} />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
