"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  MapPinned,
  Phone,
  MessageCircle,
  Shield,
  Truck,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PickupFormModal } from "@/components/pickup-form-modal"
import FAQ from "@/components/service/FAQ"
import type { HyderabadAreaData } from "@/data/hyderabad-areas"
import { hyderabadAreas } from "@/data/hyderabad-areas"

export function HyderabadAreaPage({ area }: { area: HyderabadAreaData }) {
  const [pickupOpen, setPickupOpen] = useState(false)
  const otherAreas = hyderabadAreas.filter((item) => item.slug !== area.slug)

  const secondaryIsWhatsApp = area.secondaryCta.href.includes("wa.me")

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={area.image}
            alt={area.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${area.accent} opacity-50`} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.18),transparent_55%)]" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <nav className="mb-8 text-sm text-white/80" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/services/city/hyderabad" className="hover:text-white">
                  Hyderabad
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-white">{area.cardTitle}</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
              <MapPinned className="h-3.5 w-3.5" aria-hidden />
              Hyderabad service corridor
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {area.h1}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
              {area.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="bg-white text-emerald-900 hover:bg-white/90"
                onClick={() => setPickupOpen(true)}
              >
                {area.primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10"
                asChild
              >
                <a
                  href={area.secondaryCta.href}
                  {...(secondaryIsWhatsApp
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {secondaryIsWhatsApp ? (
                    <MessageCircle className="mr-2 h-4 w-4" />
                  ) : (
                    <Phone className="mr-2 h-4 w-4" />
                  )}
                  {area.secondaryCta.label}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Collect + process graphical grid */}
      <section className="relative py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.08),transparent_40%)]" />
        <div className="container relative mx-auto grid gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-[0_20px_50px_-30px_rgba(6,95,70,0.45)] sm:p-8">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <Building2 className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {area.collectHeading}
            </h2>
            <ul className="mt-6 space-y-3.5">
              {area.collectItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50/80 to-white p-7 shadow-[0_20px_50px_-30px_rgba(13,148,136,0.4)] sm:p-8">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-white">
              <Truck className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {area.processHeading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {area.processBody}
            </p>
            {area.processPoints?.length ? (
              <ul className="mt-6 space-y-3">
                {area.processPoints.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 rounded-xl border border-teal-100/80 bg-white/70 px-3.5 py-3 text-sm text-foreground"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-teal-500" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        </div>
      </section>

      {/* Highlight band */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className={`absolute inset-0 bg-gradient-to-r ${area.accent}`} />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 0, transparent 45%), radial-gradient(circle at 80% 70%, white 0, transparent 40%)",
          }}
        />
        <div className="container relative mx-auto grid gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              <Shield className="h-3.5 w-3.5" aria-hidden />
              Certified process
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {area.highlightHeading}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90">
              {area.highlightBody}
            </p>
          </div>
          {area.paperworkHeading ? (
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700">
                <FileCheck2 className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold text-white">{area.paperworkHeading}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{area.paperworkBody}</p>
            </div>
          ) : (
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700">
                <FileCheck2 className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold text-white">Paperwork with every pickup</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                Weighed receipt, Form 6 where required, and certificates of destruction or recycling —
                so your audit trail is ready.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Areas covered */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Areas covered on this page
            </h2>
            <p className="mt-3 text-muted-foreground">
              Doorstep and campus pickup across these Hyderabad neighbourhoods.
            </p>
          </div>
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {area.areasCovered.map((name) => (
              <span
                key={name}
                className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-900"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FAQ faqs={area.faqs} />

      {/* CTA strip */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900" />
        <div className="absolute -right-10 top-0 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to schedule a pickup?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Share your asset list or call us — we&apos;ll confirm access rules, timing and paperwork
            for {area.cardTitle}.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-white text-emerald-900 hover:bg-white/90"
              onClick={() => setPickupOpen(true)}
            >
              {area.primaryCta.label}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10"
              asChild
            >
              <a href={area.secondaryCta.href}>{area.secondaryCta.label}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Other corridors */}
      <section className="border-t border-border bg-muted/30 py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                More Hyderabad service areas
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Explore neighbouring corridors we serve across the city.
              </p>
            </div>
            <Link
              href="/services/city/hyderabad#locations-in-hyderabad"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              All Hyderabad locations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {otherAreas.map((item) => (
              <Link
                key={item.slug}
                href={`/services/city/hyderabad/${item.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative h-36">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="font-semibold text-white">{item.cardTitle}</p>
                    <p className="text-xs text-white/80">{item.cardSubtitle}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PickupFormModal
        open={pickupOpen}
        onOpenChange={setPickupOpen}
        defaultCity="Hyderabad"
      />
    </div>
  )
}
