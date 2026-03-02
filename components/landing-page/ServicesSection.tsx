'use client'

import { useEffect, useRef, useState } from 'react'
import { Recycle, Server, Leaf, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
const services = [
  {
    icon: Recycle,
    title: 'Electronic Waste Recycling',
    badge: '500+ Clients Served',
    description: 'Industrial-grade recycling infrastructure with secure chain-of-custody protocols',
    features: [
      'Secure Collection & Logistics',
      'Industrial Dismantling Process',
      'Material Recovery & Reuse',
      'Hazardous Component Neutralization'
    ],
    stats: { value: '5M+', label: 'KG Processed' },
    isPremium: false,
    link: '/services/electronic-waste-recycle'
  },
  {
    icon: Server,
    title: 'IT & Telecommunication Equipment',
    badge: '300+ Corporate Clients',
    description: 'Enterprise data security with certified destruction methodologies',
    features: [
      'Secure Data Destruction',
      'Hard Drive Shredding',
      'Server & Network Equipment Disposal',
      'IT Asset Refurbishment'
    ],
    certNote: 'ISO 27001 Certified',
    stats: { value: '50K+', label: 'Devices Secured' },
    isPremium: false,
    link: '/services/it-telecom'
  },
  {
    icon: Leaf,
    title: 'Sustainable Waste Solutions',
    badge: '200+ Industrial Projects',
    description: 'Zero-waste consulting and integrated resource management systems',
    features: [
      'Integrated Waste Segregation',
      'Resource Recovery Systems',
      'Zero Landfill Commitment',
      'Community & Industrial Programs'
    ],
    stats: { value: '95%', label: 'Recovery Rate' },
    isPremium: false,
    link: '/services/Sustainable-Waste-Solutions'
  },
  {
    icon: ShieldCheck,
    title: 'EPR Compliance Solutions',
    badge: '400+ Brands Supported',
    description: 'End-to-end regulatory compliance with full audit trail transparency',
    features: [
      'Regulatory Documentation',
      'Lifecycle Product Tracking',
      'CPCB & SPCB Compliance',
      'End-to-End EPR Fulfillment'
    ],
    stats: { value: '100%', label: 'Compliance Rate' },
    isPremium: true,
    link: '/services/EPR-Compliance-Solutions'
  }
]

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-br from-[#0E1218] via-[#111A1F] to-[#0F141B] py-32 lg:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 noise-texture opacity-[0.025]"></div>

      <div className="absolute inset-0 opacity-[0.015]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="eco-grid-pattern" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
              <path d="M0 70 L35 70 M70 0 L70 35 M105 70 L140 70 M70 105 L70 140"
                    stroke="rgba(31, 164, 99, 0.12)"
                    strokeWidth="0.5"
                    fill="none" />
              <circle cx="70" cy="70" r="18" stroke="rgba(31, 164, 99, 0.08)" strokeWidth="0.5" fill="none" />
              <circle cx="70" cy="70" r="8" stroke="rgba(31, 164, 99, 0.1)" strokeWidth="0.5" fill="none" />
            </pattern>
            <linearGradient id="service-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(31, 164, 99, 0.05)" />
              <stop offset="50%" stopColor="rgba(20, 194, 121, 0.03)" />
              <stop offset="100%" stopColor="rgba(31, 164, 99, 0.05)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#eco-grid-pattern)" />
        </svg>
      </div>

      <div
        className="absolute w-[800px] h-[800px] bg-[#1FA463] opacity-[0.025] blur-[160px] rounded-full pointer-events-none transition-all duration-700 ease-out"
        style={{
          left: `${mousePos.x - 400}px`,
          top: `${mousePos.y - 400}px`
        }}
      ></div>

      <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#14C279] opacity-[0.02] blur-[140px] rounded-full animate-floatSlow"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-24 lg:mb-32">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1FA463]/5 border border-[#1FA463]/20 mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <Sparkles className="w-4 h-4 text-[#1FA463]" />
            <span className="text-[#1FA463] text-sm font-semibold uppercase tracking-wider">Premium Services</span>
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-[900] leading-[1.08] tracking-tighter mb-6 sm:mb-8 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <span className="block bg-gradient-to-r from-[#1FA463] via-[#14C279] to-[#1FA463] bg-clip-text text-transparent animate-gradientFlow">
              Enterprise-Grade
            </span>
            <span className="block text-white mt-2">E-Waste & Compliance Solutions</span>
          </h2>

          <p
            className={`text-lg lg:text-xl text-white/70 leading-relaxed max-w-[820px] mx-auto font-light transition-all duration-1000 delay-150 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            Structured. Certified. Secure. <span className="text-[#1FA463] font-semibold">Designed for Corporate & Industrial Clients.</span>
          </p>

          <div className={`flex items-center justify-center gap-4 md:gap-12 mt-12 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1FA463] mb-1">1000+</div>
              <div className="text-sm text-white/60 uppercase tracking-wider">Clients</div>
            </div>
            <div className="h-12 w-px bg-white/10"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1FA463] mb-1">100%</div>
              <div className="text-sm text-white/60 uppercase tracking-wider">Certified</div>
            </div>
            <div className="h-12 w-px bg-white/10"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1FA463] mb-1">24/7</div>
              <div className="text-sm text-white/60 uppercase tracking-wider">Support</div>
            </div>
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          <ServiceCarousel services={services} isVisible={isVisible} />
        </div>
      </div>
    </section>
  )
}

