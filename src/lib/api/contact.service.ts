/**
 * Contact Inquiry API Service
 */
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type CreateInquiryInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  priority?: string;
};

export type UpdateInquiryInput = {
  status?: string;
  priority?: string;
  assignedTo?: string;
  notes?: string;
};

// ─── READ ────────────────────────────────────────────────────────────────────

export async function getAllInquiries() {
  return prisma.contactInquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getInquiryById(id: string) {
  return prisma.contactInquiry.findUnique({ where: { id } });
}

export async function getInquiriesByStatus(status: string) {
  return prisma.contactInquiry.findMany({
    where: { status },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getInquiriesByPriority(priority: string) {
  return prisma.contactInquiry.findMany({
    where: { priority },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getUnreadInquiries() {
  return prisma.contactInquiry.findMany({
    where: { 
      status: { in: ['new', 'read'] }
    },
    orderBy: { createdAt: 'desc' },
  });
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

export async function createInquiry(data: CreateInquiryInput) {
  const inquiry = await prisma.contactInquiry.create({ 
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      subject: data.subject,
      message: data.message,
      priority: data.priority || 'normal',
    },
  });
  revalidatePath('/admin/contacts');
  return inquiry;
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

export async function updateInquiry(id: string, data: UpdateInquiryInput) {
  const inquiry = await prisma.contactInquiry.update({
    where: { id },
    data,
  });
  revalidatePath('/admin/contacts');
  return inquiry;
}

export async function updateInquiryStatus(id: string, status: 'new' | 'read' | 'replied' | 'archived') {
  return updateInquiry(id, { status });
}

export async function markAsRead(id: string) {
  return updateInquiryStatus(id, 'read');
}

export async function markAsReplied(id: string) {
  return updateInquiryStatus(id, 'replied');
}

export async function archiveInquiry(id: string) {
  return updateInquiryStatus(id, 'archived');
}

// ─── DELETE ──────────────────────────────────────────────────────────────────

export async function deleteInquiry(id: string) {
  await prisma.contactInquiry.delete({ where: { id } });
  revalidatePath('/admin/contacts');
}

// ─── STATISTICS ──────────────────────────────────────────────────────────────

export async function getInquiryStats() {
  const [total, newCount, readCount, repliedCount, archivedCount] = await Promise.all([
    prisma.contactInquiry.count(),
    prisma.contactInquiry.count({ where: { status: 'new' } }),
    prisma.contactInquiry.count({ where: { status: 'read' } }),
    prisma.contactInquiry.count({ where: { status: 'replied' } }),
    prisma.contactInquiry.count({ where: { status: 'archived' } }),
  ]);

  return {
    total,
    newCount,
    readCount,
    repliedCount,
    archivedCount,
    unreadCount: newCount + readCount,
  };
}
