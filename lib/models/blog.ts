import mongoose, { Schema, Document } from 'mongoose'

export interface IBlog extends Document {
  title: string
  content: string
  excerpt: string
  metaTitle?: string
  metaDescription?: string
  tags: string[]
  status: 'published' | 'draft'
  featuredImage: string | null
  slug: string
  createdAt: Date
  updatedAt: Date
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Please provide blog content'],
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [500, 'Excerpt cannot be more than 500 characters'],
    },
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [70, 'Meta title cannot be more than 70 characters'],
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [320, 'Meta description cannot be more than 320 characters'],
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'draft',
    },
    featuredImage: {
      type: String,
      default: null,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

// Generate slug before saving
BlogSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }
  next()
})

// Generate excerpt if not provided
BlogSchema.pre('save', function (next) {
  if (!this.excerpt && this.content) {
    const plainText = this.content.replace(/<[^>]*>/g, '')
    this.excerpt = plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText
  }
  next()
})

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)

