/**
 * Category API Service
 * CRUD operations for categories
 */

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type CreateCategoryInput = {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isPublished?: boolean;
};

export type UpdateCategoryInput = Partial<CreateCategoryInput>;

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { products: true }
      }
    }
  });
}

export async function getPublishedCategories() {
  return prisma.category.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({
    where: { id },
  });
}

export async function createCategory(data: CreateCategoryInput) {
  const category = await prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      imageUrl: data.imageUrl,
      isPublished: data.isPublished ?? true,
    },
  });
  revalidatePaths();
  return category;
}

export async function updateCategory(id: string, data: UpdateCategoryInput) {
  const category = await prisma.category.update({
    where: { id },
    data,
  });
  revalidatePaths();
  return category;
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } });
  revalidatePaths();
}

function revalidatePaths() {
  revalidatePath('/');
  revalidatePath('/products');
  revalidatePath('/admin/categories');
}
