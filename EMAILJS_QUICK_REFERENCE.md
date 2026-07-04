# 📧 EmailJS Quick Reference

## 🔑 Your Credentials

```javascript
Service ID:           service_8rutxkg
Admin Template:       template_z3hi3hj
Customer Template:    template_4pfa2ea
Public Key:           9U-BFk_8Du4GSjC2B
```

---

## 📝 Template Variables Reference

### Admin Template (`template_z3hi3hj`)

**Required Variables in EmailJS Template:**

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Customer's name | "Ahmed Khan" |
| `{{reply_to}}` | Customer's email | "ahmed@example.com" |
| `{{phone}}` | Customer's phone | "+92 300 000 0000" |
| `{{enquiry_type}}` | Type of enquiry | "Custom Order" |
| `{{message}}` | Customer's message | "I need 50 custom hoodies..." |

**"To Email" field:** Your admin email (hardcoded in template)

---

### Customer Template (`template_4pfa2ea`)

**Required Variables in EmailJS Template:**

| Variable | Description | Example |
|----------|-------------|---------|
| `{{to_email}}` | Customer's email | "customer@example.com" |
| `{{from_name}}` | Customer's name | "Ahmed Khan" |
| `{{enquiry_type}}` | Type of enquiry | "Custom Order" |
| `{{message}}` | Their original message | "I need 50 custom hoodies..." |

**"To Email" field:** `{{to_email}}` (dynamic, uses customer's email)

---

## 🔄 Email Flow Diagram

```
Customer Submits Form
         ↓
    QuoteModal.jsx
         ↓
    ┌─────────────────┐
    │   EmailJS SDK   │
    └─────────────────┘
         ↓
    ┌─────────────────────────────────┐
    │  Send to Admin Template         │
    │  (template_z3hi3hj)             │
    │  → Your admin inbox             │
    └─────────────────────────────────┘
         ↓
    ┌─────────────────────────────────┐
    │  Send to Customer Template      │
    │  (template_4pfa2ea)             │
    │  → Customer's inbox             │
    └─────────────────────────────────┘
         ↓
    Success Message Shown
```

---

## 📱 Form Locations

| Location | Component | Trigger |
|----------|-----------|---------|
| Navbar | `Navbar.jsx` | "Get a Quote" button |
| Hero Section | `Hero.jsx` | "Get In Touch" button |
| WhatsApp Bot | `WhatsAppChatBot.jsx` | Service selection → WhatsApp link |
| Mobile Menu | `Navbar.jsx` | "Get a Quote" in hamburger menu |

---

## 🧪 Quick Test

**Step 1:** Open your website  
**Step 2:** Click "Get a Quote"  
**Step 3:** Fill form with YOUR email  
**Step 4:** Submit  

**Expected Results:**
- ✅ Success message appears
- ✅ Admin email arrives in your inbox
- ✅ Customer confirmation arrives in your inbox (since you used your email)
- ⏱️ Both emails arrive within 1-2 minutes

---

## 🔍 Debugging Checklist

If emails aren't sending:

- [ ] Check EmailJS dashboard → "Logs" section
- [ ] Verify Service ID: `service_8rutxkg`
- [ ] Verify Admin Template ID: `template_z3hi3hj`
- [ ] Verify Customer Template ID: `template_4pfa2ea`
- [ ] Verify Public Key: `9U-BFk_8Du4GSjC2B`
- [ ] Check browser console for errors
- [ ] Verify Gmail service is connected in EmailJS
- [ ] Check spam/junk folders
- [ ] Ensure template variables match exactly (case-sensitive)
- [ ] Verify "To Email" field in templates is correct

---

## 📊 EmailJS Free Plan Limits

- **200 emails/month** (100 admin + 100 customer confirmations)
- **2 email services**
- **Unlimited templates**
- **No credit card required**

---

## 🔗 Useful Links

- **EmailJS Dashboard:** https://dashboard.emailjs.com/
- **EmailJS Logs:** https://dashboard.emailjs.com/admin/logs
- **EmailJS Templates:** https://dashboard.emailjs.com/admin/templates
- **EmailJS Documentation:** https://www.emailjs.com/docs/

---

## 💡 Pro Tips

1. **Test regularly** - Send a test quote every few days to ensure it's working
2. **Monitor your inbox** - Don't miss customer enquiries!
3. **Check spam folders** - EmailJS emails can sometimes go to spam initially
4. **Customize templates** - Add your logo and brand colors in EmailJS dashboard
5. **Track usage** - Monitor email usage in EmailJS dashboard to avoid hitting limits
6. **Set up email filters** - Create filters to automatically label/organize quote emails

---

## ✅ Setup Status

- [x] EmailJS account created
- [x] Gmail service connected
- [x] Admin template created
- [x] Customer template created
- [x] Credentials added to QuoteModal.jsx
- [x] @emailjs/browser package installed
- [x] Quote form available on website
- [x] Ready to receive enquiries!

---

**🎉 Your EmailJS integration is complete and ready to use!**
