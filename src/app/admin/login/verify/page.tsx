'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

export default function VerifyOtpPage() {
  const router = useRouter();
  const supabase = createClient();

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(true);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // Check if user is actually authenticated in Supabase first
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push('/admin/login');
      } else {
        // Just clear the sending state since the OTP was already dispatched by the login page
        setSending(false);
      }
    };

    checkAuth();
  }, [router, supabase]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Invalid OTP');
        setLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setMessage('');
    setSending(true);
    
    try {
      const res = await fetch('/api/admin/auth/send-otp', {
        method: 'POST',
      });
      
      if (res.ok) {
        setMessage('A new OTP has been sent.');
      } else {
        setError('Failed to resend OTP.');
      }
    } catch (err) {
      setError('An unexpected error occurred while sending OTP.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl border border-white/10 mb-5">
            <span className="text-white font-black text-xl font-sans">R</span>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight font-sans">2-Step Verification</h1>
          <p className="text-white/40 text-sm mt-1 font-sans">Enter the 6-digit code sent to the admin email.</p>
        </div>

        {/* Verification Card */}
        <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label className="block text-white/60 text-sm font-medium mb-2 font-sans">One-Time Password</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                placeholder="000000"
                className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition text-center tracking-widest text-2xl font-mono"
                disabled={sending}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-500 text-sm px-4 py-3 rounded-xl">
                {message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full py-6 text-sm font-semibold rounded-xl bg-white text-black hover:bg-white/90"
              disabled={loading || sending || otp.length !== 6}
              loading={loading}
            >
              {sending ? 'Sending OTP...' : 'Verify & Continue'}
            </Button>
            
            <div className="text-center mt-4">
              <button 
                type="button" 
                onClick={handleResend}
                disabled={sending || loading}
                className="text-white/40 hover:text-white text-sm transition font-sans"
              >
                Didn't receive a code? Resend
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-8 text-white/20 text-xs font-sans">
          &copy; {new Date().getFullYear()} Rasheed Clothing International
        </div>
      </div>
    </div>
  );
}
