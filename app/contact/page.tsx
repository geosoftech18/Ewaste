import { Metadata } from "next"
import HeroSection from "@/components/contact/hero-section"
import ContactForm from "@/components/contact/contact-form"
import MapSection from "@/components/contact/map-section"
import SupportSection from "@/components/contact/support-section"
import CashForEWasteSection from "@/components/contact/cash-for-ewaste"
import CSRSection from "@/components/contact/csr-section"
import NewsletterSection from "@/components/contact/newsletter-section"

export const metadata: Metadata = {
  title: "Contact E-Waste Recycling Experts in India | SP Recycling",
  description: "Contact SP Recycling for professional e-waste recycling services. Get free quotes, schedule same-day pickup, request data destruction certificates. Available in Hyderabad, Mumbai, Delhi, Bangalore, Chennai, Pune. Call us or fill out the contact form for instant assistance.",
  keywords: "contact e-waste recycling, schedule pickup, free quote, data destruction, e-waste disposal contact, recycling services contact",
  openGraph: {
    title: "Contact Us for E-Waste Recycling Services | SP Recycling",
    description: "Get free quotes, schedule same-day pickup, and request data destruction certificates. Available across major cities in India.",
    type: "website",
  },
}

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
