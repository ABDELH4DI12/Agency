import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { revealUp } from '../lib/motion'

const SERVICES = [
  ['01', 'Editorial rhythm', 'Cuts, pacing, and transitions that make the story feel natural.'],
  ['02', 'Cinematic color', 'Color direction that gives every frame a clear atmosphere.'],
  ['03', 'Visual effects', 'Crafted moments that add wonder without distracting from the idea.'],
  ['04', 'Sound design', 'Music and texture that give the work weight, pace, and emotion.'],
  ['05', 'Story structure', 'A strong beginning, middle, and end shaped from raw material.'],
  ['06', 'Motion systems', 'Reusable movement rules that make a brand feel recognizable.'],
]

function Montage() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 })

  return (
    <section id="montage" ref={sectionRef} className="section-shell section-rule">
      <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={revealUp} className="section-inner">
        <SectionHeading
          index="04"
          eyebrow="Motion and montage"
          title="Stories with"
          accent="rhythm."
          description="We shape footage, color, sound, and motion into pieces that feel intentional from the first frame to the last."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[32rem] overflow-hidden rounded-[2rem] border-2 border-ink bg-ink p-7 text-paper shadow-[8px_8px_0_#FF7657] md:p-10">
            <span className="paper-tape left-12 top-0 -translate-y-1/2" />
            <div className="flex h-full flex-col justify-between">
              <div className="flex justify-between font-mono text-xs uppercase tracking-wider text-paper/60">
                <span>Creative Horizons / Motion</span>
                <span>REC ●</span>
              </div>
              <div>
                <p className="display-type text-5xl font-bold leading-[0.95] tracking-[-0.055em] md:text-7xl">
                  Frame.
                  <br />
                  Beat.
                  <br />
                  Feeling.
                </p>
                <div className="mt-10 flex h-24 items-end gap-1.5">
                  {[30, 62, 42, 84, 55, 92, 68, 38, 74, 50, 88, 34].map((height, index) => (
                    <span key={`${height}-${index}`} className={`w-full rounded-full ${index % 3 === 0 ? 'bg-coral' : index % 3 === 1 ? 'bg-lilac' : 'bg-sage'}`} style={{ height }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {SERVICES.map(([number, title, description], index) => (
              <motion.article
                key={title}
                whileHover={{ y: -6, rotate: 0 }}
                className={`rounded-[1.5rem] border-2 border-ink p-6 shadow-[5px_5px_0_#241B2F] ${
                  index % 3 === 0 ? 'bg-lilac -rotate-1' : index % 3 === 1 ? 'bg-paper rotate-1' : 'bg-sage -rotate-1'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs">{number}</span>
                  <span className="size-3 rounded-full border-2 border-ink bg-coral" />
                </div>
                <h3 className="display-type mt-12 text-2xl font-bold tracking-[-0.04em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/65">{description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Montage
