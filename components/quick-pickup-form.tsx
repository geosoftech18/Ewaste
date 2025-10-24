"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Phone,
  Mail,
  Package,
  MapPin,
  Calendar,
  Upload,
  Send,
  MessageCircle,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const VALIDATION_RULES = {
  PHONE_REGEX: /^\+91[6-9][0-9]{9}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILES: 5,
  ALLOWED_FILE_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  MIN_ADDRESS_LENGTH: 10,
  MAX_ADDRESS_LENGTH: 200,
}

interface FormData {
  fullName: string
  phone: string
  email: string
  itemType: string
  address: string
  preferredDate: string
  preferredTime: string
  photos: File[]
}

interface FormErrors {
  fullName?: string
  phone?: string
  email?: string
  itemType?: string
  address?: string
  preferredDate?: string
  preferredTime?: string
  photos?: string
}

interface TouchedFields {
  [key: string]: boolean
}

export function QuickPickupForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "+91",
    email: "",
    itemType: "",
    address: "",
    preferredDate: "",
    preferredTime: "",
    photos: [],
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [formProgress, setFormProgress] = useState(0)

  const itemTypes = [
    "Printer",
    "IT Equipment",
    "Batteries",
    "Consumer Electronics",
    "Cables & Wires",
    "Mobile Phones",
    "Laptops",
    "Other",
  ]

  useEffect(() => {
    const requiredFields = ["fullName", "phone", "itemType", "address", "preferredDate", "preferredTime"]
    const filledFields = requiredFields.filter((field) => {
      const value = formData[field as keyof FormData]
      if (field === "phone") return value !== "+91" && value.length > 3
      return value && value.toString().trim().length > 0
    })
    setFormProgress(Math.round((filledFields.length / requiredFields.length) * 100))
  }, [formData])

  const validateField = (name: string, value: string | File[]): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value || (typeof value === "string" && !value.trim())) {
          return "Full name is required"
        }
        if (typeof value === "string" && value.trim().length < 2) {
          return "Name must be at least 2 characters"
        }
        if (typeof value === "string" && value.trim().length > 50) {
          return "Name must be less than 50 characters"
        }
        break

      case "phone":
        if (!value || value === "+91") {
          return "Phone number is required"
        }
        if (typeof value === "string" && !VALIDATION_RULES.PHONE_REGEX.test(value)) {
          return "Enter valid 10-digit mobile number starting with 6-9"
        }
        break

      case "email":
        if (value && typeof value === "string" && value.trim()) {
          if (!VALIDATION_RULES.EMAIL_REGEX.test(value)) {
            return "Please enter a valid email address"
          }
        }
        break

      case "itemType":
        if (!value) {
          return "Please select an item type"
        }
        break

      case "address":
        if (!value || (typeof value === "string" && !value.trim())) {
          return "Address is required"
        }
        if (typeof value === "string" && value.trim().length < VALIDATION_RULES.MIN_ADDRESS_LENGTH) {
          return `Address must be at least ${VALIDATION_RULES.MIN_ADDRESS_LENGTH} characters`
        }
        if (typeof value === "string" && value.trim().length > VALIDATION_RULES.MAX_ADDRESS_LENGTH) {
          return `Address must be less than ${VALIDATION_RULES.MAX_ADDRESS_LENGTH} characters`
        }
        break

      case "preferredDate":
        if (!value) {
          return "Preferred date is required"
        }
        if (typeof value === "string") {
          const selectedDate = new Date(value)
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          if (selectedDate < today) {
            return "Please select a future date"
          }
        }
        break

      case "preferredTime":
        if (!value) {
          return "Preferred time is required"
        }
        break
    }
    return undefined
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    newErrors.fullName = validateField("fullName", formData.fullName)
    newErrors.phone = validateField("phone", formData.phone)
    newErrors.email = validateField("email", formData.email)
    newErrors.itemType = validateField("itemType", formData.itemType)
    newErrors.address = validateField("address", formData.address)
    newErrors.preferredDate = validateField("preferredDate", formData.preferredDate)
    newErrors.preferredTime = validateField("preferredTime", formData.preferredTime)

    // Remove undefined errors
    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key as keyof FormErrors] === undefined) {
        delete newErrors[key as keyof FormErrors]
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBlur = (fieldName: string) => {
    setTouched({ ...touched, [fieldName]: true })
    const value = formData[fieldName as keyof FormData]
    const error = validateField(fieldName, value)
    setErrors({ ...errors, [fieldName]: error })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched
    const allTouched: TouchedFields = {}
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true
    })
    setTouched(allTouched)

    if (!validateForm()) {
      setErrorMessage("Please fix all errors before submitting")
      setShowError(true)
      setTimeout(() => setShowError(false), 4000)
      return
    }

    setIsSubmitting(true)
    setShowError(false)

    try {
      // In production, replace with actual API call:
      // const response = await fetch('/api/quick-pickup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // if (!response.ok) throw new Error('Failed to submit')

      await new Promise((resolve) => setTimeout(resolve, 1500))

      setShowSuccess(true)
      setFormData({
        fullName: "",
        phone: "+91",
        email: "",
        itemType: "",
        address: "",
        preferredDate: "",
        preferredTime: "",
        photos: [],
      })
      setErrors({})
      setTouched({})

      // Auto-hide success message
      setTimeout(() => setShowSuccess(false), 6000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrorMessage("Failed to submit request. Please try again.")
      setShowError(true)
      setTimeout(() => setShowError(false), 4000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePhoneChange = (value: string) => {
    // Ensure +91 prefix
    if (!value.startsWith("+91")) {
      value = "+91" + value.replace(/^\+91/, "")
    }
    // Only allow numbers after +91
    const cleaned = value.replace(/[^\d+]/g, "")
    if (cleaned.length <= 13) {
      // +91 + 10 digits
      setFormData({ ...formData, phone: cleaned })
      if (touched.phone) {
        const error = validateField("phone", cleaned)
        setErrors({ ...errors, phone: error })
      }
    }
  }

  const validateFiles = (files: File[]): string | null => {
    if (formData.photos.length + files.length > VALIDATION_RULES.MAX_FILES) {
      return `Maximum ${VALIDATION_RULES.MAX_FILES} files allowed`
    }

    for (const file of files) {
      if (!VALIDATION_RULES.ALLOWED_FILE_TYPES.includes(file.type)) {
        return `Only JPG, PNG, and WebP images are allowed`
      }
      if (file.size > VALIDATION_RULES.MAX_FILE_SIZE) {
        return `File ${file.name} exceeds 5MB limit`
      }
    }

    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      const validationError = validateFiles(newFiles)

      if (validationError) {
        setErrors({ ...errors, photos: validationError })
        setTimeout(() => setErrors({ ...errors, photos: undefined }), 4000)
        return
      }

      setFormData({ ...formData, photos: [...formData.photos, ...newFiles] })
      setErrors({ ...errors, photos: undefined })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).filter((file) =>
        VALIDATION_RULES.ALLOWED_FILE_TYPES.includes(file.type),
      )

      const validationError = validateFiles(newFiles)

      if (validationError) {
        setErrors({ ...errors, photos: validationError })
        setTimeout(() => setErrors({ ...errors, photos: undefined }), 4000)
        return
      }

      setFormData({ ...formData, photos: [...formData.photos, ...newFiles] })
      setErrors({ ...errors, photos: undefined })
    }
  }

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index)
    setFormData({ ...formData, photos: newPhotos })
    setErrors({ ...errors, photos: undefined })
  }

  const handleWhatsApp = () => {
    const message = `Hi! I'd like to schedule a pickup for ${formData.itemType || "items"}.`
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, "_blank")
  }

  const isFieldValid = (fieldName: string): boolean => {
    return touched[fieldName] && !errors[fieldName as keyof FormErrors] && !!formData[fieldName as keyof FormData]
  }

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-white via-green-50/20 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Quick Pickup Request
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Fill out the form below and we'll confirm your pickup shortly
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-green-100 p-5 sm:p-6 md:p-8 lg:p-10">
            {formProgress > 0 && formProgress < 100 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Form Progress</span>
                  <span className="text-sm font-semibold text-green-600">{formProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${formProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl flex items-start gap-3 text-green-800 shadow-sm"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-base">Request Submitted Successfully!</p>
                    <p className="text-sm text-green-700 mt-1">
                      We'll contact you shortly to confirm your pickup details.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3 text-red-800 shadow-sm"
                >
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-base">Submission Failed</p>
                    <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value })
                        if (touched.fullName) {
                          const error = validateField("fullName", e.target.value)
                          setErrors({ ...errors, fullName: error })
                        }
                      }}
                      onBlur={() => handleBlur("fullName")}
                      className={`pl-10 pr-10 h-11 transition-all ${
                        errors.fullName && touched.fullName
                          ? "border-red-500 focus:border-red-500"
                          : isFieldValid("fullName")
                            ? "border-green-500"
                            : ""
                      }`}
                      aria-invalid={!!errors.fullName && touched.fullName}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    />
                    {isFieldValid("fullName") && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.fullName && touched.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="fullName-error"
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </motion.p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      onBlur={() => handleBlur("phone")}
                      className={`pl-10 pr-10 h-11 transition-all ${
                        errors.phone && touched.phone
                          ? "border-red-500 focus:border-red-500"
                          : isFieldValid("phone")
                            ? "border-green-500"
                            : ""
                      }`}
                      aria-invalid={!!errors.phone && touched.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {isFieldValid("phone") && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.phone && touched.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="phone-error"
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </motion.p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email (Optional)
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                        if (touched.email) {
                          const error = validateField("email", e.target.value)
                          setErrors({ ...errors, email: error })
                        }
                      }}
                      onBlur={() => handleBlur("email")}
                      className={`pl-10 pr-10 h-11 transition-all ${
                        errors.email && touched.email
                          ? "border-red-500 focus:border-red-500"
                          : isFieldValid("email")
                            ? "border-green-500"
                            : ""
                      }`}
                      aria-invalid={!!errors.email && touched.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {isFieldValid("email") && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.email && touched.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="email-error"
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Item Type */}
                <div className="space-y-2">
                  <Label htmlFor="itemType" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    Item Type <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                    <Select
                      value={formData.itemType}
                      onValueChange={(value) => {
                        setFormData({ ...formData, itemType: value })
                        setTouched({ ...touched, itemType: true })
                        const error = validateField("itemType", value)
                        setErrors({ ...errors, itemType: error })
                      }}
                    >
                      <SelectTrigger
                        className={`pl-10 pr-10 h-11 transition-all ${
                          errors.itemType && touched.itemType
                            ? "border-red-500 focus:border-red-500"
                            : isFieldValid("itemType")
                              ? "border-green-500"
                              : ""
                        }`}
                        aria-invalid={!!errors.itemType && touched.itemType}
                        aria-describedby={errors.itemType ? "itemType-error" : undefined}
                      >
                        <SelectValue placeholder="Select item type" />
                      </SelectTrigger>
                      <SelectContent>
                        {itemTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isFieldValid("itemType") && (
                      <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 pointer-events-none" />
                    )}
                  </div>
                  {errors.itemType && touched.itemType && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="itemType-error"
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.itemType}
                    </motion.p>
                  )}
                </div>

                {/* Preferred Date */}
                <div className="space-y-2">
                  <Label htmlFor="preferredDate" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    Preferred Date <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => {
                        setFormData({ ...formData, preferredDate: e.target.value })
                        if (touched.preferredDate) {
                          const error = validateField("preferredDate", e.target.value)
                          setErrors({ ...errors, preferredDate: error })
                        }
                      }}
                      onBlur={() => handleBlur("preferredDate")}
                      className={`pl-10 pr-10 h-11 transition-all ${
                        errors.preferredDate && touched.preferredDate
                          ? "border-red-500 focus:border-red-500"
                          : isFieldValid("preferredDate")
                            ? "border-green-500"
                            : ""
                      }`}
                      aria-invalid={!!errors.preferredDate && touched.preferredDate}
                      aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
                    />
                    {isFieldValid("preferredDate") && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.preferredDate && touched.preferredDate && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="preferredDate-error"
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.preferredDate}
                    </motion.p>
                  )}
                </div>

                {/* Preferred Time */}
                <div className="space-y-2">
                  <Label htmlFor="preferredTime" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    Preferred Time <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <Input
                      id="preferredTime"
                      type="time"
                      value={formData.preferredTime}
                      onChange={(e) => {
                        setFormData({ ...formData, preferredTime: e.target.value })
                        if (touched.preferredTime) {
                          const error = validateField("preferredTime", e.target.value)
                          setErrors({ ...errors, preferredTime: error })
                        }
                      }}
                      onBlur={() => handleBlur("preferredTime")}
                      className={`pl-10 pr-10 h-11 transition-all ${
                        errors.preferredTime && touched.preferredTime
                          ? "border-red-500 focus:border-red-500"
                          : isFieldValid("preferredTime")
                            ? "border-green-500"
                            : ""
                      }`}
                      aria-invalid={!!errors.preferredTime && touched.preferredTime}
                      aria-describedby={errors.preferredTime ? "preferredTime-error" : undefined}
                    />
                    {isFieldValid("preferredTime") && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.preferredTime && touched.preferredTime && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="preferredTime-error"
                      className="text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.preferredTime}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Brief Address - Full Width */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Brief Address <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                  <Textarea
                    id="address"
                    placeholder="Enter your pickup address (e.g., House/Flat No., Street, Area, City)"
                    value={formData.address}
                    onChange={(e) => {
                      setFormData({ ...formData, address: e.target.value })
                      if (touched.address) {
                        const error = validateField("address", e.target.value)
                        setErrors({ ...errors, address: error })
                      }
                    }}
                    onBlur={() => handleBlur("address")}
                    className={`pl-10 pr-10 min-h-[90px] resize-none transition-all ${
                      errors.address && touched.address
                        ? "border-red-500 focus:border-red-500"
                        : isFieldValid("address")
                          ? "border-green-500"
                          : ""
                    }`}
                    maxLength={VALIDATION_RULES.MAX_ADDRESS_LENGTH}
                    aria-invalid={!!errors.address && touched.address}
                    aria-describedby={errors.address ? "address-error" : undefined}
                  />
                  {isFieldValid("address") && (
                    <CheckCircle2 className="absolute right-3 top-3 w-5 h-5 text-green-500" />
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    {errors.address && touched.address && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        id="address-error"
                        className="text-sm text-red-500 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.address}
                      </motion.p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formData.address.length}/{VALIDATION_RULES.MAX_ADDRESS_LENGTH}
                  </span>
                </div>
              </div>

              {/* Upload Photos */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Upload Photos (Optional - Max {VALIDATION_RULES.MAX_FILES} files, 5MB each)
                </Label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center transition-all ${
                    isDragging
                      ? "border-green-500 bg-green-50 scale-[1.02]"
                      : errors.photos
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-green-400 hover:bg-green-50/30"
                  }`}
                >
                  <Upload
                    className={`w-10 h-10 mx-auto mb-3 transition-colors ${
                      isDragging ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                  <p className="text-sm md:text-base text-gray-600 mb-2 font-medium">
                    {isDragging ? "Drop images here" : "Drag & drop images here, or click to select"}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">JPG, PNG, WebP up to 5MB</p>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload">
                    <Button type="button" variant="outline" size="sm" className="cursor-pointer bg-transparent" asChild>
                      <span>Choose Files</span>
                    </Button>
                  </label>
                </div>
                {errors.photos && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.photos}
                  </motion.p>
                )}

                {formData.photos.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mt-4"
                  >
                    {formData.photos.map((photo, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative group"
                      >
                        <img
                          src={URL.createObjectURL(photo) || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 sm:h-24 object-cover rounded-lg border-2 border-gray-200 group-hover:border-green-400 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                          aria-label={`Remove photo ${index + 1}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-all" />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 md:pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white h-12 md:h-13 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Request Pickup
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleWhatsApp}
                  className="sm:w-auto border-2 border-green-600 text-green-600 hover:bg-green-50 hover:border-green-700 h-12 md:h-13 text-base md:text-lg font-semibold bg-transparent transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">WhatsApp Us Now</span>
                  <span className="sm:hidden">WhatsApp</span>
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
