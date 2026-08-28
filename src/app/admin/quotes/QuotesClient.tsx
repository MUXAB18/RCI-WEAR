'use client';

import { useState } from 'react';
import { FileText, Edit, Trash2, Send, CheckCircle, XCircle, Archive, Eye } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { Button } from '@/components/admin/ui/Button';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { Badge } from '@/components/admin/ui/Badge';
import { Modal } from '@/components/admin/ui/Modal';
import { ConfirmModal } from '@/components/admin/ui/ConfirmModal';
import { Input } from '@/components/admin/ui/Input';
import { Textarea } from '@/components/admin/ui/Textarea';
import { useRouter } from 'next/navigation';

type QuoteStatus = 'pending' | 'sent' | 'accepted' | 'rejected' | 'expired';

type Quote = {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string | null;
  productType: string;
  quantity: number;
  budget: string | null;
  requirements: string;
  deadline: string | null;
  status: QuoteStatus;
  quoteAmount: number | null;
  validUntil: string | null;
  createdAt: Date;
};

type Props = {
  initialQuotes: any[];
};

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'sent', label: 'Sent' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'expired', label: 'Expired' },
];

const getStatusVariant = (status: QuoteStatus): 'success' | 'warning' | 'danger' | 'info' | 'default' => {
  switch (status) {
    case 'accepted':
      return 'success';
    case 'pending':
      return 'warning';
    case 'rejected':
    case 'expired':
      return 'danger';
    case 'sent':
      return 'info';
    default:
      return 'default';
  }
};

