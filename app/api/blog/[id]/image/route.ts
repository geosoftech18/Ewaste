import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import dbConnect from "@/lib/mongodb"
import Blog from "@/lib/models/blog"

const { ObjectId } = mongoose.Types

/**
 * Serves a blog featured image without embedding base64 in the list JSON.
 * Keeps /blog fast while still showing thumbnails.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid blog ID" },
        { status: 400 }
      )
    }

    await dbConnect()

    const blog = await Blog.findById(id).select("featuredImage status").lean()

    if (!blog?.featuredImage) {
      return new NextResponse("Not found", { status: 404 })
    }

    const src = blog.featuredImage

    if (src.startsWith("http://") || src.startsWith("https://")) {
      return NextResponse.redirect(src, 302)
    }

    if (src.startsWith("/")) {
      return NextResponse.redirect(new URL(src, _request.url), 302)
    }

    const match = src.match(/^data:([^;]+);base64,(.+)$/)
    if (!match) {
      return new NextResponse("Unsupported image", { status: 415 })
    }

    const contentType = match[1] || "image/jpeg"
    const buffer = Buffer.from(match[2], "base64")

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(buffer.length),
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    })
  } catch (error) {
    console.error("Error serving blog image:", error)
    return new NextResponse("Failed to load image", { status: 500 })
  }
}
