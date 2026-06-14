import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { revealUp } from '../lib/motion'

const PRINCIPLES = [
  ['01', 'Clarity before decoration', 'Every visual decision begins with the message and the audience.'],
  ['02', 'Systems over fragments', 'Identity, product, motion, and automation should feel like one connected world.'],
  ['03', 'Momentum by design', 'We build work that is expressive, usable, and ready to move a business forward.'],
]

function About() {
  const sectionRef = useRef(null)
  const animationFrameRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })
  const shouldReduceMotion = useReducedMotion()
  const [stats, setStats] = useState({ projects: 0, clients: 0, years: 0 })

  useEffect(() => {
    if (!isInView) {
      return undefined
    }

    const targets = { projects: 150, clients: 50, years: 5 }

    if (shouldReduceMotion) {
      setStats(targets)
      return undefined
    }

    const duration = 1400
    const startTime = performance.now()

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setStats({
        projects: Math.floor(targets.projects * eased),
        clients: Math.floor(targets.clients * eased),
        years: Math.floor(targets.years * eased),
      })

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isInView, shouldReduceMotion])

  return (
    <section id="about" ref={sectionRef} className="section-shell section-rule">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={revealUp}
        className="section-inner"
      >
        <SectionHeading
          index="01"
          eyebrow="How we think"
          title="A studio for brands that"
          accent="refuse sameness."
          description="We combine strategy, design, technology, and motion to create work that earns attention and keeps delivering after launch."
        />

        <div className="mt-20 grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <div>
            <p className="display-serif text-balance text-3xl leading-[1.12] text-paper md:text-5xl">
              We are small enough to stay close to the idea and experienced enough to carry it across every touchpoint.
            </p>
            <div className="mt-12 grid grid-cols-3 border-y border-white/15">
              {[
                [stats.projects, '+', 'Projects'],
                [stats.clients, '+', 'Clients'],
                [stats.years, '+', 'Years'],
              ].map(([value, suffix, label], index) => (
                <div
                  key={label}
                  className={`py-6 ${index > 0 ? 'border-l border-white/15 pl-5 md:pl-7' : ''}`}
                >
                  <div className="text-3xl font-semibold tracking-[-0.05em] text-paper md:text-5xl">
                    {value}
                    <span className="text-acid">{suffix}</span>
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-smoke">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/15">
            {PRINCIPLES.map(([number, title, description]) => (
              <article
                key={number}
                className="group grid gap-4 border-b border-white/15 py-7 sm:grid-cols-[3.5rem_1fr]"
              >
                <span className="font-mono text-xs text-electric">{number}</span>
                <div>
                  <h3 className="signal-line inline-block pb-3 text-xl font-semibold tracking-[-0.03em] text-paper md:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-xl leading-7 text-smoke">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default About
