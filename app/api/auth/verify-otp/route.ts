import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { otpStore } from '@/lib/otp-store'

// Authorized admin emails (configure these as needed)
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || ['admin@sprecycling.com']

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    console.log('Verify OTP request:', { email, otp })

    if (!email || !otp) {
      console.error('Missing email or OTP')
      return NextResponse.json(
        { success: false, error: 'Email and OTP are required' },
        { status: 400 }
      )
    }

    // Trim and normalize email
    const normalizedEmail = email.trim().toLowerCase()
    const normalizedAdminEmails = ADMIN_EMAILS.map(e => e.trim().toLowerCase())

    console.log('Normalized email:', normalizedEmail)
    console.log('Admin emails:', normalizedAdminEmails)

    // Check if email is authorized
    if (!normalizedAdminEmails.includes(normalizedEmail)) {
      console.error('Email not authorized:', normalizedEmail)
      return NextResponse.json(
        { success: false, error: 'Unauthorized email address' },
        { status: 403 }
      )
    }

    // Retrieve stored OTP
    const storedData = otpStore.get(normalizedEmail)

    console.log('Stored OTP data:', storedData)
    console.log('OTP store contents:', Array.from(otpStore.entries()))

    if (!storedData) {
      console.error('OTP not found for email:', normalizedEmail)
      return NextResponse.json(
        { success: false, error: 'OTP not found. Please request a new one.' },
        { status: 400 }
      )
    }

    // Check if OTP has expired
    if (Date.now() > storedData.expiresAt) {
      console.error('OTP expired for email:', normalizedEmail)
      otpStore.delete(normalizedEmail)
      return NextResponse.json(
        { success: false, error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Verify OTP (also trim)
    const normalizedOtp = otp.trim()
    const normalizedStoredOtp = storedData.otp.trim()

    console.log('OTP comparison:', { provided: normalizedOtp, stored: normalizedStoredOtp, match: normalizedOtp === normalizedStoredOtp })

    if (normalizedStoredOtp !== normalizedOtp) {
      console.error('Invalid OTP')
      return NextResponse.json(
        { success: false, error: 'Invalid OTP' },
        { status: 400 }
      )
    }

    // OTP is valid, create session
    const cookieStore = await cookies()
    
    // Create session token (in production, use a proper session management system)
    const sessionToken = Buffer.from(
      JSON.stringify({
        email: normalizedEmail,
        authenticated: true,
        timestamp: Date.now(),
      })
    ).toString('base64')

    // Set secure session cookie
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    })

    // Clear the OTP
    otpStore.delete(normalizedEmail)

    console.log('Login successful for:', normalizedEmail)

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      email: normalizedEmail,
    })
  } catch (error) {
    console.error('Error in verify-otp:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

