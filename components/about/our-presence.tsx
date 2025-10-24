"use client"

import { useState } from "react"
import { MapPin, Factory, Truck, Recycle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface City {
  name: string
  x: number
  y: number
  volume?: string
}

const cities: City[] = [
  { name: "Delhi", x: 28, y: 28, volume: "2,500+ tons/year" },
  { name: "Ahmedabad", x: 22, y: 42, volume: "1,800+ tons/year" },
  { name: "Mumbai", x: 20, y: 52, volume: "3,200+ tons/year" },
  { name: "Pune", x: 25, y: 58, volume: "1,500+ tons/year" },
  { name: "Hyderabad", x: 35, y: 65, volume: "4,000+ tons/year" },
  { name: "Bengaluru", x: 32, y: 75, volume: "2,800+ tons/year" },
  { name: "Chennai", x: 42, y: 72, volume: "2,200+ tons/year" },
]

export function OurPresence() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  return (
    <section id="our-presence" className="relative py-24 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-chart-2/5" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          >
            {i % 3 === 0 ? (
              <Recycle className="w-4 h-4 text-primary" />
            ) : i % 3 === 1 ? (
              <div className="w-2 h-2 rounded-full bg-accent" />
            ) : (
              <div className="w-1 h-1 rounded-full bg-primary" />
            )}
          </div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            Our Presence
          </Badge>
          <h2 className="text-2xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Nationwide E-Waste Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We collect and recycle e-waste across major cities in India, making sustainable disposal accessible to
            everyone.
          </p>
        </div>

        
        {/* Corporate Office Section */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Office Information */}
          <Card className="border-2 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Factory className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">Corporate Office</h3>
                  <Badge variant="secondary" className="text-xs">
                    Head Office - Hyderabad
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Address</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Plot No. 123, HITEC City,
                      <br />
                      Madhapur, Hyderabad - 500081,
                      <br />
                      Telangana, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Operations</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      24/7 Collection & Processing Facility
                      <br />
                      ISO 14001:2015 Certified
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Recycle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Capacity</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Processing capacity: 10,000+ tons annually
                      <br />
                      Serving 7 major cities across India
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Contact Information</p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-foreground">Phone:</span>{" "}
                    <a href="tel:+911234567890" className="text-primary hover:underline">
                      +91 123 456 7890
                    </a>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-foreground">Email:</span>{" "}
                    <a href="mailto:info@sprecycling.com" className="text-primary hover:underline">
                      info@sprecycling.com
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Embedded Google Map */}
          <Card className="border-2 shadow-xl overflow-hidden h-full">
            <CardContent className="p-0 h-full min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6939383814744!2d78.38897631487694!3d17.42489288805394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb974c6e5e5c8f%3A0x6e5e5c8f6e5e5c8f!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "500px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SP Recycling Corporate Office Location"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
