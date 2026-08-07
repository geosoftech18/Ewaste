"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Smartphone,
  Home,
  Layers,
  Package,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Recycle,
  Sparkles,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const theme = {
  gradient: "from-emerald-500 to-teal-600",
  lightBg: "bg-emerald-50",
  border: "border-emerald-200",
  accent: "text-emerald-700",
  chipBg: "bg-emerald-50 border-emerald-200/80 text-emerald-900 hover:bg-emerald-100",
}

const categories = [
  {
    id: "ewaste",
    icon: Smartphone,
    shortLabel: "E-Waste",
    title: "Electronic Waste (E-Waste)",
    tagline: "Certified eco-safe disposal",
    intro:
      "Old electronics are among the most hazardous materials when dumped in landfills, leaching toxic chemicals into soil and groundwater.",
    items: [
      "Mobile phones and tablets",
      "Laptops, desktops, and computer peripherals",
      "Printers, scanners, and fax machines",
      "Batteries and UPS systems",
      "Chargers, cables, wires, and power adapters",
      "Circuit boards and PCBs",
      "Networking equipment and accessories",
    ],
    footer:
      "Whether it's a single old smartphone or an entire office's worth of obsolete IT equipment, hand them over to us for certified, eco-safe disposal and get a fair deal.",
  },
  {
    id: "appliance",
    icon: Home,
    shortLabel: "Appliances",
    title: "Home Appliance Scrap",
    tagline: "Doorstep bulk pickup",
    intro:
      "Large appliances take up space, and most people have no idea what to do with a broken refrigerator or a washing machine that finally gave out. SP Recycling makes bulk appliance disposal effortless with doorstep pickup and on-the-spot pricing.",
    items: [
      "Refrigerators and deep freezers",
      "Air conditioners and coolers",
      "Washing machines and dryers",
      "Microwave ovens and kitchen appliances",
      "Televisions, music systems, and home theatre units",
      "Other white goods and large household electronics",
    ],
    footer: "No need to dismantle anything — we handle it all.",
  },
  {
    id: "metal",
    icon: Layers,
    shortLabel: "Metal",
    title: "Metal Scrap",
    tagline: "Market-aligned rates",
    intro:
      "Metals are among the most valuable recyclable materials. At SP Recycling, you get competitive, market-aligned rates with full transparency on weight and pricing.",
    items: [
      "Iron and steel scrap",
      "Copper wire, tubing, and components",
      "Aluminium sheets, frames, and profiles",
      "Brass and bronze fittings",
      "Mixed metals from industrial, commercial, and residential sources",
    ],
    footer:
      "Whether you're a homeowner with leftover construction material or an industrial unit with regular metal scrap output, we offer pickup solutions scaled to your volume.",
  },
  {
    id: "plastic",
    icon: Package,
    shortLabel: "Plastic",
    title: "Plastic Scrap",
    tagline: "Sorted & channelized",
    intro:
      "Plastic waste is one of the most persistent environmental pollutants. SP Recycling ensures your plastic scrap is collected, sorted, and sent to the right recycling channels, keeping it out of drainage systems and open dumps.",
    items: [
      "Plastic furniture and storage units",
      "PVC pipes, sheets, and profiles",
      "Industrial plastic packaging and containers",
      "Mixed household plastic waste",
      "Electronic plastic casings from TVs, appliances, and devices",
      "Plastic waste from factories, warehouses, and commercial spaces",
    ],
    footer: null,
  },
]

