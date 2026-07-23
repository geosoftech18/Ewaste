import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import dbConnect from '@/lib/mongodb'
import Blog from '@/lib/models/blog'

const { ObjectId } = mongoose.Types

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    const { id } = params

    // Check if id is valid MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid blog ID' },
        { status: 400 }
      )
    }

    const blog = await Blog.findById(id)

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: blog,
    })
  } catch (error: any) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    const { id } = params
    const body = await request.json()
    const { title, content, excerpt, metaTitle, metaDescription, tags, featuredImage, status } =
      body

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid blog ID' },
        { status: 400 }
      )
    }

    const updatePayload: Record<string, unknown> = {
      title,
      content,
      excerpt,
      tags: tags || [],
      featuredImage,
      status: status || 'draft',
      updatedAt: new Date(),
    }
    if (metaTitle !== undefined) {
      updatePayload.metaTitle = typeof metaTitle === 'string' ? metaTitle.trim() || null : null
    }
    if (metaDescription !== undefined) {
      updatePayload.metaDescription =
        typeof metaDescription === 'string' ? metaDescription.trim() || null : null
    }

    const blog = await Blog.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    })

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: blog,
      message: 'Blog updated successfully',
    })
  } catch (error: any) {
    console.error('Error updating blog:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update blog' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid blog ID' },
        { status: 400 }
      )
    }

    const blog = await Blog.findByIdAndDelete(id)

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    })
  } catch (error: any) {
    console.error('Error deleting blog:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete blog' },
      { status: 500 }
    )
  }
}

