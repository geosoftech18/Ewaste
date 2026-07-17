import { Metadata } from 'next'
import { canonicalMetadata } from '@/components/seo/breadcrumb-json-ld'

export const metadata: Metadata = {
  title: "E-Waste Recycling Blog | Expert Tips & News - SP Recycling",
  description: "Read our comprehensive blog about e-waste recycling, sustainability, data destruction, and environmental impact. Get expert tips, industry news, and guides on responsible electronic waste disposal in India.",
  keywords: "e-waste recycling blog, sustainability blog, electronic waste disposal tips, recycling guides, environmental impact, data destruction blog",
  ...canonicalMetadata('/blog'),
  openGraph: {
    title: "E-Waste Recycling Blog | Latest News & Sustainability Guides",
    description: "Expert tips, industry news, and guides on responsible electronic waste disposal and recycling in India.",
    type: "website",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
