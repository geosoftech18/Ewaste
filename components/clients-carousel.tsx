"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Client data with logos, names, industries, and testimonials
const clients = [
  {
    id: 1,
    name: "Mars Petcare",
    industry: "IT & Technology",
    logo: "/partners/1.png",
    testimonial:
      "S P Recycling helped us responsibly dispose of 500+ old computers. Professional and eco-friendly service!",
  },
  {
    id: 2,
    name: "Westin",
    industry: "Manufacturing",
    logo: "/partners/2.png",
    testimonial: "Excellent e-waste management for our factory. They handle everything from pickup to certification.",
  },
  {
    id: 3,
    name: "Larsen & Toubro",
    industry: "Healthcare",
    logo: "/partners/3.png",
    testimonial: "Secure data destruction and compliant medical equipment recycling. Highly recommended!",
  },
  {
    id: 4,
    name: "ABB",
    industry: "Education",
    logo: "/partners/4.png",
    testimonial: "They recycled our old lab equipment and computers. Great service for educational institutions.",
  },
  {
    id: 5,
    name: "Usha International",
    industry: "Retail",
    logo: "/partners/5.png",
    testimonial: "Reliable partner for recycling POS systems and electronic equipment across our 20+ stores.",
  },
  {
    id: 6,
    name: "Biological E. Ltd",
    industry: "Banking & Finance",
    logo: "/partners/6.png",
    testimonial: "Secure and certified data destruction services. Perfect for our compliance requirements.",
  },
  {
    id: 7,
    name: "Schneider Electric",
    industry: "Automotive",
    logo: "/partners/7.png",
    testimonial: "Professional handling of industrial electronic waste. Timely and efficient service.",
  },
  {
    id: 8,
    name: "DR.Reddy",
    industry: "Media & Entertainment",
    logo: "/partners/8.png",
    testimonial: "They recycled our old broadcasting equipment responsibly. Excellent environmental practices.",
  },
  // {
  //   id: 9,
  //   name: "Pharma Solutions",
  //   industry: "Pharmaceutical",
  //   logo: "/pharmaceutical-company-logo.png",
  //   testimonial: "Compliant and secure e-waste disposal for our research labs. Very professional team.",
  // },
  // {
  //   id: 10,
  //   name: "Logistics Pro",
  //   industry: "Logistics",
  //   logo: "/logistics-company-logo.png",
  //   testimonial: "Great service for recycling our fleet tracking devices and warehouse electronics.",
  // },
  // {
  //   id: 11,
  //   name: "Hotel Group",
  //   industry: "Hospitality",
  //   logo: "/hotel-company-logo.jpg",
  //   testimonial: "Recycled electronics from our 15 properties. Smooth process and great customer service.",
  // },
  // {
  //   id: 12,
  //   name: "Construction Corp",
  //   industry: "Construction",
  //   logo: "/construction-company-logo.png",
  //   testimonial: "Reliable partner for disposing of electronic equipment from our project sites.",
  // },
]

const industries = ["All", "IT & Technology", "Manufacturing", "Healthcare", "Education", "Retail", "Banking & Finance"]

// Animated Counter Component
function AnimatedCounter({
  end,
  suffix = "",
}: {
  end: number
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            let startTime: number | null = null
            const duration = 2000 // 2 seconds

            const animate = (currentTime: number) => {
              if (!startTime) startTime = currentTime
              const progress = Math.min((currentTime - startTime) / duration, 1)

              setCount(Math.floor(progress * end))

              if (progress < 1) {
                requestAnimationFrame(animate)
              }
            }

            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [end, hasAnimated])

  return (
    <div ref={ref} className="text-2xl md:text-4xl font-bold text-green-600 mb-2">
      {count}
      {suffix}
    </div>
  )
}

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

  // Auto-play functionality for infinite scroll
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1
          // Reset to beginning when we reach the end of the first set
          if (nextIndex >= filteredClients.length) {
            return 0
          }
          return nextIndex
        })
      }, 2000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, filteredClients.length])

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1
      // Go to end if we're at the beginning
      if (prevIndex < 0) {
        return filteredClients.length - 1
      }
      return prevIndex
    })
  }

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1
      // Reset to beginning when we reach the end
      if (nextIndex >= filteredClients.length) {
        return 0
      }
      return nextIndex
    })
  }

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
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
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
          className="mb-8 md:mb-12"
        >
          {/* Desktop: flex-wrap justify-center */}
          <div className="hidden md:flex flex-wrap justify-center gap-2 md:gap-3">
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
          </div>

          {/* Mobile: horizontal scrollable */}
          <div className="md:hidden">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => {
                    setSelectedIndustry(industry)
                    setCurrentIndex(0)
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    selectedIndustry === industry
                      ? "bg-green-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-sm"
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
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
            className="absolute md:block hidden left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white shadow-lg hover:bg-green-50 hover:border-green-600 hover:text-green-600 rounded-full w-10 h-10 md:w-12 md:h-12"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="absolute md:block hidden right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white shadow-lg hover:bg-green-50 hover:border-green-600 hover:text-green-600 rounded-full w-10 h-10 md:w-12 md:h-12"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </Button>

          {/* Infinite Scroll Container */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-6"
              animate={{ 
                x: `-${currentIndex * (100 / itemsPerView)}%`,
                opacity: 1
              }}
              transition={{ 
                duration: 0.8, 
                ease: "easeInOut" 
              }}
            >
              {/* Duplicate clients for infinite scroll */}
              {[...filteredClients, ...filteredClients, ...filteredClients].map((client, index) => (
                <motion.div
                  key={`${client.id}-${index}`}
                  onClick={() => setSelectedClient(client)}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-3 md:p-4 lg:p-6 cursor-pointer border-2 border-transparent hover:border-green-200 flex-shrink-0"
                  style={{ 
                    flexBasis: `calc(${100 / itemsPerView}% - ${itemsPerView === 2 ? 4 : itemsPerView === 4 ? 12 : 20}px)`,
                    minWidth: itemsPerView === 2 ? 'calc(50% - 4px)' : '0'
                  }}
                >
                  {/* Logo */}
                  <div className="relative aspect-[2/1] flex items-center justify-center">
                    <Image
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      width={240}
                      height={120}
                      loading="lazy"
                      sizes="(max-width: 768px) 40vw, 15vw"
                      quality={70}
                      className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>

                  {/* Client Name */}
                  <div className="mt-2 md:mt-4 text-center">
                    <p className="text-xs md:text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                      {client.name}
                    </p>
                   
                  </div>

                  {/* Testimonial Icon */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Quote className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 md:mt-16 max-w-7xl mx-auto"
        >
          {[
            { label: "Industries Served", value: 20, suffix: "+" },
            { label: "Corporate Clients", value: 500, suffix: "+" },
            { label: "Tons Recycled", value: 10, suffix: "K+" },
            { label: "Client Satisfaction", value: 98, suffix: "%" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
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
