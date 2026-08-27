/**
 * Direct Admin User Creation via Supabase Management API
 * 
 * This script creates the admin user directly using Supabase Auth API
 * Usage: node scripts/create-admin-directly.mjs
 */

import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const ADMIN_EMAIL = 'rasheedclothingintl@gmail.com';
const ADMIN_PASSWORD = 'rci@2026';

console.log('\n🔧 Creating admin user in Supabase...\n');
console.log('Project URL:', SUPABASE_URL);
console.log('Admin Email:', ADMIN_EMAIL);
console.log('');

if (!SUPABASE_URL) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is not set in .env.local');
  process.exit(1);
}

if (!SUPABASE_SERVICE_KEY || SUPABASE_SERVICE_KEY === '[SENSITIVE]') {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is not properly set in .env.local\n');
  console.error('📝 To fix this:\n');
  console.error('1. Go to: https://supabase.com/dashboard/project/yjsmczrdrnafrvsqfafw/settings/api');
  console.error('2. Copy the "service_role" key (NOT the anon key)');
  console.error('3. Update .env.local with the actual key value\n');
  console.error('Or create the user manually in Supabase Dashboard:');
  console.error('👉 https://supabase.com/dashboard/project/yjsmczrdrnafrvsqfafw/auth/users\n');
  process.exit(1);
}

async function createAdminUser() {
  try {
    // First, try to list users to verify auth works
    console.log('📡 Connecting to Supabase...');
    
    const listResponse = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!listResponse.ok) {
      const error = await listResponse.text();
      throw new Error(`Failed to connect to Supabase: ${listResponse.status} - ${error}`);
    }

    const usersData = await listResponse.json();
    const existingUser = usersData.users?.find(u => u.email === ADMIN_EMAIL);

    if (existingUser) {
      console.log('ℹ️  User already exists with this email');
      console.log(`   User ID: ${existingUser.id}`);
      console.log('   Updating password...\n');

      // Update existing user password
      const updateResponse = await fetch(
        `${SUPABASE_URL}/auth/v1/admin/users/${existingUser.id}`,
        {
          method: 'PUT',
          headers: {
            'apikey': SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: ADMIN_PASSWORD,
            email_confirm: true,
          }),
        }
      );

      if (!updateResponse.ok) {
        const error = await updateResponse.text();
        throw new Error(`Failed to update user: ${error}`);
      }

      console.log('✅ Password updated successfully!\n');
    } else {
      console.log('Creating new admin user...\n');

      // Create new user
      const createResponse = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          email_confirm: true,
          user_metadata: {
            role: 'admin',
            full_name: 'RCI Admin',
          },
        }),
      });

      if (!createResponse.ok) {
        const error = await createResponse.text();
        throw new Error(`Failed to create user: ${error}`);
      }

      const userData = await createResponse.json();
      console.log('✅ Admin user created successfully!');
      console.log(`   User ID: ${userData.id}\n`);
    }

    console.log('═══════════════════════════════════════════════════════');
    console.log('📋 Admin Credentials');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`   Email:    ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('🌐 Admin Panel Access:');
    console.log('   Local:      http://localhost:3001/admin/login');
    console.log('   Production: https://rasheedclothingintl.me/admin/login\n');

    console.log('✨ Setup complete! You can now login to the admin panel.\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n💡 Try creating the user manually:');
    console.error('   1. Visit: https://supabase.com/dashboard/project/yjsmczrdrnafrvsqfafw/auth/users');
    console.error('   2. Click "Add User"');
    console.error(`   3. Email: ${ADMIN_EMAIL}`);
    console.error(`   4. Password: ${ADMIN_PASSWORD}`);
    console.error('   5. Check "Auto Confirm User"\n');
    process.exit(1);
  }
}

createAdminUser();
