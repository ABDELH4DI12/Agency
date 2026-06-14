/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { hoverLift, revealUp } from '../lib/motion'

const CARD_SIZES = [
  'md:col-span-7 md:row-span-2',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-4',
]

function parseTags(tags) {
  return String(tags || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function Designs({ collections = [], isLoading = false, error = '' }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 })
  const [selectedCategory, setSelectedCategory] = useState(null)
  const categories = useMemo(
    () =>
      collections.map((collection, index) => {
        const tags = parseTags(collection.tags)
        const images = (collection.images || []).filter((image) => image.imageUrl)

        return {
          id: String(collection.id),
          title: collection.title || `Collection #${collection.id}`,
          subtitle: tags.slice(0, 4).join(' · ') || `${images.length} images`,
          number: String(index + 1).padStart(2, '0'),
          coverImage: images[0]?.imageUrl || '',
          size: CARD_SIZES[index % CARD_SIZES.length],
          images,
        }
      }),
    [collections]
  )
  const selectedCollection = categories.find((category) => category.id === selectedCategory)

  useEffect(() => {
    if (!selectedCollection) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedCategory(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedCollection])

  return (
    <>
      <section id="designs" ref={sectionRef} className="section-shell section-rule">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={revealUp}
          className="section-inner"
        >
          <SectionHeading
            index="03"
            eyebrow="Visual collections"
            title="Campaigns, identities, and"
            accent="graphic worlds."
            description="A living archive of posters, brand systems, social campaigns, print pieces, spaces, and photography."
          />

          <div className="mt-20">
            {isLoading && categories.length === 0 && (
              <div className="grid gap-5 md:grid-cols-12">
                {[0, 1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className={`h-80 animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.04] ${
                      CARD_SIZES[item % CARD_SIZES.length]
                    }`}
                  />
                ))}
              </div>
            )}

            {!isLoading && error && categories.length === 0 && (
              <div className="surface-card rounded-3xl px-6 py-12 text-center text-red-200">{error}</div>
            )}

            {!isLoading && !error && categories.length === 0 && (
              <div className="surface-card rounded-3xl px-6 py-12 text-center text-sm text-smoke">
                No collections are available yet.
              </div>
            )}

            {categories.length > 0 && (
              <div className="grid auto-rows-[18rem] gap-5 md:grid-cols-12">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    type="button"
                    whileHover={hoverLift}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`group relative overflow-hidden rounded-[2rem] border border-white/15 bg-panel text-left ${category.size}`}
                  >
                    {category.coverImage ? (
                      <img
                        src={category.coverImage}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-90"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(140,82,255,.28),transparent_45%)]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/5" />
                    <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-paper/70">/{category.number}</span>
                        <span className="grid size-10 place-items-center rounded-full border border-white/25 bg-black/20 text-paper backdrop-blur-md transition group-hover:bg-acid group-hover:text-ink">
                          ↗
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-acid">
                          {category.images.length} frames
                        </p>
                        <h3
                          className={`mt-3 font-semibold leading-[0.9] tracking-[-0.055em] text-paper ${
                            index === 0 ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl'
                          }`}
                        >
                          {category.title}
                        </h3>
                        <p className="mt-3 text-sm text-paper/65">{category.subtitle}</p>
                      </div>
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
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedCollection.title} gallery`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-ink/95 p-3 backdrop-blur-xl md:p-6"
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="Close gallery"
              onClick={() => setSelectedCategory(null)}
              className="fixed inset-0 cursor-default"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative mx-auto min-h-full max-w-[88rem] rounded-[2rem] border border-white/15 bg-[#0d0d0b] p-5 shadow-2xl md:p-10"
            >
              <header className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-white/15 bg-[#0d0d0b]/90 pb-6 backdrop-blur-xl">
                <div>
                  <p className="eyebrow">Collection archive</p>
                  <h2 className="mt-4 text-5xl font-semibold tracking-[-0.055em] text-paper md:text-7xl">
                    {selectedCollection.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="grid size-12 shrink-0 place-items-center rounded-full border border-white/20 text-xl text-paper transition hover:bg-paper hover:text-ink"
                  aria-label="Close gallery"
                >
                  ×
                </button>
              </header>

              {selectedCollection.images.length > 0 ? (
                <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
                  {selectedCollection.images.map((item, index) => (
                    <motion.figure
                      key={item.id || index}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index, 8) * 0.04 }}
                      className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-black"
                    >
                      <img
                        src={item.imageUrl}
                        alt={`${selectedCollection.title} ${index + 1}`}
                        loading={index < 3 ? 'eager' : 'lazy'}
                        className="h-auto w-full object-cover"
                      />
                    </motion.figure>
                  ))}
                </div>
              ) : (
                <div className="mt-8 rounded-2xl border border-white/10 px-6 py-12 text-center text-sm text-smoke">
                  No images are available yet.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Designs
