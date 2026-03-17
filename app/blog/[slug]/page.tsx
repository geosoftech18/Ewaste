'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/header'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  User,
  Share2,
  Heart,
  MessageCircle,
  BookOpen
} from 'lucide-react'

interface BlogPost {
  _id?: string
  id?: number
  title: string
  content: string
  excerpt: string
  tags: string[]
  status: string
  featuredImage: string | null
  slug?: string
  createdAt: string
  author?: string
  readTime?: string
  likes?: number
  comments?: number
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [slug, setSlug] = useState<string>('')

  // Fallback dummy blog posts data
  // const dummyPosts: BlogPost[] = [
  //   {
  //     id: 1,
  //     title: "Welcome to Our E-Waste Recycling Blog!",
  //     content: `
  //       <h2>Welcome to the Future of E-Waste Recycling</h2>
  //       <p>This is a sample blog post to demonstrate the blog module. Learn about sustainable e-waste management practices.</p>
        
  //       <h3>What You'll Find Here</h3>
  //       <p>Our blog covers a wide range of topics including:</p>
  //       <ul>
  //         <li>E-Waste recycling best practices</li>
  //         <li>Environmental sustainability insights</li>
  //         <li>Technology and recycling innovations</li>
  //         <li>Industry news and updates</li>
  //       </ul>
        
  //       <h3>Getting Started with Recycling</h3>
  //       <p>Feel free to explore our content and don't hesitate to reach out if you have any questions. We're here to help you make responsible choices for our planet.</p>
        
  //       <blockquote>
  //         <p>"The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt</p>
  //       </blockquote>
        
  //       <p>Thank you for visiting our blog, and we hope you find the content valuable and inspiring!</p>
  //     `,
  //     excerpt: "This is a sample blog post to demonstrate the blog module. The database is not configured yet, so this is placeholder content.",
  //     tags: ["welcome", "demo", "recycling"],
  //     status: "published",
  //     featuredImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
  //     createdAt: new Date().toISOString(),
  //     author: "SP Recycling Team",
  //     readTime: "5 min read",
  //     likes: 42,
  //     comments: 8
  //   },
  //   {
  //     id: 2,
  //     title: "Getting Started with Responsible E-Waste Disposal",
  //     content: `
  //       <h2>Mastering Responsible E-Waste Disposal</h2>
  //       <p>Learn how to properly dispose of electronic waste and contribute to environmental sustainability.</p>
        
  //       <h3>Key Benefits of Proper E-Waste Recycling</h3>
  //       <p>Our e-waste recycling services come with amazing benefits:</p>
  //       <ul>
  //         <li>Environmental protection and sustainability</li>
  //         <li>Secure data destruction and privacy protection</li>
  //         <li>Recovery of valuable materials</li>
  //         <li>Compliance with regulations</li>
  //         <li>Peace of mind knowing it's done right</li>
  //       </ul>
        
  //       <h3>Creating Your Recycling Plan</h3>
  //       <p>To start your e-waste recycling journey, simply contact us and we'll help you with a customized recycling plan.</p>
        
  //       <h3>Best Practices</h3>
  //       <p>Here are some tips for responsible e-waste management:</p>
  //       <ol>
  //         <li>Inventory your electronic devices</li>
  //         <li>Choose certified recyclers</li>
  //         <li>Ensure data destruction</li>
  //         <li>Track your recycling impact</li>
  //       </ol>
  //     `,
  //     excerpt: "Learn how to properly dispose of electronic waste and contribute to environmental sustainability.",
  //     tags: ["tutorial", "getting-started"],
  //     status: "published",
  //     featuredImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
  //     createdAt: new Date(Date.now() - 86400000).toISOString(),
  //     author: "Tech Writer",
  //     readTime: "7 min read",
  //     likes: 28,
  //     comments: 5
  //   },
  //   {
  //     id: 3,
  //     title: "The Future of Sustainable Recycling",
  //     content: `
  //       <h2>Exploring Tomorrow's Sustainable Future</h2>
  //       <p>Exploring the latest trends and technologies that are shaping the future of sustainable recycling.</p>
        
  //       <h3>Emerging Technologies in Recycling</h3>
  //       <p>The recycling industry is constantly evolving. Here are some key trends to watch:</p>
        
  //       <h4>Artificial Intelligence in Sorting</h4>
  //       <p>AI is revolutionizing how we sort and process recyclable materials, improving efficiency and accuracy.</p>
        
