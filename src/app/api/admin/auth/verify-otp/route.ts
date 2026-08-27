import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { otp } = await request.json();
    const adminEmail = 'rasheedclothingintl@gmail.com';

    if (!otp) {
      return NextResponse.json({ error: 'OTP is required' }, { status: 400 });
    }

    const record = await prisma.adminOtp.findUnique({
      where: { email: adminEmail },
    });

    if (!record) {
      return NextResponse.json({ error: 'No OTP generated. Please request a new one.' }, { status: 400 });
    }

    if (record.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    if (new Date() > record.expiresAt) {
      return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
    }

    // Optionally delete the OTP so it can't be reused
    await prisma.adminOtp.delete({
      where: { email: adminEmail },
    });

    const response = NextResponse.json({ success: true });
    
    // Set a 2FA verified cookie valid for 24 hours
    response.cookies.set('admin_2fa_verified', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/admin',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Failed to verify OTP:', error);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
