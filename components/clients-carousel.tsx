"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Client data with logos, names, industries, and testimonials
const clients = [
  {
    id: 1,
    name: "Tech Solutions Inc",
    industry: "IT & Technology",
    logo: "/tech-company-logo.jpg",
    testimonial:
      "S P Recycling helped us responsibly dispose of 500+ old computers. Professional and eco-friendly service!",
  },
  {
    id: 2,
    name: "Green Manufacturing Co",
    industry: "Manufacturing",
    logo: "/manufacturing-company-logo.png",
    testimonial: "Excellent e-waste management for our factory. They handle everything from pickup to certification.",
  },
  {
    id: 3,
    name: "City Hospital",
    industry: "Healthcare",
    logo: "/hospital-logo.png",
    testimonial: "Secure data destruction and compliant medical equipment recycling. Highly recommended!",
  },
  {
    id: 4,
    name: "Smart Education Academy",
    industry: "Education",
    logo: "/education-institution-logo.png",
    testimonial: "They recycled our old lab equipment and computers. Great service for educational institutions.",
  },
  {
    id: 5,
    name: "Retail Chain Ltd",
    industry: "Retail",
    logo: "/abstract-retail-logo.png",
    testimonial: "Reliable partner for recycling POS systems and electronic equipment across our 20+ stores.",
  },
  {
    id: 6,
    name: "Finance Corp",
    industry: "Banking & Finance",
    logo: "/finance-company-logo.png",
    testimonial: "Secure and certified data destruction services. Perfect for our compliance requirements.",
  },
  {
    id: 7,
    name: "Auto Industries",
    industry: "Automotive",
    logo: "/automotive-company-logo.png",
    testimonial: "Professional handling of industrial electronic waste. Timely and efficient service.",
  },
  {
    id: 8,
    name: "Media House",
    industry: "Media & Entertainment",
    logo: "/generic-media-logo.png",
    testimonial: "They recycled our old broadcasting equipment responsibly. Excellent environmental practices.",
  },
  {
    id: 9,
    name: "Pharma Solutions",
    industry: "Pharmaceutical",
    logo: "/pharmaceutical-company-logo.png",
    testimonial: "Compliant and secure e-waste disposal for our research labs. Very professional team.",
  },
  {
    id: 10,
    name: "Logistics Pro",
    industry: "Logistics",
    logo: "/logistics-company-logo.png",
    testimonial: "Great service for recycling our fleet tracking devices and warehouse electronics.",
  },
  {
    id: 11,
    name: "Hotel Group",
    industry: "Hospitality",
    logo: "/hotel-company-logo.jpg",
    testimonial: "Recycled electronics from our 15 properties. Smooth process and great customer service.",
  },
  {
    id: 12,
    name: "Construction Corp",
    industry: "Construction",
    logo: "/construction-company-logo.png",
    testimonial: "Reliable partner for disposing of electronic equipment from our project sites.",
  },
]

const industries = ["All", "IT & Technology", "Manufacturing", "Healthcare", "Education", "Retail", "Banking & Finance"]

export function ClientsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [selectedClient, setSelectedClient] = useState<(typeof clients)[0] | null>(null)
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [itemsPerView, setItemsPerView] = useState(6)
  const autoPlayRef = useRef<NodeJS.Timeout>()

  // Filter clients by industry
  const filteredClients =
    selectedIndustry === "All" ? clients : clients.filter((client) => client.industry === selectedIndustry)

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(4)
      } else {
        setItemsPerView(6)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(filteredClients.length / itemsPerView))
      }, 3000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, filteredClients.length, itemsPerView])

  const totalPages = Math.ceil(filteredClients.length / itemsPerView)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  const visibleClients = filteredClients.slice(currentIndex * itemsPerView, (currentIndex + 1) * itemsPerView)

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted By Leading Businesses & Industries
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We proudly serve 20+ industries and a growing network of corporate and residential clients.
          </p>
        </motion.div>

        {/* Industry Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
        >
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => {
                setSelectedIndustry(industry)
                setCurrentIndex(0)
              }}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                selectedIndustry === industry
                  ? "bg-green-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-sm"
              }`}
            >
              {industry}
            </button>
          ))}
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white shadow-lg hover:bg-green-50 hover:border-green-600 hover:text-green-600 rounded-full w-10 h-10 md:w-12 md:h-12"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white shadow-lg hover:bg-green-50 hover:border-green-600 hover:text-green-600 rounded-full w-10 h-10 md:w-12 md:h-12"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </Button>

          {/* Logos Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
          >
            <AnimatePresence mode="wait">
              {visibleClients.map((client, index) => (
                <motion.div
                  key={`${client.id}-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setSelectedClient(client)}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8 cursor-pointer border-2 border-transparent hover:border-green-200"
                >
                  {/* Logo */}
                  <div className="relative aspect-[2/1] flex items-center justify-center">
                    <img
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>

                  {/* Client Name */}
                  <div className="mt-4 text-center">
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                      {client.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{client.industry}</p>
                  </div>

                  {/* Testimonial Icon */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Quote className="w-5 h-5 text-green-600" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Dots Pagination */}
          <div className="flex justify-center gap-2 mt-8 md:mt-12">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-green-600 w-6 md:w-8" : "bg-gray-300 hover:bg-green-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 md:mt-16"
        >
          {[
            { label: "Industries Served", value: "20+" },
            { label: "Corporate Clients", value: "500+" },
            { label: "Tons Recycled", value: "10K+" },
            { label: "Client Satisfaction", value: "98%" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Testimonial Dialog */}
      <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Quote className="w-6 h-6 text-green-600" />
              {selectedClient?.name}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">{selectedClient?.industry}</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-gray-700 leading-relaxed italic">"{selectedClient?.testimonial}"</p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
