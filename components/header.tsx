"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Phone, Mail, Menu, Facebook, Linkedin, Twitter, Instagram, MessageCircle, ChevronDown, MapPin, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PickupFormModal } from "@/components/pickup-form-modal"

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
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isNavFixed, setIsNavFixed] = useState(false)
  const [pickupModalOpen, setPickupModalOpen] = useState(false)
  const [citiesDropdownOpen, setCitiesDropdownOpen] = useState(false)
  const [mobileCitiesOpen, setMobileCitiesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide top bar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowTopBar(false)
      } else if (currentScrollY < lastScrollY) {
        setShowTopBar(true)
      }

      // Fix navigation bar when scrolled past ticker height
      setIsNavFixed(currentScrollY > 48) // 48px is ticker height
      setIsScrolled(currentScrollY > 10)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

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
                      
                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {citiesDropdownOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
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
                              {cities.map((city, index) => (
                                <motion.div
                                  key={city.slug}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05, duration: 0.2 }}
                                >
                                  <Link
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
                                </motion.div>
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
                          </motion.div>
                        )}
                      </AnimatePresence>
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
              <a href="tel:+919949901238" aria-label="Call us">
                <Button variant="ghost" size="icon" className="text-[#074E3B]">
                  <Phone className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://wa.me/919949901238" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <Button variant="ghost" size="icon" className="text-[#25D366]">
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </a>
              <Button 
                onClick={() => setPickupModalOpen(true)}
                className="bg-[#10B981] hover:bg-[#059669] text-white rounded-full px-6"
              >
                Schedule Pickup
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" className="!w-20 !h-20 !p-2">
                  <Menu className="!w-8 !h-8" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 p-4">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8 pt-4">
                    <Image src="/S.P recycling.png" alt="SP Recycling" width={180} height={50} className="h-10 w-auto" />
                  </div>

                  <nav className="flex flex-col gap-1 flex-1">
                    {navigation.map((item) => {
                      if (item.hasDropdown) {
                        return (
                          <div key={item.name}>
                            <button
                              onClick={() => setMobileCitiesOpen(!mobileCitiesOpen)}
                              className="w-full px-4 py-3 text-base font-medium text-gray-700 hover:bg-gradient-to-r hover:from-green-70 hover:to-emerald-70 hover:text-[#074E3B] rounded-lg transition-all duration-300 flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-emerald-600" />
                                <span>{item.name}</span>
                              </div>
                              <ChevronDown 
                                className={`w-4 h-4 text-emerald-600 transform transition-transform duration-200 ${mobileCitiesOpen ? 'rotate-180' : ''}`}
                              />
                            </button>
                            <AnimatePresence>
                              {mobileCitiesOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-4 pr-2 py-3 grid grid-cols-2 gap-2 bg-gradient-to-br from-green-50/50 to-emerald-50/30 rounded-lg border border-emerald-100/50">
                                    {cities.map((city, index) => (
                                      <motion.div
                                        key={city.slug}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                      >
                                        <Link
                                          href={`/services/city/${city.slug}`}
                                          onClick={() => {
                                            setMobileMenuOpen(false)
                                            setMobileCitiesOpen(false)
                                          }}
                                          className="group relative block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#074E3B] rounded-lg transition-all duration-300 overflow-hidden"
                                        >
                                          {/* Hover background */}
                                          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                                          
                                          {/* Content */}
                                          <div className="relative flex items-center gap-2">
                                            <div className="p-1 bg-gradient-to-br from-green-200 to-emerald-200 rounded-md group-hover:scale-110 transition-transform duration-300">
                                              <MapPin className="w-3 h-3 text-emerald-700" />
                                            </div>
                                            <span className="flex-1">{city.name}</span>
                                          </div>
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )
                      }
                      
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-green-50 hover:text-[#074E3B] rounded-lg transition-colors"
                        >
                          {item.name}
                        </Link>
                      )
                    })}
                  </nav>

                  <div className="border-t pt-6 space-y-4">
                    <Button 
                      onClick={() => {
                        setPickupModalOpen(true)
                        setMobileMenuOpen(false)
                      }}
                      className="w-full bg-[#10B981] hover:bg-[#059669] text-white rounded-full"
                    >
                      Schedule Pickup
                    </Button>

                    <div className="space-y-2 text-sm">
                      <a
                        href="tel:+919949901238"
                        className="flex items-center gap-2 text-gray-600 hover:text-[#074E3B]"
                      >
                        <Phone className="w-4 h-4" />
                        <span>+91 99499 01238</span>
                      </a>
                      <a
                        href="mailto:siliconplanetrecycling@gmail.com"
                        className="flex items-center gap-2 text-gray-600 hover:text-[#074E3B]"
                      >
                        <Mail className="w-4 h-4" />
                        <span>siliconplanetrecycling@gmail.com</span>
                      </a>
                      <a
                        href="https://wa.me/919949901238"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 hover:text-[#25D366]"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-[#074E3B] transition-colors"
                          aria-label={social.name}
                        >
                          <social.icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919949901238"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-125 z-50 animate-bounce"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Pickup Form Modal */}
      <PickupFormModal 
        open={pickupModalOpen} 
        onOpenChange={setPickupModalOpen} 
      />
    </header>
  )
}
