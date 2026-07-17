import { JsonLd, organizationJsonLd } from '@/components/seo/structured-data'

/** Sitewide Organization + LocalBusiness + WebSite schema (no UI). */
export function OrganizationJsonLd() {
  return <JsonLd id="organization-jsonld" data={organizationJsonLd()} />
}
