"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export type TimelineItem = {
  year: number
  title: string
  subtitle?: string
  tone?: "blue" | "green" | "purple" | "orange" | "neutral"
  description?: string
}

function toneClasses(tone: TimelineItem["tone"]) {
  switch (tone) {
    case "green":
      return {
        dot: "bg-gradient-to-r from-green-500 to-emerald-600",
        ring: "border-green-300",
        text: "text-green-600",
        chip: "from-green-600 to-emerald-600",
        bar: "from-green-600 to-emerald-600",
        cardRing: "border-green-200",
        cardBg: "from-white to-green-50",
      }
    case "purple":
      return {
        dot: "bg-gradient-to-r from-emerald-500 to-green-600",
        ring: "border-emerald-300",
        text: "text-emerald-600",
        chip: "from-emerald-600 to-green-600",
        bar: "from-emerald-600 to-green-600",
        cardRing: "border-emerald-200",
        cardBg: "from-white to-emerald-50",
      }
    case "orange":
      return {
        dot: "bg-gradient-to-r from-green-600 to-emerald-700",
        ring: "border-green-400",
        text: "text-green-700",
        chip: "from-green-700 to-emerald-700",
        bar: "from-green-700 to-emerald-700",
        cardRing: "border-green-300",
        cardBg: "from-white to-green-100",
      }
    case "blue":
      return {
        dot: "bg-gradient-to-r from-emerald-400 to-green-500",
        ring: "border-emerald-200",
        text: "text-emerald-600",
        chip: "from-emerald-500 to-green-500",
        bar: "from-emerald-500 to-green-500",
        cardRing: "border-emerald-100",
        cardBg: "from-white to-emerald-50",
      }
    default:
      return {
        dot: "bg-gradient-to-r from-green-500 to-emerald-600",
        ring: "border-green-300",
        text: "text-green-600",
        chip: "from-green-600 to-emerald-600",
        bar: "from-green-600 to-emerald-600",
        cardRing: "border-green-200",
        cardBg: "from-white to-green-50",
      }
  }
}

