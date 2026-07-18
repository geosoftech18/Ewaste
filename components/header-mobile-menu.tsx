"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  MapPin,
  type LucideIcon,
} from "lucide-react"

type NavItem = { name: string; href: string; hasDropdown?: boolean }
type City = { name: string; slug: string }
type Social = { name: string; icon: LucideIcon; href: string }

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPickup: () => void
  navigation: NavItem[]
  cities: City[]
  socialLinks: Social[]
  mobileCitiesOpen: boolean
  setMobileCitiesOpen: (open: boolean) => void
}

/** Radix Sheet lives in this chunk — only downloaded when the mobile menu is opened */
export function HeaderMobileMenu({
  open,
  onOpenChange,
  onPickup,
  navigation,
  cities,
  socialLinks,
  mobileCitiesOpen,
  setMobileCitiesOpen,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-80 p-4">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8 pt-4">
            <Image
              src="/S.P recycling.png"
              alt="SP Recycling"
              width={180}
              height={50}
              className="h-10 w-auto"
            />
          </div>

          <nav className="flex flex-col gap-1 flex-1">
            {navigation.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div key={item.name}>
                    <button
                      type="button"
                      onClick={() => setMobileCitiesOpen(!mobileCitiesOpen)}
                      className="w-full px-4 py-3 text-base font-medium text-gray-700 hover:bg-gradient-to-r hover:from-green-70 hover:to-emerald-70 hover:text-[#074E3B] rounded-lg transition-all duration-300 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-emerald-600 transform transition-transform duration-200 ${
                          mobileCitiesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileCitiesOpen && (
                      <div className="overflow-hidden">
                        <div className="pl-4 pr-2 py-3 grid grid-cols-2 gap-2 bg-gradient-to-br from-green-50/50 to-emerald-50/30 rounded-lg border border-emerald-100/50">
                          {cities.map((city) => (
                            <Link
                              key={city.slug}
                              href={`/services/city/${city.slug}`}
                              onClick={() => {
                                onOpenChange(false)
                                setMobileCitiesOpen(false)
                              }}
                              className="group relative block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#074E3B] rounded-lg transition-all duration-300 overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                              <div className="relative flex items-center gap-2">
                                <div className="p-1 bg-gradient-to-br from-green-200 to-emerald-200 rounded-md group-hover:scale-110 transition-transform duration-300">
                                  <MapPin className="w-3 h-3 text-emerald-700" />
                                </div>
                                <span className="flex-1">{city.name}</span>
                              </div>
                            </Link>
                          ))}
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
                  onClick={() => onOpenChange(false)}
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
                onPickup()
                onOpenChange(false)
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
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#074E3B] transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
