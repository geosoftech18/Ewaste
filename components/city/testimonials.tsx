"use client"

import { Star } from "lucide-react"
import { useEffect, useState } from "react"

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Tech Solutions India",
      role: "IT Manager",
      content:
        "SP Recycling made our e-waste disposal hassle-free. Their team was professional and the documentation was impeccable. Highly recommended!",
      rating: 5,
      image: "/professional-man-avatar.jpg",
    },
    {
      name: "Priya Sharma",
      company: "Green Enterprises",
      role: "Sustainability Officer",
      content:
        "We've been using SP Recycling for 2 years. Their commitment to environmental responsibility aligns perfectly with our company values.",
      rating: 5,
      image: "/professional-woman-avatar.jpg",
    },
    {
      name: "Amit Patel",
      company: "Electronics Retail Chain",
      role: "Operations Head",
      content:
        "The pickup service is incredibly convenient. They handle everything from collection to certification. Best decision for our business!",
      rating: 5,
      image: "/business-professional-avatar.jpg",
    },
    {
      name: "Neha Gupta",
      company: "Corporate Office",
      role: "Facilities Manager",
      content:
        "Outstanding service! They recycled our old computers and provided detailed reports. Very transparent and eco-conscious.",
      rating: 5,
      image: "/office-manager-avatar.jpg",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of satisfied businesses and individuals who trust SP Recycling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border transition-all duration-500 cursor-pointer transform ${
                activeIndex === index
                  ? "bg-primary/5 border-primary/50 scale-105 shadow-lg"
                  : "bg-card border-border hover:border-primary/30"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-foreground mb-6 line-clamp-3">{testimonial.content}</p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-primary w-8" : "bg-muted"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
