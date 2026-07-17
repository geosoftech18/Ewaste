import { Metadata } from 'next'
import { BreadcrumbJsonLd, canonicalMetadata } from '@/components/seo/breadcrumb-json-ld'

export const metadata: Metadata = {
  title: 'Corporate E-Waste Recycling Landing | SP Recycling',
  description:
    'Book same-day corporate e-waste pickup with certified data destruction and EPR-ready documentation.',
  ...canonicalMetadata('/landing-page'),
}

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbJsonLd pathname="/landing-page" />
      {children}
    </>
  )
}
