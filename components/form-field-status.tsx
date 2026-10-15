"use client"

import { CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FieldValidity } from "@/lib/phone-validation"

interface FormFieldStatusProps {
  state: FieldValidity
  validMessage?: string
  invalidMessage?: string
  className?: string
}

/** Inline correct / incorrect hint under phone or email inputs. */
export function FormFieldStatus({
  state,
  validMessage = "Looks good",
  invalidMessage = "Invalid format",
  className,
}: FormFieldStatusProps) {
  if (state === "empty") return null

  const isValid = state === "valid"

  return (
    <p
      className={cn(
        "mt-1.5 flex items-center gap-1.5 text-xs font-medium",
        isValid ? "text-emerald-600" : "text-red-600",
        className
      )}
      role="status"
      aria-live="polite"
    >
      {isValid ? (
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
      ) : (
        <XCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
      )}
      <span>{isValid ? validMessage : invalidMessage}</span>
    </p>
  )
}

export function fieldBorderClass(state: FieldValidity, hasError?: boolean) {
  if (hasError || state === "invalid") {
    return "border-red-400 focus-within:ring-red-400/40"
  }
  if (state === "valid") {
    return "border-emerald-400 focus-within:ring-emerald-400/40"
  }
  return ""
}
