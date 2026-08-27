'use client';

import { useState } from 'react';
import { ArrowLeft, Star, MessageSquare, User, Package, CreditCard, Truck, Calendar, MapPin, Phone, Mail, Building } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { Button } from '@/components/admin/ui/Button';
import { Badge } from '@/components/admin/ui/Badge';
import { Modal } from '@/components/admin/ui/Modal';
import { Select } from '@/components/admin/ui/Select';
import { Input } from '@/components/admin/ui/Input';
import { Textarea } from '@/components/admin/ui/Textarea';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type OrderStatus = 'pending' | 'sourcing' | 'production' | 'qc' | 'packaging' | 'shipped' | 'delivered' | 'cancelled';

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  company: string | null;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  status: OrderStatus;
  paymentStatus: "pending" | "paid" | "failed" | "refunded" | "partial";
  shippingAddress: string | null;
  billingAddress: string | null;
  notes: string | null;
  trackingNumber: string | null;
  estimatedDelivery: Date | null;
  createdAt: Date;
  updatedAt: Date;
  review?: {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
  } | null;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
    product?: {
      id: string;
      name: string;
      images: string[];
    } | null;
  }[];
};

const statusOptions = [
  { value: 'pending', label: 'Order Placed (Pending)' },
  { value: 'sourcing', label: 'Material Sourcing' },
  { value: 'production', label: 'Production (Cutting & Stitching)' },
  { value: 'qc', label: 'Quality Control' },
  { value: 'packaging', label: 'Packaging' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

const getStatusVariant = (status: OrderStatus): 'success' | 'warning' | 'danger' | 'info' | 'default' => {
  switch (status) {
    case 'delivered':
      return 'success';
    case 'shipped':
    case 'packaging':
      return 'info';
    case 'pending':
    case 'sourcing':
      return 'warning';
    case 'cancelled':
      return 'danger';
    case 'production':
    case 'qc':
      return 'info';
    default:
      return 'default';
  }
};

interface Props {
  order: any;
}

export function OrderDetailClient({ order }: Props) {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    status: order.status,
    paymentStatus: order.paymentStatus,
    notes: order.notes || '',
    trackingNumber: order.trackingNumber || '',
    estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery).toISOString().split('T')[0] : '',
  });

  const handleUpdateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.refresh();
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to update order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title={`Order #${order.orderNumber}`}
        description="View and manage order details"
        actions={
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/track/${order.orderNumber}`);
                alert('Tracking link copied!');
              }}
            >
              Copy Tracking Link
            </Button>
            <Button onClick={() => setIsEditModalOpen(true)}>
              Edit Order
            </Button>
            <Link href="/admin/orders">
              <Button variant="ghost" icon={<ArrowLeft className="w-4 h-4" />}>
                Back to Orders
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Status & Timeline */}
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Order Status</h2>
            <div className="flex items-center gap-4 mb-6">
              <Badge variant={getStatusVariant(order.status)} className="text-sm px-4 py-2">
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
              <Badge variant={order.paymentStatus === 'paid' ? 'success' : 'warning'} className="text-sm px-4 py-2">
                Payment: {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </Badge>
            </div>
            
            {order.trackingNumber && (
              <div className="flex items-center gap-2 text-white/60 mb-2">
                <Truck className="w-4 h-4" />
                <span>Tracking: {order.trackingNumber}</span>
              </div>
            )}
            
            {order.estimatedDelivery && (
              <div className="flex items-center gap-2 text-white/60">
                <Calendar className="w-4 h-4" />
                <span>Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                  {item.product?.images?.[0] ? (
                    <img 
                      src={item.product.images[0]} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-white/[0.05] flex items-center justify-center">
                      <Package className="w-6 h-6 text-white/40" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{item.name}</h3>
                    <p className="text-sm text-white/60">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium text-white">${item.subtotal.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Total */}
            <div className="mt-6 pt-6 border-t border-white/[0.08] space-y-2">
              <div className="flex justify-between text-white/60">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              {order.tax > 0 && (
                <div className="flex justify-between text-white/60">
                  <span>Tax:</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
              )}
              {order.shipping > 0 && (
                <div className="flex justify-between text-white/60">
                  <span>Shipping:</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold text-white pt-2 border-t border-white/[0.05]">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Review Section */}
          {order.status === 'delivered' && (
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Customer Review
              </h2>
              
              {order.review ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < order.review!.rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'fill-transparent text-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white font-medium">{order.review.rating}/5 Stars</span>
                    <span className="text-white/40 text-sm">
                      • {new Date(order.review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {order.review.comment && (
                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-white/80 leading-relaxed">{order.review.comment}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white/[0.05] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white/20" />
                  </div>
                  <p className="text-white/60 mb-2">Customer hasn't reviewed yet</p>
                  <p className="text-white/40 text-sm">Review form is available on their tracking page</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Customer Information
            </h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-white font-medium">{order.customerName}</p>
              </div>
              
              <div className="flex items-center gap-2 text-white/60">
                <Mail className="w-4 h-4" />
                <span>{order.customerEmail}</span>
              </div>
              
              {order.customerPhone && (
                <div className="flex items-center gap-2 text-white/60">
                  <Phone className="w-4 h-4" />
                  <span>{order.customerPhone}</span>
                </div>
              )}
              
              {order.company && (
                <div className="flex items-center gap-2 text-white/60">
                  <Building className="w-4 h-4" />
                  <span>{order.company}</span>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Information */}
          {order.shippingAddress && (
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Address
              </h2>
              <p className="text-white/60 leading-relaxed">{order.shippingAddress}</p>
            </div>
          )}

          {/* Billing Information */}
          {order.billingAddress && (
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Billing Address
              </h2>
              <p className="text-white/60 leading-relaxed">{order.billingAddress}</p>
            </div>
          )}

          {/* Order Information */}
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Order Information</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Order Date:</span>
                <span className="text-white">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Last Updated:</span>
                <span className="text-white">{new Date(order.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {order.notes && (
              <div className="mt-4 pt-4 border-t border-white/[0.05]">
                <p className="text-white/60 text-sm mb-2">Admin Notes:</p>
                <p className="text-white/80 text-sm leading-relaxed bg-white/[0.02] p-3 rounded-lg">
                  {order.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Order Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Order"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateOrder} loading={loading}>
              Save Changes
            </Button>
          </>
        }
      >
        <form onSubmit={handleUpdateOrder} className="space-y-4">
          <Select
            label="Order Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as OrderStatus })}
            options={statusOptions}
            required
          />

          <Select
            label="Payment Status"
            value={formData.paymentStatus}
            onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
            options={[
              { value: 'unpaid', label: 'Unpaid' },
              { value: 'paid', label: 'Paid' },
              { value: 'refunded', label: 'Refunded' },
            ]}
          />

          <Input
            label="Tracking Number"
            type="text"
            value={formData.trackingNumber}
            onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
            placeholder="e.g. DHL-123456789"
          />

          <Input
            label="Estimated Delivery Date"
            type="date"
            value={formData.estimatedDelivery}
            onChange={(e) => setFormData({ ...formData, estimatedDelivery: e.target.value })}
          />

          <Textarea
            label="Admin Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Internal notes about this order..."
            rows={3}
          />
        </form>
      </Modal>
    </>
  );
}