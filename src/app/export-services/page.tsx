import React from 'react';
import { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ExportServicesClient } from './ExportServicesClient';

export const metadata: Metadata = {
  title: 'Export Services - Global Apparel Manufacturing | Rasheed Clothing International',
  description: 'Comprehensive export services for international clothing brands. We ship to 15+ countries with full logistics support, customs handling, and documentation. Pakistan clothing manufacturer.',
  keywords: 'clothing export Pakistan, international apparel shipping, global manufacturing, export documentation, customs clearance',
};

export default function ExportServicesPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading
          eyebrow="Global Reach"
          title="Export Services"
          subtitle="Seamless international shipping and logistics support for your apparel manufacturing needs"
        />
        <ExportServicesClient />
      </div>
    </div>
  );
}
