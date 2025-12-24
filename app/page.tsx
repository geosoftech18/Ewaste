import { Header } from "@/components/header"
import { VideoHero } from "@/components/video-hero"
import { HeroSlider } from "@/components/hero-slider"
import { TrustStrip } from "@/components/trust-strip"
import { ServicesGrid } from "@/components/services-grid"
import { ProcessSteps } from "@/components/process-steps"
import { WhyChooseUs } from "@/components/why-choose-us"
import { CertificationsCompliance } from "@/components/certifications-compliance"
import { QuickPickupForm } from "@/components/quick-pickup-form"
import { ClientsCarousel } from "@/components/clients-carousel"
import { TestimonialsSection } from "@/components/testimonials-section"
import dynamic from "next/dynamic"

const InteractiveIndiaMap = dynamic(() => import("@/components/about/InteractiveIndiaMap"), {
  ssr: false,
  loading: () => <div className="w-full h-[700px] bg-gray-100 rounded-3xl flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading interactive map...</p>
    </div>
  </div>
})

export default function Home() {
  return (
    <>
      <VideoHero />
      {/* <HeroSlider /> */}
      <TrustStrip />
      <ServicesGrid />
      <ProcessSteps />
      <WhyChooseUs />
      <CertificationsCompliance />
      <InteractiveIndiaMap />
      <QuickPickupForm />
      <ClientsCarousel />
      <TestimonialsSection />
    </>
  )
}
