"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Truck, Recycle, Leaf, Package } from "lucide-react"

const cities = [
  { name: "Hyderabad", collected: 250, color: "#16A34A" },
  { name: "Chennai", collected: 310, color: "#15803D" },
  { name: "Pune", collected: 200, color: "#166534" },
  { name: "Delhi", collected: 400, color: "#14532D" },
  { name: "Mumbai", collected: 350, color: "#16A34A" },
  { name: "Bengaluru", collected: 270, color: "#15803D" },
  { name: "Ahmedabad", collected: 180, color: "#166534" },
]

export function JourneyCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayedNumber, setDisplayedNumber] = useState(0)
  const [showCollected, setShowCollected] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cities.length)
      setShowCollected(false)
      setDisplayedNumber(0)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Animate number counting
    const targetNumber = cities[activeIndex].collected
    const duration = 2000
    const steps = 50
    const increment = targetNumber / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= targetNumber) {
        setDisplayedNumber(targetNumber)
        clearInterval(timer)
        // Show collected badge after counting completes
        setTimeout(() => setShowCollected(true), 300)
      } else {
        setDisplayedNumber(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [activeIndex])

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-10 left-10 text-green-600"
        >
          <Leaf className="w-20 h-20" />
        </motion.div>
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute bottom-10 right-10 text-green-600"
        >
          <Recycle className="w-24 h-24" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-green-800 mb-4"
          >
            Our E-Waste Collection Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            See how our green truck collects e-waste across major Indian cities
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative"
            >
              <div
                className="rounded-2xl shadow-2xl p-8 md:p-16 bg-gradient-to-br from-green-50 to-white border-4 border-green-600 relative overflow-hidden"
                style={{ minHeight: "400px" }}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#16A34A_1px,_transparent_1px)] bg-[length:30px_30px]" />
                </div>

                {/* Floating e-waste icons */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 flex space-x-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 0, scale: 1 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        y: [0, -30, -60, -90],
                        scale: [1, 1.2, 1, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        delay: 1 + i * 0.3,
                        ease: "easeOut",
                      }}
                      className="text-green-600"
                    >
                      {i === 0 && <Package className="w-8 h-8" />}
                      {i === 1 && <Recycle className="w-8 h-8" />}
                      {i === 2 && <Package className="w-8 h-8" />}
                    </motion.div>
                  ))}
                </div>

                {/* Animated Truck */}
                <div className="relative mb-8 h-24 flex items-center justify-center">
                  <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative"
                  >
                    <Truck className="w-20 h-20 text-green-700" />
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <Recycle className="w-4 h-4 text-white" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* City Info */}
                <div className="text-center relative z-10">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl font-bold text-green-700 mb-4"
                  >
                    {cities[activeIndex].name}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl md:text-2xl text-gray-700 mb-6"
                  >
                    E-Waste Collected: <span className="font-bold text-green-600 text-3xl">{displayedNumber} kg</span>
                  </motion.div>

                  {/* Collected Badge */}
                  <AnimatePresence>
                    {showCollected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0, rotate: -180 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-bold rounded-full shadow-lg"
                      >
                        <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: 2 }}>
                          ✅
                        </motion.span>
                        Collected
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Eco Icons */}
                <div className="absolute bottom-4 left-4 flex gap-2 opacity-30">
                  <Leaf className="w-6 h-6 text-green-600" />
                  <Recycle className="w-6 h-6 text-green-600" />
                  <Package className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicators */}
        <div className="mt-10 flex justify-center items-center gap-3">
          {cities.map((city, i) => (
            <motion.div
              key={i}
              animate={{
                scale: i === activeIndex ? 1.5 : 1,
                backgroundColor: i === activeIndex ? "#16A34A" : "#D1D5DB",
              }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="w-4 h-4 rounded-full" />
              {i === activeIndex && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0 rounded-full bg-green-600 opacity-50"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* City Names Below Progress */}
        <div className="mt-4 flex justify-center">
          <motion.p
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-gray-600 font-medium"
          >
            {activeIndex + 1} of {cities.length}: {cities[activeIndex].name}
          </motion.p>
        </div>

        {/* Total Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-full shadow-lg border-2 border-green-200">
            <Recycle className="w-8 h-8 text-green-600" />
            <div className="text-left">
              <p className="text-sm text-gray-600">Total E-Waste Collected</p>
              <p className="text-2xl font-bold text-green-700">
                {cities.reduce((sum, city) => sum + city.collected, 0)} kg
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
