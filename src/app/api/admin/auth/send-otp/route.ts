import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const adminEmail = 'rasheedclothingintl@gmail.com';

    // Check if an OTP was recently sent (e.g., within the last 60 seconds)
    const existingOtp = await prisma.adminOtp.findUnique({
      where: { email: adminEmail }
    });

    if (existingOtp) {
      const timeSinceLastOtp = Date.now() - existingOtp.createdAt.getTime();
      if (timeSinceLastOtp < 60000) { // 60 seconds
        return NextResponse.json(
          { error: 'Please wait a minute before requesting another OTP.' },
          { status: 429 }
        );
      }
    }

    // Save to database
    await prisma.adminOtp.upsert({
      where: { email: adminEmail },
      update: { otp, expiresAt, createdAt: new Date() },
      create: { email: adminEmail, otp, expiresAt },
    });

    // Send email using Nodemailer
    // You need to set SMTP_USER and SMTP_PASS in .env
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or use host/port for other providers
      auth: {
        user: process.env.SMTP_USER || adminEmail,
        pass: process.env.SMTP_PASS, // App Password
      },
    });

    const mailOptions = {
      from: `"Rasheed Clothing Admin" <${process.env.SMTP_USER || adminEmail}>`,
      to: adminEmail,
      subject: 'Your Admin Portal Login OTP',
      text: `Your OTP for accessing the Admin Portal is: ${otp}\n\nIt expires in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #333;">Admin Portal Verification</h2>
          <p>Please use the following One-Time Password (OTP) to complete your login:</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <strong style="font-size: 24px; letter-spacing: 5px; color: #000;">${otp}</strong>
          </div>
          <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send OTP:', error);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}
