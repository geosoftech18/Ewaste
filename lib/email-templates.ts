export interface EmailData {
  fullName: string
  email: string
  phone: string
  [key: string]: any
}

export function generatePickupFormEmail(data: {
  fullName: string
  phone: string
  alternatePhone?: string
  email: string
  address?: string
  city: string
  date: string
  wasteTypes?: string[]
  otherWasteType?: string
  quantityValue?: string
  quantityUnit?: string
  additionalNotes?: string
}): string {
  const formattedDate = data.date ? new Date(data.date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Not specified'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New E-Waste Pickup Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;"> New E-Waste Pickup Request</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px;">S P Recycling Pvt Ltd</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Customer Information</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Full Name:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.fullName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Phone:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.phone}</span>
                  </td>
                </tr>
                ${data.alternatePhone ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Alternate Phone:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.alternatePhone}</span>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Email:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.email}</span>
                  </td>
                </tr>
              </table>

              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Pickup Details</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                ${data.address ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Address:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.address}</span>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">City:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.city}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Preferred Date:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${formattedDate}</span>
                  </td>
                </tr>
              </table>

              ${data.wasteTypes && data.wasteTypes.length > 0 ? `
              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Waste Information</h2>
              
              <div style="background-color: #f0fdf4; border-left: 4px solid #10B981; padding: 15px; margin-bottom: 20px; border-radius: 6px;">
                <p style="margin: 0 0 10px 0; color: #065f46; font-weight: 600; font-size: 14px;">Waste Types:</p>
                <p style="margin: 0; color: #047857; font-size: 14px;">
                  ${data.wasteTypes.join(', ')}
                  ${data.otherWasteType ? ` (Other: ${data.otherWasteType})` : ''}
                </p>
              </div>
              ` : ''}

              ${data.quantityValue ? `
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Quantity:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.quantityValue} ${data.quantityUnit || 'kg'}</span>
                  </td>
                </tr>
              </table>
              ` : ''}

              ${data.additionalNotes ? `
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 15px; margin-bottom: 20px; border-radius: 6px;">
                <p style="margin: 0 0 8px 0; color: #374151; font-weight: 600; font-size: 14px;">Additional Notes:</p>
                <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.6;">${data.additionalNotes}</p>
              </div>
              ` : ''}

              <!-- Action Button -->
              <table role="presentation" style="width: 100%; margin-top: 30px;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="tel:${data.phone}" style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">Contact Customer</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">This is an automated email from S P Recycling Pvt Ltd</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateQuickPickupEmail(data: {
  fullName: string
  phone: string
  email: string
  itemType: string
  address: string
}): string {

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quick Pickup Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">⚡ Quick Pickup Request</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px;">S P Recycling Pvt Ltd</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="background-color: #f0fdf4; border-left: 4px solid #10B981; padding: 15px; margin-bottom: 30px; border-radius: 6px;">
                <p style="margin: 0; color: #065f46; font-weight: 600; font-size: 16px;"> New Quick Pickup Request Received</p>
              </div>

              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Customer Details</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Name:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.fullName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Phone:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.phone}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Email:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.email}</span>
                  </td>
                </tr>
              </table>

              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Pickup Information</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Item Type:</strong>
                    <span style="color: #1f2937; font-size: 14px; font-weight: 600;">${data.itemType}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Address:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.address}</span>
                  </td>
                </tr>
              </table>

              <!-- Action Button -->
              <table role="presentation" style="width: 100%; margin-top: 30px;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="tel:${data.phone}" style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">Contact Customer</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">This is an automated email from S P Recycling Pvt Ltd</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateQuickPickupThankYouEmail(data: {
  fullName: string
  itemType: string
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - Quick Pickup Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">✅ Thank You!</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px;">S P Recycling Pvt Ltd</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="background-color: #f0fdf4; border-left: 4px solid #10B981; padding: 20px; margin-bottom: 30px; border-radius: 6px;">
                <p style="margin: 0; color: #065f46; font-weight: 600; font-size: 18px;">Dear ${data.fullName},</p>
                <p style="margin: 10px 0 0 0; color: #047857; font-size: 16px; line-height: 1.6;">
                  Thank you for choosing S P Recycling for your e-waste pickup request! We've received your request for <strong>${data.itemType}</strong> and our team will contact you shortly to confirm the pickup details.
                </p>
              </div>

              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">What Happens Next?</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                    <div style="display: flex; align-items: start; gap: 15px;">
                      <div style="background-color: #10B981; color: #ffffff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;">1</div>
                      <div>
                        <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">We'll Review Your Request</p>
                        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">Our team will review your pickup request and prepare for collection.</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                    <div style="display: flex; align-items: start; gap: 15px;">
                      <div style="background-color: #10B981; color: #ffffff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;">2</div>
                      <div>
                        <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">We'll Contact You</p>
                        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">You'll receive a call or message from us within 24 hours to confirm the pickup schedule.</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0;">
                    <div style="display: flex; align-items: start; gap: 15px;">
                      <div style="background-color: #10B981; color: #ffffff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;">3</div>
                      <div>
                        <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">We'll Collect Your E-Waste</p>
                        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">Our team will arrive at your location at the scheduled time to collect your items.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <div style="background-color: #eff6ff; border: 1px solid #3b82f6; padding: 20px; margin-bottom: 20px; border-radius: 6px;">
                <p style="margin: 0 0 10px 0; color: #1e40af; font-weight: 600; font-size: 16px;">📞 Need Immediate Assistance?</p>
                <p style="margin: 0; color: #1e3a8a; font-size: 14px; line-height: 1.6;">
                  If you have any questions or need to modify your request, feel free to contact us at <a href="tel:+919949901238" style="color: #2563eb; text-decoration: none; font-weight: 600;">+91 9949901238</a> or reply to this email.
                </p>
              </div>

              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; margin-bottom: 20px; border-radius: 6px;">
                <p style="margin: 0 0 10px 0; color: #374151; font-weight: 600; font-size: 16px;">🌱 Why Choose S P Recycling?</p>
                <ul style="margin: 0; padding-left: 20px; color: #1f2937; font-size: 14px; line-height: 1.8;">
                  <li>Certified e-waste recycling and disposal</li>
                  <li>Environmentally responsible practices</li>
                  <li>Data security guaranteed</li>
                  <li>Compliance with all regulations</li>
                </ul>
              </div>

              <!-- Action Button -->
              <table role="presentation" style="width: 100%; margin-top: 30px;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://wa.me/+919949901238" style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">Contact Us on WhatsApp</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Thank you for choosing S P Recycling Pvt Ltd</p>
              <p style="margin: 0 0 10px 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">This is an automated confirmation email. Please do not reply to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generatePickupFormThankYouEmail(data: {
  fullName: string
  city: string
  date?: string
}): string {
  const formattedDate = data.date ? new Date(data.date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'Not specified'

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - E-Waste Pickup Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">✅ Thank You!</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px;">S P Recycling Pvt Ltd</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="background-color: #f0fdf4; border-left: 4px solid #10B981; padding: 20px; margin-bottom: 30px; border-radius: 6px;">
                <p style="margin: 0; color: #065f46; font-weight: 600; font-size: 18px;">Dear ${data.fullName},</p>
                <p style="margin: 10px 0 0 0; color: #047857; font-size: 16px; line-height: 1.6;">
                  Thank you for scheduling your e-waste pickup with S P Recycling! We've received your request for pickup in <strong>${data.city}</strong> and our team will contact you shortly to confirm the details.
                </p>
              </div>

              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Your Pickup Details</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px; background-color: #f9fafb; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Location:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.city}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Preferred Date:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${formattedDate}</span>
                  </td>
                </tr>
              </table>

              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">What Happens Next?</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                    <div style="display: flex; align-items: start; gap: 15px;">
                      <div style="background-color: #10B981; color: #ffffff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;">1</div>
                      <div>
                        <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">We'll Review Your Request</p>
                        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">Our team will review your pickup request and prepare for collection.</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                    <div style="display: flex; align-items: start; gap: 15px;">
                      <div style="background-color: #10B981; color: #ffffff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;">2</div>
                      <div>
                        <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">We'll Contact You</p>
                        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">You'll receive a call or message from us within 24 hours to confirm the pickup schedule.</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0;">
                    <div style="display: flex; align-items: start; gap: 15px;">
                      <div style="background-color: #10B981; color: #ffffff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;">3</div>
                      <div>
                        <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">We'll Collect Your E-Waste</p>
                        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">Our team will arrive at your location at the scheduled time to collect your items.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <div style="background-color: #eff6ff; border: 1px solid #3b82f6; padding: 20px; margin-bottom: 20px; border-radius: 6px;">
                <p style="margin: 0 0 10px 0; color: #1e40af; font-weight: 600; font-size: 16px;">📞 Need Immediate Assistance?</p>
                <p style="margin: 0; color: #1e3a8a; font-size: 14px; line-height: 1.6;">
                  If you have any questions or need to modify your request, feel free to contact us at <a href="tel:+919949901238" style="color: #2563eb; text-decoration: none; font-weight: 600;">+91 9949901238</a> or reply to this email.
                </p>
              </div>

              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; margin-bottom: 20px; border-radius: 6px;">
                <p style="margin: 0 0 10px 0; color: #374151; font-weight: 600; font-size: 16px;">🌱 Why Choose S P Recycling?</p>
                <ul style="margin: 0; padding-left: 20px; color: #1f2937; font-size: 14px; line-height: 1.8;">
                  <li>Certified e-waste recycling and disposal</li>
                  <li>Environmentally responsible practices</li>
                  <li>Data security guaranteed</li>
                  <li>Compliance with all regulations</li>
                </ul>
              </div>

              <!-- Action Button -->
              <table role="presentation" style="width: 100%; margin-top: 30px;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://wa.me/+919949901238" style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">Contact Us on WhatsApp</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Thank you for choosing S P Recycling Pvt Ltd</p>
              <p style="margin: 0 0 10px 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">This is an automated confirmation email. Please do not reply to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateContactFormEmail(data: {
  fullName: string
  companyName?: string
  email: string
  mobile: string
  city: string
  serviceType: string
  message?: string
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Inquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">New Contact Inquiry</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px;">S P Recycling Pvt Ltd</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin-bottom: 30px; border-radius: 6px;">
                <p style="margin: 0; color: #1e40af; font-weight: 600; font-size: 16px;">Service Type: ${data.serviceType}</p>
              </div>

              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Contact Information</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Full Name:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.fullName}</span>
                  </td>
                </tr>
                ${data.companyName ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Company:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.companyName}</span>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Email:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.email}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Mobile:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.mobile}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">City:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.city}</span>
                  </td>
                </tr>
              </table>

              ${data.message ? `
              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Message</h2>
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; margin-bottom: 20px; border-radius: 6px;">
                <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
              ` : ''}

              <!-- Action Button -->
              <table role="presentation" style="width: 100%; margin-top: 30px;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3); margin-right: 10px;">Reply via Email</a>
                    <a href="tel:${data.mobile}" style="display: inline-block; background: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">Call Customer</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">This is an automated email from S P Recycling Pvt Ltd</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateQuoteModalEmail(data: {
  name: string
  phone: string
  email: string
  items: string
  message?: string
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;"> New Quote Request</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px;">S P Recycling Pvt Ltd</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 30px; border-radius: 6px;">
                <p style="margin: 0; color: #92400e; font-weight: 600; font-size: 16px;">💼 Business Opportunity - Quote Request</p>
              </div>

              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Customer Information</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Name:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Phone:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.phone}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Email:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.email}</span>
                  </td>
                </tr>
              </table>

              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Items to Recycle</h2>
              
              <div style="background-color: #f0fdf4; border-left: 4px solid #10B981; padding: 20px; margin-bottom: 20px; border-radius: 6px;">
                <p style="margin: 0; color: #065f46; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.items}</p>
              </div>

              ${data.message ? `
              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Additional Details</h2>
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; margin-bottom: 20px; border-radius: 6px;">
                <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
              ` : ''}

              <!-- Action Button -->
              <table role="presentation" style="width: 100%; margin-top: 30px;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3); margin-right: 10px;">Send Quote</a>
                    <a href="tel:${data.phone}" style="display: inline-block; background: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">Call Customer</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">This is an automated email from S P Recycling Pvt Ltd</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateCityPickupRequestEmail(data: {
  fullName: string
  phone: string
  email: string
  itemType: string
  city: string
  address: string
  message?: string
}): string {
  const itemTypeLabels: { [key: string]: string } = {
    it: "IT Equipment",
    consumer: "Consumer Electronics",
    appliances: "Appliances",
    medical: "Medical Devices",
    other: "Other"
  }

  const formattedItemType = itemTypeLabels[data.itemType] || data.itemType
  const formattedCity = data.city.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>City Pickup Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">🔄 E-Waste Pickup Request</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px;">S P Recycling Pvt Ltd - ${formattedCity}</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="background-color: #f0fdf4; border-left: 4px solid #10B981; padding: 15px; margin-bottom: 30px; border-radius: 6px;">
                <p style="margin: 0; color: #065f46; font-weight: 600; font-size: 16px;">New Pickup Request from ${formattedCity}</p>
              </div>

              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Customer Information</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Full Name:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.fullName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Phone:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.phone}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Email:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.email}</span>
                  </td>
                </tr>
              </table>

              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Pickup Details</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Item Type:</strong>
                    <span style="color: #1f2937; font-size: 14px; font-weight: 600;">${formattedItemType}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">City:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${formattedCity}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Address:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.address}</span>
                  </td>
                </tr>
              </table>

              ${data.message ? `
              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Additional Message</h2>
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; margin-bottom: 20px; border-radius: 6px;">
                <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
              ` : ''}

              <!-- Action Button -->
              <table role="presentation" style="width: 100%; margin-top: 30px;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="tel:${data.phone}" style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">Contact Customer</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">This is an automated email from S P Recycling Pvt Ltd</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateCityPickupThankYouEmail(data: {
  fullName: string
  city: string
  itemType: string
}): string {
  const itemTypeLabels: { [key: string]: string } = {
    it: "IT Equipment",
    consumer: "Consumer Electronics",
    appliances: "Appliances",
    medical: "Medical Devices",
    other: "Other"
  }

  const formattedItemType = itemTypeLabels[data.itemType] || data.itemType
  const formattedCity = data.city.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - Pickup Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">✅ Thank You!</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px;">S P Recycling Pvt Ltd</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="background-color: #f0fdf4; border-left: 4px solid #10B981; padding: 20px; margin-bottom: 30px; border-radius: 6px;">
                <p style="margin: 0; color: #065f46; font-weight: 600; font-size: 18px;">Dear ${data.fullName},</p>
                <p style="margin: 10px 0 0 0; color: #047857; font-size: 16px; line-height: 1.6;">
                  Thank you for your e-waste pickup request in <strong>${formattedCity}</strong>! We've received your request for <strong>${formattedItemType}</strong> and our team will contact you shortly to confirm the pickup details.
                </p>
              </div>

              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">What Happens Next?</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                    <div style="display: flex; align-items: start; gap: 15px;">
                      <div style="background-color: #10B981; color: #ffffff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;">1</div>
                      <div>
                        <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">We'll Review Your Request</p>
                        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">Our team will review your pickup request and prepare for collection.</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                    <div style="display: flex; align-items: start; gap: 15px;">
                      <div style="background-color: #10B981; color: #ffffff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;">2</div>
                      <div>
                        <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">We'll Contact You</p>
                        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">You'll receive a call or message from us within 24 hours to confirm the pickup schedule.</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0;">
                    <div style="display: flex; align-items: start; gap: 15px;">
                      <div style="background-color: #10B981; color: #ffffff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; flex-shrink: 0;">3</div>
                      <div>
                        <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">We'll Collect Your E-Waste</p>
                        <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">Our team will arrive at your location at the scheduled time to collect your items.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <div style="background-color: #eff6ff; border: 1px solid #3b82f6; padding: 20px; margin-bottom: 20px; border-radius: 6px;">
                <p style="margin: 0 0 10px 0; color: #1e40af; font-weight: 600; font-size: 16px;">📞 Need Immediate Assistance?</p>
                <p style="margin: 0; color: #1e3a8a; font-size: 14px; line-height: 1.6;">
                  If you have any questions or need to modify your request, feel free to contact us at <a href="tel:+919949901238" style="color: #2563eb; text-decoration: none; font-weight: 600;">+91 9949901238</a> or reply to this email.
                </p>
              </div>

              <!-- Action Button -->
              <table role="presentation" style="width: 100%; margin-top: 30px;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://wa.me/+919949901238" style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">Contact Us on WhatsApp</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Thank you for choosing S P Recycling Pvt Ltd</p>
              <p style="margin: 0 0 10px 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">This is an automated confirmation email. Please do not reply to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateBrochureDownloadEmail(data: {
  name: string
  phone: string
  email: string
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Brochure Download Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;"> Brochure Download Request</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px;">S P Recycling Pvt Ltd</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 30px; border-radius: 6px;">
                <p style="margin: 0; color: #92400e; font-weight: 600; font-size: 16px;">📥 New Brochure Download Request</p>
                <p style="margin: 5px 0 0 0; color: #78350f; font-size: 14px;">A customer has requested to download our company brochure.</p>
              </div>

              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Customer Information</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Name:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Phone:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.phone}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Email:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.email}</span>
                  </td>
                </tr>
              </table>

              <div style="background-color: #f0fdf4; border: 1px solid #10B981; padding: 20px; margin-bottom: 20px; border-radius: 6px;">
                <p style="margin: 0 0 10px 0; color: #065f46; font-weight: 600; font-size: 14px;">📋 Next Steps:</p>
                <ul style="margin: 0; padding-left: 20px; color: #047857; font-size: 14px; line-height: 1.8;">
                  <li>Send the brochure PDF to the customer's email address</li>
                  <li>Follow up with additional information about our services</li>
                  <li>Add the customer to your CRM for future outreach</li>
                </ul>
              </div>

              <!-- Action Button -->
              <table role="presentation" style="width: 100%; margin-top: 30px;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3); margin-right: 10px;">Send Brochure</a>
                    <a href="tel:${data.phone}" style="display: inline-block; background: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">Call Customer</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">This is an automated email from S P Recycling Pvt Ltd</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateAdminLoginOtpEmail(data: {
  email: string
  otp: string
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login OTP</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">🔐 Admin Login Verification</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px;">S P Recycling Admin Panel</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="background-color: #ecfdf5; border-left: 4px solid #10B981; padding: 15px; margin-bottom: 30px; border-radius: 6px;">
                <p style="margin: 0; color: #065f46; font-weight: 600; font-size: 16px;">🔑 One-Time Password (OTP)</p>
              </div>

              <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Hi Admin,</p>

              <p style="color: #374151; font-size: 14px; line-height: 1.6; margin-bottom: 30px;">
                You requested to log in to the admin panel. Use the 6-digit code below to complete your login. This code will expire in 10 minutes.
              </p>

              <!-- OTP Box -->
              <div style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);">
                <p style="margin: 0 0 15px 0; color: #d1fae5; font-size: 14px; font-weight: 600;">Your Verification Code</p>
                <div style="background-color: rgba(255, 255, 255, 0.1); border: 2px dashed rgba(255, 255, 255, 0.3); padding: 20px; border-radius: 8px;">
                  <p style="margin: 0; color: #ffffff; font-size: 48px; font-weight: bold; letter-spacing: 8px; font-family: 'Courier New', monospace;">${data.otp}</p>
                </div>
                <p style="margin: 15px 0 0 0; color: #d1fae5; font-size: 12px;">Valid for 10 minutes</p>
              </div>

              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 30px; border-radius: 6px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;"><strong>Security Note:</strong> Never share this code with anyone.</p>
              </div>

              <p style="color: #6b7280; font-size: 12px; line-height: 1.6; margin-bottom: 20px;"><strong>Email:</strong> ${data.email}</p>

              <p style="color: #374151; font-size: 14px; line-height: 1.6;">If you didn't request this code, you can safely ignore this email. Your account is secure.</p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">This is an automated security email from S P Recycling Admin Panel</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateEWastePopupEmail(data: {
  name: string
  contactNumber: string
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>E-Waste Pickup Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">♻️ New E-Waste Pickup Request</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px;">S P Recycling Pvt Ltd</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <div style="background-color: #ecfdf5; border-left: 4px solid #10B981; padding: 15px; margin-bottom: 30px; border-radius: 6px;">
                <p style="margin: 0; color: #065f46; font-weight: 600; font-size: 16px;">🔄 Quick Pickup Request from Website Popup</p>
              </div>

              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Customer Information</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Name:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Contact Number:</strong>
                    <span style="color: #1f2937; font-size: 14px;">${data.contactNumber}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #374151; font-size: 14px; display: inline-block; width: 140px;">Source:</strong>
                    <span style="color: #1f2937; font-size: 14px;">Website Popup Form</span>
                  </td>
                </tr>
              </table>

              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px; border-radius: 6px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                  <strong>Note:</strong> This is a quick pickup request submitted through the website popup. Please contact the customer to collect additional details such as address, preferred pickup date, and e-waste items.
                </p>
              </div>

              <!-- Action Button -->
              <table role="presentation" style="width: 100%; margin-top: 30px;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="tel:${data.contactNumber}" style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">Call Customer</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">This is an automated email from S P Recycling Pvt Ltd</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateInstantPickupAdminEmail(data: {
  fullName: string
  phone: string
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Instant Pickup Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="500" style="max-width: 500px; width: 100%; background-color: #ffffff; border-radius: 8px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #10b981; padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; font-family: Arial, sans-serif;">Instant Pickup Request</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px; font-family: Arial, sans-serif;">S P Recycling Pvt Ltd</p>
            </td>
          </tr>
          
          <!-- Info Box -->
          <tr>
            <td style="padding: 30px 30px 20px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f0fdf4; border-left: 4px solid #10b981;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 0; color: #065f46; font-weight: 600; font-size: 16px; font-family: Arial, sans-serif;">New Instant Pickup Request Received</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="120" style="padding: 0;">
                          <strong style="color: #374151; font-size: 14px; font-family: Arial, sans-serif;">Name:</strong>
                        </td>
                        <td style="padding: 0;">
                          <span style="color: #1f2937; font-size: 16px; font-weight: 600; font-family: Arial, sans-serif;">${data.fullName}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="120" style="padding: 0;">
                          <strong style="color: #374151; font-size: 14px; font-family: Arial, sans-serif;">Phone:</strong>
                        </td>
                        <td style="padding: 0;">
                          <span style="color: #1f2937; font-size: 16px; font-weight: 600; font-family: Arial, sans-serif;">${data.phone}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Call Button -->
          <tr>
            <td align="center" style="padding: 0 30px 30px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background-color: #10b981; border-radius: 8px;">
                    <a href="tel:${data.phone}" style="display: inline-block; color: #ffffff; text-decoration: none; padding: 16px 40px; font-weight: 700; font-size: 18px; font-family: Arial, sans-serif;">Call ${data.phone}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; font-family: Arial, sans-serif;">This is an automated email from S P Recycling Pvt Ltd</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; font-family: Arial, sans-serif;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateStrongCTAEmail(data: {
  name: string
  company: string
  city: string
  phone: string
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Schedule Instant Pickup Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="500" style="max-width: 500px; width: 100%; background-color: #ffffff; border-radius: 8px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #10b981; padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; font-family: Arial, sans-serif;">Schedule Instant Pickup</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px; font-family: Arial, sans-serif;">S P Recycling Pvt Ltd</p>
            </td>
          </tr>
          
          <!-- Info Box -->
          <tr>
            <td style="padding: 30px 30px 20px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f0fdf4; border-left: 4px solid #10b981;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 0; color: #065f46; font-weight: 600; font-size: 16px; font-family: Arial, sans-serif;">New Instant Pickup Request Received</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="120" style="padding: 0;">
                          <strong style="color: #374151; font-size: 14px; font-family: Arial, sans-serif;">Name:</strong>
                        </td>
                        <td style="padding: 0;">
                          <span style="color: #1f2937; font-size: 16px; font-weight: 600; font-family: Arial, sans-serif;">${data.name}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="120" style="padding: 0;">
                          <strong style="color: #374151; font-size: 14px; font-family: Arial, sans-serif;">Company:</strong>
                        </td>
                        <td style="padding: 0;">
                          <span style="color: #1f2937; font-size: 16px; font-weight: 600; font-family: Arial, sans-serif;">${data.company}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="120" style="padding: 0;">
                          <strong style="color: #374151; font-size: 14px; font-family: Arial, sans-serif;">City:</strong>
                        </td>
                        <td style="padding: 0;">
                          <span style="color: #1f2937; font-size: 16px; font-weight: 600; font-family: Arial, sans-serif;">${data.city}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="120" style="padding: 0;">
                          <strong style="color: #374151; font-size: 14px; font-family: Arial, sans-serif;">Phone:</strong>
                        </td>
                        <td style="padding: 0;">
                          <span style="color: #1f2937; font-size: 16px; font-weight: 600; font-family: Arial, sans-serif;">${data.phone}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Call Button -->
          <tr>
            <td align="center" style="padding: 0 30px 30px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background-color: #10b981; border-radius: 8px;">
                    <a href="tel:${data.phone}" style="display: inline-block; color: #ffffff; text-decoration: none; padding: 16px 40px; font-weight: 700; font-size: 18px; font-family: Arial, sans-serif;">Call ${data.phone}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; font-family: Arial, sans-serif;">This is an automated email from S P Recycling Pvt Ltd</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; font-family: Arial, sans-serif;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateFinalLeadEmail(data: {
  fullName: string
  companyName: string
  workEmail: string
  phone: string
  industry: string
  service: string
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Secure Compliance Consultation Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #10b981; padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; font-family: Arial, sans-serif;">Secure Compliance Consultation</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px; font-family: Arial, sans-serif;">S P Recycling Pvt Ltd</p>
            </td>
          </tr>
          
          <!-- Info Box -->
          <tr>
            <td style="padding: 30px 30px 20px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f0fdf4; border-left: 4px solid #10b981;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 0; color: #065f46; font-weight: 600; font-size: 16px; font-family: Arial, sans-serif;">New Enterprise Consultation Request Received</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="140" style="padding: 0;">
                          <strong style="color: #374151; font-size: 14px; font-family: Arial, sans-serif;">Full Name:</strong>
                        </td>
                        <td style="padding: 0;">
                          <span style="color: #1f2937; font-size: 16px; font-weight: 600; font-family: Arial, sans-serif;">${data.fullName}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="140" style="padding: 0;">
                          <strong style="color: #374151; font-size: 14px; font-family: Arial, sans-serif;">Company Name:</strong>
                        </td>
                        <td style="padding: 0;">
                          <span style="color: #1f2937; font-size: 16px; font-weight: 600; font-family: Arial, sans-serif;">${data.companyName}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="140" style="padding: 0;">
                          <strong style="color: #374151; font-size: 14px; font-family: Arial, sans-serif;">Work Email:</strong>
                        </td>
                        <td style="padding: 0;">
                          <span style="color: #1f2937; font-size: 16px; font-weight: 600; font-family: Arial, sans-serif;">${data.workEmail}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="140" style="padding: 0;">
                          <strong style="color: #374151; font-size: 14px; font-family: Arial, sans-serif;">Phone:</strong>
                        </td>
                        <td style="padding: 0;">
                          <span style="color: #1f2937; font-size: 16px; font-weight: 600; font-family: Arial, sans-serif;">${data.phone}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="140" style="padding: 0;">
                          <strong style="color: #374151; font-size: 14px; font-family: Arial, sans-serif;">Industry:</strong>
                        </td>
                        <td style="padding: 0;">
                          <span style="color: #1f2937; font-size: 16px; font-weight: 600; font-family: Arial, sans-serif;">${data.industry}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="140" style="padding: 0;">
                          <strong style="color: #374151; font-size: 14px; font-family: Arial, sans-serif;">Service Required:</strong>
                        </td>
                        <td style="padding: 0;">
                          <span style="color: #1f2937; font-size: 16px; font-weight: 600; font-family: Arial, sans-serif;">${data.service}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Call Button -->
          <tr>
            <td align="center" style="padding: 0 30px 30px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background-color: #10b981; border-radius: 8px;">
                    <a href="tel:${data.phone}" style="display: inline-block; color: #ffffff; text-decoration: none; padding: 16px 40px; font-weight: 700; font-size: 18px; font-family: Arial, sans-serif;">Call ${data.phone}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; font-family: Arial, sans-serif;">This is an automated email from S P Recycling Pvt Ltd</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; font-family: Arial, sans-serif;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateFinalLeadThankYouEmail(data: {
  fullName: string
  companyName: string
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - Secure Compliance Consultation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="500" style="max-width: 500px; width: 100%; background-color: #ffffff; border-radius: 8px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #10b981; padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; font-family: Arial, sans-serif;">Thank You!</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px; font-family: Arial, sans-serif;">S P Recycling Pvt Ltd</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.6; font-family: Arial, sans-serif;">
                Dear ${data.fullName},
              </p>
              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.6; font-family: Arial, sans-serif;">
                Thank you for your interest in securing your compliance with S P Recycling! We have received your consultation request for <strong>${data.companyName}</strong> and our enterprise team will contact you shortly.
              </p>
              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.6; font-family: Arial, sans-serif;">
                We appreciate your commitment to responsible e-waste management and EPR compliance. Our team is ready to help you protect your brand and stay compliant.
              </p>
              <p style="margin: 0; color: #1f2937; font-size: 16px; line-height: 1.6; font-family: Arial, sans-serif;">
                Best regards,<br>
                <strong>S P Recycling Enterprise Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; font-family: Arial, sans-serif;">This is an automated email from S P Recycling Pvt Ltd</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; font-family: Arial, sans-serif;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateInstantPickupThankYouEmail(data: {
  fullName: string
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - Instant Pickup Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="500" style="max-width: 500px; width: 100%; background-color: #ffffff; border-radius: 8px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #10b981; padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; font-family: Arial, sans-serif;">Thank You!</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px; font-family: Arial, sans-serif;">S P Recycling Pvt Ltd</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.6; font-family: Arial, sans-serif;">
                Dear ${data.fullName},
              </p>
              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.6; font-family: Arial, sans-serif;">
                Thank you for your instant pickup request! We have received your information and our team will contact you shortly to schedule your e-waste pickup.
              </p>
              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.6; font-family: Arial, sans-serif;">
                We appreciate your commitment to responsible e-waste disposal and look forward to serving you.
              </p>
              <p style="margin: 0; color: #1f2937; font-size: 16px; line-height: 1.6; font-family: Arial, sans-serif;">
                Best regards,<br>
                <strong>S P Recycling Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; font-family: Arial, sans-serif;">This is an automated email from S P Recycling Pvt Ltd</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; font-family: Arial, sans-serif;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateAuditRequestEmail(data: {
  companyName: string
  industry: string
  companySize: string
  website: string
  fullName: string
  workEmail: string
  phoneNumber: string
  jobTitle: string
  deviceTypes: string[]
  estimatedQuantity: string
  locationForDestruction: string
  preferredServiceType: string
  complianceRequirements: string[]
  additionalNotes: string
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Professional Audit Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px;">
          <!-- Header -->
          <tr>
            <td style="background-color: #10b981; padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; font-family: Arial, sans-serif;">🔒 New Audit Request</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px; font-family: Arial, sans-serif;">Professional Secure Destruction Audit</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 600; font-family: Arial, sans-serif; border-bottom: 2px solid #10b981; padding-bottom: 10px;">Company Information</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px; font-family: Arial, sans-serif; width: 40%;"><strong>Company Name:</strong></td>
                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-family: Arial, sans-serif;">${data.companyName || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px; font-family: Arial, sans-serif;"><strong>Industry:</strong></td>
                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-family: Arial, sans-serif;">${data.industry || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px; font-family: Arial, sans-serif;"><strong>Company Size:</strong></td>
                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-family: Arial, sans-serif;">${data.companySize || 'N/A'}</td>
                </tr>
                ${data.website ? `
                <tr>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px; font-family: Arial, sans-serif;"><strong>Website:</strong></td>
                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-family: Arial, sans-serif;"><a href="${data.website}" style="color: #10b981; text-decoration: none;">${data.website}</a></td>
                </tr>
                ` : ''}
              </table>

              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 600; font-family: Arial, sans-serif; border-bottom: 2px solid #10b981; padding-bottom: 10px;">Contact Person</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px; font-family: Arial, sans-serif; width: 40%;"><strong>Full Name:</strong></td>
                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-family: Arial, sans-serif;">${data.fullName || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px; font-family: Arial, sans-serif;"><strong>Work Email:</strong></td>
                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-family: Arial, sans-serif;"><a href="mailto:${data.workEmail}" style="color: #10b981; text-decoration: none;">${data.workEmail || 'N/A'}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px; font-family: Arial, sans-serif;"><strong>Phone Number:</strong></td>
                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-family: Arial, sans-serif;"><a href="tel:${data.phoneNumber}" style="color: #10b981; text-decoration: none;">${data.phoneNumber || 'N/A'}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px; font-family: Arial, sans-serif;"><strong>Job Title:</strong></td>
                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-family: Arial, sans-serif;">${data.jobTitle || 'N/A'}</td>
                </tr>
              </table>

              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 600; font-family: Arial, sans-serif; border-bottom: 2px solid #10b981; padding-bottom: 10px;">Destruction Requirements</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px; font-family: Arial, sans-serif; width: 40%;"><strong>Device Types:</strong></td>
                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-family: Arial, sans-serif;">${data.deviceTypes && data.deviceTypes.length > 0 ? data.deviceTypes.join(', ') : 'None selected'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px; font-family: Arial, sans-serif;"><strong>Estimated Quantity:</strong></td>
                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-family: Arial, sans-serif;">${data.estimatedQuantity || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px; font-family: Arial, sans-serif;"><strong>Location:</strong></td>
                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-family: Arial, sans-serif;">${data.locationForDestruction || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #374151; font-size: 14px; font-family: Arial, sans-serif;"><strong>Service Type:</strong></td>
                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-family: Arial, sans-serif;">${data.preferredServiceType || 'N/A'}</td>
                </tr>
              </table>

              ${data.complianceRequirements && data.complianceRequirements.length > 0 ? `
              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 600; font-family: Arial, sans-serif; border-bottom: 2px solid #10b981; padding-bottom: 10px;">Compliance Requirements</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-family: Arial, sans-serif;">${data.complianceRequirements.join(', ')}</td>
                </tr>
              </table>
              ` : ''}

              ${data.additionalNotes ? `
              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 600; font-family: Arial, sans-serif; border-bottom: 2px solid #10b981; padding-bottom: 10px;">Additional Notes</h2>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-family: Arial, sans-serif; line-height: 1.6;">${data.additionalNotes.replace(/\n/g, '<br>')}</td>
                </tr>
              </table>
              ` : ''}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; font-family: Arial, sans-serif;">This is an automated email from S P Recycling Pvt Ltd</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; font-family: Arial, sans-serif;">© ${new Date().getFullYear()} S P Recycling. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}