"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Recycle,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ewasteCategories, type EwasteCategory } from "@/data/categories"

const PickupFormModal = dynamic(
  () =>
    import("@/components/pickup-form-modal").then((m) => ({
      default: m.PickupFormModal,
    })),
  { ssr: false }
)

function CategoryCard({
  category,
  onInquire,
}: {
  category: EwasteCategory
  onInquire: (category: EwasteCategory) => void
}) {
  const [itemsOpen, setItemsOpen] = useState(false)
  const [firstItem, ...otherItems] = category.items

  return (
    <article className="group/card flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-50 overflow-hidden bg-gray-100">
        <Image
          src={category.image}
          alt={category.alt}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
          className="object-cover transition duration-500 group-hover/card:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-900/75 via-gray-900/15 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/90">
            <Sparkles className="h-3 w-3" aria-hidden />
            Recyclable
          </span>
          <h3 className="mt-2 line-clamp-2 text-[15px] font-bold leading-snug text-white">
            {category.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <button
          type="button"
          aria-expanded={itemsOpen}
          onClick={() => setItemsOpen((open) => !open)}
          className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-left transition hover:border-gray-300 hover:bg-gray-100/80"
        >
          <span className="flex items-start justify-between gap-2">
            <span className="min-w-0 flex-1">
              {itemsOpen ? (
                <ul className="max-h-36 space-y-1.5 overflow-y-auto pr-1 scrollbar-hide">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[13px] leading-5 text-gray-700"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="relative block min-h-5 overflow-hidden">
                  <span className="flex items-start gap-2 text-[13px] leading-5 text-gray-800">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700"
                      aria-hidden
                    />
                    {firstItem}
                    {otherItems.length > 0 ? (
                      <span className="text-gray-400">
                        +{otherItems.length} more
                      </span>
                    ) : null}
                  </span>
                </span>
              )}
            </span>
            <ChevronDown
              className={`mt-0.5 h-4 w-4 shrink-0 text-gray-500 transition ${
                itemsOpen ? "rotate-180" : ""
              } ${otherItems.length === 0 ? "invisible" : ""}`}
              aria-hidden
            />
          </span>
        </button>

        <button
          type="button"
          onClick={() => onInquire(category)}
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-emerald-800/20 bg-emerald-800 text-sm font-semibold text-white transition hover:bg-emerald-900"
        >
          Inquire now
          <ArrowRight className="h-4 w-4 transition group-hover/card:translate-x-0.5" />
        </button>
      </div>
    </article>
  )
}

function getGapOffset(itemsPerView: number) {
  if (itemsPerView === 1) return 0
  if (itemsPerView === 2) return 8
  if (itemsPerView === 3) return 14
  return 18
}

type ScrapTypesSectionProps = {
  cityName?: string
}

export function ScrapTypesSection({ cityName }: ScrapTypesSectionProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [pickupModalOpen, setPickupModalOpen] = useState(false)
  const [pickupModalLoaded, setPickupModalLoaded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<EwasteCategory | null>(
    null
  )
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (pickupModalOpen) setPickupModalLoaded(true)
  }, [pickupModalOpen])

  const openInquiryModal = (category: EwasteCategory) => {
    setSelectedCategory(category)
    setPickupModalLoaded(true)
    setPickupModalOpen(true)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1280) {
        setItemsPerView(3)
      } else {
        setItemsPerView(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setCurrentIndex(0)
  }, [itemsPerView])

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1
          if (nextIndex >= ewasteCategories.length) {
            return 0
          }
          return nextIndex
        })
      }, 3500)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying])

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? ewasteCategories.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= ewasteCategories.length ? 0 : prev + 1
    )
  }

  const gapOffset = getGapOffset(itemsPerView)
  const loopCategories = [...ewasteCategories, ...ewasteCategories]

  const badgeText = cityName
    ? `Recyclable in ${cityName}`
    : "What We Collect / Recycle"

  const heading = cityName ? (
    <>
      E-Waste &amp; Scrap We Collect in{" "}
      <span className="text-emerald-800">{cityName}</span>
    </>
  ) : (
    <>
      Types of Scrap &amp;{" "}
      <span className="text-emerald-800">E-Waste</span> We Collect
    </>
  )

  const description = cityName
    ? `SP Recycling collects and responsibly recycles electronic waste in ${cityName} from homes, businesses, industries, and institutions. Browse categories below and inquire for doorstep pickup or pricing.`
    : "SP Recycling collects and responsibly recycles electronic waste from homes, businesses, industries, and institutions. Browse categories below and inquire for pickup or pricing."

  const ctaTitle = cityName
    ? `Not Sure What Category Your Scrap Falls Under in ${cityName}?`
    : "Not Sure What Category Your Scrap Falls Under?"

  const ctaDescription = cityName
    ? `That's completely fine — just reach out. Our ${cityName} team will assess your materials, give you an honest valuation, and arrange pickup at a time that suits you.`
    : "That's completely fine — just reach out. Our team will assess your materials, give you an honest valuation, and arrange pickup at a time that suits you."

  const contactHref = cityName
    ? `/contact?city=${encodeURIComponent(cityName.toLowerCase())}`
    : "/contact"

  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 md:py-28">
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-semibold text-gray-700">
              <Recycle className="h-4 w-4 text-emerald-800" aria-hidden />
              {badgeText}
            </div>
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-4xl">
              {heading}
            </h2>
            <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
              {description}
            </p>
          </motion.div>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            aria-label="Previous categories"
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white shadow-lg hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 md:flex md:h-12 md:w-12 md:-translate-x-12"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            aria-label="Next categories"
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 translate-x-4 rounded-full bg-white shadow-lg hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 md:flex md:h-12 md:w-12 md:translate-x-12"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </Button>

          <div className="overflow-hidden py-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex gap-3 sm:gap-4 lg:gap-5"
              animate={{
                x: `-${currentIndex * (100 / itemsPerView)}%`,
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            >
              {loopCategories.map((category, index) => (
                <div
                  key={`${category.id}-${index}`}
                  className="shrink-0"
                  style={{
                    flexBasis: `calc(${100 / itemsPerView}% - ${gapOffset}px)`,
                    minWidth:
                      itemsPerView === 1 ? "calc(100% - 0px)" : undefined,
                  }}
                >
                  <CategoryCard
                    category={category}
                    onInquire={openInquiryModal}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              aria-label="Previous categories"
              className="h-9 w-9 rounded-full bg-white shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs text-gray-500">
              {currentIndex + 1} / {ewasteCategories.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              aria-label="Next categories"
              className="h-9 w-9 rounded-full bg-white shadow-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative mt-14 overflow-hidden rounded-2xl border border-gray-200 bg-emerald-900 shadow-sm"
        >
          <div className="relative flex flex-col gap-6 p-8 sm:p-10 lg:flex-row lg:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
              <HelpCircle className="h-7 w-7 text-white" aria-hidden />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl">
                {ctaTitle}
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
                {ctaDescription}
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="group/btn shrink-0 rounded-xl bg-white px-8 py-6 font-semibold text-emerald-900 transition-colors hover:bg-gray-100"
            >
              <Link href={contactHref}>
                Talk to Recycling Experts
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {pickupModalLoaded ? (
        <PickupFormModal
          open={pickupModalOpen}
          onOpenChange={setPickupModalOpen}
          defaultCity={cityName}
          defaultInquiryType={selectedCategory?.title}
        />
      ) : null}
    </section>
  )
}
