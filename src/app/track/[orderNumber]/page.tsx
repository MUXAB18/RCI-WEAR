import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { PublicTrackingClient } from './PublicTrackingClient';

export default async function TrackingPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params;
  const order = await prisma.order.findFirst({
    where: { orderNumber },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              images: true,
            }
          }
        }
      },
      review: true,
    }
  });

  if (!order) {
    notFound();
  }

  // Sanitize the order data for public viewing
  const publicOrder = {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    trackingNumber: order.trackingNumber,
    estimatedDelivery: order.estimatedDelivery,
    createdAt: order.createdAt.toISOString(),
    items: order.items.map(item => ({
      productName: item.name,
      image: item.product?.images?.[0] || null,
      quantity: item.quantity,
    })),
    hasReviewed: order.review !== null,
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <PublicTrackingClient order={publicOrder} />
      </div>
    </div>
  );
}
