import React from 'react';
import { CollectionsSection } from '@/components/home/collections/CollectionsSection';

export const metadata = {
  title: 'Our Collections | Rasheed Clothing International',
  description: 'From formal wear to everyday luxury — the full spectrum of our craft.',
};

export default function CollectionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F0]">
      <div className="pt-16">
        <CollectionsSection />
      </div>
    </div>
  );
}
