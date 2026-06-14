import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { revealUp } from '../lib/motion'

const NOTES = [
  {
    title: 'Clear before clever',
    text: 'We start by finding the simple idea that everything else can orbit around.',
    color: 'bg-butter',
    rotate: '-rotate-2',
  },
  {
    title: 'One connected world',
    text: 'Brand, web, motion, and automation should feel related, not stitched together.',
    color: 'bg-lilac',
    textColor: 'text-paper',
    rotate: 'rotate-2',
  },
  {
    title: 'Useful and memorable',
    text: 'The work should do its job and still have enough personality to be remembered.',
    color: 'bg-sage',
    rotate: '-rotate-1',
  },
]

function About() {
  const sectionRef = useRef(null)
  const animationFrameRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 })
  const shouldReduceMotion = useReducedMotion()
  const [stats, setStats] = useState({ projects: 0, clients: 0, years: 0 })

  useEffect(() => {
    if (!isInView) return undefined

    const targets = { projects: 150, clients: 50, years: 5 }

    if (shouldReduceMotion) {
      setStats(targets)
      return undefined
    }

    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / 1200, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setStats({
        projects: Math.floor(targets.projects * eased),
        clients: Math.floor(targets.clients * eased),
        years: Math.floor(targets.years * eased),
      })
      if (progress < 1) animationFrameRef.current = requestAnimationFrame(tick)
    }

    animationFrameRef.current = requestAnimationFrame(tick)
    return () => animationFrameRef.current && cancelAnimationFrame(animationFrameRef.current)
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
          eyebrow="A little about us"
          title="Small team."
          accent="Wide horizon."
          description="We bring strategy, design, development, motion, and automation into one close creative partnership."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="craft-card relative overflow-hidden bg-coral p-7 md:p-10">
            <span className="paper-tape left-12 top-0 -translate-y-1/2" />
            <p className="display-type max-w-xl text-3xl font-bold leading-[1.12] tracking-[-0.045em] md:text-5xl">
              We stay close to the idea, move quickly, and care about the details people actually notice.
            </p>
            <div className="mt-12 grid grid-cols-3 border-t-2 border-ink/20 pt-6">
              {[
                [stats.projects, '+', 'Projects'],
                [stats.clients, '+', 'Clients'],
                [stats.years, '+', 'Years'],
              ].map(([value, suffix, label], index) => (
                <div key={label} className={index ? 'border-l-2 border-ink/20 pl-4 md:pl-6' : ''}>
                  <p className="display-type text-3xl font-extrabold tracking-[-0.05em] md:text-5xl">
                    {value}{suffix}
                  </p>
                  <p className="mono-label mt-2 text-ink/60">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {NOTES.map((note, index) => (
              <motion.article
                key={note.title}
                whileHover={{ y: -6, rotate: 0 }}
                className={`relative min-h-64 rounded-[1.5rem] border-2 border-ink p-6 shadow-[6px_6px_0_#241B45] ${note.color} ${note.textColor || 'text-ink'} ${note.rotate} ${
                  index === 2 ? 'sm:col-span-2 sm:min-h-52' : ''
                }`}
              >
                <span className="font-mono text-xs">0{index + 1}</span>
                <div className="mt-14">
                  <h3 className="display-type text-2xl font-bold tracking-[-0.04em] md:text-3xl">{note.title}</h3>
                  <p className={`mt-3 max-w-lg leading-7 ${note.textColor ? 'text-paper/75' : 'text-ink/70'}`}>{note.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default About
