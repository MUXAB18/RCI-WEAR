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
import toast from 'react-hot-toast';

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
  // Custom Fields
  website: string | null;
  country: string | null;
  category: string | null;
  fabric: string | null;
  gsm: string | null;
  quantity: string | null;
  sizes: string[];
  decoration: string[];
  extras: string[];
  colors: string | null;
  timeline: string | null;
  budget: string | null;
  comments: string | null;
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

const getValidNextStatuses = (currentStatus: OrderStatus): OrderStatus[] => {
  const flow: OrderStatus[] = ['pending', 'sourcing', 'production', 'qc', 'packaging', 'shipped', 'delivered'];
  if (currentStatus === 'cancelled') return ['pending']; // Re-open
  const currentIndex = flow.indexOf(currentStatus);
  if (currentIndex === -1 || currentIndex === flow.length - 1) return [currentStatus]; // Delivered or unknown
  // Can go to next step, or cancel, or stay
  return [currentStatus, flow[currentIndex + 1], 'cancelled'];
};

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
  const [isEditPricingModalOpen, setIsEditPricingModalOpen] = useState(false);
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
        toast.success('Order updated successfully');
        router.refresh();
        setIsEditModalOpen(false);
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to update order');
      }
    } catch (error) {
      console.error('Failed to update order:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const [pricingFormData, setPricingFormData] = useState({
    shipping: order.shipping.toString(),
    tax: order.tax.toString(),
    productionCost: order.productionCost?.toString() || '0',
    shippingCost: order.shippingCost?.toString() || '0',
    otherCosts: order.otherCosts?.toString() || '0',
    items: order.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price.toString(),
    }))
  });

  const handleUpdatePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const subtotal = pricingFormData.items.reduce((sum: number, item: any) => sum + (Number(item.price) * item.quantity), 0);
      const tax = Number(pricingFormData.tax);
      const shipping = Number(pricingFormData.shipping);
      const total = subtotal + tax + shipping;

      const payload = {
        subtotal,
        tax,
        shipping,
        total,
        productionCost: Number(pricingFormData.productionCost),
        shippingCost: Number(pricingFormData.shippingCost),
        otherCosts: Number(pricingFormData.otherCosts),
        items: pricingFormData.items.map((item: any) => ({
          id: item.id,
          price: Number(item.price),
          quantity: Number(item.quantity),
          subtotal: Number(item.price) * Number(item.quantity)
        }))
      };

      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success('Pricing updated successfully');
        router.refresh();
        setIsEditPricingModalOpen(false);
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to update pricing');
      }
    } catch (error) {
      console.error('Failed to update pricing:', error);
      toast.error('An unexpected error occurred');
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Order Items</h2>
              <Button variant="ghost" className="text-sm px-3 py-1.5" onClick={() => setIsEditPricingModalOpen(true)}>
                Edit Pricing
              </Button>
            </div>
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
            
            {/* Cost Tracking & Profitability */}
            <div className="mt-6 pt-6 border-t border-white/[0.08] space-y-2">
              <h3 className="text-sm font-medium text-white mb-3">Profitability Analysis</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <p className="text-white/40 mb-1">Production Cost</p>
                  <p className="text-white font-medium">${(order.productionCost || 0).toFixed(2)}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <p className="text-white/40 mb-1">Shipping Cost</p>
                  <p className="text-white font-medium">${(order.shippingCost || 0).toFixed(2)}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <p className="text-white/40 mb-1">Other Costs</p>
                  <p className="text-white font-medium">${(order.otherCosts || 0).toFixed(2)}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <p className="text-white/40 mb-1">Net Profit</p>
                  <p className={`font-medium ${order.profit > 0 ? 'text-green-400' : order.profit < 0 ? 'text-red-400' : 'text-white'}`}>
                    ${(order.profit || 0).toFixed(2)}
                    {order.total > 0 && order.profit !== undefined && ` (${Math.round((order.profit / (order.total - order.tax)) * 100)}%)`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customization Details (if any custom fields are present) */}
          {(order.category || order.fabric || order.colors || (order.sizes && order.sizes.length > 0) || (order.decoration && order.decoration.length > 0) || (order.extras && order.extras.length > 0) || order.comments) && (
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Customization Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.category && (
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider">Category</span>
                    <p className="text-white text-sm mt-1">{order.category}</p>
                  </div>
                )}
                {order.fabric && (
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider">Fabric</span>
                    <p className="text-white text-sm mt-1">{order.fabric}</p>
                  </div>
                )}
                {order.gsm && (
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider">GSM</span>
                    <p className="text-white text-sm mt-1">{order.gsm}</p>
                  </div>
                )}
                {order.colors && (
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider">Colors</span>
                    <p className="text-white text-sm mt-1">{order.colors}</p>
                  </div>
                )}
                {order.quantity && (
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider">Est. Quantity</span>
                    <p className="text-white text-sm mt-1">{order.quantity}</p>
                  </div>
                )}
                {order.sizes && order.sizes.length > 0 && (
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider">Sizes</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {order.sizes.map((size: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 bg-white/10 text-white rounded text-xs">{size}</span>
                      ))}
                    </div>
                  </div>
                )}
                {order.decoration && order.decoration.length > 0 && (
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider">Decoration</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {order.decoration.map((dec: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 bg-white/10 text-white rounded text-xs">{dec}</span>
                      ))}
                    </div>
                  </div>
                )}
                {order.extras && order.extras.length > 0 && (
                  <div>
                    <span className="text-white/40 text-xs uppercase tracking-wider">Extras</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {order.extras.map((extra: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 bg-white/10 text-white rounded text-xs">{extra}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {order.comments && (
                <div className="mt-4 pt-4 border-t border-white/[0.05]">
                  <span className="text-white/40 text-xs uppercase tracking-wider">Customer Comments</span>
                  <p className="text-white text-sm mt-2 leading-relaxed bg-white/[0.02] p-4 rounded-lg">{order.comments}</p>
                </div>
              )}
            </div>
          )}

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

          {/* Project Details (if custom) */}
          {(order.website || order.country || order.timeline || order.budget) && (
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Project Details</h2>
              <div className="space-y-3 text-sm">
                {order.website && (
                  <div>
                    <span className="text-white/40 block mb-1">Website/Social:</span>
                    <a href={order.website.startsWith('http') ? order.website : `https://${order.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">
                      {order.website}
                    </a>
                  </div>
                )}
                {order.country && (
                  <div className="flex justify-between">
                    <span className="text-white/40">Country:</span>
                    <span className="text-white">{order.country}</span>
                  </div>
                )}
                {order.timeline && (
                  <div className="flex justify-between">
                    <span className="text-white/40">Timeline:</span>
                    <span className="text-white">{order.timeline}</span>
                  </div>
                )}
                {order.budget && (
                  <div className="flex justify-between">
                    <span className="text-white/40">Budget:</span>
                    <span className="text-white">{order.budget}</span>
                  </div>
                )}
              </div>
            </div>
          )}

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
            options={statusOptions.filter(opt => getValidNextStatuses(order.status).includes(opt.value as OrderStatus) || opt.value === order.status)}
            required
            helperText="Order status can only progress forward sequentially or be cancelled."
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

      {/* Edit Pricing Modal */}
      <Modal
        isOpen={isEditPricingModalOpen}
        onClose={() => setIsEditPricingModalOpen(false)}
        title="Edit Quoted Price"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsEditPricingModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePricing} loading={loading}>
              Save Pricing
            </Button>
          </>
        }
      >
        <form onSubmit={handleUpdatePricing} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-white/80 text-sm">Order Items</h3>
            {pricingFormData.items.map((item: any, index: number) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="flex-1">
                  <p className="text-sm text-white/80">{item.name}</p>
                </div>
                <div className="w-24">
                  <Input
                    label="Qty"
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => {
                      const newItems = [...pricingFormData.items];
                      newItems[index].quantity = e.target.value;
                      setPricingFormData({ ...pricingFormData, items: newItems });
                    }}
                    required
                  />
                </div>
                <div className="w-32">
                  <Input
                    label="Unit Price ($)"
                    type="number"
                    step="0.01"
                    min="0"
                    value={item.price}
                    onChange={(e) => {
                      const newItems = [...pricingFormData.items];
                      newItems[index].price = e.target.value;
                      setPricingFormData({ ...pricingFormData, items: newItems });
                    }}
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Shipping Charged ($)"
              type="number"
              step="0.01"
              min="0"
              value={pricingFormData.shipping}
              onChange={(e) => setPricingFormData({ ...pricingFormData, shipping: e.target.value })}
            />
            <Input
              label="Tax ($)"
              type="number"
              step="0.01"
              min="0"
              value={pricingFormData.tax}
              onChange={(e) => setPricingFormData({ ...pricingFormData, tax: e.target.value })}
            />
          </div>

          <div className="pt-4 border-t border-white/[0.08]">
            <h3 className="font-medium text-white/80 text-sm mb-4">Internal Cost Tracking</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Production Cost ($)"
                type="number"
                step="0.01"
                min="0"
                value={pricingFormData.productionCost}
                onChange={(e) => setPricingFormData({ ...pricingFormData, productionCost: e.target.value })}
              />
              <Input
                label="Shipping Cost ($)"
                type="number"
                step="0.01"
                min="0"
                value={pricingFormData.shippingCost}
                onChange={(e) => setPricingFormData({ ...pricingFormData, shippingCost: e.target.value })}
              />
              <Input
                label="Other Costs ($)"
                type="number"
                step="0.01"
                min="0"
                value={pricingFormData.otherCosts}
                onChange={(e) => setPricingFormData({ ...pricingFormData, otherCosts: e.target.value })}
              />
            </div>
          </div>
          
        </form>
      </Modal>
    </>
  );
}