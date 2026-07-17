'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buildBreadcrumbItems } from '@/lib/seo'
import { getCityData } from '@/lib/city-data'
import { getServiceData } from '@/lib/service-data'
import { getEPRServiceData } from '@/lib/epr-service-data'

type BreadcrumbNavProps = {
  /** Override pathname (defaults to current route) */
  pathname?: string
  /** light = white text for dark heroes; dark = for light backgrounds */
  variant?: 'light' | 'dark'
  className?: string
}

function labelOverrides(pathname: string): Record<string, string> {
  const overrides: Record<string, string> = {}
  const parts = pathname.split('/').filter(Boolean)

  if (parts[0] === 'services' && parts[1] === 'city' && parts[2]) {
    const city = getCityData(parts[2])
    if (city) overrides[`/services/city/${parts[2]}`] = city.name
  }

  if (
    parts[0] === 'services' &&
    parts[1] &&
    parts[1] !== 'city' &&
    parts[1] !== 'EPR-compliance' &&
    !parts[2]
  ) {
    const service = getServiceData(parts[1])
    if (service) overrides[`/services/${parts[1]}`] = service.title
  }

  if (parts[0] === 'services' && parts[1] === 'EPR-compliance' && parts[2]) {
    const epr = getEPRServiceData(parts[2])
    if (epr) overrides[`/services/EPR-compliance/${parts[2]}`] = epr.title
  }

  return overrides
}

/**
 * Visual breadcrumb for hero top-left.
 * Parent section should be `relative`. Hidden on home (single crumb).
 */
export function BreadcrumbNav({
  pathname: pathnameProp,
  variant = 'dark',
  className,
}: BreadcrumbNavProps) {
  const currentPath = usePathname() || '/'
  const pathname = pathnameProp || currentPath
  const items = buildBreadcrumbItems(pathname, labelOverrides(pathname))

  if (items.length <= 1) return null

  const isLight = variant === 'light'

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'absolute top-4 left-4 sm:top-2 sm:left-6 lg:left-8 z-30 max-w-[min(100%-2rem,42rem)]',
        className
      )}
    >
      <ol
        className={cn(
          'inline-flex flex-wrap items-center gap-1 sm:gap-1.5  px-3 py-1.5 text-xs sm:text-sm ',
          isLight
            ? ' text-white/85'
            : ' text-muted-foreground'
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.path} className="inline-flex items-center gap-1 sm:gap-1.5 min-w-0">
              {index > 0 && (
                <ChevronRight
                  className={cn(
                    'h-3.5 w-3.5 flex-shrink-0',
                    isLight ? 'text-white/50' : 'text-muted-foreground/60'
                  )}
                  aria-hidden
                />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className={cn(
                    'truncate font-medium max-w-[10rem] sm:max-w-[16rem]',
                    isLight ? 'text-white' : 'text-foreground'
                  )}
                >
                  {index === 0 ? (
                    <span className="inline-flex items-center gap-1">
                      <Home className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">{item.name}</span>
                    </span>
                  ) : (
                    item.name
                  )}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className={cn(
                    'truncate max-w-[8rem] sm:max-w-[12rem] transition-colors',
                    isLight
                      ? 'text-white/80 hover:text-white'
                      : 'hover:text-primary'
                  )}
                >
                  {index === 0 ? (
                    <span className="inline-flex items-center gap-1">
                      <Home className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{item.name}</span>
                    </span>
                  ) : (
                    item.name
                  )}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
