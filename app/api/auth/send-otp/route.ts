import { NextRequest, NextResponse } from 'next/server'
import { randomInt } from 'crypto'
import * as brevo from '@getbrevo/brevo'
import { generateAdminLoginOtpEmail } from '@/lib/email-templates'
import { otpStore } from '@/lib/otp-store'

// Initialize Brevo client
const apiInstance = new brevo.TransactionalEmailsApi()

// Set API key
if (process.env.BREVO_API_KEY) {
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)
}

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@sprecycling.com'
const FROM_NAME = process.env.FROM_NAME || 'S P Recycling'

export async function POST(request: NextRequest) {
  try {
    const { email: rawEmail } = await request.json()

    if (!rawEmail) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    // Normalize email
    const email = rawEmail.trim().toLowerCase()

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if API key is configured
    if (!process.env.BREVO_API_KEY) {
      console.error('Brevo API key is not configured')
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Generate 6-digit OTP
    const otp = String(randomInt(100000, 999999))

    // Store OTP with 10-minute expiration
    const expiresAt = Date.now() + 10 * 60 * 1000
    otpStore.set(email, { otp, expiresAt })

    console.log('OTP sent to:', email, 'OTP:', otp)

    // Generate email HTML
    const htmlContent = generateAdminLoginOtpEmail({ email, otp })

    // Send OTP via email using Brevo
    try {
      const sendSmtpEmail = new brevo.SendSmtpEmail()
      sendSmtpEmail.subject = `🔐 Admin Login Verification Code - ${otp}`
      sendSmtpEmail.htmlContent = htmlContent
      sendSmtpEmail.textContent = htmlContent.replace(/<[^>]*>/g, '')
      sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL }
      sendSmtpEmail.to = [{ email: email, name: 'Admin' }]

      const result = await apiInstance.sendTransacEmail(sendSmtpEmail)

      console.log('OTP email sent successfully:', result.body?.messageId)

      return NextResponse.json({
        success: true,
        message: 'OTP sent successfully',
      })
    } catch (emailError) {
      console.error('Error sending email via Brevo:', emailError)
      return NextResponse.json(
        { success: false, error: 'Failed to send OTP email' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in send-otp:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

