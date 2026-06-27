import { Metadata } from "next"
import { Header } from "@/components/header"
import { VideoHero } from "@/components/video-hero"
import { HeroSlider } from "@/components/hero-slider"
import { TrustStrip } from "@/components/trust-strip"
import { ServicesGrid } from "@/components/services-grid"
import { ScrapTypesSection } from "@/components/scrap-types-section"
import { ProcessSteps } from "@/components/process-steps"
import { WhyChooseUs } from "@/components/why-choose-us"
import { CertificationsCompliance } from "@/components/certifications-compliance"
import { QuickPickupForm } from "@/components/quick-pickup-form"
import { ClientsCarousel } from "@/components/clients-carousel"
import { TestimonialsSection } from "@/components/testimonials-section"
import EWastePopup from "@/components/EWastePopup"
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

export const metadata: Metadata = {
  title: "E-Waste Recycling Services in India | SP Recycling Pvt Ltd - Certified & Eco-Friendly",
  description: "Professional e-waste recycling services across India. ISO certified, secure data destruction, 100% eco-friendly disposal. Serving Hyderabad, Mumbai, Delhi, Bangalore, Chennai, Pune & more. Get cash for old electronics, corporate bulk processing, and certified data destruction certificates.",
  keywords: "e-waste recycling, electronic waste disposal, data destruction, IT equipment recycling, certified recycling, eco-friendly disposal, Hyderabad, Mumbai, Delhi, Bangalore",
  openGraph: {
    title: "E-Waste Recycling Services in India | SP Recycling Pvt Ltd",
    description: "Professional e-waste recycling services across India. ISO certified, secure data destruction, 100% eco-friendly disposal.",
    type: "website",
  },
}

export default function Home() {
  return (
    <>
      <VideoHero />
      {/* <HeroSlider /> */}
      <TrustStrip />
      <ServicesGrid />
      <ScrapTypesSection />
      <ProcessSteps />
      <WhyChooseUs />
      <CertificationsCompliance />
      <InteractiveIndiaMap />
      <QuickPickupForm />
      <ClientsCarousel />
      <TestimonialsSection />
      <EWastePopup />
    </>
  )
}
