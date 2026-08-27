import { AdminShell } from '@/app/admin/layout';
import { TrackingClient } from './TrackingClient';
import { getOrdersForTracking } from '@/lib/api/order.service';

export default async function TrackingPage() {
  const orders = await getOrdersForTracking();

  return (
    <AdminShell>
      <div className="p-8 h-screen flex flex-col overflow-hidden max-w-[1600px] mx-auto w-full">
        <TrackingClient initialOrders={orders} />
      </div>
    </AdminShell>
  );
}
