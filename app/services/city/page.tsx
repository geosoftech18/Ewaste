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

export default function CityHome() {
  return (
    <main className="min-h-screen bg-background">
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
