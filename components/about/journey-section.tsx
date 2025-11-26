"use client"

import { useState } from "react"
import { TimelineCarousel, type TimelineItem } from "@/components/about/timeline-carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export default function JourneySection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const items: TimelineItem[] = [
    {
      year: 2015,
      title: "Company Launched",
      subtitle: "Foundation",
      tone: "blue",
      description:
        "We officially launched our company with a clear vision to deliver high-quality solutions and build long-term customer relationships.",
    },
    {
      year: 2017,
      title: "20% Customer Acquisition",
      subtitle: "Growth",
      tone: "green",
      description: "Within just two years, we successfully acquired 20% of our initial customer target, marking a strong and promising start.",
    },
    {
      year: 2019,
      title: "80% Customer Acquisition",
      subtitle: "Expansion",
      tone: "purple",
      description: "Our services gained significant momentum, and by 2019, we achieved 80% of our total customer acquisition goal, establishing a strong market presence.",
    },
    {
      year: 2021,
      title: "Expanded to 7 Cities",
      subtitle: "Regional",
      tone: "orange",
      description: "With rising demand, we expanded operations into 7 major cities, strengthening our regional reach and service capability.",
    },
    {
      year: 2024,
      title: "Operating in 10 Cities",
      subtitle: "National",
      tone: "blue",
      description: "By 2024, we scaled our network to 10 cities, achieving wider coverage and improved accessibility for customers across India.",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  return (
    <section className="bg-gray-50 py-36 md:py-28">
      <div className="relative overflow-visible w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Timeline - Keep Original */}
        <div className="hidden md:block">
          <TimelineCarousel items={items} heading="Our Journey" />
        </div>

        {/* Mobile Carousel - New Simple Version */}
        <div className="md:hidden">
          {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">Our Journey</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            From a small recycling initiative to a nationwide e-waste management network.
          </p>
        </motion.div>

          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Previous milestone"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Next milestone"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Carousel Content */}
            <div className="bg-white rounded-lg shadow-md p-6 mx-8 border-2 border-green-100">
              <div className="text-center">
                {/* Year */}
                <div className="text-3xl font-bold text-green-600 mb-2">{items[currentIndex].year}</div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{items[currentIndex].title}</h3>
                
                {/* Subtitle */}
                <div className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full mb-4 border border-green-200">
                  {items[currentIndex].subtitle}
                </div>
                
                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {items[currentIndex].description}
                </p>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-green-500 w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
