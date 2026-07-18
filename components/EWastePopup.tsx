"use client"

import { useState, useEffect } from 'react'
import { X, Phone, MessageCircle, CheckCircle2 } from 'lucide-react'
import { PhoneInput } from '@/components/ui/phone-input'
import { getPhoneValidationError } from '@/lib/phone-validation'

const COMPANY_WHATSAPP = '9949901238'
const COMPANY_PHONE = '+91 9949901238'

const trustPromises = [
  '✔ Same-Day Pickup Service',
  '✔ 24/7 Customer Support',
  '✔ 100% Satisfaction Guarantee',
  '✔ 10+ Years of Certified Experience',
]

export default function EWastePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [currentPromiseIndex, setCurrentPromiseIndex] = useState(0)
  const [formData, setFormData] = useState({ name: '', contactNumber: '' })
  const [errors, setErrors] = useState({ name: '', contactNumber: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (currentStep === 1) {
      const interval = setInterval(() => {
        setCurrentPromiseIndex((prev) => (prev + 1) % trustPromises.length)
      }, 2500)

      return () => clearInterval(interval)
    }
  }, [currentStep])

  const handleInputChange = (field: 'name' | 'contactNumber', value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = { name: '', contactNumber: '' }
    let isValid = true

    const trimmedName = formData.name.trim()
    if (!trimmedName) {
      newErrors.name = 'Name is required'
      isValid = false
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
      isValid = false
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      newErrors.name = 'Name can only contain letters and spaces'
      isValid = false
    }

    const contactError = getPhoneValidationError(formData.contactNumber)
    if (contactError) {
      newErrors.contactNumber = contactError
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Send email to owner
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'ewaste-popup',
          data: {
            name: formData.name.trim(),
            contactNumber: formData.contactNumber,
          },
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email')
      }

      setCurrentStep(2)
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({
        name: '',
        contactNumber: 'Unable to submit. Please check your connection and try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Hi, I just submitted my pickup request. Please assist.'
    )
    window.open(`https://wa.me/${COMPANY_WHATSAPP}?text=${message}`, '_blank')
  }

  const handleCallClick = () => {
    window.location.href = `tel:${COMPANY_PHONE}`
  }

  if (!isVisible) return null

  return (
    <>
      <style jsx>{`
        @keyframes overlayFadeIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(8px);
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes promiseFade {
          0% {
            opacity: 0;
            transform: translateX(-10px);
          }
          10% {
            opacity: 1;
            transform: translateX(0);
          }
          90% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(10px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
          }
          50% {
            box-shadow: 0 0 16px rgba(34, 197, 94, 0.5);
          }
        }

        .overlay-backdrop {
          animation: overlayFadeIn 0.3s ease-out;
        }

        .popup-container {
          animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .step-fade-in {
          animation: fadeIn 0.4s ease-out;
        }

        .promise-item {
          animation: promiseFade 2.5s ease-in-out;
        }

        .promise-glow {
          animation: glow 2.5s ease-in-out infinite;
        }
      `}</style>

      <div className="overlay-backdrop fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-4">
        <div className="popup-container bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg relative" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            {currentStep === 1 ? (
              <div className="step-fade-in p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pr-8">
                  Trusted E-Waste Recycling Experts for Over 10 Years
                </h2>

                <div className="mb-6 h-12 flex items-center">
                  <div
                    key={currentPromiseIndex}
                    className="promise-item inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 font-medium text-sm sm:text-base promise-glow"
                  >
                    {trustPromises[currentPromiseIndex]}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                      aria-label="Name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <PhoneInput
                      value={formData.contactNumber}
                      onChange={(value) => handleInputChange('contactNumber', value)}
                      placeholder="Enter phone number"
                      className={errors.contactNumber ? 'phone-input-field--error' : undefined}
                      inputClassName={`w-full px-4 py-3 rounded-lg border ${
                        errors.contactNumber
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                      }`}
                      aria-invalid={!!errors.contactNumber}
                      aria-describedby={errors.contactNumber ? 'phone-error' : undefined}
                    />
                    {errors.contactNumber && (
                      <p id="phone-error" className="text-red-500 text-sm mt-1">
                        {errors.contactNumber}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                  >
                    {isSubmitting ? 'Submitting...' : 'Schedule Free Pickup'}
                  </button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Your details are safe and used only for pickup coordination.
                </p>
              </div>
            ) : (
              <div className="step-fade-in p-6 sm:p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Thank You!
                </h2>
                <p className="text-gray-600 mb-6">
                  We will get in touch with you within 1 hour.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <button
                    onClick={handleWhatsAppClick}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us
                  </button>

                  <button
                    onClick={handleCallClick}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </button>
                </div>
              </div>
            )}
          </div>
      </div>
    </>
  )
}
