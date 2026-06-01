# Brevo Email Integration Setup Guide

This guide will help you set up Brevo (formerly Sendinblue) email functionality for the S P Recycling web application.

## 📋 Prerequisites

1. A Brevo account (sign up at https://www.brevo.com/)
2. Node.js and npm installed
3. Access to your project's environment variables

## 🔧 Setup Steps

### 1. Create a Brevo Account

1. Go to https://www.brevo.com/
2. Sign up for a free account (free tier includes 300 emails/day)
3. Verify your email address

### 2. Get Your API Key

1. Log in to your Brevo account
2. Go to **Settings** → **SMTP & API** → **API Keys**
3. Click **Generate a new API key**
4. Give it a name (e.g., "S P Recycling Website")
5. Copy the API key (you'll only see it once, so save it securely!)

### 3. Verify Your Sender Email

1. Go to **Senders** in the Brevo dashboard
2. Click **Add a sender**
3. Enter your email address (e.g., `noreply@sprecycling.com`)
4. Fill in the required information:
   - **Email**: Your sender email
   - **Name**: S P Recycling (or your company name)
   - **Company**: S P Recycling Pvt Ltd
   - **Website**: Your business website URL
   - **How do you obtain email addresses?**: 
     ```
     Email addresses are voluntarily provided by customers through our website contact forms, pickup request forms, and quote request forms when they request our e-waste recycling services. All email collection is opt-in and transactional in nature.
     ```
5. Verify the email by clicking the verification link sent to that email address

### 4. Configure Environment Variables

Create a `.env.local` file in the root of your project (if it doesn't exist) and add the following:

```env
# Brevo Configuration
BREVO_API_KEY=your_brevo_api_key_here
# Optional (local dev only, if you see UNABLE_TO_VERIFY_LEAF_SIGNATURE on Windows):
# BREVO_TLS_SKIP_VERIFY=true
OWNER_EMAIL=siliconplanetrecycling@gmail.com
FROM_EMAIL=noreply@sprecycling.com
FROM_NAME=S P Recycling
```

**Important:**
- Replace `your_brevo_api_key_here` with your actual Brevo API Key
- `OWNER_EMAIL` is where all form inquiries will be sent
- `FROM_EMAIL` should be a verified sender email in Brevo
- `FROM_NAME` is the display name for sent emails

### 5. Install Dependencies

The Brevo package has already been installed. If you need to reinstall:

```bash
npm install @getbrevo/brevo
```

### 6. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Fill out any of the forms:
   - Pickup Form Modal
   - Quick Pickup Form
   - Contact Form
   - Quote Modal

3. Submit the form and check:
   - The form should show a success message
   - Check your `OWNER_EMAIL` inbox for the email
   - Check Brevo dashboard → **Statistics** → **Email** to see sent emails

## 📧 Email Templates

The application includes 4 beautifully designed email templates:

1. **Pickup Form Email** - For scheduled e-waste pickups
2. **Quick Pickup Email** - For quick pickup requests
3. **Contact Form Email** - For general inquiries
4. **Quote Modal Email** - For quote requests

All emails include:
- Professional HTML design
- Responsive layout
- Clear information display
- Action buttons (Call/Email customer)
- Company branding

## 🔍 Troubleshooting

### Emails Not Sending

1. **Check API Key**: Verify your API key is correct in `.env.local`
2. **Check Sender Verification**: Ensure your sender email is verified in Brevo
3. **Check Console**: Look for error messages in the browser console and server logs
4. **Check Brevo Dashboard**: Go to Brevo → Statistics → Email to see if emails are being sent
5. **Check Spam Folder**: Sometimes emails go to spam initially

### Common Errors

**Error: "Invalid API key"**
- Solution: Double-check your API key in `.env.local`
- Make sure there are no extra spaces or quotes

**Error: "Sender not verified"**
- Solution: Verify your sender email in Brevo dashboard → Senders

**Error: "Rate limit exceeded"**
- Solution: You've exceeded the free tier limit (300 emails/day). Upgrade your Brevo plan or wait for the limit to reset

**Error: "Invalid sender email"**
- Solution: The sender email must be verified in Brevo. Go to Senders and verify it.

**Error: `unrecognised IP address` / `authorised_ips`**
- Cause: Brevo **Authorized IPs** security is enabled and your current IP is not on the allowlist.
- **Fix (choose one):**
  1. Go to [Brevo → Security → Authorized IPs](https://app.brevo.com/security/authorised_ips) and add your current public IP (IPv4 and IPv6 if shown in the error).
  2. Or disable IP restriction for development (less secure; use only if you understand the risk).
- After updating Brevo, retry OTP — no code change required.

**Error: `UNABLE_TO_VERIFY_LEAF_SIGNATURE` or `unable to verify the first certificate` (common on Windows)**
- Cause: Local SSL inspection (antivirus, corporate proxy) or outdated Node CA certificates blocking HTTPS to `api.brevo.com`.
- **Local dev:** TLS verification is skipped automatically when `NODE_ENV` is not `production`.
- **Windows / proxy issues:** set `BREVO_TLS_SKIP_VERIFY=true` in `.env` and **do not** set `BREVO_TLS_STRICT=true` at the same time (strict mode forces verification back on).
- **To force strict TLS in dev** (only if certs work on your machine): set `BREVO_TLS_STRICT=true` and omit `BREVO_TLS_SKIP_VERIFY`.
- **Production:** TLS verification is always enforced. Do not deploy with certificate checks disabled.

### Testing Locally

If you want to test without sending actual emails, you can:

1. Check the API route logs in your terminal
2. Use Brevo's test mode (if available)
3. Temporarily log the email content instead of sending

## 📊 Monitoring

Monitor your email sending:

1. **Brevo Dashboard**: 
   - Go to Statistics → Email to see sent emails
   - Check delivery rates
   - Monitor bounce/spam rates
   - View email logs

2. **Application Logs**:
   - Check server console for API errors
   - Check browser console for client-side errors

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Keep your API keys secure
- Use environment variables for all sensitive data
- Regularly rotate your API keys
- Don't share your API keys publicly

## 📝 Form Types

The following forms send emails:

1. **Pickup Form Modal** (`type: 'pickup-form'`)
   - Location: Modal dialog
   - Fields: Full name, phone, email, address, city, date, waste types, quantity, notes

2. **Quick Pickup Form** (`type: 'quick-pickup'`)
   - Location: Page section
   - Fields: Name, phone, email, item type, address, date, time, photos

3. **Contact Form** (`type: 'contact-form'`)
   - Location: Contact page
   - Fields: Name, company, email, mobile, city, service type, message

4. **Quote Modal** (`type: 'quote-modal'`)
   - Location: Modal dialog
   - Fields: Name, phone, email, items, message

## 🎨 Customizing Email Templates

Email templates are located in `lib/email-templates.ts`. You can customize:

- Colors and styling
- Layout and structure
- Content and messaging
- Button styles
- Footer information

## 💡 Brevo Free Tier Limits

- **300 emails per day**
- **Unlimited contacts**
- **Email support**
- **Basic statistics**

If you need more, consider upgrading to a paid plan.

## 📞 Support

If you encounter issues:

1. Check Brevo documentation: https://developers.brevo.com/
2. Review Brevo status page: https://status.brevo.com/
3. Contact Brevo support through their dashboard
4. Check Brevo community forum: https://community.brevo.com/

## 🔄 Migration from Mailjet

If you were previously using Mailjet:

1. ✅ Brevo SDK is already installed
2. ✅ API route has been updated
3. ✅ Environment variables changed from `MJ_APIKEY_*` to `BREVO_API_KEY`
4. ⚠️ Update your `.env.local` file with Brevo credentials
5. ⚠️ Verify your sender email in Brevo dashboard

---

**Last Updated**: ${new Date().toLocaleDateString()}

