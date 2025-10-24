"use client"

import { motion, useInView, useAnimationControls } from "framer-motion"
import { Factory, Award, Radio, Lock, Globe } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const timelineData = [
  {
    year: "2015",
    milestone: "Company founded with a vision to manage e-waste responsibly.",
    icon: Factory,
  },
  {
    year: "2017",
    milestone: "Achieved first Government Recycling Certification for compliance excellence.",
    icon: Award,
  },
  {
    year: "2019",
    milestone: "Expanded operations to include IT & Telecom waste recycling.",
    icon: Radio,
  },
  {
    year: "2021",
    milestone: "Launched Secure Data Destruction services for corporate clients.",
    icon: Lock,
  },
  {
    year: "2024",
    milestone: "Served 20+ industries, recycled 5000+ tons of e-waste, and achieved national recognition.",
    icon: Globe,
  },
]

export function CompanyTimeline() {
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [isAnimating, setIsAnimating] = useState(false)
  const progressControls = useAnimationControls()

  const handleTimelineClick = async (clickedIndex: number) => {
    if (isAnimating) return

    setIsAnimating(true)
    setActiveIndex(0)

    // Animate the progress line from 0 to 100%
    await progressControls.start({
      scaleX: 1,
      transition: { duration: 3, ease: "linear" },
    })

    // Sequentially highlight each item
    for (let i = 0; i <= timelineData.length - 1; i++) {
      setActiveIndex(i)
      await new Promise((resolve) => setTimeout(resolve, 600))
    }

    // Reset after animation completes
    setTimeout(() => {
      setActiveIndex(-1)
      setIsAnimating(false)
      progressControls.set({ scaleX: 0 })
    }, 500)
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">Our Journey</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            From a small recycling initiative to a nationwide e-waste management network.
          </p>
        </motion.div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2" />

            <motion.div
              animate={progressControls}
              initial={{ scaleX: 0 }}
              className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-primary via-accent to-primary -translate-y-1/2 origin-left shadow-lg shadow-primary/50"
              style={{ transformOrigin: "left" }}
            />

            {/* Timeline Items */}
            <div className="grid grid-cols-5 gap-8">
              {timelineData.map((item, index) => (
                <TimelineItemHorizontal
                  key={index}
                  item={item}
                  index={index}
                  isActive={activeIndex === index}
                  onClick={() => handleTimelineClick(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile & Tablet: Vertical Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20" />

            <motion.div
              animate={progressControls}
              initial={{ scaleY: 0 }}
              className="absolute left-8 top-0 bottom-0 w-2 bg-gradient-to-b from-primary via-accent to-primary origin-top shadow-lg shadow-primary/50"
              style={{ transformOrigin: "top" }}
            />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <TimelineItemVertical
                  key={index}
                  item={item}
                  index={index}
                  isActive={activeIndex === index}
                  onClick={() => handleTimelineClick(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <StatCard number="5000+" label="Tons Recycled" />
          <StatCard number="20+" label="Industries Served" />
          <StatCard number="10+" label="Years of Excellence" />
        </motion.div>
      </div>
    </section>
  )
}

function TimelineItemHorizontal({
  item,
  index,
  isActive,
  onClick,
}: {
  item: (typeof timelineData)[0]
  index: number
  isActive: boolean
  onClick: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const Icon = item.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        animate={
          isActive
            ? {
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 10px 30px rgba(34, 197, 94, 0.3)",
                  "0 20px 50px rgba(34, 197, 94, 0.6)",
                  "0 10px 30px rgba(34, 197, 94, 0.3)",
                ],
              }
            : {}
        }
        transition={{ duration: 0.6 }}
        className={`relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg mb-6 transition-all ${
          isActive ? "ring-4 ring-primary ring-offset-2 ring-offset-background" : ""
        }`}
      >
        <Icon className="w-10 h-10 text-primary-foreground" />
      </motion.div>

      <motion.div
        animate={
          isActive
            ? {
                scale: [1, 1.05, 1],
                borderColor: ["hsl(var(--border))", "hsl(var(--primary))", "hsl(var(--border))"],
              }
            : {}
        }
        transition={{ duration: 0.6 }}
        className={`bg-card/80 backdrop-blur-sm border rounded-2xl p-6 shadow-md hover:shadow-xl transition-all ${
          isActive ? "border-primary shadow-primary/20" : "border-border"
        }`}
      >
        <div className="text-3xl font-bold text-primary mb-3">{item.year}</div>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.milestone}</p>
      </motion.div>
    </motion.div>
  )
}

function TimelineItemVertical({
  item,
  index,
  isActive,
  onClick,
}: {
  item: (typeof timelineData)[0]
  index: number
  isActive: boolean
  onClick: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const Icon = item.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex gap-6 cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        animate={
          isActive
            ? {
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 10px 30px rgba(34, 197, 94, 0.3)",
                  "0 20px 50px rgba(34, 197, 94, 0.6)",
                  "0 10px 30px rgba(34, 197, 94, 0.3)",
                ],
              }
            : {}
        }
        transition={{ duration: 0.6 }}
        className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg transition-all ${
          isActive ? "ring-4 ring-primary ring-offset-2 ring-offset-background" : ""
        }`}
      >
        <Icon className="w-8 h-8 text-primary-foreground" />
      </motion.div>

      <motion.div
        animate={
          isActive
            ? {
                scale: [1, 1.05, 1],
                borderColor: ["hsl(var(--border))", "hsl(var(--primary))", "hsl(var(--border))"],
              }
            : {}
        }
        transition={{ duration: 0.6 }}
        className={`flex-1 bg-card/80 backdrop-blur-sm border rounded-2xl p-6 shadow-md hover:shadow-xl transition-all ${
          isActive ? "border-primary shadow-primary/20" : "border-border"
        }`}
      >
        <div className="text-2xl font-bold text-primary mb-2">{item.year}</div>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.milestone}</p>
      </motion.div>
    </motion.div>
  )
}

// Animated Counter Component
function AnimatedCounter({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * target)
      
      setCount(currentCount)
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, target, duration])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-primary">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Extract numeric value and suffix from the number string
  const getNumberData = (numStr: string) => {
    const match = numStr.match(/(\d+)([+\-]?.*)/)
    if (match) {
      return {
        value: parseInt(match[1]),
        suffix: match[2] || ""
      }
    }
    return { value: 0, suffix: "" }
  }

  const { value, suffix } = getNumberData(number)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center p-8 bg-card/50 backdrop-blur-sm border border-border rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-105"
    >
      <div className="mb-2">
        <AnimatedCounter target={value} suffix={suffix} duration={2.5} />
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-medium">{label}</div>
    </motion.div>
  )
}
