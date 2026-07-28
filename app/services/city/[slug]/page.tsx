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
import {
  getCityData,
  getAllCitySlugs,
  getCityBridgeParagraphHtml,
  getCityFaqs,
  getCityServicesBlurbHtml,
  getLinkedCityServices,
  type CityData,
} from '@/lib/city-data';
import { SITE_URL, absoluteUrl } from '@/lib/seo';
import { BreadcrumbJsonLd, canonicalMetadata } from '@/components/seo/breadcrumb-json-ld';

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

  const pageUrl = absoluteUrl(`/services/city/${city.slug}`);

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
    ...canonicalMetadata(`/services/city/${city.slug}`),
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
      url: pageUrl,
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

function CityJsonLd({ city, faqs }: { city: CityData; faqs: CityData['faqs'] }) {
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
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      // BreadcrumbList is emitted via <BreadcrumbJsonLd /> below.
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

  const bridgeParagraphHtml = getCityBridgeParagraphHtml(city);
  const cityFaqs = getCityFaqs(city);
  const servicesBlurbHtml = getCityServicesBlurbHtml(city);
  const linkedServices = getLinkedCityServices(city);

  return (
    <main className="min-h-screen bg-background">
      <BreadcrumbJsonLd pathname={`/services/city/${city.slug}`} />
      <CityJsonLd city={city} faqs={cityFaqs} />
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
        <p
          className="mx-auto max-w-3xl text-center text-sm sm:text-base text-muted-foreground leading-relaxed [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary/85"
          dangerouslySetInnerHTML={{ __html: bridgeParagraphHtml }}
        />
      </section>
      <Services
        cityName={city.name}
        services={linkedServices}
        servicesBlurb={city.servicesBlurb}
        servicesBlurbHtml={servicesBlurbHtml}
      />
      <EnvironmentalImpact />
      {city.slug === "hyderabad" ? <HyderabadWhyChooseUs /> : <WhyChooseUs />}
      <WorkingProcess />
      <TestimonialsSection />
      <ImpactCalculator cityName={city.name} />
      <Certifications />
      <FAQ faqs={cityFaqs} />
      <RequestPickup cityName={city.name} />
      <ServiceCities />
      <CTA />
    </main>
  )
}
