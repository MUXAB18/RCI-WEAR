import { AdminShell } from '@/app/admin/layout';
import { OrderDetailClient } from './OrderDetailClient';
import { getOrderById } from '@/lib/api/order.service';
import { notFound } from 'next/navigation';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <OrderDetailClient order={order} />
      </div>
    </AdminShell>
  );
}