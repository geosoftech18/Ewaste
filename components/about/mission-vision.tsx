"use client"

import { motion } from "framer-motion"
import { Rocket, Telescope, Sparkles, Zap, Star } from "lucide-react"

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
        ease: "easeOut" as const,
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
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
            <motion.div variants={iconVariants} className="mb-6 inline-block relative">
              {/* Outer glow effect */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 blur-xl"
              />
              
              {/* Main icon container */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="relative w-20 h-20 bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl"
                style={{
                  boxShadow: "0 10px 40px rgba(16, 185, 129, 0.4), inset 0 2px 10px rgba(255, 255, 255, 0.2)",
                }}
              >
                {/* Inner glow ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.6, 0.9, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full border-[3px] border-white/40"
                />
                
                {/* Secondary ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                  className="absolute inset-[-4px] rounded-full border-2 border-emerald-300/50"
                />
                
                {/* Main icon */}
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  <Rocket className="w-10 h-10 text-white" strokeWidth={3} />
                </motion.div>
                
                {/* Sparkles around icon */}
                {[0, 90, 180, 270].map((angle, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: angle,
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                    className="absolute"
                    style={{
                      top: "50%",
                      left: "50%",
                      transformOrigin: "0 0",
                      marginTop: "-2px",
                      marginLeft: "-2px",
                    }}
                  >
                    <Star
                      className="w-3 h-3 text-yellow-300 fill-yellow-300"
                      style={{
                        transform: `translate(35px, 0)`,
                      }}
                    />
                  </motion.div>
                ))}
                
                {/* Rocket trail effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-t from-orange-400 via-yellow-400 to-transparent rounded-full blur-sm"
                />
              </motion.div>
              
              {/* Floating sparkles */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -15, 0],
                    x: [0, i % 2 === 0 ? 10 : -10, 0],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
                >
                  <Sparkles
                    className="w-4 h-4 text-emerald-400"
                    style={{
                      position: "absolute",
                      top: `${20 + i * 30}%`,
                      left: `${30 + i * 20}%`,
                    }}
                  />
                </motion.div>
              ))}
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
            <motion.div variants={iconVariants} className="mb-6 inline-block relative">
              {/* Outer glow effect */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 blur-xl"
              />
              
              {/* Main icon container */}
              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl"
                style={{
                  boxShadow: "0 10px 40px rgba(59, 130, 246, 0.4), inset 0 2px 10px rgba(255, 255, 255, 0.2)",
                }}
              >
                {/* Inner glow ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.6, 0.9, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full border-[3px] border-white/40"
                />
                
                {/* Secondary ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                  className="absolute inset-[-4px] rounded-full border-2 border-cyan-300/50"
                />
                
                {/* Main icon */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  <Telescope className="w-10 h-10 text-white" strokeWidth={3} />
                </motion.div>
                
                {/* Stars visible through telescope */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: angle,
                      scale: [0.5, 1, 0.5],
                      opacity: [0.2, 0.9, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                    className="absolute"
                    style={{
                      top: "50%",
                      left: "50%",
                      transformOrigin: "0 0",
                      marginTop: "-3px",
                      marginLeft: "-3px",
                    }}
                  >
                    <Star
                      className="w-2.5 h-2.5 text-cyan-200 fill-cyan-200"
                      style={{
                        transform: `translate(30px, 0)`,
                      }}
                    />
                  </motion.div>
                ))}
                
                {/* Telescope viewing circle effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full border-2 border-cyan-200/40"
                />
              </motion.div>
              
              {/* Floating energy particles */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, i % 2 === 0 ? 12 : -12, 0],
                    opacity: [0, 1, 0],
                    scale: [0.4, 1.2, 0.4],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.6,
                  }}
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
                >
                  <Zap
                    className="w-5 h-5 text-cyan-400"
                    style={{
                      position: "absolute",
                      top: `${15 + i * 35}%`,
                      left: `${25 + i * 25}%`,
                    }}
                  />
                </motion.div>
              ))}
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
