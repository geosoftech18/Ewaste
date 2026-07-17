'use client'

import Link from 'next/link'
import { MapPin, Recycle, ArrowRight } from 'lucide-react'
import { getAllCities } from '@/lib/city-data'
import { getServiceData } from '@/lib/service-data'

const FEATURED_SERVICE_SLUGS = [
  'electronic-waste-recycle',
  'it-telecom',
  'data-destruction',
  'consumer-electronics',
] as const

/**
 * Compact internal-link block for blog posts (services + cities).
 */
export function BlogRelatedInternalLinks() {
  const services = FEATURED_SERVICE_SLUGS.map((slug) => getServiceData(slug)).filter(
    Boolean
  ) as NonNullable<ReturnType<typeof getServiceData>>[]

  const cities = getAllCities().slice(0, 6)

  return (
    <section className="mt-12 mb-12 space-y-10">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Our Services</h2>
        <p className="text-gray-600 text-sm mb-6">
          Explore certified e-waste recycling and data destruction services.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="mt-0.5 rounded-lg bg-emerald-50 p-2 text-emerald-600">
                <Recycle className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  {service.title}
                </p>
                <p className="text-sm text-gray-500 line-clamp-2 mt-1">{service.subtitle}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-emerald-500 flex-shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Cities We Serve</h2>
        <p className="text-gray-600 text-sm mb-6">
          Find doorstep e-waste pickup and recycling near you.
        </p>
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/services/city/${city.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              <MapPin className="h-3.5 w-3.5 text-emerald-600" />
              {city.name}
            </Link>
          ))}
          <Link
            href="/services/city"
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
          >
            View all cities
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
