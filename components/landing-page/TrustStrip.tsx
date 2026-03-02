'use client'

import { useEffect, useRef, useState } from 'react'
import { Shield, CheckCircle2, Award, Star, Verified, FileCheck } from 'lucide-react'

export default function TrustStrip() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const handleScroll = () => {
      if (stripRef.current) {
        const rect = stripRef.current.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, 1 - (rect.top / window.innerHeight)))
        setScrollProgress(progress)
      }
    }

    if (stripRef.current) {
      observer.observe(stripRef.current)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      ref={stripRef}
      className="relative w-full bg-gradient-to-b from-[#0F1115] via-[#111418] to-[#0F1115] py-12 md:py-16 border-t border-b border-[#1FA463]/20 overflow-hidden"
      style={{
        transform: `translateY(${scrollProgress * -5}px)`
      }}
    >
      <div className="absolute inset-0 noise-texture"></div>

      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1FA463]/8 to-transparent"
          style={{
            transform: `translateX(${scrollProgress * 100}px)`
          }}
        ></div>
      </div>

      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#1FA463] opacity-[0.04] blur-[120px] rounded-full animate-floatSlow"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#14C279] opacity-[0.03] blur-[100px] rounded-full animate-floatSlow" style={{ animationDelay: '2s' }}></div>

      <div className="absolute inset-0 opacity-[0.04]">
        <div className="w-full h-full animate-drift">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="eco-lines" x="0" y="0" width="120" height="60" patternUnits="userSpaceOnUse">
                <path d="M0 30 Q 30 20, 60 30 T 120 30" stroke="rgba(31,164,99,0.3)" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#eco-lines)" />
          </svg>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1FA463]/20 to-transparent"></div>

      <div className="relative max-w-[1400px] mx-auto px-8">
        <div className="text-center mb-12 opacity-0 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism border border-[#1FA463]/30 mb-3">
            <Verified className="w-4 h-4 text-[#2EFF9E]" />
            <span className="text-xs text-white/80 uppercase tracking-[2px] font-bold">Verified & Audited</span>
          </div>
          <h2 className="text-white/50 text-sm uppercase tracking-[3px] font-bold">Industry Certifications & Trust Metrics</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <CertificationBadge
                icon={<Shield className="w-7 h-7" />}
                title="ISO Certified"
                subtitle="9001:2015"
                delay="200ms"
                isVisible={isVisible}
              />
              <CertificationBadge
                icon={<CheckCircle2 className="w-7 h-7" />}
                title="CPCB Approved"
                subtitle="Pollution Board"
                delay="320ms"
                isVisible={isVisible}
              />
              <CertificationBadge
                icon={<Award className="w-7 h-7" />}
                title="EPR Authorized"
                subtitle="Recycler License"
                delay="440ms"
                isVisible={isVisible}
              />
              <CertificationBadge
                icon={<FileCheck className="w-7 h-7" />}
                title="Data Certified"
                subtitle="Secure Destruction"
                delay="560ms"
                isVisible={isVisible}
              />
            </div>
          </div>

          <div className="lg:col-span-1 hidden lg:flex justify-center">
            <DividerLine isVisible={isVisible} />
          </div>

          <div className="lg:col-span-4">
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-6">
                <MetricCard
                  number="500"
                  suffix="+"
                  label="Corporate Clients"
                  icon={<Shield className="w-5 h-5" />}
                  delay="680ms"
                  isVisible={isVisible}
                />
                <MetricCard
                  number="4.9"
                  suffix=""
                  label="Client Rating"
                  showStars
                  icon={<Star className="w-5 h-5" />}
                  delay="800ms"
                  isVisible={isVisible}
                />
                <MetricCard
                  number="1000"
                  suffix="+"
                  label="Completed Pickups"
                  icon={<CheckCircle2 className="w-5 h-5" />}
                  delay="920ms"
                  isVisible={isVisible}
                />
              </div>
              <div className="text-center pt-2 opacity-0 animate-fadeInUp" style={{ animationDelay: '1000ms' }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-morphism border border-[#1FA463]/20 hover:border-[#1FA463]/40 transition-all duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2EFF9E] animate-pulse"></div>
                  <p className="text-[11px] text-white/70 uppercase tracking-[1.5px] font-bold">
                    Trusted by Enterprises Across 20+ Industries
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1FA463]/30 to-transparent"></div>
    </div>
  )
}

