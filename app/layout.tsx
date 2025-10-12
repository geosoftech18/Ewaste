import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/sonner"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "SP Recycling Pvt Ltd - E-Waste Recycling Services",
  description: "ISO Certified E-Waste Recycling | Secure Data Destruction | 100% Eco-Friendly",
  generator: "geosoft tech private limited",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
        <Header />
        {children}
        </Suspense>
        <Analytics />
        <Toaster />
       
      </body>
    </html>
  )
}
