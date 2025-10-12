"use client"
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Monitor, Smartphone, Printer, Battery, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function ServiceDetails() {
  const prefersReducedMotion = useReducedMotion();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const services = [
    {
      icon: Monitor,
      title: 'IT & Telecommunication Equipment',
      description: 'We provide secure collection and disposal of IT hardware including computers, servers, routers, and networking equipment. Our certified processes ensure complete data privacy and environmentally safe recycling practices.',
      highlights: [
        'Certified data wiping and destruction',
        'Hazardous component neutralization',
        'Metal recovery & material reuse',
        'EPR documentation provided',
      ],
      gradient: 'from-primary to-accent',
      bgGradient: 'from-primary/10 to-accent/10',
      iconColor: 'text-primary',
    },
    {
      icon: Smartphone,
      title: 'Consumer Electrical & Electronics',
      description: 'Comprehensive recycling solutions for home appliances, gadgets, and personal electronic devices. We make sustainable recycling convenient while ensuring full environmental compliance.',
      highlights: [
        'Home appliance recycling',
        'Mobile phones & tablets',
        'Convenient pickup service',
        'Eco-safe material processing',
      ],
      stat: 'Over 10,000+ electronic devices recycled sustainably in 2024',
      gradient: 'from-accent to-primary',
      bgGradient: 'from-accent/10 to-primary/10',
      iconColor: 'text-accent',
    },
    {
      icon: Printer,
      title: 'Printer Recycle',
      description: 'Specialized printer recycling service where we carefully dismantle printers, process cartridges safely, and recycle plastic components. Our zero landfill policy ensures maximum resource recovery.',
      highlights: [
        'Complete printer dismantling',
        'Safe cartridge disposal',
        'Plastic parts recycling',
        'Data protection for network printers',
      ],
      gradient: 'from-secondary to-accent',
      bgGradient: 'from-secondary/10 to-accent/10',
      iconColor: 'text-secondary',
    },
    {
      icon: Battery,
      title: 'Battery Recycle',
      description: 'Expert handling of all battery types including lithium-ion, lead-acid, and dry cell batteries. Our safe chemical treatment and reprocessing methods prevent environmental contamination.',
      highlights: [
        'Lithium-ion battery recycling',
        'Lead-acid battery processing',
        'Safe chemical treatment',
        'Material recovery & reuse',
      ],
      gradient: 'from-primary to-secondary',
      bgGradient: 'from-primary/10 to-secondary/10',
      iconColor: 'text-primary',
    },
  ];

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Our Recycling Services
          </h2>
          <p className="text-base text-gray-600">
            Comprehensive e-waste solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedCard === index;

            return (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group ${
                  isExpanded ? 'md:col-span-2' : ''
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4 mb-3">
                    <motion.div
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}
                    >
                      <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">
                        {service.title}
                      </h3>
                      <p className={`text-sm text-gray-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                        {service.description}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleCard(index)}
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 border-t border-gray-100">
                      <div className={`grid gap-2 mb-4 ${isExpanded ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                        {service.highlights.map((highlight, idx) => (
                          <motion.div
                            key={idx}
                            initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                            animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{
                              duration: 0.3,
                              delay: idx * 0.1,
                            }}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                            <span className="text-sm text-gray-700">{highlight}</span>
                          </motion.div>
                        ))}
                      </div>

                      {service.stat && (
                        <motion.div
                          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                          animate={isExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className={`bg-gradient-to-br ${service.bgGradient} rounded-lg p-3 border border-emerald-200`}
                        >
                          <p className="text-sm text-emerald-700 font-semibold">
                            {service.stat}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  {!isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-3 pt-3 border-t border-gray-100"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {service.highlights.slice(0, 2).map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" strokeWidth={2.5} />
                            <span className="text-xs text-gray-600 truncate">{highlight}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => toggleCard(index)}
                        className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        +{service.highlights.length - 2} more features
                      </button>
                    </motion.div>
                  )}
                </div>

                <motion.div
                  className={`h-1 bg-gradient-to-r ${service.gradient}`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
