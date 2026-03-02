'use client'

import { useEffect, useRef, useState } from 'react'
import { Scale, FileCheck, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react'
import { InstantPickupModal } from '../instant-pickup-modal'
const complianceValues = [
  {
    icon: Scale,
    title: 'Avoid Penalties',
    description: 'Avoid regulatory fines and suspension risks.',
    microText: 'Stay aligned with national EPR mandates.'
  },
  {
    icon: FileCheck,
    title: 'Full Documentation',
    description: 'Complete lifecycle tracking & reporting.',
    microText: 'Submission-ready documentation provided.'
  },
  {
    icon: ShieldCheck,
    title: 'CPCB Guidelines Followed',
    description: 'Aligned with CPCB & SPCB regulations.',
    microText: 'Verified and auditable compliance process.'
  }
]

export default function EPRComplianceSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showValues, setShowValues] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isInstantPickupModalOpen, setIsInstantPickupModalOpen] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setShowValues(true), 400)
        }
      },
      { threshold: 0.15 }
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
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-br from-[#0C1015] via-[#0E1218] to-[#0C1015] py-16 sm:py-20 md:py-32 lg:py-30 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(31,164,99,0.03),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,194,121,0.02),transparent_50%)]"></div>

      <div className="absolute inset-0 noise-texture opacity-[0.02]"></div>

      <div className="absolute inset-0 opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="compliance-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(31,164,99,0.08)" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1" fill="rgba(31,164,99,0.15)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#compliance-grid)" />
        </svg>
      </div>

      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1FA463] opacity-[0.02] blur-[120px] rounded-full animate-floatSlow"
        style={{
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`
        }}
      ></div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-[#1FA463]/20 rounded-full animate-float"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-[#14C279]/20 rounded-full animate-floatSlow"></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-[#1FA463]/20 rounded-full animate-float"></div>
      </div>

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 md:gap-16 items-center">
          <div className="lg:col-span-7">
            <div
              className={`transition-all duration-[900ms] ease-out ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-[0.97]'
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-[800] leading-[1.1] tracking-[-0.5px] mb-5 sm:mb-6 md:mb-7">
                <span className="text-white">EPR </span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#1FA463] via-[#14C279] to-[#1FA463] bg-clip-text text-transparent">
                    Compliance
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gradient-to-r from-[#1FA463] to-[#14C279] animate-underlineSweep"></div>
                </span>
                <span className="text-white"> Made Simple.</span>
              </h2>

              <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-[720px] mb-6 sm:mb-8 font-light">
                End-to-end Extended Producer Responsibility solutions ensuring regulatory alignment,
                documentation accuracy, and zero compliance risk.
              </p>

              <div className="h-px w-16 sm:w-20 md:w-24 bg-gradient-to-r from-[#1FA463]/50 to-transparent mb-8 sm:mb-10 md:mb-12"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
              {complianceValues.map((value, index) => (
                <ComplianceValueCard
                  key={value.title}
                  value={value}
                  index={index}
                  isVisible={showValues}
                />
              ))}
            </div>

            <div
              className={`transition-all duration-[800ms] delay-[600ms] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <button className="group relative px-6 sm:px-8 md:px-10 py-4 sm:py-4.5 md:py-5 bg-gradient-to-r from-[#1FA463] to-[#19C276] rounded-xl sm:rounded-[14px] shadow-[0_12px_40px_rgba(31,164,99,0.35)] hover:shadow-[0_16px_50px_rgba(31,164,99,0.45)] transition-all duration-500 hover:-translate-y-1 active:scale-[0.97] overflow-hidden text-sm sm:text-base">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

                <div className="relative z-10 flex items-center justify-center gap-3"
                  onClick={() => setIsInstantPickupModalOpen(true)}>
                  <span className="text-white font-semibold text-base uppercase tracking-wide">
                    Get Compliance Assessment
                  </span>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>

              <p className="text-white/70 text-xs uppercase tracking-[1px] mt-5 font-light">
                Confidential Consultation • No Obligation • Enterprise Secure
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block">
            <div
              className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-xl md:rounded-2xl lg:rounded-[24px] overflow-hidden"
              style={{
                transform: `translateY(${mousePos.y * -20}px)`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1FA463]/10 to-[#14C279]/10 backdrop-blur-[20px] border border-[#1FA463]/20 rounded-[24px]"></div>

              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=800')] bg-cover bg-center opacity-[0.40] blur-[2px]"></div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1015] via-transparent to-[#0C1015]/50"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-8 px-8">
                  <div className="space-y-2">
                    <div className="text-[#1FA463]/30 text-xs uppercase tracking-[3px] font-semibold">
                      Regulatory Documentation
                    </div>
                    <div className="h-px w-16 bg-[#1FA463]/20 mx-auto"></div>
                  </div>

                  <div className="space-y-6">
                    {['CPCB Authorization', 'EPR Certificate', 'Annual Returns', 'Audit Reports'].map((doc, idx) => (
                      <div
                        key={doc}
                        className={`flex items-center gap-3 text-white/40 text-sm transition-all duration-700 ${
                          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                        }`}
                        style={{ transitionDelay: `${800 + idx * 100}ms` }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#1FA463]/50 flex-shrink-0" />
                        <span className="font-light tracking-wide">{doc}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <div className="inline-block px-6 py-3 bg-[#1FA463]/5 border border-[#1FA463]/20 rounded-full backdrop-blur-xl">
                      <span className="text-[#1FA463] text-xs font-semibold uppercase tracking-wider">
                        100% Compliance Rate
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#1FA463]/20 rounded-full blur-sm animate-pulse"></div>
                <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-[#14C279]/20 rounded-full blur-sm animate-pulse delay-300"></div>
                <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-[#1FA463]/20 rounded-full blur-sm animate-pulse delay-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InstantPickupModal 
        open={isInstantPickupModalOpen} 
        onOpenChange={setIsInstantPickupModalOpen} 
      />
    </section>
  )
}

function ComplianceValueCard({
  value,
  index,
  isVisible
}: {
  value: typeof complianceValues[0]
  index: number
  isVisible: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = value.icon

  return (
    <div
      className={`group relative min-h-[100px] sm:min-h-[120px] bg-white/[0.03] backdrop-blur-[12px] border border-[#1FA463]/15 rounded-xl sm:rounded-[18px] p-5 sm:p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-700 cursor-default ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 24px 70px rgba(31, 164, 99, 0.25), 0 0 0 1px rgba(31, 164, 99, 0.3)'
          : '0 20px 60px rgba(0, 0, 0, 0.4)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1FA463]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[18px]"></div>

      <div className="relative z-10">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#1FA463]/10 border border-[#1FA463]/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#1FA463]" />
        </div>

        <h3 className="text-white text-sm sm:text-base font-bold mb-1.5 sm:mb-2 tracking-tight">
          {value.title}
        </h3>

        <p className="text-white/75 text-xs sm:text-sm leading-relaxed mb-1.5 sm:mb-2 font-light">
          {value.description}
        </p>

        <p className="text-[#1FA463]/70 text-[10px] sm:text-xs leading-relaxed font-light">
          {value.microText}
        </p>
      </div>
    </div>
  )
}
