import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  getAllHyderabadAreaSlugs,
  getHyderabadArea,
} from "@/data/hyderabad-areas"
import { HyderabadAreaPage } from "@/components/city/hyderabad-area-page"
import { BreadcrumbJsonLd, canonicalMetadata } from "@/components/seo/breadcrumb-json-ld"
import { absoluteUrl } from "@/lib/seo"
import { CTA } from "@/components/city/cta"
import { RequestPickup } from "@/components/city/request-pickup"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllHyderabadAreaSlugs().map((area) => ({ area }))
}

export async function generateMetadata({
  params,
}: {
  params: { area: string }
}): Promise<Metadata> {
  const area = getHyderabadArea(params.area)
  if (!area) {
    return {
      title: "Area Not Found | SP Recycling",
      robots: { index: false, follow: false },
    }
  }

  const pageUrl = absoluteUrl(`/services/city/hyderabad/${area.slug}`)
  const imageUrl = absoluteUrl(area.image)

  return {
    title: area.metaTitle,
    description: area.metaDescription,
    keywords: area.keywords,
    ...canonicalMetadata(`/services/city/hyderabad/${area.slug}`),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: pageUrl,
      siteName: "SP Recycling",
      images: [{ url: imageUrl, alt: area.imageAlt }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: area.metaTitle,
      description: area.metaDescription,
      images: [imageUrl],
    },
  }
}

function AreaJsonLd({ areaSlug }: { areaSlug: string }) {
  const area = getHyderabadArea(areaSlug)
  if (!area) return null

  const pageUrl = absoluteUrl(`/services/city/hyderabad/${area.slug}`)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: area.metaTitle,
    description: area.metaDescription,
    url: pageUrl,
    areaServed: area.areasCovered.map((name) => ({
      "@type": "Place",
      name,
    })),
    provider: {
      "@type": "Organization",
      name: "SP Recycling",
      url: absoluteUrl("/"),
      telephone: "+919949901238",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}

export default function HyderabadAreaRoute({
  params,
}: {
  params: { area: string }
}) {
  const area = getHyderabadArea(params.area)
  if (!area) notFound()

  return (
    <main className="min-h-screen bg-background">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Cities", path: "/services/city" },
          { name: "Hyderabad", path: "/services/city/hyderabad" },
          {
            name: area.cardTitle,
            path: `/services/city/hyderabad/${area.slug}`,
          },
        ]}
      />
      <AreaJsonLd areaSlug={area.slug} />
      <HyderabadAreaPage area={area} />
      <RequestPickup cityName="Hyderabad" />
      <CTA />
    </main>
  )
}
