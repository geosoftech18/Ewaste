import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Blog from '@/lib/models/blog'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'published'
    const search = searchParams.get('search')

    let query: any = {}

    // Filter by status
    if (status && status !== 'all') {
      query.status = status
    }

    // Search in title, content, or tags
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ]
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 }).lean()

    return NextResponse.json({
      success: true,
      data: blogs,
    })
  } catch (error: any) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()
    const { title, content, excerpt, tags, featuredImage, status } = body

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

