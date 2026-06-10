/* eslint-disable react/prop-types */
import { useMemo, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const COLLECTION_COL_SPANS = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2'];
const COLLECTION_COLORS = ['purple', 'pink', 'blue', 'cyan', 'orange'];

function parseTags(tags) {
  return String(tags || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function Designs({ collections = [], isLoading = false, error = '' }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const categories = useMemo(
    () =>
      collections.map((collection, index) => {
        const tags = parseTags(collection.tags);

        return {
          id: String(collection.id),
          title: collection.title || `Collection #${collection.id}`,
          subtitle: tags.length ? tags.slice(0, 4).join(' / ') : `${collection.images?.length || 0} images`,
          number: String(index + 1).padStart(2, '0'),
          color: COLLECTION_COLORS[index % COLLECTION_COLORS.length],
          colSpan: COLLECTION_COL_SPANS[index % COLLECTION_COL_SPANS.length],
          images: (collection.images || []).filter((image) => image.imageUrl),
        };
      }),
    [collections]
  );
  const selectedCollection = categories.find((category) => category.id === selectedCategory);

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

          {isLoading && categories.length === 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
              {[0, 1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className={`h-[320px] animate-pulse rounded-3xl border border-white/10 bg-white/5 ${COLLECTION_COL_SPANS[item % COLLECTION_COL_SPANS.length]}`}
                />
              ))}
            </div>
          )}

          {!isLoading && error && categories.length === 0 && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-5 text-center text-sm font-semibold text-red-200">
              {error}
            </div>
          )}

          {!isLoading && !error && categories.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center text-sm font-semibold text-gray-400">
              No collections are available yet.
            </div>
          )}

          {categories.length > 0 && (
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
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedCollection && (
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
                    {selectedCollection.title}
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
                {selectedCollection.images.map((item, index) => (
                  <motion.div 
                    key={item.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center"
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={`${selectedCollection.title} ${index + 1}`}
                      loading={index < 3 ? 'eager' : 'lazy'}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                ))}
              </div>
              {selectedCollection.images.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center text-sm font-semibold text-gray-400">
                  No images are available yet.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Designs;
