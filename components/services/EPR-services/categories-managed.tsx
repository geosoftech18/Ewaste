"use client"

import { Card } from "@/components/ui/card"
import { Package, Layers, Box, Leaf } from "lucide-react"

const categories = [
  {
    icon: Package,
    category: "Category I",
    title: "Rigid Plastic Packaging",
    description: "Hard plastic containers, bottles, and rigid packaging materials",
  },
  {
    icon: Layers,
    category: "Category II",
    title: "Flexible Plastic Packaging",
    description: "Single or multilayered flexible plastic films and pouches",
  },
  {
    icon: Box,
    category: "Category III",
    title: "Multilayered Plastic",
    description: "Combination of plastic and non-plastic layers in packaging",
  },
  {
    icon: Leaf,
    category: "Category IV",
    title: "Compostable Plastic",
    description: "Biodegradable and compostable plastic packaging materials",
  },
]

export default function CategoriesManaged() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Categories We Manage</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive coverage across all plastic waste categories under PWM Rules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, index) => {
            const Icon = cat.icon
            return (
              <Card
                key={index}
                className="p-8 bg-gradient-to-br from-card to-card/50 border-primary/10 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-primary">{cat.category}</span>
                    <h3 className="text-xl font-bold text-foreground">{cat.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{cat.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
