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

function Projects({ websites = [], isLoading = false, error = '' }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const projects = useMemo(
    () =>
      websites.map((website, index) => {
        const tags = parseTags(website.headTags || website.footTags)

        return {
          id: website.id,
          title: website.title || `Website #${website.id}`,
          category: tags[0] || 'Digital experience',
          description: website.description || '',
          image: website.imageUrl || '',
          tags: tags.slice(1, 4),
          link: website.websiteUrl || '#contact',
          number: String(index + 1).padStart(2, '0'),
        }
      }),
    [websites]
  )

  return (
    <section id="projects" ref={sectionRef} className="section-shell section-rule">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={revealUp}
        className="section-inner"
      >
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title="Digital work with a"
          accent="point of view."
          description="A selection of brand-led websites built to communicate quickly, move smoothly, and make the business feel unmistakable."
        />

        <div className="mt-20">
          {isLoading && projects.length === 0 && (
            <div className="grid gap-5 md:grid-cols-2">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className={`animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.04] ${
                    item === 0 ? 'h-[34rem] md:col-span-2' : 'h-[28rem]'
                  }`}
                />
              ))}
            </div>
          )}

          {!isLoading && error && projects.length === 0 && (
            <div className="surface-card rounded-3xl px-6 py-12 text-center text-red-200">{error}</div>
          )}

          {!isLoading && !error && projects.length === 0 && (
            <div className="surface-card rounded-3xl px-6 py-12 text-center text-sm text-smoke">
              No website projects are available yet.
            </div>
          )}

          {projects.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project, index) => {
                const external = project.link.startsWith('http')

                return (
                  <motion.a
                    key={project.id || index}
                    href={project.link}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    whileHover={hoverLift}
                    className={`group relative min-h-[30rem] overflow-hidden rounded-[2rem] border border-white/15 bg-panel ${
                      index === 0 ? 'md:col-span-2 md:min-h-[42rem]' : ''
                    }`}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center bg-white/[0.04] text-smoke">
                        {project.title}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/5" />

                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 md:p-8">
                      <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-paper backdrop-blur-md">
                        {project.category}
                      </span>
                      <span className="font-mono text-xs text-paper/70">/{project.number}</span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                      <div className="flex items-end justify-between gap-6">
                        <div>
                          <h3
                            className={`max-w-3xl font-semibold leading-[0.92] tracking-[-0.055em] text-paper ${
                              index === 0 ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl'
                            }`}
                          >
                            {project.title}
                          </h3>
                          {project.description && (
                            <p className="mt-4 max-w-xl text-sm leading-6 text-paper/70 md:text-base">
                              {project.description}
                            </p>
                          )}
                          {project.tags.length > 0 && (
                            <div className="mt-5 flex flex-wrap gap-2">
                              {project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs text-paper/75 backdrop-blur-md"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="hidden size-14 shrink-0 place-items-center rounded-full bg-acid text-xl text-ink transition-transform group-hover:rotate-45 md:grid">
                          ↗
                        </span>
                      </div>
                    </div>
                  </motion.a>
                )
              })}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects
