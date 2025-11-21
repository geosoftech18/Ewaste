"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
} from "lucide-react"

export default function ContactForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    mobile: "",
    city: "",
    serviceType: "",
    message: "",
    agreeTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"
      if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required"
      else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ""))) newErrors.mobile = "Mobile must be 10 digits"
    } else if (currentStep === 2) {
      if (!formData.city) newErrors.city = "Please select a city"
      if (!formData.serviceType) newErrors.serviceType = "Please select a service type"
      if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to terms & privacy policy"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(2)
    }
  }

  const handlePrevious = () => {
    setStep(1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(2)) return

    setLoading(true)
    setSubmitError('')

    try {
      // Send email via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact-form',
          data: {
            fullName: formData.fullName,
            companyName: formData.companyName || undefined,
            email: formData.email,
            mobile: formData.mobile,
            city: formData.city,
            serviceType: formData.serviceType,
            message: formData.message || undefined,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send email')
      }

      setSubmitted(true)
    } catch (error: any) {
      console.error('Error submitting form:', error)
      setSubmitError(error.message || 'Failed to submit inquiry. Please try again.')
    } finally {
      setLoading(false)
    }

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        mobile: "",
        city: "",
        serviceType: "",
        message: "",
        agreeTerms: false,
      })
      setSubmitted(false)
      setStep(1)
    }, 3000)
  }

  const cities = ["Hyderabad", "Mumbai", "Pune", "Chennai", "Bangalore", "Delhi", "Kolkata", "Other"]
  const serviceTypes = ["Pickup Request", "Bulk Disposal", "Corporate Partnership", "General Inquiry"]

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 animate-slide-up">Get in Touch</h2>
          <p className="text-lg text-gray-600 animate-fade-in animation-delay-200">
            Fill out the form below and our team will get back to you within 24 hours
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-8 text-center animate-scale-in">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-emerald-900 mb-2">Thank You!</h3>
            <p className="text-emerald-700">Your inquiry has been submitted successfully. We'll contact you soon.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border border-emerald-100 hover:shadow-2xl transition-all duration-300 animate-fade-in"
          >
            {submitError && (
              <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start gap-3 text-red-800">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Submission Failed</p>
                  <p className="text-sm text-red-700 mt-1">{submitError}</p>
                </div>
              </div>
            )}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 ${step === 1 ? "bg-emerald-600 scale-110" : "bg-emerald-400"}`}
                  >
                    1
                  </div>
                  <span className={`text-sm font-semibold ${step === 1 ? "text-emerald-600" : "text-gray-500"}`}>
                    Basic Info
                  </span>
                </div>
                <div
                  className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${step === 2 ? "bg-emerald-600" : "bg-gray-300"}`}
                ></div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 ${step === 2 ? "bg-emerald-600 scale-110" : "bg-emerald-400"}`}
                  >
                    2
                  </div>
                  <span className={`text-sm font-semibold ${step === 2 ? "text-emerald-600" : "text-gray-500"}`}>
                    Details
                  </span>
                </div>
              </div>
            </div>

            {/* STEP 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                {/* Name and Company Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="animate-fade-in animation-delay-100">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 text-emerald-600" />
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 hover:border-emerald-300 focus:shadow-lg ${
                        errors.fullName
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-emerald-500"
                      }`}
                    />
                    {errors.fullName && (
                      <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.fullName}
                      </div>
                    )}
                  </div>
                  <div className="animate-fade-in animation-delay-200">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      Company Name
                    </label>
                    <Input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-all duration-300 hover:border-emerald-300 focus:shadow-lg"
                    />
                  </div>
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="animate-fade-in animation-delay-300">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 text-emerald-600" />
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 hover:border-emerald-300 focus:shadow-lg ${
                        errors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-emerald-500"
                      }`}
                    />
                    {errors.email && (
                      <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div className="animate-fade-in animation-delay-400">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      Mobile Number *
                    </label>
                    <Input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="9999999999"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 hover:border-emerald-300 focus:shadow-lg ${
                        errors.mobile
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-emerald-500"
                      }`}
                    />
                    {errors.mobile && (
                      <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.mobile}
                      </div>
                    )}
                  </div>
                </div>

                {/* Next Button */}
                <div className="flex justify-end pt-6">
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center gap-2 animate-fade-in animation-delay-500"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Details and Message */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                {/* City and Service Type Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="animate-fade-in animation-delay-100">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      Select City *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 bg-white hover:border-emerald-300 focus:shadow-lg ${
                        errors.city ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"
                      }`}
                    >
                      <option value="">Choose a city</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.city}
                      </div>
                    )}
                  </div>
                  <div className="animate-fade-in animation-delay-200">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      Service Type *
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 bg-white hover:border-emerald-300 focus:shadow-lg ${
                        errors.serviceType
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-emerald-500"
                      }`}
                    >
                      <option value="">Select service</option>
                      {serviceTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.serviceType && (
                      <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {errors.serviceType}
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="animate-fade-in animation-delay-300">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-all duration-300 resize-none hover:border-emerald-300 focus:shadow-lg"
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 animate-fade-in animation-delay-400">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className={`w-5 h-5 mt-1 rounded border-2 cursor-pointer transition-colors ${
                      errors.agreeTerms ? "border-red-500" : "border-gray-300 hover:border-emerald-500"
                    } text-emerald-600 focus:ring-emerald-500`}
                  />
                  <label className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-emerald-600 font-semibold hover:underline hover:text-emerald-700 transition-colors"
                    >
                      terms & privacy policy
                    </a>
                  </label>
                </div>
                {errors.agreeTerms && (
                  <div className="flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.agreeTerms}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 gap-4">
                  <Button
                    type="button"
                    onClick={handlePrevious}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center gap-2 animate-fade-in animation-delay-500"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-70 hover:shadow-lg transform hover:scale-105 animate-fade-in animation-delay-500"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
