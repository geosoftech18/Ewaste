'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ChevronsRight, Phone, Star } from 'lucide-react'

const PickupFormModal = dynamic(
  () => import('@/components/pickup-form-modal').then((m) => ({ default: m.PickupFormModal })),
  { ssr: false }
)

const ACCENT = '#C8F542'
const FOREST = '#0A2A22'

type Slide = {
  id: number
  image: string
  mobileImage: string
  eyebrow: string
  line1: string
  line2: string
  highlight: string
  line3?: string
  description: string
  ctaLabel: string
  ctaHref: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/hero-slider/1.jpg',
    mobileImage: '/mobile-slider/1.jpg',
    eyebrow: 'ISO · CPCB Certified',
    line1: 'Authorized E-Waste',
    line2: 'Recycling Company in',
    highlight: 'India',

    description:
      'Recycle old computers, laptops, servers, mobile phones, printers, and other electronic waste through a certified recycling process. We provide secure collection, responsible recycling, data destruction, and EPR-compliant disposal for businesses, industries, institutions, and households across India.',
    ctaLabel: 'Schedule Free Pickup',
    ctaHref: '/contact',
  },
  {
    id: 2,
    image: '/hero-slider/2.jpg',
    mobileImage: '/mobile-slider/2.jpg',
    eyebrow: 'Secure · Compliant · Traceable',
    line1: 'Secure IT Asset',
    line2: 'Disposal &',
    highlight: 'Certified ',
    line3: 'Data Destruction Services',
    description:
      'Dispose of outdated IT equipment safely with certified hard drive destruction, server disposal, laptop recycling, desktop recycling, and secure IT asset management. Protect confidential business information while ensuring environmentally responsible recycling.',
    ctaLabel: 'Request Pickup',
    ctaHref: '/contact',
  },
  {
    id: 3,
    image: '/hero-slider/3.jpg',
    mobileImage: '/mobile-slider/3.jpg',
    eyebrow: 'Industrial Scrap Recycling',
    line1: 'Metal Scrap Recycling',
    line2: 'Industries & Manufacturing ',
    highlight: 'Companies',

    description:
      'We purchase and recycle ferrous and non-ferrous metal scrap, including copper, aluminium, brass, stainless steel, iron, cables, industrial machinery, and manufacturing waste through safe and environmentally responsible recycling methods.',
    ctaLabel: 'Sell Scrap Today',
    ctaHref: '/contact',
  },
  {
    id: 4,
    image: '/hero-slider/4.jpg',
    mobileImage: '/mobile-slider/4.jpg',
    eyebrow: 'EPR Compliance',
    line1: 'EPR Compliance & Sustainable Waste ',
    line2: 'Management',
    highlight: 'Management',
    line3: ' Solutions',
    description:
      'Support your Extended Producer Responsibility (EPR) obligations with collection, recycling, documentation, and environmentally compliant waste management solutions. We help manufacturers, importers, producers, and brand owners meet CPCB guidelines through certified recycling processes.',
    ctaLabel: 'Explore EPR',
    ctaHref: '/services/EPR-compliance',
  },
  {
    id: 5,
    image: '/hero-slider/5.jpg',
    mobileImage: '/mobile-slider/5.jpg',
    eyebrow: 'Nationwide Collection',
    line1: 'Doorstep E-Waste',
    line2: 'Pickup Across Major',
    highlight: 'Cities',
    line3: ' in India',
    description:
      'Book a convenient electronic waste pickup for offices, factories, schools, hospitals, residential societies, and homes. Our trained team collects electronic waste and transports it to certified recycling facilities for safe processing.',
    ctaLabel: 'Book Pickup',
    ctaHref: '/contact',
  },
]

function PillCta({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex min-w-0 items-center rounded-full border-[3px] py-[2px] pl-5 pr-[2px] transition-transform duration-300 hover:scale-[1.02] sm:py-[3px] sm:pl-8 sm:pr-[3px]"
      style={{
        borderColor: ACCENT, 
        backgroundColor: FOREST,
      }}
    >
      <span className="truncate pr-3 text-sm font-semibold tracking-wide text-white sm:pr-6 sm:text-[15px] md:text-base">
        {label}
      </span>
      <span
        className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full sm:h-12 sm:w-12 md:h-[52px] md:w-[52px]"
        style={{ backgroundColor: ACCENT }}
        aria-hidden
      >
        <span className="hero-cta-chevron flex items-center text-[#0A2A22]">
          <ChevronsRight className="h-4 w-4 stroke-[2.75] sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </span>
      </span>
    </button>
  )
}

