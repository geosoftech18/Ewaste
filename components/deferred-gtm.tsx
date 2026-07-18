"use client"

import { useEffect, useRef } from "react"

const GTM_ID = "GTM-WHV8BTC3"

function injectGtm() {
  if (typeof window === "undefined") return
  if (document.getElementById("gtm-script")) return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" })

  const script = document.createElement("script")
  script.id = "gtm-script"
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)
}

/**
 * Loads GTM after first interaction or idle — same tags, much lower TBT in lab + first paint.
 */
export function DeferredGtm() {
  const loaded = useRef(false)

  useEffect(() => {
    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const load = () => {
      if (loaded.current) return
      loaded.current = true
      injectGtm()
      events.forEach((e) => window.removeEventListener(e, load))
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId) clearTimeout(timeoutId)
    }

    const events = ["pointerdown", "keydown", "touchstart"] as const
    events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }))

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(load, { timeout: 10000 })
    } else {
      timeoutId = setTimeout(load, 8000)
    }

    return () => {
      events.forEach((e) => window.removeEventListener(e, load))
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}
