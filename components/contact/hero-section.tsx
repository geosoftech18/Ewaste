"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Phone } from "lucide-react"
import { PickupFormModal } from "@/components/pickup-form-modal"
import { useState } from "react"

export default function HeroSection() {
  const [pickupModalOpen, setPickupModalOpen] = useState(false)
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 inline-block animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-100 text-sm font-medium hover:bg-emerald-500/30 transition-all duration-300">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Available Mon–Sat, 9 AM–7 PM
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance animate-slide-up">
          We're Here to Help You Recycle Responsibly
        </h1>

        <p className="text-lg sm:text-xl text-emerald-100 mb-12 max-w-2xl mx-auto text-balance animate-fade-in animation-delay-200">
          Get in touch with SP Recycling Pvt Ltd for pickup requests, partnership inquiries, or environmental compliance
          solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-fade-in animation-delay-400"
            onClick={() => setPickupModalOpen(true)}
          >
            Request Pickup Now
          </Button>
          <a
            href="https://wa.me/919949901238?text=Hi%2C%20I%27m%20interested%20in%20recycling%20services%20and%20would%20like%20to%20speak%20with%20an%20expert%20about%20your%20e-waste%20management%20solutions."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border-2 border-emerald-300 text-emerald-100 hover:bg-emerald-500/20 px-8 !py-2 text-lg rounded-lg font-semibold transition-all duration-300 bg-transparent hover:scale-105 hover:shadow-2xl animate-fade-in animation-delay-600"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Talk to an Expert
          </a>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="tel:+919949901238"
            className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-white hover:scale-110 hover:shadow-xl animate-fade-in animation-delay-800 group"
          >
            <Phone className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-semibold">+91 9949 901 238</span>
          </a>
          <a
            href="https://wa.me/919949901238"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-white hover:scale-110 hover:shadow-xl animate-fade-in animation-delay-1000 group"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-semibold">WhatsApp Chat</span>
          </a>
        </div>
      </div>

        {/* Pickup Form Modal */}
        <PickupFormModal 
        open={pickupModalOpen} 
        onOpenChange={setPickupModalOpen} 
      />
    </section>
  )
}
