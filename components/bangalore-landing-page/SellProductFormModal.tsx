"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone-input"
import { Label } from "@/components/ui/label"
import {
  getPhoneFieldState,
  getPhoneValidationError,
} from "@/lib/phone-validation"
import { redirectToThankYou } from "@/lib/form-redirect"
import { FormFieldStatus } from "@/components/form-field-status"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

type SellProductFormModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  productName?: string
  productPrice?: string
  cityName?: string
}

export function SellProductFormModal({
  open,
  onOpenChange,
  productName,
  productPrice,
  cityName = "Hyderabad",
}: SellProductFormModalProps) {
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const phoneState = getPhoneFieldState(phone)

  useEffect(() => {
    if (!open) return
    setErrors({})
  }, [open, productName, productPrice])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const nextErrors: { fullName?: string; phone?: string } = {}
    if (!fullName.trim()) nextErrors.fullName = "Full name is required"
    const phoneError = getPhoneValidationError(phone)
    if (phoneError) nextErrors.phone = phoneError

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      toast.error("Please fill in all required fields correctly")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "pickup-form",
          data: {
            fullName: fullName.trim(),
            phone,
            email: "",
            city: cityName,
            wasteTypes: productName
              ? [
                  productPrice
                    ? `${productName} — Get up to ${productPrice}`
                    : productName,
                ]
              : undefined,
            additionalNotes: [
              `Source: ${cityName} landing page — Sell product`,
              productName ? `Selected product: ${productName}` : null,
              productPrice ? `Get up to: ${productPrice}` : null,
            ]
              .filter(Boolean)
              .join(" | "),
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to send email")
      }

      onOpenChange(false)
      redirectToThankYou(fullName, "sell-product")
    } catch {
      toast.error("Something went wrong. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-[1002] w-[calc(100%-1.25rem)] max-w-md rounded-2xl p-0">
        <div className="px-4 pb-5 pt-5 sm:px-5 sm:pb-6 sm:pt-6">
          <DialogHeader className="space-y-1.5 pr-8 text-left">
            <DialogTitle className="text-xl font-bold leading-tight">
              Sell Your Product
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              Share your details and we will call you with a confirmed offer.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {productName ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
                  Selected product
                </p>
                <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {productName}
                  </p>
                  {productPrice ? (
                    <p className="text-sm text-gray-700">
                      Get up to:{" "}
                      <span className="font-bold text-gray-900">
                        {productPrice}
                      </span>
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sell-fullName" className="text-sm">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="sell-fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value)
                    if (errors.fullName) {
                      setErrors((prev) => ({ ...prev, fullName: undefined }))
                    }
                  }}
                  className={cn(
                    "h-12 text-base sm:h-11 sm:text-sm",
                    errors.fullName && "border-red-500"
                  )}
                  autoComplete="name"
                />
                {errors.fullName ? (
                  <p className="text-xs text-red-500">{errors.fullName}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sell-phone" className="text-sm">
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <PhoneInput
                  id="sell-phone"
                  name="phone"
                  value={phone}
                  onChange={(value) => {
                    setPhone(value)
                    if (errors.phone) {
                      setErrors((prev) => ({ ...prev, phone: undefined }))
                    }
                  }}
                  placeholder="Enter mobile number"
                  className={cn(errors.phone && "phone-input-field--error")}
                  inputClassName={cn(
                    "h-12 text-base sm:h-11 sm:text-sm",
                    (errors.phone || phoneState === "invalid") && "border-red-500",
                    phoneState === "valid" && "border-emerald-500"
                  )}
                  aria-invalid={!!errors.phone || phoneState === "invalid"}
                />
                <FormFieldStatus
                  state={phoneState}
                  validMessage="Valid mobile number"
                  invalidMessage={
                    errors.phone || "Enter a valid mobile number with country code"
                  }
                />
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2.5 border-t pt-4 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-12 w-full text-base sm:h-10 sm:w-auto sm:text-sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || phoneState === "invalid"}
                className="h-12 w-full bg-emerald-700 text-base text-white hover:bg-emerald-800 sm:h-10 sm:w-auto sm:text-sm"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
