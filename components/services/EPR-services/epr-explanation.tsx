"use client"

import { Card } from "@/components/ui/card"
import { Leaf, Recycle, TrendingUp } from "lucide-react"

export default function EPRExplanation() {
  return (
    <section className="py-20 px-6 bg-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              What is EPR and Why It Matters
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Extended Producer Responsibility (EPR) is a policy approach where producers, importers, and brand owners
              (PIBOs) are responsible for managing plastic waste generated from their products.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              It ensures that plastics are collected, recycled, or co-processed sustainably, reducing the environmental
              footprint and promoting circularity in the economy.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Environmental Impact</h3>
                  <p className="text-muted-foreground">Reduces plastic waste in landfills and oceans</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Recycle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Circular Economy</h3>
                  <p className="text-muted-foreground">Promotes sustainable recycling and reuse</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Business Growth</h3>
                  <p className="text-muted-foreground">Enhances brand reputation and compliance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <div className="text-4xl font-bold text-primary mb-2">2016</div>
              <p className="text-sm text-muted-foreground">EPR Scheme Introduced</p>
            </Card>
            <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
              <div className="text-4xl font-bold text-accent mb-2">4</div>
              <p className="text-sm text-muted-foreground">Plastic Categories</p>
            </Card>
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 col-span-2">
              <div className="text-3xl font-bold text-primary mb-2">100% Compliance</div>
              <p className="text-sm text-muted-foreground">Our guarantee for all clients</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
