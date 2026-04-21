import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function Photography() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const photos = [
    {
      title: "Elegant Spaces",
      category: "Interior",
      image: "https://img.freepik.com/free-photo/view-futuristic-light-lamp-design_23-2151037575.jpg",
      categoryColor: "violet",
      height: "h-[600px] md:h-[700px]",
      colSpan: "lg:col-span-1"
    },
    {
      title: "Modern Lines",
      category: "Architecture",
      image: "https://img.freepik.com/free-photo/grayscale-shot-lake-middle-city-buildings-cloudy-sky_181624-17493.jpg",
      categoryColor: "purple",
      height: "h-[400px] md:h-[700px]",
      colSpan: "lg:col-span-2"
    },
    {
      title: "Timeless Moments",
      category: "Wedding",
      image: "https://img.freepik.com/free-photo/classic-white-gold-wedding-rings-red-bouquet_8353-8012.jpg",
      categoryColor: "violet",
      height: "h-[400px] md:h-[500px]",
      colSpan: "lg:col-span-2"
    },
    {
      title: "Urban Stories",
      category: "Street",
      image: "https://img.freepik.com/free-photo/photographer-exploring-abandoned-location_23-2150974333.jpg",
      categoryColor: "purple",
      height: "h-[600px] md:h-[500px]",
      colSpan: "lg:col-span-1"
    },
    {
      title: "Commercial Excellence",
      category: "Products",
      image: "https://img.freepik.com/free-photo/photography-studio-with-equipment-items-arrangement_23-2150254625.jpg",
      categoryColor: "fuchsia",
      height: "h-[400px] md:h-[500px]",
      colSpan: "lg:col-span-3"
    }
  ];

  const getCategoryColor = (color) => {
    const colors = {
      violet: "text-violet-300",
      purple: "text-purple-500",
      fuchsia: "text-fuchsia-400"
    };
    return colors[color] || colors.violet;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="photography" className="py-32 bg-black relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="text-violet-300 font-medium tracking-widest uppercase mb-4 text-sm">
            Captured Moments
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white">
            Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-400">
              Storytelling
            </span>
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -8 }}
              transition={{ duration: 0.3 }}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer ${photo.height} ${photo.colSpan}`}
            >
              <img 
                src={photo.image}
                alt={photo.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-8 left-8 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                <span className={`${getCategoryColor(photo.categoryColor)} font-bold uppercase tracking-wider text-sm mb-2 block`}>
                  {photo.category}
                </span>
                <h3 className="text-2xl font-bold text-white">{photo.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Photography;
