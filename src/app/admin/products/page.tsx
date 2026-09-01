import { AdminShell } from '@/app/admin/layout';
import { ProductsClient } from './ProductsClient';
import { getAllProducts } from '@/lib/api/product.service';
import { getAllCollections } from '@/lib/api/collection.service';
import { getAllCategories } from '@/lib/api/category.service';

export default async function ProductsPage() {
  const products = await getAllProducts();
  const collections = await getAllCollections();
  const categories = await getAllCategories();

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <ProductsClient initialProducts={products} collections={collections} categories={categories} />
      </div>
    </AdminShell>
  );
}
