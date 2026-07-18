"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Menu, Facebook, Linkedin, Twitter, Instagram, MessageCircle, ChevronDown, MapPin, Sparkles } from "lucide-react"

const PickupFormModal = dynamic(
  () => import("@/components/pickup-form-modal").then((m) => ({ default: m.PickupFormModal })),
  { ssr: false }
)
const HeaderMobileMenu = dynamic(
  () => import("@/components/header-mobile-menu").then((m) => ({ default: m.HeaderMobileMenu })),
  { ssr: false }
)

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Cities We Serve", href: "", hasDropdown: true },
  { name: "Contact Us", href: "/contact" },
  { name: "Read Our Blog", href: "/blog" },
]

const cities = [
  { name: "Hyderabad", slug: "hyderabad" },
  { name: "Delhi", slug: "delhi" },
  { name: "Mumbai", slug: "mumbai" },
  { name: "Bangalore", slug: "bangalore" },
  { name: "Chennai", slug: "chennai" },
  { name: "Pune", slug: "pune" },
  { name: "Andhra Pradesh", slug: "andhra-pradesh" }
]

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showTopBar, setShowTopBar] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false)
  const [isNavFixed, setIsNavFixed] = useState(false)
  const [pickupModalOpen, setPickupModalOpen] = useState(false)
  const [pickupModalLoaded, setPickupModalLoaded] = useState(false)
  const [citiesDropdownOpen, setCitiesDropdownOpen] = useState(false)
  const [mobileCitiesOpen, setMobileCitiesOpen] = useState(false)

  useEffect(() => {
    if (pickupModalOpen) setPickupModalLoaded(true)
  }, [pickupModalOpen])

  useEffect(() => {
    let ticking = false
    let prevY = window.scrollY

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY

        if (currentScrollY > prevY && currentScrollY > 50) {
          setShowTopBar(false)
        } else if (currentScrollY < prevY) {
          setShowTopBar(true)
        }

        setIsNavFixed(currentScrollY > 48)
        setIsScrolled(currentScrollY > 10)
        prevY = currentScrollY
        ticking = false
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="relative">
      {/* Top Bar */}
      <div
        className={`bg-[#074E3B] text-white transition-all duration-300 ${
          showTopBar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12 text-sm">
            {/* Scrolling Ticker */}
            <div className="flex-1 overflow-hidden mr-4">
              <div className="relative overflow-hidden">
                <style jsx>{`
                  @keyframes scroll-ticker {
                    0% {
                      transform: translateX(0);
                    }
                    100% {
                      transform: translateX(-50%);
                    }
                  }
                  .ticker-scroll {
                    animation: scroll-ticker 10s linear infinite;
                    will-change: transform;
                    transform: translateZ(0);
                  }
                  .ticker-scroll:hover {
                    animation-play-state: paused;
                  }
                `}</style>
                <div className="flex ticker-scroll">
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    <span className="text-lg">♻️</span>
                    100% Eco-Friendly E-Waste Recycling | ISO Certified | Secure Data Destruction Guaranteed
                  </span>
                  <span className="inline-flex items-center gap-2 whitespace-nowrap ml-8">
                    <span className="text-lg">♻️</span>
                    100% Eco-Friendly E-Waste Recycling | ISO Certified | Secure Data Destruction Guaranteed
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info & Social */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+919949901238" className="flex items-center gap-1 hover:text-green-300 transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span>+91 99499 01238</span>
              </a>
              <a
                href="mailto:siliconplanetrecycling@gmail.com"
                className="flex items-center gap-1 hover:text-green-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>siliconplanetrecycling@gmail.com</span>
              </a>
              <a
                href="https://wa.me/919949901238"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-green-300 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-white/20">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-300 transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`bg-white transition-all duration-300 ${
        isNavFixed 
          ? "fixed top-0 left-0 right-0 z-[1000] shadow-lg backdrop-blur-sm bg-white/95" 
          : isScrolled 
            ? "shadow-lg backdrop-blur-sm bg-white/95" 
            : ""
      }`}>
        <div className="container mx-auto md:px-4 px-2">
          <div className="flex items-center justify-between h-20 ">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" onClick={scrollToTop}>
              <Image
                src="/S.P recycling.png"
                alt="SP Recycling Pvt Ltd"
                width={288}
                height={80}
                sizes="(max-width: 768px) 256px, 288px"
                className="h-34 w-64 md:h-40 md:w-72 object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" role="navigation">
              {navigation.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.name}
                      className="relative group"
                      onMouseEnter={() => setCitiesDropdownOpen(true)}
                      onMouseLeave={() => setCitiesDropdownOpen(false)}
                    >
                      <div className="px-3 py-2 text-lg font-medium text-gray-700 hover:text-[#074E3B] relative cursor-pointer transition-colors">
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#10B981] group-hover:w-full transition-all duration-300" />
                      </div>
                      
                      {/* Dropdown Menu — CSS only (no framer-motion on critical path) */}
                      {citiesDropdownOpen && (
                          <div 
                            className="absolute top-full left-0 mt-3 w-96 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/20 rounded-2xl shadow-2xl border border-emerald-100/50 backdrop-blur-sm py-4 z-[1001] overflow-hidden"
                            onMouseEnter={() => setCitiesDropdownOpen(true)}
                            onMouseLeave={() => setCitiesDropdownOpen(false)}
                          >
                            {/* Decorative background pattern */}
                            <div className="absolute inset-0 opacity-5">
                              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#10B981_1px,_transparent_1px)] bg-[length:20px_20px]" />
                            </div>
                            
                            {/* Animated gradient border */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Arrow indicator with glow */}
                            <div className="absolute -top-2 left-8 w-5 h-5 bg-gradient-to-br from-white to-green-50 border-l border-t border-emerald-200 transform rotate-45 shadow-lg"></div>
                            
                            {/* Header */}
                            <div className="relative px-5 py-3 border-b border-emerald-100/50 bg-gradient-to-r from-green-50/50 to-emerald-50/30">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-md">
                                  <MapPin className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-gray-800">Cities We Serve</p>
                                  <p className="text-xs text-gray-500">Select your location</p>
                                </div>
                                <div className="ml-auto">
                                  <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
                                </div>
                              </div>
                            </div>
                            
                            {/* Cities Grid */}
                            <div className="relative grid grid-cols-2 gap-2 px-4 py-3">
                              {cities.map((city) => (
                                  <Link
                                    key={city.slug}
                                    href={`/services/city/${city.slug}`}
                                    className="group relative block px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#074E3B] rounded-xl transition-all duration-300 overflow-hidden"
                                  >
                                    {/* Hover background gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                                    
                                    {/* Border on hover */}
                                    <div className="absolute inset-0 border-2 border-emerald-300/0 group-hover:border-emerald-300/50 rounded-xl transition-all duration-300" />
                                    
                                    {/* Content */}
                                    <div className="relative flex items-center gap-2.5">
                                      <div className="p-1.5 bg-gradient-to-br from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200 rounded-lg transition-all duration-300 group-hover:scale-110">
                                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                                      </div>
                                      <span className="flex-1">{city.name}</span>
                                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 transform -rotate-90 group-hover:translate-x-0.5 transition-all duration-300" />
                                    </div>
                                    
                                    {/* Shine effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl" />
                                  </Link>
                              ))}
                            </div>
                            
                            {/* Footer decoration */}
                            <div className="relative px-5 py-2 border-t border-emerald-100/50 bg-gradient-to-r from-green-50/30 to-transparent">
                              <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                                <Sparkles className="w-3 h-3 text-emerald-500" />
                                <span>7+ Cities Covered</span>
                                <Sparkles className="w-3 h-3 text-emerald-500" />
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  )
                }
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2 text-lg font-medium text-gray-700 hover:text-[#074E3B] relative group transition-colors"
                    onClick={item.href === "/" ? scrollToTop : undefined}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#10B981] group-hover:w-full transition-all duration-300" />
                  </Link>
                )
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+919949901238"
                aria-label="Call SP Recycling at +91 99499 01238"
                className="inline-flex items-center justify-center size-9 rounded-md text-[#074E3B] hover:bg-accent hover:text-accent-foreground"
              >
                <Phone className="w-5 h-5" aria-hidden />
              </a>
              <a
                href="https://wa.me/919949901238"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp with SP Recycling"
                className="inline-flex items-center justify-center size-9 rounded-md text-[#25D366] hover:bg-accent hover:text-accent-foreground"
              >
                <MessageCircle className="w-5 h-5" aria-hidden />
              </a>
              <Button 
                onClick={() => setPickupModalOpen(true)}
                className="bg-[#10B981] hover:bg-[#059669] text-white rounded-full px-6"
              >
                Schedule Pickup
              </Button>
            </div>

            {/* Mobile Menu — Sheet/Radix chunk only when opened (TBT) */}
            <Button
              variant="ghost"
              className="lg:hidden !w-20 !h-20 !p-2"
              aria-label="Open navigation menu"
              onClick={() => {
                setMobileMenuMounted(true)
                setMobileMenuOpen(true)
              }}
            >
              <Menu className="!w-8 !h-8" aria-hidden />
            </Button>
            {mobileMenuMounted ? (
              <HeaderMobileMenu
                open={mobileMenuOpen}
                onOpenChange={setMobileMenuOpen}
                onPickup={() => {
                  setPickupModalLoaded(true)
                  setPickupModalOpen(true)
                }}
                navigation={navigation}
                cities={cities}
                socialLinks={socialLinks}
                mobileCitiesOpen={mobileCitiesOpen}
                setMobileCitiesOpen={setMobileCitiesOpen}
              />
            ) : null}
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919949901238"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-125 z-50 animate-bounce [transform:translateZ(0)] will-change-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Pickup Form Modal — JS loaded only after first open */}
      {pickupModalLoaded ? (
        <PickupFormModal open={pickupModalOpen} onOpenChange={setPickupModalOpen} />
      ) : null}
    </header>
  )
}
