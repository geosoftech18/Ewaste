export const COOKIE_CONSENT_KEY = "sp_cookie_consent"
export type CookieConsentValue = "accepted" | "essential"

export function readCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    if (value === "accepted" || value === "essential") return value
  } catch {
    // ignore storage errors
  }
  return null
}

export function writeCookieConsent(value: CookieConsentValue) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value)
    window.dispatchEvent(
      new CustomEvent("sp-cookie-consent", { detail: value })
    )
  } catch {
    // ignore storage errors
  }
}
