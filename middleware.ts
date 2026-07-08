import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LIVE_ORIGIN = 'https://www.sprecycling.in'

/**
 * - Redirect apex → www so host always matches production.
 * - On full HTML document responses only, rewrite /_next/static/(css|media)
 *   link hrefs to absolute URLs so Google Rich Results "View code" +
 *   html.onlineviewer.net pastes still load stylesheets from your domain.
 * - Never touch JS chunk paths or RSC payloads (assetPrefix / RSC breakage).
 */
export async function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0]?.toLowerCase() || ''

  if (host === 'sprecycling.in') {
    const url = request.nextUrl.clone()
    url.protocol = 'https'
    url.host = 'www.sprecycling.in'
    return NextResponse.redirect(url, 308)
  }

  const isLiveHost = host === 'www.sprecycling.in'
  const isGet = request.method === 'GET' || request.method === 'HEAD'
  const acceptsHtml = (request.headers.get('accept') || '').includes('text/html')

  // Next.js client navigations / RSC — do not rewrite these bodies.
  const isRscRequest =
    request.headers.has('rsc') ||
    request.headers.has('next-router-state-tree') ||
    request.headers.has('next-router-prefetch') ||
    request.headers.get('purpose') === 'prefetch'

  if (!isLiveHost || !acceptsHtml || !isGet || isRscRequest) {
    return NextResponse.next()
  }

  const response = await NextResponse.next()
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('text/html')) {
    return response
  }

  try {
    let html = await response.text()

    // Stylesheets + fonts only (safe). Leave /_next/static/chunks/*.js relative.
    html = html.replace(
      /(href=["'])(\/_next\/static\/(?:css|media)\/[^"']+)(["'])/g,
      `$1${LIVE_ORIGIN}$2$3`
    )

    const headers = new Headers(response.headers)
    headers.delete('content-length')

    return new NextResponse(html, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  } catch {
    return response
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$).*)',
  ],
}
