"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAllCities } from "@/lib/city-data"

const cities = getAllCities().map((city) => ({
  name: city.name,
  slug: city.slug,
  image: city.heroImage || "/placeholder.svg",
}))

export function ServiceCities() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(5)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(2)
      else if (window.innerWidth < 768) setItemsPerView(2)
      else if (window.innerWidth < 1024) setItemsPerView(3)
      else if (window.innerWidth < 1280) setItemsPerView(4)
      else setItemsPerView(5)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (cities.length === 0) return null

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, cities.length - itemsPerView) : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= cities.length - itemsPerView ? 0 : prev + 1))
  }

  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            E-Waste Recycling Services Across India
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We serve major cities and regions across India with our professional e-waste recycling services
          </p>
        </div>

        <div className="relative">
          <div ref={carouselRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {cities.map((city, index) => (
                <div key={city.slug} className="flex-shrink-0" style={{ width: `${100 / itemsPerView}%` }}>
                  <div className="px-2 sm:px-3 md:px-4 h-full">
                    <Link
                      href={`/services/city/${city.slug}`}
                      className="relative group h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer animate-scale-in block"
                      style={{ animationDelay: `${(index % itemsPerView) * 0.05}s` }}
                      aria-label={`E-waste recycling in ${city.name}`}
                    >
                      <img
                        src={city.image || "/placeholder.svg"}
                        alt={`E-waste recycling services in ${city.name}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl sm:text-2xl font-bold text-white text-balance">{city.name}</h3>
                        <p className="text-sm text-emerald-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          Service Available
                        </p>
                      </div>

                      <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Active
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 gap-4">
            <Button
              onClick={handlePrev}
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
              aria-label="Previous cities"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex gap-2 flex-wrap justify-center">
              {Array.from({ length: Math.ceil(cities.length / itemsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === Math.floor(currentIndex / itemsPerView)
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to carousel page ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
              aria-label="Next cities"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="text-center mt-6 text-sm text-muted-foreground">
            Showing {Math.min(itemsPerView, cities.length - currentIndex)} of {cities.length} cities
          </div>
        </div>
      </div>
    </section>
  )
}
