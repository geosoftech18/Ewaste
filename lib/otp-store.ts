// Shared OTP store for admin login
export const otpStore = new Map<string, { otp: string; expiresAt: number }>()

