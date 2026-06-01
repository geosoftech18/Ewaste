'use client'

import type { FocusEventHandler } from 'react'
import PhoneInputWithCountry, {
  type Country,
  type Value,
} from 'react-phone-number-input'
import en from 'react-phone-number-input/locale/en.json'
import 'react-phone-number-input/style.css'

import { cn } from '@/lib/utils'

export interface PhoneInputProps {
  id?: string
  name?: string
  value: string
  onChange: (value: string) => void
  onBlur?: FocusEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  className?: string
  inputClassName?: string
  disabled?: boolean
  placeholder?: string
  defaultCountry?: Country
  'aria-invalid'?: boolean
  'aria-describedby'?: string
}

export function PhoneInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  className,
  inputClassName,
  disabled,
  placeholder = 'Enter phone number',
  defaultCountry = 'IN',
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
}: PhoneInputProps) {
  return (
    <PhoneInputWithCountry
      international
      countryCallingCodeEditable={false}
      defaultCountry={defaultCountry}
      labels={en}
      value={(value || undefined) as Value}
      onChange={(next) => onChange(next ?? '')}
      disabled={disabled}
      className={cn('phone-input-field', className)}
      numberInputProps={{
        id,
        name,
        onBlur,
        onFocus,
        placeholder,
        'aria-invalid': ariaInvalid,
        'aria-describedby': ariaDescribedBy,
        className: cn('phone-input-number', inputClassName),
      }}
    />
  )
}
