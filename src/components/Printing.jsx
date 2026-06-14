/* eslint-disable react/prop-types */
import { useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { hoverLift, revealUp } from '../lib/motion'

function parseTags(tags) {
  return String(tags || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function Printing({ items = [], isLoading = false, error = '' }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 })
  const products = useMemo(
    () =>
      items.map((item, index) => ({
        id: item.id,
        title: item.title || `Merchandise #${item.id}`,
        description: item.description || '',
        image: item.imageUrl || '',
        features: parseTags(item.tags),
        number: String(index + 1).padStart(2, '0'),
      })),
    [items]
  )

  return (
    <section id="printing" ref={sectionRef} className="section-shell section-rule">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={revealUp}
        className="section-inner"
      >
        <SectionHeading
          index="07"
          eyebrow="Print and merchandise"
          title="Brand presence you can"
          accent="hold."
          description="Premium printed objects and merchandise that extend a visual identity into the physical world."
        />

        <div className="mt-20">
          {isLoading && products.length === 0 && (
            <div className="grid gap-5 md:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  aria-hidden="true"
                  className="animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.035] p-4"
                >
                  <div className="aspect-[4/5] rounded-[1.5rem] bg-white/[0.07]" />
                  <div className="px-2 pb-4 pt-6">
                    <div className="h-7 w-2/3 rounded bg-white/10" />
                    <div className="mt-4 h-4 w-full rounded bg-white/[0.06]" />
                    <div className="mt-2 h-4 w-4/5 rounded bg-white/[0.06]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && error && products.length === 0 && (
            <div className="surface-card rounded-3xl px-6 py-12 text-center text-red-200">{error}</div>
          )}

          {!isLoading && !error && products.length === 0 && (
            <div className="surface-card rounded-3xl px-6 py-12 text-center text-sm text-smoke">
              No merchandise is available yet.
            </div>
          )}

          {products.length > 0 && (
            <div className="grid gap-5 md:grid-cols-3">
              {products.map((product) => (
                <motion.article
                  key={product.id}
                  whileHover={hoverLift}
                  className="group surface-card overflow-hidden rounded-[2rem] p-4"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-white/[0.04]">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-sm text-smoke">{product.title}</div>
                    )}
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                      <span className="rounded-full bg-ink/75 px-3 py-1.5 font-mono text-xs text-paper backdrop-blur-md">
                        /{product.number}
                      </span>
                      <span className="size-2 rounded-full bg-acid shadow-[0_0_18px_rgba(216,255,62,.7)]" />
                    </div>
                  </div>
                  <div className="px-2 pb-4 pt-6">
                    <h3 className="text-3xl font-semibold tracking-[-0.045em] text-paper">{product.title}</h3>
                    <p className="mt-4 min-h-[4.5rem] text-sm leading-6 text-smoke">{product.description}</p>
                    {product.features.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {product.features.map((feature) => (
                          <span
                            key={feature}
                            className="rounded-full border border-white/15 px-3 py-1 text-xs text-paper/70"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

export default Printing
