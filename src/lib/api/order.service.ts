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
  // Cost tracking
  productionCost?: number;
  shippingCost?: number;
  otherCosts?: number;
  // Custom fields
  website?: string | null;
  country?: string | null;
  category?: string | null;
  fabric?: string | null;
  gsm?: string | null;
  quantity?: string | null;
  sizes?: string[];
  decoration?: string[];
  extras?: string[];
  colors?: string | null;
  timeline?: string | null;
  budget?: string | null;
  comments?: string | null;
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
  subtotal?: number;
  tax?: number;
  shipping?: number;
  total?: number;
  items?: { id: string; price: number; subtotal: number; quantity?: number }[];
  // Cost tracking
  productionCost?: number;
  shippingCost?: number;
  otherCosts?: number;
  // Custom fields
  website?: string | null;
  country?: string | null;
  category?: string | null;
  fabric?: string | null;
  gsm?: string | null;
  quantity?: string | null;
  sizes?: string[];
  decoration?: string[];
  extras?: string[];
  colors?: string | null;
  timeline?: string | null;
  budget?: string | null;
  comments?: string | null;
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
      tax: true,
      shipping: true,
      status: true,
      paymentStatus: true,
      trackingNumber: true,
      estimatedDelivery: true,
      notes: true,
      createdAt: true,
      website: true,
      country: true,
      category: true,
      fabric: true,
      gsm: true,
      quantity: true,
      sizes: true,
      decoration: true,
      extras: true,
      colors: true,
      timeline: true,
      budget: true,
      comments: true,
      productionCost: true,
      shippingCost: true,
      otherCosts: true,
      profit: true,
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

  const productionCost = data.productionCost ?? 0;
  const shippingCost = data.shippingCost ?? 0;
  const otherCosts = data.otherCosts ?? 0;
  const profit = (subtotal + shipping) - (productionCost + shippingCost + otherCosts);

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
      productionCost,
      shippingCost,
      otherCosts,
      profit,
      website: data.website,
      country: data.country,
      category: data.category,
      fabric: data.fabric,
      gsm: data.gsm,
      quantity: data.quantity,
      sizes: data.sizes || [],
      decoration: data.decoration || [],
      extras: data.extras || [],
      colors: data.colors,
      timeline: data.timeline,
      budget: data.budget,
      comments: data.comments,
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
  const existingOrder = await prisma.order.findUnique({ where: { id } });
  if (!existingOrder) throw new Error('Order not found');

  const { items, ...orderData } = data;

  const mergedData = { ...existingOrder, ...orderData };
  const profit = (mergedData.subtotal + mergedData.shipping) - 
                 (mergedData.productionCost + mergedData.shippingCost + mergedData.otherCosts);

  if (items && items.length > 0) {
    await prisma.$transaction(
      items.map(item => 
        prisma.orderItem.update({
          where: { id: item.id },
          data: { 
            price: item.price, 
            subtotal: item.subtotal,
            ...(item.quantity !== undefined && { quantity: item.quantity })
          }
        })
      )
    );
  }

  const order = await prisma.order.update({
    where: { id },
    data: {
      ...orderData,
      profit,
    },
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

export async function getDashboardChartData() {
  const orders = await prisma.order.findMany({
    select: {
      status: true,
      total: true,
      createdAt: true,
      paymentStatus: true,
    },
    orderBy: { createdAt: 'asc' }
  });

  // Calculate orders by status
  const ordersByStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(ordersByStatus).map(([name, value]) => ({ name, value }));

  // Calculate revenue over time (group by month/year for simplicity, or just last 30 days)
  // We'll group by month and year
  const revenueByMonth = orders.reduce((acc, order) => {
    // Show total expected revenue to populate the chart even if unpaid
    const date = new Date(order.createdAt);
    const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
    acc[monthYear] = (acc[monthYear] || 0) + order.total;
    return acc;
  }, {} as Record<string, number>);

  const areaData = Object.entries(revenueByMonth).map(([date, revenue]) => ({ date, revenue }));

  return { pieData, areaData };
}
