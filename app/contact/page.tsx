import HeroSection from "@/components/contact/hero-section"
import ContactForm from "@/components/contact/contact-form"
import MapSection from "@/components/contact/map-section"
import SupportSection from "@/components/contact/support-section"
import CashForEWasteSection from "@/components/contact/cash-for-ewaste"
import CSRSection from "@/components/contact/csr-section"
import NewsletterSection from "@/components/contact/newsletter-section"

export default function ContactPage() {
  return (
    <main className="w-full">
      <HeroSection />
      <ContactForm />
      <MapSection />
      <SupportSection />
      <CashForEWasteSection />
      <CSRSection />
      <NewsletterSection />
  
    </main>
  )
}
