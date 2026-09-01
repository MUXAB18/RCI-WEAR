import { AdminShell } from '@/app/admin/layout';
import { InventoryClient } from './InventoryClient';
import { getAllProducts } from '@/lib/api/product.service';

export default async function InventoryPage() {
  const products = await getAllProducts();

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <InventoryClient initialProducts={products} />
      </div>
    </AdminShell>
  );
}
