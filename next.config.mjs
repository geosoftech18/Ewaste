/** @type {import('next').NextConfig} */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sprecycling.in'

// Production only: emit absolute /_next CSS/JS URLs so pasted View Source
// (e.g. html.onlineviewer.net) can still load stylesheets from your domain.
// Skip Vercel preview builds where CSS hashes differ from production.
const useAbsoluteAssets =
  process.env.ASSET_PREFIX === 'true' ||
  process.env.VERCEL_ENV === 'production' ||
  (process.env.NODE_ENV === 'production' && !process.env.VERCEL)

const nextConfig = {
  assetPrefix: useAbsoluteAssets ? siteUrl : undefined,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
