# 📧 Email Setup Guide - RCI Wear

## 🎯 Overview

Your website already has EmailJS integrated in both:
- ✅ **Quote Modal** (`QuoteModal.jsx`)
- ✅ **Contact Modal** (`ContactModal.jsx`)

You need to configure EmailJS to send emails to:
1. **Admin** (You) - Notification when someone submits a form
2. **Customer** - Confirmation email that you received their request

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (Free - 200 emails/month)
3. Verify your email address

---

### Step 2: Connect Your Email Service

1. In EmailJS Dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (Recommended for personal)
   - **Outlook** (Microsoft)
   - **Yahoo**
   - Or any other SMTP service

4. **For Gmail:**
   - Click "Connect Account"
   - Sign in with your Gmail
   - Grant permissions
   - Service will be created automatically

5. **Copy the Service ID** (looks like `service_xxxxxx`)

---

### Step 3: Create Email Templates

You need **2 templates** for each form (4 total):

#### Template 1: Admin Notification (Quote Request)

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Template Name: `Quote Request - Admin Notification`
4. Use this template:

```
Subject: New Quote Request from {{from_name}}

From: {{from_name}}
Email: {{reply_to}}
Phone: {{phone}}
Enquiry Type: {{enquiry_type}}

Message:
{{message}}

---
Reply to customer: {{reply_to}}
```

5. **Copy the Template ID** (looks like `template_xxxxxx`)

---

#### Template 2: Customer Confirmation (Quote Request)

1. Create another template
2. Template Name: `Quote Request - Customer Confirmation`
3. Use this template:

```
Subject: Thank you for your quote request - RCI Wear

Dear {{from_name}},

Thank you for contacting Rasheed Clothing International!

We have received your quote request for: {{enquiry_type}}

Our team will review your requirements and get back to you within 24 hours.

Your Message:
{{message}}

---
Best regards,
RCI Wear Team
Rasheed Clothing International
Phone: +92 349 6014611
Email: info@rciwear.com
Website: www.rciwear.com
```

4. **Copy this Template ID** too

---

#### Template 3: Admin Notification (Contact Form)

1. Create another template
2. Template Name: `Contact Form - Admin Notification`
3. Use this template:

```
Subject: New Contact Message from {{from_name}}

From: {{from_name}}
Email: {{reply_to}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

---
Reply to customer: {{reply_to}}
```

4. **Copy the Template ID**

---

#### Template 4: Customer Confirmation (Contact Form)

1. Create another template
2. Template Name: `Contact Form - Customer Confirmation`
3. Use this template:

```
Subject: We received your message - RCI Wear

Dear {{from_name}},

Thank you for reaching out to Rasheed Clothing International!

We have received your message regarding: {{subject}}

Our team will respond to your inquiry as soon as possible, typically within 24 hours.

Your Message:
{{message}}

---
Best regards,
RCI Wear Team
Rasheed Clothing International
Phone: +92 349 6014611
Email: info@rciwear.com
Website: www.rciwear.com
```

4. **Copy this Template ID**

---

### Step 4: Get Your Public Key

1. In EmailJS Dashboard, go to **"Account"**
2. Find **"Public Key"** (looks like `xxxxxxxxxxxxxx`)
3. Copy it

---

### Step 5: Update Your Code

Now you have:
- ✅ Service ID
- ✅ Template IDs (4 templates)
- ✅ Public Key

I'll create updated versions of both modals with dual email support (admin + customer).

---

## 📝 Implementation

### Updated QuoteModal.jsx (With Dual Emails)

