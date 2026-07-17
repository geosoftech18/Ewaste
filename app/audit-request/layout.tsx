import { Metadata } from 'next'
import { BreadcrumbJsonLd, canonicalMetadata } from '@/components/seo/breadcrumb-json-ld'

export const metadata: Metadata = {
  title: 'Audit Request | SP Recycling',
  description:
    'Request an e-waste and IT asset audit with SP Recycling. Certified, compliant, and eco-friendly.',
  ...canonicalMetadata('/audit-request'),
}

export default function AuditRequestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbJsonLd pathname="/audit-request" />
      {children}
    </>
  )
}
