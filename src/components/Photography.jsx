import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { revealUp } from '../lib/motion'

const PHOTOS = [
  ['Elegant Spaces', 'Interior', 'https://img.freepik.com/free-photo/view-futuristic-light-lamp-design_23-2151037575.jpg', 'lg:col-span-5 lg:row-span-2', '-rotate-1'],
  ['Modern Lines', 'Architecture', 'https://img.freepik.com/free-photo/grayscale-shot-lake-middle-city-buildings-cloudy-sky_181624-17493.jpg', 'lg:col-span-7', 'rotate-1'],
  ['Timeless Moments', 'Wedding', 'https://img.freepik.com/free-photo/classic-white-gold-wedding-rings-red-bouquet_8353-8012.jpg', 'lg:col-span-3', '-rotate-1'],
  ['Urban Stories', 'Street', 'https://img.freepik.com/free-photo/photographer-exploring-abandoned-location_23-2150974333.jpg', 'lg:col-span-4', 'rotate-1'],
  ['Commercial Excellence', 'Products', 'https://img.freepik.com/free-photo/photography-studio-with-equipment-items-arrangement_23-2150254625.jpg', 'lg:col-span-12', '-rotate-1'],
]

function Photography() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 })

  return (
    <section id="photography" ref={sectionRef} className="section-shell section-rule">
      <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={revealUp} className="section-inner">
        <SectionHeading
          index="05"
          eyebrow="Photography"
          title="Real moments,"
          accent="well framed."
          description="Spaces, products, people, and small details photographed with warmth, structure, and a sense of place."
        />

        <div className="mt-16 grid auto-rows-[18rem] gap-6 lg:grid-cols-12">
          {PHOTOS.map(([title, category, image, span, rotation], index) => (
            <motion.figure
              key={title}
              whileHover={{ y: -7, rotate: 0 }}
              className={`group relative overflow-hidden rounded-[1.75rem] border-2 border-ink bg-paper p-3 shadow-[7px_7px_0_#241B45] ${span} ${rotation}`}
            >
              <div className="relative h-full overflow-hidden rounded-[1.25rem]">
                <img src={image} alt={title} loading={index < 2 ? 'eager' : 'lazy'} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5 pt-16 text-paper">
                  <p className="font-mono text-[0.65rem] uppercase tracking-wider text-butter">{category}</p>
                  <h3 className="display-type mt-1 text-2xl font-bold md:text-3xl">{title}</h3>
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Photography
