/**
 * Settings API Service
 * CRUD operations for site settings
 */

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type CreateSettingInput = {
  key: string;
  value: string;
  type?: string;
  group?: string;
};

export type UpdateSettingInput = {
  value: string;
  type?: string;
  group?: string;
};

// ─── READ ────────────────────────────────────────────────────────────────────

export async function getAllSettings() {
  return prisma.setting.findMany({
    orderBy: { group: 'asc' },
  });
}

export async function getSettingsByGroup(group: string) {
  return prisma.setting.findMany({
    where: { group },
    orderBy: { key: 'asc' },
  });
}

export async function getSettingByKey(key: string) {
  return prisma.setting.findUnique({
    where: { key },
  });
}

export async function getSettingValue(key: string, defaultValue: string = ''): Promise<string> {
  const setting = await getSettingByKey(key);
  return setting?.value || defaultValue;
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

export async function createSetting(data: CreateSettingInput) {
  const setting = await prisma.setting.create({
    data: {
      key: data.key,
      value: data.value,
      type: data.type || 'string',
      group: data.group || 'general',
    },
  });
  revalidatePath('/admin/settings');
  return setting;
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export async function updateSetting(key: string, data: UpdateSettingInput) {
  const setting = await prisma.setting.update({
    where: { key },
    data,
  });
  revalidatePath('/admin/settings');
  revalidatePath('/');
  return setting;
}

export async function upsertSetting(key: string, value: string, type: string = 'string', group: string = 'general') {
  const setting = await prisma.setting.upsert({
    where: { key },
    create: {
      key,
      value,
      type,
      group,
    },
    update: {
      value,
      type,
      group,
    },
  });
  revalidatePath('/admin/settings');
  revalidatePath('/');
  return setting;
}

// ─── DELETE ──────────────────────────────────────────────────────────────────

export async function deleteSetting(key: string) {
  await prisma.setting.delete({ where: { key } });
  revalidatePath('/admin/settings');
}

// ─── BATCH OPERATIONS ────────────────────────────────────────────────────────

export async function bulkUpdateSettings(settings: { key: string, value: string, type?: string, group?: string }[]) {
  const updates = settings.map((setting) =>
    prisma.setting.upsert({
      where: { key: setting.key },
      create: {
        key: setting.key,
        value: setting.value,
        type: setting.type || 'string',
        group: setting.group || 'general',
      },
      update: { value: setting.value },
    })
  );

  await prisma.$transaction(updates);
  revalidatePath('/admin/settings');
  revalidatePath('/');
}

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────

export async function getSiteConfig() {
  const settings = await getAllSettings();
  
  return settings.reduce((config, setting) => {
    config[setting.key] = setting.value;
    return config;
  }, {} as Record<string, string>);
}

export async function initializeDefaultSettings() {
  const defaults = [
    { key: 'site_name', value: 'Rasheed Clothing International', type: 'string', group: 'general' },
    { key: 'site_tagline', value: 'Premium B2B Apparel Manufacturing', type: 'string', group: 'general' },
    { key: 'contact_email', value: 'info@rasheedclothing.com', type: 'string', group: 'contact' },
    { key: 'contact_phone', value: '+92 349 6014611', type: 'string', group: 'contact' },
    { key: 'contact_address', value: 'Sialkot, Pakistan', type: 'string', group: 'contact' },
    { key: 'social_facebook', value: '', type: 'string', group: 'social' },
    { key: 'social_instagram', value: '', type: 'string', group: 'social' },
    { key: 'social_linkedin', value: '', type: 'string', group: 'social' },
    { key: 'seo_description', value: 'Premium apparel manufacturing and private-label clothing solutions', type: 'string', group: 'seo' },
    { key: 'seo_keywords', value: 'apparel manufacturing, clothing supplier, private label', type: 'string', group: 'seo' },
  ];

  for (const setting of defaults) {
    await upsertSetting(setting.key, setting.value, setting.type, setting.group);
  }
}
