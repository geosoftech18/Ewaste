"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

type LazyMountProps = {
  children: ReactNode
  /** Reserved space before mount to avoid CLS */
  minHeight?: number | string
  rootMargin?: string
  className?: string
}

/**
 * Mounts children only when near the viewport.
 * Keeps initial JS/main-thread lighter without changing visible UI once shown.
 */
export function LazyMount({
  children,
  minHeight,
  rootMargin = "280px 0px",
  className,
}: LazyMountProps) {
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
