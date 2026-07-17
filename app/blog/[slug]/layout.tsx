import type { Metadata } from 'next'
import dbConnect from '@/lib/mongodb'
import Blog from '@/lib/models/blog'
import { BreadcrumbJsonLd, canonicalMetadata } from '@/components/seo/breadcrumb-json-ld'
import { ArticleJsonLd } from '@/components/seo/article-json-ld'

type MetadataProps = {
  params: { slug: string }
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { slug } = params

  try {
    await dbConnect()
    const doc = await Blog.findOne({ slug }).lean()

    if (!doc) {
      return {
        title: 'Post Not Found | SP Recycling',
        description: 'The blog post you are looking for could not be found.',
        ...canonicalMetadata(`/blog/${slug}`),
      }
    }

    const metaTitle = (doc as { metaTitle?: string }).metaTitle?.trim()
    const metaDescription = (doc as { metaDescription?: string }).metaDescription?.trim()
    const title = metaTitle || doc.title
    const description =
      metaDescription ||
      (typeof doc.excerpt === 'string' && doc.excerpt.trim()) ||
      'Read this article on the SP Recycling blog.'

    const base: Metadata = {
      title,
      description,
      ...canonicalMetadata(`/blog/${slug}`),
      openGraph: {
        title,
        description,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    }

    if (doc.featuredImage) {
      base.openGraph = { ...base.openGraph, images: [{ url: doc.featuredImage }] }
      base.twitter = { ...base.twitter, images: [doc.featuredImage] }
    }

    return base
  } catch {
    return {
      title: 'Blog | SP Recycling',
      description: 'E-waste recycling insights and news from SP Recycling.',
      ...canonicalMetadata(`/blog/${slug}`),
    }
  }
}

export default function BlogPostSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  return (
    <>
      <BreadcrumbJsonLd pathname={`/blog/${params.slug}`} />
      <ArticleJsonLd slug={params.slug} />
      {children}
    </>
  )
}
