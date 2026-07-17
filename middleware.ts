import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Permanent redirect: https://sprecycling.in → https://www.sprecycling.in
 * Preserves path + query (e.g. /services/city/hyderabad?x=1).
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0]?.toLowerCase() || ''

  if (host === 'sprecycling.in') {
    const url = request.nextUrl.clone()
    url.protocol = 'https'
    url.hostname = 'www.sprecycling.in'
    // Drop accidental default port if present
    url.port = ''
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  // Run on all routes so apex never serves mixed www/non-www assets
  matcher: ['/:path*'],
}
