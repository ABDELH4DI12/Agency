import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { hoverLift, revealUp } from '../lib/motion'

const AUTOMATIONS = [
  {
    number: '01',
    title: 'Workflow orchestration',
    description: 'Connect tools, remove repetitive handoffs, and create reliable operating flows across the business.',
    features: ['Multi-app integration', 'Custom logic', 'Real-time sync'],
  },
  {
    number: '02',
    title: 'Data operations',
    description: 'Collect, clean, validate, and route information so teams spend less time managing spreadsheets.',
    features: ['ETL pipelines', 'Validation', 'Automated reporting'],
  },
  {
    number: '03',
    title: 'API ecosystems',
    description: 'Build durable connections between products, platforms, and internal systems without brittle workarounds.',
    features: ['REST APIs', 'Webhooks', 'Custom endpoints'],
  },
]

const TOOLS = [
  ['Slack', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_24_a8a7208838.svg'],
  ['Sheets', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_23_95d19b4191.svg'],
  ['Notion', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_26_e4d668a67e.svg'],
  ['Airtable', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_25_f3164a2781.svg'],
  ['Gmail', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_22_efceea22ad.svg'],
  ['Trello', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_21_02a1829358.svg'],
  ['GitHub', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_18_1fc383c5d1.svg'],
  ['Stripe', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_17_55cc3454fb.svg'],
  ['Shopify', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_16_9c0f7c6e53.svg'],
  ['HubSpot', 'https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_15_6c95309bf4.svg'],
]

function Automation() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="automation" ref={sectionRef} className="section-shell section-rule">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={revealUp}
        className="section-inner"
      >
        <SectionHeading
          index="06"
          eyebrow="Automation"
          title="Less busywork."
          accent="More momentum."
          description="We design practical automation systems that connect the tools you already use and give your team time back."
        />

        <div className="mt-20 grid gap-5 lg:grid-cols-3">
          {AUTOMATIONS.map((automation) => (
            <motion.article
              key={automation.number}
              whileHover={hoverLift}
              className="group surface-card flex min-h-[31rem] flex-col justify-between rounded-[2rem] p-7 md:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-electric">/{automation.number}</span>
                <div className="relative size-16">
                  <span className="absolute inset-0 rounded-full border border-white/15" />
                  <span className="absolute inset-3 rounded-full border border-electric/60 transition-transform duration-500 group-hover:scale-125" />
                  <span className="absolute inset-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-semibold leading-[0.95] tracking-[-0.05em] text-paper md:text-4xl">
                  {automation.title}
                </h3>
                <p className="mt-5 leading-7 text-smoke">{automation.description}</p>
                <ul className="mt-8 border-t border-white/15">
                  {automation.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 border-b border-white/15 py-3 text-sm text-paper/80"
                    >
                      <span className="size-1.5 rounded-full bg-acid" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 border-y border-white/15 py-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-smoke">Connected with your stack</p>
            <p className="hidden font-mono text-xs text-smoke sm:block">10+ integrations</p>
          </div>
          <div className="marquee-fade overflow-hidden">
            <div className={shouldReduceMotion ? 'flex w-max' : 'animate-marquee'}>
              {[0, 1].flatMap((set) =>
                TOOLS.map(([name, logo]) => (
                  <div
                    key={`${set}-${name}`}
                    className="mx-2 flex h-20 w-44 shrink-0 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] px-5"
                  >
                    <img src={logo} alt="" className="size-8 object-contain" />
                    <span className="text-sm font-semibold text-paper">{name}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-7 rounded-[2rem] bg-acid p-7 text-ink md:flex-row md:items-center md:p-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em]">A smarter operating layer</p>
            <p className="display-serif mt-3 max-w-3xl text-4xl leading-none md:text-6xl">
              Make the system work for the team.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-paper transition hover:bg-electric"
          >
            Build a workflow
            <span>↗</span>
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default Automation
