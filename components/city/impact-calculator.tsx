"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Leaf,
  Zap,
  Droplets,
  AlertCircle,
  CheckCircle,
  Loader,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Monitor,
  Printer,
  Smartphone,
  ZapIcon,
  Trash2,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PhoneInput } from "@/components/ui/phone-input"
import { getPhoneValidationError } from "@/lib/phone-validation"

interface EquipmentCategory {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  items: string[]
  co2PerUnit: number
  energyPerUnit: number
  waterPerUnit: number
  materialsPerUnit: number
}

const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
  {
    id: "it-telecom",
    name: "IT & Telecommunication",
    icon: <Cpu className="w-6 h-6" />,
    description: "Get buyback value for your servers, routers, and IT infrastructure.",
    items: ["Servers", "Routers", "Switches", "Network Equipment", "Telecom Devices","Bulk Office IT Assets" ],
    co2PerUnit: 350,
    energyPerUnit: 75,
    waterPerUnit: 200,
    materialsPerUnit: 18,
  },
  {
    id: "consumer-electrical",
    name: "Consumer Electrical",
    icon: <Smartphone className="w-6 h-6" />,
    description: "Best prices to sell old electronics like laptops and smartphones.",
    items: ["Smartphones", "Tablets", "Laptops", "Digital Cameras", "Portable Devices","MacBooks & iPads" ],
    co2PerUnit: 150,
    energyPerUnit: 32,
    waterPerUnit: 90,
    materialsPerUnit: 8,
  },
  {
    id: "large-electrical",
    name: "Large Electrical Equipment",
    icon: <Monitor className="w-6 h-6" />,
    description: "Refrigerators, washing machines, TVs",
    items: ["Refrigerators", "Washing Machines", "TVs", "Air Conditioners", "Microwave Ovens","Old Air Conditioners (ACs)","Commercial Chillers"  ],
    co2PerUnit: 500,
    energyPerUnit: 120,
    waterPerUnit: 350,
    materialsPerUnit: 35,
  },
  {
    id: "small-electrical",
    name: "Small Electrical Equipment",
    icon: <ZapIcon className="w-6 h-6" />,
    description: "Toasters, kettles, fans, chargers",
    items: ["Toasters", "Kettles", "Fans", "Chargers", "Small Appliances"],
    co2PerUnit: 45,
    energyPerUnit: 10,
    waterPerUnit: 25,
    materialsPerUnit: 2,
  },
  {
    id: "printer-recycle",
    name: "Printer & Copier Buyback",
    icon: <Printer className="w-6 h-6" />,
    description: "Recycle or sell old office printers and commercial copiers.",
    items: ["Printers", "Scanners", "Copiers", "Ink Cartridges", "Toner Cartridges"],
    co2PerUnit: 200,
    energyPerUnit: 45,
    waterPerUnit: 120,
    materialsPerUnit: 12,
  },
  {
    id: "medical-devices",
    name: "Medical Devices",
    icon: <Trash2 className="w-6 h-6" />,
    description: "Compliant disposal for healthcare facilities",
    items: ["Diagnostic Equipment", "Monitoring Devices", "Surgical Equipment", "Lab Devices"],
    co2PerUnit: 400,
    energyPerUnit: 85,
    waterPerUnit: 250,
    materialsPerUnit: 25,
  },
  {
    id: "data-destruction",
    name: "Data Destruction",
    icon: <Lock className="w-6 h-6" />,
    description: "Certified data wiping for those looking to sell old hard drives safely.",
    items: ["Hard Drives", "SSDs", "USB Drives", "Memory Cards", "Secure Wiping"],
    co2PerUnit: 80,
    energyPerUnit: 18,
    waterPerUnit: 50,
    materialsPerUnit: 5,
  },
]

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  selectedCategories: Record<string, number>
}

