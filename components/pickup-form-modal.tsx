"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { CalendarIcon, CheckCircle2, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface PickupFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const wasteTypes = ["IT Equipment", "Printers", "Batteries", "Consumer Electronics", "Other"]

const quantityUnits = ["kg", "items", "pieces", "boxes", "bags"]

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

export function PickupFormModal({ open, onOpenChange }: PickupFormModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    alternatePhone: "",
    email: "",
    address: "",
    city: "",
    date: undefined as Date | undefined,
    wasteTypes: [] as string[],
    otherWasteType: "",
    quantityValue: "",
    quantityUnit: "kg",
    additionalNotes: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

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
      case "phone":
        const phoneRegex = /^[0-9]{10}$/
        if (!value) {
          newErrors.phone = "Phone number is required"
        } else if (!phoneRegex.test(value.replace(/^\+91/, ""))) {
          newErrors.phone = "Please enter a valid 10-digit phone number"
        } else {
          delete newErrors.phone
        }
        break
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
      case "address":
        if (!value.trim()) {
          newErrors.address = "Pickup address is required"
        } else {
          delete newErrors.address
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
    console.log("handleInputChange called with:", name, value)
    setFormData((prev) => {
      const newData = { ...prev, [name]: value }
      console.log("New form data:", newData)
      return newData
    })
    validateField(name, value)
  }

  const handleWasteTypeToggle = (type: string) => {
    const newWasteTypes = formData.wasteTypes.includes(type)
      ? formData.wasteTypes.filter((t) => t !== type)
      : [...formData.wasteTypes, type]
    handleInputChange("wasteTypes", newWasteTypes)
  }

  const removeWasteType = (type: string) => {
    const newWasteTypes = formData.wasteTypes.filter((t) => t !== type)
    handleInputChange("wasteTypes", newWasteTypes)
  }

  const validateStep = (step: number) => {
    const newErrors = { ...errors }
    
    if (step === 1) {
      validateField("fullName", formData.fullName)
      validateField("phone", formData.phone)
      validateField("email", formData.email)
    } else if (step === 2) {
      validateField("address", formData.address)
      validateField("city", formData.city)
      validateField("date", formData.date)
    }
    
    // Check if there are any errors for the current step
    const stepErrors = Object.keys(newErrors).filter(key => {
      if (step === 1) {
        return key === "fullName" || key === "phone" || key === "email"
      } else if (step === 2) {
        return key === "address" || key === "city" || key === "date"
      }
      return false
    })
    
    return stepErrors.length === 0
  }

  const handleNext = () => {
    console.log("=== handleNext called ===")
    console.log("Current step:", currentStep)
    console.log("Form data:", formData)
    
    if (currentStep === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.fullName?.trim() || !formData.phone || formData.phone.length !== 10 || !formData.email?.trim() || !emailRegex.test(formData.email.trim())) {
        console.log("❌ Step 1 validation failed")
        toast.error("Please fill in all required fields correctly")
        return
      }
      console.log("✅ Step 1 validation passed")
    } 
    
    if (currentStep === 2) {
      console.log("Step 2 validation:")
      console.log("- Address:", formData.address, formData.address ? "✅" : "❌")
      console.log("- City:", formData.city, formData.city ? "✅" : "❌") 
      console.log("- Date:", formData.date, formData.date ? "✅" : "❌")
      
      if (!formData.address?.trim() || !formData.city || !formData.date) {
        console.log("❌ Step 2 validation failed")
        toast.error("Please fill in all required fields correctly")
        return
      }
      console.log("✅ Step 2 validation passed")
    }
    
    console.log("🚀 Moving to next step")
    setCurrentStep(prev => Math.min(prev + 1, 3))
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all required fields
    validateField("fullName", formData.fullName)
    validateField("phone", formData.phone)
    validateField("email", formData.email)
    validateField("address", formData.address)
    validateField("city", formData.city)
    validateField("date", formData.date)
    validateField("agreeToTerms", formData.agreeToTerms)

    if (Object.keys(errors).length > 0 || !formData.agreeToTerms) {
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
            alternatePhone: formData.alternatePhone || undefined,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            date: formData.date ? formData.date.toISOString() : undefined,
            wasteTypes: formData.wasteTypes,
            otherWasteType: formData.otherWasteType || undefined,
            quantityValue: formData.quantityValue || undefined,
            quantityUnit: formData.quantityUnit || undefined,
            additionalNotes: formData.additionalNotes || undefined,
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
        setCurrentStep(1)
        setFormData({
          fullName: "",
          phone: "",
          alternatePhone: "",
          email: "",
          address: "",
          city: "",
          date: undefined,
          wasteTypes: [],
          otherWasteType: "",
          quantityValue: "",
          quantityUnit: "kg",
          additionalNotes: "",
          agreeToTerms: false,
        })
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
        <DialogContent className="sm:max-w-md">
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
                window.open(`https://wa.me/919876543210?text=${message}`, "_blank")
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
              <p className="text-gray-600">Let's start with your contact details</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={cn(errors.fullName && "border-red-500")}
                />
                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                      handleInputChange("phone", value)
                    }}
                    className={cn(errors.phone && "border-red-500")}
                  />
                </div>
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alternatePhone">Alternate Contact Number (Optional)</Label>
                <Input
                  id="alternatePhone"
                  type="tel"
                  placeholder="10-digit alternate number"
                  value={formData.alternatePhone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                    handleInputChange("alternatePhone", value)
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={cn(errors.email && "border-red-500")}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pickup Details</h3>
              <p className="text-gray-600">Where and when should we pick up your e-waste?</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">
                Pickup Address <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="address"
                placeholder="Enter complete pickup address with landmarks"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={cn("min-h-[80px]", errors.address && "border-red-500")}
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">
                  City / Location <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)}>
                  <SelectTrigger className={cn(errors.city && "border-red-500")}>
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
              </div>

              <div className="space-y-2">
                <Label>
                  Preferred Pickup Date <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={formData.date ? formData.date.toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const dateValue = e.target.value ? new Date(e.target.value) : undefined
                      console.log("Date input changed:", dateValue)
                      setFormData(prev => ({ ...prev, date: dateValue }))
                    }}
                    min={new Date().toISOString().split('T')[0]}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      console.log("Date button clicked")
                      // This is just for visual feedback
                    }}
                  >
                    <CalendarIcon className="w-4 h-4" />
                  </Button>
                </div>
                {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Waste Information</h3>
              <p className="text-gray-600">Tell us about the e-waste you want to dispose</p>
            </div>

            <div className="space-y-2">
              <Label>Waste Type (Select all that apply)</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border rounded-lg bg-gray-50">
                {wasteTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={formData.wasteTypes.includes(type)}
                      onCheckedChange={() => handleWasteTypeToggle(type)}
                    />
                    <Label htmlFor={type} className="font-normal cursor-pointer">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>

              {formData.wasteTypes.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Selected Waste Types:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.wasteTypes.map((type) => (
                      <div
                        key={type}
                        className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {type}
                        <button
                          type="button"
                          onClick={() => removeWasteType(type)}
                          className="hover:bg-green-200 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.wasteTypes.includes("Other") && (
                <Input
                  placeholder="Please specify other waste type"
                  value={formData.otherWasteType}
                  onChange={(e) => handleInputChange("otherWasteType", e.target.value)}
                  className="mt-2"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity / Approximate Weight</Label>
              <div className="flex gap-2">
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={formData.quantityValue}
                  onChange={(e) => handleInputChange("quantityValue", e.target.value)}
                  className="flex-1"
                  min="0"
                  step="0.1"
                />
                <Select value={formData.quantityUnit} onValueChange={(value) => handleInputChange("quantityUnit", value)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {quantityUnits.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes / Instructions</Label>
              <Textarea
                id="notes"
                placeholder="Any special instructions or details about the items"
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div className="flex items-start space-x-2">
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
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Schedule Your E-Waste Pickup</DialogTitle>
          <DialogDescription>Fill in the details and our team will contact you shortly.</DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    currentStep >= step
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  )}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={cn(
                      "w-16 h-1 mx-2",
                      currentStep > step ? "bg-green-600" : "bg-gray-200"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <div>
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              
              {currentStep < 3 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
