import React, { Suspense } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getPublishedProjects } from '@/lib/api/portfolio.service';
import { PortfolioClient } from './PortfolioClient';

// Define the portfolio categories
const portfolioCategories = [
  'Hoodies',
  'Tees & Essentials', 
  'Tracksuits',
  'Gymwear',
  'Corporate Uniforms',
  'Outerwear & Jackets'
];

export default async function PortfolioPage() {
  // Fetch portfolio projects from database
  const portfolioProjects = await getPublishedProjects();
  
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <SectionHeading 
          eyebrow="Our Work"
          title="Portfolio"
          subtitle="Explore our extensive catalog of premium manufactured apparel."
        />

        <Suspense fallback={
          <div className="w-full py-24 text-center">
            <p className="text-gray-500 font-sans">Loading portfolio...</p>
          </div>
        }>
          <PortfolioClient 
            projects={portfolioProjects}
            categories={portfolioCategories}
          />
        </Suspense>
      </div>
    </div>
  );
}