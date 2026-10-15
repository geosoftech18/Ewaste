"use client"

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { PhoneInput } from '@/components/ui/phone-input'
import {
  getPhoneFieldState,
  getPhoneValidationError,
} from '@/lib/phone-validation'
import { redirectToThankYou } from '@/lib/form-redirect'
import { FormFieldStatus } from '@/components/form-field-status'

const trustPromises = [
  '✔ Same-Day Pickup Service',
  '✔ 24/7 Customer Support',
  '✔ 100% Satisfaction Guarantee',
  '✔ 10+ Years of Certified Experience',
]

export default function EWastePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentPromiseIndex, setCurrentPromiseIndex] = useState(0)
  const [formData, setFormData] = useState({ name: '', contactNumber: '' })
  const [errors, setErrors] = useState({ name: '', contactNumber: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const phoneState = getPhoneFieldState(formData.contactNumber)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 9000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromiseIndex((prev) => (prev + 1) % trustPromises.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

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

      setIsVisible(false)
      redirectToThankYou(formData.name, 'ewaste-popup')
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({
        name: '',
        contactNumber: 'Unable to submit. Please check your connection and try again.',
      })
      setIsSubmitting(false)
    }
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
          0%,
          100% {
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
        <div
          className="popup-container bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg relative"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>

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

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
                  <p id="name-error" className="text-red-500 text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <PhoneInput
                  value={formData.contactNumber}
                  onChange={(value) => handleInputChange('contactNumber', value)}
                  placeholder="Enter phone number"
                  className={
                    errors.contactNumber || phoneState === 'invalid'
                      ? 'phone-input-field--error'
                      : undefined
                  }
                  inputClassName={`w-full px-4 py-3 rounded-lg border ${
                    errors.contactNumber || phoneState === 'invalid'
                      ? 'border-red-300 bg-red-50'
                      : phoneState === 'valid'
                        ? 'border-emerald-500'
                        : 'border-gray-300'
                  }`}
                  aria-invalid={phoneState === 'invalid' || !!errors.contactNumber}
                  aria-describedby={errors.contactNumber ? 'phone-error' : undefined}
                />
                <FormFieldStatus
                  state={phoneState}
                  validMessage="Valid mobile number"
                  invalidMessage="Enter a valid mobile number with country code"
                />
                {errors.contactNumber && phoneState !== 'invalid' && (
                  <p id="phone-error" className="text-red-500 text-sm mt-1">
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || phoneState !== 'valid'}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                {isSubmitting ? 'Submitting...' : 'Schedule Free Pickup'}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Your details are safe and used only for pickup coordination.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
