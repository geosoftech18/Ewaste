"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, MapPin, Recycle } from "lucide-react"
import { hyderabadAreas } from "@/data/hyderabad-areas"

export function HyderabadLocationsServed() {
  return (
    <section
      id="locations-in-hyderabad"
      className="relative overflow-hidden py-16 sm:py-24"
      aria-labelledby="hyderabad-locations-heading"
    >
      {/* Graphical backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-teal-50/40" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(16,185,129,0.18) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-teal-400/15 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 shadow-sm backdrop-blur">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Locations we serve in Hyderabad
          </div>
          <h2
            id="hyderabad-locations-heading"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            E-waste pickup across Hyderabad&apos;s key corridors
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            From HITEC City towers to east Hyderabad factories — choose your area for local pickup
            details, data destruction options and Form 6 paperwork.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {hyderabadAreas.map((area, index) => (
            <Link
              key={area.slug}
              href={`/services/city/hyderabad/${area.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-100/80 bg-white shadow-[0_12px_40px_-18px_rgba(6,95,70,0.35)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(6,95,70,0.45)]"
              style={{ animationDelay: `${index * 60}ms` }}
              aria-label={`E-waste recycling in ${area.cardTitle}`}
            >
              <div className="relative h-48 overflow-hidden sm:h-52">
                <Image
                  src={area.image}
                  alt={area.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${area.accent} opacity-55 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                  <Recycle className="h-3 w-3" aria-hidden />
                  Service area
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white drop-shadow-sm">{area.cardTitle}</h3>
                  <p className="mt-1 text-sm text-white/85">{area.cardSubtitle}</p>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex flex-wrap gap-1.5">
                  {area.cardAreas.map((name) => (
                    <span
                      key={name}
                      className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800 ring-1 ring-emerald-100"
                    >
                      {name}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between pt-1 text-sm font-semibold text-emerald-700">
                  <span>View area guide</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
