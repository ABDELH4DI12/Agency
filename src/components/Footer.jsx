const LINKS = [['Work', '#projects'], ['Collections', '#designs'], ['Motion', '#montage'], ['Automation', '#automation'], ['Contact', '#contact']]

function Footer() {
  return (
    <footer className="border-t-2 border-ink/15 bg-paper px-5 py-12 md:px-10">
      <div className="mx-auto max-w-[82rem]">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <a href="#home" className="inline-flex items-center gap-4">
              <img src="/logo.png" alt="" className="h-12 w-auto" />
              <span className="display-type text-xl font-extrabold">Creative Horizons</span>
            </a>
            <p className="mt-5 max-w-md text-sm leading-6 text-smoke">A close creative partner for brands, digital products, visual stories, and smarter systems.</p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-3">
            {LINKS.map(([label, href]) => <a key={href} href={href} className="text-sm font-semibold text-smoke transition hover:text-coral">{label}</a>)}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t-2 border-ink/10 pt-6 font-mono text-[0.65rem] uppercase tracking-wider text-smoke sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Creative Horizons</span>
          <span>Made thoughtfully in Morocco</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
