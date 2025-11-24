"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Phone, Mail, Menu, Facebook, Linkedin, Twitter, Instagram, MessageCircle } from "lucide-react"
import { PickupFormModal } from "@/components/pickup-form-modal"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact Us", href: "/contact" },
  { name: "Read Our Blog", href: "/blog" },
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
                href="mailto:sprecycling563@gmail.com"
                className="flex items-center gap-1 hover:text-green-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>sprecycling563@gmail.com</span>
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
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 ">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" onClick={scrollToTop}>
              <Image
                src="/sp-logo.png"
                alt="SP Recycling Pvt Ltd"
                width={220}
                height={220}
                className="h-32 w-50 md:h-36 md:w-72"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" role="navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-lg font-medium text-gray-700 hover:text-[#074E3B] relative group transition-colors"
                  onClick={item.href === "/" ? scrollToTop : undefined}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#10B981] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
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
                    <Image src="/elogo.webp" alt="SP Recycling" width={180} height={50} className="h-10 w-auto" />
                  </div>

                  <nav className="flex flex-col gap-1 flex-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-green-50 hover:text-[#074E3B] rounded-lg transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
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
                        href="mailto:sprecycling563@gmail.com"
                        className="flex items-center gap-2 text-gray-600 hover:text-[#074E3B]"
                      >
                        <Mail className="w-4 h-4" />
                        <span>sprecycling563@gmail.com</span>
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
