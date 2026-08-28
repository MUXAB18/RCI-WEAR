import { AdminShell } from '@/app/admin/layout';
import { OrdersClient } from './OrdersClient';
import { getOrdersForAdminList } from '@/lib/api/order.service';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  const orders = await getOrdersForAdminList();

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <OrdersClient initialOrders={orders} />
      </div>
    </AdminShell>
  );
}
