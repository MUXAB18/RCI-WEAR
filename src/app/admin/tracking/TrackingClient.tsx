'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { Badge } from '@/components/admin/ui/Badge';
import { Button } from '@/components/admin/ui/Button';
import { Select } from '@/components/admin/ui/Select';
import { Package, Factory, Scissors, CheckCircle2, Truck, ExternalLink, Search, Clock, Star, MessageSquare, Trash2, AlertTriangle, X } from 'lucide-react';
import Link from 'next/link';

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  status: any;
  createdAt: Date;
  trackingNumber?: string;
  estimatedDelivery?: string;
  notes?: string;
  review?: {
    id: string;
    rating: number;
    comment?: string;
    createdAt: Date;
  } | null;
};

const STAGES = [
  { id: 'pending', label: 'Order Placed', icon: Package },
  { id: 'sourcing', label: 'Material Sourcing', icon: Factory },
  { id: 'production', label: 'Production', icon: Scissors },
  { id: 'qc', label: 'Quality Control', icon: CheckCircle2 },
  { id: 'packaging', label: 'Packaging', icon: Package },
  { id: 'shipped', label: 'Shipped', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle2 },
] as const;

const statusOptions = STAGES.map(stage => ({
  value: stage.id as string,
  label: stage.label as string
})).concat([{ value: 'cancelled', label: 'Cancelled' }]);

