'use client'

import { useEffect, useRef, useState } from 'react'
import { Scale, ShieldAlert, AlertTriangle, TrendingDown } from 'lucide-react'

export default function ProblemSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, 1 - (rect.top / window.innerHeight)))
        setScrollProgress(progress)
      }
    }

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0E1116] py-[120px] overflow-hidden"
    >
      <div className="absolute inset-0 noise-texture opacity-[0.02]"></div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(179,38,38,0.08)_0%,rgba(14,17,22,0)_70%)]"></div>

      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0 50 L20 50 L25 45 L30 45 L30 35 M30 35 L40 35 L45 30 M70 50 L80 50 M80 30 L90 30"
                      stroke="rgba(255, 76, 76, 0.15)"
                      strokeWidth="0.5"
                      fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
        </div>
      </div>

      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-[#B32626] opacity-[0.04] blur-[120px] rounded-full animate-floatSlow"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FF4C4C] rounded-full opacity-[0.04] animate-floatParticle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 sm:gap-12 md:gap-16 items-center">
          <div className="w-full lg:col-span-6">
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              <div className="space-y-4 sm:space-y-6">
                <h2
                  className={`text-3xl md:text-4xl lg:text-5xl font-[800] leading-[1.1] tracking-[-0.5px] transition-all duration-[800ms] ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                >
                  <span className="text-white">Improper E-Waste Disposal Can </span>
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-[#FF4C4C] to-[#B32626] bg-clip-text text-transparent">
                      Cost You More
                    </span>
                    <div className="absolute bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF4C4C] to-[#B32626] opacity-0 animate-underlineSweep"></div>
                  </span>
                  <span className="text-white"> Than You Think.</span>
                </h2>

                <p
                  className={`text-base sm:text-lg md:text-[18px] text-white/80 leading-relaxed max-w-[720px] transition-all duration-[800ms] delay-200 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                >
                  Non-compliant E-Waste handling exposes your organization to regulatory penalties, data breaches, and irreversible brand damage.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <RiskCard
                  icon={<Scale className="w-6 h-6" />}
                  title="Legal Penalties"
                  description="Heavy fines, license suspensions, and regulatory scrutiny under environmental compliance laws."
                  microcopy="CPCB & State Pollution Control Board regulations apply."
                  delay={100}
                  isVisible={isVisible}
                />
                <RiskCard
                  icon={<ShieldAlert className="w-6 h-6" />}
                  title="Data Breach Risk"
                  description="Unsecured disposal of storage devices can lead to confidential data exposure and corporate espionage."
                  microcopy="Certified destruction is mandatory for enterprise IT assets."
                  delay={200}
                  isVisible={isVisible}
                />
                <RiskCard
                  icon={<AlertTriangle className="w-6 h-6" />}
                  title="Environmental Liability"
                  description="Improper recycling contributes to toxic soil and groundwater contamination."
                  microcopy="Direct accountability under environmental protection acts."
                  delay={300}
                  isVisible={isVisible}
                />
                <RiskCard
                  icon={<TrendingDown className="w-6 h-6" />}
                  title="Brand Reputation Risk"
                  description="Public compliance violations can severely impact investor trust and ESG ratings."
                  microcopy="Reputation recovery is costlier than compliance."
                  delay={400}
                  isVisible={isVisible}
                />
              </div>

              {/* Mobile-only Image Section - appears between risk cards and CTA */}
              <div className="lg:hidden mt-6 sm:mt-8">
                <ImageBlock scrollProgress={scrollProgress} isVisible={isVisible} />
              </div>

              <div
                className={`pt-6 sm:pt-8 transition-all duration-[800ms] delay-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
              >
                <CTABlock />
              </div>
            </div>
          </div>

          {/* Desktop-only Image Section */}
          <div className="hidden lg:block w-full lg:col-span-6">
            <ImageBlock scrollProgress={scrollProgress} isVisible={isVisible} />
          </div>
        </div>
      </div>
    </section>
  )
}

function RiskCard({
  icon,
  title,
  description,
  microcopy,
  delay,
  isVisible
}: {
  icon: React.ReactNode
  title: string
  description: string
  microcopy: string
  delay: number
  isVisible: boolean
}) {
  const [hasHovered, setHasHovered] = useState(false)

  return (
    <div
      className={`group relative bg-white/[0.02] border border-[#FF4C4C]/20 rounded-[14px] p-5 sm:p-6 md:p-7 hover:border-[#FF4C4C]/40 transition-all duration-500 cursor-default overflow-hidden ${
        isVisible ? 'animate-slideInLeft' : 'opacity-0'
      }`}
      style={{
        animationDelay: `${delay}ms`,
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
      }}
      onMouseEnter={() => setHasHovered(true)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF4C4C] to-[#B32626] opacity-0 group-hover:opacity-100 transition-all duration-500 scale-y-0 group-hover:scale-y-100 origin-top hidden md:block"></div>

      <div className="absolute inset-0 bg-gradient-to-br from-[#FF4C4C]/0 to-[#FF4C4C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 shadow-[0_0_30px_rgba(255,76,76,0.15)]"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-5">
        <div className="flex-shrink-0">
          <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#FF4C4C]/10 border border-[#FF4C4C]/20 group-hover:border-[#FF4C4C]/40 transition-all duration-300">
            <div className="text-[#FF4C4C] group-hover:text-[#FF6B6B] transition-colors duration-300">
              {icon}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-2 text-center md:text-left">
          <h3 className="text-white text-[16px] font-bold tracking-wide">
            {title}
          </h3>
          <p className="text-white/70 text-[14px] leading-relaxed">
            {description}
          </p>
          <p className="text-white/40 text-[11px] uppercase tracking-[1px] font-semibold pt-1">
            {microcopy}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF4C4C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  )
}

function ImageBlock({ scrollProgress, isVisible }: { scrollProgress: number; isVisible: boolean }) {
  return (
    <div
      className={`relative rounded-[20px] overflow-hidden border border-white/5 transition-all duration-[1000ms] ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      }`}
      style={{
        transform: `translateY(${scrollProgress * 15}px)`,
        boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
      }}
    >
      <div className="relative aspect-[4/5]">
        <img
          src="https://images.pexels.com/photos/9324331/pexels-photo-9324331.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Industrial E-Waste Site"
          className="w-full h-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#B32626]/30 via-transparent to-transparent"></div>

        <div
          className="absolute inset-0"
          style={{
            filter: 'saturate(0.6) brightness(0.7)'
          }}
        ></div>

        <div className="absolute bottom-8 left-8 right-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF4C4C] animate-pulse"></div>
            <span className="text-white/70 text-[11px] uppercase tracking-[1.5px] font-semibold">
              Unregulated Disposal Sites
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>
    </div>
  )
}

function CTABlock() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-white text-[32px] font-bold leading-tight">
          Don't Risk Non-Compliance.
        </h3>
        <p className="text-white/70 text-[16px] leading-relaxed max-w-[540px]">
          Protect your organization with certified and compliant E-Waste management.
        </p>
      </div>

      <div className="flex flex-col items-start gap-3">
        <button
          className="group relative px-8 py-4 rounded-xl bg-[#0E1116] border-2 border-[#FF4C4C] hover:bg-[#FF4C4C] transition-all duration-500 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF4C4C]/0 via-[#FF4C4C]/10 to-[#FF4C4C]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className={`absolute inset-0 shadow-[0_0_40px_rgba(255,76,76,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

          <span className="relative z-10 text-white text-[15px] font-bold uppercase tracking-[1.5px]">
            Schedule Compliance Consultation
          </span>
        </button>

        <p className="text-white/40 text-[12px] font-medium">
          Confidential & obligation-free assessment.
        </p>
      </div>
    </div>
  )
}
