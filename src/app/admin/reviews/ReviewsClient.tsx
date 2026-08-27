'use client';

import { useState } from 'react';
import { Star, Eye, Edit, MessageSquare, ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { Button } from '@/components/admin/ui/Button';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { Badge } from '@/components/admin/ui/Badge';
import { Modal } from '@/components/admin/ui/Modal';
import { Select } from '@/components/admin/ui/Select';
import { Textarea } from '@/components/admin/ui/Textarea';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  isPublic: boolean;
  adminNotes: string | null;
  createdAt: Date;
  order: {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    company: string | null;
    total: number;
  };
};

type ReviewStats = {
  total: number;
  public: number;
  private: number;
  averageRating: number;
  ratingDistribution: Record<number, number>;
};

type Props = {
  initialReviews: any[];
  stats: ReviewStats;
};

export function ReviewsClient({ initialReviews, stats }: Props) {
  const router = useRouter();
  const [reviews, setReviews] = useState(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    isPublic: false,
    adminNotes: '',
  });

  const columns: Column<Review>[] = [
    {
      key: 'orderNumber',
      label: 'Order',
      render: (item) => (
        <div>
          <Link href={`/admin/orders/${item.order.id}`} className="text-white hover:underline flex items-center gap-1 font-medium">
            #{item.order.orderNumber} <ExternalLink className="w-3 h-3" />
          </Link>
          <p className="text-xs text-white/40 mt-1">
            {new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
      render: (item) => (
        <div>
          <p className="text-white">{item.order.customerName}</p>
          <p className="text-xs text-white/40">{item.order.customerEmail}</p>
        </div>
      ),
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (item) => (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < item.rating 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'fill-transparent text-white/20'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-white font-medium">{item.rating}/5</span>
        </div>
      ),
    },
    {
      key: 'comment',
      label: 'Comment',
      render: (item) => (
        <div className="max-w-[300px]">
          {item.comment ? (
            <p className="text-sm text-white/80 line-clamp-2" >"{item.comment}"</p>
          ) : (
            <span className="text-sm text-white/40 italic">No comment provided</span>
          )}
        </div>
      ),
    },
    {
      key: 'visibility',
      label: 'Visibility',
      render: (item) => (
        <Badge variant={item.isPublic ? 'success' : 'default'}>
          {item.isPublic ? 'Public' : 'Private'}
        </Badge>
      ),
    },
    {
      key: 'notes',
      label: 'Internal Notes',
      render: (item) => (
        <div>
          {item.adminNotes ? (
            <MessageSquare className="w-4 h-4 text-blue-400"  />
          ) : (
            <span className="text-white/20">-</span>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            icon={<Edit className="w-3.5 h-3.5" />}
            onClick={() => handleEdit(item)}
          >
            Manage
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      isPublic: review.isPublic,
      adminNotes: review.adminNotes || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/admin/reviews/${editingReview.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updated = await res.json();
        setReviews(reviews.map(r => r.id === updated.id ? updated : r));
        router.refresh();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to update review:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Reviews"
        description="Manage product and order reviews from customers"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Average Rating</p>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <p className="text-2xl font-semibold text-white">{stats.averageRating.toFixed(1)}</p>
          </div>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Total Reviews</p>
          <p className="text-2xl font-semibold text-white">{stats.total}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Public (Visible)</p>
          <p className="text-2xl font-semibold text-green-500">{stats.public}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Private (Hidden)</p>
          <p className="text-2xl font-semibold text-white/60">{stats.private}</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={reviews}
        emptyMessage="No reviews found"
        emptyIcon={<Star className="w-12 h-12" />}
        searchable
        searchPlaceholder="Search by customer, order, or comment..."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Review Details"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} loading={loading}>
              Save Changes
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {editingReview && (
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs text-white/40 mb-1">Customer</p>
                  <p className="text-white text-sm font-medium">{editingReview.order.customerName}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < editingReview.rating 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'fill-transparent text-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {editingReview.comment && (
                <div className="mt-3 pt-3 border-t border-white/[0.08]">
                  <p className="text-xs text-white/40 mb-1">Review Comment</p>
                  <p className="text-white/80 italic text-sm">"{editingReview.comment}"</p>
                </div>
              )}
            </div>
          )}

          <Select
            label="Visibility Status"
            value={formData.isPublic ? 'public' : 'private'}
            onChange={(e) => setFormData({ ...formData, isPublic: e.target.value === 'public' })}
            options={[
              { value: 'private', label: 'Private (Hidden from public site)' },
              { value: 'public', label: 'Public (Visible on public site)' },
            ]}
          />

          <Textarea
            label="Admin Notes (Internal only)"
            value={formData.adminNotes}
            onChange={(e) => setFormData({ ...formData, adminNotes: e.target.value })}
            placeholder="Add internal notes about this review..."
            rows={3}
          />
        </form>
      </Modal>
    </>
  );
}
