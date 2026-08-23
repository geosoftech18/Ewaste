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
}: PickupFormModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    inquiryType: "",
    date: undefined as Date | undefined,
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (!open) return

    setFormData((prev) => {
      const matchedCity =
        defaultCity &&
        cities.find((city) => city.toLowerCase() === defaultCity.toLowerCase())

      return {
        ...prev,
        city: matchedCity ?? prev.city,
        inquiryType: defaultInquiryType ?? "",
      }
    })
  }, [open, defaultCity, defaultInquiryType])

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
    
    if (!formData.email?.trim() || !emailRegex.test(formData.email.trim())) {
      validationErrors.email = "Please enter a valid email address"
    }
    
    if (!formData.city) {
      validationErrors.city = "City is required"
    }
    
    // if (!formData.date) {
    //   validationErrors.date = "Pickup date is required"
    // } else {
    //   const today = new Date()
    //   today.setHours(0, 0, 0, 0)
    //   const selectedDate = new Date(formData.date)
    //   selectedDate.setHours(0, 0, 0, 0)
      
    //   if (selectedDate < today) {
    //     validationErrors.date = "Please select today or a future date"
    //   }
    // }
    
    if (!formData.agreeToTerms) {
      validationErrors.agreeToTerms = "You must agree to terms and privacy policy"
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error("Please fill in all required fields correctly")
      return
    }

    setIsSubmitting(true)

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
            email: formData.email,
            city: formData.city,
            date: formData.date ? formData.date.toISOString() : undefined,
            wasteTypes: formData.inquiryType ? [formData.inquiryType] : undefined,
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
        <DialogContent className="sm:max-w-md z-[1002]">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">Your pickup request has been received. Our team will contact you soon.</p>
            <Button
              onClick={() => {
                const message = encodeURIComponent(
                  `Hi! I just scheduled an e-waste pickup. My name is ${formData.fullName}.`,
                )
                window.open(`https://wa.me/+919949901238?text=${message}`, "_blank")
              }}
              className="bg-green-600 hover:bg-green-700"
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
      <DialogContent className="sm:max-w-xl max-h-[100vh] overflow-y-auto py-8 z-[1002]">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold">Schedule Your E-Waste Pickup</DialogTitle>
          <DialogDescription>Fill in the details and our team will contact you shortly.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 mt-4">
          {formData.inquiryType ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                Inquiry type
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {formData.inquiryType}
              </p>
            </div>
          ) : null}

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="fullName">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={cn("h-11", errors.fullName && "border-red-500")}
                />
                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <PhoneInput
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(value) => handleInputChange("phone", value)}
                  placeholder="Enter mobile number"
                  className={cn(errors.phone && "phone-input-field--error")}
                  inputClassName={cn("h-11", errors.phone && "border-red-500")}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={cn("h-11", errors.email && "border-red-500")}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-3">
                <Label htmlFor="city">
                  City / Location <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)}>
                  <SelectTrigger className={cn("w-full h-11", errors.city && "border-red-500")}>
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
                {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
              </div>
            </div>

            <div className="space-y-3">
              <Label>
                Preferred Pickup Date 
              </Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={formData.date ? formData.date.toISOString().split('T')[0] : ''}
                  onChange={(e) => {
                    const dateValue = e.target.value ? new Date(e.target.value) : undefined
                    handleInputChange("date", dateValue)
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  className={cn("flex-1 h-11 ", errors.date && "border-red-500")}
                />
               
              </div>
              {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
              />
              <Label htmlFor="terms" className="font-normal text-sm leading-relaxed cursor-pointer">
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
            {errors.agreeToTerms && <p className="text-sm text-red-500">{errors.agreeToTerms}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-8 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
