import { AdminShell } from '@/app/admin/layout';
import { QuotesClient } from './QuotesClient';
import { getAllQuotes } from '@/lib/api/quote.service';

export default async function QuotesPage() {
  const quotes = await getAllQuotes();

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <QuotesClient initialQuotes={quotes} />
      </div>
    </AdminShell>
  );
}
