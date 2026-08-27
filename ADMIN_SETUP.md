# Admin User Setup Guide

This guide explains how to set up the admin user for the RCI-WEAR admin panel.

## Admin Credentials

- **Email:** `rasheedclothingintl@gmail.com`
- **Password:** `rci@2026`

## Admin Panel URLs

- **Local Development:** http://localhost:3001/admin/login
- **Production:** https://rasheedclothingintl.me/admin/login

---

## Setup Methods

### Method 1: Supabase Dashboard (Recommended)

This is the easiest and most reliable method:

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Select your project: `yjsmczrdrnafrvsqfafw`

2. **Navigate to Authentication**
   - Click "Authentication" in the left sidebar
   - Click "Users" tab

3. **Add New User**
   - Click the "Add User" button
   - Fill in the form:
     ```
     Email: rasheedclothingintl@gmail.com
     Password: rci@2026
     ```
   - ✅ Check "Auto Confirm User" (important!)
   - Click "Create User"

4. **Test Login**
   - Go to http://localhost:3001/admin/login
   - Enter the credentials
   - You should be redirected to `/admin`

---

### Method 2: Automated Script

If you prefer automation, use the provided script:

1. **Ensure Service Role Key is Set**
   
   Open `.env.local` and verify `SUPABASE_SERVICE_ROLE_KEY` is set with the actual key value (not `[SENSITIVE]`).

2. **Run Setup Script**
   ```bash
   npm run setup-admin
   ```

3. **Verify Success**
   - Look for "✅ Admin user created successfully!"
   - Test login at the admin panel

---

### Method 3: Supabase SQL Editor

If you need to use SQL directly:

1. **Go to SQL Editor** in Supabase Dashboard

2. **Run this query** (Note: This won't work as auth.users is managed by Supabase Auth API):
   ```sql
   -- This is for reference only - Use Dashboard method instead
   -- Auth users must be created through Supabase Auth API
   ```

   ⚠️ **Use Method 1 instead** - SQL direct insertion into auth.users is not recommended.

---

## Verification Steps

After creating the user:

1. **Check User Exists**
   - Go to Supabase Dashboard → Authentication → Users
   - You should see `rasheedclothingintl@gmail.com` in the list
   - Email should be marked as "Confirmed"

2. **Test Login (Local)**
   ```bash
   # Make sure dev server is running
   npm run dev
   ```
   - Visit http://localhost:3001/admin/login
   - Enter credentials
   - Should redirect to http://localhost:3001/admin

3. **Test Login (Production)**
   - Visit https://rasheedclothingintl.me/admin/login
   - Enter credentials
   - Should redirect to https://rasheedclothingintl.me/admin

---

## Troubleshooting

### "Invalid login credentials" Error

**Possible causes:**
- User not created yet
- Email not confirmed (make sure "Auto Confirm User" was checked)
- Wrong password
- Caps Lock is on

**Solutions:**
1. Verify user exists in Supabase Dashboard
2. Check email is confirmed
3. Try resetting password in Supabase Dashboard
4. Re-create user if needed

### "Failed to fetch" or Network Errors

**Possible causes:**
- Supabase project is not accessible
- Environment variables are incorrect
- Network connectivity issues

**Solutions:**
1. Check `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`
2. Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
3. Test Supabase connection: https://yjsmczrdrnafrvsqfafw.supabase.co

### Script Shows "Invalid API key"

**Cause:** `SUPABASE_SERVICE_ROLE_KEY` is not properly set or is still `[SENSITIVE]`

**Solution:**
1. Get your actual Service Role Key from Supabase Dashboard:
   - Go to Settings → API
   - Copy the `service_role` key (not the `anon` key)
2. Update `.env.local`:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
   ```
3. Run the script again: `npm run setup-admin`

---

## Security Recommendations

After initial setup:

1. ✅ **Change Password After First Login**
   - Use a strong, unique password
   - Store in a password manager

2. ✅ **Enable 2FA** (if Supabase supports it)
   - Check Supabase Auth settings

3. ✅ **Limit Service Role Key Exposure**
   - Never commit `.env.local` to git (already in `.gitignore`)
   - Only use service role key server-side
   - Rotate keys periodically

4. ✅ **Monitor Admin Access**
   - Check Supabase Auth logs regularly
   - Set up alerts for suspicious activity

5. ✅ **Use Environment-Specific Accounts**
   - Consider separate admin accounts for dev/staging/prod

---

## Current Configuration

Your Supabase project details:

- **Project URL:** https://yjsmczrdrnafrvsqfafw.supabase.co
- **Project Reference:** yjsmczrdrnafrvsqfafw
- **Region:** Auto-assigned by Supabase

Environment files:
- `.env.local` - Contains all Supabase keys and connection strings

---

## Next Steps

Once admin user is set up:

1. ✅ Login to admin panel
2. 📝 Change default password
3. 🔍 Test admin functionality:
   - View contacts
   - Manage portfolio items
4. 🔐 Set up additional security measures
5. 📊 Configure admin permissions (if applicable)

---

## Need Help?

If you continue to have issues:

1. Check Supabase Dashboard for error logs
2. Verify all environment variables are correct
3. Check browser console for client-side errors
4. Review Supabase Auth documentation: https://supabase.com/docs/guides/auth

---

**Last Updated:** August 26, 2026
