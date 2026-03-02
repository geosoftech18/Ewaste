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
      generatePickupFormThankYouEmail,
      generateQuickPickupEmail,
      generateQuickPickupThankYouEmail,
      generateContactFormEmail, 
      generateQuoteModalEmail,
      generateBrochureDownloadEmail,
      generateCityPickupRequestEmail,
      generateCityPickupThankYouEmail,
      generateEWastePopupEmail,
      generateInstantPickupAdminEmail,
      generateInstantPickupThankYouEmail,
      generateStrongCTAEmail,
      generateFinalLeadEmail,
      generateFinalLeadThankYouEmail,
      generateAuditRequestEmail
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
      case 'city-pickup-request':
        htmlContent = generateCityPickupRequestEmail(data)
        subject = `🔄 New E-Waste Pickup Request from ${data.fullName} - ${data.city}`
        break
      case 'ewaste-popup':
        htmlContent = generateEWastePopupEmail(data)
        subject = `♻️ New E-Waste Pickup Request from ${data.name} (Popup)`
        break
      case 'instant-pickup':
        htmlContent = generateInstantPickupAdminEmail(data)
        subject = `⚡ Instant Pickup Request from ${data.fullName}`
        break
      case 'strong-cta':
        htmlContent = generateStrongCTAEmail(data)
        subject = `📅 Schedule Instant Pickup Request from ${data.name}`
        break
      case 'final-lead':
        htmlContent = generateFinalLeadEmail(data)
        subject = `🔒 Secure Compliance Consultation Request from ${data.fullName} - ${data.companyName}`
        break
      case 'audit-request':
        htmlContent = generateAuditRequestEmail(data)
        subject = `🔒 Professional Audit Request from ${data.fullName} - ${data.companyName}`
        break
      default:
        return NextResponse.json(
          { error: 'Invalid form type' },
          { status: 400 }
        )
    }

    // Create email send request for Brevo (Owner notification)
    const sendSmtpEmail = new brevo.SendSmtpEmail()
    sendSmtpEmail.subject = subject
    sendSmtpEmail.htmlContent = htmlContent
    sendSmtpEmail.textContent = htmlContent.replace(/<[^>]*>/g, '') // Plain text version
    sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL }
    sendSmtpEmail.to = [{ email: OWNER_EMAIL, name: 'S P Recycling Team' }]

    // Send owner notification email
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail)

    // Send thank you email to customer for quick-pickup, pickup-form, city-pickup-request, instant-pickup, and final-lead types
    if ((type === 'quick-pickup' || type === 'pickup-form' || type === 'city-pickup-request' || type === 'instant-pickup' || type === 'final-lead') && data.email) {
      try {
        let thankYouHtml = ''
        let thankYouSubject = ''

        if (type === 'quick-pickup') {
          thankYouHtml = generateQuickPickupThankYouEmail({
            fullName: data.fullName,
            itemType: data.itemType
          })
          thankYouSubject = 'Thank You for Your E-Waste Pickup Request - S P Recycling'
        } else if (type === 'pickup-form') {
          thankYouHtml = generatePickupFormThankYouEmail({
            fullName: data.fullName,
            city: data.city,
            date: data.date
          })
          thankYouSubject = 'Thank You for Scheduling Your E-Waste Pickup - S P Recycling'
        } else if (type === 'city-pickup-request') {
          thankYouHtml = generateCityPickupThankYouEmail({
            fullName: data.fullName,
            city: data.city,
            itemType: data.itemType
          })
          thankYouSubject = 'Thank You for Your E-Waste Pickup Request - S P Recycling'
        } else if (type === 'instant-pickup') {
          thankYouHtml = generateInstantPickupThankYouEmail({
            fullName: data.fullName
          })
          thankYouSubject = 'Thank You for Your Instant Pickup Request - S P Recycling'
        } else if (type === 'final-lead') {
          thankYouHtml = generateFinalLeadThankYouEmail({
            fullName: data.fullName,
            companyName: data.companyName
          })
          thankYouSubject = 'Thank You for Your Secure Compliance Consultation Request - S P Recycling'
        }

        const customerEmail = new brevo.SendSmtpEmail()
        customerEmail.subject = thankYouSubject
        customerEmail.htmlContent = thankYouHtml
        customerEmail.textContent = thankYouHtml.replace(/<[^>]*>/g, '')
        customerEmail.sender = { name: FROM_NAME, email: FROM_EMAIL }
        customerEmail.to = [{ email: data.email, name: data.fullName || data.name }]

        // Send thank you email to customer
        await apiInstance.sendTransacEmail(customerEmail)
      } catch (customerEmailError: any) {
        // Log error but don't fail the request if customer email fails
        console.error('Error sending customer thank you email:', customerEmailError)
      }
    }

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
