"use client"
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Award, Users, Clock, Lock, Leaf, FileCheck } from 'lucide-react';

function Counter({ end, duration = 2, suffix = '', prefix = '' }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    const animationDuration = prefersReducedMotion ? 0 : duration * 1000;
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / animationDuration, 1);

      // Easing function for smooth acceleration and deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration, prefersReducedMotion]);

  return (
    <div ref={ref} className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

export default function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: 'Certified & Compliant Recycling',
      description: 'ISO certified processes ensuring adherence to all environmental and safety regulations.',
    },
    {
      icon: Users,
      title: 'Expert & Experienced Team',
      description: 'Skilled professionals with years of experience in e-waste management and recycling.',
    },
    {
      icon: Clock,
      title: '24/7 Support & Flexible Operations',
      description: 'Round-the-clock customer support and flexible scheduling to meet your needs.',
    },
    {
      icon: Lock,
      title: '100% Data Security',
      description: 'Military-grade data destruction with certified documentation for complete peace of mind.',
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly Disposal',
      description: 'Zero landfill policy with maximum resource recovery and sustainable practices.',
    },
    {
      icon: FileCheck,
      title: 'Transparent Process Reports',
      description: 'Detailed documentation and certificates for every stage of the recycling process.',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose S P Recycling?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Leading the way in sustainable e-waste management with certified processes and unmatched expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-emerald-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-2xl p-1 shadow-xl"
        >
          <div className="bg-gradient-to-br from-emerald-200/75 via-emerald-200 to-emerald-200/75 rounded-xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-2"
              >
                <Counter end={50} duration={2.5} suffix="+" />
                <div className="text-gray-600 font-semibold text-sm tracking-wide uppercase">Clients Served</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-2"
              >
                <Counter end={2000} duration={3} suffix="+" />
                <div className="text-gray-600 font-semibold text-sm tracking-wide uppercase">Kg Waste Recycled</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-2"
              >
                <Counter end={100} duration={2} suffix="%" />
                <div className="text-gray-600 font-semibold text-sm tracking-wide uppercase">Client Satisfaction</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
