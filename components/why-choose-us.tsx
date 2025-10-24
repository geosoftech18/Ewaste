"use client"

import { Users, Headphones, Shield, Lock, Recycle, Trophy } from "lucide-react"
import { useEffect, useState, useRef } from "react"

const features = [
  {
    icon: Users,
    title: "Expert & Experienced Team",
    description: "A highly trained team with 10+ years of industry experience in handling all types of e-waste.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description: "Always available to assist with queries, pickups, and urgent disposal needs.",
  },
  {
    icon: Shield,
    title: "Compliant & Certified Processes",
    description: "End-to-end recycling aligned with government norms, EPR compliance, and environmental standards.",
  },
  {
    icon: Lock,
    title: "100% Secure Data Destruction",
    description: "Certified destruction of data storage devices with complete confidentiality.",
  },
  {
    icon: Recycle,
    title: "Eco-Friendly Recycling",
    description: "Zero landfill impact — ensuring recovery, reuse, and safe disposal of hazardous components.",
  },
  {
    icon: Trophy,
    title: "Proven Track Record",
    description: "20+ industries served, 99% customer satisfaction, and thousands of successful pickups.",
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
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by businesses and households for responsible E-Waste recycling.
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
