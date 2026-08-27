import React from 'react';

import { Hero } from '@/components/home/hero/Hero';
import { CollectionsSection } from '@/components/home/collections/CollectionsSection';
import { CapabilitiesSection } from '@/components/home/capabilities/CapabilitiesSection';
import { ProcessTimelineSection } from '@/components/home/process/ProcessTimelineSection';
import { PortfolioPreviewWrapper } from '@/components/home/portfolio/PortfolioPreviewWrapper';
import { HomeCtaSection } from '@/components/home/cta/HomeCtaSection';

import { getPublishedCollections } from '@/lib/api/collection.service';

export default async function Home() {
  const collections = await getPublishedCollections();

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION - ULTRA PREMIUM */}
      <Hero />

      {/* 2. OUR COLLECTIONS (New Premium Layout) */}
      <CollectionsSection collections={collections} />

      {/* 3. CAPABILITIES (Premium Sticky Editorial Layout) */}
      <CapabilitiesSection />

      {/* 4. PROCESS TIMELINE */}
      <ProcessTimelineSection />

      {/* 5. PORTFOLIO HIGHLIGHTS */}
      <PortfolioPreviewWrapper />

      {/* 6. CTA SECTION */}
      <HomeCtaSection />
      
    </div>
  );
}
