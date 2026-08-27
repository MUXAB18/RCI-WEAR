import { AdminShell } from '@/app/admin/layout';
import { ContactsClient } from './ContactsClient';
import { getAllInquiries } from '@/lib/api/contact.service';

export default async function ContactsPage() {
  const contacts = await getAllInquiries();

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <ContactsClient initialContacts={contacts} />
      </div>
    </AdminShell>
  );
}
