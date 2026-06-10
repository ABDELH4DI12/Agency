/* eslint-disable react/prop-types */
import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PROJECT_COLOR_CYCLE = ['amber', 'orange', 'purple'];

function parseTags(tags) {
  return String(tags || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function Projects({ websites = [], isLoading = false, error = '' }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const projects = useMemo(
    () =>
      websites.map((website, index) => {
        const tags = parseTags(website.headTags || website.footTags);

        return {
          id: website.id,
          title: website.title || `Website #${website.id}`,
          category: tags[0] || 'Website',
          description: website.description || '',
          image: website.imageUrl || '',
          tags: tags.slice(1),
          categoryColor: PROJECT_COLOR_CYCLE[index % PROJECT_COLOR_CYCLE.length],
          reverse: index % 2 === 1,
          link: website.websiteUrl || '#contact',
        };
      }),
    [websites]
  );

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
          {isLoading && projects.length === 0 && (
            <div className="grid gap-6 md:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div key={item} className="h-72 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
              ))}
            </div>
          )}

          {!isLoading && error && projects.length === 0 && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-5 text-center text-sm font-semibold text-red-200">
              {error}
            </div>
          )}

          {!isLoading && !error && projects.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center text-sm font-semibold text-gray-400">
              No website projects are available yet.
            </div>
          )}

          {projects.map((project, index) => (
            <motion.div 
              key={project.id || index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`group grid md:grid-cols-2 gap-8 items-center ${project.reverse ? 'md:grid-flow-dense' : ''}`}
            >
              <motion.a
                href={project.link}
                target={project.link.startsWith('http') ? '_blank' : undefined}
                rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-2xl overflow-hidden border border-white/10 bg-gray-900/50 ${project.reverse ? 'md:order-2' : ''} block`}
              >
                {project.image ? (
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-white/5 text-sm font-semibold text-gray-500">
                    {project.title}
                  </div>
                )}
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
                  target={project.link.startsWith('http') ? '_blank' : undefined}
                  rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
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
