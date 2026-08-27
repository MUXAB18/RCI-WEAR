import { NextRequest, NextResponse } from 'next/server';
import { getOrderByNumber } from '@/lib/api/order.service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const order = await getOrderByNumber((await params).orderNumber);
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Strip sensitive information before returning public data
    const publicOrderData = {
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      status: order.status,
      estimatedDelivery: order.estimatedDelivery,
      trackingNumber: order.trackingNumber,
      createdAt: order.createdAt,
      items: order.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
      })),
      review: order.review ? { id: order.review.id } : null,
    };

    return NextResponse.json(publicOrderData);
  } catch (error) {
    console.error('Failed to fetch tracking data:', error);
    return NextResponse.json({ error: 'Failed to fetch tracking data' }, { status: 500 });
  }
}
