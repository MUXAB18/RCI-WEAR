import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type ReviewFilters = {
  rating?: number;
  isPublic?: boolean;
  orderId?: string;
};

export type ReviewSortOptions = {
  sortBy?: 'createdAt' | 'rating' | 'customerName';
  sortOrder?: 'asc' | 'desc';
};

export type PaginationOptions = {
  page?: number;
  limit?: number;
};

// ─── PUBLIC CUSTOMER FUNCTIONS ──────────────────────────────────────────────

export async function createReview(orderId: string, data: { rating: number; comment?: string }) {
  // Ensure review doesn't already exist for this order
  const existingReview = await prisma.review.findUnique({
    where: { orderId }
  });

  if (existingReview) {
    throw new Error('A review already exists for this order.');
  }

  // Ensure order is actually delivered
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order || order.status !== 'delivered') {
    throw new Error('Order must be delivered before leaving a review.');
  }

  const review = await prisma.review.create({
    data: {
      orderId,
      rating: data.rating,
      comment: data.comment,
    }
  });

  revalidatePaths();
  return review;
}

export async function getPublicReviews() {
  return prisma.review.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: 'desc' },
    include: {
      order: {
        select: { customerName: true, company: true }
      }
    }
  });
}

// ─── ADMIN FUNCTIONS ─────────────────────────────────────────────────────────

export async function getAllReviews(options: PaginationOptions & ReviewSortOptions & { filters?: ReviewFilters } = {}) {
  const { 
    page = 1, 
    limit = 10, 
    sortBy = 'createdAt', 
    sortOrder = 'desc', 
    filters = {} 
  } = options;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {};
  
  if (filters.rating !== undefined) {
    where.rating = filters.rating;
  }
  
  if (filters.isPublic !== undefined) {
    where.isPublic = filters.isPublic;
  }
  
  if (filters.orderId) {
    where.orderId = filters.orderId;
  }

  // Build orderBy clause
  let orderBy: any;
  if (sortBy === 'customerName') {
    orderBy = {
      order: {
        customerName: sortOrder
      }
    };
  } else {
    orderBy = { [sortBy]: sortOrder };
  }

  const [reviews, totalCount] = await Promise.all([
    prisma.review.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        order: {
          select: {
            id: true,
            orderNumber: true,
            customerName: true,
            customerEmail: true,
            company: true,
            total: true,
            createdAt: true,
          }
        }
      }
    }),
    prisma.review.count({ where })
  ]);

  return {
    data: reviews,
    pagination: {
      page,
      limit,
      total: totalCount,
      pages: Math.ceil(totalCount / limit),
      hasNext: page * limit < totalCount,
      hasPrev: page > 1,
    }
  };
}

export async function getReviewById(id: string) {
  return prisma.review.findUnique({
    where: { id },
    include: {
      order: {
        select: {
          id: true,
          orderNumber: true,
          customerName: true,
          customerEmail: true,
          company: true,
          total: true,
          status: true,
          createdAt: true,
          items: {
            select: {
              name: true,
              quantity: true,
              price: true,
            }
          }
        }
      }
    }
  });
}

export async function updateReview(id: string, data: { 
  isPublic?: boolean; 
  adminNotes?: string;
}) {
  const review = await prisma.review.update({
    where: { id },
    data,
    include: {
      order: {
        select: {
          id: true,
          orderNumber: true,
          customerName: true,
          customerEmail: true,
        }
      }
    }
  });

  revalidatePaths();
  return review;
}

export async function deleteReview(id: string) {
  await prisma.review.delete({
    where: { id }
  });

  revalidatePaths();
}

export async function bulkUpdateReviews(reviewIds: string[], data: { 
  isPublic?: boolean; 
  adminNotes?: string;
}) {
  const result = await prisma.review.updateMany({
    where: {
      id: {
        in: reviewIds
      }
    },
    data
  });

  revalidatePaths();
  return result;
}

export async function bulkDeleteReviews(reviewIds: string[]) {
  const result = await prisma.review.deleteMany({
    where: {
      id: {
        in: reviewIds
      }
    }
  });

  revalidatePaths();
  return result;
}

export async function getReviewStats() {
  const [totalReviews, publicReviews, averageRating, ratingDistribution] = await Promise.all([
    prisma.review.count(),
    prisma.review.count({ where: { isPublic: true } }),
    prisma.review.aggregate({
      _avg: { rating: true }
    }),
    prisma.review.groupBy({
      by: ['rating'],
      _count: { rating: true },
      orderBy: { rating: 'asc' }
    })
  ]);

  return {
    total: totalReviews,
    public: publicReviews,
    private: totalReviews - publicReviews,
    averageRating: averageRating._avg.rating || 0,
    ratingDistribution: ratingDistribution.reduce((acc, item) => {
      acc[item.rating] = item._count.rating;
      return acc;
    }, {} as Record<number, number>)
  };
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function revalidatePaths() {
  revalidatePath('/admin/reviews');
  revalidatePath('/admin/orders');
  revalidatePath('/admin/tracking');
  revalidatePath('/');
}
