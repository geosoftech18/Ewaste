'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildBreadcrumbItems,
  shouldEmitPageSeo,
} from '@/lib/seo'
import { getCityData } from '@/lib/city-data'
import { getServiceData } from '@/lib/service-data'
import { getEPRServiceData } from '@/lib/epr-service-data'

const CANONICAL_ATTR = 'data-sp-canonical'
const BREADCRUMB_ATTR = 'data-sp-breadcrumb-client'

/**
 * Keeps canonical + breadcrumb in sync on client navigations.
 * Server pages already emit these in HTML; this only upserts and does not
 * change UI or routing behavior.
 */
export function PageSeo() {
  const pathname = usePathname() || '/'

  useEffect(() => {
    if (!shouldEmitPageSeo(pathname)) return

    const href = absoluteUrl(pathname)
    let link = document.querySelector(
      `link[${CANONICAL_ATTR}]`
    ) as HTMLLinkElement | null
    const existing = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null

    if (existing) {
      existing.setAttribute('href', href)
      existing.setAttribute(CANONICAL_ATTR, '1')
    } else if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      link.setAttribute(CANONICAL_ATTR, '1')
      link.href = href
      document.head.appendChild(link)
    } else {
      link.href = href
    }

    const overrides = labelOverrides(pathname)
    const schema = breadcrumbJsonLd(buildBreadcrumbItems(pathname, overrides))

    // Prefer updating our client-owned script; leave server scripts alone if present
    // by replacing any previous client script only.
    let script = document.querySelector(
      `script[${BREADCRUMB_ATTR}]`
    ) as HTMLScriptElement | null

    if (!script) {
      // If server already rendered a BreadcrumbList, skip adding a second one.
      const hasServerBreadcrumb = Array.from(
        document.querySelectorAll('script[type="application/ld+json"]')
      ).some((node) => {
        try {
          const data = JSON.parse(node.textContent || '{}')
          return data['@type'] === 'BreadcrumbList'
        } catch {
          return false
        }
      })
      if (hasServerBreadcrumb) return

      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute(BREADCRUMB_ATTR, '1')
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify(schema)
  }, [pathname])

  return null
}

function labelOverrides(pathname: string): Record<string, string> {
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
