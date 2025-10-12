"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote, Play, Building2, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  type: "corporate" | "residential"
  rating: number
  quote: string
  fullTestimonial: string
  image: string
  hasVideo?: boolean
  videoUrl?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "IT Manager",
    company: "TechCorp Solutions",
    type: "corporate",
    rating: 5,
    quote: "Exceptional service! They handled our bulk e-waste disposal with complete data security assurance.",
    fullTestimonial:
      "Exceptional service! They handled our bulk e-waste disposal with complete data security assurance. The team was professional, punctual, and provided all necessary compliance certificates. We've been using their services for over a year now and couldn't be happier with the environmental responsibility they demonstrate.",
    image: "/professional-indian-man.png",
  },
  {
    id: 2,
    name: "Priya Mehta",
    role: "Homeowner",
    company: "Mumbai Resident",
    type: "residential",
    rating: 5,
    quote: "Quick pickup, friendly staff, and peace of mind knowing my old electronics are recycled responsibly.",
    fullTestimonial:
      "Quick pickup, friendly staff, and peace of mind knowing my old electronics are recycled responsibly. I had accumulated several old phones, laptops, and appliances over the years. The team came right on time, handled everything professionally, and even educated me about proper e-waste disposal. Highly recommended!",
    image: "/indian-woman-smiling.png",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Operations Head",
    company: "GreenTech Industries",
    type: "corporate",
    rating: 4.9,
    quote: "Their compliance certifications and transparent process made our audit seamless. Highly professional team!",
    fullTestimonial:
      "Their compliance certifications and transparent process made our audit seamless. Highly professional team! We needed a reliable partner for our quarterly e-waste disposal, and S P Recycling exceeded our expectations. They provided detailed documentation, certificates, and even helped us set up a regular pickup schedule.",
    image: "/professional-businessman.png",
    hasVideo: true,
    videoUrl: "#",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    role: "Facility Manager",
    company: "HealthCare Plus Hospital",
    type: "corporate",
    rating: 5,
    quote:
      "Timely pickup and excellent customer support. They understand the importance of data security in healthcare.",
    fullTestimonial:
      "Timely pickup and excellent customer support. They understand the importance of data security in healthcare. We deal with sensitive patient data, and S P Recycling's certified data destruction process gave us complete confidence. Their team is knowledgeable, responsive, and always available when we need them.",
    image: "/professional-woman-healthcare.png",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Homeowner",
    company: "Delhi Resident",
    type: "residential",
    rating: 4.8,
    quote: "Hassle-free experience from booking to pickup. Great initiative for environmental responsibility!",
    fullTestimonial:
      "Hassle-free experience from booking to pickup. Great initiative for environmental responsibility! I was impressed by how easy it was to schedule a pickup through their website. The team arrived on time, was courteous, and handled my old electronics with care. It feels good to contribute to a cleaner environment.",
    image: "/indian-man-casual.png",
  },
  {
    id: 6,
    name: "Anjali Desai",
    role: "HR Director",
    company: "FinServe Bank",
    type: "corporate",
    rating: 5,
    quote:
      "Outstanding service! They helped us dispose of 200+ old computers with complete documentation and certificates.",
    fullTestimonial:
      "Outstanding service! They helped us dispose of 200+ old computers with complete documentation and certificates. As a financial institution, we have strict compliance requirements. S P Recycling not only met but exceeded our expectations with their thorough process, detailed reporting, and professional approach. They're now our preferred e-waste partner.",
    image: "/professional-business-woman.png",
    hasVideo: true,
    videoUrl: "#",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filter, setFilter] = useState<"all" | "corporate" | "residential">("all")
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [itemsPerView, setItemsPerView] = useState(3)

  // Filter testimonials
  const filteredTestimonials = testimonials.filter((t) => filter === "all" || t.type === filter)

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    updateItemsPerView()
    window.addEventListener("resize", updateItemsPerView)
    return () => window.removeEventListener("resize", updateItemsPerView)
  }, [])

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, filteredTestimonials.length - itemsPerView)
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, filteredTestimonials.length, itemsPerView])

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, filteredTestimonials.length - itemsPerView)
      return prev <= 0 ? maxIndex : prev - 1
    })
  }

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, filteredTestimonials.length - itemsPerView)
      return prev >= maxIndex ? 0 : prev + 1
    })
  }

  const maxIndex = Math.max(0, filteredTestimonials.length - itemsPerView)

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b  from-green-50/30 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Quote className="w-4 h-4" />
            Client Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from businesses and households who trust us with their e-waste recycling
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => {
              setFilter("all")
              setCurrentIndex(0)
            }}
            className={filter === "all" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            All Reviews
          </Button>
          <Button
            variant={filter === "corporate" ? "default" : "outline"}
            onClick={() => {
              setFilter("corporate")
              setCurrentIndex(0)
            }}
            className={filter === "corporate" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            <Building2 className="w-4 h-4 mr-2" />
            Corporate
          </Button>
          <Button
            variant={filter === "residential" ? "default" : "outline"}
            onClick={() => {
              setFilter("residential")
              setCurrentIndex(0)
            }}
            className={filter === "residential" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            <Home className="w-4 h-4 mr-2" />
            Residential
          </Button>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-green-50 hover:border-green-600 hidden md:flex"
            disabled={filteredTestimonials.length <= itemsPerView}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-green-50 hover:border-green-600 hidden md:flex"
            disabled={filteredTestimonials.length <= itemsPerView}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Testimonials Carousel */}
          <div className="overflow-hidden px-4 py-6">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {filteredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100 hover:border-green-300 hover:shadow-xl transition-all duration-300 cursor-pointer relative group flex-shrink-0"
                  style={{ 
                    width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 24 / itemsPerView}px)`,
                    minWidth: '300px'
                  }}
                  onClick={() => setSelectedTestimonial(testimonial)}
                >
                  {/* Floating Quote Icon */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
                    <Quote className="w-5 h-5 text-white" />
                  </div>

                  {/* Video Badge */}
                  {testimonial.hasVideo && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-red-500 hover:bg-red-600 text-white">
                        <Play className="w-3 h-3 mr-1" />
                        Video
                      </Badge>
                    </div>
                  )}

                  {/* Client Info */}
                  <div className="flex items-center gap-4 mb-4 mt-2">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-green-200"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(testimonial.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{testimonial.rating}/5</span>
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 leading-relaxed line-clamp-3 mb-4">{testimonial.quote}</p>

                  {/* Read More */}
                  <div className="text-green-600 text-sm font-medium group-hover:text-green-700 flex items-center gap-1">
                    Read full review
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Type Badge */}
                  <div className="absolute bottom-4 right-4">
                    <Badge variant="outline" className="text-xs">
                      {testimonial.type === "corporate" ? (
                        <Building2 className="w-3 h-3 mr-1" />
                      ) : (
                        <Home className="w-3 h-3 mr-1" />
                      )}
                      {testimonial.type}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "w-8 bg-green-600" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 p-6 bg-white rounded-2xl shadow-md border border-green-100 max-w-md mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">4.9/5</p>
          <p className="text-gray-600">Based on 500+ reviews</p>
        </motion.div>
      </div>

      {/* Full Testimonial Modal */}
      <Dialog open={!!selectedTestimonial} onOpenChange={() => setSelectedTestimonial(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Client Testimonial</DialogTitle>
          </DialogHeader>
          {selectedTestimonial && (
            <div className="space-y-6">
              {/* Client Info */}
              <div className="flex items-center gap-4">
                <img
                  src={selectedTestimonial.image || "/placeholder.svg"}
                  alt={selectedTestimonial.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-green-200"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-xl">{selectedTestimonial.name}</h3>
                  <p className="text-gray-600">{selectedTestimonial.role}</p>
                  <p className="text-sm text-gray-500">{selectedTestimonial.company}</p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    selectedTestimonial.type === "corporate"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-green-50 text-green-700 border-green-200"
                  }
                >
                  {selectedTestimonial.type === "corporate" ? (
                    <Building2 className="w-4 h-4 mr-1" />
                  ) : (
                    <Home className="w-4 h-4 mr-1" />
                  )}
                  {selectedTestimonial.type}
                </Badge>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(selectedTestimonial.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-700">{selectedTestimonial.rating}/5</span>
              </div>

              {/* Full Testimonial */}
              <div className="bg-green-50 rounded-xl p-6 relative">
                <Quote className="absolute top-4 left-4 w-8 h-8 text-green-200" />
                <p className="text-gray-700 leading-relaxed pl-8">{selectedTestimonial.fullTestimonial}</p>
              </div>

              {/* Video Option */}
              {selectedTestimonial.hasVideo && (
                <Button className="w-full bg-red-500 hover:bg-red-600">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Video Testimonial
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Schema.org Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "S P Recycling",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "500",
              bestRating: "5",
              worstRating: "1",
            },
            review: filteredTestimonials.map((t) => ({
              "@type": "Review",
              author: {
                "@type": "Person",
                name: t.name,
              },
              reviewRating: {
                "@type": "Rating",
                ratingValue: t.rating.toString(),
                bestRating: "5",
              },
              reviewBody: t.fullTestimonial,
            })),
          }),
        }}
      />
    </section>
  )
}
