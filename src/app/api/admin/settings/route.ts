import { NextRequest, NextResponse } from 'next/server';
import { bulkUpdateSettings } from '@/lib/api/settings.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { settings } = body;

    if (!Array.isArray(settings)) {
      return NextResponse.json(
        { error: 'Settings must be an array' },
        { status: 400 }
      );
    }

    const updatedSettings = await bulkUpdateSettings(settings);
    return NextResponse.json(updatedSettings, { status: 200 });
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
