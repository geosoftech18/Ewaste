"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cpu, Smartphone, Zap, Pill, Wrench, Trash2, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { PickupFormModal } from "../pickup-form-modal"
import Link from "next/link"

const serviceCategories = [
  {
    id: "it",
    name: "IT & Telecom",
    href: "/services/it-telecom",
    icon: Cpu,
    color: "from-blue-500 to-cyan-500",
    items: [
      { name: "Servers & Mainframes", benefit: "Secure data destruction included" },
      { name: "Networking Equipment", benefit: "Complete asset recovery" },
      { name: "Telecommunications Devices", benefit: "Certified disposal" },
      { name: "Computer Peripherals", benefit: "Bulk processing available" },
    ],
    stats: { recovered: "2,500+", processed: "15,000+", certified: "ISO 27001" },
  },
  {
    id: "consumer",
    name: "Consumer Electronics",
    href: "/services/consumer-electronics",
    icon: Smartphone,
    color: "from-purple-500 to-pink-500",
    items: [
      { name: "Smartphones & Tablets", benefit: "Cash rewards available" },
      { name: "Laptops & Desktops", benefit: "Data wiping guaranteed" },
      { name: "Gaming Consoles", benefit: "Quick turnaround" },
      { name: "Smart Devices", benefit: "Eco-friendly processing" },
    ],
    stats: { recovered: "5,000+", processed: "25,000+", certified: "E-Stewards" },
  },
  {
    id: "appliances",
    name: "Large Appliances",
    href: "/services/electronic-waste-recycle",
    icon: Zap,
    color: "from-orange-500 to-red-500",
    items: [
      { name: "Refrigerators & Freezers", benefit: "CFC recovery" },
      { name: "Washing Machines", benefit: "Metal & plastic separation" },
      { name: "Air Conditioners", benefit: "Refrigerant recovery" },
      { name: "Industrial Equipment", benefit: "Heavy machinery handling" },
    ],
    stats: { recovered: "3,200+", processed: "12,000+", certified: "R2 Certified" },
  },
  {
    id: "medical",
    name: "Medical Devices",
    href: "/services/electronic-waste-recycle",
    icon: Pill,
    color: "from-green-500 to-emerald-500",
    items: [
      { name: "Diagnostic Equipment", benefit: "Sterile handling" },
      { name: "Hospital Instruments", benefit: "Compliance certified" },
      { name: "Lab Equipment", benefit: "Hazmat protocols" },
      { name: "Imaging Devices", benefit: "Specialized disposal" },
    ],
    stats: { recovered: "800+", processed: "3,500+", certified: "HIPAA Compliant" },
  },
  {
    id: "industrial",
    name: "Industrial Tools",
    href: "/services/electronic-waste-recycle",
    icon: Wrench,
    color: "from-yellow-500 to-amber-500",
    items: [
      { name: "Power Tools", benefit: "Battery recycling" },
      { name: "Machinery & Motors", benefit: "Metal recovery" },
      { name: "Industrial Electronics", benefit: "Component separation" },
      { name: "Control Systems", benefit: "Bulk processing" },
    ],
    stats: { recovered: "1,500+", processed: "8,000+", certified: "ISO 14001" },
  },
  {
    id: "data",
    name: "Data Destruction",
    href: "/services/data-destruction",
    icon: Trash2,
    color: "from-red-500 to-rose-500",
    items: [
      { name: "Hard Drive Shredding", benefit: "Certificate of destruction" },
      { name: "SSD Destruction", benefit: "NIST compliant" },
      { name: "Tape Media Destruction", benefit: "Secure incineration" },
      { name: "Document Shredding", benefit: "On-site available" },
    ],
    stats: { recovered: "10,000+", processed: "50,000+", certified: "DIN 66399" },
  },
]

interface ServicesProps {
  cityName?: string;
  servicesBlurbHtml?: string;
  servicesBlurb?: string;
  services?: {
    title: string;
    items: Array<{
      name: string;
      description: string;
      icon: string;
    }>;
  };
}

