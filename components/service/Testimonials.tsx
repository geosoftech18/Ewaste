"use client"
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PartnersCarousel from './PartnersCarousel';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(3);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'Tech Solutions Pvt Ltd',
      text: 'S P Recycling provided exceptional service for our IT equipment disposal. Their data destruction certificate gave us complete confidence in security.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      company: 'Green Earth NGO',
      text: 'Professional, reliable, and truly committed to environmental sustainability. Their transparent process and documentation are impressive.',
      rating: 5,
    },
    {
      name: 'Amit Patel',
      company: 'Digital Innovations Ltd',
      text: 'Outstanding e-waste management solutions. They handled our bulk IT disposal efficiently and provided detailed compliance certificates.',
      rating: 5,
    },
    {
      name: 'Sneha Reddy',
      company: 'Healthcare Systems Inc',
      text: 'Secure data destruction with full compliance. Their professional team made the entire process seamless and worry-free.',
      rating: 5,
    },
    {
      name: 'Vikram Singh',
      company: 'Finance Corp India',
      text: 'Exceptional attention to data security and environmental responsibility. Highly recommended for enterprise IT disposal needs.',
      rating: 5,
    },
    {
      name: 'Meera Desai',
      company: 'Education Trust',
      text: 'Transparent pricing, professional service, and eco-friendly practices. They exceeded our expectations in every way.',
      rating: 5,
    },
  ];

  const partners = [
    {
      id: 1,
      name: "Mars Petcare",
      industry: "IT & Technology",
      logo: "/partners/1.png",
    },
    {
      id: 2,
      name: "Westin",
      industry: "Manufacturing",
      logo: "/partners/2.png",
    },
    {
      id: 3,
      name: "Larsen & Toubro",
      industry: "Healthcare",
      logo: "/partners/3.png",
    },
    {
      id: 4,
      name: "ABB",
      industry: "Education",
      logo: "/partners/4.png",
    },
    {
      id: 5,
      name: "Usha International",
      industry: "Retail",
      logo: "/partners/5.png",
    },
    {
      id: 6,
      name: "Biological E. Ltd",
      industry: "Banking & Finance",
      logo: "/partners/6.png",
    },
    {
      id: 7,
      name: "Schneider Electric",
      industry: "Automotive",
      logo: "/partners/7.png",
    },
    {
      id: 8,
      name: "Media House",
      industry: "Media & Entertainment",
      logo: "/partners/8.png",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, isAutoPlaying, cardsPerView]);

  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + cardsPerView);
  if (visibleTestimonials.length < cardsPerView) {
    visibleTestimonials.push(...testimonials.slice(0, cardsPerView - visibleTestimonials.length));
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Leading Organizations
          </h2>
          <p className="text-lg text-gray-600">
            Hear what our clients say about our services
          </p>
        </motion.div>

        <div className="relative mb-16">
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="relative min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                  {visibleTestimonials.map((testimonial, index) => (
                    <motion.div
                      key={`${currentIndex}-${index}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative group"
                    >
                      <div className="absolute top-6 right-6 text-emerald-500 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                        <Quote className="w-12 h-12 md:w-16 md:h-16" />
                      </div>

                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>

                      <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed relative z-10 min-h-[120px]">
                        "{testimonial.text}"
                      </p>

                      <div className="border-t border-gray-200 pt-4">
                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                        <p className="text-gray-600 text-sm">{testimonial.company}</p>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 to-teal-400/0 group-hover:from-emerald-400/5 group-hover:to-teal-400/5 rounded-2xl transition-all duration-300" />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white hover:bg-emerald-500 text-gray-800 hover:text-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10 group"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white hover:bg-emerald-500 text-gray-800 hover:text-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10 group"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? 'w-8 md:w-10 h-2 md:h-2.5 bg-emerald-500'
                    : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-gray-300 hover:bg-emerald-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <PartnersCarousel partners={partners} />
      </div>
    </section>
  );
}
