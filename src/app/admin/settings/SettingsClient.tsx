'use client';

import { useState } from 'react';
import { Settings as SettingsIcon, Save, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { Textarea } from '@/components/admin/ui/Textarea';
import { useRouter } from 'next/navigation';
import { ConfirmModal } from '@/components/admin/ui/ConfirmModal';

type Setting = {
  id: string;
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  group: string;
};

type Props = {
  initialSettings: any[];
};

type SettingsByGroup = {
  [key: string]: Setting[];
};

export function SettingsClient({ initialSettings }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  
  // Group settings by their group property
  const settingsByGroup = initialSettings.reduce((acc: SettingsByGroup, setting) => {
    if (!acc[setting.group]) {
      acc[setting.group] = [];
    }
    acc[setting.group].push(setting);
    return acc;
  }, {});

  const [formData, setFormData] = useState<{ [key: string]: string }>(
    initialSettings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as { [key: string]: string })
  );

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updates = Object.entries(formData).map(([key, value]) => ({
        key,
        value,
      }));

      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: updates }),
      });

      if (res.ok) {
        router.refresh();
        alert('Settings saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInitializeDefaults = () => {
    setIsConfirmOpen(true);
  };

  const executeInitializeDefaults = async () => {
    setInitLoading(true);

    try {
      const defaultSettings = [
        { key: 'site_name', value: 'Rasheed Clothing International', type: 'string', group: 'general' },
        { key: 'site_tagline', value: 'Premium B2B Apparel Manufacturing', type: 'string', group: 'general' },
        { key: 'contact_email', value: 'info@rasheedclothing.com', type: 'string', group: 'contact' },
        { key: 'contact_phone', value: '+92 349 6014611', type: 'string', group: 'contact' },
        { key: 'contact_address', value: 'Sialkot, Pakistan', type: 'string', group: 'contact' },
        { key: 'social_facebook', value: '', type: 'string', group: 'social' },
        { key: 'social_instagram', value: '', type: 'string', group: 'social' },
        { key: 'social_linkedin', value: '', type: 'string', group: 'social' },
        { key: 'social_twitter', value: '', type: 'string', group: 'social' },
        { key: 'seo_description', value: 'Leading B2B apparel manufacturer specializing in custom clothing production', type: 'string', group: 'seo' },
        { key: 'seo_keywords', value: 'apparel manufacturing, custom clothing, B2B textiles, bulk orders', type: 'string', group: 'seo' },
      ];

      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: defaultSettings }),
      });

      if (res.ok) {
        router.refresh();
        alert('Default settings initialized successfully!');
      }
    } catch (error) {
      console.error('Failed to initialize settings:', error);
      alert('Failed to initialize settings');
    } finally {
      setInitLoading(false);
      setIsConfirmOpen(false);
    }
  };

  const groupTitles: { [key: string]: string } = {
    general: 'General Settings',
    contact: 'Contact Information',
    social: 'Social Media',
    seo: 'SEO & Meta',
  };

  const groupDescriptions: { [key: string]: string } = {
    general: 'Basic site information and branding',
    contact: 'Contact details displayed on the website',
    social: 'Social media profile links',
    seo: 'Search engine optimization settings',
  };

  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage site-wide settings and configuration"
        actions={
          <div className="flex gap-2">
            {initialSettings.length === 0 && (
              <Button
                variant="ghost"
                icon={<RefreshCw className="w-4 h-4" />}
                onClick={handleInitializeDefaults}
                loading={initLoading}
              >
                Initialize Defaults
              </Button>
            )}
            <Button
              icon={<Save className="w-4 h-4" />}
              onClick={handleSubmit}
              loading={loading}
            >
              Save Settings
            </Button>
          </div>
        }
      />

      {initialSettings.length === 0 ? (
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 text-center">
          <SettingsIcon className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No Settings Found</h3>
          <p className="text-white/60 mb-4">
            Initialize default settings to get started
          </p>
          <Button
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={handleInitializeDefaults}
            loading={initLoading}
          >
            Initialize Default Settings
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {(Object.entries(settingsByGroup) as [string, any[]][]).map(([group, settings]) => (
            <div key={group} className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white mb-1">
                  {groupTitles[group] || group.charAt(0).toUpperCase() + group.slice(1)}
                </h2>
                <p className="text-sm text-white/60">
                  {groupDescriptions[group] || `Settings for ${group}`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {settings.map((setting) => {
                  const label = setting.key
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                  if (setting.type === 'boolean') {
                    return (
                      <div key={setting.id} className="flex items-center gap-2 col-span-2">
                        <input
                          type="checkbox"
                          id={setting.key}
                          checked={formData[setting.key] === 'true'}
                          onChange={(e) => handleChange(setting.key, e.target.checked ? 'true' : 'false')}
                          className="w-4 h-4 rounded border-white/20 bg-white/10 text-white focus:ring-white/30"
                        />
                        <label htmlFor={setting.key} className="text-sm text-white/80">
                          {label}
                        </label>
                      </div>
                    );
                  }

                  if (setting.key.includes('description') || setting.key.includes('address')) {
                    return (
                      <div key={setting.id} className="col-span-2">
                        <Textarea
                          label={label}
                          value={formData[setting.key] || ''}
                          onChange={(e) => handleChange(setting.key, e.target.value)}
                          rows={3}
                        />
                      </div>
                    );
                  }

                  return (
                    <Input
                      key={setting.id}
                      label={label}
                      type={setting.type === 'number' ? 'number' : 'text'}
                      value={formData[setting.key] || ''}
                      onChange={(e) => handleChange(setting.key, e.target.value)}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.refresh()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              icon={<Save className="w-4 h-4" />}
              loading={loading}
            >
              Save All Settings
            </Button>
          </div>
        </form>
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={executeInitializeDefaults}
        title="Initialize Default Settings"
        message="This will create default settings. Existing settings will not be overwritten. Continue?"
        confirmText="Initialize"
        isDanger={false}
        isLoading={initLoading}
      />
    </>
  );
}