export function Services({ 
  cityName = "Hyderabad",
  servicesBlurbHtml,
  servicesBlurb,
  services = {
    title: "What You Can Recycle",
    items: [
      { name: "IT Equipment", description: "Servers, computers, networking equipment", icon: "Cpu" },
      { name: "Mobile Devices", description: "Smartphones, tablets, laptops", icon: "Smartphone" },
      { name: "Consumer Electronics", description: "TVs, gaming consoles, appliances", icon: "Monitor" },
      { name: "Data Destruction", description: "Secure data wiping and destruction", icon: "Shield" }
    ]
  }
}: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState("it")
  const carouselRef = useRef<HTMLDivElement>(null)
  const activeService = serviceCategories.find((cat) => cat.id === activeCategory)
  const Icon = activeService?.icon || Cpu
  const [pickupModalOpen, setPickupModalOpen] = useState(false)
  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 200 // Adjust based on tab width
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="services" className="py-20 sm:py-32 bg-background">
      <div className="container  mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">{services.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We handle safe, eco-friendly disposal of a wide range of electronic waste and equipment in {cityName}
          </p>
        </div>

        {(servicesBlurbHtml || servicesBlurb) && (
          <p className="mx-auto mb-10 max-w-4xl rounded-xl border border-border/70 bg-muted/30 px-5 py-5 text-center text-base sm:text-lg text-foreground/90 leading-relaxed animate-fade-in-up">
            {servicesBlurbHtml ? (
              <span
                className="[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary/85"
                dangerouslySetInnerHTML={{ __html: servicesBlurbHtml }}
              />
            ) : (
              servicesBlurb
            )}
          </p>
        )}

        {/* Category Tabs */}
        <div className="mb-12 animate-fade-in-up">
          {/* Desktop: Regular tabs */}
          <div className="hidden md:flex flex-wrap gap-3 justify-center">
            {serviceCategories.map((category) => {
              const TabIcon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group relative px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                      : "bg-card border border-border text-foreground hover:border-primary/50 hover:shadow-md"
                  }`}
                >
                  <TabIcon className="h-5 w-5" />
                  <span>{category.name}</span>
                </button>
              )
            })}
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden relative max-w-7xl mx-auto">
            <div
              ref={carouselRef}
              className="flex gap-3 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
              style={{ scrollBehavior: "smooth" }}
            >
              {serviceCategories.map((category) => {
                const TabIcon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`group relative px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 flex-shrink-0 snap-start ${
                      activeCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                        : "bg-card border border-border text-foreground hover:border-primary/50 hover:shadow-md"
                    }`}
                  >
                    <TabIcon className="h-5 w-5" />
                    <span>{category.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Carousel Navigation */}
            {/* <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button> */}
          </div>
        </div>

        {/* Active Service Details */}
        {activeService && (
          <div className="animate-fade-in-up max-w-6xl mx-auto">
            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Recovered", value: activeService.stats.recovered },
                { label: "Processed", value: activeService.stats.processed },
                { label: "Certified", value: activeService.stats.certified },
              ].map((stat, idx) => (
                <Card
                  key={idx}
                  className={`bg-gradient-to-br ${activeService.color} text-white p-4 sm:p-6 text-center border-0`}
                >
                  <div className="text-lg sm:text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* Service Items Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-6xl mx-auto ">
              {activeService.items.map((item, idx) => (
                <Card
                  key={idx}
                  className="group relative overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-scale-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${activeService.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                  />
                  <div className="relative p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-br ${activeService.color} flex items-center justify-center`}
                      >
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-primary" />
                          {item.benefit}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                size="lg"
                onClick={() => setPickupModalOpen(true)}
                className={`bg-gradient-to-r ${activeService.color} text-white hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                Schedule Pickup in {cityName}
              </Button>
              {activeService.href && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  <Link href={activeService.href}>
                    Explore {activeService.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      <PickupFormModal 
        open={pickupModalOpen} 
        onOpenChange={setPickupModalOpen} 
      />
    </section>
  )
}
