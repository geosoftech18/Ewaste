import dbConnect from "@/lib/mongodb"
import Blog from "@/lib/models/blog"

export type BlogCard = {
  _id: string
  title: string
  excerpt: string
  tags: string[]
  status: "published" | "draft"
  featuredImage: string | null
  slug: string
  createdAt: string
}

/**
 * Resolve a list-card image URL without embedding huge base64 in JSON.
 * External/path URLs pass through; data-URI images use the image API.
 */
export function toListFeaturedImage(
  id: string,
  src?: string | null
): string | null {
  if (!src) return null
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("/")
  ) {
    return src
  }
  if (src.startsWith("data:")) {
    return `/api/blog/${id}/image`
  }
  return null
}

let indexesEnsured = false

async function ensureBlogIndexes() {
  if (indexesEnsured) return
  try {
    await Blog.createIndexes()
    indexesEnsured = true
  } catch {
    // Index creation can fail on restricted Atlas roles; queries still work.
  }
}

/**
 * Lean published cards for the public blog index.
 * Excludes HTML content and base64 images so the payload stays small.
 */
export async function getPublishedBlogCards(): Promise<BlogCard[]> {
  await dbConnect()
  await ensureBlogIndexes()

  const blogs = await Blog.find({ status: "published" })
    .select("title excerpt tags status slug createdAt featuredImage")
    .lean()

  blogs.sort(
    (a, b) =>
      new Date(b.createdAt as Date).getTime() -
      new Date(a.createdAt as Date).getTime()
  )

  return blogs.map((blog) => ({
    _id: String(blog._id),
    title: blog.title,
    excerpt: blog.excerpt || "",
    tags: blog.tags || [],
    status: blog.status as BlogCard["status"],
    featuredImage: toListFeaturedImage(String(blog._id), blog.featuredImage),
    slug: blog.slug,
    createdAt:
      blog.createdAt instanceof Date
        ? blog.createdAt.toISOString()
        : String(blog.createdAt),
  }))
}
