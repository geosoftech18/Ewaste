import { Header } from "@/components/header"
import { HeroSlider } from "@/components/hero-slider"
import { TrustStrip } from "@/components/trust-strip"
import { ServicesGrid } from "@/components/services-grid"
import { ProcessSteps } from "@/components/process-steps"
import { WhyChooseUs } from "@/components/why-choose-us"
import { CertificationsCompliance } from "@/components/certifications-compliance"
import { QuickPickupForm } from "@/components/quick-pickup-form"
import { ClientsCarousel } from "@/components/clients-carousel"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function Home() {
  return (
    <>
      
      <HeroSlider />
      <TrustStrip />
      <ServicesGrid />
      <ProcessSteps />
      <WhyChooseUs />
      <CertificationsCompliance />
      <QuickPickupForm />
      <ClientsCarousel />
      <TestimonialsSection />
    </>
  )
}
