# Forms Summary - S P Recycling Web App

This document lists all the different forms found in the web application.

## Total Forms: **7 Different Forms**

---

## 1. **Pickup Form Modal** 
**File:** `components/pickup-form-modal.tsx`
- **Type:** Multi-step modal form (3 steps)
- **Purpose:** Schedule e-waste pickup
- **Fields:**
  - Step 1: Full Name*, Phone*, Alternate Phone, Email
  - Step 2: Pickup Address*, City*, Preferred Pickup Date*
  - Step 3: Waste Types (multi-select), Quantity, Additional Notes, Terms Agreement*
- **Features:**
  - Progress indicator
  - Step-by-step validation
  - Success message with WhatsApp integration
  - Date picker validation

---

## 2. **Quick Pickup Form**
**File:** `components/quick-pickup-form.tsx`
- **Type:** Single-page form with progress tracking
- **Purpose:** Quick e-waste pickup request
- **Fields:**
  - Full Name*
  - Phone Number* (+91 format)
  - Email (optional)
  - Item Type* (dropdown)
  - Preferred Date*
  - Preferred Time*
  - Brief Address*
  - Upload Photos (optional, max 5 files, 5MB each)
- **Features:**
  - Real-time form progress indicator
  - Drag & drop file upload
  - Field validation with visual feedback
  - WhatsApp integration button
  - Success/error animations

---

## 3. **Contact Form**
**File:** `components/contact/contact-form.tsx`
- **Type:** Two-step form
- **Purpose:** General contact/inquiry
- **Fields:**
  - Step 1: Full Name*, Company Name, Email*, Mobile*
  - Step 2: City*, Service Type*, Message, Terms Agreement*
- **Features:**
  - Step navigation with progress indicator
  - Service type selection (Pickup Request, Bulk Disposal, Corporate Partnership, General Inquiry)
  - Success animation
  - Auto-reset after submission

---

## 4. **Quote Form (Service Page)**
**File:** `components/service/QuoteForm.tsx`
- **Type:** Single-page form with contact info sidebar
- **Purpose:** Request quote for services
- **Fields:**
  - Full Name*
  - Phone Number*
  - Email Address*
  - Type of E-Waste* (dropdown)
  - Message
- **Features:**
  - Contact information display (phone, email, WhatsApp)
  - Google Maps embed
  - Dark gradient background
  - Side-by-side layout (form + contact info)

---

## 5. **Quote Modal (Services Page)**
**File:** `components/services/quote-modal.tsx`
- **Type:** Modal dialog form
- **Purpose:** Quick quote request from services listing
- **Fields:**
  - Full Name*
  - Phone Number*
  - Email Address
  - Items to Recycle*
  - Additional Details
  - Upload photos (optional, UI only)
- **Features:**
  - Modal dialog interface
  - File upload placeholder (UI)
  - Simple, focused design

---

## 6. **Request Pickup (City Page)**
**File:** `components/city/request-pickup.tsx`
- **Type:** Single-page form with contact info
- **Purpose:** City-specific pickup request
- **Fields:**
  - Full Name*
  - Phone Number*
  - Email Address*
  - What to Recycle?* (dropdown)
  - City* (dropdown, pre-filled)
  - Your Address*
  - Message (optional)
- **Features:**
  - City-specific (dynamic city name)
  - Contact information display
  - Card-based layout

---

## 7. **Impact Calculator Form**
**File:** `components/city/impact-calculator.tsx`
- **Type:** Interactive calculator with form submission
- **Purpose:** Calculate environmental impact and schedule pickup
- **Fields:**
  - Equipment Categories (carousel selection with quantities):
    - IT & Telecommunication
    - Consumer Electrical
    - Large Electrical Equipment
    - Small Electrical Equipment
    - Printer Recycle
    - Medical Devices
    - Data Destruction
  - Full Name*
  - Email Address*
  - Phone Number*
  - City*
  - Address*
  - ZIP Code*
- **Features:**
  - Real-time impact calculation (CO₂, Energy, Water, Materials)
  - Carousel navigation for equipment categories
  - Visual impact metrics display
  - Conditional form display (only shows when equipment selected)
  - API integration ready

---

## 8. **Newsletter Subscription Form**
**File:** `components/contact/newsletter-section.tsx`
- **Type:** Simple email subscription
- **Purpose:** Newsletter signup
- **Fields:**
  - Email Address*
- **Features:**
  - Single field form
  - Success animation
  - Gradient background design

---

## Form Comparison Summary

| Form Name | Location | Steps | Primary Purpose | Key Features |
|-----------|----------|-------|----------------|--------------|
| Pickup Form Modal | Modal | 3 | Schedule pickup | Multi-step, waste type selection |
| Quick Pickup Form | Page section | 1 | Quick pickup | File upload, progress tracking |
| Contact Form | Contact page | 2 | General inquiry | Service type selection |
| Quote Form (Service) | Service page | 1 | Get quote | Contact info sidebar, map |
| Quote Modal | Services page | 1 | Quick quote | Modal dialog |
| Request Pickup (City) | City page | 1 | City pickup | City-specific |
| Impact Calculator | City page | 1 | Calculate & pickup | Impact metrics, equipment carousel |
| Newsletter | Contact page | 1 | Subscribe | Email only |

---

## Common Form Fields Across All Forms

### Most Common Fields:
1. **Full Name** - Required in 7/8 forms
2. **Phone Number** - Required in 7/8 forms
3. **Email Address** - Required in 6/8 forms (optional in 2)
4. **Address** - Required in 4/8 forms
5. **City** - Required in 4/8 forms

### Unique Features:
- **File Upload**: Quick Pickup Form, Quote Modal
- **Date/Time Selection**: Pickup Form Modal, Quick Pickup Form
- **Multi-select Waste Types**: Pickup Form Modal
- **Impact Calculation**: Impact Calculator
- **Equipment Quantity Input**: Impact Calculator
- **Service Type Selection**: Contact Form
- **Waste Type Dropdown**: Quote Form, Request Pickup

---

## Form Validation Patterns

- **Phone**: 10-digit validation (with/without +91 prefix)
- **Email**: Standard email regex validation
- **Date**: Future date validation (no past dates)
- **File Upload**: Size limits (5MB), type restrictions (images only)
- **Required Fields**: Marked with asterisk (*)

---

## Form Submission States

All forms include:
- Loading states during submission
- Success messages/animations
- Error handling and validation
- Form reset after successful submission

