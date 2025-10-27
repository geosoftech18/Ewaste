"use client"

import type React from "react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Star, Shield, Zap, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

type ServiceCategory = "All" | "Residential" | "Corporate"

interface Service {
  id: string
  title: string
  description: string
  image: string
  gradient: string
  features: string[]
  link: string
  category: ServiceCategory[]
  rating: number
  clients: string
}

const services: Service[] = [
  {
    id: "electronic-waste",
    title: "Electronic Waste Recycle",
    description: "Electronic Waste Recycling focuses on the safe collection, processing, and recovery of discarded electronic products. Our solutions ensure environmentally responsible recycling of devices, minimizing toxic waste while maximizing the reuse of valuable materials like metals, plastics, and components.",
    image: "/services/electronic waste.png",
    gradient: "from-emerald-500 to-teal-600",
    features: ["Safe Collection", "Data Destruction", "Certified Recycling", "Material Recovery"],
    link: "/services/electronic-waste-recycle",
    category: ["All", "Residential", "Corporate"],
    rating: 4.9,
    clients: "500+"
  },
  {
    id: "it-telecom",
    title: "IT & Telecommunication Equipment",
    description: "IT & Telecommunication Equipment plays a vital role in today's connected world. Our solutions focus on the responsible management, refurbishment, and recycling of devices such as computers, servers, routers, and mobile equipment. We ensure secure data handling, efficient reuse, and environmentally safe disposal—supporting a sustainable and digitally connected future.",
    image: "/services/IT & Telecommunication.png",
    gradient: "from-blue-500 to-indigo-600",
    features: ["Secure Data Handling", "Equipment Refurbishment", "Network Equipment", "Mobile Devices"],
    link: "/services/it-telecom",
    category: ["All", "Corporate"],
    rating: 4.8,
    clients: "300+"
  },
  {
    id: "Sustainable-Waste-Solutions",
    title: "Sustainable Waste Solutions",
    description: "Integrated Waste Management is a holistic approach that combines waste collection, segregation, recycling, and disposal into one efficient system. It focuses on reducing environmental impact while maximizing resource recovery, ensuring a cleaner and more sustainable future for communities and industries alike.",
    image: "/services/Sustainable Waste Solutions.png",
    gradient: "from-purple-500 to-pink-600",
    features: ["Waste Segregation", "Resource Recovery", "Environmental Impact", "Community Solutions"],
    link: "/services/Sustainable-Waste-Solutions",
    category: ["All", "Corporate"],
    rating: 4.7,
    clients: "200+"
  },
  {
    id: "EPR-Compliance-Solutions",
    title: "EPR Compliance Solutions",
    description: "Extended Producer Responsibility (EPR) Solutions empower manufacturers and brands to take accountability for the entire lifecycle of their products. From design to post-consumer waste collection, our EPR services ensure regulatory compliance, efficient recycling, and responsible waste management—creating a cleaner and more sustainable ecosystem for all.",
    image: "/services/EPR Compliance Solutions.png",
    gradient: "from-yellow-500 to-orange-600",
    features: ["Regulatory Compliance", "Lifecycle Management", "Brand Accountability", "Ecosystem Solutions"],
    link: "/services/EPR-Compliance-Solutions",
    category: ["All", "Residential", "Corporate"],
    rating: 4.9,
    clients: "400+"
  },
]

export function ServicesGrid() {
  const [activeFilter, setActiveFilter] = useState<ServiceCategory>("All")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
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
    <section ref={sectionRef} className="py-20 md:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Premium Services
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 bg-clip-text text-transparent mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional E-Waste Recycling Solutions for Businesses & Individuals
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className={`flex justify-center gap-2 mb-16 transition-all duration-1000 delay-200 ${
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
              className={`px-4 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl scale-105"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 shadow-lg border border-gray-200"
              }`}
              aria-label={`Filter by ${filter}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Desktop/Tablet Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {filteredServices.map((service, index) => (
            <Link
              key={service.id}
              href={service.link}
              className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border border-gray-200/50 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150 + 400}ms`,
              }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-30 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-800">{service.rating}</span>
                </div>

                {/* Clients Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-semibold text-gray-800">{service.clients} Clients</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {service.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-emerald-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs text-gray-500">Certified</span>
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
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
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {filteredServices.map((service) => (
                <div key={service.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-gray-200/50">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-60`}></div>
                      
                      {/* Rating Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold text-gray-800">{service.rating}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4 text-sm line-clamp-3">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {service.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <div className="text-emerald-600 font-semibold flex items-center gap-2 text-sm">
                          Learn More
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="w-3 h-3 text-emerald-500" />
                          <span className="text-xs text-gray-500">Certified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg active:scale-95 transition-transform"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-5 h-5 text-emerald-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg active:scale-95 transition-transform"
            aria-label="Next service"
          >
            <ChevronRight className="w-5 h-5 text-emerald-600" />
          </button>

          {/* Dots Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {filteredServices.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
