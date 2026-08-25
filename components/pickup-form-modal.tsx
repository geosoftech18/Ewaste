"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone-input"
import { Label } from "@/components/ui/label"
import { getPhoneValidationError } from "@/lib/phone-validation"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { CalendarIcon, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface PickupFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultCity?: string
  defaultInquiryType?: string
  defaultInquiryPrice?: string
  /** Hide date + terms checkbox (sell-product sections) */
  hideExtras?: boolean
}

const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Other",
]

export function PickupFormModal({
  open,
  onOpenChange,
  defaultCity,
  defaultInquiryType,
  defaultInquiryPrice,
  hideExtras = false,
}: PickupFormModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    inquiryType: "",
    inquiryPrice: "",
    date: undefined as Date | undefined,
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Prefer live props so product name + price always show when opening
  const selectedProductName = defaultInquiryType || formData.inquiryType
  const selectedProductPrice = defaultInquiryPrice || formData.inquiryPrice

  useEffect(() => {
    if (!open) return

    setFormData((prev) => {
      const matchedCity =
        defaultCity &&
        cities.find((city) => city.toLowerCase() === defaultCity.toLowerCase())

      return {
        ...prev,
        city: matchedCity ?? prev.city,
        inquiryType: defaultInquiryType ?? prev.inquiryType,
        inquiryPrice: defaultInquiryPrice ?? prev.inquiryPrice,
        // Product inquiries skip terms checkbox
        agreeToTerms: hideExtras ? true : prev.agreeToTerms,
      }
    })
  }, [open, defaultCity, defaultInquiryType, defaultInquiryPrice, hideExtras])

  const validateField = (name: string, value: any) => {
    const newErrors = { ...errors }

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          newErrors.fullName = "Full name is required"
        } else {
          delete newErrors.fullName
        }
        break
      case "phone": {
        const phoneError = getPhoneValidationError(value)
        if (phoneError) newErrors.phone = phoneError
        else delete newErrors.phone
        break
      }
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value.trim()) {
          newErrors.email = "Email address is required"
        } else if (!emailRegex.test(value.trim())) {
          newErrors.email = "Please enter a valid email address"
        } else {
          delete newErrors.email
        }
        break
      case "city":
        if (!value) {
          newErrors.city = "City is required"
        } else {
          delete newErrors.city
        }
        break
      case "date":
        if (!value) {
          newErrors.date = "Pickup date is required"
        } else {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          const selectedDate = new Date(value)
          selectedDate.setHours(0, 0, 0, 0)
          
          if (selectedDate < today) {
            newErrors.date = "Please select today or a future date"
          } else {
            delete newErrors.date
          }
        }
        break
      case "agreeToTerms":
        if (!value) {
          newErrors.agreeToTerms = "You must agree to terms and privacy policy"
        } else {
          delete newErrors.agreeToTerms
        }
        break
    }

    setErrors(newErrors)
  }

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    validateField(name, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all required fields
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // Check for validation errors
    const validationErrors: Record<string, string> = {}
    
    if (!formData.fullName?.trim()) {
      validationErrors.fullName = "Full name is required"
    }
    
    const phoneError = getPhoneValidationError(formData.phone)
    if (phoneError) validationErrors.phone = phoneError

    if (!hideExtras) {
      if (!formData.email?.trim() || !emailRegex.test(formData.email.trim())) {
        validationErrors.email = "Please enter a valid email address"
      }

      if (!formData.city) {
        validationErrors.city = "City is required"
      }

      if (!formData.agreeToTerms) {
        validationErrors.agreeToTerms = "You must agree to terms and privacy policy"
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error("Please fill in all required fields correctly")
      return
    }

    setIsSubmitting(true)

    const productName = selectedProductName
    const productPrice = selectedProductPrice
    const cityValue =
      formData.city ||
      (defaultCity
        ? cities.find((c) => c.toLowerCase() === defaultCity.toLowerCase()) ||
          defaultCity
        : "") ||
      "Hyderabad"

    try {
      // Send email via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'pickup-form',
          data: {
            fullName: formData.fullName,
            phone: formData.phone,
            email: hideExtras ? formData.email || "" : formData.email,
            city: cityValue,
            date: hideExtras
              ? undefined
              : formData.date
                ? formData.date.toISOString()
                : undefined,
            wasteTypes: productName
              ? [
                  productPrice
                    ? `${productName} — Get up to ${productPrice}`
                    : productName,
                ]
              : undefined,
            additionalNotes: productPrice
              ? `Selected product: ${productName || "N/A"} | Get up to: ${productPrice}`
              : productName
                ? `Selected product: ${productName}`
                : undefined,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send email')
      }

      setShowSuccess(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
        onOpenChange(false)
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          city: "",
          inquiryType: "",
          inquiryPrice: "",
          date: undefined,
          agreeToTerms: false,
        })
        setErrors({})
      }, 3000)
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="z-[1002] w-[calc(100%-1.25rem)] max-w-md rounded-2xl p-5 sm:p-6">
          <div className="flex flex-col items-center justify-center py-4 text-center sm:py-8">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 sm:h-16 sm:w-16">
              <CheckCircle2 className="h-8 w-8 text-green-600 sm:h-10 sm:w-10" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
              Thank You!
            </h3>
            <p className="mb-6 text-sm text-gray-600 sm:text-base">
              Your pickup request has been received. Our team will contact you
              soon.
            </p>
            <Button
              onClick={() => {
                const message = encodeURIComponent(
                  `Hi! I just scheduled an e-waste pickup. My name is ${formData.fullName}.`,
                )
                window.open(`https://wa.me/+919949901238?text=${message}`, "_blank")
              }}
              className="h-11 w-full bg-green-600 hover:bg-green-700 sm:w-auto"
            >
              Send Confirmation via WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "z-[1002] flex w-[calc(100%-1.25rem)] max-w-xl flex-col gap-0 overflow-hidden rounded-2xl border p-0",
          "max-h-[min(92dvh,920px)] sm:max-h-[90vh]"
        )}
      >
        <div className="overflow-y-auto overscroll-contain px-4 pb-4 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
          <DialogHeader className="space-y-1.5 pr-8 text-left sm:pb-2">
            <DialogTitle className="text-xl font-bold leading-tight sm:text-2xl">
              {hideExtras ? "Sell Your Product" : "Schedule Your E-Waste Pickup"}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              {hideExtras
                ? "Share your details and we will call you with a confirmed offer."
                : "Fill in the details and our team will contact you shortly."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4 sm:mt-5 sm:space-y-6">
            {selectedProductName ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 sm:px-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800 sm:text-xs">
                  Selected product
                </p>
                <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <p className="text-sm font-semibold text-gray-900 sm:text-[15px]">
                    {selectedProductName}
                  </p>
                  {selectedProductPrice ? (
                    <p className="text-sm text-gray-700">
                      Get up to:{" "}
                      <span className="font-bold text-gray-900">
                        {selectedProductPrice}
                      </span>
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="space-y-4 sm:space-y-5">
              {hideExtras ? (
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className={cn(
                        "h-12 text-base sm:h-11 sm:text-sm",
                        errors.fullName && "border-red-500"
                      )}
                      autoComplete="name"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 sm:text-sm">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm">
                      Mobile Number <span className="text-red-500">*</span>
                    </Label>
                    <PhoneInput
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(value) => handleInputChange("phone", value)}
                      placeholder="Enter mobile number"
                      className={cn(errors.phone && "phone-input-field--error")}
                      inputClassName={cn(
                        "h-12 text-base sm:h-11 sm:text-sm",
                        errors.phone && "border-red-500"
                      )}
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 sm:text-sm">{errors.phone}</p>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className={cn(
                          "h-12 text-base sm:h-11 sm:text-sm",
                          errors.fullName && "border-red-500"
                        )}
                        autoComplete="name"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-500 sm:text-sm">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <PhoneInput
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(value) => handleInputChange("phone", value)}
                        placeholder="Enter mobile number"
                        className={cn(errors.phone && "phone-input-field--error")}
                        inputClassName={cn(
                          "h-12 text-base sm:h-11 sm:text-sm",
                          errors.phone && "border-red-500"
                        )}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 sm:text-sm">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={cn(
                          "h-12 text-base sm:h-11 sm:text-sm",
                          errors.email && "border-red-500"
                        )}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 sm:text-sm">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm">
                        City / Location <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) => handleInputChange("city", value)}
                      >
                        <SelectTrigger
                          className={cn(
                            "h-12 w-full text-base sm:h-11 sm:text-sm",
                            errors.city && "border-red-500"
                          )}
                        >
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent className="z-[1003]">
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.city && (
                        <p className="text-xs text-red-500 sm:text-sm">{errors.city}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Preferred Pickup Date</Label>
                    <Input
                      type="date"
                      value={
                        formData.date
                          ? formData.date.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const dateValue = e.target.value
                          ? new Date(e.target.value)
                          : undefined
                        handleInputChange("date", dateValue)
                      }}
                      min={new Date().toISOString().split("T")[0]}
                      className={cn(
                        "h-12 w-full text-base sm:h-11 sm:text-sm",
                        errors.date && "border-red-500"
                      )}
                    />
                    {errors.date && (
                      <p className="text-xs text-red-500 sm:text-sm">{errors.date}</p>
                    )}
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        handleInputChange("agreeToTerms", checked)
                      }
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor="terms"
                      className="cursor-pointer text-sm font-normal leading-relaxed"
                    >
                      I agree to the{" "}
                      <a href="/terms" className="text-green-600 hover:underline">
                        terms & conditions
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-green-600 hover:underline">
                        privacy policy
                      </a>
                      <span className="text-red-500"> *</span>
                    </Label>
                  </div>
                  {errors.agreeToTerms && (
                    <p className="text-xs text-red-500 sm:text-sm">
                      {errors.agreeToTerms}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="flex flex-col-reverse gap-2.5 border-t pt-4 sm:flex-row sm:justify-end sm:gap-3 sm:pt-6">
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
                disabled={isSubmitting}
                className="h-12 w-full bg-gradient-to-r from-green-600 to-green-700 text-base text-white hover:from-green-700 hover:to-green-800 sm:h-10 sm:w-auto sm:text-sm"
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
