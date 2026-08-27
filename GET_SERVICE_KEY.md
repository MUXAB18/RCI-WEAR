# How to Get Your Supabase Service Role Key

Your `.env.local` file has `SUPABASE_SERVICE_ROLE_KEY="[SENSITIVE]"` which means the actual key is hidden.

## Step 1: Get the Service Role Key

1. **Go to Supabase Dashboard:**
   ```
   https://supabase.com/dashboard/project/yjsmczrdrnafrvsqfafw/settings/api
   ```

2. **Find "Project API keys" section**

3. **Copy the `service_role` key** (NOT the `anon` key)
   - It starts with `eyJ...`
   - It's a long JWT token
   - Keep it secret!

## Step 2: Update .env.local

Replace the `[SENSITIVE]` placeholder with your actual key:

```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...your_actual_key_here
```

## Step 3: Run the Setup Script

```bash
npm run setup-admin
```

---

## OR: Create User Manually (Easier!)

If you don't want to deal with keys, just create the user in the Supabase Dashboard:

1. **Go to Users Page:**
   ```
   https://supabase.com/dashboard/project/yjsmczrdrnafrvsqfafw/auth/users
   ```

2. **Click "Add User" button**

3. **Fill in the form:**
   - Email: `rasheedclothingintl@gmail.com`
   - Password: `rci@2026`
   - ✅ Check "Auto Confirm User"

4. **Click "Create User"**

5. **Test login at:**
   - http://localhost:3001/admin/login
   - https://rasheedclothingintl.me/admin/login

**This method takes 1 minute and doesn't require any scripts!**
