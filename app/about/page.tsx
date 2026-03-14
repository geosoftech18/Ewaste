import { Metadata } from "next"
import { AboutHero } from "@/components/about/about-hero"
import { MissionVision } from "@/components/about/mission-vision"
import { CompanyTimeline } from "@/components/about/company-timeline"
import { TeamSection } from "@/components/about/team-section"
import { OurPresence } from "@/components/about/our-presence"
import { EWasteJourney } from "@/components/about/ewaste-journey"
import { JourneyCarousel } from "@/components/about/journey-carousel"
import dynamic from "next/dynamic"
import JourneySection from "@/components/about/journey-section"

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
  title: "About SP Recycling Pvt Ltd | Leading E-Waste Recycling Company in India - ISO Certified",
  description: "Learn about SP Recycling, a leading ISO certified e-waste recycling company in India. Our mission, vision, team, and presence across major cities. We provide professional, eco-friendly electronic waste disposal and data destruction services with 100% compliance.",
  keywords: "about e-waste recycling company, SP Recycling, ISO certified recycling, e-waste management company India, recycling company profile",
  openGraph: {
    title: "About SP Recycling Pvt Ltd | Leading E-Waste Recycling Company",
    description: "ISO certified e-waste recycling company providing professional, eco-friendly electronic waste disposal across India.",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <main>
      <AboutHero />

      <MissionVision />
      <JourneySection />
      {/* <CompanyTimeline /> */}

      <TeamSection />



      {/* <EWasteJourney /> */}

      {/* <JourneyCarousel /> */}

      <InteractiveIndiaMap />
      <OurPresence />

      {/* Placeholder for "How We Work" section */}
      {/* <section id="how-we-work" className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">How We Work</h2>
          <p className="text-muted-foreground">Content coming soon...</p>
        </div>
      </section> */}
    </main>
  )
}
