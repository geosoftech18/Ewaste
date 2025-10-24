"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle2 } from "lucide-react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 sm:p-12 text-center hover:shadow-2xl transition-all duration-300 transform animate-fade-in">
          <Mail className="w-12 h-12 text-white mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 animate-slide-up">Stay Updated</h2>
          <p className="text-emerald-100 mb-8 text-lg animate-fade-in animation-delay-200">
            Get the latest eco-friendly recycling insights and tips delivered to your inbox
          </p>

          {subscribed ? (
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg p-6 flex items-center justify-center gap-3 animate-scale-in">
              <CheckCircle2 className="w-6 h-6 text-white animate-bounce" />
              <span className="text-white font-semibold">Thanks for subscribing!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto  animate-fade-in animation-delay-400"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg border-1 focus:outline-none transition-all duration-300 hover:shadow-lg focus:shadow-xl text-white bg-transparent border-white/30 placeholder:text-white/80"
              />
              <Button
                type="submit"
                className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
