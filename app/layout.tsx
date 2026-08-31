import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import Script from "next/script"
import "./globals.css"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/sonner"
import { Header } from "@/components/header"
import Footer from "@/components/contact/footer"
import FooterHighlights from "@/components/footer-highlights"
import { SITE_URL } from "@/lib/seo"
import { PageSeo } from "@/components/seo/page-seo"
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld"
import { DeferredAnalytics } from "@/components/deferred-analytics"
import { DeferredGtm } from "@/components/deferred-gtm"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sell E-Waste Online in Hyderabad | Authorised Recycler",
  description: "Looking to sell e-waste online in Hyderabad? We are an authorised, certified e-waste recycling service providing hassle-free pickup and green disposal.",
  generator: "geosoft tech private limited",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fixed production origin (apex → www is handled in middleware).
  // <base> lets pasted View Source on html.onlineviewer.net load /_next CSS
  // from your live domain. On the live www site, base origin === page origin,
  // so client navigation keeps working (unlike next.config assetPrefix).
  const emitHtmlBase =
    process.env.VERCEL_ENV === "production" ||
    process.env.EMIT_HTML_BASE === "true" ||
    (process.env.NODE_ENV === "production" && !process.env.VERCEL)

  return (
    <html lang="en">
      <head>
        {emitHtmlBase ? <base href={`${SITE_URL}/`} /> : null}
        {/* LCP poster — first-party, no unused preconnect to i.ytimg */}
        <link rel="preload" as="image" href="/hero/video-poster.jpg" fetchPriority="high" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Viewer-only rewrite — must not block live LCP/FCP */}
        <Script id="viewer-asset-fix" strategy="lazyOnload">
          {`(function () {
  try {
    var host = location.hostname || "";
    if (
      host === "www.sprecycling.in" ||
      host === "sprecycling.in" ||
      host === "localhost" ||
      host === "127.0.0.1" ||
      /\\.vercel\\.app$/.test(host)
    ) {
      return;
    }
    var origin = "https://www.sprecycling.in";
    if (!document.querySelector("base[data-sp-viewer-base]")) {
      var base = document.createElement("base");
      base.href = origin + "/";
      base.setAttribute("data-sp-viewer-base", "1");
      document.head.insertBefore(base, document.head.firstChild);
    }
    function toAbs(url) {
      if (!url) return url;
      if (/^(https?:)?\\/\\//i.test(url) || /^data:|^blob:/i.test(url)) return url;
      return url.charAt(0) === "/" ? origin + url : origin + "/" + url;
    }
    function rewrite(root) {
      var nodes = root.querySelectorAll("link[href],script[src],img[src],source[src],video[poster]");
      nodes.forEach(function (el) {
        var attr = el.hasAttribute("href") ? "href" : el.hasAttribute("poster") ? "poster" : "src";
        var current = el.getAttribute(attr);
        var next = toAbs(current);
        if (next && next !== current) el.setAttribute(attr, next);
      });
    }
    rewrite(document);
  } catch (e) {}
})();`}
        </Script>
      </head>
      <body className={`font-sans ${GeistSans.variable}`}>
        <DeferredGtm />
        <Suspense fallback={null}>
          <OrganizationJsonLd />
          <PageSeo />
          <Header />
          {children}
        </Suspense>
        <DeferredAnalytics />
        <Toaster />
        <FooterHighlights />
        <Footer />
      </body>
    </html>
  )
}
