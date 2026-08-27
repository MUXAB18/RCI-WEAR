/**
 * Product API Service
 * CRUD operations for products
 */

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type CreateProductInput = {
  name: string;
  slug: string;
  description?: string;
  price?: number;
  sku?: string;
  images?: string[];
  category?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  stock?: number;
  minOrder?: number;
  tags?: string[];
  collectionId?: string;
};

export type UpdateProductInput = Partial<CreateProductInput>;

// ─── READ ────────────────────────────────────────────────────────────────────

export async function getAllProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      collection: {
        select: { id: true, name: true },
      },
    },
  });
}

export async function getPublishedProducts() {
  return prisma.product.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
    include: {
      collection: true,
    },
  });
}

export async function getFeaturedProducts(limit = 8) {
  return prisma.product.findMany({
    where: { 
      isPublished: true,
      isFeatured: true,
    },
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      collection: true,
    },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      collection: true,
    },
  });
}

export async function getProductsByCollection(collectionId: string) {
  return prisma.product.findMany({
    where: { 
      collectionId,
      isPublished: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

export async function createProduct(data: CreateProductInput) {
  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      sku: data.sku,
      images: data.images || [],
      category: data.category,
      isPublished: data.isPublished ?? true,
      isFeatured: data.isFeatured ?? false,
      stock: data.stock ?? 0,
      minOrder: data.minOrder ?? 1,
      tags: data.tags || [],
      collectionId: data.collectionId,
    },
  });
  revalidatePaths();
  return product;
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export async function updateProduct(id: string, data: UpdateProductInput) {
  const product = await prisma.product.update({
    where: { id },
    data,
  });
  revalidatePaths();
  return product;
}

// ─── DELETE ──────────────────────────────────────────────────────────────────

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePaths();
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function revalidatePaths() {
  revalidatePath('/');
  revalidatePath('/products');
  revalidatePath('/collections');
  revalidatePath('/admin/products');
}
