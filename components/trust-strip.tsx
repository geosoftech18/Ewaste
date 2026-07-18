import type React from "react"
import { Phone, Clock, Shield, Award, Factory, Truck } from "lucide-react"

interface USPItem {
  icon: React.ReactNode
  title: string
  subtitle?: string
  href?: string
  countUp?: { start: number; end: number; suffix: string }
}

export function TrustStrip() {
  // Final values from first paint — better Speed Index, no counter timers (TBT)
  const counters: { [key: number]: number } = {
    3: 10,
    4: 20,
  }

  const uspItems: USPItem[] = [
    {
      icon: <Phone className="w-7 h-7" />,
      title: "Call Us",
      subtitle: "+91 9949901238",
      href: "tel:+919949901238",
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "24/7 Support",
      subtitle: "Always Available",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "100% Satisfaction",
      subtitle: "Guaranteed Quality",
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Years Experience",
      subtitle: "",
      countUp: { start: 0, end: 10, suffix: "+ Years" },
    },
    {
      icon: <Factory className="w-7 h-7" />,
      title: "Industries Served",
      subtitle: "",
      countUp: { start: 0, end: 20, suffix: "+ Industries" },
    },
    {
      icon: <Truck className="w-7 h-7" />,
      title: "Same Day Pickup",
      subtitle: "Fast Service",
    },
  ]

  return (
    <div
      className="w-full bg-gradient-to-r from-emerald-50 via-white to-emerald-50 shadow-md py-6 md:py-8"
      role="contentinfo"
      aria-label="Trust and service highlights"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 opacity-100 translate-y-0">
          {uspItems.map((item, index) => {
            const ItemWrapper = item.href ? "a" : "div"
            const wrapperProps = item.href ? { href: item.href, className: "block" } : {}

            return (
              <ItemWrapper key={index} {...wrapperProps}>
                <div className="flex flex-col items-center text-center p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg group cursor-pointer">
                  <div className="text-[#10B981] mb-3 transition-all duration-300 group-hover:scale-110 group-hover:text-[#074E3B]">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base mb-1">{item.title}</h3>
                  {item.countUp ? (
                    <p className="text-xs md:text-sm text-gray-600 font-medium">
                      {counters[index] ?? item.countUp.end}
                      {item.countUp.suffix}
                    </p>
                  ) : (
                    item.subtitle && (
                      <p
                        className={`text-xs md:text-sm ${
                          item.href ? "text-[#10B981] font-semibold group-hover:text-[#074E3B]" : "text-gray-600"
                        }`}
                      >
                        {item.subtitle}
                      </p>
                    )
                  )}
                </div>
              </ItemWrapper>
            )
          })}
        </div>
      </div>
    </div>
  )
}
