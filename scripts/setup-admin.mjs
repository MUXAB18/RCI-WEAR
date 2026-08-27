/**
 * Admin User Setup Script
 * Creates the admin user in Supabase Auth
 * 
 * Usage: node scripts/setup-admin.mjs
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  console.error('\n💡 Make sure .env.local file exists with these variables.');
  process.exit(1);
}

// Create Supabase admin client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const ADMIN_EMAIL = 'rasheedclothingintl@gmail.com';
const ADMIN_PASSWORD = 'rci@2026';

async function setupAdmin() {
  console.log('🔧 Setting up admin user...\n');

  try {
    // Check if user already exists
    const { data: existingUser, error: fetchError } = await supabase.auth.admin.listUsers();
    
    if (fetchError) {
      throw new Error(`Failed to fetch users: ${fetchError.message}`);
    }

    const userExists = existingUser?.users?.some(user => user.email === ADMIN_EMAIL);

    if (userExists) {
      console.log('ℹ️  Admin user already exists');
      console.log(`   Email: ${ADMIN_EMAIL}`);
      
      // Update password if user exists
      const existingUserId = existingUser.users.find(u => u.email === ADMIN_EMAIL)?.id;
      
      if (existingUserId) {
        const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
          existingUserId,
          { password: ADMIN_PASSWORD }
        );

        if (updateError) {
          throw new Error(`Failed to update password: ${updateError.message}`);
        }

        console.log('✅ Admin password updated successfully\n');
      }
    } else {
      // Create new admin user
      const { data, error } = await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true, // Auto-confirm email
        user_metadata: {
          role: 'admin',
          full_name: 'RCI Admin',
        },
      });

      if (error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }

      console.log('✅ Admin user created successfully!');
      console.log(`   Email: ${ADMIN_EMAIL}`);
      console.log(`   User ID: ${data.user?.id}\n`);
    }

    console.log('📋 Admin Credentials:');
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`   Email:    ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('🌐 Admin Panel URLs:');
    console.log('   Local:      http://localhost:3001/admin/login');
    console.log('   Production: https://rasheedclothingintl.me/admin/login\n');

    console.log('✨ Setup complete!');

  } catch (error) {
    console.error('❌ Error setting up admin user:');
    console.error(`   ${error instanceof Error ? error.message : 'Unknown error'}`);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Verify SUPABASE_SERVICE_ROLE_KEY is correct in .env.local');
    console.error('   2. Check Supabase project is accessible');
    console.error('   3. Ensure you have admin permissions in Supabase');
    process.exit(1);
  }
}

setupAdmin();
