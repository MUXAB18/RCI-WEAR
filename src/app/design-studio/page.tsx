import React from 'react';
import { DesignStudio } from '@/components/design-studio/DesignStudio';

export const metadata = {
  title: 'Design Your Own | Rasheed Clothing International',
  description: 'Customize a hoodie, shirt, or tracksuit with your artwork, patches, and text.',
};

export default function DesignStudioPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <main className="flex-grow">
        <DesignStudio />
      </main>
    </div>
  );
}
