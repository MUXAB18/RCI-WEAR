import { NextRequest, NextResponse } from 'next/server';
import { createCollection } from '@/lib/api/collection.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const collection = await createCollection(body);
    return NextResponse.json(collection, { status: 201 });
  } catch (error) {
    console.error('Failed to create collection:', error);
    return NextResponse.json(
      { error: 'Failed to create collection' },
      { status: 500 }
    );
  }
}
