import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { hoverLift, revealUp } from '../lib/motion'

const SERVICES = [
  {
    title: 'Editorial rhythm',
    description: 'Cuts and transitions designed around pace, emphasis, and attention.',
    meta: 'Edit direction',
  },
  {
    title: 'Cinematic color',
    description: 'Color systems that establish atmosphere and make every frame feel authored.',
    meta: 'Color grading',
  },
  {
    title: 'Visual effects',
    description: 'Compositing and crafted moments that heighten the idea without overwhelming it.',
    meta: 'VFX',
  },
  {
    title: 'Sound architecture',
    description: 'Music, texture, and spatial sound used to give the work emotional weight.',
    meta: 'Sound design',
  },
  {
    title: 'Narrative shape',
    description: 'Strong story arcs that turn raw material into a clear, memorable progression.',
    meta: 'Storytelling',
  },
  {
    title: 'Motion language',
    description: 'Reusable movement principles that make a brand recognizable even without a logo.',
    meta: 'Motion systems',
  },
]

function Montage() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 })

  return (
    <section id="montage" ref={sectionRef} className="section-shell section-rule">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={revealUp}
        className="section-inner"
      >
        <SectionHeading
          index="04"
          eyebrow="Motion and montage"
          title="We edit for the"
          accent="feeling after."
          description="Not movement for its own sake. We shape rhythm, sound, color, and narrative so the final piece stays with the viewer."
        />

        <div className="mt-20 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/15 bg-electric p-7 text-ink md:p-10">
            <div className="absolute -right-20 -top-20 size-72 rounded-full border border-ink/20" />
            <div className="absolute -right-6 top-16 size-44 rounded-full border border-ink/25" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.16em]">Creative Horizons / Motion</span>
                <span className="font-mono text-xs">04</span>
              </div>
              <div>
                <p className="display-serif text-5xl leading-[0.9] md:text-7xl">
                  Frame by frame.
                  <br />
                  Beat by beat.
                </p>
                <div className="mt-10 flex items-end gap-1">
                  {[24, 54, 34, 76, 45, 92, 61, 34, 70, 44, 82, 28].map((height, index) => (
                    <span
                      key={`${height}-${index}`}
                      className="block w-full rounded-full bg-ink"
                      style={{ height: `${height}px`, opacity: 0.3 + index * 0.04 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {SERVICES.map((service, index) => (
              <motion.article
                key={service.title}
                whileHover={hoverLift}
                className="group surface-card flex min-h-64 flex-col justify-between rounded-[2rem] p-6 md:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-smoke">0{index + 1}</span>
                  <span className="size-2 rounded-full bg-electric transition group-hover:bg-acid" />
                </div>
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-acid">{service.meta}</p>
                  <h3 className="signal-line mt-3 inline-block pb-3 text-2xl font-semibold tracking-[-0.04em] text-paper">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-smoke">{service.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Montage
