"use client"

import { Card } from "@/components/ui/card"
import { Building2, Users, MapPin, Recycle } from "lucide-react"

const partners = [
  {
    icon: Building2,
    title: "Brand Owners & Producers",
    description: "Ensure their packaging waste is responsibly managed and compliant",
  },
  {
    icon: Users,
    title: "Importers & Distributors",
    description: "Achieve compliance and reduce waste footprint across supply chains",
  },
  {
    icon: MapPin,
    title: "Municipalities & Local Bodies",
    description: "Integrated collection and recycling partnerships for communities",
  },
  {
    icon: Recycle,
    title: "Recyclers & Co-Processors",
    description: "Establish efficient, compliant recycling networks and operations",
  },
]

export default function Partners() {
  return (
    <section className="py-20 px-6 bg-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Who Can Partner With Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We work closely with diverse stakeholders to create a sustainable ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner, index) => {
            const Icon = partner.icon
            return (
              <Card
                key={index}
                className="p-8 bg-card border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{partner.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{partner.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