function CategoryPanel({ category }: { category: (typeof categories)[0] }) {
  const Icon = category.icon

  return (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="h-full"
    >
      <article className="h-full flex flex-col rounded-2xl border border-emerald-200/70 overflow-hidden shadow-lg bg-white">
        {/* Header */}
        <div className={`relative bg-gradient-to-br ${theme.gradient} px-6 sm:px-8 pt-6 sm:pt-8 pb-6`}>
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-2xl" />
          </div>
          <div className="absolute top-4 right-4 opacity-15 pointer-events-none">
            <Icon className="w-28 h-28 sm:w-32 sm:h-32 text-white" strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/25 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {category.tagline}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 max-w-md">{category.title}</h3>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-xl">{category.intro}</p>
          </div>
        </div>

        {/* Body — items & footer in same card */}
        <div className="flex-1 flex flex-col px-6 sm:px-8 py-6 sm:py-7 bg-gradient-to-b from-emerald-50/60 to-white">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-emerald-200/80" />
            <span className={`text-xs font-bold uppercase tracking-[0.2em] ${theme.accent}`}>We collect</span>
            <div className="h-px flex-1 bg-emerald-200/80" />
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {category.items.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-default ${theme.chipBg}`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600" />
                {item}
              </motion.span>
            ))}
          </div>

          {category.footer && (
            <div className="mt-6 pt-5 border-t border-emerald-200/70">
              <p className="text-sm text-gray-600 leading-relaxed italic">{category.footer}</p>
            </div>
          )}
        </div>
      </article>
    </motion.div>
  )
}

export function ScrapTypesSection() {
  const [activeId, setActiveId] = useState(categories[0].id)
  const active = categories.find((c) => c.id === activeId) ?? categories[0]

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white">
      <div className="absolute top-20 right-0 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-0 w-72 h-72 bg-teal-100/40 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-4 py-1.5 text-sm font-semibold mb-5">
              <Recycle className="w-4 h-4" />
              What We Collect/Recycle
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-5">
              Types of Scrap &amp;{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                E-Waste
              </span>{" "}
              We Collect/Recycle
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            SP Recycling collects and responsibly recycles a wide range of electronic waste from homes, businesses, industries, educational institutions, healthcare facilities, and government organizations. 
            Whether you're disposing of a single device or decommissioning an entire IT infrastructure, our certified recycling process ensures safe handling, secure data protection, and environmentally responsible material recovery.
            </p>
          </motion.div>
        </div>

        {/* Desktop interactive panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden lg:grid lg:grid-cols-[minmax(280px,320px)_1fr] gap-0 rounded-3xl overflow-hidden border border-gray-200/80 bg-white shadow-xl shadow-emerald-900/5 mb-12"
        >
          <nav className="flex flex-col p-3 bg-gray-50/80 border-r border-gray-200/80">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeId === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveId(cat.id)}
                  className={`group relative flex items-start gap-3 text-left px-3 py-4 rounded-2xl transition-all duration-300 mb-1 ${
                    isActive ? "bg-white shadow-md shadow-gray-200/60" : "hover:bg-white/70"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeScrapBar"
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-9 rounded-full bg-gradient-to-b ${theme.gradient}`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <div
                    className={`relative z-10 w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 mt-0.5 ${
                      isActive ? `bg-gradient-to-br ${theme.gradient} shadow-md` : "bg-white border border-gray-200"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                  </div>
                  <div className="relative z-10 flex-1 min-w-0 pr-1">
                    <p className={`font-semibold text-sm leading-snug ${isActive ? "text-gray-900" : "text-gray-600"}`}>
                      {cat.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{cat.tagline}</p>
                  </div>
                  <ChevronRight
                    className={`relative z-10 w-4 h-4 flex-shrink-0 mt-1 transition-all duration-300 ${
                      isActive ? "text-emerald-600 opacity-100" : "text-gray-300 opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </button>
              )
            })}

            <div className="mt-auto pt-4 px-1 border-t border-gray-200/80">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
                  <p className="text-2xl font-bold text-emerald-600">4</p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-0.5">Categories</p>
                </div>
                <div className="rounded-xl bg-white border border-gray-200 p-3 text-center">
                  <p className="text-2xl font-bold text-teal-600">24+</p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-0.5">Item Types</p>
                </div>
              </div>
            </div>
          </nav>

          <div className="p-4 xl:p-5 min-h-[520px] bg-gray-50/50">
            <AnimatePresence mode="wait">
              <CategoryPanel key={active.id} category={active} />
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mobile */}
        <div className="lg:hidden mb-10">
          <div className="flex gap-3 overflow-x-auto pb-3 snap-x scrollbar-hide -mx-1 px-1">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeId === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveId(cat.id)}
                  className="snap-center flex-shrink-0 flex flex-col items-center gap-2 w-[88px]"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border ${
                      isActive
                        ? `bg-gradient-to-br ${theme.gradient} shadow-lg scale-105 border-transparent`
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-gray-400"}`} />
                  </div>
                  <span
                    className={`text-[11px] font-semibold text-center leading-tight ${
                      isActive ? "text-emerald-700" : "text-gray-500"
                    }`}
                  >
                    {cat.shortLabel}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50/50 shadow-lg p-4 sm:p-5">
            <AnimatePresence mode="wait">
              <CategoryPanel key={active.id} category={active} />
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden border border-emerald-200 shadow-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/3 -translate-y-1/2" />
          </div>

          <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 p-8 sm:p-10">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/30">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Not Sure What Category Your Scrap Falls Under?
              </h3>
              <p className="text-emerald-50 text-sm sm:text-base leading-relaxed max-w-2xl">
                That&apos;s completely fine — just reach out. Our team will assess your materials, give you an honest
                valuation, and arrange pickup at a time that suits you.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="flex-shrink-0 bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-8 py-6 rounded-2xl shadow-xl hover:scale-[1.02] transition-all duration-300 group/btn"
            >
              <Link href="/contact">
              Talk to Recycling Experts
                <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
