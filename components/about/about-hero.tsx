"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import { PickupFormModal } from "../pickup-form-modal"
import { useState } from "react"

export function AboutHero() {
  const [pickupModalOpen, setPickupModalOpen] = useState(false)
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/10 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              y: [null, Math.random() * -100 - 20 + "%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 md:py-20  relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
         
         
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
                About <span className="text-primary">S P Recycling Pvt Ltd</span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h4 className="text-xl sm:text-2xl text-muted-foreground font-medium text-pretty">
              Pioneering sustainable e-waste solutions for a circular economy.
              </h4>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty">
              We are India&apos;s leading e-waste management and recycling company, transforming how businesses and communities handle electronic waste.
               Through cutting-edge technology, certified processes, and unwavering commitment to environmental stewardship, we're building a future where nothing goes to waste—and everything has value.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                onClick={() => setPickupModalOpen(true)}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Pickup
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold bg-transparent"
                onClick={() => {
                  // Smooth scroll to "How We Work" section
                  document.getElementById("how-we-work")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
               Discover Our Journey
               
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Main illustration */}
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Decorative circles */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{
                    scale: [1.1, 1, 1.1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute inset-8 bg-accent/20 rounded-full blur-2xl"
                />

                {/* Placeholder for recycling illustration */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Image
                    src="city/e-waste-recycling-facility-with-circuit-boards-and.jpg"
                    alt="E-waste recycling illustration"
                    width={600}
                    height={600}
                    className="w-full h-full object-contain drop-shadow-2xl rounded-2xl"
                  />
                </div>

                {/* Floating icons */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                  className="absolute top-10 -left-8 w-16 h-16 bg-card rounded-2xl shadow-lg flex items-center justify-center border border-border z-20"
                >
                  <Image
                    src="/recycle-icon.png"
                    alt="Recycling"
                    width={60}
                    height={60}
                    className="w-12 h-12"
                  />
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                  className="absolute bottom-20 -right-8 w-16 h-16 bg-card rounded-2xl shadow-lg flex items-center justify-center border border-border z-20"
                >
                  <Image
                    src="/leaf.png"
                    alt="Eco-friendly"
                    width={60}
                    height={60}
                    className="w-12 h-12"
                  />
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 3, 0],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1.2,
                  }}
                  className="absolute top-1/2 -right-12 w-16 h-16 bg-card rounded-2xl shadow-lg flex items-center justify-center border border-border z-20"
                >
                  <Image
                    src="/laptop-icon.png"
                    alt="Electronics"
                    width={50}
                    height={50}
                    className="w-10 h-10"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

        {/* Pickup Form Modal */}
        <PickupFormModal 
        open={pickupModalOpen} 
        onOpenChange={setPickupModalOpen} 
      />
    </section>
  )
}
