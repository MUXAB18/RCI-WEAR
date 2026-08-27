import { NextRequest, NextResponse } from 'next/server';
import { getAllReviews, getReviewStats } from '@/lib/api/review.service';

// GET /api/admin/reviews - Get all reviews with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const rating = searchParams.get('rating');
    const status = searchParams.get('status'); // 'public' | 'private'
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const filters = {
      rating: rating ? parseInt(rating) : undefined,
      isPublic: status === 'public' ? true : status === 'private' ? false : undefined,
    };

    const reviews = await getAllReviews({
      page,
      limit,
      filters,
      sortBy: sortBy as any,
      sortOrder: sortOrder as 'asc' | 'desc',
    });

    const stats = await getReviewStats();

    return NextResponse.json({
      reviews: reviews.data,
      pagination: reviews.pagination,
      stats,
    });
  } catch (error: any) {
    console.error('Failed to fetch reviews:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}