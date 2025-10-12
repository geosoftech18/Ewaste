"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Recycle, Laptop, Printer, Battery, Smartphone, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react"

type ServiceCategory = "All" | "Residential" | "Corporate"

interface Service {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  link: string
  category: ServiceCategory[]
}

const services: Service[] = [
  {
    id: "electronic-waste",
    title: "Electronic Waste Recycle",
    description: "Safe and compliant disposal of all types of e-waste.",
    icon: <Recycle className="w-12 h-12" />,
    color: "text-emerald-600",
    link: "/services/electronic-waste",
    category: ["All", "Residential", "Corporate"],
  },
  {
    id: "it-telecom",
    title: "IT & Telecommunication Equipment",
    description: "Secure recycling of IT & telecom devices with data protection.",
    icon: <Laptop className="w-12 h-12" />,
    color: "text-blue-600",
    link: "/services/it-telecom",
    category: ["All", "Corporate"],
  },
  {
    id: "printer-recycle",
    title: "Printer Recycle",
    description: "Eco-friendly recycling of old printers with data assurance.",
    icon: <Printer className="w-12 h-12" />,
    color: "text-purple-600",
    link: "/services/printer-recycle",
    category: ["All", "Corporate"],
  },
  {
    id: "battery-recycle",
    title: "Battery Recycle",
    description: "Safe disposal & recycling of used batteries.",
    icon: <Battery className="w-12 h-12" />,
    color: "text-yellow-600",
    link: "/services/battery-recycle",
    category: ["All", "Residential", "Corporate"],
  },
  {
    id: "consumer-electronics",
    title: "Consumer Electronics",
    description: "Sustainable recycling for everyday household electronics.",
    icon: <Smartphone className="w-12 h-12" />,
    color: "text-red-600",
    link: "/services/consumer-electronics",
    category: ["All", "Residential"],
  },
  {
    id: "data-destruction",
    title: "Data Destruction",
    description: "100% secure, certified data destruction for devices.",
    icon: <ShieldCheck className="w-12 h-12" />,
    color: "text-indigo-600",
    link: "/services/data-destruction",
    category: ["All", "Corporate"],
  },
]

export function ServicesGrid() {
  const [activeFilter, setActiveFilter] = useState<ServiceCategory>("All")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const filteredServices = services.filter((service) => service.category.includes(activeFilter))

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Auto-advance carousel on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 768) {
        setCurrentSlide((prev) => (prev === filteredServices.length - 1 ? 0 : prev + 1))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [filteredServices.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === filteredServices.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? filteredServices.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide()
    }

    if (touchStart - touchEnd < -75) {
      prevSlide()
    }
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional E-Waste Recycling Solutions for Businesses & Individuals
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className={`flex justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {(["All", "Residential", "Corporate"] as ServiceCategory[]).map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter)
                setCurrentSlide(0)
              }}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-emerald-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 shadow"
              }`}
              aria-label={`Filter by ${filter}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Desktop/Tablet Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service, index) => (
            <Link
              key={service.id}
              href={service.link}
              className={`group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 100 + 400}ms`,
              }}
            >
              <div
                className={`${service.color} mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-emerald-600`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
              <div className="mt-4 text-emerald-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div
          className="md:hidden relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {filteredServices.map((service) => (
                <div key={service.id} className="w-full flex-shrink-0 px-4">
                  <Link
                    href={service.link}
                    className="block bg-white rounded-2xl p-6 shadow-md active:shadow-xl transition-shadow"
                  >
                    <div className={`${service.color} mb-4`}>{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    <div className="mt-4 text-emerald-600 font-medium flex items-center gap-2">Learn More →</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg active:scale-95 transition-transform"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-6 h-6 text-emerald-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg active:scale-95 transition-transform"
            aria-label="Next service"
          >
            <ChevronRight className="w-6 h-6 text-emerald-600" />
          </button>

          {/* Dots Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            {filteredServices.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-emerald-600 w-8" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
