import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { hoverLift, revealUp } from '../lib/motion'

const PHOTOS = [
  {
    title: 'Elegant Spaces',
    category: 'Interior',
    image: 'https://img.freepik.com/free-photo/view-futuristic-light-lamp-design_23-2151037575.jpg',
    span: 'md:col-span-5 md:row-span-2',
  },
  {
    title: 'Modern Lines',
    category: 'Architecture',
    image: 'https://img.freepik.com/free-photo/grayscale-shot-lake-middle-city-buildings-cloudy-sky_181624-17493.jpg',
    span: 'md:col-span-7',
  },
  {
    title: 'Timeless Moments',
    category: 'Wedding',
    image: 'https://img.freepik.com/free-photo/classic-white-gold-wedding-rings-red-bouquet_8353-8012.jpg',
    span: 'md:col-span-3',
  },
  {
    title: 'Urban Stories',
    category: 'Street',
    image: 'https://img.freepik.com/free-photo/photographer-exploring-abandoned-location_23-2150974333.jpg',
    span: 'md:col-span-4',
  },
  {
    title: 'Commercial Excellence',
    category: 'Products',
    image: 'https://img.freepik.com/free-photo/photography-studio-with-equipment-items-arrangement_23-2150254625.jpg',
    span: 'md:col-span-12',
  },
]

function Photography() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 })

  return (
    <section id="photography" ref={sectionRef} className="section-shell section-rule">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={revealUp}
        className="section-inner"
      >
        <SectionHeading
          index="05"
          eyebrow="Photography"
          title="Images with"
          accent="presence."
          description="From spaces and products to people and fleeting moments, we frame stories with a clear sense of atmosphere."
        />

        <div className="mt-20 grid auto-rows-[18rem] gap-5 md:grid-cols-12">
          {PHOTOS.map((photo, index) => (
            <motion.figure
              key={photo.title}
              whileHover={hoverLift}
              className={`group relative overflow-hidden rounded-[2rem] border border-white/15 bg-panel ${photo.span}`}
            >
              <img
                src={photo.image}
                alt={photo.title}
                loading={index < 2 ? 'eager' : 'lazy'}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/10" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 md:p-8">
                <div>
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-acid">
                    {photo.category}
                  </span>
                  <h3
                    className={`mt-2 font-semibold tracking-[-0.045em] text-paper ${
                      index === 4 ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'
                    }`}
                  >
                    {photo.title}
                  </h3>
                </div>
                <span className="font-mono text-xs text-paper/60">/{String(index + 1).padStart(2, '0')}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Photography
