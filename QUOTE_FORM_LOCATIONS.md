# 📍 Quote Form Locations

## ✅ Your EmailJS Setup is Complete!

Your quote request form is now **fully configured and working** across your entire website.

### 🔑 Your Credentials
- **Service ID:** `service_8rutxkg`
- **Admin Template ID:** `template_z3hi3hj`
- **Customer Template ID:** `template_4pfa2ea`
- **Public Key:** `9U-BFk_8Du4GSjC2B`

---

## 📍 Where the Quote Form Appears

The quote form modal can be triggered from **4 different locations** on your website:

### 1. 🧭 **Navbar (All Pages)**
- **Location:** Top navigation bar
- **Button:** "Get a Quote" (visible on desktop)
- **Mobile:** Available in hamburger menu
- **Always visible:** Sticky navigation follows user

### 2. 🎨 **Hero Section (Homepage)**
- **Location:** Main hero banner at the top
- **Button:** "Get In Touch" 
- **Prominence:** Primary call-to-action on homepage

### 3. 💬 **WhatsApp ChatBot**
- **Location:** Floating button (bottom-right corner)
- **Trigger:** After selecting a service option
- **Options include:**
  - Custom Orders
  - Bulk Orders
  - Bridal Collection
  - Pricing & Fabrics
  - General Inquiry

### 4. 📱 **Direct Modal Trigger**
- **Component:** `QuoteModal` component
- **Global availability:** Can be triggered from anywhere in the app via `setIsQuoteModalOpen(true)`

---

## 🔄 How It Works

When a customer clicks "Get a Quote" from **any location**:

1. **QuoteModal opens** as a popup overlay
2. Customer fills in:
   - Full Name
   - Email Address
   - Phone Number (optional)
   - Enquiry Type (dropdown)
   - Requirements/Details
3. **On Submit:**
   - ✉️ **Admin Email** sent to your inbox with customer details
   - ✉️ **Customer Email** sent with confirmation message
   - ✅ Success message shown
   - 🔄 Modal closes after 3 seconds

---

## 📧 Email Flow

### Admin Notification Email
**Sent to:** Your admin email (configured in EmailJS)
**Contains:**
- Customer name
- Email address (reply-to enabled)
- Phone number
- Enquiry type
- Full message/requirements

### Customer Confirmation Email
**Sent to:** Customer's email
**Contains:**
- Personalized greeting
- Confirmation of enquiry type
- Expected response time (24 hours)
- Your contact information
- Professional RCI branding

---

## 🧪 Testing Your Setup

1. **Open your website** in a browser
2. **Click "Get a Quote"** from navbar or hero
3. **Fill the form** with your email address
4. **Submit**
5. **Check both inboxes:**
   - Admin inbox (your email)
   - Customer inbox (test email you used)

**Both emails should arrive within 1-2 minutes!**

---

## ✨ Benefits of This Setup

✅ **No Backend Required** - EmailJS handles everything  
✅ **2 Separate Templates** - Professional emails for admin & customer  
✅ **Accessible Everywhere** - Quote form available on all pages  
✅ **Automatic Confirmation** - Customers get instant acknowledgment  
✅ **Mobile-Friendly** - Works perfectly on all devices  
✅ **Professional Design** - Matches RCI brand aesthetic  

---

## 🛠️ Future Enhancements (Optional)

If you want to expand functionality:

1. **Add to Footer** - Add a "Request Quote" link in footer
2. **Add to Portfolio** - "Get Quote for This" buttons on portfolio items
3. **Add to Collections** - Quote buttons on specific collections
4. **Analytics Tracking** - Track form submissions with Google Analytics

---

## 📞 Support

If emails aren't working:
1. Check EmailJS dashboard logs
2. Verify all credentials match
3. Check spam folders
4. Ensure Gmail service is connected properly

**Setup Guide:** See `EMAILJS_COMPLETE_SETUP.md` for detailed instructions.

---

**🎉 Your quote request system is live and ready to capture leads!**
