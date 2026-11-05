"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, ArrowRight } from "lucide-react"
import type { BlogCard } from "@/lib/blog-queries"

export function BlogPostsGrid({ posts }: { posts: BlogCard[] }) {
  if (posts.length === 0) {
    return (
      <div className="py-16 text-center">
        <FileText className="mx-auto mb-4 h-16 w-16 text-gray-300" />
        <h3 className="mb-2 text-xl text-gray-600">No blog posts yet</h3>
        <p className="text-gray-500">
          Check back soon for new content about E-Waste Recycling!
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post._id} href={`/blog/${post.slug}`} className="block h-full">
          <Card className="group h-full cursor-pointer border-gray-200 bg-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            <div className="relative overflow-hidden rounded-t-lg">
              {post.featuredImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-200">
                  <FileText className="h-16 w-16 text-emerald-400" />
                </div>
              )}
              <div className="absolute right-3 top-3">
                <Badge className="border-green-300 bg-green-100 text-green-700">
                  {post.status}
                </Badge>
              </div>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="line-clamp-2 text-lg text-gray-800 transition-colors group-hover:text-emerald-600">
                {post.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="mr-1 h-3 w-3" />
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                  tabIndex={-1}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
