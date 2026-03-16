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

  // Create concise, SEO-friendly title with brand at the end
  const seoTitle = `${city.title} | SP Recycling`;

  // Create concise, SEO-friendly meta description (150-160 characters)
  const metaDescription = `Professional e-waste recycling in ${city.name}. Same-day pickup, certified data destruction, cash for electronics. ISO certified & eco-friendly disposal.`;

  return {
    title: seoTitle,
    description: metaDescription,
    keywords: `e-waste recycling ${city.name}, electronic waste disposal ${city.name}, data destruction ${city.name}, IT equipment recycling ${city.name}, certified recycling ${city.name}, ${city.name} e-waste management`,
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
        cityDescription={city.description}
        heroImage={city.heroImage}
        stats={city.stats}
      />
      <Services 
        cityName={city.name}
        services={city.services}
      />
      <EnvironmentalImpact />
      <WhyChooseUs />
      <WorkingProcess />
      <TestimonialsSection />
      <ImpactCalculator />
      <Certifications />
      <FAQ faqs={city.faqs} />
      <RequestPickup cityName={city.name} />
      <ServiceCities />
      <CTA />
    </main>
  )
}
