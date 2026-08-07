"use client"

import {  Shield,  Truck, DollarSign, ShieldCheck, FileCheck } from "lucide-react"
import { useEffect, useState, useRef } from "react"

const features = [
  {
    icon: Truck,
    title: "Doorstep Pickup",
    description: "Convenient collection from homes, offices, factories, and institutions.",
  },
  {
    icon: DollarSign,
    title: "Fair Market Pricing",
    description: "Transparent valuation with competitive rates.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Data Destruction",
    description: "Safe disposal of laptops, computers, servers, and storage devices.",
  },
  {
    icon: Shield,
    title: "Certified Recycling",
    description: "CPCB-authorized recycling processes that meet environmental standards.",
  },

  {
    icon: Truck,
    title: "Bulk Collection",
    description: "Ideal for businesses, IT companies, schools, hospitals, and industries.",
  },
  {
    icon: FileCheck,
    title: "Compliance Support",
    description: "Recycling certificates and documentation for corporate customers.",
  },
]

const stats = [
  { label: "Years of Experience", value: 10, suffix: "+" },
  { label: "Industries Served", value: 20, suffix: "+" },
  { label: "Customer Satisfaction", value: 99, suffix: "%" },
]

function AnimatedCounter({
  end,
  suffix = "",
}: {
  end: number
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

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
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-green-600">
      {count}
      {suffix}
    </span>
  )
}

export function WhyChooseUs() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50/30 to-white" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose S P Recycling Pvt Ltd?
          </h2>
          <p className="text-lg md:text-lg text-gray-600 max-w-4xl mx-auto">
          Businesses and homes trust us to handle electronics responsibly, with secure data destruction and complete asset recovery. Recovery of batteries and circuit boards for the city’s IT and <a href="https://www.sprecycling.in/blog/the-environmental-impact-of-e-waste-why-responsible-recycling-matters-in-hyderabad" className="text-blue-500">electric-vehicle</a> sectors supports responsible waste management.
           WEEE handling enables end-to-end disposal for the region and beyond. EVs are increasingly part of a cleaner transport shift and smarter asset planning, underscoring the importance of effective recovery processes for sustainable growth.
          </p>
        </div>

        {/* Stats Counter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              <p className="text-gray-600 mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                {/* Icon */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-green-600" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
