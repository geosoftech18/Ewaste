import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Keep one canonical host in production.
 * This avoids host-mismatch edge cases with absolute URLs in copied HTML.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0]?.toLowerCase() || ''

  if (host === 'sprecycling.in') {
    const url = request.nextUrl.clone()
    url.protocol = 'https'
    url.host = 'www.sprecycling.in'
    return NextResponse.redirect(url, 308)
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$).*)',
  ],
}
