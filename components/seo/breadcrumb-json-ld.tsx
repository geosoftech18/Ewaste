import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildBreadcrumbItems,
  type BreadcrumbItem,
} from '@/lib/seo'
import { getCityData } from '@/lib/city-data'
import { getServiceData } from '@/lib/service-data'
import { getEPRServiceData } from '@/lib/epr-service-data'
import type { Metadata } from 'next'

/** Canonical metadata helper — use in page/layout `metadata` / `generateMetadata`. */
export function canonicalMetadata(path: string): Pick<Metadata, 'alternates'> {
  return {
    alternates: {
      canonical: absoluteUrl(path === '/' ? '/' : path),
    },
  }
}

function labelOverridesForPath(pathname: string): Record<string, string> {
  const overrides: Record<string, string> = {}
  const parts = pathname.split('/').filter(Boolean)

  if (parts[0] === 'services' && parts[1] === 'city' && parts[2]) {
    const city = getCityData(parts[2])
    if (city) overrides[`/services/city/${parts[2]}`] = city.name
  }

  if (
    parts[0] === 'services' &&
    parts[1] &&
    parts[1] !== 'city' &&
    parts[1] !== 'EPR-compliance' &&
    !parts[2]
  ) {
    const service = getServiceData(parts[1])
    if (service) overrides[`/services/${parts[1]}`] = service.title
  }

  if (parts[0] === 'services' && parts[1] === 'EPR-compliance' && parts[2]) {
    const epr = getEPRServiceData(parts[2])
    if (epr) overrides[`/services/EPR-compliance/${parts[2]}`] = epr.title
  }

  return overrides
}

/** Server-rendered BreadcrumbList JSON-LD (no visible UI). */
export function BreadcrumbJsonLd({
  pathname,
  items,
}: {
  pathname?: string
  items?: BreadcrumbItem[]
}) {
  const crumbs =
    items ??
    buildBreadcrumbItems(pathname || '/', pathname ? labelOverridesForPath(pathname) : {})

  if (crumbs.length === 0) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbJsonLd(crumbs)),
      }}
    />
  )
}
