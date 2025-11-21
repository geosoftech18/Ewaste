import { NextRequest, NextResponse } from 'next/server'
import * as brevo from '@getbrevo/brevo'

// Initialize Brevo client
const apiInstance = new brevo.TransactionalEmailsApi()

// Set API key
if (process.env.BREVO_API_KEY) {
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)
}

// Owner's email address (where inquiries will be sent)
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'sprecycling563@gmail.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@sprecycling.com'
const FROM_NAME = process.env.FROM_NAME || 'S P Recycling'

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json(
        { error: 'Brevo API key is not configured. Please set BREVO_API_KEY in your environment variables.' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { type, data } = body

    if (!type || !data) {
      return NextResponse.json(
        { error: 'Missing type or data' },
        { status: 400 }
      )
    }

    // Import email templates dynamically
    const { 
      generatePickupFormEmail, 
      generateQuickPickupEmail, 
      generateContactFormEmail, 
      generateQuoteModalEmail,
      generateBrochureDownloadEmail
    } = await import('@/lib/email-templates')

    let htmlContent = ''
    let subject = ''

    // Generate email content based on form type
    switch (type) {
      case 'pickup-form':
        htmlContent = generatePickupFormEmail(data)
        subject = `🔄 New E-Waste Pickup Request from ${data.fullName}`
        break
      case 'quick-pickup':
        htmlContent = generateQuickPickupEmail(data)
        subject = `⚡ Quick Pickup Request from ${data.fullName}`
        break
      case 'contact-form':
        htmlContent = generateContactFormEmail(data)
        subject = `📧 New Contact Inquiry - ${data.serviceType} from ${data.fullName}`
        break
      case 'quote-modal':
        htmlContent = generateQuoteModalEmail(data)
        subject = `💰 New Quote Request from ${data.name}`
        break
      case 'brochure-download':
        htmlContent = generateBrochureDownloadEmail(data)
        subject = `📄 Brochure Download Request from ${data.name}`
        break
      default:
        return NextResponse.json(
          { error: 'Invalid form type' },
          { status: 400 }
        )
    }

    // Create email send request for Brevo
    const sendSmtpEmail = new brevo.SendSmtpEmail()
    sendSmtpEmail.subject = subject
    sendSmtpEmail.htmlContent = htmlContent
    sendSmtpEmail.textContent = htmlContent.replace(/<[^>]*>/g, '') // Plain text version
    sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL }
    sendSmtpEmail.to = [{ email: OWNER_EMAIL, name: 'S P Recycling Team' }]

    // Send email via Brevo
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully',
        messageId: result.body?.messageId || 'sent'
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send email', 
        details: error.message || error.response?.body?.message || 'Unknown error' 
      },
      { status: 500 }
    )
  }
}
