import { NextRequest, NextResponse } from 'next/server';
import { createQuote } from '@/lib/api/quote.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const quote = await createQuote(body);
    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error('Failed to create quote:', error);
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    );
  }
}
