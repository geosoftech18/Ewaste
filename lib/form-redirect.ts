/**
 * After a successful form submit: store name and go to the thank-you page.
 * Avoids in-form / popup success UI.
 */
export function redirectToThankYou(name: string, source?: string) {
  if (typeof window === "undefined") return
  const trimmed = name.trim() || "there"
  try {
    sessionStorage.setItem("sp_thank_you_name", trimmed)
    if (source) sessionStorage.setItem("sp_thank_you_source", source)
  } catch {
    // ignore storage errors (private mode, etc.)
  }
  const params = new URLSearchParams({ name: trimmed })
  if (source) params.set("from", source)
  window.location.assign(`/thank-you?${params.toString()}`)
}
