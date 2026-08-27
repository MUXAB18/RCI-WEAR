/**
 * Quote API Service
 * CRUD operations for quote requests
 */

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type CreateQuoteInput = {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  company?: string;
  productType: string;
  quantity: number;
  specifications?: string;
  budget?: string;
  deadline?: Date;
  notes?: string;
};

export type UpdateQuoteInput = {
  status?: string;
  amount?: number;
  notes?: string;
  sentAt?: Date;
  expiresAt?: Date;
};

// ─── READ ────────────────────────────────────────────────────────────────────

export async function getAllQuotes() {
  return prisma.quote.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getQuoteById(id: string) {
  return prisma.quote.findUnique({
    where: { id },
  });
}

export async function getQuoteByNumber(quoteNumber: string) {
  return prisma.quote.findUnique({
    where: { quoteNumber },
  });
}

export async function getQuotesByStatus(status: string) {
  return prisma.quote.findMany({
    where: { status },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getQuotesByCustomer(email: string) {
  return prisma.quote.findMany({
    where: { customerEmail: email },
    orderBy: { createdAt: 'desc' },
  });
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

export async function createQuote(data: CreateQuoteInput) {
  // Generate quote number
  const quoteNumber = `QT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  const quote = await prisma.quote.create({
    data: {
      quoteNumber,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      company: data.company,
      productType: data.productType,
      quantity: data.quantity,
      specifications: data.specifications,
      budget: data.budget,
      deadline: data.deadline,
      notes: data.notes,
    },
  });
  
  revalidatePath('/admin/quotes');
  return quote;
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export async function updateQuote(id: string, data: UpdateQuoteInput) {
  const quote = await prisma.quote.update({
    where: { id },
    data,
  });
  revalidatePath('/admin/quotes');
  return quote;
}

export async function sendQuote(id: string, amount: number, expiresInDays: number = 30) {
  const sentAt = new Date();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiresInDays);

  return updateQuote(id, {
    status: 'sent',
    amount,
    sentAt,
    expiresAt,
  });
}

export async function acceptQuote(id: string) {
  return updateQuote(id, { status: 'accepted' });
}

export async function rejectQuote(id: string) {
  return updateQuote(id, { status: 'rejected' });
}

// ─── DELETE ──────────────────────────────────────────────────────────────────

export async function deleteQuote(id: string) {
  await prisma.quote.delete({ where: { id } });
  revalidatePath('/admin/quotes');
}

// ─── STATISTICS ──────────────────────────────────────────────────────────────

export async function getQuoteStats() {
  const [totalQuotes, pendingQuotes, sentQuotes, acceptedQuotes, totalValue] = await Promise.all([
    prisma.quote.count(),
    prisma.quote.count({ where: { status: 'pending' } }),
    prisma.quote.count({ where: { status: 'sent' } }),
    prisma.quote.count({ where: { status: 'accepted' } }),
    prisma.quote.aggregate({
      where: { status: 'accepted' },
      _sum: { amount: true },
    }),
  ]);

  return {
    totalQuotes,
    pendingQuotes,
    sentQuotes,
    acceptedQuotes,
    totalValue: totalValue._sum.amount || 0,
  };
}
