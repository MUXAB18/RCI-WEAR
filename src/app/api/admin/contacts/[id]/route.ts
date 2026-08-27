import { NextRequest, NextResponse } from 'next/server';
import { updateInquiry, deleteInquiry } from '@/lib/api/contact.service';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const contact = await updateInquiry((await params).id, body);
    return NextResponse.json(contact);
  } catch (error) {
    console.error('Failed to update contact inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to update contact inquiry' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await deleteInquiry((await params).id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete contact inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact inquiry' },
      { status: 500 }
    );
  }
}
