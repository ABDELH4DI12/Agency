import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function Printing() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const products = [
    {
      title: "Custom Apparel",
      description: "Hoodies, T-shirts, and Caps. Premium cotton blends with durable prints that survive the wash.",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
      features: ["Screen Printing", "Embroidery"],
      color: "purple"
    },
    {
      title: "Drinkware",
      description: "Mugs, Tumblers, and Bottles. High-quality ceramic and stainless steel options for every desk.",
      image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80",
      features: ["Laser Engraving", "Full Color Sublimation"],
      color: "violet"
    },
    {
      title: "Office Essentials",
      description: "Notebooks, Pens, and Business Cards. Make a lasting first impression with premium stationery.",
      image: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=800&q=80",
      features: ["Gold Foil", "Soft Touch Finish"],
      color: "cyan"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      purple: "hover:border-purple-500/50 group-hover:text-purple-400",
      violet: "hover:border-violet-500/50 group-hover:text-violet-300",
      cyan: "hover:border-cyan-500/50 group-hover:text-cyan-400"
    };
    return colors[color] || colors.purple;
  };

  const getFeatureColor = (color) => {
    const colors = {
      purple: "bg-purple-500",
      violet: "bg-violet-400",
      cyan: "bg-cyan-500"
    };
    return colors[color] || colors.purple;
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="printing" className="py-32 bg-gray-950 px-4 md:px-16 relative overflow-hidden" ref={sectionRef}>
      {/* Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-900/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="text-purple-400 font-medium tracking-widest uppercase mb-4 text-sm">
            Corporate Solutions
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">
              Merchandise
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-lg">
            Elevate your brand with high-quality printing solutions. From custom apparel to office essentials, we bring your identity to the physical world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`group relative bg-[#0f0f0f] rounded-3xl p-8 border border-white/5 ${getColorClasses(product.color).split(' ')[0]} transition-all duration-500`}
            >
              <div className="h-48 mb-8 rounded-2xl overflow-hidden bg-white/5 relative">
                <img 
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h3 className={`text-2xl font-bold text-white mb-4 ${getColorClasses(product.color).split(' ')[1]} transition-colors`}>
                {product.title}
              </h3>
              <p className="text-gray-400 mb-6">{product.description}</p>
              <ul className="text-sm text-gray-500 space-y-2">
                {product.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${getFeatureColor(product.color)}`}></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full font-bold text-white transition-all"
          >
            Request Catalog
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default Printing;
