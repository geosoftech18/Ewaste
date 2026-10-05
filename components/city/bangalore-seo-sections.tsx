"use client"

import Link from "next/link"
import {
  FileCheck2,
  Clock3,
  MapPinned,
  Shield,
  Building2,
  Factory,
  Home,
  Cpu,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  Scale,
  Recycle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PickupFormModal } from "@/components/pickup-form-modal"
import { useState } from "react"

const pickupRows = [
  {
    type: "Urgent (small lot, within BBMP)",
    response: "Callback within 1 hour in working hours",
    pickup: "Same day, subject to slot availability",
  },
  {
    type: "Standard office or campus clearance",
    response: "Quote within 24 hours",
    pickup: "Within 24–48 hours of confirmation",
  },
  {
    type: "Bulk decommissioning (100+ assets, server rooms)",
    response: "Site visit and written quote",
    pickup: "Scheduled date after confirmation",
  },
  {
    type: "On-site data destruction",
    response: "Aligned with your clearance plan",
    pickup: "Done at your premises, witnessed by your team",
  },
]

const corridors = [
  {
    icon: Building2,
    title: "Whitefield, Marathahalli, Brookefield & Mahadevapura",
    body: "East Bangalore’s tech parks drive laptop refresh cycles, office moves, and storage upgrades. We plan gate passes and after-hours slots for managed campuses.",
    points: [
      "Laptop and desktop refresh batches with asset-tag reconciliation",
      "Server, storage and network rack decommissioning",
      "Building-access scheduling for SEZ and tech-park security",
      "On-site hard drive shredding or degaussing when required",
    ],
  },
  {
    icon: Cpu,
    title: "Electronic City, Bommasandra, Hosur Road & Sarjapur",
    body: "Large campuses and manufacturing-adjacent offices need bulk ITAD, UPS banks and recurring scrap runs.",
    points: [
      "Bulk corporate IT and lab electronics",
      "Monthly or quarterly collection plans",
      "UPS, battery and networking scrap with documentation",
      "Escorted off-site destruction for large drive volumes",
    ],
  },
  {
    icon: Factory,
    title: "Manyata, Hebbal, Yelahanka, Peenya & Outer Ring Road",
    body: "North and industrial belts generate warehouse IT, plant electronics and mixed office scrap.",
    points: [
      "Industrial and warehouse electronics",
      "Scheduled pickups for recurring volumes",
      "Circuit boards, PLC panels and office IT",
      "Weighment and Form 6 trail for audits",
    ],
  },
  {
    icon: Home,
    title: "Koramangala, Indiranagar, Jayanagar, HSR & Greater Bengaluru",
    body: "Startups, co-working spaces, hospitals, schools and housing societies across BBMP get doorstep pickup. Households can sell old laptops, phones and appliances.",
    points: [
      "Doorstep pickup across BBMP limits",
      "Startup-friendly small and mid lots",
      "Residential appliance and gadget clearances",
      "Indicative scrap rates shown on this page",
    ],
  },
]

const destructionMethods = [
  {
    method: "Hard drive shredding (on-site)",
    bestFor: "HDDs, SSDs and tapes that must not be reused",
    result: "Physically destroyed; certificate issued",
  },
  {
    method: "Degaussing",
    bestFor: "Magnetic HDDs and backup tapes",
    result: "Magnetic data erased; media then shredded or recycled",
  },
  {
    method: "Certified software wiping",
    bestFor: "Laptops and desktops with resale value",
    result: "Wipe report per device with serial numbers listed",
  },
  {
    method: "Off-site destruction under escort",
    bestFor: "Large volumes with limited space on-site",
    result: "Sealed, tracked transport; destruction at our facility",
  },
]

const processSteps = [
  {
    title: "Share the list",
    text: "Send asset counts or a spreadsheet by category. A rough count is fine for a quote.",
  },
  {
    title: "Get a written quote",
    text: "IT assets with resale or scrap value are priced on current rates. Zero-value items are listed clearly — disposal cost is not hidden.",
  },
  {
    title: "Schedule",
    text: "Pick a date. We confirm vehicle, team and gate-pass details for your Bangalore campus.",
  },
  {
    title: "Collect and weigh",
    text: "Items are counted against your list and weighed in front of your team.",
  },
  {
    title: "Destroy",
    text: "Data destruction is done on-site or at our authorized facility, as agreed.",
  },
  {
    title: "Receive documents",
    text: "Form 6 manifest, weighment slip, certificate of destruction and recycling certificate.",
  },
]

const businessItems = [
  "Laptops, desktops, servers, storage arrays",
  "Switches, routers, firewalls, printers and copiers",
  "Monitors, UPS units and batteries",
  "Data-centre and lab electronics",
  "Industrial panels and circuit boards",
  "Hard drives, SSDs and backup tapes",
]

const householdItems = [
  "Laptops, phones, tablets, TVs",
  "Refrigerators, ACs, washing machines",
  "Small appliances, chargers and cables",
  "Metal scrap",
]

