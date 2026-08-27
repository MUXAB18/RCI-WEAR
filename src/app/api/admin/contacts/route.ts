import { NextRequest, NextResponse } from 'next/server';
import { createInquiry } from '@/lib/api/contact.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const contact = await createInquiry(body);
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('Failed to create contact inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to create contact inquiry' },
      { status: 500 }
    );
  }
}
