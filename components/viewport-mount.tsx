"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

/** Mount children only when near viewport — use only for heavy below-fold widgets (map). */
export function ViewportMount({
  children,
  minHeight,
  rootMargin = "200px 0px",
  className,
}: {
  children: ReactNode
  minHeight?: number | string
  rootMargin?: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || mounted) return
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [mounted, rootMargin])

  return (
    <div
      ref={ref}
      className={className}
      style={!mounted && minHeight != null ? { minHeight } : undefined}
    >
      {mounted ? children : null}
    </div>
  )
}
