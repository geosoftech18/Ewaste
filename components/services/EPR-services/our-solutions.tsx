"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import {
  FileText,
  Target,
  BarChart3,
  CheckSquare,
  Upload,
  MessageSquare,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const solutions = [
  {
    icon: FileText,
    title: "EPR Registration & Authorization",
    description: "Assistance with CPCB/SPCB registration under PWM Rules",
    color: "from-blue-500/10 to-blue-600/5",
    borderColor: "border-blue-200/30",
  },
  {
    icon: Target,
    title: "EPR Planning & Target Design",
    description: "Annual target setup based on plastic category and market presence",
    color: "from-emerald-500/10 to-emerald-600/5",
    borderColor: "border-emerald-200/30",
  },
  {
    icon: BarChart3,
    title: "Quarterly & Annual Compliance Filing",
    description: "Preparation and filing of reports, returns, and supporting documents",
    color: "from-purple-500/10 to-purple-600/5",
    borderColor: "border-purple-200/30",
  },
  {
    icon: CheckSquare,
    title: "Target Fulfillment & Execution",
    description: "On-ground partnerships with registered recyclers and co-processors",
    color: "from-orange-500/10 to-orange-600/5",
    borderColor: "border-orange-200/30",
  },
  {
    icon: Upload,
    title: "Invoice Upload & Verification",
    description: "Seamless integration of recycling invoices and certificates",
    color: "from-pink-500/10 to-pink-600/5",
    borderColor: "border-pink-200/30",
  },
  {
    icon: MessageSquare,
    title: "Query Resolution & Liaison",
    description: "End-to-end support for CPCB/SPCB communications",
    color: "from-cyan-500/10 to-cyan-600/5",
    borderColor: "border-cyan-200/30",
  },
  {
    icon: Users,
    title: "Awareness & IEC Activities",
    description: "Organizing sustainability and awareness campaigns",
    color: "from-amber-500/10 to-amber-600/5",
    borderColor: "border-amber-200/30",
  },
]

export default function OurSolutions() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (solutions.length - itemsPerView + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, itemsPerView])

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + (solutions.length - itemsPerView + 1)) % (solutions.length - itemsPerView + 1),
    )
    setIsAutoPlay(false)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % (solutions.length - itemsPerView + 1))
    setIsAutoPlay(false)
  }

  const visibleSolutions = solutions.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background via-primary/3 to-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
            <span className="text-sm font-semibold text-accent">Our Comprehensive Services</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            EPR Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive services designed to simplify your EPR compliance journey with expert guidance and seamless
            execution
          </p>
        </div>

        <div className="relative">
          {/* Carousel viewport */}
          <div className="overflow-hidden">
            <div className="flex gap-6 transition-transform duration-500 ease-out">
              {visibleSolutions.map((solution, index) => {
                const Icon = solution.icon
                return (
                  <div
                    key={currentIndex + index}
                    className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 animate-carousel-slide-left"
                  >
                    <Card
                      className={`h-full p-8 bg-gradient-to-br ${solution.color} ${solution.borderColor} border-2 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer`}
                    >
                      {/* Icon container with gradient background */}
                      <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 group-hover:from-primary/30 group-hover:to-accent/20 transition-all duration-300">
                          <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {solution.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">{solution.description}</p>

                      {/* Bottom accent line */}
                      <div className="h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-12 transition-all duration-300"></div>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Mobile navigation buttons */}
          <div className="flex gap-3 justify-center mt-8 md:hidden">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {Array.from({ length: solutions.length - itemsPerView + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlay(false)
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-3 bg-gradient-to-r from-primary to-accent shadow-lg"
                  : "w-3 h-3 bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="px-6 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 border border-primary/30"
          >
            {isAutoPlay ? "⏸ Pause" : "▶ Play"} Auto-play
          </button>
        </div>
      </div>
    </section>
  )
}
