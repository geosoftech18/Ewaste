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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "E-Waste Recycling Services in India | SP Recycling",
  description: "ISO Certified E-Waste Recycling | Secure Data Destruction | 100% Eco-Friendly",
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

        {/* Single tag container — GTM should own GA + Ads (avoids duplicate gtag downloads) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WHV8BTC3"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WHV8BTC3');`}
        </Script>
        <Suspense fallback={<div>Loading...</div>}>
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
