"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Truck, Tv, Cpu, Smartphone, CheckCircle2, Battery, Leaf, Recycle } from "lucide-react"

const cities = [
  { name: "Hyderabad", x: 170, y: 240, waste: 850 },
  { name: "Chennai", x: 190, y: 280, waste: 720 },
  { name: "Pune", x: 140, y: 210, waste: 680 },
  { name: "Delhi", x: 170, y: 80, waste: 950 },
  { name: "Mumbai", x: 130, y: 200, waste: 1100 },
  { name: "Bengaluru", x: 160, y: 300, waste: 890 },
  { name: "Ahmedabad", x: 130, y: 150, waste: 610 },
]

const ewasteIcons = [Tv, Cpu, Smartphone, Battery]

const Particle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{ backgroundColor: "#16A34A" }}
    initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
    animate={{
      x: [0, Math.random() * 60 - 30],
      y: [0, -80 - Math.random() * 40],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: 1.5,
      delay,
      ease: "easeOut",
    }}
  />
)

export function EWasteJourney() {
  const [currentCity, setCurrentCity] = useState(0)
  const [completedCities, setCompletedCities] = useState<number[]>([])
  const [pathProgress, setPathProgress] = useState(0)
  const [totalWaste, setTotalWaste] = useState(0)
  const [showParticles, setShowParticles] = useState(false)
  const truckControls = useAnimation()

  useEffect(() => {
    console.log("[v0] EWasteJourney component mounted")
    return () => console.log("[v0] EWasteJourney component unmounted")
  }, [])

  useEffect(() => {
    const animateJourney = async () => {
      console.log("[v0] Starting journey animation")
      const travelDuration = 2500
      const pauseDuration = 1000

      for (let i = 0; i < cities.length; i++) {
        console.log(`[v0] Traveling to ${cities[i].name}`)
        setCurrentCity(i)

        await truckControls.start({
          x: cities[i].x,
          y: cities[i].y,
          transition: {
            duration: i === 0 ? 0 : travelDuration / 1000,
            ease: "easeInOut",
          },
        })

        setPathProgress(i)

        setShowParticles(true)
        setTimeout(() => setShowParticles(false), 1500)

        await new Promise((resolve) => setTimeout(resolve, pauseDuration))

        setCompletedCities((prev) => [...prev, i])
        setTotalWaste((prev) => prev + cities[i].waste)

        if (i < cities.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("[v0] Journey complete, restarting...")
      setCompletedCities([])
      setPathProgress(0)
      setCurrentCity(0)
      setTotalWaste(0)
      truckControls.set({ x: cities[0].x, y: cities[0].y })

      setTimeout(() => {
        animateJourney()
      }, 500)
    }

    animateJourney()
  }, [truckControls])

  return (
    <section
      id="ewaste-journey"
      className="relative min-h-screen py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)" }}
    >
      <div className="absolute top-4 left-4 z-50 bg-green-600 text-white px-3 py-1 rounded text-xs font-mono">
        EWaste Journey Section Active
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          >
            {i % 3 === 0 ? (
              <Leaf className="w-8 h-8 text-green-600" />
            ) : i % 3 === 1 ? (
              <Recycle className="w-8 h-8 text-green-600" />
            ) : (
              <div className="w-8 h-8 rounded-full border-2 border-green-600" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #16A34A 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance" style={{ color: "#1E3A8A" }}>
            Our E-Waste Collection Journey Across India
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-pretty leading-relaxed">
            We travel across major Indian cities to collect and recycle responsibly.
          </p>

          <motion.div
            className="mt-6 inline-block px-8 py-4 rounded-2xl shadow-lg"
            style={{ backgroundColor: "#FFFFFF", border: "2px solid #16A34A" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <Recycle className="w-8 h-8" style={{ color: "#16A34A" }} />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600">Total E-Waste Collected</p>
                <motion.p
                  className="text-3xl font-bold"
                  style={{ color: "#16A34A" }}
                  key={totalWaste}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {totalWaste.toLocaleString()} kg
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div
          className="relative w-full max-w-6xl mx-auto rounded-2xl shadow-2xl overflow-hidden"
          style={{ aspectRatio: "16/9", backgroundColor: "#FFFFFF" }}
        >
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <svg viewBox="0 0 340 407" className="w-full h-full opacity-20" preserveAspectRatio="xMidYMid meet">
              <image xlinkHref="/india-map.svg" href="/india-map.svg" width="340" height="407" />
            </svg>
          </div>

          <svg viewBox="0 0 340 407" className="w-full h-full relative z-10" preserveAspectRatio="xMidYMid meet">
            {cities.map((city, index) => {
              if (index === cities.length - 1) return null
              const nextCity = cities[index + 1]
              const isActive = pathProgress > index

              const midX = (city.x + nextCity.x) / 2
              const midY = (city.y + nextCity.y) / 2
              const controlX = midX + (nextCity.y - city.y) * 0.15
              const controlY = midY - (nextCity.x - city.x) * 0.15

              return (
                <motion.path
                  key={`path-${index}`}
                  d={`M ${city.x} ${city.y} Q ${controlX} ${controlY} ${nextCity.x} ${nextCity.y}`}
                  fill="none"
                  stroke="#16A34A"
                  strokeWidth="3"
                  strokeDasharray="8,6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: isActive ? 1 : 0,
                    opacity: isActive ? 0.8 : 0,
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  filter="url(#glow)"
                />
              )
            })}

            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {cities.map((city, index) => {
              const isActive = currentCity >= index
              const isCurrent = currentCity === index
              const isCompleted = completedCities.includes(index)

              return (
                <g key={city.name}>
                  <motion.circle
                    cx={city.x}
                    cy={city.y}
                    r="8"
                    fill="#16A34A"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: isActive ? 1 : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {isCurrent && (
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r="8"
                      fill="none"
                      stroke="#16A34A"
                      strokeWidth="2"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{
                        scale: [1, 2.5, 1],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  <motion.text
                    x={city.x}
                    y={city.y - 15}
                    textAnchor="middle"
                    className="text-[14px] font-semibold"
                    fill="#1E3A8A"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {city.name}
                  </motion.text>

                  {isCompleted && (
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    >
                      <circle cx={city.x} cy={city.y + 18} r="10" fill="#16A34A" />
                      <foreignObject x={city.x - 8} y={city.y + 10} width="16" height="16">
                        <div className="flex items-center justify-center w-full h-full">
                          <CheckCircle2 className="w-full h-full text-white" strokeWidth={3} />
                        </div>
                      </foreignObject>
                    </motion.g>
                  )}
                </g>
              )
            })}

            <motion.g animate={truckControls} initial={{ x: cities[0].x, y: cities[0].y }}>
              <circle r="18" fill="#16A34A" opacity="0.15" />
              <circle r="14" fill="#FFFFFF" stroke="#16A34A" strokeWidth="2" />
              <foreignObject x="-10" y="-10" width="20" height="20">
                <div className="flex items-center justify-center w-full h-full">
                  <Truck className="w-full h-full" style={{ color: "#16A34A" }} />
                </div>
              </foreignObject>
            </motion.g>
          </svg>

          {currentCity >= 0 && !completedCities.includes(currentCity) && currentCity < cities.length && (
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute"
                style={{
                  left: `${(cities[currentCity].x / 340) * 100}%`,
                  top: `${(cities[currentCity].y / 407) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {ewasteIcons.map((Icon, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute"
                    style={{ left: `${(idx - 1.5) * 25}px` }}
                    initial={{ y: 30, opacity: 0, scale: 0 }}
                    animate={{
                      y: [30, -60],
                      opacity: [0, 1, 1, 0],
                      scale: [0, 1, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: idx * 0.2,
                      ease: "easeOut",
                    }}
                  >
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "rgba(22, 163, 74, 0.15)", border: "1px solid rgba(22, 163, 74, 0.3)" }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "#16A34A" }} />
                    </div>
                  </motion.div>
                ))}

                {showParticles && (
                  <>
                    {[...Array(12)].map((_, i) => (
                      <Particle key={i} delay={i * 0.1} />
                    ))}
                  </>
                )}
              </div>
            </div>
          )}

          {completedCities.map((cityIndex) => (
            <motion.div
              key={`label-${cityIndex}`}
              className="absolute pointer-events-none text-xs font-semibold whitespace-nowrap px-3 py-1 rounded-full"
              style={{
                left: `${(cities[cityIndex].x / 340) * 100}%`,
                top: `${(cities[cityIndex].y / 407) * 100}%`,
                transform: "translate(-50%, -150%)",
                backgroundColor: "#16A34A",
                color: "#FFFFFF",
              }}
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              Collected ✓ {cities[cityIndex].waste}kg
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 max-w-6xl mx-auto"
        >
          <div className="rounded-xl p-6 shadow-lg" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="flex items-center justify-between relative">
              <div
                className="absolute top-4 left-0 right-0 h-1 rounded-full"
                style={{ backgroundColor: "#e5e7eb", zIndex: 0 }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "#16A34A" }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${(pathProgress / (cities.length - 1)) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </div>

              {cities.map((city, index) => {
                const isCompleted = completedCities.includes(index)
                const isCurrent = currentCity === index
                const isActive = currentCity >= index

                return (
                  <div key={city.name} className="flex flex-col items-center relative z-10" style={{ flex: 1 }}>
                    <motion.div
                      className="w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 transition-all"
                      style={{
                        backgroundColor: isCompleted
                          ? "#16A34A"
                          : isCurrent
                            ? "#16A34A"
                            : isActive
                              ? "rgba(22, 163, 74, 0.3)"
                              : "#FFFFFF",
                        borderColor: isActive ? "#16A34A" : "#d1d5db",
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: isActive ? 1 : 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isCompleted && <CheckCircle2 className="w-4 h-4" style={{ color: "#FFFFFF" }} />}
                      {isCurrent && !isCompleted && <Truck className="w-4 h-4" style={{ color: "#FFFFFF" }} />}
                    </motion.div>
                    <span
                      className="text-xs font-medium text-center"
                      style={{ color: isActive ? "#1E3A8A" : "#9ca3af" }}
                    >
                      {city.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
