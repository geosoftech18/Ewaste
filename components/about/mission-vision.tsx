"use client"

import { motion } from "framer-motion"
import { Globe, Recycle } from "lucide-react"

export function MissionVision() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  }

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-green-50 via-emerald-100 to-blue-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-300 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-3">Our Mission & Vision</h2>
          <p className="text-lg text-gray-600 font-medium">Shaping tomorrow through responsible innovation today.</p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-10 items-stretch"
        >
          {/* Mission Card */}
          <motion.div
            variants={cardVariants}
            className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl p-8 border border-green-100 transition-all duration-300"
          >
            {/* Decorative particles */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -top-3 -right-3 w-6 h-6 bg-green-400 rounded-full opacity-60 blur-sm"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-2 -left-2 w-4 h-4 bg-emerald-400 rounded-full opacity-60 blur-sm"
            />

            {/* Icon */}
            <motion.div variants={iconVariants} className="mb-6 inline-block">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <Globe className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>

            {/* Content */}
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Mission</h3>
            <p className="text-gray-700 leading-relaxed">
            To revolutionize waste management by delivering end-to-end 
            recycling solutions that are secure, compliant, and impactful—empowering individuals and enterprises to participate in a truly circular economy while protecting our planet's finite resources.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl p-8 border border-blue-100 transition-all duration-300"
          >
            {/* Decorative particles */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                x: [0, 5, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -top-2 -right-4 w-5 h-5 bg-blue-400 rounded-full opacity-60 blur-sm"
            />
            <motion.div
              animate={{
                y: [0, 8, 0],
                x: [0, -5, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.7,
              }}
              className="absolute -bottom-3 -left-3 w-6 h-6 bg-cyan-400 rounded-full opacity-60 blur-sm"
            />

            {/* Icon */}
            <motion.div variants={iconVariants} className="mb-6 inline-block">
              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <Recycle className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>

            {/* Content */}
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Vision</h3>
            <p className="text-gray-700 leading-relaxed">
            To lead India's transition toward zero-waste sustainability as the nation's most trusted e-waste recycling partner—where innovation 
            meets responsibility, and every action contributes to environmental well-being for generations to come.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