export function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [entered, setEntered] = useState(true)
  const [pickupModalOpen, setPickupModalOpen] = useState(false)
  const [pickupModalLoaded, setPickupModalLoaded] = useState(false)

  useEffect(() => {
    if (pickupModalOpen) setPickupModalLoaded(true)
  }, [pickupModalOpen])

  const openPickupModal = () => {
    setPickupModalLoaded(true)
    setPickupModalOpen(true)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setEntered(false)
      window.setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length)
        setEntered(true)
      }, 220)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const goTo = (idx: number) => {
    if (idx === current) return
    setEntered(false)
    window.setTimeout(() => {
      setCurrent(idx)
      setEntered(true)
    }, 180)
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: FOREST }}
      aria-label="Hero image slider"
      aria-live="polite"
    >
      <div className="relative min-h-[420px] h-[min(58vh,480px)] w-full sm:min-h-[520px] sm:h-[min(72vh,640px)] md:min-h-[600px] md:h-[min(92vh,780px)]">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{
              opacity: idx === current ? 1 : 0,
              pointerEvents: idx === current ? 'auto' : 'none',
              zIndex: idx === current ? 1 : 0,
            }}
            aria-hidden={idx !== current}
          >
            {/* Mobile: /mobile-slider · Desktop: /hero-slider */}
            <div className="absolute inset-0 md:left-[28%]">
              <picture>
                <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
                <Image
                  src={slide.image}
                  alt={`${slide.line2} ${slide.highlight} ${slide.line3 ?? ''}`}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 767px) 100vw, 72vw"
                  className="object-cover object-center"
                />
              </picture>
            </div>

            {/* Dark forest green → photo gradient (desktop) */}
            <div
              className="absolute inset-0 hidden md:block"
              style={{
                background: `
                  linear-gradient(
                    105deg,
                    ${FOREST} 0%,
                    ${FOREST} 42%,
                    rgba(10, 42, 34, 0.92) 45%,
                    rgba(10, 42, 34, 0.55) 65%,
                    rgba(10, 42, 34, 0.15) 82%,
                    transparent 100%
                  )
                `,
              }}
            />
            {/* Mobile overlay — keeps text readable over the photo */}
            <div
              className="pointer-events-none absolute inset-0 z-[1] md:hidden"
              style={{
                background: `linear-gradient(180deg, ${FOREST} 0%, rgba(10,42,34,0.42) 48%, rgba(10,42,34,0.38) 100%)`,
              }}
            />

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
              <div
                className={`max-w-2xl text-white transition-all duration-500 ease-out ${
                  idx === current && entered
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-3 opacity-0'
                }`}
              >
                {/* Rating badge */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 backdrop-blur-sm sm:mb-6">
                  <span className="text-sm font-bold text-white">4.9</span>
                  <span className="flex items-center gap-0.5" aria-label="5 star rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                        aria-hidden
                      />
                    ))}
                  </span>
                  <span className="text-xs font-medium text-white/80 sm:text-sm">
                    500+ Happy Clients
                  </span>
                </div>

                <p
                  className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] sm:mb-3 sm:text-sm"
                  style={{ color: ACCENT }}
                >
                  {slide.eyebrow}
                </p>

                <h2 className="mb-5 text-[1.55rem] font-extrabold leading-[1.08] tracking-tight sm:mb-5 sm:text-5xl sm:leading-[1.05] lg:text-[3rem]">
                  <span className="block text-white">{slide.line1}</span>
                  <span className="block text-white">
                    {slide.line2}{' '}
                    <span style={{ color: ACCENT }}>{slide.highlight}</span>
                  </span>
                  <span className="block text-white">{slide.line3}</span>
              </h2>

                <p className="mb-8 md:block hidden max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                  {slide.description}
                </p>

                <div className="flex flex-row mt-8 flex-nowrap items-center gap-3 sm:gap-5">
                  <PillCta label={slide.ctaLabel} onClick={openPickupModal} />

                  <a
                    href="tel:+919949901238"
                    aria-label="Call SP Recycling at +91 99499 01238"
                    className="inline-flex shrink-0 items-center gap-3.5 transition-opacity hover:opacity-90"
                  >
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-[0_0_0_4px_rgba(200,245,66,0.18)] sm:h-12 sm:w-12 md:h-14 md:w-14"
                      style={{ backgroundColor: ACCENT }}
                    >
                      <Phone className="h-5 w-5 text-[#0A2A22] md:h-6 md:w-6" strokeWidth={2.25} />
                    </span>
                    <span className="hidden leading-tight sm:block">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
                        Call us
                      </span>
                      <span className="block text-base font-bold text-white md:text-lg">
                        +91 99499 01238
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide dots — bottom center on mobile, left vertical center on md+ */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-row items-center gap-2.5 sm:bottom-6 md:bottom-auto md:left-8 md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:flex-col">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === current}
              className={`rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8F542] ${
                idx === current
                  ? 'h-2.5 w-9 md:h-9 md:w-2.5'
                  : 'h-2.5 w-2.5'
              }`}
              style={{
                backgroundColor: idx === current ? ACCENT : 'rgba(255,255,255,0.45)',
              }}
            />
          ))}
        </div>
      </div>

      {pickupModalLoaded ? (
        <PickupFormModal open={pickupModalOpen} onOpenChange={setPickupModalOpen} />
      ) : null}
    </section>
  )
}

export default HeroSlider
