"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Slide {
  id: number
  image: string
  heading: string
  description: string
  cta1: { label: string; href?: string }
  cta2: { label: string; href?: string }
  cardImage?: string
  highlight?: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/hero/1.jpg",
    heading: "Transforming E-Waste into Eco-Value",
    description:
      "Empowering homes and businesses with certified recycling that protects nature and reclaims valuable resources responsibly.",
    cta1: { label: "♻ Start Recycling", href: "/contact" },
    cta2: { label: "Learn More", href: "/services" },
    cardImage: "/services/electronic waste.png",
    highlight: "Eco-Value",
  },
  {
    id: 2,
    image: "/hero/2.jpg",
    heading: "Secure, Certified E-Waste Recycling",
    description:
      "Safe data destruction, responsible device recovery, and sustainable reuse for IT and telecom industries.",
    cta1: { label: "Schedule Pickup", href: "/contact" },
    cta2: { label: "View Services", href: "/service" },
    cardImage: "/services/IT & Telecommunication.png",
    highlight: "E-Waste",
  },
  {
    id: 3,
    image: "/hero/3.jpg",
    heading: "Sustainable Waste Solutions that Deliver Impact",
    description:
      "Integrating collection, segregation, and recycling to minimize waste footprint and maximize material recovery.",
    cta1: { label: "Explore Solutions", href: "/services" },
    cta2: { label: "Get Consultation", href: "/contact" },
    cardImage: "/services/Sustainable Waste Solutions.png",
    highlight: "Waste Solutions",
  },
  {
    id: 4,
    image: "/hero/4.jpg",
    heading: "Future-Ready EPR & Brand Responsibility",
    description:
      "Ensuring complete product lifecycle compliance with customized recycling and accountability programs.",
    cta1: { label: "Know More", href: "/services/EPR-compliance" },
    cta2: { label: "Partner With Us", href: "/contact" },
    cardImage: "/services/EPR Compliance Solutions.png",
    highlight: "EPR",
  },
  {
    id: 5,
    image: "/hero/5.jpg",
    heading: "10+ Years of Sustainable Excellence",
    description:
      "Trusted by 500+ clients across 20+ industries with 99% satisfaction in e-waste recycling services.",
    cta1: { label: "Join Us", href: "/about" },
    cta2: { label: "Contact Now", href: "/contact" },
    cardImage: "/placeholder.jpg",
    highlight: "Sustainable Excellence",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    const fullText = slides[currentSlide].heading
    setTypedText("")
    setIsTypingComplete(false)
    let currentIndex = 0

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        setIsTypingComplete(true)
        clearInterval(typingInterval)
      }
    }, 60)

    return () => clearInterval(typingInterval)
  }, [currentSlide])

  const nextSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const prevSlide = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning])

  const goToSlide = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide()
      if (e.key === "ArrowRight") nextSlide()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) nextSlide()
    if (isRightSwipe) prevSlide()

    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <section
      className="relative w-full h-[90vh] min-h-[600px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Hero image slider"
      aria-live="polite"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute  inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.heading}
            fill
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#00996c] opacity-40" />
        </div>
      ))}

      <div className="relative z-20 h-full flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold text-white mb-4 md:mb-6 text-balance min-h-[4rem] md:min-h-[5rem] lg:min-h-[6rem]">
            <span className="inline-block">
              {(() => {
                const highlight = slides[currentSlide].highlight
                if (highlight && typedText.includes(highlight)) {
                  const parts = typedText.split(highlight)
                  return (
                    <>
                      <span>{parts[0]}</span>
                      <span className="text-[#4afaa5]">{highlight}</span>
                      <span>{parts.slice(1).join(highlight)}</span>
                    </>
                  )
                }
                return typedText
              })()}
              <span className={`typing-cursor ${isTypingComplete ? "opacity-0" : ""}`}>|</span>
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-10 text-pretty">
            E-Waste Recycling — Safe. Compliant. Eco-friendly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              asChild
            >
              <a href={slides[currentSlide].cta1.href || "#"}>{slides[currentSlide].cta1.label}</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#074E3B] px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 bg-transparent"
              asChild
            >
              <a href={slides[currentSlide].cta2.href || "#"}>{slides[currentSlide].cta2.label}</a>
            </Button>
          </div>

          <div className="mt-8 md:mt-12">
            <p className="text-white/80 text-sm md:text-base">{slides[currentSlide].description}</p>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute md:block hidden left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute md:block hidden right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent ${
              index === currentSlide ? "w-12 h-3 bg-[#10B981]" : "w-3 h-3 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .typing-cursor {
          display: inline-block;
          margin-left: 4px;
          animation: blink 1s step-end infinite;
          color: #10B981;
          font-weight: 300;
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}
