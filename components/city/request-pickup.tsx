"use client"

import type React from "react"

import { useState } from "react"
import { PhoneInput } from "@/components/ui/phone-input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Phone, MapPin, Loader2, AlertCircle } from "lucide-react"
import {
  getPhoneFieldState,
  getPhoneValidationError,
} from "@/lib/phone-validation"
import {
  getEmailFieldState,
  getEmailValidationError,
} from "@/lib/email-validation"
import { redirectToThankYou } from "@/lib/form-redirect"
import { FormFieldStatus } from "@/components/form-field-status"

interface RequestPickupProps {
  cityName?: string
}

export function RequestPickup({ cityName = "Hyderabad" }: RequestPickupProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    itemType: "",
    city: cityName.toLowerCase(),
    address: "",
    message: "",
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const phoneState = getPhoneFieldState(formData.phone)
  const emailState = getEmailFieldState(formData.email)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (submitError) setSubmitError("")
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!formData.fullName.trim()) errors.fullName = "Full name is required"
    const phoneError = getPhoneValidationError(formData.phone)
    if (phoneError) errors.phone = phoneError
    const emailError = getEmailValidationError(formData.email)
    if (emailError) errors.email = emailError
    if (!formData.itemType) errors.itemType = "Please select an item type"
    if (!formData.city) errors.city = "Please select a city"
    if (!formData.address.trim()) errors.address = "Address is required"
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "city-pickup-request",
          data: {
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            itemType: formData.itemType,
            city: formData.city,
            address: formData.address,
            message: formData.message || undefined,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to send email")
      }

      redirectToThankYou(formData.fullName, "city-pickup")
    } catch (error: any) {
      console.error("Error submitting form:", error)
      setSubmitError(error.message || "Failed to submit request. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-32 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="animate-slide-in-left">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-foreground mb-6">
              Ready to Recycle Your E-Waste?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Schedule a hassle-free e-waste pickup today and contribute to a cleaner, greener, and
              sustainable future!
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Phone</h4>
                  <p className="text-muted-foreground">+91 9949901238</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Email</h4>
                  <p className="text-muted-foreground">info@sprecycling.in</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Location</h4>
                  <p className="text-muted-foreground">{cityName}, India</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border border-border bg-card p-8 animate-slide-in-right">
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 font-semibold">Error</p>
                  <p className="text-red-700 text-sm mt-1">{submitError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                  {fieldErrors.fullName && (
                    <p className="mt-1 text-xs text-red-600">{fieldErrors.fullName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <PhoneInput
                    name="phone"
                    value={formData.phone}
                    onChange={(value) => {
                      setFormData((prev) => ({ ...prev, phone: value }))
                      if (fieldErrors.phone) {
                        setFieldErrors((prev) => {
                          const next = { ...prev }
                          delete next.phone
                          return next
                        })
                      }
                    }}
                    placeholder="Enter phone number"
                    inputClassName={`w-full px-4 py-2 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      phoneState === "invalid" || fieldErrors.phone
                        ? "border-red-400"
                        : phoneState === "valid"
                          ? "border-emerald-400"
                          : "border-input"
                    }`}
                    aria-invalid={phoneState === "invalid" || !!fieldErrors.phone}
                  />
                  <FormFieldStatus
                    state={phoneState}
                    validMessage="Valid mobile number"
                    invalidMessage={
                      fieldErrors.phone || "Enter a valid mobile number with country code"
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@gmail.com"
                  className={`w-full px-4 py-2 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    emailState === "invalid" || fieldErrors.email
                      ? "border-red-400"
                      : emailState === "valid"
                        ? "border-emerald-400"
                        : "border-input"
                  }`}
                  required
                  aria-invalid={emailState === "invalid" || !!fieldErrors.email}
                />
                <FormFieldStatus
                  state={emailState}
                  validMessage="Valid email address"
                  invalidMessage={
                    fieldErrors.email ||
                    "Use Gmail, Yahoo, Outlook, or your company email"
                  }
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    What to Recycle?
                  </label>
                  <select
                    name="itemType"
                    value={formData.itemType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  >
                    <option value="">Select item type</option>
                    <option value="it">IT Equipment</option>
                    <option value="consumer">Consumer Electronics</option>
                    <option value="appliances">Appliances</option>
                    <option value="medical">Medical Devices</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  >
                    <option value="">Select city</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="warangal">Warangal</option>
                    <option value="nizamabad">Nizamabad</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="chennai">Chennai</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="pune">Pune</option>
                    <option value="kolkata">Kolkata</option>
                    <option value="coimbatore">Coimbatore</option>
                    <option value="visakhapatnam">Visakhapatnam</option>
                    <option value="gujarat">Gujarat</option>
                    <option value="andhra-pradesh">Andhra Pradesh</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any additional details..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={
                  isSubmitting || phoneState === "invalid" || emailState === "invalid"
                }
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request Pickup Now"
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
