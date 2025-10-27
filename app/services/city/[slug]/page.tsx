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
      title: 'City Not Found',
    };
  }

  return {
    title: city.title,
    description: city.description,
    openGraph: {
      title: city.title,
      description: city.description,
      images: [city.heroImage],
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
