"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Image from "next/image"
import { BreadcrumbNav } from "@/components/seo/breadcrumb-nav"

const YT_ID = "Joxu_uv0OeA"
/** Fast LCP poster — same frame look as video, tiny vs YouTube player */
const POSTER_SRC = `https://i.ytimg.com/vi/${YT_ID}/hqdefault.jpg`
const EMBED_SRC = `https://www.youtube.com/embed/${YT_ID}?autoplay=1&loop=1&playlist=${YT_ID}&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&cc_load_policy=0`

export function VideoHero() {
  const [typedText, setTypedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [loadVideo, setLoadVideo] = useState(false)

  const heading = "Transforming E-Waste into Eco-Value"
  const highlight = "Eco-Value"
  const subheading = "E-Waste Recycling — Safe. Compliant. Eco-friendly."
  const cta1 = { label: "♻ Start Recycling", href: "/contact" }
  const cta2 = { label: "Learn More", href: "/services" }

  // Defer YouTube until after first paint / idle — fixes mobile LCP without changing UI
  useEffect(() => {
    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let started = false
    const events = ["touchstart", "scroll", "keydown", "mousemove"] as const

    const onInteract = () => start()

    function start() {
      if (started) return
      started = true
      setLoadVideo(true)
      events.forEach((e) => window.removeEventListener(e, onInteract))
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId) clearTimeout(timeoutId)
    }

    events.forEach((e) => window.addEventListener(e, onInteract, { once: true, passive: true }))

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(start, { timeout: 4500 })
    } else {
      timeoutId = setTimeout(start, 3500)
    }

    return () => {
      events.forEach((e) => window.removeEventListener(e, onInteract))
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId) clearTimeout(timeoutId)
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
    <section className="relative w-full h-[40vh] min-h-[250px] md:h-[90vh] md:min-h-[600px] overflow-hidden bg-black">
      <BreadcrumbNav variant="light" />

      {/* Background: poster first (LCP), then YouTube when idle / interaction */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <Image
          src={POSTER_SRC}
          alt=""
          width={1280}
          height={720}
          priority
          sizes="100vw"
          quality={70}
          className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
          aria-hidden
        />
        {loadVideo && (
          <iframe
            src={EMBED_SRC}
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
            style={{
              pointerEvents: "none",
              border: "none",
            }}
            allow="autoplay; encrypted-media; accelerometer; gyroscope; picture-in-picture"
            title="Hero Video"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-black/0 z-[5] pointer-events-none" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#00996c]/30 via-[#00996c]/25 to-[#00996c]/35 z-10" />

      <div className="relative z-20 h-full flex items-center justify-center px-4 ">
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 text-balance min-h-[4rem] md:min-h-[5rem] lg:min-h-[6rem]">
            <span className="inline-block">
              {(() => {
                if (highlight && typedText.includes(highlight)) {
                  const parts = typedText.split(highlight)
                  return (
                    <>
                      <span>{parts[0]}</span>
                      <span className="text-[#48c616]">{highlight}</span>
                      <span>{parts.slice(1).join(highlight)}</span>
                    </>
                  )
                }
                return typedText
              })()}
              <span className={`typing-cursor ${isTypingComplete ? "opacity-0" : ""}`}>|</span>
            </span>
          </h1>
          <p className="text-md md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-10 text-pretty">
            {subheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-[#fdf697] hover:bg-[#059669] text-[#00996c] hover:text-white px-4 py-4 md:px-8 md:py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              asChild
            >
              <a href={cta1.href || "#"}>{cta1.label}</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#fdf697] text-white hover:bg-white hover:text-[#074E3B] px-4 py-4 md:px-8 md:py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 bg-transparent"
              asChild
            >
              <a href={cta2.href || "#"}>{cta2.label}</a>
            </Button>
          </div>
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
          color: #10b981;
          font-weight: 300;
        }

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}
