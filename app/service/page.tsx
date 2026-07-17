import type { Metadata } from 'next'
import HeroSection from '@/components/service/HeroSection'
import ServiceOverview from '@/components/service/ServiceOverview'
import ServiceDetails from '@/components/service/ServiceDetails'
import DataDestructionSection from '@/components/service/DataDestructionSection'
import WhyChooseUs from '@/components/service/WhyChooseUs'
import Testimonials from '@/components/service/Testimonials'
import QuoteForm from '@/components/service/QuoteForm'
import FAQ from '@/components/service/FAQ'
import Footer from '@/components/service/Footer'
import { BreadcrumbJsonLd, canonicalMetadata } from '@/components/seo/breadcrumb-json-ld'

export const metadata: Metadata = {
  title: 'E-Waste Recycling Service | SP Recycling',
  description:
    'Professional e-waste recycling services with certified data destruction and eco-friendly disposal.',
  ...canonicalMetadata('/service'),
}

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbJsonLd pathname="/service" />
      <HeroSection />
      <ServiceOverview />
      <ServiceDetails />
      <DataDestructionSection />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <QuoteForm />
      <Footer />
    </div>
  )
}
