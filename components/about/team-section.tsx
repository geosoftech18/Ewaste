"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { Linkedin, Mail, ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

const teamMembers = [
  {
    name: "Rajesh Patel",
    position: "Managing Director",
    bio: "Leading the company with 15+ years of experience in sustainable waste management and operational excellence.",
    image: "/professional-indian-male-executive-in-business-sui.jpg",
    linkedin: "#",
    email: "rajesh@sprecycling.com",
  },
  {
    name: "Meera Shah",
    position: "Head of Compliance & Operations",
    bio: "Ensures all recycling activities meet environmental and legal standards, driving efficiency and transparency.",
    image: "/professional-indian-female-executive-in-business-a.jpg",
    linkedin: "#",
    email: "meera@sprecycling.com",
  },
  {
    name: "Amit Deshmukh",
    position: "Technical Director",
    bio: "Oversees process innovation, recycling automation, and IT infrastructure management.",
    image: "/professional-indian-male-tech-director-in-smart-ca.jpg",
    linkedin: "#",
    email: "amit@sprecycling.com",
  },
  {
    name: "Priya Menon",
    position: "Sustainability Officer",
    bio: "Champions corporate sustainability initiatives and community awareness programs.",
    image: "/professional-indian-female-sustainability-officer.jpg",
    linkedin: "#",
    email: "priya@sprecycling.com",
  },
  {
    name: "Nikhil Verma",
    position: "Client Relations Manager",
    bio: "Builds partnerships with businesses and manages customer service excellence across all regions.",
    image: "/professional-indian-male-client-relations-manager.jpg",
    linkedin: "#",
    email: "nikhil@sprecycling.com",
  },
]

function TeamCard({ member, index }: { member: (typeof teamMembers)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4"
      style={{
        boxShadow: "0 4px 20px rgba(34, 197, 94, 0.1)",
      }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-100 via-emerald-100 to-blue-100 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-emerald-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />

      <div className="relative z-10">
        {/* Profile Photo with eco-themed frame */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          {/* Leaf outline decoration */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 group-hover:border-primary/40 transition-colors duration-300" />
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <div className="w-4 h-4 bg-primary rounded-full" />
          </div>

          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            width={128}
            height={128}
            className="rounded-full object-cover w-full h-full border-4 border-white shadow-lg"
          />
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-primary text-center mb-1">{member.name}</h3>

        {/* Position */}
        <p className="text-sm text-primary/70 text-center mb-3 font-medium">{member.position}</p>

        {/* Bio */}
        <p className="text-sm text-muted-foreground text-center leading-relaxed mb-4">{member.bio}</p>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-4 pt-4 border-t border-primary/10"
        >
          <motion.a
            href={member.linkedin}
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="text-primary/60 hover:text-primary transition-colors duration-300"
            aria-label={`${member.name}'s LinkedIn`}
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>
          <motion.a
            href={`mailto:${member.email}`}
            whileHover={{ scale: 1.2, rotate: -5 }}
            className="text-primary/60 hover:text-primary transition-colors duration-300"
            aria-label={`Email ${member.name}`}
          >
            <Mail className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })],
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section
      ref={ref}
      className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50"
    >
      {/* Background leaf particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 text-primary/5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.67-2.1c1.1.66 2.41 1.1 3.62 1.1 4.97 0 9-4.03 9-9 0-2.21-.8-4.23-2.12-5.79L17 8zM12 20c-1.1 0-2.15-.28-3.07-.77l.77-2.43c.71.27 1.48.43 2.3.43 3.31 0 6-2.69 6-6 0-.55-.07-1.08-.19-1.59l1.93-.5C19.91 10.08 20 11.03 20 12c0 4.42-3.58 8-8 8z" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-5xl font-bold text-primary mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The people driving innovation and responsibility in e-waste management.
          </p>
        </motion.div>

        <div className="relative">
          {/* Carousel Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {teamMembers.map((member, index) => (
                <TeamCard key={member.name} member={member} index={index} />
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white/90 hover:bg-white text-primary rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white/90 hover:bg-white text-primary rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === selectedIndex ? "w-8 h-3 bg-primary" : "w-3 h-3 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
