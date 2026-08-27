/**
 * Admin User Setup Script
 * Creates the admin user in Supabase Auth
 * 
 * Usage: npx tsx scripts/setup-admin.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
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

    const userExists = existingUser?.users?.some((user: any) => user.email === ADMIN_EMAIL);

    if (userExists) {
      console.log('ℹ️  Admin user already exists');
      console.log(`   Email: ${ADMIN_EMAIL}`);
      
      // Update password if user exists
      const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
        existingUser.users.find((u: any) => u.email === ADMIN_EMAIL)!.id,
        { password: ADMIN_PASSWORD }
      );

      if (updateError) {
        throw new Error(`Failed to update password: ${updateError.message}`);
      }

      console.log('✅ Admin password updated successfully\n');
    } else {
      // Create new admin user
      const { data, error } = await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true, // Auto-confirm email
        user_metadata: {
          role: 'admin',
          full_name: 'Admin',
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
    process.exit(1);
  }
}

setupAdmin();
