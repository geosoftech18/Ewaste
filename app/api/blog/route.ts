import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { getMongoConnectionHint } from '@/lib/mongodb-errors'
import Blog from '@/lib/models/blog'
import { toListFeaturedImage } from '@/lib/blog-queries'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'published'
    const search = searchParams.get('search')
    // Admin list needs thumbnails (may be base64). Public callers stay lite.
    const includeImages = searchParams.get('includeImages') === '1'
    const limitParam = Number(searchParams.get('limit') || '0')
    const limit =
      Number.isFinite(limitParam) && limitParam > 0
        ? Math.min(Math.floor(limitParam), 50)
        : 0

    const query: Record<string, unknown> = {}

    if (status && status !== 'all') {
      query.status = status
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ]
    }

    // Lean list only — never pull HTML content into the listing payload.
    const blogs = await Blog.find(query)
      .select(
        includeImages
          ? 'title excerpt metaTitle metaDescription tags status featuredImage slug createdAt updatedAt'
          : 'title excerpt tags status featuredImage slug createdAt'
      )
      .lean()

    blogs.sort(
      (a, b) =>
        new Date(b.createdAt as Date).getTime() - new Date(a.createdAt as Date).getTime()
    )

    const sliced = limit > 0 ? blogs.slice(0, limit) : blogs

    const data = includeImages
      ? sliced
      : sliced.map((blog) => ({
          ...blog,
          featuredImage: toListFeaturedImage(blog.featuredImage as string | null),
        }))

    const response = NextResponse.json({
      success: true,
      data,
    })

    // Short CDN/browser cache for the public published list (no search)
    if (status === 'published' && !search && !includeImages) {
      response.headers.set(
        'Cache-Control',
        'public, s-maxage=120, stale-while-revalidate=600'
      )
    } else {
      response.headers.set('Cache-Control', 'no-store')
    }

    return response
  } catch (error: unknown) {
    console.error('Error fetching blogs:', error)
    const hint = getMongoConnectionHint(error)
    return NextResponse.json(
      {
        success: false,
        error: hint ?? (error instanceof Error ? error.message : 'Failed to fetch blogs'),
      },
      { status: hint ? 503 : 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()
    const { title, content, excerpt, metaTitle, metaDescription, tags, featuredImage, status } =
      body

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const blog = new Blog({
      title,
      content,
      excerpt,
      metaTitle:
        typeof metaTitle === 'string' && metaTitle.trim() ? metaTitle.trim() : undefined,
      metaDescription:
        typeof metaDescription === 'string' && metaDescription.trim()
          ? metaDescription.trim()
          : undefined,
      tags: tags || [],
      featuredImage,
      status: status || 'draft',
    })

    await blog.save()

    return NextResponse.json({
      success: true,
      data: blog,
      message: 'Blog created successfully',
    })
  } catch (error: any) {
    console.error('Error creating blog:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create blog' },
      { status: 500 }
    )
  }
}
