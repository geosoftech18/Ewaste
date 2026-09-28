/**
 * Central keyword map for city / service SEO.
 * Update this when keyword research changes — pages read from helpers below.
 */
export const PRIMARY_KEYWORDS = [
  'e-waste recycling',
  'sell old electronics',
  'scrap buyers',
  'certified data destruction',
  'free e-waste pickup',
] as const

export function getCitySeoKeywords(cityName: string): string[] {
  return [
    `e-waste recycling in ${cityName}`,
    `scrap buyers in ${cityName}`,
    `sell old electronics in ${cityName}`,
    `sell e-waste online ${cityName}`,
    `authorized e-waste recycler ${cityName}`,
    ...PRIMARY_KEYWORDS,
  ]
}

export function getDefaultCityMetaTitle(cityName: string): string {
  return `E-Waste Recycling Services in ${cityName} — Sell E-Waste Online with Authorized Recycler`
}

export function getDefaultCityMetaDescription(cityName: string): string {
  return `Certified e-waste recycling & scrap buyers in ${cityName}. Sell old electronics with free doorstep pickup, secure data destruction, and transparent pricing.`
}
