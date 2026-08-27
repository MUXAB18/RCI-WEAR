# ✅ Create Admin User - Quick Guide

## 🎯 Your Admin Credentials

- **Email:** `rasheedclothingintl@gmail.com`
- **Password:** `rci@2026`

---

## 🚀 Method 1: Manual Creation (RECOMMENDED - 2 Minutes)

This is the fastest and easiest way:

### Step-by-Step:

1. **Click this link to open Supabase Users page:**
   ```
   https://supabase.com/dashboard/project/yjsmczrdrnafrvsqfafw/auth/users
   ```

2. **Click the "Add User" button** (green button, top right)

3. **Fill in the form:**
   ```
   Email: rasheedclothingintl@gmail.com
   Password: rci@2026
   ```

4. **Important:** ✅ **CHECK** the "Auto Confirm User" checkbox

5. **Click "Create User"**

6. **Done!** Test login at:
   - Local: http://localhost:3001/admin/login
   - Production: https://rasheedclothingintl.me/admin/login

---

## 🔧 Method 2: Automated Script (Requires Service Key)

If you prefer automation:

### Step A: Get Your Service Role Key

1. **Go to API Settings:**
   ```
   https://supabase.com/dashboard/project/yjsmczrdrnafrvsqfafw/settings/api
   ```

2. **Find "Project API keys" section**

3. **Copy the `service_role` key** (the long one starting with `eyJ...`)
   - ⚠️ **NOT** the `anon` key
   - ⚠️ **NOT** the `anon public` key
   - ✅ **YES** the `service_role secret` key

### Step B: Update Environment File

Open `.env.local` and find this line:
```env
SUPABASE_SERVICE_ROLE_KEY="[SENSITIVE]"
```

Replace it with your actual key:
```env
SUPABASE_SERVICE_ROLE_KEY="eyJhbGci...paste_your_actual_key_here..."
```

### Step C: Run the Script

```bash
npm run setup-admin
```

---

## 🎉 After Creation

Once the user is created, you can login:

### Local Development:
```
http://localhost:3001/admin/login
```

### Production:
```
https://rasheedclothingintl.me/admin/login
```

### Credentials:
- Email: `rasheedclothingintl@gmail.com`
- Password: `rci@2026`

---

## 🔍 Verify User Exists

To check if the user was created successfully:

1. Go to: https://supabase.com/dashboard/project/yjsmczrdrnafrvsqfafw/auth/users
2. Look for `rasheedclothingintl@gmail.com` in the list
3. Make sure "Email Confirmed" shows ✅

---

## 🐛 Troubleshooting

### "Invalid login credentials" error
- User not created yet → Follow Method 1 above
- Email not confirmed → Re-create with "Auto Confirm" checked
- Wrong password → Check Caps Lock is off

### Can't access Supabase Dashboard
- Make sure you're logged into Supabase
- Check you have access to project: `yjsmczrdrnafrvsqfafw`

### Script fails with "Invalid API key"
- The service role key in .env.local is still `[SENSITIVE]`
- Follow Method 1 (manual creation) instead

---

## 💡 Recommendation

**Use Method 1 (Manual Creation)** - it's faster, simpler, and doesn't require finding API keys!

**Total time:** Less than 2 minutes ⏱️

---

**Need help?** Let me know which method you chose and any issues you encounter.
