"use client"
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PartnersCarouselProps {
  partners: string[];
}

export default function PartnersCarousel({ partners }: PartnersCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(6);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(5);
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
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, isAutoPlaying, cardsPerView]);

  const maxIndex = Math.max(0, partners.length - cardsPerView);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visiblePartners = partners.slice(currentIndex, currentIndex + cardsPerView);
  if (visiblePartners.length < cardsPerView) {
    visiblePartners.push(...partners.slice(0, cardsPerView - visiblePartners.length));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl p-8 md:p-12 shadow-lg relative"
    >
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
        Our Trusted Partners
      </h3>

      <div className="relative">
        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative min-h-[140px] md:min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8"
              >
                {visiblePartners.map((partner, index) => (
                  <motion.div
                    key={`${currentIndex}-${index}`}
                    initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotateY: 5,
                      transition: { duration: 0.3 }
                    }}
                    className="flex items-center justify-center p-6 md:p-8 rounded-xl bg-gradient-to-br from-gray-50 to-emerald-50 hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 group cursor-pointer"
                    style={{ perspective: '1000px' }}
                  >
                    <div className="text-center">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-100 to-teal-100 group-hover:from-emerald-200 group-hover:to-teal-200 rounded-full flex items-center justify-center mb-3 md:mb-4 shadow-md group-hover:shadow-xl transition-all duration-300 mx-auto"
                      >
                        <span className="text-2xl md:text-3xl font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors duration-300">
                          {partner.charAt(0)}
                        </span>
                      </motion.div>
                      <p className="text-sm md:text-base text-gray-700 font-semibold group-hover:text-emerald-700 transition-colors duration-300">
                        {partner}
                      </p>
                      <motion.div
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        className="h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto mt-2"
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 hover:scale-110"
          aria-label="Previous partners"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 hover:scale-110"
          aria-label="Next partners"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="flex justify-center gap-2 mt-8 md:mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index
                  ? 'w-8 md:w-10 h-2 md:h-2.5 bg-emerald-500'
                  : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-gray-300 hover:bg-emerald-300'
              }`}
              aria-label={`Go to partners slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 pointer-events-none"
        animate={{
          background: [
            'linear-gradient(to bottom right, rgba(16, 185, 129, 0.05), rgba(20, 184, 166, 0.05))',
            'linear-gradient(to bottom right, rgba(20, 184, 166, 0.05), rgba(16, 185, 129, 0.05))',
            'linear-gradient(to bottom right, rgba(16, 185, 129, 0.05), rgba(20, 184, 166, 0.05))',
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
