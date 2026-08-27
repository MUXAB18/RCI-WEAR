import { NextRequest, NextResponse } from 'next/server';
import { getOrderByNumber } from '@/lib/api/order.service';

// GET /api/admin/reviews/by-order/[orderNumber] - Get review for specific order
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params;
    
    const order = await getOrderByNumber(orderNumber);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (!order.review) {
      return NextResponse.json({ 
        error: 'No review found for this order',
        hasReview: false 
      }, { status: 404 });
    }

    return NextResponse.json({
      review: order.review,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt,
      },
      hasReview: true
    });
  } catch (error: any) {
    console.error('Failed to fetch review by order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch review' },
      { status: 500 }
    );
  }
}