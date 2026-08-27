'use client';

import { useState } from 'react';
import { ShoppingBag, Edit, Trash2, Eye, Plus, X, Star, MessageSquare } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { Button } from '@/components/admin/ui/Button';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { Badge } from '@/components/admin/ui/Badge';
import { Modal } from '@/components/admin/ui/Modal';
import { ConfirmModal } from '@/components/admin/ui/ConfirmModal';
import { Input } from '@/components/admin/ui/Input';
import { Select } from '@/components/admin/ui/Select';
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
  total: number;
  status: OrderStatus;
  paymentStatus: "pending" | "paid" | "failed" | "refunded" | "partial";
  shippingAddress: string | null;
  billingAddress: string | null;
  notes: string | null;
  trackingNumber: string | null;
  estimatedDelivery: Date | null;
  createdAt: Date;
  review?: {
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
  } | null;
  items: {
    id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
      sku: string;
    };
  }[];
};

type Props = {
  initialOrders: any[];
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

export function OrdersClient({ initialOrders }: Props) {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    status: 'pending' as OrderStatus,
    paymentStatus: 'unpaid',
    notes: '',
    trackingNumber: '',
    estimatedDelivery: '',
  });

  const [createFormData, setCreateFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    company: '',
    shippingAddress: '',
    notes: '',
    status: 'pending' as OrderStatus,
    estimatedDelivery: '',
    shipping: 0,
    tax: 0,
    items: [{ name: '', quantity: 1, price: 0 }],
  });

  const columns: Column<Order>[] = [
    {
      key: 'orderNumber',
      label: 'Order',
      render: (item) => (
        <div>
          <p className="font-medium text-white">#{item.orderNumber}</p>
          <p className="text-xs text-white/40">
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
          <p className="text-white">{item.customerName}</p>
          <p className="text-xs text-white/40">{item.customerEmail}</p>
        </div>
      ),
    },
    {
      key: 'items',
      label: 'Items',
      render: (item) => (
        <span className="text-white/60">{item.items.length} item(s)</span>
      ),
    },
    {
      key: 'total',
      label: 'Total',
      render: (item) => (
        <span className="text-white font-medium">${item.total?.toFixed(2) || '0.00'}</span>
      ),
    },
    {
      key: 'payment',
      label: 'Payment',
      render: (item) => (
        <Badge variant={item.paymentStatus === 'paid' ? 'success' : 'warning'}>
          {item.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => (
        <Badge variant={getStatusVariant(item.status)}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'review',
      label: 'Review',
      render: (item) => {
        if (item.status !== 'delivered') {
          return <span className="text-white/40 text-xs">N/A</span>;
        }
        
        if (item.review) {
          return (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < item.review!.rating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'fill-transparent text-white/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-white/60">({item.review.rating}/5)</span>
              {item.review.comment && (
                <MessageSquare className="w-3 h-3 text-blue-400"  />
              )}
            </div>
          );
        }
        
        return (
          <Badge variant="warning" className="text-xs">
            Pending Review
          </Badge>
        );
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(`${window.location.origin}/track/${item.orderNumber}`);
              alert('Tracking link copied!');
            }}
          >
            Copy Link
          </Button>
          <Link href={`/admin/orders/${item.id}`}>
            <Button
              size="sm"
              variant="ghost"
              icon={<Eye className="w-3.5 h-3.5" />}
            >
              View
            </Button>
          </Link>
          <Button
            size="sm"
            variant="ghost"
            icon={<Edit className="w-3.5 h-3.5" />}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(item);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            icon={<Trash2 className="w-3.5 h-3.5" />}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(item.id);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setFormData({
      status: order.status,
      paymentStatus: order.paymentStatus,
      notes: order.notes || '',
      trackingNumber: order.trackingNumber || '',
      estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery).toISOString().split('T')[0] : '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const executeDelete = async () => {
    if (!deleteId) return;
    
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        setOrders(orders.filter((o) => o.id !== deleteId));
      }
    } catch (error) {
      console.error('Failed to delete order:', error);
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/admin/orders/${editingOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.refresh();
        setIsModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to update order:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      status: 'pending',
      paymentStatus: 'unpaid',
      notes: '',
      trackingNumber: '',
      estimatedDelivery: '',
    });
    setEditingOrder(null);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createFormData),
      });

      if (res.ok) {
        const newOrder = await res.json();
        setOrders([newOrder, ...orders]);
        setIsCreateModalOpen(false);
        resetCreateForm();
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to create order:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetCreateForm = () => {
    setCreateFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      company: '',
      shippingAddress: '',
      notes: '',
      status: 'pending',
      estimatedDelivery: '',
      shipping: 0,
      tax: 0,
      items: [{ name: '', quantity: 1, price: 0 }],
    });
  };

  // Calculate statistics
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => ['sourcing', 'production', 'qc', 'packaging'].includes(o.status)).length,
    completed: orders.filter(o => o.status === 'delivered').length,
    revenue: orders.reduce((sum, o) => sum + (o.total || 0), 0),
    reviews: orders.filter(o => o.review !== null).length,
    deliveredOrders: orders.filter(o => o.status === 'delivered').length,
  };

  return (
    <>
      <PageHeader
        title="Orders"
        description="Manage customer orders and track fulfillment"
        actions={
          <Button onClick={() => setIsCreateModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
            Create Order
          </Button>
        }
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Total Orders</p>
          <p className="text-2xl font-semibold text-white">{stats.total}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Pending</p>
          <p className="text-2xl font-semibold text-yellow-500">{stats.pending}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Processing</p>
          <p className="text-2xl font-semibold text-blue-500">{stats.processing}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Completed</p>
          <p className="text-2xl font-semibold text-green-500">{stats.completed}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Reviews</p>
          <p className="text-2xl font-semibold text-purple-500">
            {stats.reviews}/{stats.deliveredOrders}
          </p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Revenue</p>
          <p className="text-2xl font-semibold text-white">${stats.revenue.toFixed(2)}</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={orders}
        emptyMessage="No orders yet"
        emptyIcon={<ShoppingBag className="w-12 h-12" />}
        searchable
        searchPlaceholder="Search orders..."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingOrder ? "Edit Order" : "Order Details"}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} loading={loading}>
              Update Order
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {editingOrder && (
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4 mb-4">
              <p className="text-xs text-white/40 mb-1">Order Number</p>
              <p className="text-white font-medium">#{editingOrder.orderNumber}</p>
              <p className="text-xs text-white/40 mt-2">Customer</p>
              <p className="text-white">{editingOrder.customerName}</p>
              <p className="text-xs text-white/60">{editingOrder.customerEmail}</p>
            </div>
          )}

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
            label="Tracking Number (if shipped)"
            type="text"
            value={formData.trackingNumber}
            onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
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

      {/* Create Order Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Order"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSubmit} loading={loading}>
              Create Order
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Customer Name *"
              value={createFormData.customerName}
              onChange={(e) => setCreateFormData({ ...createFormData, customerName: e.target.value })}
              required
            />
            <Input
              label="Customer Email *"
              type="email"
              value={createFormData.customerEmail}
              onChange={(e) => setCreateFormData({ ...createFormData, customerEmail: e.target.value })}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              value={createFormData.customerPhone}
              onChange={(e) => setCreateFormData({ ...createFormData, customerPhone: e.target.value })}
            />
            <Input
              label="Company Name"
              value={createFormData.company}
              onChange={(e) => setCreateFormData({ ...createFormData, company: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Initial Status"
              value={createFormData.status}
              onChange={(e) => setCreateFormData({ ...createFormData, status: e.target.value as OrderStatus })}
              options={statusOptions}
              required
            />
            <Input
              label="Estimated Delivery Date"
              type="date"
              value={createFormData.estimatedDelivery}
              onChange={(e) => setCreateFormData({ ...createFormData, estimatedDelivery: e.target.value })}
            />
          </div>

          <Textarea
            label="Shipping Address"
            value={createFormData.shippingAddress}
            onChange={(e) => setCreateFormData({ ...createFormData, shippingAddress: e.target.value })}
            rows={2}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Shipping Cost ($)"
              type="number"
              min="0"
              step="0.01"
              value={createFormData.shipping}
              onChange={(e) => setCreateFormData({ ...createFormData, shipping: parseFloat(e.target.value) || 0 })}
            />
            <Input
              label="Tax ($)"
              type="number"
              min="0"
              step="0.01"
              value={createFormData.tax}
              onChange={(e) => setCreateFormData({ ...createFormData, tax: parseFloat(e.target.value) || 0 })}
            />
          </div>

          <div className="pt-2 border-t border-white/[0.08]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-white">Order Items</h3>
              <Button
                size="sm"
                variant="ghost"
                type="button"
                onClick={() => setCreateFormData({
                  ...createFormData,
                  items: [...createFormData.items, { name: '', quantity: 1, price: 0 }]
                })}
              >
                + Add Item
              </Button>
            </div>
            
            {createFormData.items.map((item, index) => (
              <div key={index} className="flex gap-2 mb-4 items-start">
                <div className="flex-1">
                  <Textarea
                    placeholder="Item details (Name, size, color, unit type, etc.)"
                    value={item.name}
                    onChange={(e) => {
                      const newItems = [...createFormData.items];
                      newItems[index].name = e.target.value;
                      setCreateFormData({ ...createFormData, items: newItems });
                    }}
                    rows={2}
                    required
                  />
                </div>
                <div className="w-24">
                  <Input
                    type="number"
                    min="1"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => {
                      const newItems = [...createFormData.items];
                      newItems[index].quantity = parseInt(e.target.value) || 1;
                      setCreateFormData({ ...createFormData, items: newItems });
                    }}
                    required
                  />
                </div>
                <div className="w-32">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Price per unit"
                    value={item.price}
                    onChange={(e) => {
                      const newItems = [...createFormData.items];
                      newItems[index].price = parseFloat(e.target.value) || 0;
                      setCreateFormData({ ...createFormData, items: newItems });
                    }}
                    required
                  />
                </div>
                {createFormData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newItems = createFormData.items.filter((_, i) => i !== index);
                      setCreateFormData({ ...createFormData, items: newItems });
                    }}
                    className="p-3 mt-1 text-white/40 hover:text-red-500 hover:bg-white/[0.05] rounded-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <Textarea
            label="Internal Notes"
            value={createFormData.notes}
            onChange={(e) => setCreateFormData({ ...createFormData, notes: e.target.value })}
            placeholder="Special instructions or internal notes..."
            rows={2}
          />
        </form>
      </Modal>
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={executeDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete this order? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={loading}
      />
    </>
  );
}
