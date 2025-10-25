"use client"

import { useState, useEffect, useRef } from "react"
import { CheckCircle, Shield, Award, Users, Clock, Leaf } from "lucide-react"

interface WhyChooseUsProps {
  title: string
  subtitle: string
  description: string
  features: Array<{
    icon: string
    title: string
    description: string
  }>
  stats: Array<{
    number: string
    label: string
  }>
}

const iconMap = {
  'check-circle': CheckCircle,
  'shield': Shield,
  'award': Award,
  'users': Users,
  'clock': Clock,
  'leaf': Leaf,
}

export function WhyChooseUs({ title, subtitle, description, features }: WhyChooseUsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
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

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Move by 1 card at a time, but only if we have more than 3 features
        if (features.length <= 3) {
          return prevIndex // Don't scroll if 3 or fewer features
        }
        
        // Calculate how many positions we can scroll to
        const totalPositions = features.length - 2 // For 6 features: 4 positions (0,1,2,3)
        const nextIndex = (prevIndex + 1) % totalPositions
        
        console.log(`Current: ${prevIndex}, Next: ${nextIndex}, Total Positions: ${totalPositions}, Features: ${features.length}`)
        return nextIndex
      })
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [features.length])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {subtitle}
          </p>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p> 
        </div>
        
        {/* Advanced Carousel */}
        <div
          className={`relative max-w-6xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative h-50 overflow-hidden rounded-3xl">
            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              }}
            >
              {/* Show 3 cards at a time, sliding one card at a time */}
              {features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || CheckCircle
                
                return (
                  <div
                    key={index}
                    className="w-1/3 flex-shrink-0 flex items-center justify-center px-4"
                  >
                    <div className="text-center max-w-sm mx-auto">
                      {/* Large Centered Icon */}
                      <div className="mb-6 flex justify-center">
                        <div className="relative">
                          {/* Icon Background Glow */}
                          <div className="absolute inset-0 bg-emerald-200/30 rounded-full blur-xl scale-150"></div>
                          <div className="relative p-6 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full shadow-2xl">
                            <IconComponent className="w-12 h-12 text-emerald-600" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Centered Heading */}
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 ">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Gradient Overlays for Smooth Edges */}
            {/* <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div> */}
          </div>

          {/* Progress Indicators */}
          {/* <div className="flex justify-center gap-3 ">
            {features.length > 3 ? (
              // Show indicators for scrollable positions
              Array.from({ length: features.length - 2 }, (_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    currentIndex === index 
                      ? "bg-emerald-600 w-8" 
                      : "bg-gray-300 w-2"
                  }`}
                />
              ))
            ) : (
              // Show single indicator for non-scrollable
              <div className="h-2 w-8 bg-emerald-600 rounded-full"></div>
            )}
          </div> */}

          {/* Floating Stats (if available) */}
          {/* {features.length > 0 && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl border border-gray-200/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    {features.length > 3 ? `${currentIndex + 1} / ${features.length - 2}` : '1 / 1'}
                  </div>
                  <div className="text-sm text-gray-600">Position</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Debug: {currentIndex} / {features.length - 2}
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </section>
  )
}