export function ImpactCalculator() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Hyderabad",
    zipCode: "",
    selectedCategories: {},
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const calculateTotalImpact = () => {
    let totalCo2 = 0
    let totalEnergy = 0
    let totalWater = 0
    let totalMaterials = 0
    let totalDevices = 0

    Object.entries(formData.selectedCategories).forEach(([categoryId, quantity]) => {
      const category = EQUIPMENT_CATEGORIES.find((c) => c.id === categoryId)
      if (category && quantity > 0) {
        totalCo2 += category.co2PerUnit * quantity
        totalEnergy += category.energyPerUnit * quantity
        totalWater += category.waterPerUnit * quantity
        totalMaterials += category.materialsPerUnit * quantity
        totalDevices += quantity
      }
    })

    return {
      co2: totalCo2.toFixed(1),
      energy: totalEnergy.toFixed(1),
      water: totalWater.toFixed(1),
      materials: totalMaterials.toFixed(1),
      totalDevices,
    }
  }

  const impact = calculateTotalImpact()
  const hasSelectedEquipment = impact.totalDevices > 0

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      // Get the width of one card including gap
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 280
      const gap = 16 // gap-4 = 16px
      const scrollAmount = cardWidth + gap
      
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleCategoryChange = (categoryId: string, value: string) => {
    const numValue = Number.parseInt(value) || 0
    if (numValue >= 0 && numValue <= 999) {
      setFormData((prev) => ({
        ...prev,
        selectedCategories: {
          ...prev.selectedCategories,
          [categoryId]: numValue,
        },
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"

    const phoneError = getPhoneValidationError(formData.phone)
    if (phoneError) newErrors.phone = phoneError

    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"

    if (impact.totalDevices === 0) newErrors.categories = "Please select at least one equipment category"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      const response = await fetch("/api/impact-calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          categories: formData.selectedCategories,
          impact: {
            co2: impact.co2,
            energy: impact.energy,
            water: impact.water,
            materials: impact.materials,
            totalDevices: impact.totalDevices,
          },
        }),
      })

      if (!response.ok) throw new Error("Failed to submit")

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "Hyderabad",
          zipCode: "",
          selectedCategories: {},
        })
      }, 4000)
    } catch (err) {
      setErrors({ submit: "Failed to submit. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <h2 className="text-2xl sm:text-5xl font-bold text-foreground mb-4">
          Calculate Your Impact & Get Value for Your Devices
          </h2>
          <p className="text-lg text-muted-foreground">
          Select your equipment categories to see your environmental contribution and get a quote to sell old electronics in Hyderabad. Schedule a convenient pickup today!
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 animate-scale-in">
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-6">Select Equipment Categories</h3>
            <div className="relative">
              <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
                style={{ scrollBehavior: "smooth" }}
              >
                {EQUIPMENT_CATEGORIES.map((category) => (
                  <div
                    key={category.id}
                    className="flex-shrink-0 w-65 md:w-80 p-6 rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-300 bg-muted/30 hover:bg-muted/60 snap-start"
                  >
                    <div className="flex items-center gap-3 mb-3 text-primary">{category.icon}</div>
                    <h4 className="text-base font-semibold text-foreground mb-2">{category.name}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{category.description}</p>

                    <div className="mb-4 p-3 bg-background rounded-lg">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Includes:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <input
                      type="number"
                      min="0"
                      max="999"
                      value={formData.selectedCategories[category.id] || 0}
                      onChange={(e) => handleCategoryChange(category.id, e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-center font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground mt-2 text-center">Quantity</p>
                  </div>
                ))}
              </div>

              {/* Carousel Navigation */}
              <button
                onClick={() => scrollCarousel("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground/80 leading-relaxed max-w-3xl">
              <span className="font-medium text-muted-foreground">Note:</span> Higher quantities of IT assets and
              consumer electronics may qualify for cash-back or buyback rewards. Our electronic scrap buyers in Hyderabad
              will provide a final valuation upon inspection.
            </p>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Leaf className="w-6 h-6 text-emerald-600" />
                <span className="text-sm font-semibold text-muted-foreground">CO₂ Prevented</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{impact.co2} kg</div>
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round(Number.parseFloat(impact.co2) / 20)} trees planted
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-yellow-600" />
                <span className="text-sm font-semibold text-muted-foreground">Energy Saved</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{impact.energy} kWh</div>
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round(Number.parseFloat(impact.energy) / 30)} days of home power
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Droplets className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-semibold text-muted-foreground">Water Saved</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{impact.water} L</div>
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round(Number.parseFloat(impact.water) / 100)} showers
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Leaf className="w-6 h-6 text-green-600" />
                <span className="text-sm font-semibold text-muted-foreground">Materials Recovered</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{impact.materials} kg</div>
              <p className="text-xs text-muted-foreground mt-2">Valuable resources</p>
            </div>
          </div>

          {!hasSelectedEquipment ? (
            <div className="p-8 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-dashed border-primary/30 text-center animate-fade-in-up">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <AlertCircle className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Select Equipment to Continue</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Choose at least one equipment category above and enter the quantity to see your environmental impact and
                schedule a pickup.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    disabled={loading}
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    disabled={loading}
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone Number *</label>
                  <PhoneInput
                    value={formData.phone}
                    onChange={(value) => setFormData({ ...formData, phone: value })}
                    placeholder="Enter phone number"
                    disabled={loading}
                    inputClassName="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Hyderabad"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    disabled={loading}
                  />
                  {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-foreground mb-2">Address *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street address, building, apartment"
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    disabled={loading}
                  />
                  {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    placeholder="500001"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    disabled={loading}
                  />
                  {errors.zipCode && <p className="text-xs text-red-600 mt-1">{errors.zipCode}</p>}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-center text-foreground text-sm font-semibold">
                  Total Equipment Items: <span className="text-primary text-lg">{impact.totalDevices}</span>
                </p>
              </div>

              {errors.submit && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{errors.submit}</p>
                </div>
              )}

              {submitted && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start gap-3 animate-fade-in-up">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-700">Pickup Request Submitted Successfully!</p>
                    <p className="text-xs text-green-600 mt-1">
                      We'll contact you shortly to confirm your pickup schedule. Check your email for details.
                    </p>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Scheduling Pickup...
                  </>
                ) : (
                  "Schedule Free Pickup"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
