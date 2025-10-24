"use client"

import { Card } from "@/components/ui/card"
import { Truck, Layers, Wrench, Recycle } from "lucide-react"

const steps = [
  {
    icon: Truck,
    title: "Collection",
    description: "Convenient electronic waste pickup from residences, workplaces, and factories",
    number: "01",
  },
  {
    icon: Layers,
    title: "Segregation",
    description: "Skilled technicians carefully dismantle and separate reusable components",
    number: "02",
  },
  {
    icon: Wrench,
    title: "Dismantling",
    description: "Proper sorting into categories: circuit boards, plastics, metals, and more",
    number: "03",
  },
  {
    icon: Recycle,
    title: "Recycling",
    description: "Refined procedures extract valuable materials like copper, aluminum, and precious metals",
    number: "04",
  },
]

export function WorkingProcess() {
  return (
    <section id="process" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Our Working Process</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A systematic approach to sustainable e-waste management
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary/0" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <Card className="relative border border-border bg-card hover:border-primary/50 transition-all duration-300 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>

                  <div className="p-6 pt-8">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
