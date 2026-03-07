import { MetadataRoute } from 'next'
import dbConnect from '@/lib/mongodb'
import Blog from '@/lib/models/blog'
import { getAllServiceSlugs } from '@/lib/service-data'
import { getAllCitySlugs } from '@/lib/city-data'
import { getAllEPRServiceSlugs } from '@/lib/epr-service-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get base URL from environment variable or use default
  const baseUrl = 'https://www.sprecycling.in'

  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/landing-page`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/social-impact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/audit-request`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/services/city`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/EPR-compliance`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Fetch published blog posts from MongoDB
  let blogPosts: MetadataRoute.Sitemap = []
  try {
    await dbConnect()
    const blogs = await Blog.find({ status: 'published' })
      .select('slug updatedAt')
      .lean()
      .exec()

    blogPosts = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
    // Continue without blog posts if there's an error
  }

  // Get all service slugs and create URLs
  const serviceSlugs = getAllServiceSlugs()
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Get all city slugs and create URLs
  const citySlugs = getAllCitySlugs()
  const cityPages: MetadataRoute.Sitemap = citySlugs.map((slug) => ({
    url: `${baseUrl}/services/city/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Get all EPR service slugs and create URLs
  const eprServiceSlugs = getAllEPRServiceSlugs()
  const eprServicePages: MetadataRoute.Sitemap = eprServiceSlugs.map((slug) => ({
    url: `${baseUrl}/services/EPR-compliance/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Combine all pages
  return [
    ...staticPages,
    ...blogPosts,
    ...servicePages,
    ...cityPages,
    ...eprServicePages,
  ]
}

