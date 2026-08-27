# Admin Setup Scripts

This directory contains scripts for setting up and managing admin users.

## Setup Admin User

Creates or updates the admin user in Supabase with the configured credentials.

### Credentials

- **Email:** `rasheedclothingintl@gmail.com`
- **Password:** `rci@2026`

### Usage

Run the setup script:

```bash
npm run setup-admin
```

Or directly:

```bash
node scripts/setup-admin.mjs
```

### What it does

1. Connects to Supabase using your service role key
2. Checks if admin user already exists
3. Creates new user OR updates existing user's password
4. Sets up user metadata (role: admin)
5. Auto-confirms the email (no verification needed)

### Requirements

Make sure `.env.local` file exists with:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (required for admin operations)

### Admin Panel Access

After setup, you can login at:

- **Local Development:** http://localhost:3001/admin/login
- **Production:** https://rasheedclothingintl.me/admin/login

### Troubleshooting

**"Missing required environment variables"**
- Ensure `.env.local` exists in project root
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set (not the anon key)

**"Failed to create user"**
- Check Supabase project is active
- Verify service role key has admin permissions
- Ensure email doesn't already exist in Auth users

**Password requirements error**
- Default Supabase password policy: minimum 6 characters
- Current password meets requirements: `rci@2026` (8 characters)

### Security Notes

⚠️ **Important:**
- The service role key should never be exposed in client-side code
- Only run this script server-side or in development
- Consider changing the default password after first login
- Store credentials securely (password manager, secrets vault)

### Manual Setup Alternative

If the script doesn't work, you can manually create the user in Supabase:

1. Go to your Supabase Dashboard
2. Navigate to Authentication > Users
3. Click "Add User"
4. Enter email: `rasheedclothingintl@gmail.com`
5. Enter password: `rci@2026`
6. Check "Auto Confirm User"
7. Click "Create User"
