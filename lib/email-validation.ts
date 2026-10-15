/** Popular consumer / business mail domains we always accept */
const APPROVED_EMAIL_DOMAINS = new Set([
  // Google
  "gmail.com",
  "googlemail.com",
  // Microsoft
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  // Yahoo
  "yahoo.com",
  "yahoo.co.in",
  "yahoo.in",
  "ymail.com",
  "rocketmail.com",
  // Apple
  "icloud.com",
  "me.com",
  "mac.com",
  // Others commonly used in India / worldwide
  "proton.me",
  "protonmail.com",
  "zoho.com",
  "zohomail.com",
  "aol.com",
  "rediffmail.com",
  "rediff.com",
  "gmx.com",
  "gmx.net",
  "mail.com",
  "inbox.com",
  "fastmail.com",
  "tutanota.com",
  "yandex.com",
  "yandex.ru",
])

/** Obvious disposable / fake domains to reject even if format looks fine */
const BLOCKED_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "temp-mail.org",
  "10minutemail.com",
  "throwawaymail.com",
  "yopmail.com",
  "sharklasers.com",
  "trashmail.com",
  "fakeinbox.com",
  "getnada.com",
  "maildrop.cc",
  "dispostable.com",
  "example.com",
  "example.org",
  "test.com",
  "email.com",
])

const BASIC_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

const ALLOWED_BUSINESS_TLDS = new Set([
  "com",
  "in",
  "co",
  "org",
  "net",
  "edu",
  "gov",
  "io",
  "ai",
  "info",
  "biz",
  "co.in",
  "ac.in",
  "edu.in",
  "gov.in",
  "org.in",
  "net.in",
  "firm.in",
])

function getEmailDomain(email: string): string | null {
  const at = email.lastIndexOf("@")
  if (at < 1) return null
  return email.slice(at + 1).toLowerCase().trim()
}

function hasAllowedBusinessTld(domain: string): boolean {
  const parts = domain.split(".")
  if (parts.length < 2) return false
  const last = parts[parts.length - 1]
  const lastTwo = parts.slice(-2).join(".")
  return ALLOWED_BUSINESS_TLDS.has(lastTwo) || ALLOWED_BUSINESS_TLDS.has(last)
}

/**
 * Accepts popular providers (Gmail, Yahoo, Outlook, …) and legitimate
 * business / institutional domains. Rejects disposable and fake domains.
 */
export function isEmailValid(value: string | undefined | null): boolean {
  if (!value?.trim()) return false
  const email = value.trim().toLowerCase()
  if (!BASIC_EMAIL_REGEX.test(email)) return false

  const domain = getEmailDomain(email)
  if (!domain || domain.includes("..")) return false
  if (BLOCKED_EMAIL_DOMAINS.has(domain)) return false
  if (APPROVED_EMAIL_DOMAINS.has(domain)) return true

  // Other: company / college domains with a real TLD
  return hasAllowedBusinessTld(domain) && domain.split(".").length >= 2
}

export function getEmailValidationError(
  value: string | undefined | null,
  required = true
): string | undefined {
  if (!value?.trim()) {
    return required ? "Email address is required" : undefined
  }
  const email = value.trim().toLowerCase()
  if (!BASIC_EMAIL_REGEX.test(email)) {
    return "Please enter a valid email address"
  }
  const domain = getEmailDomain(email)
  if (!domain) return "Please enter a valid email address"
  if (BLOCKED_EMAIL_DOMAINS.has(domain)) {
    return "Please use a valid email (Gmail, Yahoo, Outlook, or your company email)"
  }
  if (!isEmailValid(email)) {
    return "Please use a valid email domain (Gmail, Yahoo, Outlook, or your company email)"
  }
  return undefined
}

export type FieldValidity = "empty" | "valid" | "invalid"

export function getEmailFieldState(
  value: string | undefined | null
): FieldValidity {
  if (!value?.trim()) return "empty"
  return isEmailValid(value) ? "valid" : "invalid"
}
