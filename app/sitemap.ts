import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { getAllServiceSlugs } from '@/lib/service-data'
import { getAllCitySlugs } from '@/lib/city-data'
import { getAllEPRServiceSlugs } from '@/lib/epr-service-data'

/** Refresh sitemap periodically so newly published blogs appear without a full redeploy. */
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/landing-page`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/social-impact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/audit-request`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/services/city`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/EPR-compliance`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Fetch published blog posts from MongoDB (isolated so DB failures never drop other URLs)
  let blogPosts: MetadataRoute.Sitemap = []
  try {
    const [{ default: dbConnect }, { default: Blog }] = await Promise.all([
      import('@/lib/mongodb'),
      import('@/lib/models/blog'),
    ])
    await dbConnect()
    const blogs = await Blog.find({ status: 'published', slug: { $exists: true, $ne: '' } })
      .select('slug updatedAt createdAt')
      .sort({ updatedAt: -1 })
      .lean()
      .exec()

    const seen = new Set<string>()
    blogPosts = blogs.flatMap((blog) => {
      const slug = typeof blog.slug === 'string' ? blog.slug.trim() : ''
      if (!slug || seen.has(slug)) return []
      seen.add(slug)
      const lastModified = blog.updatedAt
        ? new Date(blog.updatedAt)
        : blog.createdAt
          ? new Date(blog.createdAt)
          : now
      return [
        {
          url: `${baseUrl}/blog/${slug}`,
          lastModified,
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        },
      ]
    })
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  const servicePages: MetadataRoute.Sitemap = getAllServiceSlugs().map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // City landing pages — keep discoverable for Google
  const cityPages: MetadataRoute.Sitemap = getAllCitySlugs().map((slug) => ({
    url: `${baseUrl}/services/city/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  const eprServicePages: MetadataRoute.Sitemap = getAllEPRServiceSlugs().map((slug) => ({
    url: `${baseUrl}/services/EPR-compliance/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    ...staticPages,
    ...blogPosts,
    ...servicePages,
    ...cityPages,
    ...eprServicePages,
  ]
}
