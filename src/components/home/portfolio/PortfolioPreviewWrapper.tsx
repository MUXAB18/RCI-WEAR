import React from 'react';
import { getFeaturedProjects } from '@/lib/api/portfolio.service';
import { PortfolioPreviewSection } from './PortfolioPreviewSection';

export async function PortfolioPreviewWrapper() {
  const projects = await getFeaturedProjects();

  if (!projects || projects.length === 0) {
    return null;
  }

  return <PortfolioPreviewSection projects={projects} />;
}
