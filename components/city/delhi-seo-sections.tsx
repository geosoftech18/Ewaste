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
  Landmark,
  GraduationCap,
  Heart,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  Scale,
  Recycle,
  Wind,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PickupFormModal } from "@/components/pickup-form-modal"
import { useState } from "react"

const pickupRows = [
  {
    type: "Small or urgent lot in NCR",
    response: "Callback within 1 hour in working hours",
    pickup: "Next available slot, often within 24 hours",
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
    pickup: "At your premises, witnessed by your team",
  },
]

const corridors = [
  {
    icon: Building2,
    title: "Gurugram (Gurgaon): Cyber City, Udyog Vihar, Golf Course Road, Sohna Road & Manesar",
    body: "GCCs, consulting firms, BPOs and corporate HQs, plus the IMT Manesar industrial belt. Large laptop refresh batches and floor closures.",
    points: [
      "Asset-tag reconciliation for refresh lots",
      "Bulk collection and on-site destruction when required",
      "Gate-pass lists and vehicle details for managed towers",
      "Recurring collection for larger campuses",
    ],
  },
  {
    icon: Building2,
    title: "Noida & Greater Noida: Sectors 62, 63, 125, 132, 135 & Knowledge Park",
    body: "IT services, electronics and telecom companies, data centers and universities on the UP side of NCR.",
    points: [
      "Scheduled and recurring pickups",
      "Server and storage clearances",
      "Campus and university lab sweeps",
      "Form 6 trail even when waste crosses state lines",
    ],
  },
  {
    icon: Landmark,
    title: "Nehru Place, Okhla, Saket, Aerocity, Vasant Kunj & Connaught Place",
    body: "IT hardware, corporate offices, hotels, consulting and professional firms in Delhi. Older buildings often mean goods-lift limits and timed loading.",
    points: [
      "Building-access friendly scheduling",
      "Witnessed collection for regulated firms",
      "Per-device documentation on request",
    ],
  },
  {
    icon: Factory,
    title: "Bawana, Narela, Mundka, Wazirpur & Okhla industrial areas",
    body: "Small and mid-size manufacturers, printing and electronics units. Scheduled pickups for plant electronics and office IT.",
    points: [
      "Monthly or quarterly collection plans",
      "Plant electronics with category documentation",
      "Work to your EHS format when you share it",
    ],
  },
  {
    icon: Factory,
    title: "Faridabad, Ghaziabad, Sahibabad & Loni",
    body: "Industrial and warehouse clusters on the eastern and southern edges of NCR. Scheduled pickups by volume — call to confirm your pin code.",
    points: [
      "Warehouse and plant electronics",
      "Office IT clearances",
      "Volume-based scheduling",
    ],
  },
  {
    icon: Home,
    title: "Residential societies across Delhi NCR",
    body: "Housing societies and households get doorstep pickup. Many societies have lift and timing rules — tell us when you book.",
    points: [
      "Society-friendly timing windows",
      "Laptops, phones, appliances and metal scrap",
      "Indicative scrap rates on this page",
    ],
  },
]

const audienceCards = [
  {
    icon: Building2,
    title: "GCCs, IT services and consulting firms",
    text: "Regular volumes, client data policies and frequent audits. We provide recurring collection, a single point of contact and device-level documentation.",
  },
  {
    icon: Landmark,
    title: "Government departments, PSUs and public institutions",
    text: "We supply serial-number lists, weighment slips, and destruction and recycling certificates departments can file for audit and condemnation records. Share your format and we will work to it.",
  },
  {
    icon: GraduationCap,
    title: "Universities, colleges and schools",
    text: "Bulk collection planned around term breaks and exams, with serial-number lists and recycling certificates for institutional records.",
  },
  {
    icon: Heart,
    title: "Hospitals and diagnostic centres",
    text: "Diagnostic and monitoring equipment, lab devices, and IT assets that may hold patient data. We destroy storage media first and document it.",
  },
  {
    icon: Building2,
    title: "Startups and co-working spaces",
    text: "One visit, a clear list of what has value, and a certificate for your records. Small lots may be batched for route efficiency from our Telangana base.",
  },
]

const destructionMethods = [
  {
    method: "On-site hard drive shredding",
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
    result: "Sealed, tracked transport; destruction at the processing facility",
  },
]

const processSteps = [
  {
    title: "Share the list",
    text: "Send asset counts or a spreadsheet by category. A rough count is enough for a quote.",
  },
  {
    title: "Get a written quote",
    text: "Assets with resale or scrap value are priced on current rates. Zero-value items are listed clearly.",
  },
  {
    title: "Schedule",
    text: "Pick a date. We confirm vehicle, team and gate-pass details, and any building approvals you need.",
  },
  {
    title: "Collect and weigh",
    text: "Items are counted against your list and weighed in front of your team.",
  },
  {
    title: "Destroy",
    text: "Data destruction is done on-site or at the processing facility, as agreed.",
  },
  {
    title: "Receive documents",
    text: "Form 6 manifest, weighment slip, certificate of destruction and recycling certificate.",
  },
]