  //       <h4>Advanced Material Recovery</h4>
  //       <p>New technologies are enabling us to recover more valuable materials from e-waste, reducing environmental impact.</p>
        
  //       <h4>Circular Economy</h4>
  //       <p>The shift towards a circular economy is creating new opportunities for sustainable business practices.</p>
        
  //       <h3>What This Means for You</h3>
  //       <p>As these technologies mature, we're better equipped to provide you with the most responsible and effective recycling solutions.</p>
  //     `,
  //     excerpt: "Exploring the latest trends and technologies that are shaping the future of sustainable recycling.",
  //     tags: ["recycling", "future", "technology"],
  //     status: "draft",
  //     featuredImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
  //     createdAt: new Date(Date.now() - 172800000).toISOString(),
  //     author: "SP Recycling Team",
  //     readTime: "10 min read",
  //     likes: 15,
  //     comments: 3
  //   }
  // ]

  useEffect(() => {
    // Await params first
    const initParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    initParams()
  }, [params])

  useEffect(() => {
    if (!slug) return
    
    // Load post from API
    const fetchPost = async () => {
      setLoading(true)
      
      try {
        const response = await fetch(`/api/blog/slug/${slug}`)
        const result = await response.json()

        if (result.success && result.data) {
          const blogData = result.data
          // Add default values if missing
          const foundPost: BlogPost = {
            ...blogData,
            author: 'SP Recycling Team',
            readTime: '5 min read',
            likes: 0,
            comments: 0
          }
          setPost(foundPost)

          // Fetch related posts based on tags
          try {
            const tagsQuery = blogData.tags?.join(',') || ''
            if (tagsQuery) {
              const relatedResponse = await fetch(`/api/blog?search=${tagsQuery}`)
              const relatedResult = await relatedResponse.json()
              
              if (relatedResult.success && relatedResult.data) {
                // Filter out current post and only show published posts
                const filtered = relatedResult.data
                  .filter((p: any) => (p._id || p.id) !== (blogData._id || blogData.id) && p.status === 'published')
                  .slice(0, 2)
                setRelatedPosts(filtered)
              }
            }
          } catch (error) {
            console.error('Error fetching related posts:', error)
            setRelatedPosts([])
          }
        } else {
          setPost(null)
        }
      } catch (error) {
        console.error('Error loading blog post:', error)
        setPost(null)
      } finally {
      setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  const handleLike = () => {
    if (post) {
      setLiked(!liked)
      // In real app, this would update the database
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
   
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <Link href="/blog">
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={handleLike}
                variant="ghost"
                size="sm"
                className={`rounded-xl ${
                  liked 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-current' : ''}`} />
                {(post.likes || 0) + (liked ? 1 : 0)}
              </Button>
              
              <Button
                onClick={handleShare}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-emerald-600 rounded-xl"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          {post.featuredImage ? (
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 h-64 md:h-80 flex items-center justify-center">
              <BookOpen className="w-24 h-24 text-emerald-400" />
            </div>
          )}
        </motion.div>

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white border-gray-200 shadow-xl">
            <CardContent className="p-8">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                
               
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-emerald-50 text-emerald-700 border-emerald-300"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Content */}
              <div className="blog-content prose max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
              <style jsx global>{`
                .blog-content h1 {
                  font-size: 1.5rem;
                  font-weight: bold;
                  color: #047857;
                  margin: 1.5em 0 0.75em 0;
                  line-height: 1.2;
                }
                .blog-content h2 {
                  font-size: 1.25rem;
                  font-weight: bold;
                  color: #059669;
                  margin: 1.25em 0 0.625em 0;
                  line-height: 1.3;
                }
                .blog-content h3 {
                  font-size: 1.125rem;
                  font-weight: bold;
                  color: #10B981;
                  margin: 1em 0 0.5em 0;
                  line-height: 1.4;
                }
                .blog-content h4 {
                  font-size: 1.0625rem;
                  font-weight: bold;
                  color: #10B981;
                  margin: 0.875em 0 0.4375em 0;
                  line-height: 1.4;
                }
                .blog-content h5 {
                  font-size: 1rem;
                  font-weight: bold;
                  color: #34D399;
                  margin: 0.75em 0 0.375em 0;
                  line-height: 1.5;
                }
                .blog-content h6 {
                  font-size: 0.9375rem;
                  font-weight: bold;
                  color: #34D399;
                  margin: 0.625em 0 0.3125em 0;
                  line-height: 1.5;
                }
                @media (min-width: 640px) {
                  .blog-content h1 { font-size: 1.875rem; }
                  .blog-content h2 { font-size: 1.5rem; }
                  .blog-content h3 { font-size: 1.375rem; }
                  .blog-content h4 { font-size: 1.25em; }
                  .blog-content h5 { font-size: 1.125em; }
                  .blog-content h6 { font-size: 1em; }
                }
                @media (min-width: 768px) {
                  .blog-content h1 { font-size: 2.25rem; }
                  .blog-content h2 { font-size: 1.75rem; }
                  .blog-content h3 { font-size: 1.5rem; }
                }
                @media (min-width: 1024px) {
                  .blog-content h1 { font-size: 2.5rem; }
                  .blog-content h2 { font-size: 2rem; }
                  .blog-content h3 { font-size: 1.5rem; }
                }
                .blog-content h1:first-child,
                .blog-content h2:first-child,
                .blog-content h3:first-child,
                .blog-content h4:first-child,
                .blog-content h5:first-child,
                .blog-content h6:first-child {
                  margin-top: 0;
                }
                .blog-content p {
                  color: #374151;
                  margin: 1em 0;
                  line-height: 1.7;
                  font-size: 1rem;
                }
                .blog-content ul,
                .blog-content ol {
                  color: #374151;
                  margin: 1em 0;
                  padding-left: 2em;
                  line-height: 1.7;
                }
                .blog-content li {
                  margin: 0.5em 0;
                  color: #374151;
                }
                .blog-content strong {
                  font-weight: bold;
                  color: #1f2937;
                }
                .blog-content em {
                  font-style: italic;
                  color: #374151;
                }
                .blog-content u {
                  text-decoration: underline;
                }
                .blog-content s {
                  text-decoration: line-through;
                }
                .blog-content blockquote {
                  border-left: 4px solid #10B981;
                  padding-left: 1.5em;
                  margin: 1.5em 0;
                  color: #4b5563;
                  font-style: italic;
                  background: #ecfdf5;
                  padding: 1em 1.5em;
                  border-radius: 0.5em;
                }
                .blog-content blockquote p {
                  margin: 0.5em 0;
                }
                .blog-content a {
                  color: #059669;
                  text-decoration: underline;
                  transition: color 0.2s;
                }
                .blog-content a:hover {
                  color: #047857;
                }
                .blog-content code {
                  background-color: #f3f4f6;
                  color: #dc2626;
                  padding: 0.2em 0.4em;
                  border-radius: 0.25em;
                  font-size: 0.9em;
                  font-family: 'Courier New', monospace;
                }
                .blog-content pre {
                  background-color: #1f2937;
                  color: #f3f4f6;
                  padding: 1.5em;
                  border-radius: 0.5em;
                  overflow-x: auto;
                  margin: 1.5em 0;
                }
                .blog-content pre code {
                  background-color: transparent;
                  padding: 0;
                  color: inherit;
                }
                .blog-content img {
                  max-width: 100%;
                  height: auto;
                  margin: 2em 0;
                  border-radius: 0.5em;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }
                .blog-content table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 1.5em 0;
                  background: #f9fafb;
                  border-radius: 0.5em;
                  overflow: hidden;
                }
                .blog-content th,
                .blog-content td {
                  border: 1px solid #e5e7eb;
                  padding: 0.75em;
                  text-align: left;
                  color: #374151;
                }
                .blog-content th {
                  background-color: #ecfdf5;
                  font-weight: bold;
                  color: #047857;
                }
                .blog-content hr {
                  border: none;
                  border-top: 2px solid #e5e7eb;
                  margin: 2em 0;
                }
                .blog-content iframe {
                  max-width: 100%;
                  margin: 2em 0;
                  border-radius: 0.5em;
                }
              `}</style>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-200">
                <Button
                  onClick={handleLike}
                  className={`rounded-xl ${
                    liked 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                  {liked ? 'Liked' : 'Like'} ({(post.likes || 0) + (liked ? 1 : 0)})
                </Button>
                
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600 rounded-xl"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Post
                </Button>
                
                <Link href="/blog">
                  <Button 
                    variant="outline" 
                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 rounded-xl"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Back to Posts
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Posts - Only show if exists */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 mb-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Related Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <Link 
                  key={relatedPost._id || index}
                  href={`/blog/${relatedPost.slug || relatedPost.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}`}
                >
                  <Card className="bg-white border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      {relatedPost.featuredImage ? (
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg mb-4 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-emerald-400" />
                        </div>
                      )}
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
    </>
  )
}

