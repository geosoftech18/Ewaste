import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Get base URL from environment variable or use default
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : 'https://www.sprecycling.in')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/', // Disallow admin pages
          '/api/', // Disallow API routes (optional, but good practice)
          '/_next/', // Disallow Next.js internal files
          '/static/', // Disallow static files if any
        ],
      },
      // Allow specific bots to access everything
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}


