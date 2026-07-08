import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Keep apex and www on one host so <base href="https://www.sprecycling.in/">
 * never points at a different origin than the page (avoids RSC / chunk errors).
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0]?.toLowerCase()

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
    /*
      Skip Next internals and common static files.
    */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$).*)',
  ],
}
