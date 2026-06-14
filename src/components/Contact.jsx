import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { revealUp } from '../lib/motion'

function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section id="contact" ref={sectionRef} className="section-shell section-rule">
      <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={revealUp} className="section-inner">
        <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-ink bg-coral p-7 shadow-[10px_10px_0_#241B2F] md:p-12 lg:p-16">
          <span className="paper-tape left-20 top-0 -translate-y-1/2" />
          <div className="absolute -right-20 -top-20 size-72 rounded-full border-2 border-ink/15" />
          <div className="absolute -right-5 top-10 size-44 rounded-full border-2 border-ink/15" />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_20rem] lg:items-end">
            <div>
              <p className="eyebrow">Have something in mind?</p>
              <h2 className="display-type mt-7 max-w-4xl text-balance text-5xl font-extrabold leading-[0.93] tracking-[-0.065em] md:text-7xl lg:text-8xl">
                Let&apos;s make it feel <span className="scribble">special.</span>
              </h2>
            </div>
            <div>
              <p className="leading-7 text-ink/70">Tell us what you are building, where it feels stuck, or what you want people to feel next.</p>
              <a href="mailto:hello@creative.agency" className="mt-7 flex min-h-14 items-center justify-between rounded-full border-2 border-ink bg-paper px-5 text-sm font-bold transition hover:-translate-y-1 hover:bg-butter">
                hello@creative.agency
                <span className="text-xl">↗</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
