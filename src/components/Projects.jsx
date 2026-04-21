import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "Artisan Coffee",
      category: "E-commerce",
      description: "Premium coffee shop with online ordering, product showcase, and customer testimonials.",
      image: "https://i.ibb.co/KzpCcKQG/Screenshot-from-2026-01-08-00-53-14.png",
      tags: ["HTML/CSS", "JavaScript"],
      categoryColor: "amber",
      reverse: false,
      link: "https://artisan-coffee-three.vercel.app/"
    },
    {
      title: "Savory Kitchen",
      category: "Restaurant",
      description: "Premium dining platform with menu showcase, online ordering, and admin dashboard.",
      image: "https://i.ibb.co/dw8SNSpk/Screenshot-from-2026-01-08-00-54-54.png",
      tags: ["React", "Node.js"],
      categoryColor: "orange",
      reverse: true,
      link: "https://savorykitchen.vercel.app/"
    },
    {
      title: "LUXE Motors",
      category: "Automotive",
      description: "Luxury electric vehicle showcase with performance specs, gallery, and configurator.",
      image: "https://i.ibb.co/FqfCdLmp/Screenshot-from-2026-01-08-00-55-59.png",
      tags: ["Next.js", "GSAP"],
      categoryColor: "purple",
      reverse: false,
      link: "https://cars-eta-six.vercel.app/"
    }
  ];

  const getCategoryColorClasses = (color) => {
    const colors = {
      amber: "bg-amber-600/20 text-amber-400 border-amber-500/30",
      orange: "bg-orange-600/20 text-orange-400 border-orange-500/30",
      purple: "bg-purple-600/20 text-purple-400 border-purple-500/30"
    };
    return colors[color] || colors.purple;
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="projects" className="py-32 bg-black px-4 md:px-16 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="text-violet-300 font-medium tracking-widest uppercase mb-4 text-sm">
            Selected Works
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white">
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-400">
              Masterpieces
            </span>
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`group grid md:grid-cols-2 gap-8 items-center ${project.reverse ? 'md:grid-flow-dense' : ''}`}
            >
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-2xl overflow-hidden border border-white/10 bg-gray-900/50 ${project.reverse ? 'md:order-2' : ''} block`}
              >
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="bg-white/90 backdrop-blur-sm rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </motion.div>
                </div>
              </motion.a>
              <div className={`space-y-4 ${project.reverse ? 'md:order-1' : ''}`}>
                <span className={`px-3 py-1 ${getCategoryColorClasses(project.categoryColor)} border rounded-full text-xs font-bold uppercase tracking-wider inline-block`}>
                  {project.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-white">{project.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {project.description}
                </p>
                <div className="flex gap-2 pt-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors mt-4"
                >
                  View Live Site
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
