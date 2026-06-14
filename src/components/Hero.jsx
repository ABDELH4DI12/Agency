/* eslint-disable react/prop-types */
import { motion, useReducedMotion } from 'framer-motion'
import { revealUp } from '../lib/motion'

const STUDIO_CARDS = [
  {
    title: 'Identity systems',
    label: 'Brand',
    color: 'bg-lilac',
    position: 'left-[7%] top-[2%] rotate-[-7deg]',
    tape: 'left-1/2 -translate-x-1/2 -translate-y-1/2',
    visual: 'identity',
  },
  {
    title: 'Digital experiences',
    label: 'Web',
    color: 'bg-sage',
    position: 'right-[2%] top-[25%] rotate-[6deg]',
    tape: 'right-8 -translate-y-1/2 rotate-[7deg]',
    visual: 'digital',
  },
  {
    title: 'Smart workflows',
    label: 'Automation',
    color: 'bg-butter',
    position: 'bottom-[1%] left-[17%] rotate-[-2deg]',
    tape: 'left-8 -translate-y-1/2 rotate-[-8deg]',
    visual: 'automation',
  },
]

function Hero() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-5 pb-16 pt-32 md:px-10 md:pt-40">
      <div className="absolute -left-24 top-36 size-64 rounded-full bg-coral/20 blur-3xl" />
      <div className="absolute -right-24 bottom-10 size-80 rounded-full bg-sage/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-[82rem] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial="hidden" animate="visible" variants={revealUp}>
          <p className="eyebrow text-coral">Independent creative studio</p>
          <h1 className="display-type mt-7 text-balance text-[clamp(3.5rem,7vw,7rem)] font-extrabold leading-[0.93] tracking-[-0.07em] text-ink">
            Big ideas,
            <br />
            made <span className="scribble">human.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-smoke">
            One studio for brand identity, digital products, visual storytelling, and automation that makes the work around them run better.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-ink bg-ink px-6 py-3 text-sm font-bold text-paper shadow-[4px_4px_0_#FF7657] transition hover:-translate-y-1"
            >
              See what we make
              <span className="ml-3">↓</span>
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-ink bg-paper px-6 py-3 text-sm font-bold text-ink transition hover:-translate-y-1 hover:bg-butter"
            >
              Start a project ↗
            </a>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3">
            {['Brand identity', 'Web design', 'Motion', 'Automation'].map((item, index) => (
              <span key={item} className="mono-label flex items-center gap-2 text-smoke">
                <span className={`size-2 rounded-full ${index % 2 ? 'bg-sage' : 'bg-coral'}`} />
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.12 }}
          className="relative mx-auto h-[29rem] w-full max-w-[36rem] sm:h-[34rem] md:h-[38rem]"
          aria-label="Creative Horizons capabilities"
        >
          {STUDIO_CARDS.map((card) => (
            <div
              key={card.title}
              className={`absolute rounded-[2rem] border-2 border-ink p-3 shadow-[9px_9px_0_#241B2F] ${card.color} ${card.position}`}
            >
              <span className={`paper-tape top-0 ${card.tape}`} />
              <StudioCard {...card} />
            </div>
          ))}
          <div className="absolute right-[8%] top-[3%] rotate-[8deg] rounded-full border-2 border-ink bg-coral px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider">
            Built with care
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StudioCard({ title, label, visual }) {
  return (
    <div className="w-48 sm:w-64">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border-2 border-ink bg-paper/75 p-4">
        {visual === 'identity' && (
          <div className="grid h-full grid-cols-[1fr_auto] gap-3">
            <div className="grid place-items-center rounded-2xl bg-ink font-display text-5xl font-extrabold text-paper">CH</div>
            <div className="flex flex-col justify-between py-1">
              {['bg-coral', 'bg-lilac', 'bg-sage', 'bg-butter'].map((color) => (
                <span key={color} className={`size-7 rounded-full border border-ink ${color}`} />
              ))}
            </div>
          </div>
        )}
        {visual === 'digital' && (
          <div className="h-full rounded-xl border-2 border-ink bg-cream">
            <div className="flex h-7 items-center gap-1.5 border-b-2 border-ink px-2">
              <span className="size-2 rounded-full bg-coral" />
              <span className="size-2 rounded-full bg-butter" />
              <span className="size-2 rounded-full bg-sage" />
            </div>
            <div className="grid h-[calc(100%_-_1.75rem)] grid-cols-[0.65fr_1fr] gap-2 p-3">
              <div className="rounded-lg bg-lilac" />
              <div className="space-y-2 pt-2">
                <div className="h-3 w-4/5 rounded-full bg-ink" />
                <div className="h-2 rounded-full bg-ink/20" />
                <div className="h-2 w-3/4 rounded-full bg-ink/20" />
                <div className="mt-4 h-7 w-20 rounded-full bg-coral" />
              </div>
            </div>
          </div>
        )}
        {visual === 'automation' && (
          <div className="relative h-full">
            <span className="absolute left-[18%] top-1/2 h-0.5 w-[64%] -translate-y-1/2 bg-ink/40" />
            <span className="absolute left-1/2 top-[20%] h-[60%] w-0.5 -translate-x-1/2 bg-ink/40" />
            {[
              'left-[8%] top-[35%] bg-coral',
              'right-[8%] top-[35%] bg-lilac',
              'left-[40%] top-[4%] bg-sage',
              'bottom-[4%] left-[40%] bg-paper',
              'left-[40%] top-[35%] bg-ink text-paper',
            ].map((position, index) => (
              <span key={position} className={`absolute grid size-12 place-items-center rounded-xl border-2 border-ink font-mono text-xs font-bold ${position}`}>
                {index + 1}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between px-2 pb-1 pt-3">
        <span className="max-w-[10rem] truncate text-sm font-bold">{title}</span>
        <span className="rounded-full border border-ink/30 px-2 py-1 font-mono text-[0.58rem] uppercase">{label}</span>
      </div>
    </div>
  )
}

export default Hero
