"use client"

import { Card } from "@/components/ui/card"
import { MapPin, Zap, Shield, DollarSign, Truck, Leaf } from "lucide-react"

const reasons = [
  {
    icon: MapPin,
    title: "Near You",
    description: "We serve major cities including Hyderabad, ensuring convenience for all customers",
  },
  {
    icon: Zap,
    title: "Instant & Fast",
    description: "Our online platform ensures quick and easy service with instant solutions",
  },
  {
    icon: Shield,
    title: "Safe & Eco-Friendly",
    description: "Strict compliance with environmental regulations and zero environmental impact",
  },
  {
    icon: DollarSign,
    title: "Cash for E-Waste",
    description: "Competitive prices for your old electronics, providing added incentive to recycle",
  },
  {
    icon: Truck,
    title: "Doorstep Pickup",
    description: "Our collectors come to your location, making the process completely hassle-free",
  },
  {
    icon: Leaf,
    title: "Free Recycling",
    description: "We offer free recycling services for certain items, promoting eco-friendly disposal",
  },
]

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Why Choose SP Recycling</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            With expertise in managing large volumes of high-grade WEEE, we ensure complete dismantling and recovery
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <Card
                key={index}
                className="group relative border border-border bg-card hover:border-accent/50 transition-all duration-300 hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{reason.title}</h3>
                  <p className="text-muted-foreground text-sm">{reason.description}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
