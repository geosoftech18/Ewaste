import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  comparisonGuides,
  getAllComparisonSlugs,
  getComparisonGuide,
} from "@/data/comparisons"
import { BreadcrumbJsonLd, canonicalMetadata } from "@/components/seo/breadcrumb-json-ld"
import { BreadcrumbNav } from "@/components/seo/breadcrumb-nav"
import { ContentFreshness } from "@/components/seo/content-freshness"
import { absoluteUrl, SITE_URL } from "@/lib/seo"
import { getCityData } from "@/lib/city-data"
import { getServiceData } from "@/lib/service-data"

export function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const guide = getComparisonGuide(params.slug)
  if (!guide) {
    return { title: "Guide Not Found | SP Recycling", robots: { index: false, follow: false } }
  }

  const url = absoluteUrl(`/compare/${guide.slug}`)
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    ...canonicalMetadata(`/compare/${guide.slug}`),
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url,
      type: "article",
    },
  }
}

export default function ComparisonGuidePage({ params }: { params: { slug: string } }) {
  const guide = getComparisonGuide(params.slug)
  if (!guide) notFound()

  const pageUrl = absoluteUrl(`/compare/${guide.slug}`)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.metaDescription,
    dateModified: guide.lastReviewed,
    author: { "@type": "Organization", name: "SP Recycling", url: SITE_URL },
    publisher: { "@type": "Organization", name: "SP Recycling", url: SITE_URL },
    mainEntityOfPage: pageUrl,
  }

  const cities = guide.relatedCitySlugs
    .map((slug) => getCityData(slug))
    .filter(Boolean)
  const services = guide.relatedServiceSlugs
    .map((slug) => getServiceData(slug))
    .filter(Boolean)

  const otherGuides = comparisonGuides.filter((g) => g.slug !== guide.slug)

  return (
    <main className="min-h-screen bg-background">
      <BreadcrumbJsonLd pathname={`/compare/${guide.slug}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="relative overflow-hidden bg-gradient-to-br from-emerald-50/80 via-white to-white pt-14 pb-16">
        <BreadcrumbNav variant="dark" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <p className="text-sm font-semibold text-primary mb-2">Comparison guide</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            {guide.h1}
          </h1>
          <ContentFreshness lastReviewed={guide.lastReviewed} className="mb-6" />
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">{guide.intro}</p>

          <div className="space-y-8">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-bold text-foreground mb-3">{section.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.body}</p>
              </section>
            ))}
          </div>

          <section className="mt-12 rounded-2xl border border-border bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-foreground mb-4">FAQs</h2>
            <div className="space-y-5">
              {guide.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-semibold text-foreground mb-1">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {cities.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-lg font-bold text-foreground mb-3">City services</h2>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) =>
                  city ? (
                    <Link
                      key={city.slug}
                      href={`/services/city/${city.slug}`}
                      className="rounded-full border border-border px-3.5 py-1.5 text-sm font-medium hover:border-primary hover:text-primary"
                    >
                      {city.name}
                    </Link>
                  ) : null
                )}
              </div>
            </section>
          ) : null}

          {services.length > 0 ? (
            <section className="mt-8">
              <h2 className="text-lg font-bold text-foreground mb-3">Related services</h2>
              <ul className="space-y-2">
                {services.map((service) =>
                  service ? (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-sm font-medium text-primary underline underline-offset-4"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ) : null
                )}
              </ul>
            </section>
          ) : null}

          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-lg font-bold text-foreground mb-4">More comparisons</h2>
            <ul className="space-y-3">
              {otherGuides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/compare/${g.slug}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/compare" className="text-sm text-muted-foreground hover:text-primary">
                  All comparison guides →
                </Link>
              </li>
            </ul>
          </section>

          <div className="mt-10 rounded-2xl bg-primary/10 p-6 text-center">
            <p className="font-semibold text-foreground mb-2">Ready to sell or schedule pickup?</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Contact SP Recycling
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
