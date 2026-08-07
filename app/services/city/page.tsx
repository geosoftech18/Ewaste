import { Metadata } from "next"
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
import { BreadcrumbJsonLd, canonicalMetadata } from "@/components/seo/breadcrumb-json-ld"

export const metadata: Metadata = {
  title: "City-Wise E-Waste Recycling Services in India | SP Recycling",
  description: "Find professional e-waste recycling services in your city. We serve Hyderabad, Mumbai, Delhi, Bangalore, Chennai, Pune, Andhra Pradesh and more. Same-day pickup, certified data destruction, and eco-friendly disposal available.",
  keywords: "e-waste recycling by city, city-wise recycling services, Hyderabad e-waste, Mumbai e-waste, Delhi e-waste, Bangalore e-waste, Chennai e-waste, Pune e-waste, Andhra Pradesh e-waste",
  ...canonicalMetadata('/services/city'),
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
    title: "E-Waste Recycling Services by City | SP Recycling",
    description: "Professional e-waste recycling services across major cities in India. Same-day pickup and certified disposal.",
    type: "website",
    url: "https://www.sprecycling.in/services/city",
  },
}

export default function CityHome() {
  return (
    <main className="min-h-screen bg-background">
      <BreadcrumbJsonLd pathname="/services/city" />
      <Hero />
      <Services />
      <EnvironmentalImpact />
      <WhyChooseUs />
      <WorkingProcess />
      <TestimonialsSection />
      <ImpactCalculator />
      <Certifications />
      <FAQ/>
      <RequestPickup />
      <ServiceCities />
      <CTA />
    </main>
  )
}
