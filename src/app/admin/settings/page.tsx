import { AdminShell } from '@/app/admin/layout';
import { SettingsClient } from './SettingsClient';
import { AdminAccountSettings } from './AdminAccountSettings';
import { getAllSettings } from '@/lib/api/settings.service';

export default async function SettingsPage() {
  const settings = await getAllSettings();

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <AdminAccountSettings />
        <SettingsClient initialSettings={settings} />
      </div>
    </AdminShell>
  );
}
