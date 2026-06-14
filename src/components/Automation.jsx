import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { revealUp } from '../lib/motion'

const AUTOMATIONS = [
  ['01', 'Workflow design', 'Connect the tools your team already uses and remove repetitive handoffs.', ['Multi-app integration', 'Custom logic', 'Live sync']],
  ['02', 'Data operations', 'Collect, clean, validate, and route information without spreadsheet chaos.', ['ETL pipelines', 'Validation', 'Auto reports']],
  ['03', 'API connections', 'Build reliable bridges between products, platforms, and internal systems.', ['REST APIs', 'Webhooks', 'Custom endpoints']],
]

const TOOLS = [
  ['Slack', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_24_a8a7208838.svg'],
  ['Sheets', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_23_95d19b4191.svg'],
  ['Notion', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_26_e4d668a67e.svg'],
  ['Airtable', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_25_f3164a2781.svg'],
  ['Gmail', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_22_efceea22ad.svg'],
  ['GitHub', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_18_1fc383c5d1.svg'],
  ['Stripe', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_17_55cc3454fb.svg'],
  ['Shopify', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_16_9c0f7c6e53.svg'],
]

function Automation() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="automation" ref={sectionRef} className="section-shell section-rule">
      <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={revealUp} className="section-inner">
        <SectionHeading
          index="06"
          eyebrow="Automation"
          title="Less busywork."
          accent="More flow."
          description="Practical automations that help teams move faster, make fewer mistakes, and spend more time on the work that matters."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {AUTOMATIONS.map(([number, title, description, features], index) => (
            <motion.article
              key={number}
              whileHover={{ y: -7, rotate: 0 }}
              className={`rounded-[2rem] border-2 border-ink p-7 shadow-[7px_7px_0_#241B2F] ${
                index === 0 ? 'bg-sage -rotate-1' : index === 1 ? 'bg-lilac rotate-1' : 'bg-butter -rotate-1'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs">{number}</span>
                <div className="grid size-14 place-items-center rounded-full border-2 border-ink bg-paper">
                  <span className="size-3 rounded-full bg-coral" />
                </div>
              </div>
              <h3 className="display-type mt-14 text-3xl font-extrabold tracking-[-0.05em]">{title}</h3>
              <p className="mt-4 min-h-20 leading-7 text-ink/65">{description}</p>
              <ul className="mt-7 border-t-2 border-ink/20">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 border-b-2 border-ink/15 py-3 text-sm font-semibold">
                    <span className="size-2 rounded-full bg-coral" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="craft-card mt-14 overflow-hidden p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="mono-label text-smoke">Works with your existing tools</p>
            <span className="hidden rounded-full bg-panel px-3 py-1 text-xs font-semibold text-smoke sm:block">8+ integrations</span>
          </div>
          <div className="marquee-mask overflow-hidden">
            <div className={shouldReduceMotion ? 'flex w-max' : 'animate-soft-marquee'}>
              {[0, 1].flatMap((set) =>
                TOOLS.map(([name, logo]) => (
                  <div key={`${set}-${name}`} className="mx-2 flex h-20 w-44 shrink-0 items-center gap-4 rounded-[1.2rem] border-2 border-ink/15 bg-cream px-5">
                    <img src={logo} alt="" className="size-8 object-contain" />
                    <span className="text-sm font-bold">{name}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Automation
