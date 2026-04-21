import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function Automation() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const automations = [
    {
      title: "Workflow Automation",
      description: "Streamline your business processes with intelligent automation. Connect apps, automate tasks, and boost productivity.",
      icon: "workflow",
      color: "blue",
      features: ["Multi-app Integration", "Custom Workflows", "Real-time Sync"]
    },
    {
      title: "Data Processing",
      description: "Automate data collection, transformation, and analysis. Turn raw data into actionable insights effortlessly.",
      icon: "data",
      color: "purple",
      features: ["ETL Pipelines", "Data Validation", "Auto Reports"]
    },
    {
      title: "API Integration",
      description: "Seamlessly connect your tools and services. Build powerful integrations without writing complex code.",
      icon: "api",
      color: "cyan",
      features: ["REST APIs", "Webhooks", "Custom Endpoints"]
    }
  ];

  const tools = [
    {
      name: "Slack",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_24_a8a7208838.svg"
    },
    {
      name: "Google Sheets",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_23_95d19b4191.svg"
    },
    {
      name: "Notion",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_26_e4d668a67e.svg"
    },
    {
      name: "Airtable",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_25_f3164a2781.svg"
    },
    {
      name: "Gmail",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_22_efceea22ad.svg"
    },
    {
      name: "Trello",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_21_02a1829358.svg"
    },
    {
      name: "Asana",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_20_2f391c2e94.svg"
    },
    {
      name: "Dropbox",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_19_d498d4d167.svg"
    },
    {
      name: "GitHub",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_18_1fc383c5d1.svg"
    },
    {
      name: "Stripe",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_17_55cc3454fb.svg"
    },
    {
      name: "Shopify",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_16_9c0f7c6e53.svg"
    },
    {
      name: "HubSpot",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_15_6c95309bf4.svg"
    },
    {
      name: "Salesforce",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_14_1ce4b20f0b.svg"
    },
    {
      name: "Mailchimp",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_13_ddd94c6f29.svg"
    },
    {
      name: "Twitter",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_12_ff7e22b6e3.svg"
    },
    {
      name: "LinkedIn",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_11_fec2aaf918.svg"
    },
    {
      name: "Discord",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_10_97876f19e6.svg"
    },
    {
      name: "Telegram",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_9_d6b190e0b8.svg"
    },
    {
      name: "WhatsApp",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_8_00794ba736.svg"
    },
    {
      name: "Zapier",
      logo: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/integration_6_3178149e74.svg"
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        border: "border-blue-500/30",
        gradient: "from-blue-500/10",
        text: "text-blue-400",
        glow: "group-hover:shadow-blue-500/20"
      },
      purple: {
        border: "border-purple-500/30",
        gradient: "from-purple-500/10",
        text: "text-purple-400",
        glow: "group-hover:shadow-purple-500/20"
      },
      cyan: {
        border: "border-cyan-500/30",
        gradient: "from-cyan-500/10",
        text: "text-cyan-400",
        glow: "group-hover:shadow-cyan-500/20"
      }
    };
    return colors[color] || colors.blue;
  };

  const renderIcon = (icon) => {
    if (icon === "workflow") {
      return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"></path>
        </svg>
      );
    } else if (icon === "data") {
      return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      );
    } else {
      return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      );
    }
  };

  return (
    <section id="automation" className="py-32 bg-gray-950 relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-blue-400 font-medium tracking-widest uppercase mb-4 text-sm">
            Automation Solutions
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Automate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400">
              Everything
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Transform your business with intelligent automation. We build custom workflows that save time, reduce errors, and scale your operations effortlessly.
          </p>
        </motion.div>

        {/* Automation Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {automations.map((automation, index) => {
            const colorClasses = getColorClasses(automation.color);
            return (
              <motion.div
                key={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`group relative bg-black/50 backdrop-blur-sm rounded-3xl p-8 border ${colorClasses.border} hover:border-opacity-60 transition-all duration-500 ${colorClasses.glow} shadow-xl`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${colorClasses.gradient} to-transparent border ${colorClasses.border} flex items-center justify-center mb-6 ${colorClasses.text}`}
                  >
                    {renderIcon(automation.icon)}
                  </motion.div>
                  
                  <h3 className={`text-2xl font-black text-white mb-4 ${colorClasses.text} transition-colors`}>
                    {automation.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {automation.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {automation.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <div className={`w-1.5 h-1.5 rounded-full ${colorClasses.text.replace('text-', 'bg-')}`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tools Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
            Powered by Industry Leaders
          </h3>
          <p className="text-gray-500">We work with the best automation platforms</p>
        </motion.div>

        {/* Infinite Scroll Marquee - Two Rows */}
        <div className="space-y-4">
          {/* First Row - Left to Right */}
          <div className="relative overflow-hidden py-4">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-gray-950 via-gray-950/80 to-transparent z-10"></div>
            
            <div className="flex animate-marquee">
              {/* Multiple sets for truly seamless infinite scroll */}
              {[...Array(4)].map((_, setIndex) => (
                tools.slice(0, 10).map((tool, index) => (
                  <div
                    key={`first-row-${setIndex}-${index}`}
                    className="flex size-14 md:size-[70px] items-center justify-center rounded-xl border border-white/15 bg-white/[3%] p-3 md:p-4 transition-all duration-300 hover:scale-110 hover:border-white/30 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/20 shadow-md shadow-black/50 mx-2 flex-shrink-0"
                  >
                    <img 
                      src={tool.logo} 
                      alt={tool.name}
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-white/20 to-white/5 items-center justify-center hidden">
                      <span className="text-xl font-black text-white">{tool.name[0]}</span>
                    </div>
                  </div>
                ))
              ))}
            </div>
          </div>

          {/* Second Row - Right to Left (Reverse) */}
          <div className="relative overflow-hidden py-4">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-gray-950 via-gray-950/80 to-transparent z-10"></div>
            
            <div className="flex animate-marquee-reverse">
              {/* Multiple sets for truly seamless infinite scroll */}
              {[...Array(4)].map((_, setIndex) => (
                tools.slice(10, 20).map((tool, index) => (
                  <div
                    key={`second-row-${setIndex}-${index}`}
                    className="flex size-14 md:size-[70px] items-center justify-center rounded-xl border border-white/15 bg-white/[3%] p-3 md:p-4 transition-all duration-300 hover:scale-110 hover:border-white/30 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/20 shadow-md shadow-black/50 mx-2 flex-shrink-0"
                  >
                    <img 
                      src={tool.logo} 
                      alt={tool.name}
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-white/20 to-white/5 items-center justify-center hidden">
                      <span className="text-xl font-black text-white">{tool.name[0]}</span>
                    </div>
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white rounded-full font-bold shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            Start Automating Today
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default Automation;
