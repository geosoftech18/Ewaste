import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Header } from "@/components/city/header"
import { WhyChooseUs } from "@/components/why-choose-us"
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
import { getCityData, getAllCitySlugs } from '@/lib/city-data';

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

  return {
    title: seoTitle,
    description: metaDescription,
    keywords: `Certified e-waste recycling in ${city.name}. We help you sell old electronics and IT assets responsibly with secure data destruction and free pickup.`,
    openGraph: {
      title: seoTitle,
      description: metaDescription,
      images: [city.heroImage],
      type: 'website',
    },
  };
}

export default function CityPage({ params }: { params: { slug: string } }) {
  const city = getCityData(params.slug);

  if (!city) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
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
      <WhyChooseUs />
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
