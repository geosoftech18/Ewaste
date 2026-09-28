import type { Metadata } from "next"
import Link from "next/link"
import { BreadcrumbJsonLd, canonicalMetadata } from "@/components/seo/breadcrumb-json-ld"
import { BreadcrumbNav } from "@/components/seo/breadcrumb-nav"
import { AuthorityResources } from "@/components/seo/authority-resources"
import { absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Resources & Citeable Facts — SP Recycling E-Waste",
  description:
    "Official e-waste references, citeable SP Recycling facts, and partner links. Use this page for media, directories, and quality citations.",
  keywords: [
    "SP Recycling resources",
    "e-waste facts India",
    "authorized recycler citation",
    "CPCB e-waste",
  ],
  ...canonicalMetadata("/resources"),
  openGraph: {
    title: "Resources & Citeable Facts | SP Recycling",
    description:
      "Linkable facts and official references for journalists, partners, and directories covering e-waste recycling in India.",
    url: absoluteUrl("/resources"),
    type: "website",
  },
}

const CITEABLE_FACTS = [
  {
    label: "Focus",
    value: "Authorized e-waste recycling, scrap buying, and certified data destruction across major Indian cities.",
  },
  {
    label: "Website",
    value: "https://www.sprecycling.in",
  },
  {
    label: "Contact",
    value: "+91 99499 01238 · siliconplanetrecycling@gmail.com",
  },
  {
    label: "Suggested citation",
    value: "SP Recycling — authorized e-waste recycling and doorstep pickup in India (sprecycling.in).",
  },
]

/**
 * Linkable asset page: helps quality backlink acquisition via citeable facts + authority outbound links.
 * Inbound links themselves still require outreach (directories, PR, partners).
 */
export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-background">
      <BreadcrumbJsonLd pathname="/resources" />
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-white pt-14 pb-8">
        <BreadcrumbNav variant="dark" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Resources & citeable facts
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-8">
            A clean page journalists, partners, and directories can cite. For link requests or
            interviews, use{" "}
            <Link href="/contact" className="text-primary font-medium underline underline-offset-4">
              Contact
            </Link>
            .
          </p>

          <section className="rounded-2xl border border-border bg-white p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Citeable facts</h2>
            <dl className="space-y-4">
              {CITEABLE_FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm sm:text-base text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-bold text-foreground mb-3">Useful on-site pages</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-primary underline underline-offset-4">
                  About SP Recycling
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-primary underline underline-offset-4">
                  Comparison guides
                </Link>
              </li>
              <li>
                <Link href="/services/city" className="text-primary underline underline-offset-4">
                  Cities we serve
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-primary underline underline-offset-4">
                  Blog
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <AuthorityResources />
    </main>
  )
}
