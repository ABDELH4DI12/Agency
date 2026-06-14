import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const NAV_ITEMS = [
  ['Work', '#projects'],
  ['Collections', '#designs'],
  ['Services', '#montage'],
  ['Automation', '#automation'],
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <nav className="mx-auto flex w-full max-w-[82rem] items-center justify-between rounded-[1.4rem] border-2 border-ink bg-paper px-4 py-3 shadow-[5px_5px_0_#241B2F]">
          <a href="#home" className="flex items-center gap-3" aria-label="Creative Horizons home">
            <img src="/logo.png" alt="" className="h-9 w-auto" />
            <span className="hidden font-display text-sm font-extrabold tracking-[-0.025em] text-ink sm:block">
              Creative Horizons
            </span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {NAV_ITEMS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-semibold text-smoke transition hover:-translate-y-0.5 hover:text-ink"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full border-2 border-ink bg-coral px-5 py-2.5 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-butter sm:block"
            >
              Let&apos;s talk ↗
            </a>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="grid size-11 place-items-center rounded-full border-2 border-ink bg-cream lg:hidden"
            >
              <span className="relative block h-4 w-5">
                <span className={`absolute left-0 top-1 h-0.5 w-5 bg-ink transition ${isMenuOpen ? 'translate-y-1 rotate-45' : ''}`} />
                <span className={`absolute bottom-1 left-0 h-0.5 w-5 bg-ink transition ${isMenuOpen ? '-translate-y-1 -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-lilac px-5 pb-8 pt-28 lg:hidden"
          >
            <nav className="mx-auto flex h-full max-w-xl flex-col justify-between">
              <div>
                {[...NAV_ITEMS, ['Contact', '#contact']].map(([label, href], index) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between border-b-2 border-ink/25 py-5"
                  >
                    <span className="font-display text-4xl font-bold tracking-[-0.05em]">{label}</span>
                    <span className="font-mono text-xs">0{index + 1}</span>
                  </a>
                ))}
              </div>
              <div className="craft-card flex items-center justify-between p-4 text-sm font-semibold">
                <span>Based in Morocco</span>
                <span className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-coral" />
                  Available
                </span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
