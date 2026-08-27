import { AdminShell } from '@/app/admin/layout';
import { ReviewsClient } from './ReviewsClient';
import { getAllReviews, getReviewStats } from '@/lib/api/review.service';

export default async function ReviewsPage() {
  const [reviewsData, stats] = await Promise.all([
    getAllReviews({ limit: 100 }), // Default load first 100
    getReviewStats()
  ]);

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <ReviewsClient initialReviews={reviewsData.data} stats={stats} />
      </div>
    </AdminShell>
  );
}
