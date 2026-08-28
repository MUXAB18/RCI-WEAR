'use client';

import { useState, useMemo } from 'react';
import { ShoppingBag, Edit, Trash2, Eye, Plus, X, Star, MessageSquare, Download, Filter } from 'lucide-react';
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
  // Custom manufacturing fields
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
  // Cost tracking
  productionCost: number;
  shippingCost: number;
  otherCosts: number;
  profit: number;
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
  
  // Filtering & Selection State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    status: 'pending' as OrderStatus,
    paymentStatus: 'unpaid',
    notes: '',
    trackingNumber: '',
    estimatedDelivery: '',
    productionCost: '',
    shippingCost: '',
    otherCosts: '',
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
    shipping: '',
    tax: '',
    items: [{ name: '', quantity: '1', price: '0' }],
    // Custom fields
    website: '',
    country: '',
    category: '',
    fabric: '',
    gsm: '',
    quantity: '',
    sizes: [] as string[],
    decoration: [] as string[],
    extras: [] as string[],
    colors: '',
    timeline: '',
    budget: '',
    comments: '',
    productionCost: '',
    shippingCost: '',
    otherCosts: '',
  });

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        searchQuery === '' || 
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
      
      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, searchQuery, statusFilter, paymentFilter]);

  const handleExportCSV = () => {
    // Generate CSV from filteredOrders
    const headers = ['Order Number', 'Date', 'Customer Name', 'Customer Email', 'Status', 'Payment Status', 'Total', 'Profit'];
    const rows = filteredOrders.map(o => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.customerName}"`,
      o.customerEmail,
      o.status,
      o.paymentStatus,
      o.total.toFixed(2),
      o.profit ? o.profit.toFixed(2) : '0.00'
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBulkUpdateStatus = async (newStatus: OrderStatus) => {
    if (selectedIds.length === 0) return;
    setLoading(true);
    try {
      // Since we don't have a bulk API yet, we can update them one by one, 
      // or implement the bulk API later. Doing simple parallel fetch for now:
      await Promise.all(selectedIds.map(id => 
        fetch(`/api/admin/orders/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        })
      ));
      
      // Update local state
      setOrders(orders.map(o => selectedIds.includes(o.id) ? { ...o, status: newStatus } : o));
      setSelectedIds([]);
      router.refresh();
    } catch (err) {
      console.error('Bulk update failed', err);
    } finally {
      setLoading(false);
    }
  };

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
      label: 'Financials',
      render: (item) => (
        <div>
          <p className="text-white font-medium">${item.total?.toFixed(2) || '0.00'}</p>
          {item.profit !== undefined && (
             <p className={`text-xs mt-1 font-medium ${item.profit > 0 ? 'text-green-400' : item.profit < 0 ? 'text-red-400' : 'text-white/40'}`}>
               {item.profit > 0 ? '+' : ''}${item.profit.toFixed(2)} Profit
               {item.total > 0 && ` (${Math.round((item.profit / (item.total - item.tax)) * 100)}%)`}
             </p>
          )}
        </div>
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
      productionCost: order.productionCost?.toString() || '',
      shippingCost: order.shippingCost?.toString() || '',
      otherCosts: order.otherCosts?.toString() || '',
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
      const payload = {
        ...formData,
        productionCost: Number(formData.productionCost) || 0,
        shippingCost: Number(formData.shippingCost) || 0,
        otherCosts: Number(formData.otherCosts) || 0,
      };
      
      const res = await fetch(`/api/admin/orders/${editingOrder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
      productionCost: '',
    shippingCost: '',
    otherCosts: '',
    });
    setEditingOrder(null);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...createFormData,
        shipping: Number(createFormData.shipping) || 0,
        tax: Number(createFormData.tax) || 0,
        productionCost: Number(createFormData.productionCost) || 0,
        shippingCost: Number(createFormData.shippingCost) || 0,
        otherCosts: Number(createFormData.otherCosts) || 0,
        items: createFormData.items.map(item => ({
          ...item,
          quantity: Number(item.quantity) || 1,
          price: Number(item.price) || 0,
        }))
      };

      const res = await fetch(`/api/admin/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
      shipping: '',
      tax: '',
      items: [{ name: 'Custom Manufacturing Order', quantity: '1', price: '0' }],
      website: '',
      country: '',
      category: '',
      fabric: '',
      gsm: '',
      quantity: '',
      sizes: [],
      decoration: [],
      extras: [],
      colors: '',
      timeline: '',
      budget: '',
      comments: '',
      productionCost: '',
    shippingCost: '',
    otherCosts: '',
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
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleExportCSV} icon={<Download className="w-4 h-4" />}>
              Export CSV
            </Button>
            <Button onClick={() => setIsCreateModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
              Create Order
            </Button>
          </div>
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

      {/* Filters Toolbar */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Filter className="w-4 h-4" /> Filters:
        </div>
        <div className="w-48">
          <Select
            label=""
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Statuses' },
              ...statusOptions
            ]}
          />
        </div>
        <div className="w-48">
          <Select
            label=""
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Payment Status' },
              { value: 'paid', label: 'Paid' },
              { value: 'unpaid', label: 'Unpaid' },
              { value: 'refunded', label: 'Refunded' }
            ]}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredOrders}
        emptyMessage="No orders found matching filters"
        emptyIcon={<ShoppingBag className="w-12 h-12" />}
        searchable
        searchPlaceholder="Search by order ID, name, or email..."
        onSearch={setSearchQuery}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        bulkActions={
          <div className="flex items-center gap-2">
            <select
              className="bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-1.5 focus:outline-none"
              onChange={(e) => {
                if (e.target.value) {
                  handleBulkUpdateStatus(e.target.value as OrderStatus);
                  e.target.value = ''; // reset
                }
              }}
              defaultValue=""
            >
              <option value="" disabled>Update Status</option>
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        }
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
              
              <div className="mt-4 pt-4 border-t border-white/[0.08] grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-white/40">Category</p>
                  <p className="text-white">{editingOrder.category || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40">Quantity</p>
                  <p className="text-white">{editingOrder.quantity || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40">Fabric & GSM</p>
                  <p className="text-white">{editingOrder.fabric || 'N/A'} ({editingOrder.gsm || 'N/A'})</p>
                </div>
                <div>
                  <p className="text-xs text-white/40">Colors</p>
                  <p className="text-white">{editingOrder.colors || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40">Sizes</p>
                  <p className="text-white">{editingOrder.sizes?.join(', ') || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40">Timeline & Budget</p>
                  <p className="text-white">{editingOrder.timeline || 'N/A'} | {editingOrder.budget || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-white/40">Customer Comments</p>
                  <p className="text-white">{editingOrder.comments || 'N/A'}</p>
                </div>
              </div>
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

          <div className="pt-4 border-t border-white/[0.08]">
            <h3 className="text-sm font-medium text-white mb-4">Cost Tracking (For Profitability)</h3>
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Production Cost ($)"
                type="number"
                min="0"
                step="0.01"
                value={formData.productionCost}
                onChange={(e) => setFormData({ ...formData, productionCost: e.target.value })}
              />
              <Input
                label="Shipping Cost ($)"
                type="number"
                min="0"
                step="0.01"
                value={formData.shippingCost}
                onChange={(e) => setFormData({ ...formData, shippingCost: e.target.value })}
              />
              <Input
                label="Other Costs ($)"
                type="number"
                min="0"
                step="0.01"
                value={formData.otherCosts}
                onChange={(e) => setFormData({ ...formData, otherCosts: e.target.value })}
              />
            </div>
            {editingOrder && (
              <div className="mt-4 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05] space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Total Revenue (excl. Tax):</span>
                  <span className="text-white">${(editingOrder.total - editingOrder.tax).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Total Costs:</span>
                  <span className="text-red-400">-${(Number(formData.productionCost) + Number(formData.shippingCost) + Number(formData.otherCosts)).toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-white/[0.05] flex justify-between items-center">
                  <span className="text-white font-medium">Projected Net Profit:</span>
                  <span className="text-lg font-medium text-green-400">
                    ${((editingOrder.total - editingOrder.tax) - (Number(formData.productionCost) + Number(formData.shippingCost) + Number(formData.otherCosts))).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

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
            <Input
              label="Website"
              value={createFormData.website}
              onChange={(e) => setCreateFormData({ ...createFormData, website: e.target.value })}
            />
            <Input
              label="Country"
              value={createFormData.country}
              onChange={(e) => setCreateFormData({ ...createFormData, country: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Category (e.g. T-Shirts)"
              value={createFormData.category}
              onChange={(e) => setCreateFormData({ ...createFormData, category: e.target.value })}
            />
            <Input
              label="Quantity Required"
              value={createFormData.quantity}
              onChange={(e) => setCreateFormData({ ...createFormData, quantity: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Fabric"
              value={createFormData.fabric}
              onChange={(e) => setCreateFormData({ ...createFormData, fabric: e.target.value })}
            />
            <Input
              label="GSM"
              value={createFormData.gsm}
              onChange={(e) => setCreateFormData({ ...createFormData, gsm: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Colors"
              value={createFormData.colors}
              onChange={(e) => setCreateFormData({ ...createFormData, colors: e.target.value })}
            />
            <Input
              label="Timeline"
              value={createFormData.timeline}
              onChange={(e) => setCreateFormData({ ...createFormData, timeline: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Budget"
              value={createFormData.budget}
              onChange={(e) => setCreateFormData({ ...createFormData, budget: e.target.value })}
            />
            <Input
              label="Sizes (comma separated)"
              value={createFormData.sizes.join(', ')}
              onChange={(e) => setCreateFormData({ ...createFormData, sizes: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Decoration (comma separated)"
              value={createFormData.decoration.join(', ')}
              onChange={(e) => setCreateFormData({ ...createFormData, decoration: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
            />
            <Input
              label="Extras (comma separated)"
              value={createFormData.extras.join(', ')}
              onChange={(e) => setCreateFormData({ ...createFormData, extras: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
            />
          </div>

          <Textarea
            label="Customer Comments"
            value={createFormData.comments}
            onChange={(e) => setCreateFormData({ ...createFormData, comments: e.target.value })}
            rows={2}
          />

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
              onChange={(e) => setCreateFormData({ ...createFormData, shipping: e.target.value })}
            />
            <Input
              label="Tax ($)"
              type="number"
              min="0"
              step="0.01"
              value={createFormData.tax}
              onChange={(e) => setCreateFormData({ ...createFormData, tax: e.target.value })}
            />
          </div>

          <div className="pt-4 border-t border-white/[0.08]">
            <h3 className="text-sm font-medium text-white mb-4">Exact Pricing & Quantity (For Billing)</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Exact Units"
                type="number"
                min="1"
                value={createFormData.items[0].quantity}
                onChange={(e) => {
                  const newItems = [...createFormData.items];
                  newItems[0].quantity = e.target.value;
                  setCreateFormData({ ...createFormData, items: newItems });
                }}
              />
              <Input
                label="Price Per Unit ($)"
                type="number"
                min="0"
                step="0.01"
                value={createFormData.items[0].price}
                onChange={(e) => {
                  const newItems = [...createFormData.items];
                  newItems[0].price = e.target.value;
                  setCreateFormData({ ...createFormData, items: newItems });
                }}
              />
            </div>
            <div className="mt-4 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05] flex justify-between items-center">
              <span className="text-white/60">Calculated Subtotal:</span>
              <span className="text-lg font-medium text-white">
                ${(Number(createFormData.items[0].quantity || 0) * Number(createFormData.items[0].price || 0)).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08]">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-sm font-medium text-white">Expense Tracking (Optional)</h3>
              {createFormData.budget && (
                <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                  Customer Budget: {createFormData.budget}
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Production Cost ($)"
                type="number"
                min="0"
                step="0.01"
                value={createFormData.productionCost}
                onChange={(e) => setCreateFormData({ ...createFormData, productionCost: e.target.value })}
              />
              <Input
                label="Shipping Exp. ($)"
                type="number"
                min="0"
                step="0.01"
                value={createFormData.shippingCost}
                onChange={(e) => setCreateFormData({ ...createFormData, shippingCost: e.target.value })}
              />
              <Input
                label="Other Costs ($)"
                type="number"
                min="0"
                step="0.01"
                value={createFormData.otherCosts}
                onChange={(e) => setCreateFormData({ ...createFormData, otherCosts: e.target.value })}
              />
            </div>
            
            <div className="mt-4 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05] space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Total Revenue (excl. Tax):</span>
                <span className="text-white">
                  ${((Number(createFormData.items[0].quantity) * Number(createFormData.items[0].price)) + Number(createFormData.shipping)).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Total Costs:</span>
                <span className="text-red-400">
                  -${(Number(createFormData.productionCost) + Number(createFormData.shippingCost) + Number(createFormData.otherCosts)).toFixed(2)}
                </span>
              </div>
              <div className="pt-2 border-t border-white/[0.05] flex justify-between items-center">
                <span className="text-white font-medium">Net Profit:</span>
                <span className="text-lg font-medium text-green-400">
                  ${(((Number(createFormData.items[0].quantity) * Number(createFormData.items[0].price)) + Number(createFormData.shipping)) - 
                    (Number(createFormData.productionCost) + Number(createFormData.shippingCost) + Number(createFormData.otherCosts))).toFixed(2)}
                </span>
              </div>
            </div>
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