export function TrackingClient({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(orders.length > 0 ? orders[0].id : null);
  const [isSaving, setIsSaving] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  const selectedOrder = orders.find(o => o.id === selectedOrderId);
  const currentStageIndex = selectedOrder ? STAGES.findIndex(stage => stage.id === selectedOrder.status) : -1;

  // Local edit state for the selected order
  const [editForm, setEditForm] = useState({
    status: '',
    trackingNumber: '',
    estimatedDelivery: '',
    notes: ''
  });

  // Whenever a new order is selected, populate the form
  const handleSelectOrder = (order: Order) => {
    setSelectedOrderId(order.id);
    setEditForm({
      status: order.status,
      trackingNumber: order.trackingNumber || '',
      estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery).toISOString().split('T')[0] : '',
      notes: order.notes || ''
    });
  };

  // Initialize form on first load if there's a selected order
  if (selectedOrder && editForm.status === '' && selectedOrder.status !== '') {
    handleSelectOrder(selectedOrder);
  }

  const handleSaveDetails = async () => {
    if (!selectedOrder) return;
    setIsSaving(true);
    try {
      const payload = {
        status: editForm.status,
        trackingNumber: editForm.trackingNumber,
        estimatedDelivery: editForm.estimatedDelivery ? new Date(editForm.estimatedDelivery).toISOString() : null,
        notes: editForm.notes
      };

      const res = await fetch(`/api/admin/orders/${selectedOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const updated = await res.json();
        setOrders(prev => prev.map(o => (o.id === updated.id ? updated : o)));
        alert('Tracking details saved successfully!');
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to save order details');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmArchiveTracking = async () => {
    if (!selectedOrder) return;
    
    setIsArchiveModalOpen(false);
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/orders/${selectedOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isTrackingArchived: true }),
      });

      if (res.ok) {
        const remainingOrders = orders.filter(o => o.id !== selectedOrder.id);
        setOrders(remainingOrders);
        setSelectedOrderId(remainingOrders.length > 0 ? remainingOrders[0].id : null);
        
        // Also update form state if another order was selected
        if (remainingOrders.length > 0) {
          const next = remainingOrders[0];
          setEditForm({
            status: next.status,
            trackingNumber: next.trackingNumber || '',
            estimatedDelivery: next.estimatedDelivery ? new Date(next.estimatedDelivery).toISOString().split('T')[0] : '',
            notes: next.notes || ''
          });
        } else {
          setEditForm({ status: '', trackingNumber: '', estimatedDelivery: '', notes: '' });
        }
      } else {
        throw new Error('Failed to remove from tracking');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to remove order from tracking board');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      <div className="mb-6">
        <PageHeader
          title="Tracking & Fulfillment Center"
          description="Manage manufacturing stages, courier tracking, and fulfillment."
        />
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        {/* Left Panel - Order List */}
        <div className="w-1/3 flex flex-col bg-white/[0.02] border border-white/[0.08] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/[0.08]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-sm"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredOrders.length === 0 ? (
              <div className="p-8 text-center text-white/40">No orders found</div>
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {filteredOrders.map(order => (
                  <button
                    key={order.id}
                    onClick={() => handleSelectOrder(order)}
                    className={`w-full text-left p-4 hover:bg-white/[0.02] transition-colors flex items-center justify-between ${
                      selectedOrderId === order.id ? 'bg-white/[0.04] border-l-2 border-white' : 'pl-[18px]'
                    }`}
                  >
                    <div>
                      <div className="font-mono text-sm text-white/90 mb-1 flex items-center gap-2">
                        #{order.orderNumber.split('-')[1]}
                        {order.status === 'delivered' && order.review && (
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < order.review.rating 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'fill-transparent text-white/20'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                        {order.status === 'delivered' && !order.review && (
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" title="Pending review" />
                        )}
                      </div>
                      <div className="text-sm font-medium text-white/60 mb-2">
                        {order.customerName}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="text-[10px] uppercase tracking-wider">
                          {order.status}
                        </Badge>
                        {order.status === 'delivered' && order.review && (
                          <Badge variant="success" className="text-[10px] uppercase tracking-wider">
                            Reviewed
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Clock className="w-4 h-4 text-white/20 inline-block mb-1" />
                      <div className="text-xs text-white/30 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Tracking Management */}
        <div className="flex-1 bg-white/[0.02] border border-white/[0.08] rounded-xl overflow-y-auto">
          {selectedOrder ? (
            <div className="p-8 space-y-10">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Order Tracking Details</h2>
                  <p className="text-white/40 font-mono text-sm">#{selectedOrder.orderNumber}</p>
                </div>
                <div className="flex items-center gap-3">
                  {selectedOrder.status === 'delivered' && (
                    <Button 
                      variant="danger" 
                      icon={<Trash2 className="w-4 h-4" />} 
                      onClick={() => setIsArchiveModalOpen(true)}
                      loading={isSaving}
                    >
                      Remove from Tracking
                    </Button>
                  )}
                  <Link href={`/admin/orders/${selectedOrder.id}`}>
                    <Button variant="ghost" icon={<ExternalLink className="w-4 h-4" />}>
                      View Full Order
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Visual Timeline */}
              <div className="bg-black/20 rounded-xl p-8 border border-white/[0.05]">
                <h3 className="text-sm font-semibold text-white/80 mb-8 uppercase tracking-widest">Manufacturing Progress</h3>
                <div className="relative">
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
                                : 'bg-[#111] border-[#050505] text-white/20'}
                              ${isCurrent ? 'ring-2 ring-white/20 ring-offset-4 ring-offset-[#050505]' : ''}
                            `}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="md:text-center flex-1">
                            <p className={`text-sm font-medium ${isCompleted ? 'text-white' : 'text-white/40'}`}>
                              {stage.label}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Management Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-white/80 mb-2 block">Current Status</label>
                    <Select
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      options={statusOptions}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-white/80 mb-2 block">Courier Tracking Number</label>
                    <input
                      type="text"
                      value={editForm.trackingNumber}
                      onChange={(e) => setEditForm({ ...editForm, trackingNumber: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="e.g. DHL-123456789"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/80 mb-2 block">Estimated Delivery Date</label>
                    <input
                      type="date"
                      value={editForm.estimatedDelivery}
                      onChange={(e) => setEditForm({ ...editForm, estimatedDelivery: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-6 flex flex-col">
                  <div className="flex-1 flex flex-col">
                    <label className="text-sm font-medium text-white/80 mb-2 block">Internal Tracking Notes</label>
                    <textarea
                      value={editForm.notes}
                      onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                      className="w-full flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                      placeholder="Log tracking updates, courier links, or manufacturing delays here..."
                    />
                  </div>
                </div>
              </div>

              {/* Customer Review Section - Only show for delivered orders */}
              {selectedOrder?.status === 'delivered' && (
                <div className="bg-black/20 rounded-xl p-8 border border-white/[0.05]">
                  <h3 className="text-sm font-semibold text-white/80 mb-8 uppercase tracking-widest flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Customer Review
                  </h3>
                  
                  {selectedOrder.review ? (
                    <div className="space-y-6">
                      {/* Review Rating */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-6 h-6 ${
                                i < selectedOrder.review.rating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'fill-transparent text-white/20'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-lg font-semibold text-white">
                          {selectedOrder.review.rating}/5 Stars
                        </span>
                        <span className="text-white/40 text-sm">
                          • Reviewed on {new Date(selectedOrder.review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {/* Review Comment */}
                      {selectedOrder.review.comment && (
                        <div className="bg-white/[0.05] border border-white/[0.08] rounded-lg p-6">
                          <div className="flex items-start gap-3">
                            <MessageSquare className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-white/60 mb-2">Customer Feedback:</p>
                              <p className="text-white/90 leading-relaxed">{selectedOrder.review.comment}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Review Actions */}
                      <div className="flex items-center gap-4 pt-4 border-t border-white/[0.05]">
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Review Received</span>
                        </div>
                        <button 
                          onClick={() => {
                            const trackingUrl = `${window.location.origin}/track/${selectedOrder.orderNumber}`;
                            navigator.clipboard.writeText(trackingUrl);
                            alert('Customer tracking link copied to clipboard!');
                          }}
                          className="text-xs text-white/60 hover:text-white/80 transition-colors underline"
                        >
                          Copy Customer Link
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-white/[0.05] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8 text-white/20" />
                      </div>
                      <h4 className="text-white/80 font-medium mb-2">Waiting for Customer Review</h4>
                      <p className="text-white/40 text-sm mb-4">
                        Review form is available on the customer's tracking page
                      </p>
                      <div className="flex justify-center gap-4">
                        <button 
                          onClick={() => {
                            const trackingUrl = `${window.location.origin}/track/${selectedOrder.orderNumber}`;
                            navigator.clipboard.writeText(trackingUrl);
                            alert('Customer tracking link copied to clipboard!');
                          }}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors underline"
                        >
                          Copy Customer Tracking Link
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end pt-6 border-t border-white/[0.08]">
                <Button onClick={handleSaveDetails} loading={isSaving} size="lg">
                  Save Tracking Updates
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-white/40">
              <Package className="w-12 h-12 mb-4 opacity-50" />
              <p>Select an order from the list to manage tracking.</p>
            </div>
          )}
        </div>
      </div>

      {/* Custom Archive Modal */}
      {isArchiveModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsArchiveModalOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="p-6 pt-8 text-center">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Remove from Tracking?</h3>
              <p className="text-white/60 mb-6 leading-relaxed">
                Are you sure you want to remove order <span className="text-white font-mono">#{selectedOrder.orderNumber}</span> from the tracking board? <br/><br/>
                Don't worry, this will not delete the order from the system. It will still be available in the main Orders page.
              </p>
              <div className="flex gap-3 w-full">
                <Button variant="ghost" onClick={() => setIsArchiveModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white">
                  Cancel
                </Button>
                <Button variant="danger" onClick={confirmArchiveTracking} loading={isSaving} className="flex-1">
                  Yes, Remove It
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
