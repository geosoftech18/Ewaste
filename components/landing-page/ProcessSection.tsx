'use client'

import { useEffect, useRef, useState } from 'react'
import { Truck, Settings, Leaf, ArrowRight, ChevronRight } from 'lucide-react'
import { InstantPickupModal } from '../instant-pickup-modal'

const processSteps = [
  {
    icon: Truck,
    title: 'Collect',
    description: 'Secure on-site collection from corporate and industrial facilities.',
    microText: 'GPS-tracked & documented pickup.'
  },
  {
    icon: Settings,
    title: 'Recycle',
    description: 'Certified dismantling, segregation, and material recovery.',
    microText: 'ISO-aligned processing facility.'
  },
  {
    icon: Leaf,
    title: 'Reuse',
    description: 'Valuable components recovered and reintegrated into sustainable supply chains.',
    microText: 'Zero landfill commitment.'
  }
]

export default function ProcessSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isInstantPickupModalOpen, setIsInstantPickupModalOpen] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[#0C1117] via-[#0E1319] to-[#0C1117] py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,164,99,0.04),transparent_60%)]"></div>

      <div className="absolute inset-0 noise-texture opacity-[0.02]"></div>

      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circular-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="40" fill="none" stroke="rgba(31,164,99,0.1)" strokeWidth="0.5" />
              <circle cx="60" cy="60" r="25" fill="none" stroke="rgba(31,164,99,0.08)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circular-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12">
        <div
          className={`text-center mb-24 transition-all duration-[800ms] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-[800] leading-[1.1] text-white mb-4 sm:mb-6">
            Simple. Structured. Certified.
          </h2>

          <p className="text-white/80 text-lg max-w-[680px] mx-auto mb-8">
            Our 3-Step Certified E-Waste Processing Workflow
          </p>

          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#1FA463] to-transparent mx-auto"></div>
        </div>

        <div className="relative">
          <div className="hidden lg:grid lg:grid-cols-3 gap-16 items-start mb-16">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.title}
                step={step}
                index={index}
                isVisible={isVisible}
                isHovered={hoveredStep === index}
                onHover={() => setHoveredStep(index)}
                onLeave={() => setHoveredStep(null)}
              />
            ))}
          </div>

          <div className="lg:hidden space-y-12">
            {processSteps.map((step, index) => (
              <ProcessStepMobile
                key={step.title}
                step={step}
                index={index}
                isVisible={isVisible}
                isInstantPickupModalOpen={isInstantPickupModalOpen}
                setIsInstantPickupModalOpen={setIsInstantPickupModalOpen}
              />
            ))}
          </div>

          <div className="hidden lg:block absolute top-[80px] left-0 right-0 h-[2px] pointer-events-none">
            <div className="relative max-w-[900px] mx-auto">
              <div className="absolute left-[20%] right-[20%] h-full">
                <div
                  className={`h-full bg-gradient-to-r from-transparent via-[#1FA463]/40 to-transparent transition-opacity duration-1000 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    transitionDelay: '600ms'
                  }}
                ></div>

                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute left-0 w-8 h-full">
                    <ChevronRight
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[#1FA463]/60 animate-arrowFlow"
                      style={{ animationDelay: '0s' }}
                    />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-full">
                    <ChevronRight
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[#1FA463]/60 animate-arrowFlow"
                      style={{ animationDelay: '2s' }}
                    />
                  </div>
                  <div className="absolute right-0 w-8 h-full">
                    <ChevronRight
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[#1FA463]/60 animate-arrowFlow"
                      style={{ animationDelay: '4s' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`text-center mt-20 transition-all duration-[800ms] delay-[1000ms] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-white/75 text-base leading-relaxed max-w-[720px] mx-auto mb-10">
            From secure pickup to certified processing and sustainable reintegration, our workflow ensures
            full compliance and environmental responsibility.
          </p>

          <button className="group relative px-10 py-5 bg-gradient-to-r from-[#1FA463] to-[#19C276] rounded-[14px] shadow-[0_10px_35px_rgba(31,164,99,0.3)] hover:shadow-[0_14px_45px_rgba(31,164,99,0.4)] transition-all duration-500 hover:-translate-y-1 active:scale-[0.97] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

            <div className="relative z-10 flex items-center justify-center gap-3"
              onClick={() => setIsInstantPickupModalOpen(true)}>
              <span className="text-white font-semibold text-base">Schedule Secure Pickup</span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </button>

          <p className="text-white/60 text-xs uppercase tracking-[1px] mt-5 font-light">
            Same-Day Corporate Collection Available
          </p>
        </div>
      </div>
    </section>
  )
}

function ProcessStep({
  step,
  index,
  isVisible,
  isHovered,
  onHover,
  onLeave
}: {
  step: typeof processSteps[0]
  index: number
  isVisible: boolean
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const Icon = step.icon

  return (
    <div
      className={`relative flex flex-col items-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: `${index * 200}ms`
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div
        className="relative w-[160px] h-[160px] rounded-full bg-white/[0.04] backdrop-blur-[14px] border border-[#1FA463]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center mb-8 cursor-pointer transition-all duration-300"
        style={{
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isHovered
            ? '0 28px 70px rgba(31, 164, 99, 0.3), 0 0 0 1px rgba(31, 164, 99, 0.4)'
            : '0 20px 50px rgba(0, 0, 0, 0.5)',
          backgroundColor: isHovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1FA463]/0 to-[#1FA463]/5 rounded-full opacity-0 transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0 }}
        ></div>

        <div
          className="absolute inset-0 rounded-full bg-[#1FA463]/10 blur-xl opacity-0 transition-opacity duration-500"
          style={{ opacity: isHovered ? 0.5 : 0 }}
        ></div>

        <div className="absolute inset-0 rounded-full animate-subtlePulse"></div>

        <Icon
          className="relative z-10 w-16 h-16 text-[#1FA463] transition-all duration-300"
          style={{
            transform: isHovered ? 'rotate(3deg) scale(1.1)' : 'rotate(0deg) scale(1)',
            strokeWidth: 1.5
          }}
        />
      </div>

      <div className="text-center max-w-[280px]">
        <h3 className="text-white text-2xl font-bold mb-3 tracking-tight">{step.title}</h3>

        <p className="text-white/75 text-sm leading-relaxed mb-3">
          {step.description}
        </p>

        <p className="text-[#1FA463]/70 text-xs font-light italic">
          {step.microText}
        </p>
      </div>
    </div>
  )
}

function ProcessStepMobile({
  step,
  index,
  isVisible,
  isInstantPickupModalOpen,
  setIsInstantPickupModalOpen
}: {
  step: typeof processSteps[0]
  index: number
  isVisible: boolean
  isInstantPickupModalOpen: boolean
  setIsInstantPickupModalOpen: (open: boolean) => void
}) {
  const Icon = step.icon

  return (
    <div
      className={`relative flex flex-col items-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: `${index * 200}ms`
      }}
    >
      <div className="relative w-[120px] h-[120px] rounded-full bg-white/[0.04] backdrop-blur-[14px] border border-[#1FA463]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center mb-6">
        <div className="absolute inset-0 rounded-full animate-subtlePulse"></div>

        <Icon className="relative z-10 w-12 h-12 text-[#1FA463]" strokeWidth={1.5} />
      </div>

      <div className="text-center max-w-[320px]">
        <h3 className="text-white text-xl font-bold mb-3 tracking-tight">{step.title}</h3>

        <p className="text-white/75 text-sm leading-relaxed mb-3">
          {step.description}
        </p>

        <p className="text-[#1FA463]/70 text-xs font-light italic">
          {step.microText}
        </p>
      </div>

      {index < processSteps.length - 1 && (
        <div className="my-8 flex flex-col items-center">
          <div className="h-12 w-[2px] bg-gradient-to-b from-transparent via-[#1FA463]/40 to-transparent"></div>
          <ChevronRight className="w-4 h-4 text-[#1FA463]/60 rotate-90 mt-2" />
        </div>
      )}

<InstantPickupModal 
        open={isInstantPickupModalOpen} 
        onOpenChange={setIsInstantPickupModalOpen} 
      />
    </div>
  )
}
