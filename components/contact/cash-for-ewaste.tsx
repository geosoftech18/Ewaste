"use client"

import { Smartphone, Truck, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CashForEWasteSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance animate-slide-up">
            Turn Your Old Electronics Into Value
          </h2>
          <p className="text-lg sm:text-xl text-emerald-100 text-balance animate-fade-in animation-delay-200">
            Schedule a free doorstep pickup and get paid instantly for your e-waste
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Smartphone, title: "Old Electronics", desc: "Phones, laptops, tablets" },
            { icon: Truck, title: "Free Pickup", desc: "We come to your doorstep" },
            { icon: DollarSign, title: "Instant Payment", desc: "Get paid on the spot" },
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:-translate-y-3 hover:shadow-2xl animate-fade-in group ${
                index === 0 ? "animation-delay-300" : index === 1 ? "animation-delay-500" : "animation-delay-700"
              }`}
            >
              <item.icon className="w-12 h-12 text-emerald-200 mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-100 transition-colors">
                {item.title}
              </h3>
              <p className="text-emerald-100 group-hover:text-white transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center animate-fade-in animation-delay-900">
          <Button
            size="lg"
            className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-6 text-lg font-bold rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl"
          >
            Schedule Your Free Pickup
          </Button>
        </div>
      </div>
    </section>
  )
}
