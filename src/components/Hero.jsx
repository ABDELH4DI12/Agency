import { motion, useReducedMotion } from 'framer-motion'
import { revealUp } from '../lib/motion'

const CAPABILITIES = ['Brand systems', 'Digital products', 'Motion stories', 'Smart workflows']

function Hero() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-5 pb-12 pt-32 md:px-12 md:pb-16 md:pt-40">
      <div className="pointer-events-none absolute -right-40 top-28 size-[34rem] rounded-full border border-electric/20 md:size-[46rem]">
        <div className={`absolute inset-12 rounded-full border border-white/10 ${shouldReduceMotion ? '' : 'orbit-slow'}`}>
          <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid shadow-[0_0_30px_rgba(216,255,62,0.6)]" />
        </div>
        <div className="absolute inset-28 rounded-full bg-electric/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-11rem)] max-w-[88rem] content-between gap-16">
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_20rem]">
          <div>
            <motion.div initial="hidden" animate="visible" variants={revealUp}>
              <p className="eyebrow">Independent creative agency</p>
              <h1 className="mt-8 max-w-6xl text-balance text-[clamp(3.45rem,11vw,10rem)] font-semibold leading-[0.78] tracking-[-0.075em] text-paper">
                Ideas, built
                <br />
                with <span className="display-serif italic font-normal text-electric">nerve.</span>
              </h1>
            </motion.div>
          </div>

          <motion.aside
            initial="hidden"
            animate="visible"
            variants={revealUp}
            custom={shouldReduceMotion ? 0 : 0.12}
            className="relative z-10 border-l border-white/15 pl-6"
          >
            <p className="max-w-xs text-base leading-7 text-smoke">
              Creative Horizons builds bold identities, digital experiences, visual campaigns, and automation systems for ambitious brands.
            </p>
            <a
              href="#projects"
              className="signal-line mt-8 inline-flex items-center gap-4 pb-3 text-sm font-bold uppercase tracking-[0.14em] text-paper"
            >
              Explore selected work
              <span className="grid size-9 place-items-center rounded-full border border-white/20">↓</span>
            </a>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 0.2 }}
          className="grid gap-6 border-t border-white/15 pt-6 md:grid-cols-[1fr_auto]"
        >
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {CAPABILITIES.map((capability, index) => (
              <span key={capability} className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-smoke">
                <span className={index === 0 ? 'size-1.5 rounded-full bg-acid' : 'size-1.5 rounded-full bg-white/25'} />
                {capability}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-smoke">
            <span>Scroll to discover</span>
            <span className="h-px w-12 bg-white/25" />
            <span className="font-mono text-paper">01—08</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
