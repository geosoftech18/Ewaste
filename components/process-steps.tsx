"use client"

import { useEffect, useRef, useState } from "react"
import { Truck, Recycle, RefreshCw, ArrowRight } from "lucide-react"
import { PickupFormModal } from "./pickup-form-modal"
import { Button } from "./ui/button"

const steps = [
  {
    number: 1,
    title: "Collect",
    description: "E-waste from your place or business? We snag it, safely and with care.",
    icon: Truck,
  },
  {
    number: 2,
    title: "Recycle",
    description: "We break it down, parts out. Eco-friendly methods, always.",
    icon: Recycle,
  },
  {
    number: 3,
    title: "Reuse",
    description: "Good bits get a new spin, lowering landfill, saving Earth.",
    icon: RefreshCw,
  },
]

export function ProcessSteps() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...new Set([...prev, index])])
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-white to-green-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">How We Work</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, transparent, and eco-friendly process from collection to reuse.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Line - Desktop Only */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-300 to-transparent">
            <svg className="absolute inset-0 w-full h-full" style={{ top: "-2px" }}>
              <defs>
                <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(134, 239, 172)" stopOpacity="0" />
                  <stop offset="50%" stopColor="rgb(34, 197, 94)" stopOpacity="1" />
                  <stop offset="100%" stopColor="rgb(134, 239, 172)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line
                x1="20%"
                y1="2"
                x2="45%"
                y2="2"
                stroke="url(#arrowGradient)"
                strokeWidth="2"
                strokeDasharray="8,4"
                className="animate-[dash_2s_linear_infinite]"
              />
              <line
                x1="55%"
                y1="2"
                x2="80%"
                y2="2"
                stroke="url(#arrowGradient)"
                strokeWidth="2"
                strokeDasharray="8,4"
                className="animate-[dash_2s_linear_infinite]"
              />
            </svg>
          </div>

          {/* Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isVisible = visibleSteps.includes(index)

              return (
                <div
                  key={step.number}
                  className={`relative transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Number Badge */}
                  <div
                    className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg z-10 transition-all duration-500 ${
                      isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    {step.number}
                  </div>

                  {/* Card */}
                  <div className="relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 group hover:scale-105 border border-gray-100 overflow-hidden">
                    {/* Hover Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-green-100/0 group-hover:from-green-50/50 group-hover:to-green-100/30 transition-all duration-300 rounded-2xl" />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-green-600 group-hover:text-green-700 transition-colors" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>

                    {/* Arrow Decoration - Desktop Only */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-20">
                        <ArrowRight className="w-6 h-6 text-green-400 animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12 md:mt-16">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              Schedule a Pickup
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      <PickupFormModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  )
}
