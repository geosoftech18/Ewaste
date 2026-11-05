"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { readCookieConsent, type CookieConsentValue } from "@/lib/cookie-consent"

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => ({ default: m.Analytics })),
  { ssr: false }
)

/** Loads Vercel Analytics after idle — only when cookie consent is accepted */
export function DeferredAnalytics() {
  const [ready, setReady] = useState(false)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const sync = (value: CookieConsentValue | null = readCookieConsent()) => {
      setAllowed(value === "accepted")
    }
    sync()

    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<CookieConsentValue>).detail
      sync(detail)
    }
    window.addEventListener("sp-cookie-consent", onConsent)
    return () => window.removeEventListener("sp-cookie-consent", onConsent)
  }, [])

  useEffect(() => {
    if (!allowed) {
      setReady(false)
      return
    }

    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const start = () => setReady(true)

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(start, { timeout: 10000 })
    } else {
      timeoutId = setTimeout(start, 8000)
    }

    return () => {
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [allowed])

  return ready && allowed ? <Analytics /> : null
}
