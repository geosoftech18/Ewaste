"use client"

import { CheckCircle2, Lock, Award, Leaf, Zap, Shield, Truck, Globe } from "lucide-react"
import { useState } from "react"
import { PickupFormModal } from "@/components/pickup-form-modal"
export default function CSRSection() {
  const [pickupModalOpen, setPickupModalOpen] = useState(false)
  const credentials = [
    { icon: Leaf, title: "100% Eco-Compliant", desc: "Environmentally responsible recycling" },
    { icon: Lock, title: "Data Destruction Certified", desc: "Secure data handling & destruction" },
    { icon: Award, title: "ISO & CPCB Authorized", desc: "Certified by regulatory bodies" },
    { icon: CheckCircle2, title: "Safe Material Recovery", desc: "Responsible material extraction" },
  ]

  const benefits = [
    { icon: Zap, title: "Transparent Pricing", desc: "Fair and competitive rates for your e-waste" },
    { icon: Truck, title: "Doorstep Pickup", desc: "Convenient service across major cities" },
    { icon: Shield, title: "Secure Handling", desc: "Certified data destruction protocols" },
    { icon: Globe, title: "Sustainable Future", desc: "Contributing to environmental conservation" },
  ]

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 animate-slide-up">
            Committed to a Greener India
          </h2>
          <p className="text-lg text-gray-600 animate-fade-in animation-delay-200">
            Our certifications and commitments to sustainability
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {credentials.map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border-2 border-emerald-200 hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 text-center group transform hover:scale-110 hover:-translate-y-3 animate-fade-in ${
                index === 0
                  ? "animation-delay-200"
                  : index === 1
                    ? "animation-delay-400"
                    : index === 2
                      ? "animation-delay-600"
                      : "animation-delay-800"
              }`}
            >
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-700 group-hover:scale-125 transition-all duration-300 shadow-lg">
                <item.icon className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm group-hover:text-gray-900 transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="relative">
          {/* Background gradient blur effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-200 rounded-3xl blur-2xl opacity-30 -z-10"></div>

          <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-emerald-300 hover:border-emerald-500 transition-all duration-500 animate-fade-in animation-delay-1000 shadow-xl hover:shadow-2xl overflow-hidden group">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-600 to-teal-600 rounded-full"></div>
                <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-900 to-teal-900 bg-clip-text text-transparent group-hover:from-emerald-700 group-hover:to-teal-700 transition-all duration-300">
                  Why Choose SP Recycling?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={`group/benefit bg-white rounded-2xl p-6 border-2 border-emerald-100 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 transform animate-fade-in ${
                      index === 0
                        ? "animation-delay-300"
                        : index === 1
                          ? "animation-delay-500"
                          : index === 2
                            ? "animation-delay-700"
                            : "animation-delay-900"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 group-hover/benefit:from-emerald-600 group-hover/benefit:to-teal-600 transition-all duration-300 group-hover/benefit:scale-125 shadow-lg">
                          <benefit.icon className="h-6 w-6 text-white group-hover/benefit:rotate-12 transition-transform duration-300" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover/benefit:text-emerald-700 transition-colors">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-600 text-sm group-hover/benefit:text-gray-900 transition-colors">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t-2 border-emerald-200 group-hover:border-emerald-300 transition-colors duration-300">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-gray-700 font-semibold text-lg">Ready to make a difference?</p>
                  <button className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 hover:shadow-lg hover:scale-105 transform" onClick={() => setPickupModalOpen(true)}>
                    Get Started Today
                  </button>
                </div>
              </div>
            </div>
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
