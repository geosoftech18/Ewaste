"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Get Started with Plastic Waste EPR Compliance Today
        </h2>

        <p className="text-xl text-white/90 mb-12 leading-relaxed">
          Let our experts handle your registration, documentation, and reporting — so you can focus on your core
          business and sustainability goals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-accent/90 hover:bg-accent/90 text-white font-semibold px-8 py-6 text-lg">
            Book Your Free Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
          <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
            <Phone className="w-5 h-5 text-accent flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm text-white/70">Call us</p>
              <p className="text-white font-semibold">+91 9949 901 238</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
            <Mail className="w-5 h-5 text-accent flex-shrink-0" />
            <div className="text-left">
              <p className="text-sm text-white/70">Email us</p>
              <p className="text-white font-semibold">sprecycling563@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
