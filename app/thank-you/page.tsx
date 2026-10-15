import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { CheckCircle2, Phone, MessageCircle, Home, Recycle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThankYouClient } from "@/components/thank-you-client"
import { canonicalMetadata } from "@/components/seo/breadcrumb-json-ld"

export const metadata: Metadata = {
  title: "Thank You | SP Recycling",
  description: "Your request was received. Our team will contact you shortly.",
  ...canonicalMetadata("/thank-you"),
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <main className="min-h-[70vh] bg-gradient-to-b from-emerald-50 to-white py-16 sm:py-24">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-9 w-9 text-emerald-600" aria-hidden />
        </div>

        <Suspense
          fallback={
            <>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Thank you!
              </h1>
              <p className="text-muted-foreground mb-8">
                Your request has been submitted successfully. Our team will contact you soon.
              </p>
            </>
          }
        >
          <ThankYouClient />
        </Suspense>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <a href="tel:+919949901238">
              <Phone className="mr-2 h-4 w-4" />
              Call +91 99499 01238
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://wa.me/919949901238?text=Hi%20SP%20Recycling%2C%20I%20just%20submitted%20a%20request%20on%20your%20website."
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp us
            </a>
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 justify-center text-sm font-medium">
          <Link href="/" className="inline-flex items-center gap-1.5 text-primary hover:underline">
            <Home className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/services/city"
            className="inline-flex items-center gap-1.5 text-primary hover:underline"
          >
            <Recycle className="h-4 w-4" />
            Cities we serve
          </Link>
        </div>
      </div>
    </main>
  )
}
