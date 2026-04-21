import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

function Designs() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const categories = [
    {
      id: "posters",
      title: "Posters",
      subtitle: "Event, Movie & Promotional",
      number: "01",
      color: "purple",
      colSpan: "lg:col-span-3"
    },
    {
      id: "branding",
      title: "Branding",
      subtitle: "Logos, Business Cards, Identity Systems & Guidelines",
      number: "02",
      color: "pink",
      colSpan: "lg:col-span-3"
    },
    {
      id: "social",
      title: "Social",
      subtitle: "Posts, Stories & Ads",
      number: "03",
      color: "blue",
      colSpan: "lg:col-span-2"
    },
    {
      id: "printing",
      title: "Printing",
      subtitle: "Brochures & Flyers",
      number: "04",
      color: "cyan",
      colSpan: "lg:col-span-2"
    },
    {
      id: "interior",
      title: "Interior",
      subtitle: "Spaces, Layouts & Decor",
      number: "05",
      color: "orange",
      colSpan: "lg:col-span-2"
    }
  ];

  const designData = {
    posters: [
      { title: "Poster Design 1", img: "https://i.pinimg.com/1200x/77/18/1a/77181a8f58fba00efb064ccd23971791.jpg" },
      { title: "Poster Design 2", img: "https://i.pinimg.com/1200x/8a/9c/3d/8a9c3dbdfc712770c6c2e5e5fdc24da4.jpg" },
      { title: "Poster Design 3", img: "https://i.pinimg.com/736x/71/20/02/71200295ac2c453d82b01680f8e2c8d0.jpg" },
      { title: "Poster Design 4", img: "https://i.pinimg.com/1200x/e6/aa/99/e6aa9902bf7e0a3fa1a1ed03c2e3eaad.jpg" },
      { title: "Event Flyer", img: "https://samir-najm.vercel.app/assets/FLAYERS/CONTENT/IMG_20250910_185424.jpg" },
      { title: "Poster Design 6", img: "https://i.pinimg.com/736x/57/db/4a/57db4a8ea4d11326a38f7d3c3330509f.jpg" }
    ],
    branding: [
      { title: "Brand Identity 1", img: "https://i.pinimg.com/736x/ef/6c/a4/ef6ca4bcdea3c50458f691a15b1eeb20.jpg" },
      { title: "Brand Identity 2", img: "https://i.pinimg.com/736x/ba/cb/c2/bacbc2dc95021c900eb1a09232f1ff12.jpg" },
      { title: "Brand Identity 3", img: "https://i.pinimg.com/736x/e7/f8/0a/e7f80a798f895860c88ee2c8812f9a90.jpg" },
      { title: "Brand Identity 4", img: "https://i.pinimg.com/1200x/4e/df/b6/4edfb68555334ef0d8e7110242fc5198.jpg" },
      { title: "Brand Identity 5", img: "https://i.pinimg.com/736x/85/df/b0/85dfb0839748d8fedc1687e6572ce7b4.jpg" },
      { title: "Brand Identity 6", img: "https://i.pinimg.com/736x/87/4a/2d/874a2d78bd807b00fd8e2f9451210086.jpg" }
    ],
    social: [
      { title: "Social Media 1", img: "https://i.pinimg.com/1200x/10/25/58/102558720890d383c580e7e96d377bf2.jpg" },
      { title: "Social Media 2", img: "https://i.pinimg.com/736x/2d/2b/99/2d2b99c60c0a894ab362c447e7b71cbc.jpg" },
      { title: "Social Media 3", img: "https://i.pinimg.com/736x/11/af/e1/11afe1b29272220b96b6971936e850e9.jpg" },
      { title: "Pizza Promo", img: "https://samir-najm.vercel.app/assets/SOCIAL%20MEDIA/CONTENT/PIZZA.jpg" },
      { title: "Product Promo", img: "https://samir-najm.vercel.app/assets/SOCIAL%20MEDIA/CONTENT/PRO%201.jpg" }
    ],
    printing: [
      { title: "Print Design 1", img: "https://i.pinimg.com/736x/b4/a6/49/b4a649619ff7ebb9bb0cb4af80b4d79a.jpg" },
      { title: "Print Design 2", img: "https://i.pinimg.com/1200x/38/37/af/3837afdb5e7d997be095c0366b8dd2ba.jpg" },
      { title: "Print Design 3", img: "https://i.pinimg.com/736x/20/fd/f2/20fdf294e2305e38cc14487485bb73e0.jpg" },
      { title: "Print Design 4", img: "https://i.pinimg.com/736x/93/0c/28/930c2801321c181718d5a0dcafd5f72f.jpg" },
      { title: "Print Design 5", img: "https://i.pinimg.com/1200x/5d/b9/f1/5db9f13144d16273565e7564f7be1c52.jpg" },
      { title: "Print Design 6", img: "https://i.pinimg.com/1200x/20/0b/e6/200be6765b9b8bb067325bb4dce0bed5.jpg" }
    ],
    interior: [
      { title: "Decor 1", img: "/backup/mlayr/decoration interieur/DECOR 1.jpeg" },
      { title: "Decor 2", img: "/backup/mlayr/decoration interieur/DECOR 2.jpeg" },
      { title: "Decor 3", img: "/backup/mlayr/decoration interieur/DECOR 3.jpeg" },
      { title: "Decor 4", img: "/backup/mlayr/decoration interieur/DECOR 4.jpeg" },
      { title: "Decor 5", img: "/backup/mlayr/decoration interieur/DECOR 5.jpeg" },
      { title: "Decor 6", img: "/backup/mlayr/decoration interieur/DECOR 6.jpeg" }
    ]
  };

  const getColorClasses = (color) => {
    const colors = {
      purple: {
        border: "hover:border-purple-500/50",
        gradient: "from-purple-500/10",
        text: "text-purple-500",
        hoverText: "group-hover:text-purple-400"
      },
      pink: {
        border: "hover:border-pink-500/50",
        gradient: "from-pink-500/10 via-purple-500/10",
        text: "text-pink-500",
        hoverText: "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500"
      },
      blue: {
        border: "hover:border-blue-500/50",
        gradient: "from-blue-500/10",
        text: "text-blue-500",
        hoverText: "group-hover:text-blue-400"
      },
      cyan: {
        border: "hover:border-cyan-500/50",
        gradient: "from-cyan-500/10",
        text: "text-cyan-500",
        hoverText: "group-hover:text-cyan-400"
      },
      orange: {
        border: "hover:border-orange-500/50",
        gradient: "from-orange-500/10",
        text: "text-orange-500",
        hoverText: "group-hover:text-orange-400"
      }
    };
    return colors[color] || colors.purple;
  };

  const openModal = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const closeModal = () => {
    setSelectedCategory(null);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <section id="designs" className="py-32 relative bg-black overflow-hidden min-h-screen flex flex-col justify-center" ref={sectionRef}>
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-purple-900/20 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-10 relative">
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-violet-300 font-medium tracking-widest uppercase mb-4 text-sm">
              Our Portfolio
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-white">
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-400">
                Collections
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
            {categories.map((category, index) => {
              const colorClasses = getColorClasses(category.color);
              return (
                <motion.div
                  key={category.id}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => openModal(category.id)}
                  className={`group relative h-[320px] rounded-3xl overflow-hidden cursor-pointer ${category.colSpan} bg-[#0a0a0a] border border-white/10 ${colorClasses.border} transition-all duration-500`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} via-transparent to-transparent opacity-1 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className={`${colorClasses.text} font-mono text-sm tracking-widest uppercase`}>
                        {category.number}
                      </span>
                      <svg 
                        className={`w-8 h-8 text-white/20 ${colorClasses.text.replace('text-', 'group-hover:text-')} transform transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                    </div>

                    <div className="relative z-10">
                      <h3 className={`text-3xl md:text-4xl font-black text-white mb-2 ${colorClasses.hoverText} transition-all duration-300`}>
                        {category.title}
                      </h3>
                      <p className="text-gray-500 group-hover:text-gray-300 transition-colors">
                        {category.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={closeModal}
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-7xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/30 rounded-[2rem] p-6 md:p-12 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10 border-b border-white/30 pb-6">
                <div>
                  <span className="text-purple-500 font-mono text-sm tracking-widest uppercase block mb-2">
                    Category Gallery
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black text-white capitalize">
                    {selectedCategory}
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="group w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300"
                >
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </motion.button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designData[selectedCategory]?.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center"
                  >
                    <img 
                      src={item.img} 
                      alt={item.title}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Designs;
