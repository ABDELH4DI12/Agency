import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function Montage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const cards = [
    {
      title: "Perfect Rhythm",
      subtitle: "Seamless cuts that match the beat of your story.",
      color: "purple",
      icon: "timeline"
    },
    {
      title: "Cinematic Color",
      subtitle: "Grading that breathes life and mood into every frame.",
      color: "violet",
      icon: "circles"
    },
    {
      title: "Visual Magic",
      subtitle: "High-end VFX and compositing that defy reality.",
      color: "cyan",
      icon: "particles"
    },
    {
      title: "Acoustic Depth",
      subtitle: "Soundscapes that surround and captivate.",
      color: "blue",
      icon: "waves"
    },
    {
      title: "Story Arc",
      subtitle: "Weaving chaos into a coherent narrative.",
      color: "orange",
      icon: "path"
    },
    {
      title: "Kinetic Pace",
      subtitle: "Momentum that keeps eyes glued to the screen.",
      color: "emerald",
      icon: "arrows"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      purple: "hover:border-purple-500/50 from-purple-600/10",
      violet: "hover:border-violet-500/50 from-violet-500/20",
      cyan: "hover:border-cyan-500/50 from-cyan-500/20",
      blue: "hover:border-blue-500/50 from-blue-600/10",
      orange: "hover:border-orange-500/50 from-orange-400/10",
      emerald: "hover:border-emerald-500/50 from-emerald-500/10"
    };
    return colors[color] || colors.purple;
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="montage" className="py-32 bg-black relative overflow-hidden" ref={sectionRef}>
      {/* Abstract Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -z-10"></div>
          <span className="text-violet-300 font-bold tracking-widest uppercase mb-4 block">The Art of Montage</span>
          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tight">
            WE EDIT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500">
              EMOTIONS
            </span>
          </h2>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
            It's not just about cutting clips. It's about rhythm, color, and the invisible flow that turns footage into a feeling.
          </p>
        </motion.div>

        {/* Conceptual Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`group relative h-[350px] rounded-3xl overflow-hidden border border-white/10 bg-gray-900/50 backdrop-blur-sm ${getColorClasses(card.color)} transition-colors duration-500`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(card.color).split(' ')[1]} to-transparent group-hover:opacity-100 transition-all duration-500`}></div>

              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                {/* Icon placeholder - different for each card */}
                {card.icon === "timeline" && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col gap-4 items-center">
                    <motion.div 
                      animate={{ x: [-30, 0] }}
                      transition={{ duration: 0.7, delay: 0.3 }}
                      className="w-24 h-2 bg-gradient-to-r from-purple-500 to-transparent rounded-full"
                    ></motion.div>
                    <motion.div 
                      animate={{ x: [30, 0] }}
                      transition={{ duration: 0.7, delay: 0.4 }}
                      className="w-32 h-2 bg-gradient-to-l from-pink-500 to-transparent rounded-full"
                    ></motion.div>
                    <motion.div 
                      animate={{ x: [-15, 0] }}
                      transition={{ duration: 0.7, delay: 0.5 }}
                      className="w-20 h-2 bg-gradient-to-r from-violet-500 to-transparent rounded-full"
                    ></motion.div>
                  </div>
                )}

                {card.icon === "circles" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-2 border-violet-500/30"
                      ></motion.div>
                      <motion.div 
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                        className="absolute inset-4 rounded-full border-2 border-pink-500/30"
                      ></motion.div>
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        className="absolute inset-8 rounded-full border-2 border-purple-500/30"
                      ></motion.div>
                    </div>
                  </div>
                )}

                {card.icon === "particles" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: [0, 45, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="grid grid-cols-3 gap-2"
                    >
                      {[...Array(9)].map((_, i) => (
                        <motion.div 
                          key={i} 
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                          className="w-3 h-3 bg-cyan-400 rounded-full"
                        ></motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}

                {card.icon === "waves" && (
                  <div className="absolute inset-0 flex items-center justify-center gap-2">
                    {[12, 24, 16, 32, 16, 24, 12].map((height, i) => (
                      <motion.div 
                        key={i} 
                        animate={{ scaleY: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                        className="w-2 bg-blue-500/50 rounded-full"
                        style={{ height: `${height}px` }}
                      ></motion.div>
                    ))}
                  </div>
                )}

                {card.icon === "path" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-48 h-24 stroke-orange-500 fill-none stroke-2" viewBox="0 0 100 50">
                      <motion.path 
                        d="M0,50 Q25,0 50,25 T100,0"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </svg>
                  </div>
                )}

                {card.icon === "arrows" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="relative"
                    >
                      <svg className="w-32 h-32 text-emerald-400 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5.536 21.886a1.004 1.004 0 0 0 1.033-.064l13-9a1 1 0 0 0 0-1.644l-13-9A1 1 0 0 0 5 3v18a1 1 0 0 0 .536.886z" />
                      </svg>
                    </motion.div>
                  </div>
                )}

                <div className="relative z-10 mt-auto">
                  <h3 className="text-3xl font-black text-white text-center mb-2">{card.title}</h3>
                  <p className="text-gray-400 text-sm text-center px-4 group-hover:text-gray-300 transition-colors">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Montage;
