import type { Metadata } from "next"
import Link from "next/link"
import { Scale, ArrowRight } from "lucide-react"
import { comparisonGuides } from "@/data/comparisons"
import { BreadcrumbJsonLd, canonicalMetadata } from "@/components/seo/breadcrumb-json-ld"
import { BreadcrumbNav } from "@/components/seo/breadcrumb-nav"
import { absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "E-Waste Comparison Guides — Recycler vs Dealer, Recycling vs Landfill",
  description:
    "Compare authorized e-waste recyclers vs scrap dealers, recycling vs landfill, and doorstep pickup vs drop-off. Practical guides before you sell old electronics.",
  keywords: [
    "e-waste comparison",
    "authorized recycler vs scrap dealer",
    "recycling vs landfill e-waste",
    "doorstep e-waste pickup",
  ],
  ...canonicalMetadata("/compare"),
  openGraph: {
    title: "E-Waste Comparison Guides | SP Recycling",
    description:
      "Side-by-side guides to help you choose safe, compliant e-waste recycling options in India.",
    url: absoluteUrl("/compare"),
    type: "website",
  },
}

export default function CompareIndexPage() {
  return (
    <main className="min-h-screen bg-background">
      <BreadcrumbJsonLd pathname="/compare" />
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-white pt-14 pb-16">
        <BreadcrumbNav variant="dark" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="text-sm font-semibold text-primary mb-2">Compare & decide</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            E-waste comparison guides
          </h1>
          <p className="text-muted-foreground max-w-2xl text-base sm:text-lg mb-10">
            Practical side-by-side answers so you can sell or dispose of electronics safely —
            without guessing between scrap shops, landfills, and authorized recyclers.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {comparisonGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/compare/${guide.slug}`}
                className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:border-primary/40 hover:shadow-md"
              >
                <Scale className="h-5 w-5 text-primary mb-3" />
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {guide.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{guide.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read guide
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
