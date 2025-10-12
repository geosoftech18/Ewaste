import { AboutHero } from "@/components/about/about-hero"
import { MissionVision } from "@/components/about/mission-vision"
import { CompanyTimeline } from "@/components/about/company-timeline"
import { TeamSection } from "@/components/about/team-section"
import { OurPresence } from "@/components/about/our-presence"
import { EWasteJourney } from "@/components/about/ewaste-journey"
import { JourneyCarousel } from "@/components/about/journey-carousel"
import InteractiveIndiaMap from "@/components/about/InteractiveIndiaMap"

export default function AboutPage() {
  return (
    <main>
      <AboutHero />

      <MissionVision />

      <CompanyTimeline />

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