export function TimelineCarousel({
  items,
  className,
  heading = "Our Journey",
}: {
  items: TimelineItem[]
  className?: string
  heading?: string
}) {
  // Exactly 4 visible; startIndex defines leftmost item
  const [startIndex, setStartIndex] = React.useState(0)
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const [activeOffset, setActiveOffset] = React.useState(0) // 0..3 within current four
  const [isPaused, setIsPaused] = React.useState(false)
  const itemCount = items.length

  const goNext = React.useCallback(() => {
    setStartIndex((prev) => (prev + 1) % itemCount)
  }, [itemCount])

  const goPrev = React.useCallback(() => {
    setStartIndex((prev) => (prev - 1 + itemCount) % itemCount)
  }, [itemCount])

  // Special: on hover of the "next after 4th" preview, rotate so current 4th becomes first
  const handlePeekHover = React.useCallback(() => {
    setStartIndex((prev) => (prev + 3) % itemCount)
  }, [itemCount])

  const at = React.useCallback((i: number) => items[((i % itemCount) + itemCount) % itemCount], [items, itemCount])

  // For the main line under cards
  const currentFour = [0, 1, 2, 3].map((i) => at(startIndex + i))

  // Auto-advance active card 1->2->3->4, then slide and restart
  React.useEffect(() => {
    if (itemCount === 0) return
    if (isPaused) return
    const visibleCount = Math.min(4, itemCount)
    const lastVisibleOffset = visibleCount - 1
    const id = window.setInterval(() => {
      setActiveOffset((prev) => {
        const activeAbsoluteIndex = (startIndex + prev) % itemCount
        // If currently on the absolute last item, wrap to start immediately (no delay)
        if (activeAbsoluteIndex === itemCount - 1) {
          setStartIndex(0)
          return 0
        }
        if (prev < lastVisibleOffset) {
          return prev + 1
        }
        // when hitting the 4th (or last visible), slide and reset to first
        setStartIndex((s) => (s + 1) % itemCount)
        return 0
      })
    }, 2500)
    return () => window.clearInterval(id)
  }, [itemCount, isPaused, startIndex])

  return (
    <section className={cn("w-full pb-24 relative", className)} aria-label="Company journey timeline carousel">
      {/* Section Header */}
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">Our Journey</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            From a small recycling initiative to a nationwide e-waste management network.
          </p>
        </motion.div>

      <div className="relative">
        {/* Navigation buttons positioned on left and right sides */}
        <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
          <Button variant="outline" size="icon" onClick={goPrev} aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
          <Button variant="outline" size="icon" onClick={goNext} aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        {/* Decorative base line */}
        <div
          className="absolute left-0 top-4/5 h-1 w-full rounded-full bg-gradient-to-r from-green-200 via-green-500 to-emerald-600"
          style={{ transform: "translateY(20px)" }}
          aria-hidden="true"
        />

        {/* Viewport: exactly 4 cards */}
        <div className="overflow-x-hidden overflow-y-visible rounded-lg pt-80 md:pt-80 pb-10 min-h-72">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${startIndex * 25}%)` }}
            role="list"
            aria-label="Timeline items"
          >
            {items.map((item, i) => {
              const tone = toneClasses(item.tone || "blue")
              const activeAbsoluteIndex = (startIndex + activeOffset) % itemCount
              const isActive = hoveredIndex === i || (hoveredIndex === null && i === activeAbsoluteIndex)
              return (
                <div key={`${item.year}-${i}`} role="listitem" className="w-1/4 shrink-0 grow-0 p-4">
                  <div 
                    className="group relative flex flex-col items-center"
                    onMouseEnter={() => { setHoveredIndex(i); setIsPaused(true) }}
                    onMouseLeave={() => { setHoveredIndex(null); setIsPaused(false) }}
                  >
                    {/* Floating info card on hover (improved design) */}
                    <div
                      className={`absolute -top-6 z-20 w-80 -translate-y-72 rounded-2xl border-2 bg-white p-6 shadow-2xl md:-translate-y-80 lg:-translate-y-80 xl:-translate-y-80 2xl:-translate-y-80 ${
                        isActive ? "block" : "hidden group-hover:block"
                      } ${tone.cardRing}`}
                      style={{ pointerEvents: "none" }}
                      aria-hidden="true"
                    >
                      {/* Header with gradient chip */}
                      <div className={cn("mb-4")}>
                        <div className={cn(
                          "inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-bold bg-gradient-to-r mb-3",
                          tone.chip
                        )}>
                          {item.title}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className={cn("w-2 h-2 rounded-full", tone.dot)} />
                          <span className={cn("text-xs font-semibold uppercase tracking-wide", tone.text)}>
                            {item.subtitle || "Active"}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mb-5 text-sm leading-relaxed text-gray-600 min-h-[3rem]">
                        {item.description || "Key achievements and progress milestones."}
                      </p>

                      {/* Progress bar */}
                      <div className="mb-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-500">Progress</span>
                          <span className={cn("text-xs font-bold", tone.text)}>100%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={cn(
                              "h-full w-full rounded-full bg-gradient-to-r transition-all duration-1000",
                              tone.bar,
                            )}
                          />
                        </div>
                      </div>

                      {/* Info grid */}
                      <div className={cn("rounded-xl border-2 p-4 bg-gradient-to-br", tone.cardBg, tone.cardRing)}>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className={cn("text-2xl font-bold mb-1", tone.text)}>{item.year}</div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Year</div>
                          </div>
                          <div className="text-center border-l-2 border-gray-200">
                            <div className={cn("text-lg font-bold mb-1 line-clamp-1", tone.text)}>
                              {item.title.length > 15 ? item.title.substring(0, 15) + "..." : item.title}
                            </div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Milestone</div>
                          </div>
                        </div>
                      </div>

                      {/* Arrow pointer */}
                      <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-white" />
                    </div>

                    {/* Label above dot */}
                    <p aria-hidden={isActive} className={`mb-2 -translate-y-8 text-center text-lg font-semibold transition-all duration-300 ${
                      isActive ? "scale-105 text-green-700 opacity-0" : "text-green-600 group-hover:scale-105 group-hover:text-green-700"
                    }`}>
                      {item.title}
                    </p>

                    {/* Dot */}
                    <div className="relative mt-8">
                      <div
                        className={cn(
                          "z-10 h-5 w-5 rounded-full transition-all duration-300",
                          isActive ? "scale-125 shadow-lg bg-gradient-to-r" : "bg-black group-hover:scale-125 group-hover:shadow-lg group-hover:bg-gradient-to-r",
                          tone.dot,
                        )}
                      />
                      <div
                        className={cn(
                          "absolute -left-[2px] -top-[2px] inset-0 rounded-full border-2 animate-spin-slow transition-opacity duration-300",
                          tone.ring,
                          isActive ? "opacity-50" : "opacity-0 group-hover:opacity-50",
                        )}
                        style={{ width: "28px", height: "28px" }}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Year under dot */}
                    <p className={cn("mt-4 text-sm transition-colors duration-300", tone.text)}>{item.year}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Hover peek for next item (after the 4th). Hovering rotates so 4th becomes first */}
        <div
          className="pointer-events-auto absolute right-2 top-4/5 hidden -translate-y-1/2 md:block"
          onMouseEnter={handlePeekHover}
          aria-hidden="false"
        >
          <div className="flex items-center gap-2 rounded-md bg-background/70 px-2 py-1 ring-1 ring-border backdrop-blur supports-[backdrop-filter]:bg-background/40">
            <div className="text-xs text-muted-foreground">Next</div>
            <div className="text-sm font-medium">{at(startIndex + 4).year}</div>
          </div>
        </div>

        {/* Dots per page of 4 */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: Math.ceil(itemCount / 4) }).map((_, page) => {
            const pageStart = page * 4
            const active = startIndex >= pageStart && startIndex <= Math.min(pageStart + 3, itemCount - 1)
            return (
              <button
                key={page}
                aria-label={`Go to slide ${page + 1}`}
                className={cn("h-2 w-2 rounded-full transition-colors", active ? "bg-foreground" : "bg-muted")}
                onClick={() => setStartIndex(pageStart)}
              />
            )
          })}
        </div>
      </div>

      {/* Bottom overlay to prevent underlying text from showing through when cards float */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 md:h-72 bg-gradient-to-b from-transparent to-background"
      />

      {/* Accessibility hints */}
      <div className="sr-only" aria-live="polite">
        Visible years: {currentFour.map((i) => i.year).join(", ")}
      </div>

      {/* Add local spin-slow animation */}
      <style jsx>{`
        @keyframes spin-slow {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </section>
  )
}
