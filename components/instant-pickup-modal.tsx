'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { Label } from '@/components/ui/label'
import { isPhoneValid } from '@/lib/phone-validation'
import { Loader, CheckCircle2 } from 'lucide-react'

interface InstantPickupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InstantPickupModal({ open, onOpenChange }: InstantPickupModalProps) {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!name.trim()) {
      setError('Name is required')
      return
    }

    if (!number.trim()) {
      setError('Contact number is required')
      return
    }

    if (!isPhoneValid(number)) {
      setError('Please enter a valid phone number')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'instant-pickup',
          data: {
            fullName: name.trim(),
            phone: number,
          },
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        // Reset form after 2 seconds and close modal
        setTimeout(() => {
          setName('')
          setNumber('')
          setIsSuccess(false)
          onOpenChange(false)
        }, 2000)
      } else {
        setError(result.error || 'Failed to submit. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('Unable to submit. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setName('')
      setNumber('')
      setError('')
      setIsSuccess(false)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Instant Pickup Request
          </DialogTitle>
          <DialogDescription>
            Fill in your details and we'll schedule a pickup for you right away!
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Request Submitted!</h3>
            <p className="text-gray-600">
              We'll contact you shortly to schedule your pickup.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="instant-name">
                Your Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="instant-name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instant-number">
                Contact Number <span className="text-red-500">*</span>
              </Label>
              <PhoneInput
                id="instant-number"
                name="number"
                value={number}
                onChange={setNumber}
                disabled={isSubmitting}
                placeholder="Enter phone number"
                inputClassName="h-11"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !name.trim() || !number.trim()}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Schedule Pickup'
                )}
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Your details are safe and used only for pickup coordination.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