const businessItems = [
  "Laptops, desktops, servers, storage arrays",
  "Switches, routers, firewalls, printers and copiers",
  "Monitors, projectors, UPS units and batteries",
  "Lab and test equipment",
  "PLC panels and industrial electronics",
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
    us: "CPCB-authorized recycling channel + Form 6 trail",
    them: "Usually none",
  },
  {
    label: "Transport manifest",
    us: "Form 6 on every consignment (including cross-state)",
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
 * Delhi NCR-only SEO content. Additive — no metadata/H1 changes.
 * Explains three-state regulator context; does not claim DPCC/HSPCB/UPPCB auth.
 * Waste moves under Form 6 to CPCB-authorized Telangana facility.
 */
export function DelhiSeoSections() {
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
              <FileCheck2 className="h-3.5 w-3.5 text-emerald-600" />
              Form 6 manifest on every pickup
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Recycle className="h-3.5 w-3.5 text-emerald-600" />
              Certificate of destruction
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPinned className="h-3.5 w-3.5 text-emerald-600" />
              Delhi · Gurugram · Noida · NCR
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
              </a>
              . Small lots may be batched for route efficiency from our Telangana base — we will say
              so when you book.
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
              Authorization & paperwork
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Authorization and paperwork across Delhi NCR
            </h2>
            <p className="mt-3 text-emerald-50/85 leading-relaxed">
              Under the E-Waste (Management) Rules, a company that hands e-waste to an unauthorized
              party stays exposed. NCR is unusual: it spans three state regulators — DPCC (Delhi),
              HSPCB (Gurugram / Faridabad) and UPPCB (Noida / Ghaziabad). We make documentation the
              core of the job.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Central authorization",
                text: "SP Recycling is authorized by the Central Pollution Control Board as an e-waste recycler. Ask for copies before you book.",
              },
              {
                title: "How NCR waste moves",
                text: "NCR consignments move under a Form 6 manifest to our CPCB-authorized processing facility in Telangana (Thumkunta, Bibinagar). Your manifest names the destination — even when the load crosses state lines.",
              },
              {
                title: "Three-state clarity",
                text: "When you book, we confirm the paperwork route for your pin code — Delhi, Haryana or Uttar Pradesh — so your audit trail stays clear.",
              },
              {
                title: "Check us",
                text: "Verify recyclers on the CPCB and state board websites (DPCC, HSPCB, UPPCB) before you hand over assets. We encourage it.",
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
                href="https://wa.me/919949901238?text=Hi%20SP%20Recycling%2C%20I%20need%20IT%20asset%20disposal%20in%20Delhi%20NCR"
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
              Serving Delhi NCR&apos;s business districts and industrial areas
            </h2>
            <p className="mt-2 text-muted-foreground">
              NCR spreads across three states, with different building rules and traffic. We plan
              pickups by area.
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
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Built for how NCR organizations actually work
            </h2>
            <p className="mt-2 text-muted-foreground">
              Documentation, data destruction and bulk planning — what a Hyderabad-based authorized
              recycler can credibly deliver in India&apos;s most crowded e-waste market.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {audienceCards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-border bg-background p-5 shadow-sm"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-emerald-50/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Shield className="h-3.5 w-3.5" />
                ITAD & data security
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                On-site data destruction in Delhi NCR
              </h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                If a drive leaves your building intact, you are trusting someone else with your data.
                For banks, consulting firms, hospitals and government bodies, that is often not
                acceptable.
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
            You receive a certificate of destruction listing each serial number, the method, the date,
            and who witnessed it. Photos or video of the process are available on request.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              How a corporate pickup works
            </h2>
            <p className="mt-2 text-muted-foreground">
              From asset list to compliance documents — planned around NCR building access and traffic.
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

          <div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 sm:p-5">
            <Wind className="h-5 w-5 shrink-0 text-amber-800 mt-0.5" />
            <p className="text-sm text-amber-950 leading-relaxed">
              <span className="font-semibold">Winter pollution note:</span> from roughly October to
              January, Delhi&apos;s air-quality restrictions can limit commercial vehicle movement and
              some site activity. We plan around them and tell you early if a date needs to move.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="mb-8 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            What we collect in Delhi NCR
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                For businesses and institutions
              </h3>
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
                Call before booking if you have damaged lithium batteries or large battery packs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
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
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            EPR and compliance support
          </h2>
          <p className="max-w-3xl text-muted-foreground leading-relaxed mb-4">
            Brands, importers and producers selling electronics in India have obligations under the
            E-Waste (Management) Rules, 2022, including registration and reporting on the CPCB EPR
            portal. Many producers are headquartered in Delhi NCR. We support documentation,
            channelization and reporting.
          </p>
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/services/EPR-Compliance-Solutions" className="text-primary hover:underline">
              EPR compliance services →
            </Link>
            <Link href="/services/it-telecom" className="text-primary hover:underline">
              IT & telecom →
            </Link>
            <Link href="/services/electronic-waste-recycle" className="text-primary hover:underline">
              E-waste recycling →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 sm:p-10 text-white shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Book a pickup or request a bulk quote
            </h2>
            <p className="mt-2 max-w-2xl text-emerald-50/90">
              Send us your asset list or call us. For urgent pickups in NCR, call before noon.
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
                <dt className="text-emerald-100/80">Serving Delhi NCR from</dt>
                <dd className="font-semibold">Authorized facility, Telangana (Form 6 tracked)</dd>
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
                <Link href="/contact?city=delhi">Get bulk quote</Link>
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
                  href="https://www.dpcc.delhigovt.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  DPCC
                </a>
              </li>
              <li>
                <a
                  href="https://hspcb.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  HSPCB
                </a>
              </li>
              <li>
                <a
                  href="https://www.uppcb.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  UPPCB
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
