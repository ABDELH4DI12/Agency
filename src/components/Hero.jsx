import { motion } from 'framer-motion';

function Hero() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="home" className="hero min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 hero-gradient"></div>

      {/* Floating Shapes */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="floating-shape shape-1 absolute w-72 h-72 rounded-full bg-purple-600/20 blur-3xl"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.7 }}
        className="floating-shape shape-2 absolute w-96 h-96 rounded-full bg-violet-400/15 blur-3xl"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.9 }}
        className="floating-shape shape-3 absolute w-64 h-64 rounded-full bg-fuchsia-500/15 blur-3xl"
      ></motion.div>

      <div className="hero-content text-center z-10 max-w-6xl">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-hidden mb-4"
        >
          <p className="hero-tag text-violet-300 text-lg md:text-xl font-medium tracking-widest uppercase">
            Design & Development Agency
          </p>
        </motion.div>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="overflow-hidden"
        >
          <h1 className="hero-title text-5xl md:text-7xl lg:text-9xl font-black leading-none tracking-tight mb-6">
            We Create<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-400">
              Digital Magic
            </span>
          </h1>
        </motion.div>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="overflow-hidden"
        >
          <p className="hero-desc text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Transforming brands through stunning web experiences and captivating design that leaves lasting impressions.
          </p>
        </motion.div>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="hero-btns flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a 
            href="#projects"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:-translate-y-1"
          >
            View Our Work
          </a>
          <a 
            href="#contact"
            className="px-8 py-4 border border-white/20 rounded-full font-semibold hover:bg-white/10 transition-all"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
