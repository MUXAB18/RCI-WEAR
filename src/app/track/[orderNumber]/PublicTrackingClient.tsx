'use client';

import { useState } from 'react';
import { Package, Truck, CheckCircle2, Factory, PenTool, Scissors, Star, Check } from 'lucide-react';
import { Button } from '@/components/admin/ui/Button';

type PublicOrder = {
  id: string;
  orderNumber: string;
  status: any;
  trackingNumber: string | null;
  estimatedDelivery: Date | null;
  createdAt: Date;
  items: {
    productName: string;
    image: string | null;
    quantity: number;
  }[];
  hasReviewed: boolean;
};

const STAGES = [
  { id: 'pending', label: 'Order Placed', icon: Package },
  { id: 'sourcing', label: 'Material Sourcing', icon: Factory },
  { id: 'production', label: 'Production', icon: Scissors },
  { id: 'qc', label: 'Quality Control', icon: CheckCircle2 },
  { id: 'packaging', label: 'Packaging', icon: Package },
  { id: 'shipped', label: 'Shipped', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle2 },
];

export function PublicTrackingClient({ order }: { order: any }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(order.hasReviewed);

  // Find the index of the current status in our timeline
  const currentStageIndex = STAGES.findIndex(stage => stage.id === order.status);

  // For display purposes, treat cancelled specially
  const isCancelled = order.status === 'cancelled';

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber: order.orderNumber,
          rating,
          comment,
        }),
      });

      if (res.ok) {
        setReviewSubmitted(true);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to submit review');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="font-sans text-4xl font-bold tracking-tight">Track Your Order</h1>
        <p className="font-sans text-xl text-white/60">Order #{order.orderNumber}</p>
      </div>

      {/* Timeline */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8">
        {isCancelled ? (
          <div className="text-center py-8 text-red-500 font-medium text-lg">
            This order has been cancelled.
          </div>
        ) : (
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-8 left-8 right-8 h-1 bg-white/[0.05] -z-10 rounded-full overflow-hidden hidden md:block">
              <div 
                className="h-full bg-white transition-all duration-1000 ease-in-out"
                style={{ width: `${(Math.max(0, currentStageIndex) / (STAGES.length - 1)) * 100}%` }}
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative z-0">
              {STAGES.map((stage, index) => {
                const Icon = stage.icon;
                const isCompleted = index <= currentStageIndex;
                const isCurrent = index === currentStageIndex;
                
                return (
                  <div key={stage.id} className="flex md:flex-col items-center gap-4 md:gap-2 relative">
                    <div 
                      className={`
                        w-16 h-16 rounded-full flex items-center justify-center shrink-0 border-4 transition-colors duration-500
                        ${isCompleted 
                          ? 'bg-white border-[#050505] text-black' 
                          : 'bg-[#111] border-[#050505] text-white/40'}
                        ${isCurrent ? 'ring-2 ring-white/20 ring-offset-4 ring-offset-[#050505]' : ''}
                      `}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="md:text-center flex-1">
                      <p className={`font-medium ${isCompleted ? 'text-white' : 'text-white/40'}`}>
                        {stage.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Order Details & Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8 space-y-6">
          <h2 className="font-sans text-2xl font-bold">Order Details</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <span className="text-white/60">Date Placed</span>
              <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            
            {order.trackingNumber && (
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-white/60">Tracking Number</span>
                <span className="font-medium text-white">{order.trackingNumber}</span>
              </div>
            )}
            
            {order.estimatedDelivery && (
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-white/60">Estimated Delivery</span>
                <span className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8 space-y-6">
          <h2 className="font-sans text-2xl font-bold">Items</h2>
          
          <div className="space-y-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                {item.image ? (
                  <img src={item.image} alt={item.productName} className="w-16 h-16 rounded-lg object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center">
                    <Package className="w-6 h-6 text-white/40" />
                  </div>
                )}
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-white/60">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Section */}
      {order.status === 'delivered' && (
        <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8">
          {reviewSubmitted ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="font-sans text-2xl font-bold">Thank You for Your Feedback!</h2>
              <p className="text-white/60 max-w-md mx-auto">
                Your review helps us improve our manufacturing process and serve you better.
              </p>
            </div>
          ) : (
            <div className="space-y-6 max-w-xl mx-auto">
              <div className="text-center space-y-2">
                <h2 className="font-sans text-2xl font-bold">How did we do?</h2>
                <p className="text-white/60">Please share your experience with this order.</p>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-2 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating 
                            ? 'fill-white text-white' 
                            : 'fill-transparent text-white/20'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <label htmlFor="comment" className="text-sm font-medium text-white/80">
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    placeholder="Tell us about the product quality, fit, and our service..."
                    className="w-full h-32 px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 resize-none transition-colors"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  loading={isSubmitting}
                >
                  Submit Review
                </Button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
