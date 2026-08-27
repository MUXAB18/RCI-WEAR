'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { ShieldAlert, Save } from 'lucide-react';

export function AdminAccountSettings() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setEmail(data.user.email || '');
      }
    };
    fetchUser();
  }, [supabase]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const updates: { email?: string; password?: string } = {};
      if (email) updates.email = email;
      if (newPassword) updates.password = newPassword;

      if (Object.keys(updates).length === 0) {
        setLoading(false);
        return;
      }

      const { data, error: updateError } = await supabase.auth.updateUser(updates);

      if (updateError) throw updateError;

      if (updates.email && data.user?.email !== updates.email) {
        setMessage('Check both your old and new email inboxes for confirmation links to finalize the email change.');
      } else {
        setMessage('Admin account credentials updated successfully!');
      }
      
      setNewPassword(''); // Clear password field after update
    } catch (err: any) {
      console.error('Error updating admin account:', err);
      setError(err.message || 'Failed to update credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6 mb-8">
      <div className="mb-6 flex items-start gap-3">
        <div className="p-2 bg-red-500/10 rounded-lg">
          <ShieldAlert className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">Admin Account Security</h2>
          <p className="text-sm text-white/60">
            Update your admin login email or password. Be careful—these are your master credentials.
          </p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4 max-w-2xl">
        <Input
          label="Admin Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Leave blank to keep current password"
        />

        {message && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-sm rounded-lg">
            {message}
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="pt-2">
          <Button
            type="submit"
            icon={<Save className="w-4 h-4" />}
            loading={loading}
            disabled={loading}
          >
            Update Credentials
          </Button>
        </div>
      </form>
    </div>
  );
}
