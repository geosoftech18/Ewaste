# ⚠️ DEPRECATED: Mailjet Email Integration Setup Guide

**This guide is deprecated. The application now uses Brevo instead of Mailjet.**

**Please refer to `BREVO_SETUP.md` for the current setup instructions.**

---

# Mailjet Email Integration Setup Guide (OLD)

This guide will help you set up Mailjet email functionality for the S P Recycling web application.

## 📋 Prerequisites

1. A Mailjet account (sign up at https://www.mailjet.com/)
2. Node.js and npm installed
3. Access to your project's environment variables

## 🔧 Setup Steps

### 1. Create a Mailjet Account

1. Go to https://www.mailjet.com/
2. Sign up for a free account (free tier includes 6,000 emails/month)
3. Verify your email address

### 2. Get Your API Keys

1. Log in to your Mailjet account
2. Go to **Account Settings** → **API Keys**
3. You'll see two keys:
   - **API Key** (Public Key)
   - **Secret Key** (Private Key)
4. Copy both keys

### 3. Configure Environment Variables

Create a `.env.local` file in the root of your project (if it doesn't exist) and add the following:

```env
# Mailjet Configuration
MJ_APIKEY_PUBLIC=your_mailjet_api_key_public
MJ_APIKEY_PRIVATE=your_mailjet_secret_key
OWNER_EMAIL=siliconplanetrecycling@gmail.com
FROM_EMAIL=noreply@sprecycling.com
FROM_NAME=S P Recycling
```

**Important:**
- Replace `your_mailjet_api_key_public` with your actual Mailjet API Key
- Replace `your_mailjet_secret_key` with your actual Mailjet Secret Key
- `OWNER_EMAIL` is where all form inquiries will be sent
- `FROM_EMAIL` should be a verified sender email in Mailjet
- `FROM_NAME` is the display name for sent emails

### 4. Verify Sender Email in Mailjet

1. Go to **Senders & Domains** in Mailjet dashboard
2. Click **Add Sender**
3. Enter the email address you want to use (e.g., `noreply@sprecycling.com`)
4. Verify the email address by clicking the verification link sent to that email

### 5. Install Dependencies

The Mailjet package has already been installed. If you need to reinstall:

```bash
npm install node-mailjet
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
   - Check Mailjet dashboard → **Statistics** to see sent emails

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

1. **Check API Keys**: Verify your API keys are correct in `.env.local`
2. **Check Sender Verification**: Ensure your sender email is verified in Mailjet
3. **Check Console**: Look for error messages in the browser console and server logs
4. **Check Mailjet Dashboard**: Go to Mailjet → Statistics to see if emails are being sent
5. **Check Spam Folder**: Sometimes emails go to spam initially

### Common Errors

**Error: "Invalid API key"**
- Solution: Double-check your API keys in `.env.local`

**Error: "Sender not verified"**
- Solution: Verify your sender email in Mailjet dashboard

**Error: "Rate limit exceeded"**
- Solution: You've exceeded the free tier limit. Upgrade your Mailjet plan or wait for the limit to reset

### Testing Locally

If you want to test without sending actual emails, you can:

1. Check the API route logs in your terminal
2. Use Mailjet's sandbox mode (if available)
3. Temporarily log the email content instead of sending

## 📊 Monitoring

Monitor your email sending:

1. **Mailjet Dashboard**: 
   - Go to Statistics to see sent emails
   - Check delivery rates
   - Monitor bounce/spam rates

2. **Application Logs**:
   - Check server console for API errors
   - Check browser console for client-side errors

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Keep your API keys secure
- Use environment variables for all sensitive data
- Regularly rotate your API keys

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

## 📞 Support

If you encounter issues:

1. Check Mailjet documentation: https://dev.mailjet.com/
2. Review Mailjet status page: https://status.mailjet.com/
3. Contact Mailjet support through their dashboard

---

**Last Updated**: ${new Date().toLocaleDateString()}

