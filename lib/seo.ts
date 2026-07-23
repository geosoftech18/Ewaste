export const SITE_URL = 'https://www.sprecycling.in'

export type BreadcrumbItem = {
  name: string
  path: string
}

const SEGMENT_LABELS: Record<string, string> = {
  about: 'About Us',
  services: 'Services',
  city: 'Cities We Serve',
  blog: 'Blog',
  contact: 'Contact Us',
  'social-impact': 'Social Impact',
  'EPR-compliance': 'EPR Compliance',
  'audit-request': 'Audit Request',
  'landing-page': 'Landing Page',
  service: 'Services',
  admin: 'Admin',
}

function humanizeSegment(segment: string): string {
  return decodeURIComponent(segment)
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

/** Absolute URL with fixed production base (no trailing slash except home). */
export function absoluteUrl(path = '/'): string {
  if (!path || path === '/') return SITE_URL
  const normalized = path.startsWith('/') ? path : `/${path}`
  const trimmed = normalized.replace(/\/+$/, '')
  // Encode each segment so spaces / & in asset paths stay valid URLs
  const encoded = trimmed
    .split('/')
    .map((segment, index) => (index === 0 ? '' : encodeURIComponent(segment)))
    .join('/')
  return `${SITE_URL}${encoded}`
}

/**
 * Build BreadcrumbList items from a pathname.
 * Optional labelOverrides for the last segment(s), keyed by full path or segment.
 */
export function buildBreadcrumbItems(
  pathname: string,
  labelOverrides: Record<string, string> = {}
): BreadcrumbItem[] {
  const clean = (pathname.split('?')[0] || '/').replace(/\/+$/, '') || '/'
  const items: BreadcrumbItem[] = [{ name: 'Home', path: '/' }]

  if (clean === '/') return items

  const segments = clean.split('/').filter(Boolean)
  let current = ''

  for (const segment of segments) {
    current += `/${segment}`
    const name =
      labelOverrides[current] ||
      labelOverrides[segment] ||
      SEGMENT_LABELS[segment] ||
      humanizeSegment(segment)

    items.push({ name, path: current })
  }

  return items
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** Skip SEO injection on private / non-index routes. */
export function shouldEmitPageSeo(pathname: string): boolean {
  const p = pathname || '/'
  if (p.startsWith('/admin')) return false
  if (p.startsWith('/api')) return false
  return true
}
