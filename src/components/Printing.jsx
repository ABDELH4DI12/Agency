/* eslint-disable react/prop-types */
import { useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AsyncImage from './AsyncImage'
import SectionHeading from './SectionHeading'
import { revealUp } from '../lib/motion'

function parseTags(tags) {
  return String(tags || '').split(',').map((tag) => tag.trim()).filter(Boolean)
}

function Printing({ items = [], isLoading = false, error = '' }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 })
  const products = useMemo(() => items.map((item, index) => ({
    id: item.id,
    title: item.title || `Merchandise #${item.id}`,
    description: item.description || '',
    image: item.imageUrl || '',
    features: parseTags(item.tags),
    color: index % 3 === 0 ? 'bg-lilac' : index % 3 === 1 ? 'bg-sage' : 'bg-butter',
  })), [items])

  return (
    <section id="printing" ref={sectionRef} className="section-shell section-rule">
      <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={revealUp} className="section-inner">
        <SectionHeading
          index="07"
          eyebrow="Print and merchandise"
          title="Good design you can"
          accent="hold."
          description="Thoughtful printed objects and branded merchandise that carry the visual identity into everyday life."
        />

        <div className="mt-16" aria-live="polite" aria-busy={isLoading}>
          {isLoading && (
            <div className="grid gap-6 md:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div key={item} className="rounded-[2rem] border-2 border-ink/10 bg-paper p-4">
                  <div className="data-skeleton aspect-[4/5] rounded-[1.4rem]" />
                  <div className="data-skeleton mt-5 h-8 w-2/3 rounded-xl" />
                  <div className="data-skeleton mt-4 h-3 w-full rounded-full" />
                  <div className="data-skeleton mt-2 h-3 w-4/5 rounded-full" />
                </div>
              ))}
            </div>
          )}
          {!isLoading && error && products.length === 0 && <div className="craft-card px-6 py-12 text-center text-red-700">{error}</div>}
          {!isLoading && !error && products.length === 0 && <div className="craft-card px-6 py-12 text-center text-sm text-smoke">No merchandise is available yet.</div>}

          {!isLoading && products.length > 0 && (
            <div className="grid gap-6 md:grid-cols-3">
              {products.map((product, index) => (
                <motion.article key={product.id} whileHover={{ y: -8, rotate: 0 }} className={`relative overflow-hidden rounded-[2rem] border-2 border-ink p-4 shadow-[7px_7px_0_#241B2F] ${product.color} ${index % 2 ? 'rotate-1' : '-rotate-1'}`}>
                  <span className="paper-tape left-1/2 top-0 -translate-x-1/2 -translate-y-1/3" />
                  <AsyncImage
                    src={product.image}
                    alt={product.title}
                    className="aspect-[4/5] overflow-hidden rounded-[1.4rem] border-2 border-ink bg-paper"
                    imageClassName="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    fallback={<div className="grid h-full place-items-center display-type text-4xl font-bold text-ink/30">{product.title}</div>}
                  />
                  <div className="px-2 pb-3 pt-5">
                    <h3 className="display-type text-3xl font-extrabold tracking-[-0.05em]">{product.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-ink/65">{product.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {product.features.map((feature) => <span key={feature} className="rounded-full border border-ink/25 bg-paper/60 px-3 py-1 text-xs font-semibold">{feature}</span>)}
                    </div>
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
