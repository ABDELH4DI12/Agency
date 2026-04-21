import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function About() {
  const [stats, setStats] = useState({ projects: 0, clients: 0, years: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      animateStats();
    }
  }, [isInView, hasAnimated]);

  const animateStats = () => {
    const duration = 2000;
    const targets = { projects: 150, clients: 50, years: 5 };
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setStats({
        projects: Math.floor(targets.projects * progress),
        clients: Math.floor(targets.clients * progress),
        years: Math.floor(targets.years * progress),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-32 px-4 md:px-16 relative overflow-hidden" ref={sectionRef}>
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="about-content"
          >
            <p className="text-violet-300 font-medium tracking-widest uppercase mb-4">Who We Are</p>
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              Crafting <span className="text-purple-500">Excellence</span> Since Day One
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              We're a passionate team of designers and developers dedicated to creating extraordinary digital
              experiences. From stunning websites to eye-catching graphics, we bring your vision to life with
              creativity and precision.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <motion.div 
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="stat-item"
              >
                <span className="stat-number text-4xl font-black text-purple-500">
                  {stats.projects}
                </span>
                <span className="text-purple-500 text-4xl font-black">+</span>
                <p className="text-gray-500 text-sm mt-2">Projects Done</p>
              </motion.div>
              <motion.div 
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="stat-item"
              >
                <span className="stat-number text-4xl font-black text-violet-300">
                  {stats.clients}
                </span>
                <span className="text-violet-300 text-4xl font-black">+</span>
                <p className="text-gray-500 text-sm mt-2">Happy Clients</p>
              </motion.div>
              <motion.div 
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="stat-item"
              >
                <span className="stat-number text-4xl font-black text-purple-500">
                  {stats.years}
                </span>
                <span className="text-purple-500 text-4xl font-black">+</span>
                <p className="text-gray-500 text-sm mt-2">Years Experience</p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Abstract design element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[500px] flex items-center justify-center"
          >
            {/* Decorative shapes */}
            <motion.div 
              animate={{ rotate: [12, 15, 12] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-64 h-64 border-2 border-purple-500/30 rounded-3xl"
            ></motion.div>
            <motion.div 
              animate={{ rotate: [-6, -9, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-72 h-72 border-2 border-violet-400/20 rounded-3xl"
            ></motion.div>
            <motion.div 
              animate={{ rotate: [45, 50, 45] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-48 h-48 bg-gradient-to-br from-purple-600/20 to-fuchsia-500/20 rounded-3xl backdrop-blur-sm"
            ></motion.div>
            
            {/* Central element */}
            <div className="relative z-10 text-center">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-purple-500/30"
              >
                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </motion.div>
              <p className="text-2xl font-bold text-white mb-2">Creative Vision</p>
              <p className="text-gray-500">Innovation meets design</p>
            </div>
            
            {/* Floating dots */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-20 w-3 h-3 bg-purple-500 rounded-full"
            ></motion.div>
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-20 left-10 w-2 h-2 bg-violet-400 rounded-full"
            ></motion.div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 right-10 w-4 h-4 bg-fuchsia-500/50 rounded-full"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
