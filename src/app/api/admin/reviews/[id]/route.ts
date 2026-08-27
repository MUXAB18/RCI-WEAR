import { NextRequest, NextResponse } from 'next/server';
import { getReviewById, updateReview, deleteReview } from '@/lib/api/review.service';

// GET /api/admin/reviews/[id] - Get specific review
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const review = await getReviewById(id);

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json(review);
  } catch (error: any) {
    console.error('Failed to fetch review:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch review' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/reviews/[id] - Update review (admin actions like making public/private)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { isPublic, adminNotes } = body;

    const review = await updateReview(id, {
      isPublic,
      adminNotes,
    });

    return NextResponse.json(review);
  } catch (error: any) {
    console.error('Failed to update review:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update review' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/reviews/[id] - Delete review (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteReview(id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete review:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete review' },
      { status: 500 }
    );
  }
}