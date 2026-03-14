import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Social Impact & CSR Programs | Community Empowerment & Sustainability - SP Recycling",
  description: "Learn about SP Recycling's social impact initiatives including waste picker empowerment, zero waste events, circular economy advocacy, and community mobilization programs. Creating lasting change through sustainable action.",
  keywords: "social impact, CSR programs, waste picker empowerment, zero waste events, circular economy, community mobilization, sustainability programs",
  openGraph: {
    title: "Social Impact & CSR Programs | Community Empowerment - SP Recycling",
    description: "Creating lasting change through waste picker empowerment, zero waste events, and community mobilization programs.",
    type: "website",
  },
}

export default function SocialImpactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

