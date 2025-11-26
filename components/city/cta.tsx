"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PickupFormModal } from "../pickup-form-modal"

export function CTA() {
  const router = useRouter()
  const [pickupModalOpen, setPickupModalOpen] = useState(false)
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-white blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 mb-6">
            <Leaf className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">Join the Sustainability Movement</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Make a Difference?</h2>

          <p className="text-lg text-white/90 mb-8">
            Schedule your e-waste pickup today and become part of India's sustainable future. Our expert team is ready
            to help you recycle responsibly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white hover:bg-white/90 text-primary font-semibold group"
            onClick={() => setPickupModalOpen(true)}>
              Request Pickup Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent"
            onClick={() => router.push("/contact")}>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      <PickupFormModal 
        open={pickupModalOpen} 
        onOpenChange={setPickupModalOpen} 
      />
    </section>
  )
}
