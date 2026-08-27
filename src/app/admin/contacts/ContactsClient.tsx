'use client';

import { useState } from 'react';
import { Mail, Edit, Trash2, AlertCircle, Phone, FileText } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { Button } from '@/components/admin/ui/Button';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { Badge } from '@/components/admin/ui/Badge';
import { Modal } from '@/components/admin/ui/Modal';
import { ConfirmModal } from '@/components/admin/ui/ConfirmModal';
import { Select } from '@/components/admin/ui/Select';
import { Textarea } from '@/components/admin/ui/Textarea';
import { useRouter } from 'next/navigation';

type ContactStatus = 'new' | 'read' | 'replied' | 'archived';
type Priority = 'low' | 'normal' | 'high' | 'urgent';

type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  status: ContactStatus;
  priority: Priority;
  notes: string | null;
  assignedTo: string | null;
  createdAt: Date;
};

type Props = {
  initialContacts: any[];
};

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'read', label: 'Read' },
  { value: 'replied', label: 'Replied' },
  { value: 'archived', label: 'Archived' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const getStatusVariant = (status: ContactStatus): 'success' | 'warning' | 'danger' | 'info' | 'default' => {
  switch (status) {
    case 'new':
      return 'info';
    case 'read':
      return 'default';
    case 'replied':
      return 'success';
    case 'archived':
      return 'default';
    default:
      return 'default';
  }
};

const getPriorityVariant = (priority: Priority): 'success' | 'warning' | 'danger' | 'info' | 'default' => {
  switch (priority) {
    case 'urgent':
      return 'danger';
    case 'high':
      return 'warning';
    case 'normal':
      return 'info';
    case 'low':
      return 'default';
    default:
      return 'default';
  }
};

export function ContactsClient({ initialContacts }: Props) {
  const router = useRouter();
  const [contacts, setContacts] = useState(initialContacts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    status: 'new' as ContactStatus,
    priority: 'normal' as Priority,
    notes: '',
    assignedTo: '',
  });

  const columns: Column<Contact>[] = [
    {
      key: 'name',
      label: 'Contact',
      render: (item) => (
        <div>
          <p className="font-medium text-white">
            {item.firstName} {item.lastName}
          </p>
          <p className="text-xs text-white/40">{item.email}</p>
        </div>
      ),
    },
    {
      key: 'subject',
      label: 'Subject',
      render: (item) => (
        <span className="text-white/60">{item.subject || 'No subject'}</span>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (item) => (
        <span className="text-white/60">{item.phone || 'N/A'}</span>
      ),
    },
    {
      key: 'priority',
      label: 'Priority',
      render: (item) => (
        <Badge variant={getPriorityVariant(item.priority)}>
          {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
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
      key: 'date',
      label: 'Received',
      render: (item) => (
        <span className="text-white/60 text-sm">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
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
            icon={<Mail className="w-3.5 h-3.5" />}
            onClick={(e) => {
              e.stopPropagation();
              handleView(item);
            }}
          >
            View
          </Button>
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

  const handleView = (contact: Contact) => {
    setViewingContact(contact);
    
    // Auto-mark as read if it's new
    if (contact.status === 'new') {
      handleQuickStatusChange(contact.id, 'read');
    }
  };

  const handleEdit = (contact: Contact) => {
    setViewingContact(contact);
    setFormData({
      status: contact.status,
      priority: contact.priority,
      notes: contact.notes || '',
      assignedTo: contact.assignedTo || '',
    });
    setIsModalOpen(true);
  };

  const handleQuickStatusChange = async (id: string, status: ContactStatus) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to update contact status:', error);
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
      const res = await fetch(`/api/admin/contacts/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        setContacts(contacts.filter((c) => c.id !== deleteId));
        if (viewingContact?.id === deleteId) {
          setViewingContact(null);
        }
      }
    } catch (error) {
      console.error('Failed to delete contact:', error);
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingContact) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/admin/contacts/${viewingContact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.refresh();
        setIsModalOpen(false);
        setViewingContact(null);
      }
    } catch (error) {
      console.error('Failed to update contact:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const stats = {
    total: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    read: contacts.filter(c => c.status === 'read').length,
    replied: contacts.filter(c => c.status === 'replied').length,
    urgent: contacts.filter(c => c.priority === 'urgent').length,
  };

  return (
    <>
      <PageHeader
        title="Contact Inquiries"
        description="Manage customer inquiries and support requests"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Total</p>
          <p className="text-2xl font-semibold text-white">{stats.total}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">New</p>
          <p className="text-2xl font-semibold text-blue-500">{stats.new}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Read</p>
          <p className="text-2xl font-semibold text-gray-500">{stats.read}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Replied</p>
          <p className="text-2xl font-semibold text-green-500">{stats.replied}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Urgent</p>
          <p className="text-2xl font-semibold text-red-500">{stats.urgent}</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={contacts}
        emptyMessage="No contact inquiries yet"
        emptyIcon={<Mail className="w-12 h-12" />}
        searchable
        searchPlaceholder="Search contacts..."
      />

      {/* View Contact Modal */}
      <Modal
        isOpen={viewingContact !== null && !isModalOpen}
        onClose={() => setViewingContact(null)}
        title="Contact Details"
        footer={
          <>
            <Button variant="ghost" onClick={() => setViewingContact(null)}>
              Close
            </Button>
            <Button
              onClick={() => {
                if (viewingContact) handleEdit(viewingContact);
              }}
            >
              Edit
            </Button>
          </>
        }
      >
        {viewingContact && (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {viewingContact.firstName} {viewingContact.lastName}
                </h3>
                {viewingContact.company && (
                  <p className="text-sm text-white/60">{viewingContact.company}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Badge variant={getPriorityVariant(viewingContact.priority)}>
                  {viewingContact.priority.charAt(0).toUpperCase() + viewingContact.priority.slice(1)}
                </Badge>
                <Badge variant={getStatusVariant(viewingContact.status)}>
                  {viewingContact.status.charAt(0).toUpperCase() + viewingContact.status.slice(1)}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-white/40 mb-1">Email</p>
                <p className="text-white/80">{viewingContact.email}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1">Phone</p>
                <p className="text-white/80">{viewingContact.phone || 'Not provided'}</p>
              </div>
            </div>

            {viewingContact.subject && (
              <div>
                <p className="text-xs text-white/40 mb-1">Subject</p>
                <p className="text-white font-medium">{viewingContact.subject}</p>
              </div>
            )}

            <div>
              <p className="text-xs text-white/40 mb-2">Message</p>
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
                <p className="text-white/80 whitespace-pre-line">{viewingContact.message}</p>
              </div>
            </div>

            {viewingContact.notes && (
              <div>
                <p className="text-xs text-white/40 mb-2">Admin Notes</p>
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
                  <p className="text-white/80 whitespace-pre-line">{viewingContact.notes}</p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-white/[0.08]">
              <p className="text-xs text-white/40 mb-2">Quick Actions</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleQuickStatusChange(viewingContact.id, 'replied')}
                  loading={loading}
                >
                  Mark as Replied
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleQuickStatusChange(viewingContact.id, 'archived')}
                  loading={loading}
                >
                  Archive
                </Button>
                <a href={`mailto:${viewingContact.email}`} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" icon={<Mail className="w-3.5 h-3.5" />}>
                    Reply via Email
                  </Button>
                </a>
              </div>
            </div>

            <div className="text-xs text-white/40">
              Received: {new Date(viewingContact.createdAt).toLocaleString()}
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Contact Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Contact"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} loading={loading}>
              Update
            </Button>
          </>
        }
      >
        {viewingContact && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4 mb-4">
              <p className="text-xs text-white/40 mb-1">Contact</p>
              <p className="text-white font-medium">
                {viewingContact.firstName} {viewingContact.lastName}
              </p>
              <p className="text-xs text-white/60">{viewingContact.email}</p>
            </div>

            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as ContactStatus })}
              options={statusOptions}
              required
            />

            <Select
              label="Priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
              options={priorityOptions}
              required
            />

            <Textarea
              label="Admin Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Internal notes about this inquiry..."
              rows={4}
            />
          </form>
        )}
      </Modal>
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={executeDelete}
        title="Delete contact"
        message={`Are you sure you want to delete this contact? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={loading}
      />
    </>
  );
}