const comparisonRows = [
  {
    label: "Pollution board authorization",
    us: "CPCB-authorized recycling channel",
    them: "Usually none",
  },
  {
    label: "Transport manifest",
    us: "Form 6 on every consignment",
    them: "None",
  },
  {
    label: "Data handling",
    us: "Certified destruction with certificate",
    them: "None, or a verbal promise",
  },
  {
    label: "Proof for your auditor",
    us: "Weighment slip, destruction & recycling certificates",
    them: "A handwritten slip, if anything",
  },
  {
    label: "Legal exposure",
    us: "Lower — waste goes to an authorized facility",
    them: "Higher — hard to prove where waste went",
  },
]

/**
 * Bangalore-only SEO content blocks. Additive — does not replace hero, rates, metadata, or other cities.
 * FAQs live in city-data / the existing FAQ section.
 */
export function BangaloreSeoSections() {
  const [pickupOpen, setPickupOpen] = useState(false)

  return (
    <div className="bg-background">
      <section className="border-y border-emerald-100 bg-emerald-50/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-xs sm:text-sm font-semibold text-emerald-900">
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-emerald-600" />
              CPCB Authorized
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPinned className="h-3.5 w-3.5 text-emerald-600" />
              Serving BBMP & tech corridors
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileCheck2 className="h-3.5 w-3.5 text-emerald-600" />
              Form 6 manifest on every pickup
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Recycle className="h-3.5 w-3.5 text-emerald-600" />
              Certificate of destruction
            </span>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Clock3 className="h-3.5 w-3.5" />
              Pickup timelines
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Pickup times at a glance
            </h2>
            <p className="mt-2 text-muted-foreground">
              Working hours: Mon–Sat, 9 AM–6 PM. Call{" "}
              <a href="tel:+919949901238" className="font-medium text-primary hover:underline">
                +91 99499 01238
              </a>{" "}
              for urgent slots within BBMP.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-emerald-50/80 text-emerald-950">
                  <tr>
                    <th className="px-4 py-3 font-semibold sm:px-5">Request type</th>
                    <th className="px-4 py-3 font-semibold sm:px-5">Response</th>
                    <th className="px-4 py-3 font-semibold sm:px-5">Pickup</th>
                  </tr>
                </thead>
                <tbody>
                  {pickupRows.map((row, i) => (
                    <tr key={row.type} className={i % 2 === 0 ? "bg-white" : "bg-muted/30"}>
                      <td className="px-4 py-3.5 font-medium text-foreground sm:px-5">
                        {row.type}
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground sm:px-5">
                        {row.response}
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground sm:px-5">
                        {row.pickup}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-14 sm:py-16 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white">
        <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-100">
              <FileCheck2 className="h-3.5 w-3.5" />
              Compliance first
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Why Bangalore businesses ask for our paperwork first
            </h2>
            <p className="mt-3 text-emerald-50/85 leading-relaxed">
              In Bangalore’s IT parks, a pickup without records is a compliance gap. Six months later
              nobody can prove where retired laptops or drives went — a risk under the E-Waste
              (Management) Rules and a data risk if storage media was in the load. We treat
              documentation as part of the job, not an extra.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Authorization",
                text: "CPCB-authorized e-waste recycling channel. Ask for copies before you book, and verify recyclers on the CPCB website.",
              },
              {
                title: "Form 6 manifest",
                text: "Every consignment moves under a Form 6 manifest so the load can be traced from your Bangalore gate to our authorized facility.",
              },
              {
                title: "IT corridors",
                text: "Whitefield, Electronic City, ORR, Manyata, Koramangala and more — with security and gate-pass coordination for campuses.",
              },
              {
                title: "What you receive",
                text: "Form 6 manifest, weighed receipt, and a certificate of destruction or recycling with every pickup.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <h3 className="mb-2 font-semibold text-white">{card.title}</h3>
                <p className="text-sm leading-relaxed text-emerald-50/80">{card.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="bg-emerald-500 text-white hover:bg-emerald-400"
              onClick={() => setPickupOpen(true)}
            >
              Get a bulk quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href="tel:+919949901238">
                <Phone className="mr-2 h-4 w-4" />
                Call +91 99499 01238
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a
                href="https://wa.me/919949901238?text=Hi%20SP%20Recycling%2C%20I%20need%20IT%20scrap%20pickup%20in%20Bangalore"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp us
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <MapPinned className="h-3.5 w-3.5" />
              Local coverage
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Serving Bangalore&apos;s IT corridors and industrial belts
            </h2>
            <p className="mt-2 text-muted-foreground">
              Bangalore&apos;s e-waste comes from tech parks, startups, factories and homes — each needs
              a different pickup plan.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {corridors.map((area) => {
              const Icon = area.icon
              return (
                <article
                  key={area.title}
                  className="rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground leading-snug">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{area.body}</p>
                  <ul className="mt-4 space-y-2">
                    {area.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm text-foreground/90">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Shield className="h-3.5 w-3.5" />
                ITAD & data security
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                On-site data destruction for Bangalore enterprises
              </h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                If a drive leaves your building intact, you are trusting someone else with your data.
                For NDA-bound product teams and enterprises, we can destroy media at your premises.
              </p>
            </div>
            <Link
              href="/services/data-destruction"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Data destruction services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-slate-50 text-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold sm:px-5">Method</th>
                    <th className="px-4 py-3 font-semibold sm:px-5">Best for</th>
                    <th className="px-4 py-3 font-semibold sm:px-5">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {destructionMethods.map((row, i) => (
                    <tr key={row.method} className={i % 2 === 0 ? "bg-white" : "bg-muted/30"}>
                      <td className="px-4 py-3.5 font-medium sm:px-5">{row.method}</td>
                      <td className="px-4 py-3.5 text-muted-foreground sm:px-5">{row.bestFor}</td>
                      <td className="px-4 py-3.5 text-muted-foreground sm:px-5">{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            You receive a certificate of destruction listing each serial number, the method used, the
            date, and who witnessed it. Photos or video of the process are available on request for
            audits.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-emerald-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              How a corporate pickup works in Bangalore
            </h2>
            <p className="mt-2 text-muted-foreground">
              A clear sequence from asset list to compliance documents.
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                className="relative rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"
              >
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="mb-8 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            What we collect in Bangalore
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">For businesses</h3>
              <ul className="space-y-2.5">
                {businessItems.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">For households</h3>
              <ul className="space-y-2.5">
                {householdItems.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted-foreground">
                Call before booking if you have damaged lithium batteries or unusual equipment — we
                will confirm whether it can be collected.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Scale className="h-3.5 w-3.5" />
                Compare before you book
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Authorized recycler or local scrap dealer?
              </h2>
            </div>
            <Link
              href="/compare/authorized-recycler-vs-local-scrap-dealer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Full comparison guide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-3 font-semibold sm:px-5" />
                    <th className="px-4 py-3 font-semibold text-emerald-800 sm:px-5">
                      Authorized recycler (SP Recycling)
                    </th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground sm:px-5">
                      Informal scrap dealer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-muted/30"}>
                      <td className="px-4 py-3.5 font-medium text-foreground sm:px-5">
                        {row.label}
                      </td>
                      <td className="px-4 py-3.5 text-emerald-900 sm:px-5">{row.us}</td>
                      <td className="px-4 py-3.5 text-muted-foreground sm:px-5">{row.them}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-3xl">
            Bulk consumers of electronics are expected to channel e-waste to an authorized recycler.
            The cheapest quote is not the cheapest outcome if it leaves you without records.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="mb-6 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Corporate clients, ITAD and EPR
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-gradient-to-br from-white to-emerald-50/40 p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Enterprises, startups & IT parks
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                End-to-end IT asset disposition across Bangalore: inventory reconciliation, secure
                collection, data destruction, resale of working equipment where it makes sense, and
                certified recycling of the rest.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                <Link href="/services/it-telecom" className="text-primary hover:underline">
                  IT & telecom →
                </Link>
                <Link
                  href="/services/electronic-waste-recycle"
                  className="text-primary hover:underline"
                >
                  E-waste recycling →
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-gradient-to-br from-white to-teal-50/40 p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Brands, producers & importers
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                EPR support under the E-Waste (Management) Rules, 2022 — documentation,
                channelization and reporting on the CPCB EPR portal.
              </p>
              <Link
                href="/services/EPR-Compliance-Solutions"
                className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                EPR compliance services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 sm:p-10 text-white shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Book a Bangalore pickup or request a bulk quote
            </h2>
            <p className="mt-2 max-w-2xl text-emerald-50/90">
              Send us your asset list or call us. For urgent pickups in Bangalore, call before noon.
            </p>
            <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2 max-w-2xl">
              <div>
                <dt className="text-emerald-100/80">Phone / WhatsApp</dt>
                <dd className="font-semibold">+91 99499 01238</dd>
              </div>
              <div>
                <dt className="text-emerald-100/80">Email</dt>
                <dd className="font-semibold">info@sprecycling.in</dd>
              </div>
              <div>
                <dt className="text-emerald-100/80">Office hours</dt>
                <dd className="font-semibold">Mon–Sat, 9 AM–6 PM</dd>
              </div>
              <div>
                <dt className="text-emerald-100/80">Coverage</dt>
                <dd className="font-semibold">BBMP & major tech corridors</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-white text-emerald-800 hover:bg-emerald-50"
                onClick={() => setPickupOpen(true)}
              >
                Request pickup
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/contact?city=bangalore">Get bulk quote</Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-background p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">Official resources</h3>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <li>
                <a
                  href="https://cpcb.nic.in/e-waste/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  CPCB – E-Waste Management
                </a>
              </li>
              <li>
                <a
                  href="https://moef.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  MoEFCC
                </a>
              </li>
              <li>
                <a
                  href="https://kspcb.karnataka.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  KSPCB
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <PickupFormModal open={pickupOpen} onOpenChange={setPickupOpen} />
    </div>
  )
}
