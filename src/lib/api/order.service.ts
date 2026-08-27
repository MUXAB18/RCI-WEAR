/**
 * Order API Service
 * CRUD operations for orders and order items
 */

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type CreateOrderInput = {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  company?: string;
  shippingAddress?: string;
  billingAddress?: string;
  items: {
    productId?: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  notes?: string;
  estimatedDelivery?: string | Date | null;
  shipping?: number;
  tax?: number;
  status?: string;
};

export type UpdateOrderInput = {
  status?: string;
  paymentStatus?: string;
  notes?: string;
  shippingAddress?: string;
  billingAddress?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date | null;
  isTrackingArchived?: boolean;
};

// ─── READ ────────────────────────────────────────────────────────────────────

export async function getAllOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: {
          product: {
            select: { id: true, name: true, images: true },
          },
        },
      },
      review: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
        },
      },
    },
  });
}

export async function getOrdersForTracking() {
  return prisma.order.findMany({
    where: { isTrackingArchived: false },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      orderNumber: true,
      customerName: true,
      customerEmail: true,
      status: true,
      trackingNumber: true,
      estimatedDelivery: true,
      notes: true,
      createdAt: true,
      updatedAt: true,
      review: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
        },
      },
    },
  });
}

export async function getOrdersForAdminList() {
  return prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      orderNumber: true,
      customerName: true,
      customerEmail: true,
      customerPhone: true,
      total: true,
      status: true,
      paymentStatus: true,
      trackingNumber: true,
      estimatedDelivery: true,
      notes: true,
      createdAt: true,
      review: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
        },
      },
      items: {
        select: {
          id: true,
          quantity: true,
          price: true,
          name: true,
          product: {
            select: {
              name: true,
              sku: true,
            },
          },
        },
      },
    },
  });
}

export async function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      review: true,
    },
  });
}

export async function getOrderByNumber(orderNumber: string) {
  return prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      review: true,
    },
  });
}

export async function getOrdersByStatus(status: string) {
  return prisma.order.findMany({
    where: { status },
    orderBy: { createdAt: 'desc' },
    include: {
      items: true,
    },
  });
}

export async function getOrdersByCustomer(email: string) {
  return prisma.order.findMany({
    where: { customerEmail: email },
    orderBy: { createdAt: 'desc' },
    include: {
      items: true,
    },
  });
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

export async function createOrder(data: CreateOrderInput) {
  // Generate order number
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  // Calculate totals
  const subtotal = data.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = data.tax ?? (subtotal * 0.0); // Use provided tax or default 0
  const shipping = data.shipping ?? 0; // Use provided shipping or default 0
  const total = subtotal + tax + shipping;

  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      company: data.company,
      shippingAddress: data.shippingAddress,
      billingAddress: data.billingAddress,
      subtotal,
      tax,
      shipping,
      total,
      notes: data.notes,
      estimatedDelivery: data.estimatedDelivery ? new Date(data.estimatedDelivery) : null,
      status: data.status || 'pending',
      items: {
        create: data.items.map(item => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
        })),
      },
    },
    include: {
      items: true,
    },
  });
  
  revalidatePath('/admin/orders');
  return order;
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export async function updateOrder(id: string, data: UpdateOrderInput) {
  const order = await prisma.order.update({
    where: { id },
    data,
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  revalidatePath('/admin/orders');
  return order;
}

export async function updateOrderStatus(id: string, status: string) {
  return updateOrder(id, { status });
}

export async function updatePaymentStatus(id: string, paymentStatus: string) {
  return updateOrder(id, { paymentStatus });
}

// ─── DELETE ──────────────────────────────────────────────────────────────────

export async function deleteOrder(id: string) {
  // Order items will be deleted automatically due to Cascade
  await prisma.order.delete({ where: { id } });
  revalidatePath('/admin/orders');
}

// ─── STATISTICS ──────────────────────────────────────────────────────────────

export async function getOrderStats() {
  const [totalOrders, pendingOrders, completedOrders, totalRevenue] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: 'pending' } }),
    prisma.order.count({ where: { status: 'delivered' } }),
    prisma.order.aggregate({
      where: { paymentStatus: 'paid' },
      _sum: { total: true },
    }),
  ]);

  return {
    totalOrders,
    pendingOrders,
    completedOrders,
    totalRevenue: totalRevenue._sum.total || 0,
  };
}
