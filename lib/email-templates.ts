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
