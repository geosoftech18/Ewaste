import { Metadata } from "next"
import dynamic from "next/dynamic"
import { VideoHero } from "@/components/video-hero"
import { TrustStrip } from "@/components/trust-strip"
import { BreadcrumbJsonLd, canonicalMetadata } from "@/components/seo/breadcrumb-json-ld"

/** Below-fold sections — split JS so TBT/LCP aren't blocked by heavy client bundles */
const ServicesGrid = dynamic(
  () => import("@/components/services-grid").then((m) => ({ default: m.ServicesGrid })),
  { loading: () => <div className="min-h-[480px] w-full" aria-hidden /> }
)
const ScrapTypesSection = dynamic(
  () => import("@/components/scrap-types-section").then((m) => ({ default: m.ScrapTypesSection })),
  { loading: () => <div className="min-h-[520px] w-full" aria-hidden /> }
)
const ProcessSteps = dynamic(
  () => import("@/components/process-steps").then((m) => ({ default: m.ProcessSteps })),
  { loading: () => <div className="min-h-[400px] w-full" aria-hidden /> }
)
const WhyChooseUs = dynamic(
  () => import("@/components/why-choose-us").then((m) => ({ default: m.WhyChooseUs })),
  { loading: () => <div className="min-h-[480px] w-full" aria-hidden /> }
)
const CertificationsCompliance = dynamic(
  () =>
    import("@/components/certifications-compliance").then((m) => ({
      default: m.CertificationsCompliance,
    })),
  { loading: () => <div className="min-h-[400px] w-full" aria-hidden /> }
)
const QuickPickupForm = dynamic(
  () => import("@/components/quick-pickup-form").then((m) => ({ default: m.QuickPickupForm })),
  { loading: () => <div className="min-h-[520px] w-full" aria-hidden /> }
)
const ClientsCarousel = dynamic(
  () => import("@/components/clients-carousel").then((m) => ({ default: m.ClientsCarousel })),
  { loading: () => <div className="min-h-[360px] w-full" aria-hidden /> }
)
const TestimonialsSection = dynamic(
  () =>
    import("@/components/testimonials-section").then((m) => ({ default: m.TestimonialsSection })),
  { loading: () => <div className="min-h-[480px] w-full" aria-hidden /> }
)
const InteractiveIndiaMap = dynamic(() => import("@/components/about/InteractiveIndiaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[700px] bg-gray-100 rounded-3xl flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4" />
        <p className="text-gray-600">Loading interactive map...</p>
      </div>
    </div>
  ),
})
const EWastePopup = dynamic(() => import("@/components/EWastePopup"), {
  ssr: false,
})

export const metadata: Metadata = {
  title: "E-Waste Recycling Services in India | SP Recycling Pvt Ltd - Certified & Eco-Friendly",
  description:
    "Professional e-waste recycling services across India. ISO certified, secure data destruction, 100% eco-friendly disposal. Serving Hyderabad, Mumbai, Delhi, Bangalore, Chennai, Pune & more. Get cash for old electronics, corporate bulk processing, and certified data destruction certificates.",
  keywords:
    "e-waste recycling, electronic waste disposal, data destruction, IT equipment recycling, certified recycling, eco-friendly disposal, Hyderabad, Mumbai, Delhi, Bangalore",
  ...canonicalMetadata("/"),
  openGraph: {
    title: "E-Waste Recycling Services in India | SP Recycling Pvt Ltd",
    description:
      "Professional e-waste recycling services across India. ISO certified, secure data destruction, 100% eco-friendly disposal.",
    type: "website",
  },
}

export default function Home() {
  return (
    <>
      <BreadcrumbJsonLd pathname="/" />
      <VideoHero />
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
