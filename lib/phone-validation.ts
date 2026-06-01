import { isValidPhoneNumber } from 'libphonenumber-js'

export function isPhoneValid(value: string | undefined | null): boolean {
  if (!value?.trim()) return false
  try {
    return isValidPhoneNumber(value)
  } catch {
    return false
  }
}

export function getPhoneValidationError(
  value: string | undefined | null,
  required = true
): string | undefined {
  if (!value?.trim()) {
    return required ? 'Phone number is required' : undefined
  }
  if (!isPhoneValid(value)) {
    return 'Please enter a valid phone number'
  }
  return undefined
}

/** True when the field is empty or only a bare country calling code (e.g. +91). */
export function isPhoneEmpty(value: string | undefined | null): boolean {
  if (!value?.trim()) return true
  return /^\+[1-9]\d{0,3}$/.test(value.trim())
}
