import { NextRequest, NextResponse } from 'next/server';
import { bulkUpdateReviews, bulkDeleteReviews } from '@/lib/api/review.service';

// POST /api/admin/reviews/bulk - Bulk operations on reviews
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, reviewIds, data } = body;

    if (!action || !reviewIds || !Array.isArray(reviewIds)) {
      return NextResponse.json(
        { error: 'Action and reviewIds array are required' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'update':
        if (!data) {
          return NextResponse.json(
            { error: 'Data is required for update action' },
            { status: 400 }
          );
        }
        result = await bulkUpdateReviews(reviewIds, data);
        break;

      case 'delete':
        result = await bulkDeleteReviews(reviewIds);
        break;

      case 'makePublic':
        result = await bulkUpdateReviews(reviewIds, { isPublic: true });
        break;

      case 'makePrivate':
        result = await bulkUpdateReviews(reviewIds, { isPublic: false });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: update, delete, makePublic, makePrivate' },
          { status: 400 }
        );
    }

    return NextResponse.json({ 
      success: true, 
      affected: result.count || reviewIds.length,
      message: `Successfully ${action}d ${result.count || reviewIds.length} review(s)`
    });
  } catch (error: any) {
    console.error('Failed to perform bulk operation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to perform bulk operation' },
      { status: 500 }
    );
  }
}