"use client"

import { useEffect, useRef, useState } from "react"
import {
  Truck,
  BadgeIndianRupee,
  ShieldCheck,
  Recycle,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const pillars = [
  {
    icon: Truck,
    title: "We Come to You — No Hassle, No Trips",
    description:
      "Forget loading scrap into your car or coordinating multiple pickups on your own. SP Recycling offers doorstep collection from homes, offices, warehouses, factories, schools, and commercial spaces across Hyderabad. Schedule a time that works for you, and our team shows up — on time, every time.",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    icon: BadgeIndianRupee,
    title: "Transparent Pricing You Can Actually Trust",
    description:
      "Every item is weighed in front of you, and pricing is communicated upfront — no surprises, no hidden cuts. Residential customers get a clear, fixed pricing structure. Businesses and corporate clients dealing with bulk e-waste, IT asset disposal, battery waste, or hazardous materials receive customised high-value quotations that reflect actual market rates.",
    accent: "from-green-500 to-emerald-600",
  },
  {
    icon: ShieldCheck,
    title: "Legally Authorized. Environmentally Responsible.",
    description:
      "SP Recycling holds active authorizations from both the Central Pollution Control Board (CPCB) and the Telangana State Pollution Control Board (TSPCB) for e-waste and battery waste recycling. Every item is processed according to Government of India guidelines — keeping harmful materials out of landfills and waterways while contributing to a cleaner Hyderabad.",
    accent: "from-teal-500 to-cyan-600",
  },
  {
    icon: Building2,
    title: "Serving Individuals, Businesses & Institutions",
    description:
      "From single households clearing out a room to large enterprises managing IT asset retirement, SP Recycling works with clients of every size. A corporate office disposing of 200 laptops has very different needs from a family clearing old appliances — and our process handles both smoothly.",
    accent: "from-emerald-600 to-green-500",
  },
]

const materials = [
  "Old computers, laptops, and IT equipment",
  "Mobile phones and tablets",
  "Printers, scanners, and consumer electronics",
  "Refrigerators, air conditioners, and washing machines",
  "UPS systems and battery waste",
  "Iron, steel, copper, and aluminium scrap",
  "Office furniture and electrical scrap",
  "Corporate e-waste and bulk industrial scrap",
]

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[number]
  index: number
}) {
  const Icon = pillar.icon
  return (
    <article className="group relative h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-200/80 transition-all duration-300 overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pillar.accent}`} />
      <div className="p-6 sm:p-8">
        <div className="flex items-start gap-4 sm:gap-5">
          <div
            className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${pillar.accent} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}
          >
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={1.75} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 block">
              0{index + 1}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-snug">
              {pillar.title}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{pillar.description}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export function HyderabadWhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = carouselRef.current
    if (!root) return

    const slides = Array.from(root.children) as HTMLElement[]
    if (!slides.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const index = slides.indexOf(visible.target as HTMLElement)
        if (index >= 0) setActiveIndex(index)
      },
      { root, threshold: [0.55, 0.75, 1] }
    )

    slides.forEach((slide) => observer.observe(slide))
    return () => observer.disconnect()
  }, [])

  const scrollToSlide = (index: number) => {
    const root = carouselRef.current
    if (!root) return
    const slide = root.children[index] as HTMLElement | undefined
    if (!slide) return
    root.scrollTo({ left: slide.offsetLeft, behavior: "smooth" })
    setActiveIndex(index)
  }

  const scrollToPickup = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50/60" />
      <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-emerald-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-200/25 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-4 py-1.5 text-sm font-semibold mb-5">
            <Sparkles className="w-4 h-4" />
            Trusted in Hyderabad
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight tracking-tight mb-5">
            Why SP Recycling Is Hyderabad&apos;s Most Trusted Name for Scrap &amp; E-Waste Disposal
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            If you&apos;ve been putting off clearing out old electronics or figuring out what to do with scrap metal
            from your warehouse, you&apos;re not alone. Most people don&apos;t act because the process feels complicated
            — finding a buyer, negotiating prices, arranging transport, and making sure it&apos;s all done legally.{" "}
            <span className="font-semibold text-emerald-700">
              SP Recycling was built specifically to remove every one of those hurdles.
            </span>
          </p>
          <p className="mt-4 text-sm sm:text-base text-gray-500">
            Here&apos;s what makes us different from the dozens of other scrap dealers operating in Hyderabad.
          </p>
        </div>

        {/* Pillar cards — carousel on mobile, grid from md up */}
        <div className="mb-12 sm:mb-16">
          <div className="md:hidden">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {pillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className="min-w-full flex-[0_0_100%] snap-center snap-always px-1"
                >
                  <PillarCard pillar={pillar} index={index} />
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-center gap-2">
              {pillars.map((pillar, index) => (
                <button
                  key={pillar.title}
                  type="button"
                  aria-label={`Go to card ${index + 1}`}
                  onClick={() => scrollToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-7 bg-emerald-600"
                      : "w-2 bg-emerald-200 hover:bg-emerald-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.title} pillar={pillar} index={index} />
            ))}
          </div>
        </div>

        {/* Materials accepted */}
        <div className="relative rounded-3xl overflow-hidden mb-12 sm:mb-16 border border-emerald-100 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl" />
          </div>

          <div className="relative p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
              <div className="lg:w-2/5 flex-shrink-0">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm mb-5">
                  <Recycle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  We Accept a Wide Range of Materials
                </h3>
                <p className="text-emerald-50/90 text-sm sm:text-base leading-relaxed">
                  Whether it&apos;s a decade-old desktop computer or a truckload of industrial metal scrap, we handle
                  it all. If you&apos;re not sure whether something qualifies, just ask — our team will let you know
                  right away.
                </p>
              </div>

              <ul className="lg:flex-1 grid sm:grid-cols-2 gap-3 sm:gap-4">
                {materials.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3.5 border border-white/15 hover:bg-white/15 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-200 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-[0.9rem] text-white font-medium leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-emerald-100 shadow-md px-6 py-8 sm:px-10 sm:py-10">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Book Your Pickup Today</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              Getting started takes less than a minute. Schedule your scrap pickup with SP Recycling, and our team
              will take care of everything from collection to certified recycling — while making sure you get the
              best possible value for your materials.
            </p>
            <Button
              size="lg"
              onClick={scrollToPickup}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-emerald-600/25 group"
            >
              Schedule Pickup Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
