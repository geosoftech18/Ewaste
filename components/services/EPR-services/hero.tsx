"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Set deadline to 90 days from now (compliance deadline)
      const deadline = new Date()
      deadline.setDate(deadline.getDate() + 90)

      const now = new Date().getTime()
      const distance = deadline.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / 1000 / 60) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mt-12 grid grid-cols-4 gap-3 max-w-md mx-auto">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
      ].map((item) => (
        <div
          key={item.label}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 text-center animate-scale-in"
        >
          <div className="text-2xl font-bold text-accent mb-1">{String(item.value).padStart(2, "0")}</div>
          <p className="text-xs text-white/70 font-medium">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-float-slow animate-pulse-glow"></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-accent/50 rounded-full blur-3xl animate-float-medium animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="mb-6 inline-block animate-fade-in-down" style={{ animationDelay: "0.1s" }}>
          <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold border border-accent/30 backdrop-blur-sm">
            Sustainable Compliance Solutions
          </span>
        </div>

        <h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-balance animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Ensure Plastic Waste Compliance with Certified EPR Solutions
        </h1>

        <p
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed text-balance animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          Stay fully compliant with Plastic Waste Management (PWM) Rules while contributing to a cleaner, circular
          economy. We help you plan, register, and fulfill your EPR obligations efficiently.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/50"
          >
            Book Your Free Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg bg-transparent transition-all duration-300 hover:scale-105"
          >
            Learn More
          </Button>
        </div>

        <CountdownTimer />

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { value: "500+", label: "Brands Compliant", delay: "0.5s" },
            { value: "100%", label: "Compliance Rate", delay: "0.6s" },
            { value: "10+", label: "Years Experience", delay: "0.7s" },
          ].map((stat, index) => (
            <div key={index} className="text-white animate-fade-in-up" style={{ animationDelay: stat.delay }}>
              <div className="text-3xl font-bold mb-2 text-accent">{stat.value}</div>
              <p className="text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
