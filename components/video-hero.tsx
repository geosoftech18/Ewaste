import { VideoHeroMedia } from "@/components/video-hero-media"

/**
 * Server Component hero — headline/CTAs in initial HTML (better Speed Index).
 * Video iframe stays client-only and deferred.
 */
export function VideoHero() {
  const heading = "Transforming E-Waste into Eco-Value"
  const highlight = "Eco-Value"
  const subheading = "E-Waste Recycling — Safe. Compliant. Eco-friendly."
  const cta1 = { label: "♻ Start Recycling", href: "/contact" }
  const cta2 = { label: "View All Services", href: "/services" }

  const highlightStart = heading.indexOf(highlight)
  const before = highlightStart >= 0 ? heading.slice(0, highlightStart) : heading
  const after = highlightStart >= 0 ? heading.slice(highlightStart + highlight.length) : ""

  return (
    <section className="relative w-full h-[40vh] min-h-[250px] md:h-[90vh] md:min-h-[600px] overflow-hidden bg-black">
      <VideoHeroMedia />

      <div className="absolute inset-0 bg-gradient-to-b from-[#00996c]/30 via-[#00996c]/25 to-[#00996c]/35 z-10 pointer-events-none" />

      <div className="relative z-20 h-full flex items-center justify-center px-4 pointer-events-none">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 text-balance">
            {before}
            {highlightStart >= 0 ? <span className="text-[#48c616]">{highlight}</span> : null}
            {after}
          </h1>
          <p className="text-md md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-10 text-pretty">
            {subheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto">
            <a
              href={cta1.href || "#"}
              className="inline-flex items-center justify-center bg-[#fdf697] hover:bg-[#059669] text-[#00996c] hover:text-white px-4 py-4 md:px-8 md:py-6 text-lg font-semibold rounded-md transition-colors duration-300 hover:shadow-xl"
            >
              {cta1.label}
            </a>
            <a
              href={cta2.href || "#"}
              className="inline-flex items-center justify-center border-2 border-[#fdf697] text-white hover:bg-white hover:text-[#074E3B] px-4 py-4 md:px-8 md:py-6 text-lg font-semibold rounded-md transition-colors duration-300 bg-transparent"
            >
              {cta2.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
