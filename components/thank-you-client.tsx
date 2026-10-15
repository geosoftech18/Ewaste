"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

function sanitizeName(raw: string | null | undefined): string {
  if (!raw?.trim()) return ""
  // Strip anything that could look like HTML / scripts in the URL
  return raw.trim().replace(/[<>"'&]/g, "").slice(0, 80)
}

export function ThankYouClient() {
  const searchParams = useSearchParams()
  const [name, setName] = useState("")

  useEffect(() => {
    const fromQuery = sanitizeName(searchParams.get("name"))
    if (fromQuery) {
      setName(fromQuery)
      return
    }
    try {
      const stored = sanitizeName(sessionStorage.getItem("sp_thank_you_name"))
      if (stored) setName(stored)
    } catch {
      // ignore
    }
  }, [searchParams])

  const displayName = useMemo(() => name || "there", [name])

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
        Thank you, {displayName}!
      </h1>
      <p className="text-muted-foreground mb-2 leading-relaxed">
        Hi <span className="font-semibold text-foreground">{displayName}</span>, we have received
        your request successfully.
      </p>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        Our team will review the details and contact you shortly on the phone number or email you
        shared. For urgent pickups, call or WhatsApp us anytime during working hours.
      </p>
    </>
  )
}
