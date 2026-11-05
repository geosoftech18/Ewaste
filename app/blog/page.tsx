import Link from "next/link"
import type { Metadata } from "next"
import { BreadcrumbNav } from "@/components/seo/breadcrumb-nav"
import { BreadcrumbJsonLd, canonicalMetadata } from "@/components/seo/breadcrumb-json-ld"
import { BlogPostsGrid } from "@/components/blog/blog-posts-grid"
import { getPublishedBlogCards } from "@/lib/blog-queries"

/** Cache the blog index for 2 minutes — avoids a cold client fetch on every visit */
export const revalidate = 120

export const metadata: Metadata = {
  title: "Blog | SP Recycling",
  description:
    "Discover articles about e-waste recycling, data destruction, and sustainability from SP Recycling.",
  ...canonicalMetadata("/blog"),
}

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getPublishedBlogCards>> = []
  try {
    posts = await getPublishedBlogCards()
  } catch (error) {
    console.error("Error loading published blogs:", error)
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-4 md:p-8">
      <BreadcrumbJsonLd pathname="/blog" />
      <BreadcrumbNav variant="dark" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 pt-10 text-center">
          <h1 className="mb-4 text-4xl font-bold text-emerald-700 md:text-5xl">
            Blog Posts
          </h1>
          <p className="text-lg text-gray-600">
            Discover amazing content about E-Waste Recycling and Sustainability
          </p>
          <p className="mt-4 text-sm text-gray-600">
            Looking for side-by-side answers?{" "}
            <Link
              href="/compare"
              className="font-semibold text-emerald-700 underline underline-offset-4"
            >
              Read our comparison guides
            </Link>
            .
          </p>
        </div>

        <BlogPostsGrid posts={posts} />
      </div>
    </main>
  )
}
