'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Label } from '@/components/ui/label';
import { isPhoneValid } from '@/lib/phone-validation';
import { Download, CheckCircle2, AlertCircle } from 'lucide-react';

interface BrochureDownloadModalProps {
  open: boolean;
  onClose: () => void;
}

export function BrochureDownloadModal({ open, onClose }: BrochureDownloadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    if (!formData.name.trim()) {
      setSubmitError('Name is required');
      return false;
    }
    if (!isPhoneValid(formData.phone)) {
      setSubmitError('Please enter a valid phone number');
      return false;
    }
    if (!formData.email.trim()) {
      setSubmitError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'brochure-download',
          data: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send request');
      }

      // Show success message
      setIsSuccess(true);

      // Reset form after 2 seconds and close modal
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
        });
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (error: any) {
      console.error('Error submitting brochure request:', error);
      setSubmitError(error.message || 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Download className="w-6 h-6 text-emerald-500" />
            Download Brochure
          </DialogTitle>
          <DialogDescription>
            Fill in your details to download our comprehensive e-waste recycling brochure.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">
              Your request has been received. We'll send you the brochure shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="brochure-name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="brochure-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                disabled={isSubmitting}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brochure-phone">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <PhoneInput
                id="brochure-phone"
                name="phone"
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value })}
                placeholder="Enter phone number"
                disabled={isSubmitting}
                inputClassName="w-full h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brochure-email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="brochure-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
                className="w-full"
              />
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-emerald-800">
                <strong>Note:</strong> After submitting, you'll receive the brochure via email along with additional information about our services.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Submitting...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

