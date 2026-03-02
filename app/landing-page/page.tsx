'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Shield, TrendingUp, Users, Award, Phone, CheckCircle2, Sparkles, CircleDot, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TrustStrip from '@/components/landing-page/TrustStrip'
import ProblemSection from '@/components/landing-page/ProblemSection'
import ServicesSection from '@/components/landing-page/ServicesSection'
import EPRComplianceSection from '@/components/landing-page/EPRComplianceSection'
import ProcessSection from '@/components/landing-page/ProcessSection'
import DataSecuritySection from '@/components/landing-page/DataSecuritySection'
import IndustriesSection from '@/components/landing-page/IndustriesSection'
import StrongCTASection from '@/components/landing-page/StrongCTASection'
import FAQSection from '@/components/landing-page/FAQSection'
import FinalLeadSection from '@/components/landing-page/FinalLeadSection'
import { InstantPickupModal } from '@/components/instant-pickup-modal'
import { useRouter } from 'next/navigation'
import EWastePopup from '@/components/EWastePopup'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isInstantPickupModalOpen, setIsInstantPickupModalOpen] = useState(false)
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0F1115] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1115] via-[#14181F] to-[#0F3D2E]"></div>
      <div className="absolute inset-0 noise-texture"></div>

      <div className="absolute bottom-0 right-0 w-[1000px] h-[1000px] bg-[#1FA463] opacity-[0.06] blur-[180px] rounded-full animate-floatSlow"></div>
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#14C279] opacity-[0.04] blur-[120px] rounded-full animate-floatSlow" style={{ animationDelay: '3s' }}></div>

      <div className="absolute inset-0 opacity-[0.06]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q 25 25, 50 50 T 100 50" stroke="rgba(31,164,99,0.4)" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-pattern)" />
        </svg>
      </div>

      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(31,164,99,0.06), transparent 40%)`
        }}
      />

      <div className="relative z-10">
        {/* <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-morphism-strong shadow-2xl' : ''}`}>
          <div className="max-w-[1400px] mx-auto px-8 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#1FA463] blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                  <Shield className="relative w-9 h-9 text-[#1FA463] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-white tracking-tight">EcoValue</span>
                  <p className="text-xs text-white/60 font-medium tracking-wide">RECYCLING & EPR COMPLIANCE</p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-8">
                <a href="#" className="text-white/80 hover:text-[#1FA463] font-medium transition-colors duration-300">Solutions</a>
                <a href="#" className="text-white/80 hover:text-[#1FA463] font-medium transition-colors duration-300">Industries</a>
                <a href="#" className="text-white/80 hover:text-[#1FA463] font-medium transition-colors duration-300">Compliance</a>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#1FA463] to-[#14C279] hover:from-[#14C279] hover:to-[#1FA463] text-white font-semibold px-6 rounded-lg shadow-lg hover:shadow-[0_8px_30px_rgba(31,164,99,0.4)] transition-all duration-300"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </nav> */}

        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-32 md:pt-30 pb-16 sm:pb-24 md:pb-[100px] lg:pb-[140px]">
          {/* Mobile-only Image Section - appears first on mobile */}
          <div className="lg:hidden mb-8">
            <div className="relative animate-fadeInRight">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#1FA463] to-[#14C279] rounded-2xl blur-2xl opacity-20 animate-pulse"></div>

              <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.5)] border border-[#1FA463]/20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F1115]/60 via-transparent to-[#0F1115]/80 z-10"></div>
                <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-radial from-[#1FA463]/25 via-[#1FA463]/10 to-transparent z-10"></div>

                <img
                  src="https://images.adsttc.com/media/images/5f11/f230/b357/651e/7600/0343/newsletter/recycled-architecture-105.jpg?1595011593"
                  alt="E-Waste Recycling Facility"
                  className="w-full h-[300px] sm:h-[400px] object-cover scale-105 hover:scale-100 transition-transform duration-700"
                  style={{
                    filter: 'brightness(0.85) contrast(1.15) saturate(1.1)',
                  }}
                />

                <div className="absolute top-4 right-4 z-20 glass-morphism-strong rounded-xl px-3 py-2.5 shadow-2xl animate-scaleIn border border-[#1FA463]/30" style={{ animationDelay: '600ms' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1FA463] to-[#14C279] flex items-center justify-center shadow-lg">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-xs">Government Authorized</p>
                      <p className="text-[#1FA463] text-[10px] font-semibold mt-0.5">Official Recycling Partner</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 z-20 glass-morphism-strong rounded-lg px-3 py-2.5 shadow-2xl animate-scaleIn border border-[#2EFF9E]/40 backdrop-blur-xl" style={{ animationDelay: '800ms' }}>
                  <div className="flex items-center gap-2">
                    <CircleDot className="w-4 h-4 text-[#2EFF9E] animate-pulse flex-shrink-0" />
                    <div>
                      <p className="text-[#2EFF9E] font-bold text-xs">Limited Slots Available</p>
                      <p className="text-white/80 text-[10px] mt-0.5">Compliance consultation this week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 lg:space-y-10">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-full glass-morphism border border-[#1FA463]/40 animate-fadeInUp shadow-lg text-xs sm:text-sm">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#2EFF9E] animate-pulse flex-shrink-0" />
                  <span className="text-white/90 font-semibold tracking-wide whitespace-nowrap sm:whitespace-normal">
                    Same-Day Corporate Pickup Available
                  </span>
                  <div className="flex gap-1 flex-shrink-0">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#2EFF9E] animate-pulse"></div>
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#2EFF9E] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#2EFF9E] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tighter animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                    <span className="text-white block">Transforming</span>
                    <span className="text-white block">E-Waste into</span>
                    <span
                      className="inline-block bg-gradient-to-r from-[#1FA463] via-[#14C279] to-[#2EFF9E] bg-clip-text text-transparent animate-shimmer relative"
                    >
                      <span className="relative z-10">Eco-Value</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1FA463] via-[#14C279] to-[#2EFF9E] blur-2xl opacity-30"></div>
                    </span>
                  </h1>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                <div className="relative pl-4 sm:pl-6 border-l-2 border-[#1FA463]/50">
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[#1FA463] animate-pulse"></div>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-semibold leading-relaxed tracking-tight">
                    Certified • Compliant • Secure
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-white/70 font-medium mt-1">
                    Recycling Solutions for Businesses & Corporates
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl glass-morphism hover:border-[#1FA463]/40 transition-all duration-300 hover-lift">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#1FA463] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-xs sm:text-sm">CPCB Certified</p>
                      <p className="text-white/60 text-[10px] sm:text-xs mt-0.5">Government Authorized</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl glass-morphism hover:border-[#1FA463]/40 transition-all duration-300 hover-lift">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#1FA463] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-xs sm:text-sm">EPR Compliance</p>
                      <p className="text-white/60 text-[10px] sm:text-xs mt-0.5">Full Documentation</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                <Button
                  size="lg"
                  onClick={() => setIsInstantPickupModalOpen(true)}
                  className="group relative bg-gradient-to-r from-[#1FA463] via-[#14C279] to-[#1FA463] bg-[length:200%_100%] hover:bg-right text-white font-bold px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg shadow-[0_20px_50px_rgba(31,164,99,0.3)] hover:shadow-[0_25px_60px_rgba(31,164,99,0.5)] hover:-translate-y-1 transition-all duration-500 overflow-hidden w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Schedule Pickup Now
                    <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="group glass-morphism border-2 border-[#1FA463] !text-[#1FA463] hover:bg-[#1FA463]/10 font-bold px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg hover:border-[#14C279] transition-all duration-300 hover:shadow-[0_0_30px_rgba(31,164,99,0.3)] w-full sm:w-auto"
               
               onClick={() => router.push("/contact")}
               >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Talk to Expert
                </Button>
              </div>

              <div className="pt-4 sm:pt-6 space-y-4 sm:space-y-5 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="h-[1px] flex-grow bg-gradient-to-r from-[#1FA463]/50 to-transparent"></div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[1px] sm:tracking-[2px] text-white/50 font-bold whitespace-nowrap">Trusted by Industry Leaders</p>
                  <div className="h-[1px] flex-grow bg-gradient-to-l from-[#1FA463]/50 to-transparent"></div>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                  <TrustBadge
                    icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />}
                    number="10+"
                    label="Years Experience"
                    delay="0ms"
                  />
                  <TrustBadge
                    icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />}
                    number="20+"
                    label="Industries Served"
                    delay="150ms"
                  />
                  <TrustBadge
                    icon={<Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />}
                    number="99%"
                    label="Client Satisfaction"
                    delay="300ms"
                  />
                </div>
              </div>

              <div className="glass-morphism rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-[#1FA463]/20 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#1FA463] to-[#14C279] flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-white font-bold text-xs sm:text-sm mb-1">100% Secure Data Destruction</p>
                    <p className="text-white/70 text-[10px] sm:text-xs leading-relaxed">
                      Certified data destruction • CPCB guidelines followed • Complete EPR documentation provided
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 hidden md:block relative mt-8 lg:mt-0">
              <div className="relative animate-fadeInRight">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-[#1FA463] to-[#14C279] rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl opacity-20 animate-pulse"></div>

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.5)] border border-[#1FA463]/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0F1115]/60 via-transparent to-[#0F1115]/80 z-10"></div>
                  <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-radial from-[#1FA463]/25 via-[#1FA463]/10 to-transparent z-10"></div>

                  <img
                    src="https://images.adsttc.com/media/images/5f11/f230/b357/651e/7600/0343/newsletter/recycled-architecture-105.jpg?1595011593"
                    alt="E-Waste Recycling Facility"
                    className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover scale-105 hover:scale-100 transition-transform duration-700"
                    style={{
                      filter: 'brightness(0.85) contrast(1.15) saturate(1.1)',
                    }}
                  />

                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-20 glass-morphism-strong rounded-xl sm:rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-5 shadow-2xl animate-scaleIn border border-[#1FA463]/30" style={{ animationDelay: '600ms' }}>
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#1FA463] to-[#14C279] flex items-center justify-center shadow-lg">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-xs sm:text-sm md:text-base">Government Authorized</p>
                        <p className="text-[#1FA463] text-[10px] sm:text-xs md:text-sm font-semibold mt-0.5">Official Recycling Partner</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-20 glass-morphism-strong rounded-lg sm:rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4 shadow-2xl animate-scaleIn border border-[#2EFF9E]/40 backdrop-blur-xl" style={{ animationDelay: '800ms' }}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <CircleDot className="w-4 h-4 sm:w-5 sm:h-5 text-[#2EFF9E] animate-pulse flex-shrink-0" />
                      <div>
                        <p className="text-[#2EFF9E] font-bold text-xs sm:text-sm">Limited Slots Available</p>
                        <p className="text-white/80 text-[10px] sm:text-xs mt-0.5">Compliance consultation this week</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-1/2 left-4 sm:left-6 md:left-8 z-20 animate-parallaxFloat hidden sm:block">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl glass-morphism border border-[#1FA463]/40 flex items-center justify-center backdrop-blur-xl">
                      <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#1FA463]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustStrip />

        <ProblemSection />

        <ServicesSection />

        <ProcessSection />

        <DataSecuritySection />

        <IndustriesSection />

        <StrongCTASection />

        <FAQSection />

        <FinalLeadSection />

        <EPRComplianceSection />
        <EWastePopup />
      </div>
{/* 
      <div className="fixed bottom-8 right-8 z-50 animate-scaleIn" style={{ animationDelay: '1000ms' }}>
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#1FA463] to-[#14C279] rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          <button className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#1FA463] to-[#14C279] flex items-center justify-center shadow-[0_10px_40px_rgba(31,164,99,0.5)] hover:shadow-[0_15px_50px_rgba(31,164,99,0.7)] hover:scale-110 transition-all duration-300">
            <Phone className="w-7 h-7 text-white" />
          </button>
        </div>
      </div> */}
      
      <InstantPickupModal 
        open={isInstantPickupModalOpen} 
        onOpenChange={setIsInstantPickupModalOpen} 
      />
    </div>
  )
}

function TrustBadge({ icon, number, label, delay }: { icon: React.ReactNode; number: string; label: string; delay: string }) {
  const [displayValue, setDisplayValue] = useState(number)
  const [isVisible, setIsVisible] = useState(false)
  const badgeRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const initialTimerRef = useRef<NodeJS.Timeout | null>(null)
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (badgeRef.current) {
      observer.observe(badgeRef.current)
    }

    return () => {
      if (badgeRef.current) {
        observer.unobserve(badgeRef.current)
      }
    }
  }, [])

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

    // Extract number and suffix
    const hasPlus = number.includes('+')
    const hasPercent = number.includes('%')
    const numStr = number.replace(/[+%]/g, '')
    const target = parseFloat(numStr)
    
    if (isNaN(target)) {
      setDisplayValue(number)
      return
    }

    // Show initial number for 1 second
    setDisplayValue(number)
    
    initialTimerRef.current = setTimeout(() => {
      // Reset to 0
      setDisplayValue('0' + (hasPlus ? '+' : '') + (hasPercent ? '%' : ''))
      
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
            setDisplayValue(number)
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
              intervalRef.current = null
            }
          } else {
            const newValue = Math.floor(current).toString() + (hasPlus ? '+' : '') + (hasPercent ? '%' : '')
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
      ref={badgeRef}
      className="group relative glass-morphism rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center hover-lift cursor-pointer border border-[#1FA463]/20 hover:border-[#1FA463]/50 transition-all duration-500 overflow-hidden animate-scaleIn"
      style={{ animationDelay: delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1FA463]/0 to-[#1FA463]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="flex justify-center mb-2 sm:mb-3 text-[#1FA463] group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="text-white font-black text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2 group-hover:text-[#1FA463] transition-colors duration-300">{displayValue}</div>
        <div className="text-white/70 text-[10px] sm:text-xs font-bold uppercase tracking-wider">{label}</div>
      </div>
    </div>
  )
}
