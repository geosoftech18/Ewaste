import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/sonner"
import { Header } from "@/components/header"
import Footer from "@/components/contact/footer"

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
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17277789168"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17277789168');
          `}
        </Script>
        <Suspense fallback={<div>Loading...</div>}>
        <Header />
        {children}
        </Suspense>
        <Analytics />
        <Toaster />
       <Footer />
      </body>
    </html>
  )
}
