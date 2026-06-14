/* eslint-disable react/prop-types */
import { useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AsyncImage from './AsyncImage'
import SectionHeading from './SectionHeading'
import { revealUp } from '../lib/motion'

const ACCENTS = ['bg-lilac', 'bg-sage', 'bg-butter']

function parseTags(tags) {
  return String(tags || '').split(',').map((tag) => tag.trim()).filter(Boolean)
}

function ProjectSkeleton({ featured = false }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border-2 border-ink/10 bg-paper p-4 ${featured ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5'}`}>
      <div className={`data-skeleton rounded-[1.4rem] ${featured ? 'aspect-[4/3] lg:aspect-[16/11]' : 'aspect-[16/9]'}`} />
      <div className="mt-5 flex justify-between gap-4">
        <div className="w-full">
          <div className="data-skeleton h-4 w-24 rounded-full" />
          <div className="data-skeleton mt-4 h-9 w-3/5 rounded-xl" />
          <div className="data-skeleton mt-4 h-3 w-full rounded-full" />
          <div className="data-skeleton mt-2 h-3 w-4/5 rounded-full" />
        </div>
        <div className="data-skeleton size-11 shrink-0 rounded-full" />
      </div>
    </div>
  )
}

function Projects({ websites = [], isLoading = false, error = '' }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 })
  const projects = useMemo(
    () =>
      websites.map((website, index) => {
        const tags = parseTags(website.headTags || website.footTags)
        return {
          id: website.id,
          title: website.title || `Website #${website.id}`,
          category: tags[0] || 'Website',
          description: website.description || '',
          image: website.imageUrl || '',
          tags: tags.slice(1, 4),
          link: website.websiteUrl || '#contact',
          accent: ACCENTS[index % ACCENTS.length],
        }
      }),
    [websites]
  )

  return (
    <section id="projects" ref={sectionRef} className="section-shell section-rule">
      <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={revealUp} className="section-inner">
        <SectionHeading
          index="02"
          eyebrow="Selected projects"
          title="Work that feels"
          accent="alive."
          description="Digital experiences shaped around the brand, the audience, and the one thing the project needs people to remember."
        />

        <div className="mt-16" aria-live="polite" aria-busy={isLoading}>
          {isLoading && (
            <div className="grid gap-6 lg:grid-cols-12">
              <ProjectSkeleton featured />
              <ProjectSkeleton />
              <ProjectSkeleton />
            </div>
          )}

          {!isLoading && error && projects.length === 0 && (
            <div className="craft-card px-6 py-12 text-center text-red-700">{error}</div>
          )}

          {!isLoading && !error && projects.length === 0 && (
            <div className="craft-card px-6 py-12 text-center text-sm text-smoke">No website projects are available yet.</div>
          )}

          {!isLoading && projects.length > 0 && (
            <div className="grid auto-rows-auto gap-6 lg:grid-cols-12">
              {projects.map((project, index) => {
                const external = project.link.startsWith('http')
                const isFeatured = index === 0

                return (
                  <motion.article
                    key={project.id || index}
                    whileHover={{ y: -5, rotate: 0 }}
                    className={`group relative overflow-hidden rounded-[2rem] border-2 border-ink p-4 shadow-[7px_7px_0_#241B2F] ${project.accent} ${
                      isFeatured ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5'
                    } ${index === 1 ? 'lg:rotate-1' : index === 2 ? 'lg:-rotate-1' : ''}`}
                  >
                    <span className="paper-tape left-1/2 top-0 -translate-x-1/2 -translate-y-1/3" />
                    <a
                      href={project.link}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      aria-label={`Open ${project.title}`}
                      className="block"
                    >
                      <AsyncImage
                        src={project.image}
                        alt={project.title}
                        loading={isFeatured ? 'eager' : 'lazy'}
                        className={`overflow-hidden rounded-[1.4rem] border-2 border-ink bg-paper ${
                          isFeatured ? 'aspect-[4/3] lg:aspect-[16/11]' : 'aspect-[16/9]'
                        }`}
                        imageClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        fallback={<div className="grid h-full place-items-center display-type text-5xl font-bold text-ink/30">{project.title}</div>}
                      />
                    </a>

                    <div className={`flex items-start justify-between gap-5 px-2 pb-2 pt-5 ${isFeatured ? 'md:pt-7' : ''}`}>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-ink/30 bg-paper/55 px-3 py-1 font-mono text-[0.62rem] uppercase">{project.category}</span>
                          <span className="font-mono text-[0.65rem] text-ink/50">0{index + 1}</span>
                        </div>
                        <h3 className={`display-type mt-4 font-extrabold leading-[0.98] tracking-[-0.055em] ${isFeatured ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
                          {project.title}
                        </h3>
                        <p className={`mt-3 leading-6 text-ink/65 ${isFeatured ? 'max-w-xl text-base' : 'text-sm'}`}>{project.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-paper/60 px-3 py-1 text-xs font-semibold text-ink/65">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <a
                        href={project.link}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        aria-label={`Visit ${project.title}`}
                        className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper text-lg transition group-hover:rotate-45 group-hover:bg-coral"
                      >
                        ↗
                      </a>
                    </div>
                  </motion.article>
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
