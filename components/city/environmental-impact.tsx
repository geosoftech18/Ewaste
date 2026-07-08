"use client"

import { useEffect, useState, useRef } from "react"
import { Leaf, Zap, Droplets, Recycle } from "lucide-react"

const IMPACT_TARGETS = {
  ewaste: 2500,
  energy: 45000,
  water: 125000,
  materials: 890,
} as const

export function EnvironmentalImpact() {
  // SSR starts at final values so crawlers never see "0+". Animation resets to 0 once in view.
  const [counts, setCounts] = useState({ ...IMPACT_TARGETS })
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            setCounts({ ewaste: 0, energy: 0, water: 0, materials: 0 })

            const duration = 2000
            const steps = 60
            const stepDuration = duration / steps

            let currentStep = 0
            const interval = setInterval(() => {
              currentStep++
              const progress = currentStep / steps

              setCounts({
                ewaste: Math.floor(IMPACT_TARGETS.ewaste * progress),
                energy: Math.floor(IMPACT_TARGETS.energy * progress),
                water: Math.floor(IMPACT_TARGETS.water * progress),
                materials: Math.floor(IMPACT_TARGETS.materials * progress),
              })

              if (currentStep >= steps) clearInterval(interval)
            }, stepDuration)
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
  }, [hasAnimated])

  const stats = [
    {
      icon: Recycle,
      value: `${counts.ewaste}+`,
      finalValue: `${IMPACT_TARGETS.ewaste}+`,
      label: "Tons of E-Waste Recycled",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Zap,
      value: `${counts.energy}+`,
      finalValue: `${IMPACT_TARGETS.energy}+`,
      label: "MWh Energy Saved",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Droplets,
      value: `${counts.water}+`,
      finalValue: `${IMPACT_TARGETS.water}+`,
      label: "Liters of Water Conserved",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Leaf,
      value: `${counts.materials}+`,
      finalValue: `${IMPACT_TARGETS.materials}+`,
      label: "Tons of Materials Recovered",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-2xl sm:text-5xl font-bold text-foreground mb-4">Our Environmental Impact</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
          Every commercial device diverted from a landfill directly protects our local ecosystem. By choosing a KSPCB-compliant partner, you directly prevent hazardous heavy metals from entering regional water tables and contribute to clean resource circles. 
          </p>
         
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-card border border-border p-8 hover:border-primary/50 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="sr-only">{stat.finalValue} {stat.label}</span>
                  <div className="text-2xl sm:text-4xl font-bold text-primary mb-2" aria-hidden="true">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground" aria-hidden="true">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <p className="text-center text-foreground text-lg">
            <span className="font-semibold">Every device recycled matters.</span> By choosing SP Recycling, you&apos;re
            preventing toxic materials from entering landfills and recovering valuable resources for future use.
          </p>
        </div>
      </div>
    </section>
  )
}
