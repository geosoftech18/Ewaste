import { SITE_URL, absoluteUrl } from '@/lib/seo'

export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const ORGANIZATION = {
  name: 'SP Recycling Pvt Ltd',
  legalName: 'S P Recycling Pvt Ltd',
  url: SITE_URL,
  logo: `${SITE_URL}/S.P%20recycling.png`,
  email: 'siliconplanetrecycling@gmail.com',
  telephone: '+919949901238',
  description:
    'ISO certified e-waste recycling company providing secure data destruction, eco-friendly disposal, and EPR compliance services across India.',
  address: {
    streetAddress: 'Thumkunta, Bommalaramaram Mandal, Bibinagar',
    addressLocality: 'Yadadri Bhuvanagiri',
    addressRegion: 'Telangana',
    postalCode: '500078',
    addressCountry: 'IN',
  },
  areaServed: 'IN',
  priceRange: '$$',
} as const

/** Reusable JSON-LD script tag (no UI). */
export function JsonLd({ data, id }: { data: Record<string, unknown> | object; id?: string }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness', 'RecyclingCenter'],
        '@id': ORG_ID,
        name: ORGANIZATION.name,
        legalName: ORGANIZATION.legalName,
        url: ORGANIZATION.url,
        logo: {
          '@type': 'ImageObject',
          url: ORGANIZATION.logo,
        },
        image: ORGANIZATION.logo,
        email: ORGANIZATION.email,
        telephone: ORGANIZATION.telephone,
        description: ORGANIZATION.description,
        priceRange: ORGANIZATION.priceRange,
        address: {
          '@type': 'PostalAddress',
          ...ORGANIZATION.address,
        },
        areaServed: {
          '@type': 'Country',
          name: 'India',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: ORGANIZATION.telephone,
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi', 'Telugu'],
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_URL,
        name: ORGANIZATION.name,
        publisher: { '@id': ORG_ID },
        inLanguage: 'en-IN',
      },
    ],
  }
}

export function serviceJsonLd(input: {
  name: string
  description: string
  path: string
  image?: string
  serviceType?: string
  faqs?: Array<{ question: string; answer: string }>
}) {
  const pageUrl = absoluteUrl(input.path)
  const graph: object[] = [
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: input.name,
      description: input.description,
      url: pageUrl,
      serviceType: input.serviceType || 'E-Waste Recycling',
      provider: { '@id': ORG_ID },
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
      ...(input.image
        ? {
            image: input.image.startsWith('http')
              ? input.image
              : absoluteUrl(input.image),
          }
        : {}),
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: input.name,
      description: input.description,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': `${pageUrl}#service` },
      publisher: { '@id': ORG_ID },
    },
  ]

  if (input.faqs && input.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: input.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

export function articleJsonLd(input: {
  /** Visible post title (H1) — not metaTitle */
  title: string
  description: string
  path: string
  image?: string | null
  datePublished?: string | Date
  dateModified?: string | Date
  authorName?: string
  keywords?: string[]
  /** Plain-text word count from content when available */
  wordCount?: number
}) {
  const pageUrl = absoluteUrl(input.path)
  const published = input.datePublished
    ? new Date(input.datePublished).toISOString()
    : undefined
  const modified = input.dateModified
    ? new Date(input.dateModified).toISOString()
    : published

  const imageUrl = input.image
    ? input.image.startsWith('http')
      ? input.image
      : absoluteUrl(input.image)
    : undefined

  const authorName = input.authorName || 'SP Recycling Team'

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${pageUrl}#article`,
    headline: input.title,
    name: input.title,
    description: input.description,
    url: pageUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    ...(imageUrl
      ? {
          image: [imageUrl],
          thumbnailUrl: imageUrl,
        }
      : {}),
    ...(published ? { datePublished: published } : {}),
    ...(modified ? { dateModified: modified } : {}),
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: ORGANIZATION.name,
      logo: {
        '@type': 'ImageObject',
        url: ORGANIZATION.logo,
      },
    },
    isPartOf: {
      '@id': WEBSITE_ID,
    },
    ...(input.keywords && input.keywords.length
      ? {
          keywords: input.keywords.join(', '),
          articleSection: input.keywords[0],
        }
      : {}),
    ...(typeof input.wordCount === 'number' && input.wordCount > 0
      ? { wordCount: input.wordCount }
      : {}),
    inLanguage: 'en-IN',
  }
}
