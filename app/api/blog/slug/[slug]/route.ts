import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Blog from '@/lib/models/blog'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect()

    const { slug } = params

    const blog = await Blog.findOne({ slug, status: 'published' }).lean()

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      )
    }

    const response = NextResponse.json({
      success: true,
      data: blog,
    })
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=120, stale-while-revalidate=600'
    )
    return response
  } catch (error: any) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}
