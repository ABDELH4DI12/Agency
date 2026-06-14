const FOOTER_LINKS = [
  ['Projects', '#projects'],
  ['Collections', '#designs'],
  ['Motion', '#montage'],
  ['Automation', '#automation'],
  ['Contact', '#contact'],
]

function Footer() {
  return (
    <footer className="border-t border-white/15 px-5 py-10 md:px-12 md:py-14">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <a href="#home" className="inline-flex items-center gap-4" aria-label="Creative Horizons home">
              <img src="/logo.png" alt="" className="h-11 w-auto" />
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-paper">Creative Horizons</span>
            </a>
            <p className="mt-6 max-w-md text-sm leading-6 text-smoke">
              An independent creative agency shaping identities, digital products, campaigns, motion, and smarter workflows.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm sm:grid-cols-3 lg:grid-cols-2">
            {FOOTER_LINKS.map(([label, href]) => (
              <a key={href} href={href} className="text-smoke transition-colors hover:text-paper">
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs uppercase tracking-[0.14em] text-smoke sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Creative Horizons</span>
          <span>Made with intent in Morocco</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
