"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

export function VideoHero() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [typedText, setTypedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  const heading = "Transforming E-Waste into Eco-Value"
  const highlight = "Eco-Value"
  const subheading = "E-Waste Recycling — Safe. Compliant. Eco-friendly."
  const description = "Empowering homes and businesses with certified recycling that protects nature and reclaims valuable resources responsibly."
  const cta1 = { label: "♻ Start Recycling", href: "/contact" }
  const cta2 = { label: "Learn More", href: "/services" }

  useEffect(() => {
    // Preload the iframe to minimize loading spinner
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }, [])

  useEffect(() => {
    setTypedText("")
    setIsTypingComplete(false)
    let currentIndex = 0

    const typingInterval = setInterval(() => {
      if (currentIndex <= heading.length) {
        setTypedText(heading.slice(0, currentIndex))
        currentIndex++
      } else {
        setIsTypingComplete(true)
        clearInterval(typingInterval)
      }
    }, 60)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <iframe
          ref={iframeRef}
          src="https://www.youtube.com/embed/Joxu_uv0OeA?autoplay=1&loop=1&playlist=Joxu_uv0OeA&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3&cc_load_policy=0&start=0&end=0"
          className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
          style={{
            pointerEvents: "none",
            border: "none",
          }}
          allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
          allowFullScreen
          title="Hero Video"
        />
        {/* Hide YouTube loading spinner with overlay */}
        <div className="absolute inset-0 bg-black/0 z-[5] pointer-events-none" />
      </div>

      {/* Overlay Gradient - matching hero-slider style */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00996c]/30 via-[#00996c]/25 to-[#00996c]/35 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 text-balance min-h-[4rem] md:min-h-[5rem] lg:min-h-[6rem]">
            <span className="inline-block">
              {(() => {
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
            {subheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              asChild
            >
              <a href={cta1.href || "#"}>{cta1.label}</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#074E3B] px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 bg-transparent"
              asChild
            >
              <a href={cta2.href || "#"}>{cta2.label}</a>
            </Button>
          </div>

          {/* <div className="mt-8 md:mt-12">
            <p className="text-white/80 text-sm md:text-base">{description}</p>
          </div> */}
        </div>
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

        /* Hide YouTube loading spinner and controls */
        iframe {
          opacity: 1;
          transition: opacity 0.3s ease-in;
        }

        /* Ensure video container doesn't show loading states */
        section {
          background: #000;
        }
      `}</style>
    </section>
  )
}

