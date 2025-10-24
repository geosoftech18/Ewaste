"use client"

import { Award, Shield, Leaf, CheckCircle } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export function Certifications() {
  const certifications = [
    {
      icon: Award,
      title: "ISO 14001:2015",
      description: "Environmental Management System Certified",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "LEED Platinum",
      description: "Sustainable Building Practices",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Leaf,
      title: "E-Waste Certified",
      description: "Authorized E-Waste Recycler",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: CheckCircle,
      title: "Data Security",
      description: "Certified Data Destruction",
      color: "from-purple-500 to-pink-500",
    },
  ]

  const achievements = [
    { label: "Years of Experience", value: 15, suffix: "+" },
    { label: "Clients Served", value: 5000, suffix: "+" },
    { label: "Devices Recycled", value: 2.5, suffix: "M+" },
    { label: "Team Members", value: 200, suffix: "+" },
  ]

  // Animated Counter Component
  function AnimatedCounter({
    end,
    suffix = "",
  }: {
    end: number
    suffix?: string
  }) {
    const [count, setCount] = useState(0)
    const [hasAnimated, setHasAnimated] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

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
      <div ref={ref} className="text-3xl md:text-4xl font-bold text-primary mb-2">
        {count}
        {suffix}
      </div>
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-2xl sm:text-5xl font-bold text-foreground mb-4">Certifications & Awards</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by industry leaders and certified by international standards.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, index) => {
            const Icon = cert.icon
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-card border border-border p-3 hover:border-primary/50 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${cert.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{cert.title}</h3>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <AnimatedCounter end={achievement.value} suffix={achievement.suffix} />
              <p className="text-sm text-muted-foreground">{achievement.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
