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
  salePrice?: number;
  sku?: string;
  images?: string[];
  categoryId?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  stock?: number;
  minOrder?: number;
  tags?: string[];
  collectionId?: string;
  variants?: {
    id?: string;
    size?: string;
    color?: string;
    sku?: string;
    price?: number;
    stock?: number;
  }[];
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
      variants: true,
    },
  });
}

export async function getPublishedProducts() {
  return prisma.product.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
    include: {
      collection: true,
      variants: true,
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
      variants: true,
    },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      collection: true,
      variants: true,
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
  const { variants, ...productData } = data;
  const product = await prisma.product.create({
    data: {
      name: productData.name,
      slug: productData.slug,
      description: productData.description,
      price: productData.price,
      salePrice: productData.salePrice,
      sku: productData.sku,
      images: productData.images || [],
      categoryId: productData.categoryId,
      isPublished: productData.isPublished ?? true,
      isFeatured: productData.isFeatured ?? false,
      stock: productData.stock ?? 0,
      minOrder: productData.minOrder ?? 1,
      tags: productData.tags || [],
      collectionId: productData.collectionId,
      ...(variants && variants.length > 0 && {
        variants: {
          create: variants.map(v => ({
            size: v.size,
            color: v.color,
            sku: v.sku,
            price: v.price,
            stock: v.stock ?? 0,
          })),
        },
      }),
    },
    include: {
      variants: true,
    }
  });
  revalidatePaths();
  return product;
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export async function updateProduct(id: string, data: UpdateProductInput) {
  const { variants, ...productData } = data;
  
  if (variants) {
    // Delete existing variants and recreate them to simplify sync
    await prisma.productVariant.deleteMany({
      where: { productId: id }
    });
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...productData,
      ...(variants && variants.length > 0 && {
        variants: {
          create: variants.map(v => ({
            size: v.size,
            color: v.color,
            sku: v.sku,
            price: v.price,
            stock: v.stock ?? 0,
          })),
        },
      }),
    },
    include: {
      variants: true,
    }
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