function CertificationBadge({
  icon,
  title,
  subtitle,
  delay,
  isVisible
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  delay: string
  isVisible: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`group relative glass-morphism rounded-[18px] p-5 border border-[#2EFF9E]/15 hover:border-[#2EFF9E]/50 transition-all duration-500 cursor-pointer overflow-hidden ${
        isVisible ? 'animate-trust-badge' : 'opacity-0'
      }`}
      style={{
        animationDelay: delay,
        boxShadow: '0 15px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1FA463]/0 via-[#1FA463]/5 to-[#1FA463]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="absolute -inset-[1px] rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1FA463]/0 via-[#2EFF9E]/30 to-[#1FA463]/0 blur-sm"></div>
      </div>

      <div className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#2EFF9E]/15 to-transparent animate-sweep"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-3">
        <div className="relative">
          <div className="absolute inset-0 bg-[#1FA463] blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="relative text-[#1FA463] group-hover:text-[#2EFF9E] transition-colors duration-300 group-hover:scale-110 transform transition-transform">
            {icon}
          </div>
        </div>
        <div>
          <p className="text-white/90 text-[12px] uppercase tracking-[1.5px] font-bold leading-tight mb-1">
            {title}
          </p>
          <p className="text-white/50 text-[9px] uppercase tracking-[1px] font-semibold">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#1FA463] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  )
}

function DividerLine({ isVisible }: { isVisible: boolean }) {
  return (
    <div className={`relative h-24 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`} style={{ transitionDelay: '600ms' }}>
      <div className="relative w-[2px] h-full mx-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1FA463]/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2EFF9E]/40 to-transparent animate-shimmer-vertical"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#1FA463] animate-pulse"></div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#2EFF9E]/40"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#2EFF9E]/40"></div>
      </div>
    </div>
  )
}

function MetricCard({
  number,
  suffix,
  label,
  icon,
  showStars,
  delay,
  isVisible
}: {
  number: string
  suffix: string
  label: string
  icon: React.ReactNode
  showStars?: boolean
  delay: string
  isVisible: boolean
}) {
  const [displayValue, setDisplayValue] = useState(number)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const initialTimerRef = useRef<NodeJS.Timeout | null>(null)
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isVisible) {
      setDisplayValue(number)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (initialTimerRef.current) {
        clearTimeout(initialTimerRef.current)
        initialTimerRef.current = null
      }
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current)
        animationTimerRef.current = null
      }
      return
    }

    const target = parseFloat(number)
    if (isNaN(target)) {
      setDisplayValue(number)
      return
    }

    // Show initial number for 1 second
    setDisplayValue(number)
    
    initialTimerRef.current = setTimeout(() => {
      // Reset to 0
      setDisplayValue('0')
      
      // Wait for delay, then start animation
      const delayMs = parseInt(delay.replace('ms', '')) || 0
      
      animationTimerRef.current = setTimeout(() => {
        const duration = 2000
        const steps = 60
        const increment = target / steps
        let current = 0
        
        intervalRef.current = setInterval(() => {
          current += increment
          
          if (current >= target) {
            setDisplayValue(number.includes('.') ? target.toFixed(1) : target.toString())
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
            }
          } else {
            const newValue = number.includes('.') 
              ? (Math.round(current * 10) / 10).toFixed(1)
              : Math.floor(current).toString()
            setDisplayValue(newValue)
          }
        }, duration / steps)
      }, delayMs)
    }, 1000)

    return () => {
      if (initialTimerRef.current) {
        clearTimeout(initialTimerRef.current)
        initialTimerRef.current = null
      }
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current)
        animationTimerRef.current = null
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isVisible, number, delay])

  return (
    <div
      className={`group relative text-center hover-lift cursor-default ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
      style={{ animationDelay: delay }}
    >
      <div className="glass-morphism rounded-xl sm:rounded-2xl p-2.5 sm:p-3 md:p-4 lg:p-2 border border-[#1FA463]/20 group-hover:border-[#1FA463]/40 transition-all duration-500 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] flex flex-col items-center justify-center w-full overflow-hidden">
        <div className="flex justify-center mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 text-[#1FA463]/50 group-hover:text-[#1FA463] transition-colors duration-300 flex-shrink-0">
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6">
            {icon}
          </div>
        </div>

        <div className="relative w-full mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1FA463] to-[#14C279] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="relative w-full text-center overflow-hidden px-0.5">
            <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-black bg-gradient-to-r from-[#1FA463] to-[#14C279] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 leading-none whitespace-nowrap">
              {displayValue}{suffix}
            </div>
          </div>
        </div>

        {showStars && (
          <div className="flex justify-center gap-0.5 sm:gap-1 mb-2 sm:mb-3 animate-scaleIn flex-shrink-0" style={{ animationDelay: `${parseInt(delay) + 400}ms` }}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 fill-[#FFB800] text-[#FFB800] transition-all duration-300"
                style={{
                  opacity: i === 4 ? 0.9 : 1,
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </div>
        )}

        <p className="text-white/70 text-[7px] sm:text-[8px] md:text-[10px] lg:text-[11px] uppercase tracking-[1px] sm:tracking-[1.5px] font-bold leading-tight text-center px-1 break-words">
          {label}
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1FA463]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  )
}
