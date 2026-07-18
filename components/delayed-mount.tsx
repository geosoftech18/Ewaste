"use client"

import { useEffect, useState, type ReactNode } from "react"

/** Defers mounting (and thus JS fetch for dynamic children) without changing final UI */
export function DelayedMount({
  children,
  delayMs = 4000,
}: {
  children: ReactNode
  delayMs?: number
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), delayMs)
    return () => window.clearTimeout(id)
  }, [delayMs])

  return ready ? <>{children}</> : null
}
