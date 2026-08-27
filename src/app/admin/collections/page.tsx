import { AdminShell } from '@/app/admin/layout';
import { CollectionsClient } from './CollectionsClient';
import { getAllCollections } from '@/lib/api/collection.service';

export default async function CollectionsPage() {
  const collections = await getAllCollections();

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <CollectionsClient initialCollections={collections} />
      </div>
    </AdminShell>
  );
}
