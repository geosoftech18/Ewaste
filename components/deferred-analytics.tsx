"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => ({ default: m.Analytics })),
  { ssr: false }
)

/** Loads Vercel Analytics after idle — keeps tracking, cuts early main-thread work */
export function DeferredAnalytics() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
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
  }, [])

  return ready ? <Analytics /> : null
}