type ServiceType = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  badge: string
  description: string
  features: string[]
  stats: { value: string; label: string }
  certNote?: string
  isPremium: boolean
}

function ServiceCarousel({
  services,
  isVisible
}: {
  services: ServiceType[]
  isVisible: boolean
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`
          }}
        >
          {services.map((service: ServiceType, index: number) => (
            <div
              key={service.title}
              className="w-full flex-shrink-0 px-2 pt-4"
            >
              <ServiceCard
                service={service}
                index={index}
                isVisible={isVisible}
                isMobile={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-white/10 border border-[#1FA463]/30 flex items-center justify-center text-[#1FA463] hover:bg-[#1FA463]/20 transition-all duration-300"
          aria-label="Previous service"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {services.map((_: ServiceType, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-[#1FA463]'
                  : 'w-2 bg-white/20 hover:bg-white/30'
              }`}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-white/10 border border-[#1FA463]/30 flex items-center justify-center text-[#1FA463] hover:bg-[#1FA463]/20 transition-all duration-300"
          aria-label="Next service"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

function ServiceCard({
  service,
  index,
  isVisible,
  isMobile = false,
  link
}: {
  service: ServiceType
  index: number
  isVisible: boolean
  isMobile?: boolean
 
  link?: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false)
  const [cardMousePos, setCardMousePos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = service.icon
  const router = useRouter()
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowFeatures(true), 600 + index * 150)
      return () => clearTimeout(timer)
    }
  }, [isVisible, index])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setCardMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setCardMousePos({ x: 0, y: 0 })
  }

  return (
    <div
      ref={cardRef}
      className={`group relative min-h-[480px] bg-gradient-to-br from-white/[0.04] to-white/[0.02] backdrop-blur-[16px] border border-[#1FA463]/20 rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 md:p-10 shadow-[0_24px_64px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out ${
        isMobile ? 'cursor-default' : 'cursor-pointer'
      } ${
        isVisible ? 'animate-serviceCardFadeIn' : 'opacity-0'
      }`}
      style={{
        animationDelay: `${index * 150}ms`,
        transform: !isMobile && isHovered
          ? `perspective(1200px) rotateX(${cardMousePos.y * -2}deg) rotateY(${cardMousePos.x * 2}deg) translateY(-8px) scale(1.02)`
          : !isMobile
          ? 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)'
          : 'none',
        boxShadow: !isMobile && isHovered
          ? '0 32px 80px rgba(31, 164, 99, 0.2), 0 0 0 1px rgba(31, 164, 99, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
          : '0 24px 64px rgba(0, 0, 0, 0.5)',
        transformStyle: !isMobile ? 'preserve-3d' : 'flat'
      }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1FA463]/8 via-transparent to-[#14C279]/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[24px]"></div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[24px]"
        style={{
          background: `radial-gradient(600px circle at ${((cardMousePos.x + 1) / 2) * 100}% ${((cardMousePos.y + 1) / 2) * 100}%, rgba(31, 164, 99, 0.15), transparent 40%)`
        }}
      ></div>

      {service.isPremium && (
        <div className="absolute -top-3 -right-2 px-4 py-2 bg-gradient-to-r from-[#1FA463] to-[#14C279] rounded-full shadow-lg z-20">
          <span className="text-white text-xs font-bold uppercase tracking-wider">Premium</span>
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-8">
          <div
            className={`relative w-20 h-20 rounded-[20px] bg-gradient-to-br from-[#1FA463]/15 to-[#14C279]/15 border-2 border-[#1FA463]/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out ${
              service.isPremium ? 'shadow-[0_0_40px_rgba(31,164,99,0.3)]' : ''
            }`}
            style={{
              transform: isHovered
                ? `translateZ(30px) scale(1.1) rotate(6deg)`
                : 'translateZ(0) scale(1) rotate(0deg)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1FA463]/20 to-transparent rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <Icon className="w-10 h-10 text-[#1FA463] group-hover:text-[#14C279] transition-all duration-500 relative z-10" />
          </div>

          <h3 className="text-white text-2xl font-bold leading-tight mb-3 tracking-tight group-hover:text-[#14C279] transition-colors duration-500">
            {service.title}
          </h3>

          <p className="text-white/60 text-sm leading-relaxed mb-4 font-light">
            {service.description}
          </p>

          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#1FA463]/10 border border-[#1FA463]/30 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-[#1FA463] animate-pulse shadow-[0_0_8px_rgba(31,164,99,0.8)]"></div>
              <span className="text-[#1FA463] text-xs font-bold uppercase tracking-wider">
                {service.badge}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1FA463] mb-0.5">{service.stats.value}</div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider">{service.stats.label}</div>
            </div>
            {service.certNote && (
              <>
                <div className="h-8 w-px bg-white/10"></div>
                <div className="flex items-center gap-2 text-[#1FA463] text-xs font-semibold">
                  <Shield className="w-3.5 h-3.5" />
                  <span>{service.certNote}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile: Dropdown Features */}
        {isMobile ? (
          <div className="flex-grow mb-8">
            <button
              onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-[#1FA463]/20 hover:border-[#1FA463]/40 transition-all duration-300 mb-3"
            >
              <span className="text-white font-semibold text-sm">
                Features ({service.features.length})
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#1FA463] transition-transform duration-300 ${
                  isFeaturesOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isFeaturesOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="space-y-3">
                {service.features.map((feature, idx) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-[#1FA463]/10"
                  >
                    <div className="relative mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-[#1FA463] flex-shrink-0" />
                    </div>
                    <p className="text-white/80 text-sm font-medium leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Desktop: Always Visible Features */
          <div className="flex-grow space-y-3 mb-8">
            {service.features.map((feature, idx) => (
              <div
                key={feature}
                className={`flex items-start gap-3 transition-all duration-600 ease-out ${
                  showFeatures ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                }`}
                style={{
                  transitionDelay: `${600 + index * 150 + idx * 100}ms`,
                  transform: isHovered ? `translateZ(${10 + idx * 5}px)` : 'translateZ(0)'
                }}
              >
                <div className="relative mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-[#1FA463] flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                  <div className="absolute inset-0 bg-[#1FA463] blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                </div>
                <p className="text-white/80 text-[15px] font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        )}

        <button
          className={`group/btn relative w-full py-5 rounded-2xl border-2 transition-all duration-700 overflow-hidden ${
            service.isPremium
              ? 'border-[#1FA463] bg-gradient-to-r from-[#1FA463] to-[#14C279] hover:shadow-[0_0_40px_rgba(31,164,99,0.5)] hover:scale-[1.02]'
              : 'border-[#1FA463]/50 bg-[#1FA463]/5 hover:border-[#1FA463] hover:bg-[#1FA463]/10 hover:scale-[1.02]'
          }`}
          style={{
            transform: isHovered
              ? `translateZ(40px)`
              : 'translateZ(0)'
          }}
        >
          {service.isPremium && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1200 ease-out"></div>
          )}

          <div className="relative z-10 flex items-center justify-center gap-3"
          onClick={() => router.push(service.link)}>
            <span
              className={`font-bold text-sm uppercase tracking-[2px] ${
                service.isPremium ? 'text-white' : 'text-[#1FA463] group-hover/btn:text-[#14C279]'
              }`}
            >
              Learn More
            </span>
            <ArrowRight
              className={`w-5 h-5 group-hover/btn:translate-x-2 transition-all duration-500 ${
                service.isPremium ? 'text-white' : 'text-[#1FA463] group-hover/btn:text-[#14C279]'
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  )
}

function Shield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 6V12C4 16.5 7 20.5 12 22C17 20.5 20 16.5 20 12V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
