"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { Calendar, CheckCircle2 } from "lucide-react"

const timelineData = [
  {
    year: "2016",
    title: "PWM Rules Notified",
    highlights: ["EPR scheme introduced", "Initial framework established"],
    color: "from-blue-500 to-blue-600",
  },
  {
    year: "2018",
    title: "1st Amendment",
    highlights: ["CPCB EPR registration", "Labeling requirements", "Energy recovery definition"],
    color: "from-purple-500 to-purple-600",
  },
  {
    year: "2021",
    title: "2nd & 3rd Amendments",
    highlights: ["Ban on Single-Use Plastics", "Recycled plastics usage introduced"],
    color: "from-pink-500 to-pink-600",
  },
  {
    year: "2022",
    title: "4th & 5th Amendments",
    highlights: ["Online EPR portal launched", "Detailed SOPs released"],
    color: "from-orange-500 to-orange-600",
  },
  {
    year: "2023",
    title: "Latest Updates",
    highlights: ["Labeling exemptions", "Annual filing deadlines", "Auto-renewal enabled"],
    color: "from-green-500 to-green-600",
  },
]

export default function PWMTimeline() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        },
        { threshold: 0.3 },
      )
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Evolution of PWM Rules</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understanding the journey of Plastic Waste Management regulations in India
          </p>
        </div>

        <div className="relative">
          {/* Center connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary transform -translate-x-1/2 hidden md:block" />

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-16">
            {timelineData.map((item, index) => {
              const isVisible = visibleItems.includes(index)
              const isLeft = index % 2 === 0
              const animationClass = isVisible
                ? isLeft
                  ? "animate-timeline-slide-in-left"
                  : "animate-timeline-slide-in-right"
                : "opacity-0"

              return (
                <div
                  key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  className={`relative ${animationClass}`}
                  style={{
                    animationDelay: isVisible ? `${index * 100}ms` : "0ms",
                  }}
                >
                  {/* Desktop: Alternating layout */}
                  <div className={`hidden md:flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                    {/* Content card */}
                    <div className={`w-5/12 ${isLeft ? "pr-8" : "pl-8"}`}>
                      <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group">
                        {/* Year badge */}
                        <div
                          className={`inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-bold`}
                        >
                          <Calendar className="w-4 h-4" />
                          {item.year}
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>

                        {/* Highlights */}
                        <ul className="space-y-2">
                          {item.highlights.map((highlight, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </div>

                    {/* Center dot */}
                    <div className="w-2/12 flex justify-center">
                      <div
                        className={`w-6 h-6 rounded-full bg-gradient-to-r ${item.color} border-4 border-background shadow-lg ${
                          isVisible ? "animate-timeline-dot-expand" : ""
                        }`}
                        style={{
                          animationDelay: isVisible ? `${index * 100 + 200}ms` : "0ms",
                        }}
                      />
                    </div>

                    {/* Spacer */}
                    <div className="w-5/12" />
                  </div>

                  {/* Mobile: Stacked layout */}
                  <div className="md:hidden">
                    <div className="flex gap-4">
                      {/* Left dot */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-5 h-5 rounded-full bg-gradient-to-r ${item.color} border-3 border-background shadow-lg ${
                            isVisible ? "animate-timeline-dot-expand" : ""
                          }`}
                          style={{
                            animationDelay: isVisible ? `${index * 100 + 200}ms` : "0ms",
                          }}
                        />
                        {index < timelineData.length - 1 && (
                          <div className="w-1 h-12 bg-gradient-to-b from-primary to-transparent mt-2" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="pb-8">
                        <Card className="p-5 bg-gradient-to-br from-card to-card/50 border-primary/20">
                          <div
                            className={`inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-xs font-bold`}
                          >
                            <Calendar className="w-3 h-3" />
                            {item.year}
                          </div>
                          <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
                          <ul className="space-y-1">
                            {item.highlights.map((highlight, i) => (
                              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
