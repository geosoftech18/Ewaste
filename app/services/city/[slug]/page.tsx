import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { WhyChooseUs } from "@/components/why-choose-us"
import { HyderabadWhyChooseUs } from "@/components/city/hyderabad-why-choose-us"
import { CTA } from "@/components/city/cta"
import { Hero } from "@/components/city/hero"
import { Services } from "@/components/city/services"
import { WorkingProcess } from "@/components/city/working-process"
import { EnvironmentalImpact } from "@/components/city/environmental-impact"
import { ImpactCalculator } from "@/components/city/impact-calculator"
import { Certifications } from "@/components/city/certifications"
import FAQ from "@/components/service/FAQ"
import { RequestPickup } from "@/components/city/request-pickup"
import { ServiceCities } from "@/components/city/service-cities"
import { TestimonialsSection } from "@/components/testimonials-section"
import { getCityData, getAllCitySlugs, type CityData } from '@/lib/city-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sprecycling.in';

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const city = getCityData(params.slug);

  if (!city) {
    return {
      title: 'City Not Found | SP Recycling',
    };
  }

  const seoTitle =
    city.metaTitle ?? `E-waste Recycling & Sell Old Electronics in ${city.name} | Best Prices`;

  const metaDescription =
    city.metaDescription ??
    `Professional e-waste recycling in ${city.name}. Same-day pickup, certified data destruction, cash for electronics. ISO certified & eco-friendly disposal.`;

  const canonicalPath = `/services/city/${city.slug}`;

  return {
    title: seoTitle,
    description: metaDescription,
    keywords: [
      `e-waste recycling in ${city.name}`,
      `scrap buyers in ${city.name}`,
      `sell old electronics in ${city.name}`,
      'certified data destruction',
      'free e-waste pickup',
    ],
    alternates: {
      canonical: canonicalPath,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: seoTitle,
      description: metaDescription,
      url: canonicalPath,
      siteName: 'SP Recycling',
      images: [
        {
          url: city.heroImage,
          alt: `E-waste recycling services in ${city.name}`,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: metaDescription,
      images: [city.heroImage],
    },
  };
}

function CityJsonLd({ city }: { city: CityData }) {
  const pageUrl = `${SITE_URL}/services/city/${city.slug}`;
  const description =
    city.metaDescription ??
    `Professional e-waste recycling in ${city.name}. Same-day pickup, certified data destruction, cash for electronics.`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: city.metaTitle ?? city.title,
        description,
        isPartOf: {
          '@type': 'WebSite',
          name: 'SP Recycling',
          url: SITE_URL,
        },
        about: {
          '@id': `${pageUrl}#service`,
        },
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: `E-Waste Recycling in ${city.name}`,
        description,
        url: pageUrl,
        serviceType: 'E-Waste Recycling',
        areaServed: {
          '@type': 'City',
          name: city.name,
        },
        provider: {
          '@type': 'Organization',
          name: 'SP Recycling',
          url: SITE_URL,
          telephone: '+919949901238',
          email: 'siliconplanetrecycling@gmail.com',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: city.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: `${SITE_URL}/services`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Cities',
            item: `${SITE_URL}/services/city`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: city.name,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function CityPage({ params }: { params: { slug: string } }) {
  const city = getCityData(params.slug);

  if (!city) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <CityJsonLd city={city} />
      <Hero
        cityName={city.name}
        heroTitle={city.heroTitle}
        cityDescription={city.description}
        cityDescriptionHtml={city.descriptionHtml}
        heroSubdescription={city.heroSubdescription}
        heroImage={city.heroImage}
        stats={city.stats}
      />
      <section className="px-4 sm:px-6 lg:px-8 pb-4 mt-2">
        <p className="mx-auto max-w-3xl text-center text-sm sm:text-base text-muted-foreground leading-relaxed">
          {city.bridgeParagraph ??
            `At SP Recycling, we take the complexity out of corporate environmental responsibility. If you need to secure the best commercial value for bulk IT scrap in  ${city.name} or require a fully certified office clearance, our specialized disposal workflow starts right at your facility door. `}
        </p>
      </section>
      <Services
        cityName={city.name}
        services={city.services}
        servicesBlurb={city.servicesBlurb}
      />
      <EnvironmentalImpact />
      {city.slug === "hyderabad" ? <HyderabadWhyChooseUs /> : <WhyChooseUs />}
      <WorkingProcess />
      <TestimonialsSection />
      <ImpactCalculator cityName={city.name} />
      <Certifications />
      <FAQ faqs={city.faqs} />
      <RequestPickup cityName={city.name} />
      <ServiceCities />
      <CTA />
    </main>
  )
}
