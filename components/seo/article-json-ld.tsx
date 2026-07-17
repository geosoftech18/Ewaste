import dbConnect from '@/lib/mongodb'
import Blog from '@/lib/models/blog'
import { JsonLd, articleJsonLd } from '@/components/seo/structured-data'

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function wordCountFromHtml(html: string): number {
  const text = stripHtml(html)
  if (!text) return 0
  return text.split(/\s+/).filter(Boolean).length
}

/**
 * BlogPosting JSON-LD aligned with blog UI/API pattern:
 * - headline = title (visible H1), not metaTitle
 * - description = metaDescription || excerpt
 * - author = "SP Recycling Team" (same default as blog page)
 * - keywords / articleSection from tags
 * - dates from createdAt / updatedAt
 * - image from featuredImage
 */
export async function ArticleJsonLd({ slug }: { slug: string }) {
  try {
    await dbConnect()
    const doc = await Blog.findOne({ slug, status: 'published' }).lean()
    if (!doc) return null

    const title = (doc.title || '').trim()
    if (!title) return null

    const metaDescription = (doc as { metaDescription?: string }).metaDescription?.trim()
    const excerpt =
      typeof doc.excerpt === 'string' ? stripHtml(doc.excerpt).trim() : ''
    const description =
      metaDescription ||
      excerpt ||
      'Read this article on the SP Recycling blog.'

    const tags = Array.isArray(doc.tags)
      ? doc.tags.map((t) => String(t).trim()).filter(Boolean)
      : []

    const content =
      typeof doc.content === 'string' ? doc.content : ''

    return (
      <JsonLd
        id={`article-jsonld-${slug}`}
        data={articleJsonLd({
          title,
          description,
          path: `/blog/${slug}`,
          image: doc.featuredImage,
          datePublished: doc.createdAt,
          dateModified: doc.updatedAt || doc.createdAt,
          authorName: 'SP Recycling Team',
          keywords: tags,
          wordCount: wordCountFromHtml(content),
        })}
      />
    )
  } catch {
    return null
  }
}
