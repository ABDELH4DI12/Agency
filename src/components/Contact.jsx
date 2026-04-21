import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" className="py-32 px-4 md:px-16 relative" ref={sectionRef}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="cta-content p-12 md:p-20 rounded-3xl bg-gradient-to-br from-purple-900/50 to-gray-900 border border-purple-500/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Let's Create <span className="text-violet-300">Together</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Ready to transform your brand? We're here to bring your vision to life with stunning designs and powerful websites.
            </p>
            <motion.a 
              href="mailto:hello@creative.agency"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-400 text-gray-900 rounded-full font-bold hover:shadow-lg hover:shadow-yellow-500/30 transition-all"
            >
              Start Your Project
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
