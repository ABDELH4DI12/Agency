/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import AsyncImage from './AsyncImage'
import SectionHeading from './SectionHeading'
import { revealUp } from '../lib/motion'

const COLORS = ['bg-coral', 'bg-lilac', 'bg-sage', 'bg-butter', 'bg-paper', 'bg-panel']
const ROTATIONS = ['-rotate-1', 'rotate-1', 'rotate-0', '-rotate-1', 'rotate-1', 'rotate-0']

function parseTags(tags) {
  return String(tags || '').split(',').map((tag) => tag.trim()).filter(Boolean)
}

function Designs({ collections = [], isLoading = false, error = '' }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 })
  const [selectedCategory, setSelectedCategory] = useState(null)
  const categories = useMemo(
    () =>
      collections.map((collection, index) => {
        const images = (collection.images || []).filter((image) => image.imageUrl)
        return {
          id: String(collection.id),
          title: collection.title || `Collection #${collection.id}`,
          tags: parseTags(collection.tags).slice(0, 3),
          images,
          cover: images[0]?.imageUrl || '',
          color: COLORS[index % COLORS.length],
          rotation: ROTATIONS[index % ROTATIONS.length],
        }
      }),
    [collections]
  )
  const selectedCollection = categories.find((category) => category.id === selectedCategory)

  useEffect(() => {
    if (!selectedCollection) return undefined
    const close = (event) => event.key === 'Escape' && setSelectedCategory(null)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', close)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', close)
    }
  }, [selectedCollection])

  return (
    <>
      <section id="designs" ref={sectionRef} className="section-shell section-rule">
        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={revealUp} className="section-inner">
          <SectionHeading
            index="03"
            eyebrow="Creative collections"
            title="A shelf full of"
            accent="visual stories."
            description="Posters, identity pieces, social campaigns, printed matter, interiors, and photography gathered into living collections."
          />

          <div className="mt-16" aria-live="polite" aria-busy={isLoading}>
            {isLoading && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="rounded-[2rem] border-2 border-ink/10 bg-paper p-4">
                    <div className="data-skeleton h-64 rounded-[1.4rem]" />
                    <div className="px-2 pb-3 pt-5">
                      <div className="data-skeleton h-3 w-10 rounded-full" />
                      <div className="data-skeleton mt-4 h-8 w-2/3 rounded-xl" />
                      <div className="data-skeleton mt-3 h-3 w-4/5 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!isLoading && error && categories.length === 0 && <div className="craft-card px-6 py-12 text-center text-red-700">{error}</div>}
            {!isLoading && !error && categories.length === 0 && <div className="craft-card px-6 py-12 text-center text-sm text-smoke">No collections are available yet.</div>}

            {!isLoading && categories.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    type="button"
                    whileHover={{ y: -8, rotate: 0 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`group relative min-h-[25rem] overflow-hidden rounded-[2rem] border-2 border-ink p-4 text-left shadow-[7px_7px_0_#241B2F] ${category.color} ${category.rotation}`}
                  >
                    <span className="paper-tape left-1/2 top-0 -translate-x-1/2 -translate-y-1/3" />
                    <AsyncImage
                      src={category.cover}
                      alt=""
                      className="h-64 overflow-hidden rounded-[1.4rem] border-2 border-ink bg-cream"
                      imageClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      fallback={<div className="grid h-full place-items-center font-display text-5xl font-bold text-ink/25">CH</div>}
                    />
                    <div className="flex items-start justify-between gap-4 px-2 pb-2 pt-5">
                      <div>
                        <span className="font-mono text-xs text-ink/55">/{String(index + 1).padStart(2, '0')}</span>
                        <h3 className="display-type mt-2 text-3xl font-extrabold tracking-[-0.05em]">{category.title}</h3>
                        <p className="mt-2 text-sm text-ink/60">{category.tags.join(' · ') || `${category.images.length} images`}</p>
                      </div>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper transition group-hover:bg-ink group-hover:text-paper">↗</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedCollection && (
          <motion.div role="dialog" aria-modal="true" aria-label={`${selectedCollection.title} gallery`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] overflow-y-auto bg-ink/45 p-3 backdrop-blur-md md:p-6">
            <button type="button" tabIndex={-1} aria-label="Close gallery" onClick={() => setSelectedCategory(null)} className="fixed inset-0 cursor-default" />
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="relative mx-auto min-h-full max-w-[82rem] rounded-[2rem] border-2 border-ink bg-cream p-5 shadow-[10px_10px_0_#241B2F] md:p-9">
              <header className="sticky top-0 z-10 flex items-start justify-between border-b-2 border-ink/15 bg-cream/95 pb-5 backdrop-blur">
                <div>
                  <p className="eyebrow text-coral">Collection gallery</p>
                  <h2 className="display-type mt-3 text-4xl font-extrabold tracking-[-0.055em] md:text-6xl">{selectedCollection.title}</h2>
                </div>
                <button type="button" onClick={() => setSelectedCategory(null)} aria-label="Close gallery" className="grid size-12 place-items-center rounded-full border-2 border-ink bg-paper text-2xl transition hover:rotate-6 hover:bg-coral">×</button>
              </header>
              {selectedCollection.images.length ? (
                <div className="mt-7 columns-1 gap-5 sm:columns-2 lg:columns-3">
                  {selectedCollection.images.map((image, index) => (
                    <figure key={image.id || index} className="mb-5 break-inside-avoid overflow-hidden rounded-[1.5rem] border-2 border-ink bg-paper p-2">
                      <AsyncImage
                        src={image.imageUrl}
                        alt={`${selectedCollection.title} ${index + 1}`}
                        loading={index < 3 ? 'eager' : 'lazy'}
                        className="min-h-64 overflow-hidden rounded-[1rem] bg-panel"
                        imageClassName="h-auto w-full rounded-[1rem]"
                        fallback={<div className="grid min-h-64 place-items-center text-sm font-semibold text-smoke">Image unavailable</div>}
                      />
                    </figure>
                  ))}
                </div>
              ) : (
                <div className="craft-card mt-7 px-6 py-12 text-center text-sm text-smoke">No images are available yet.</div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Designs
