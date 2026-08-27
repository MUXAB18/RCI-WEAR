/**
 * Portfolio API Service
 * 
 * Central place for all portfolio-related database operations.
 * Used by both:
 * - Next.js API route handlers (src/app/api/portfolio/*)
 * - React Server Components (e.g. PortfolioPreviewWrapper)
 */

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type CreatePortfolioInput = {
  title: string;
  category: string;
  description?: string;
  imageUrl: string;
  images?: string[];
  isFeatured?: boolean;
  isPublished?: boolean;
  order?: number;
  tags?: string[];
  clientName?: string;
  projectDate?: Date;
};

export type UpdatePortfolioInput = Partial<CreatePortfolioInput>;

// ─── READ ────────────────────────────────────────────────────────────────────

export async function getAllProjects() {
  return prisma.portfolioProject.findMany({
    orderBy: { order: 'asc' },
  });
}

export async function getPublishedProjects() {
  return prisma.portfolioProject.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
  });
}

export async function getFeaturedProjects(limit = 4) {
  return prisma.portfolioProject.findMany({
    where: { 
      isFeatured: true,
      isPublished: true,
    },
    orderBy: { order: 'asc' },
    take: limit,
  });
}

export async function getProjectById(id: string) {
  return prisma.portfolioProject.findUnique({
    where: { id },
  });
}

export async function getProjectsByCategory(category: string) {
  return prisma.portfolioProject.findMany({
    where: { 
      category,
      isPublished: true,
    },
    orderBy: { order: 'asc' },
  });
}

export async function getProjectsByTag(tag: string) {
  return prisma.portfolioProject.findMany({
    where: { 
      isPublished: true,
      tags: {
        has: tag,
      },
    },
    orderBy: { order: 'asc' },
  });
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

export async function createProject(data: CreatePortfolioInput) {
  const project = await prisma.portfolioProject.create({
    data: {
      title: data.title,
      category: data.category,
      description: data.description,
      imageUrl: data.imageUrl,
      images: data.images || [],
      isFeatured: data.isFeatured ?? false,
      isPublished: data.isPublished ?? true,
      order: data.order ?? 0,
      tags: data.tags || [],
      clientName: data.clientName,
      projectDate: data.projectDate,
    },
  });
  revalidatePaths();
  return project;
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export async function updateProject(id: string, data: UpdatePortfolioInput) {
  const project = await prisma.portfolioProject.update({
    where: { id },
    data,
  });
  revalidatePaths();
  return project;
}

export async function toggleFeatured(id: string) {
  const project = await prisma.portfolioProject.findUnique({
    where: { id },
    select: { isFeatured: true },
  });
  
  if (project) {
    return updateProject(id, { isFeatured: !project.isFeatured });
  }
}

export async function togglePublished(id: string) {
  const project = await prisma.portfolioProject.findUnique({
    where: { id },
    select: { isPublished: true },
  });
  
  if (project) {
    return updateProject(id, { isPublished: !project.isPublished });
  }
}

// ─── DELETE ──────────────────────────────────────────────────────────────────

export async function deleteProject(id: string) {
  await prisma.portfolioProject.delete({ where: { id } });
  revalidatePaths();
}

// ─── STATISTICS ──────────────────────────────────────────────────────────────

export async function getPortfolioStats() {
  const [total, published, featured] = await Promise.all([
    prisma.portfolioProject.count(),
    prisma.portfolioProject.count({ where: { isPublished: true } }),
    prisma.portfolioProject.count({ where: { isFeatured: true } }),
  ]);

  return {
    total,
    published,
    featured,
    draft: total - published,
  };
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function revalidatePaths() {
  revalidatePath('/');
  revalidatePath('/portfolio');
  revalidatePath('/admin/portfolio');
}
