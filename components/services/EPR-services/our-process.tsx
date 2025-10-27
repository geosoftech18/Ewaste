"use client"

import { Card } from "@/components/ui/card"
import { MessageCircle, FileCheck, Cog, Award, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Consultation & Assessment",
    description: "Identify your EPR category and required compliance obligations",
  },
  {
    number: "02",
    icon: FileCheck,
    title: "Registration & Target Design",
    description: "Get CPCB registration and annual target allocation setup",
  },
  {
    number: "03",
    icon: Cog,
    title: "Implementation & Reporting",
    description: "Ensure collection, recycling, and documentation as per norms",
  },
  {
    number: "04",
    icon: Award,
    title: "Filing & Certification",
    description: "Submit quarterly/annual reports and receive compliance certification",
  },
]

export default function OurProcess() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const [autoPlayStep, setAutoPlayStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setAutoPlayStep((prev) => (prev + 1) % steps.length)
    }, 4000) // Change step every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handleMouseEnter = (index: number) => {
    setHoveredStep(index)
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setHoveredStep(null)
    setIsAutoPlaying(true)
  }

  const activeStep = hoveredStep !== null ? hoveredStep : autoPlayStep

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Simple 4-Step EPR Workflow</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A streamlined process designed for efficiency and compliance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStep === index
            const isAfterActive = activeStep !== null && index > activeStep
            const isBeforeActive = activeStep !== null && index < activeStep

            return (
              <div key={index} className="relative">
                {/* Animated connecting line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-1/2 w-full h-1 bg-gradient-to-r from-primary to-accent transform translate-x-1/2 overflow-hidden">
                    <div
                      className={`h-full w-full transition-all duration-500 ${
                        isBeforeActive
                          ? "animate-flow-line bg-gradient-to-r from-primary via-accent to-primary"
                          : "bg-gradient-to-r from-primary to-accent opacity-50"
                      }`}
                      style={{
                        backgroundSize: "200% 100%",
                      }}
                    ></div>

                    {isBeforeActive && (
                      <div className="absolute top-1/2 transform -translate-y-1/2 animate-arrow-flow">
                        <ChevronRight className="w-5 h-5 text-accent" />
                      </div>
                    )}
                  </div>
                )}

                <Card
                  className={`p-8 bg-card border-primary/10 transition-all duration-300 relative z-10 h-full cursor-pointer ${
                    isActive
                      ? "border-primary/50 shadow-lg shadow-primary/20 scale-105 animate-step-pulse"
                      : isBeforeActive
                        ? "border-primary/30 opacity-75"
                        : isAfterActive
                          ? "opacity-50"
                          : "hover:border-primary/30"
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`text-3xl font-bold transition-all duration-300 ${
                        isActive ? "text-primary scale-110" : "text-primary/30"
                      }`}
                    >
                      {step.number}
                    </div>
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                        isActive ? "bg-primary text-primary-foreground scale-110" : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3
                    className={`text-lg font-semibold mb-2 transition-all duration-300 ${
                      isActive ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>

                  {isActive && (
                    <div className="mt-4 h-1 bg-gradient-to-r from-primary to-accent rounded-full animate-flow-line"></div>
                  )}
                </Card>
              </div>
            )
          })}
        </div>

        <div className="lg:hidden mt-8 flex justify-center items-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeStep ? "w-8 bg-primary" : "w-2 bg-primary/30"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  )
}
