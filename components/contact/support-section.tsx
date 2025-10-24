"use client"

import { MessageCircle, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SupportSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-emerald-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border-2 border-emerald-200 hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 animate-fade-in">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-8 text-center animate-slide-up">
            Instant Support
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {/* WhatsApp */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 hover:shadow-xl hover:border-emerald-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 animate-fade-in animation-delay-200 group">
              <MessageCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                WhatsApp Chat
              </h3>
              <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-900 transition-colors">
                Get instant responses
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full border-emerald-600 !text-emerald-600 hover:bg-emerald-50 bg-transparent transition-all duration-300 hover:scale-105"
              >
                <a href="https://wa.me/919949901238" target="_blank" rel="noopener noreferrer">
                  Start Chat
                </a>
              </Button>
            </div>

            {/* Operating Hours */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 hover:shadow-xl hover:border-emerald-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 animate-fade-in animation-delay-400 group">
              <Clock className="w-12 h-12 text-emerald-600 mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                Operating Hours
              </h3>
              <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-900 transition-colors">
                Mon–Sat, 9 AM–7 PM
              </p>
              <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold group-hover:bg-emerald-200 transition-colors">
                Available Now
              </div>
            </div>

            {/* Quick Call */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 hover:shadow-xl hover:border-emerald-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 animate-fade-in animation-delay-600 group">
              <Zap className="w-12 h-12 text-emerald-600 mx-auto mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                Quick Call
              </h3>
              <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-900 transition-colors">
                Speak with an expert
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full border-emerald-600 !text-emerald-600 hover:bg-emerald-50 bg-transparent transition-all duration-300 hover:scale-105"
              >
                <a href="tel:+919949901238">Call Now</a>
              </Button>
            </div>
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-lg hover:bg-emerald-100 transition-all duration-300 animate-fade-in animation-delay-800">
            <p className="text-gray-700 text-center">
              <span className="font-semibold text-emerald-900">Need help?</span> Our team is ready to assist you with
              any questions about our e-waste recycling services.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
