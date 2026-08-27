/**
 * Collection API Service
 * CRUD operations for product collections
 */

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type CreateCollectionInput = {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isPublished?: boolean;
  order?: number;
};

export type UpdateCollectionInput = Partial<CreateCollectionInput>;

// ─── READ ────────────────────────────────────────────────────────────────────

export async function getAllCollections() {
  return prisma.collection.findMany({
    orderBy: { order: 'asc' },
    include: {
      products: {
        select: { id: true, name: true },
      },
    },
  });
}

export async function getPublishedCollections() {
  return prisma.collection.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
    include: {
      products: {
        where: { isPublished: true },
      },
    },
  });
}

export async function getCollectionById(id: string) {
  return prisma.collection.findUnique({
    where: { id },
    include: {
      products: true,
    },
  });
}

export async function getCollectionBySlug(slug: string) {
  return prisma.collection.findUnique({
    where: { slug },
    include: {
      products: {
        where: { isPublished: true },
      },
    },
  });
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

export async function createCollection(data: CreateCollectionInput) {
  const collection = await prisma.collection.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      imageUrl: data.imageUrl,
      isPublished: data.isPublished ?? true,
      order: data.order ?? 0,
    },
  });
  revalidatePaths();
  return collection;
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export async function updateCollection(id: string, data: UpdateCollectionInput) {
  const collection = await prisma.collection.update({
    where: { id },
    data,
  });
  revalidatePaths();
  return collection;
}

// ─── DELETE ──────────────────────────────────────────────────────────────────

export async function deleteCollection(id: string) {
  // First, remove collection reference from all products
  await prisma.product.updateMany({
    where: { collectionId: id },
    data: { collectionId: null },
  });
  
  await prisma.collection.delete({ where: { id } });
  revalidatePaths();
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function revalidatePaths() {
  revalidatePath('/');
  revalidatePath('/collections');
  revalidatePath('/admin/collections');
}
