"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Award, Zap, Shield } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Trusted Expertise",
    description: "Experienced team with proven track record in waste compliance and recycling",
  },
  {
    icon: Zap,
    title: "End-to-End Services",
    description: "From registration to reporting — we handle it all seamlessly",
  },
  {
    icon: Shield,
    title: "Sustainability Focus",
    description: "Solutions that reduce environmental impact and promote circularity",
  },
  {
    icon: CheckCircle2,
    title: "100% Compliance",
    description: "Stay compliant with latest CPCB norms and PWM amendments",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Choose SP Recycling Pvt Ltd</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We don't see EPR as just a compliance requirement — we view it as a transformative opportunity to build a
            sustainable plastics ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="p-8 bg-card border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12 border border-primary/20">
          <p className="text-lg text-foreground leading-relaxed">
            With years of experience in e-waste management, we bring the same professionalism, precision, and
            eco-commitment to plastic waste EPR solutions. Our holistic approach ensures your business not only meets
            regulatory requirements but also contributes meaningfully to environmental sustainability.
          </p>
        </div>
      </div>
    </section>
  )
}
