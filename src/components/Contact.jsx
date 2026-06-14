import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { revealUp } from '../lib/motion'

function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.18 })

  return (
    <section id="contact" ref={sectionRef} className="section-shell section-rule">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={revealUp}
        className="section-inner"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] bg-paper p-7 text-ink md:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-24 -top-32 size-[30rem] rounded-full border border-ink/10" />
          <div className="pointer-events-none absolute -right-5 top-12 size-72 rounded-full border border-ink/10" />

          <div className="relative grid gap-16 lg:grid-cols-[1fr_19rem] lg:items-end">
            <div>
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]">
                <span className="h-px w-8 bg-ink" />
                Start a conversation
              </p>
              <h2 className="mt-8 max-w-5xl text-balance text-6xl font-semibold leading-[0.82] tracking-[-0.07em] md:text-8xl lg:text-[8.5rem]">
                Let&apos;s make
                <br />
                something <span className="display-serif italic font-normal text-electric">matter.</span>
              </h2>
            </div>

            <div>
              <p className="text-base leading-7 text-ink/65">
                Tell us what you are building, what is not working, or where you want the brand to go next.
              </p>
              <a
                href="mailto:hello@creative.agency"
                className="mt-8 flex items-center justify-between gap-5 rounded-full bg-ink px-6 py-4 text-sm font-bold text-paper transition hover:bg-electric"
              >
                hello@creative.agency
                <span className="text-xl">↗</span>
              </a>
            </div>
          </div>

          <div className="relative mt-16 flex flex-col gap-4 border-t border-ink/15 pt-6 text-xs font-semibold uppercase tracking-[0.14em] text-ink/60 sm:flex-row sm:items-center sm:justify-between">
            <span>Brand · Web · Motion · Automation</span>
            <span className="flex items-center gap-2 text-ink">
              <span className="size-2 rounded-full bg-electric" />
              Taking on new projects
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
