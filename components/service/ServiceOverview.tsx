"use client"
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Leaf, Shield, Truck, Lock, Package, Recycle, RefreshCw, FileText, CheckCircle } from 'lucide-react';

const tags = [
  { label: 'Eco-Friendly', icon: Leaf },
  { label: 'Compliant', icon: Shield },
  { label: 'Nationwide Pickup', icon: Truck },
  { label: 'Secure Data Handling', icon: Lock },
];

const steps = [
  {
    title: 'Collect',
    desc: 'We gather e-waste safely from homes, offices, and enterprises nationwide.',
    icon: Package,
    color: 'from-emerald-500 to-emerald-700',
    shadowColor: 'rgba(16, 185, 129, 0.3)',
    progressColor: '#10b981',
  },
  {
    title: 'Recycle',
    desc: 'Advanced recycling methods recover valuable materials with zero pollution.',
    icon: Recycle,
    color: 'from-teal-500 to-emerald-500',
    shadowColor: 'rgba(59, 130, 246, 0.3)',
    progressColor: '#14b8a6',
  },
  {
    title: 'Reuse',
    desc: 'Usable parts are refurbished and reused to extend their lifecycle sustainably.',
    icon: RefreshCw,
    color: 'from-emerald-600 to-teal-500',
    shadowColor: 'rgba(251, 146, 60, 0.3)',
    progressColor: '#059669',
  },
  {
    title: 'Report',
    desc: 'We provide detailed recycling and compliance reports for full transparency.',
    icon: FileText,
    color: 'from-emerald-500 to-teal-500',
    shadowColor: 'rgba(168, 85, 247, 0.3)',
    progressColor: '#10b981',
  },
];

export default function ServiceOverview() {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [clickedStep, setClickedStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCardClick = (index: number) => {
    setClickedStep(index);
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const getProgressWidth = () => {
    if (hoveredStep !== null) {
      return ((hoveredStep + 1) / steps.length) * 100;
    }
    if (clickedStep !== null) {
      return ((clickedStep + 1) / steps.length) * 100;
    }
    if (completedSteps.size > 0) {
      const maxCompleted = Math.max(...Array.from(completedSteps));
      return ((maxCompleted + 1) / steps.length) * 100;
    }
    return 0;
  };

  const getActiveStep = () => {
    if (hoveredStep !== null) return hoveredStep;
    if (clickedStep !== null) return clickedStep;
    if (completedSteps.size > 0) return Math.max(...Array.from(completedSteps));
    return -1;
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20" aria-labelledby="service-overview-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <motion.h2
            id="service-overview-title"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Service Overview
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-gray-600 leading-relaxed"
          >
            At S P Recycling Pvt Ltd, we specialize in the responsible collection, recycling, and reuse of electronic waste across India.
            Our process ensures full compliance with environmental laws while safeguarding your data and reducing landfill impact.
            Through sustainable technology and transparent reporting, we help businesses and individuals contribute to a cleaner, safer planet.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tags.map((tag, i) => {
            const Icon = tag.icon;
            return (
              <motion.div
                key={tag.label}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white shadow-md border border-gray-200 text-gray-800 font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <Icon className="w-5 h-5 text-emerald-600" />
                <span>{tag.label}</span>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isCompleted = completedSteps.has(i);
            const isHovered = hoveredStep === i;

            return (
              <motion.div
                key={step.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9, y: 30 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.2,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={prefersReducedMotion ? {} : {
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                onHoverStart={() => setHoveredStep(i)}
                onHoverEnd={() => setHoveredStep(null)}
                onClick={() => handleCardClick(i)}
                className={`relative bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center group cursor-pointer overflow-hidden transition-all duration-300 ${
                  isCompleted ? 'ring-2 ring-emerald-500' : ''
                }`}
              >
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg z-20"
                  >
                    <CheckCircle className="w-6 h-6 text-white" />
                  </motion.div>
                )}

                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${step.shadowColor}, transparent)`,
                  }}
                />

                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: step.shadowColor }}
                  animate={prefersReducedMotion ? {} : {
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    delay: i * 0.5,
                    ease: 'easeInOut',
                  }}
                />

                <motion.div
                  className={`relative z-10 mx-auto w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-xl mb-6 group-hover:shadow-2xl transition-shadow duration-300`}
                  animate={prefersReducedMotion ? {} : {
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.8,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                  whileHover={prefersReducedMotion ? {} : {
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  <Icon className="w-10 h-10" strokeWidth={2} />
                </motion.div>

                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>

                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} transition-all duration-300 ${
                    isHovered || isCompleted ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <div className="max-w-5xl mx-auto">
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full overflow-hidden"
                initial={{ width: '0%' }}
                animate={{ width: `${getProgressWidth()}%` }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: hoveredStep !== null
                      ? `linear-gradient(to right, ${steps.slice(0, hoveredStep + 1).map(s => s.progressColor).join(', ')})`
                      : clickedStep !== null
                      ? `linear-gradient(to right, ${steps.slice(0, clickedStep + 1).map(s => s.progressColor).join(', ')})`
                      : completedSteps.size > 0
                      ? `linear-gradient(to right, ${steps.slice(0, Math.max(...Array.from(completedSteps)) + 1).map(s => s.progressColor).join(', ')})`
                      : '#e5e7eb',
                  }}
                />
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2"
                  style={{
                    borderColor: hoveredStep !== null
                      ? steps[hoveredStep].progressColor
                      : clickedStep !== null
                      ? steps[clickedStep].progressColor
                      : completedSteps.size > 0
                      ? steps[Math.max(...Array.from(completedSteps))].progressColor
                      : '#d1d5db',
                  }}
                  animate={prefersReducedMotion ? {} : {
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>

              <div className="absolute inset-0 flex justify-between items-center px-1">
                {steps.map((step, i) => {
                  const isCompleted = completedSteps.has(i);
                  const activeStep = getActiveStep();
                  const isActive = i === activeStep;
                  const isPassed = i <= activeStep;

                  return (
                    <motion.div
                      key={i}
                      className="relative z-10"
                      animate={prefersReducedMotion ? {} : {
                        scale: isActive ? 1.5 : isPassed ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                          isCompleted
                            ? 'bg-emerald-500 border-emerald-600 shadow-lg'
                            : isActive
                            ? 'bg-white shadow-xl'
                            : isPassed
                            ? 'bg-white shadow-md'
                            : 'bg-gray-300 border-gray-400'
                        }`}
                        style={{
                          borderColor: isActive && !isCompleted
                            ? steps[i].progressColor
                            : isCompleted
                            ? '#059669'
                            : isPassed
                            ? steps[i].progressColor
                            : '#9ca3af',
                        }}
                        animate={isActive && !prefersReducedMotion ? {
                          boxShadow: [
                            `0 0 0 0px ${steps[i].progressColor}40`,
                            `0 0 0 8px ${steps[i].progressColor}00`,
                          ],
                        } : {}}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                      >
                        {isCompleted && (
                          <CheckCircle className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between mt-4 px-2">
              {steps.map((step, i) => {
                const activeStep = getActiveStep();
                const isActive = i === activeStep;

                return (
                  <motion.div
                    key={i}
                    className="text-center"
                    style={{ width: `${100 / steps.length}%` }}
                    animate={prefersReducedMotion ? {} : {
                      y: isActive ? -2 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className={`text-sm font-medium transition-all duration-300 ${
                      isActive ? 'text-gray-900 font-bold' : completedSteps.has(i) ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={scrollToForm}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            Explore Full Process
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={prefersReducedMotion ? {} : {
                x: [0, 4, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'easeInOut',
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
