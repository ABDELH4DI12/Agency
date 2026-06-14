import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const NAV_ITEMS = [
  ['Work', '#projects'],
  ['Collections', '#designs'],
  ['Services', '#montage'],
  ['Automation', '#automation'],
  ['Contact', '#contact'],
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
        <nav className="mx-auto flex w-full max-w-[88rem] items-center justify-between rounded-full border border-white/10 bg-ink/80 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl md:px-5">
          <a href="#home" className="flex items-center gap-3" aria-label="Creative Horizons home">
            <img src="/logo.png" alt="" className="h-8 w-auto md:h-9" />
            <span className="hidden text-[0.67rem] font-bold uppercase tracking-[0.2em] text-paper lg:block">
              Creative Horizons
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-smoke transition-colors hover:text-paper"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-full bg-paper px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-ink transition hover:bg-acid sm:flex"
            >
              Start a project
              <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="grid size-10 place-items-center rounded-full border border-white/15 text-paper lg:hidden"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 top-1 h-px w-5 bg-current transition ${
                    isMenuOpen ? 'translate-y-1 rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute bottom-1 left-0 h-px w-5 bg-current transition ${
                    isMenuOpen ? '-translate-y-1 -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink px-5 pb-8 pt-28 lg:hidden"
          >
            <div className="mx-auto flex h-full max-w-2xl flex-col justify-between">
              <div className="border-t border-white/15">
                {NAV_ITEMS.map(([label, href], index) => (
                  <motion.a
                    key={href}
                    href={href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-center justify-between border-b border-white/15 py-5"
                  >
                    <span className="text-4xl font-semibold tracking-[-0.05em] text-paper">
                      {label}
                    </span>
                    <span className="font-mono text-xs text-smoke">0{index + 1}</span>
                  </motion.a>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-smoke">
                <span>Based in Morocco</span>
                <span className="flex items-center gap-2 text-paper">
                  <span className="size-2 rounded-full bg-acid" />
                  Available
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