export function QuotesClient({ initialQuotes }: Props) {
  const router = useRouter();
  const [quotes, setQuotes] = useState(initialQuotes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingQuote, setViewingQuote] = useState<Quote | null>(null);
  const [sendingQuote, setSendingQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const [sendFormData, setSendFormData] = useState({
    quoteAmount: '',
    validUntil: '',
  });

  const columns: Column<Quote>[] = [
    {
      key: 'company',
      label: 'Company',
      render: (item) => (
        <div>
          <p className="font-medium text-white">{item.companyName}</p>
          <p className="text-xs text-white/40">{item.contactName}</p>
        </div>
      ),
    },
    {
      key: 'contact',
      label: 'Contact',
      render: (item) => (
        <div>
          <p className="text-white/80 text-sm">{item.email}</p>
          {item.phone && (
            <p className="text-xs text-white/40">{item.phone}</p>
          )}
        </div>
      ),
    },
    {
      key: 'product',
      label: 'Product Type',
      render: (item) => (
        <div>
          <p className="text-white/80">{item.productType}</p>
          <p className="text-xs text-white/40">{item.quantity} units</p>
        </div>
      ),
    },
    {
      key: 'budget',
      label: 'Budget',
      render: (item) => (
        <span className="text-white/60">{item.budget || 'Not specified'}</span>
      ),
    },
    {
      key: 'deadline',
      label: 'Deadline',
      render: (item) => (
        <span className="text-white/60">
          {item.deadline ? new Date(item.deadline).toLocaleDateString() : 'No deadline'}
        </span>
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
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            icon={<Eye className="w-3.5 h-3.5" />}
            onClick={(e) => {
              e.stopPropagation();
              handleView(item);
            }}
          >
            View
          </Button>
          {item.status === 'pending' && (
            <Button
              size="sm"
              variant="ghost"
              icon={<Send className="w-3.5 h-3.5" />}
              onClick={(e) => {
                e.stopPropagation();
                handleSendQuote(item);
              }}
            >
              Send
            </Button>
          )}
          {item.status === 'sent' && (
            <>
              <Button
                size="sm"
                variant="ghost"
                icon={<CheckCircle className="w-3.5 h-3.5" />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange(item.id, 'accepted');
                }}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="danger"
                icon={<XCircle className="w-3.5 h-3.5" />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange(item.id, 'rejected');
                }}
              >
                Reject
              </Button>
            </>
          )}
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

  const handleView = (quote: Quote) => {
    setViewingQuote(quote);
    setIsModalOpen(true);
  };

  const handleSendQuote = (quote: Quote) => {
    setSendingQuote(quote);
    setSendFormData({
      quoteAmount: quote.quoteAmount || 0,
      validUntil: quote.validUntil || '',
    });
  };

  const handleStatusChange = async (id: string, status: QuoteStatus) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/quotes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to update quote status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const executeDelete = async () => {
    if (!deleteId) return;
    
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/quotes/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        setQuotes(quotes.filter((q) => q.id !== deleteId));
      }
    } catch (error) {
      console.error('Failed to delete quote:', error);
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  const handleSendSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sendingQuote) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/admin/quotes/${sendingQuote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'sent',
          quoteAmount: Number(sendFormData.quoteAmount) || 0,
          validUntil: sendFormData.validUntil,
        }),
      });

      if (res.ok) {
        router.refresh();
        setSendingQuote(null);
      }
    } catch (error) {
      console.error('Failed to send quote:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === 'pending').length,
    sent: quotes.filter(q => q.status === 'sent').length,
    accepted: quotes.filter(q => q.status === 'accepted').length,
    rejected: quotes.filter(q => q.status === 'rejected').length,
  };

  return (
    <>
      <PageHeader
        title="Quotes"
        description="Manage quote requests and send proposals"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Total Quotes</p>
          <p className="text-2xl font-semibold text-white">{stats.total}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Pending</p>
          <p className="text-2xl font-semibold text-yellow-500">{stats.pending}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Sent</p>
          <p className="text-2xl font-semibold text-blue-500">{stats.sent}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Accepted</p>
          <p className="text-2xl font-semibold text-green-500">{stats.accepted}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Rejected</p>
          <p className="text-2xl font-semibold text-red-500">{stats.rejected}</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={quotes}
        emptyMessage="No quote requests yet"
        emptyIcon={<FileText className="w-12 h-12" />}
        searchable
        searchPlaceholder="Search quotes..."
      />

      {/* View Quote Modal */}
      <Modal
        isOpen={isModalOpen && viewingQuote !== null}
        onClose={() => {
          setIsModalOpen(false);
          setViewingQuote(null);
        }}
        title="Quote Details"
        footer={
          <Button onClick={() => {
            setIsModalOpen(false);
            setViewingQuote(null);
          }}>
            Close
          </Button>
        }
      >
        {viewingQuote && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/40 mb-1">Company</p>
                <p className="text-white font-medium">{viewingQuote.companyName}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1">Contact Person</p>
                <p className="text-white font-medium">{viewingQuote.contactName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/40 mb-1">Email</p>
                <p className="text-white/80">{viewingQuote.email}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1">Phone</p>
                <p className="text-white/80">{viewingQuote.phone || 'Not provided'}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-white/40 mb-1">Product Type</p>
              <p className="text-white font-medium">{viewingQuote.productType}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/40 mb-1">Quantity</p>
                <p className="text-white">{viewingQuote.quantity} units</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1">Budget</p>
                <p className="text-white">{viewingQuote.budget || 'Not specified'}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-white/40 mb-1">Requirements</p>
              <p className="text-white/80 whitespace-pre-line">{viewingQuote.requirements}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/40 mb-1">Deadline</p>
                <p className="text-white">
                  {viewingQuote.deadline ? new Date(viewingQuote.deadline).toLocaleDateString() : 'No deadline'}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1">Status</p>
                <Badge variant={getStatusVariant(viewingQuote.status)}>
                  {viewingQuote.status.charAt(0).toUpperCase() + viewingQuote.status.slice(1)}
                </Badge>
              </div>
            </div>

            {viewingQuote.quoteAmount && (
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
                <p className="text-xs text-white/40 mb-1">Quote Amount</p>
                <p className="text-2xl font-semibold text-white">${viewingQuote.quoteAmount.toFixed(2)}</p>
                {viewingQuote.validUntil && (
                  <p className="text-xs text-white/60 mt-2">
                    Valid until: {new Date(viewingQuote.validUntil).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            <div>
              <p className="text-xs text-white/40 mb-1">Received</p>
              <p className="text-white/60 text-sm">{new Date(viewingQuote.createdAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Send Quote Modal */}
      <Modal
        isOpen={sendingQuote !== null}
        onClose={() => setSendingQuote(null)}
        title="Send Quote"
        footer={
          <>
            <Button variant="ghost" onClick={() => setSendingQuote(null)}>
              Cancel
            </Button>
            <Button onClick={handleSendSubmit} loading={loading}>
              Send Quote
            </Button>
          </>
        }
      >
        {sendingQuote && (
          <form onSubmit={handleSendSubmit} className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4 mb-4">
              <p className="text-xs text-white/40 mb-1">Company</p>
              <p className="text-white font-medium">{sendingQuote.companyName}</p>
              <p className="text-xs text-white/40 mt-2">Product Type</p>
              <p className="text-white">{sendingQuote.productType} ({sendingQuote.quantity} units)</p>
            </div>

            <Input
              label="Quote Amount (USD)"
              type="number"
              step="0.01"
              value={sendFormData.quoteAmount}
              onChange={(e) => setSendFormData({ ...sendFormData, quoteAmount: e.target.value })}
              required
              placeholder="5000.00"
            />

            <Input
              label="Valid Until"
              type="date"
              value={sendFormData.validUntil}
              onChange={(e) => setSendFormData({ ...sendFormData, validUntil: e.target.value })}
              required
              helperText="When does this quote expire?"
            />
          </form>
        )}
      </Modal>
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={executeDelete}
        title="Delete quote"
        message={`Are you sure you want to delete this quote? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={loading}
      />
    </>
  );
}
