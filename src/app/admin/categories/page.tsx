import { AdminShell } from '@/app/admin/layout';
import { CategoriesClient } from './CategoriesClient';
import { getAllCategories } from '@/lib/api/category.service';

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <CategoriesClient initialCategories={categories} />
      </div>
    </AdminShell>
  );
}
