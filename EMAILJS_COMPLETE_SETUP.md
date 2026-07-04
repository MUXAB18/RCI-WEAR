# 📧 EmailJS Setup Guide for Quote Form

## 🎯 What You'll Get

When someone submits a quote request on your website:
1. **YOU (Admin)** receive an email with quote details
2. **CUSTOMER** receives a confirmation email
3. Both happen automatically!

---

## 📋 Step-by-Step Setup

### STEP 1: Create EmailJS Account (2 minutes)

1. Visit: [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"**
3. Choose FREE plan (200 emails/month - enough to start)
4. Verify your email

---

### STEP 2: Add Email Service (3 minutes)

1. After login, go to **"Email Services"** in sidebar
2. Click **"Add New Service"**
3. Select **Gmail** (or your preferred email)
4. Click **"Connect Account"**
5. Sign in with your Gmail (the email where YOU want to receive notifications)
6. Allow permissions
7. **COPY the Service ID** → Save it! (looks like: `service_abc123xyz`)

---

### STEP 3: Create 2 Email Templates

You need 2 templates: one for admin notifications and one for customer confirmations.

#### 📝 Template 1: Quote Request - To Admin (YOU)

1. Go to **"Email Templates"** in sidebar
2. Click **"Create New Template"**
3. Fill in:

**Template Name:** `Quote Request Admin`

**"To Email"** field: **YOUR EMAIL** (e.g., `info@rciwear.com`)

**Subject Line:**
```
New Quote Request from {{from_name}}
```

**Email Body:**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #128C7E; color: white; padding: 20px; text-align: center; }
    .content { background: #f9f9f9; padding: 20px; margin-top: 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #128C7E; }
    .value { margin-top: 5px; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🎯 New Quote Request</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Customer Name:</div>
        <div class="value">{{from_name}}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value">{{reply_to}}</div>
      </div>
      <div class="field">
        <div class="label">Phone:</div>
        <div class="value">{{phone}}</div>
      </div>
      <div class="field">
        <div class="label">Enquiry Type:</div>
        <div class="value">{{enquiry_type}}</div>
      </div>
      <div class="field">
        <div class="label">Message:</div>
        <div class="value">{{message}}</div>
      </div>
    </div>
    <div class="footer">
      <p>Reply to customer at: {{reply_to}}</p>
      <p>RCI Wear Admin Notification</p>
    </div>
  </div>
</body>
</html>
```

4. Click **"Save"**
5. **COPY the Template ID** → Save it! (e.g., `template_abc123xyz`)

---

#### 📧 Template 2: Quote Request - To Customer

1. Click **"Create New Template"** again

**Template Name:** `Quote Request Customer`

**"To Email"** field: `{{to_email}}` (this will use customer's email)

**Subject Line:**
```
Thank you for your quote request - RCI Wear
```

**Email Body:**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #128C7E; color: white; padding: 30px; text-align: center; }
    .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
    .highlight { background: #f0f9ff; padding: 15px; margin: 20px 0; border-left: 4px solid #128C7E; }
    .footer { background: #f9f9f9; padding: 20px; text-align: center; color: #666; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✨ Rasheed Clothing International</h1>
      <p>Thank You for Your Interest!</p>
    </div>
    <div class="content">
      <p>Dear <strong>{{from_name}}</strong>,</p>
      
      <p>Thank you for submitting a quote request with RCI Wear!</p>
      
      <div class="highlight">
        <p><strong>We have received your request for:</strong></p>
        <p>{{enquiry_type}}</p>
      </div>
      
      <p>Our team is reviewing your requirements and will get back to you within <strong>24 hours</strong> with a detailed proposal.</p>
      
      <p><strong>Your Message:</strong><br>
      {{message}}</p>
      
      <p>If you have any urgent questions, feel free to contact us directly:</p>
      <ul>
        <li>📞 Phone: +92 349 6014611</li>
        <li>📧 Email: info@rciwear.com</li>
        <li>💬 WhatsApp: +92 349 6014611</li>
      </ul>
    </div>
    <div class="footer">
      <p><strong>Rasheed Clothing International</strong></p>
      <p>Premium Custom Clothing Since 2017</p>
      <p>Sialkot, Pakistan</p>
    </div>
  </div>
</body>
</html>
```

2. Click **"Save"**
3. **COPY this Template ID** → Save it! (e.g., `template_xyz789abc`)

---

### STEP 4: Get Your Public Key

1. Go to **"Account"** in sidebar
2. Find **"Public Key"** section
3. **COPY the Public Key** → Save it! (e.g., `abcXYZ123456789`)

---

### STEP 5: Update Your Code

Now you should have:
- ✅ 1 Service ID
- ✅ 2 Template IDs (Admin + Customer)
- ✅ 1 Public Key

Open **`src/components/QuoteModal.jsx`** and replace these lines (around line 32-35):

**BEFORE:**
```javascript
const serviceId = 'YOUR_SERVICE_ID'
const adminTemplateId = 'YOUR_ADMIN_TEMPLATE_ID' // Template for admin notification
const customerTemplateId = 'YOUR_CUSTOMER_TEMPLATE_ID' // Template for customer confirmation
const publicKey = 'YOUR_PUBLIC_KEY'
```

**AFTER:** (with your actual credentials)
```javascript
const serviceId = 'service_abc123xyz' // Your Service ID
const adminTemplateId = 'template_abc123xyz' // Your Admin Template ID
const customerTemplateId = 'template_xyz789abc' // Your Customer Template ID
const publicKey = 'abcXYZ123456789' // Your Public Key
```

---

## ✅ Testing

1. Save your changes
2. Go to your website
3. Click "Get a Quote" button (appears in Navbar and Hero section)
4. Fill in the form with your email
5. Click "Submit Request"

**You should receive:**
- ✉️ Admin email (to your inbox with customer details)
- ✉️ Customer email (to the email you entered in the form)

---

## 📍 Where Quote Form is Available

The quote form is available in multiple locations:

1. **Navbar** - "Get a Quote" button (visible on all pages)
2. **Hero Section** - "Get a Quote" button (homepage)
3. **WhatsApp ChatBot** - Users can click to open quote form
4. **Website Modal** - Opens as a popup overlay

All these buttons trigger the same `QuoteModal` component, so your EmailJS setup works everywhere!

---

## 🔧 Troubleshooting

### Emails not sending?

1. **Check EmailJS Dashboard:**
   - Go to "Logs" section
   - See if emails are listed
   - Check for errors

2. **Common Issues:**
   - Wrong Template ID (double-check you copied correctly)
   - Wrong Service ID
   - Wrong Public Key
   - Email service not connected properly
   - Check browser console for error messages

3. **Gmail Issues:**
   - Make sure you granted all permissions
   - Try disconnecting and reconnecting the service
   - Check if Gmail is blocking less secure apps

### Customer not receiving email?

1. Verify template has `{{to_email}}` in "To Email" field
2. Check customer's spam/junk folder
3. Verify customer email address is valid
4. Check EmailJS logs to see if email was sent

### Admin not receiving email?

1. Verify your email is in the "To Email" field (not a variable)
2. Check your spam/junk folder
3. Verify EmailJS service is connected to correct Gmail account

---

## 💡 Tips

1. **Test with your own email first** - Use your email as both sender and customer
2. **Customize email templates** - Add your logo, colors, and branding
3. **Monitor usage** - Check EmailJS dashboard regularly
4. **Check spam folders** - Especially during initial testing
5. **Keep credentials safe** - Don't share your Public Key publicly

---

## 📊 Email Limits

**Free Plan:**
- 200 emails/month (100 admin + 100 customer confirmations)
- 2 email services
- Unlimited templates
- Perfect for small businesses

**Paid Plans:**
- Start at $9/month for 1,000 emails
- More email services
- Priority support

---

## 🎉 You're All Set!

Your quote request system is now fully configured:
- ✅ Professional quote form modal
- ✅ Automatic admin notifications
- ✅ Automatic customer confirmations
- ✅ Works everywhere on your website
- ✅ No backend server needed!

**Questions? Check EmailJS documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)**

---

## 📝 Variables Used in Templates

Make sure these variables are in your EmailJS templates:

**Admin Template Variables:**
- `{{from_name}}` - Customer's name
- `{{reply_to}}` - Customer's email
- `{{phone}}` - Customer's phone
- `{{enquiry_type}}` - Type of enquiry
- `{{message}}` - Customer's message

**Customer Template Variables:**
- `{{to_email}}` - Customer's email (in "To Email" field)
- `{{from_name}}` - Customer's name
- `{{enquiry_type}}` - Type of enquiry
- `{{message}}` - Their original message
