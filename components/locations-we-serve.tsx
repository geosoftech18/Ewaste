import Link from "next/link"
import { MapPin, ArrowRight, Truck, Building2, Recycle } from "lucide-react"
import { getAllCities } from "@/lib/city-data"

const CITY_ORDER = [
  "mumbai",
  "pune",
  "hyderabad",
  "chennai",
  "delhi",
  "bangalore",
  "gujarat",
  "andhra-pradesh",
] as const

const highlights = [
  { icon: Truck, label: "Doorstep collection" },
  { icon: Building2, label: "Bulk corporate pickup" },
  { icon: Recycle, label: "Certified recycling" },
]

export function LocationsWeServe() {
  const citiesBySlug = Object.fromEntries(getAllCities().map((c) => [c.slug, c]))
  const cities = CITY_ORDER.map((slug) => citiesBySlug[slug]).filter(Boolean)

  return (
    <section
      id="locations-we-serve"
      className="relative overflow-hidden py-16 sm:py-24"
      aria-labelledby="locations-we-serve-heading"
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-50/80 via-white to-teal-50/40" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(16 185 129 / 0.18) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-teal-200/25 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 shadow-sm backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Locations we serve
          </p>

          <h2
            id="locations-we-serve-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
          >
            Reliable E-Waste Recycling Services Across India
          </h2>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            SP Recycling provides doorstep collection, bulk e-waste pickup, and certified recycling
            services for businesses, industries, institutions, and households. Whether you&apos;re
            disposing of IT assets, electronic equipment, batteries, or scrap, our team ensures safe
            collection and environmentally responsible recycling.
          </p>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {highlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/90 px-3.5 py-2 text-sm font-medium text-emerald-900 shadow-sm"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {cities.map((city, index) => (
            <li key={city.slug} style={{ animationDelay: `${index * 40}ms` }}>
              <Link
                href={`/services/city/${city.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-100/90 bg-white p-4 shadow-[0_8px_30px_-18px_rgba(6,78,59,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_18px_40px_-20px_rgba(6,78,59,0.45)] sm:p-5"
                aria-label={`E-waste recycling services in ${city.name}`}
              >
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-emerald-500 to-teal-500 transition-transform duration-300 group-hover:scale-x-100" />

                <div className="mb-4 flex items-start justify-between gap-2">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25 transition-transform duration-300 group-hover:scale-105">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <ArrowRight className="h-4 w-4 text-emerald-600/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-emerald-700" />
                </div>

                <h3 className="text-lg font-bold text-foreground sm:text-xl">{city.name}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Doorstep pickup &amp; certified recycling in {city.name}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                  View services
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link
            href="/services/city"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:bg-emerald-800 hover:shadow-xl"
          >
            Explore all service cities
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
