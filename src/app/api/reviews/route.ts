import { NextRequest, NextResponse } from 'next/server';
import { createReview } from '@/lib/api/review.service';
import { getOrderByNumber } from '@/lib/api/order.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderNumber, rating, comment } = body;

    if (!orderNumber || !rating) {
      return NextResponse.json({ error: 'Order number and rating are required.' }, { status: 400 });
    }

    const order = await getOrderByNumber(orderNumber);
    if (!order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    }

    const review = await createReview(order.id, { rating, comment });
    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    console.error('Failed to submit review:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit review' },
      { status: 500 }
    );
  }
}
