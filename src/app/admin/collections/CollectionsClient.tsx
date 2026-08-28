'use client';

import { useState } from 'react';
import { Plus, FolderOpen, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { Button } from '@/components/admin/ui/Button';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { Badge } from '@/components/admin/ui/Badge';
import { Modal } from '@/components/admin/ui/Modal';
import { ConfirmModal } from '@/components/admin/ui/ConfirmModal';
import { Input } from '@/components/admin/ui/Input';
import { Textarea } from '@/components/admin/ui/Textarea';
import { ImageUpload } from '@/components/admin/ui/ImageUpload';
import { useRouter } from 'next/navigation';

type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  isPublished: boolean;
  order: number;
  products: { id: string; name: string }[];
};

type Props = {
  initialCollections: Collection[];
};

export function CollectionsClient({ initialCollections }: Props) {
  const router = useRouter();
  const [collections, setCollections] = useState(initialCollections);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    imageUrl: '',
    isPublished: true,
    order: '',
  });

  const columns: Column<Collection>[] = [
    {
      key: 'name',
      label: 'Collection',
      render: (item) => (
        <div className="flex items-center gap-3">
          {item.imageUrl ? (
            <img 
              src={item.imageUrl} 
              alt={item.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-white/40" />
            </div>
          )}
          <div>
            <p className="font-medium text-white">{item.name}</p>
            <p className="text-xs text-white/40">/{item.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'products',
      label: 'Products',
      render: (item) => (
        <span className="text-white/60">{item.products.length} products</span>
      ),
    },
    {
      key: 'order',
      label: 'Order',
      render: (item) => <span className="text-white/60">#{item.order}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => (
        <Badge variant={item.isPublished ? 'success' : 'default'}>
          {item.isPublished ? 'Published' : 'Draft'}
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

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setFormData({
      name: collection.name,
      slug: collection.slug,
      description: collection.description || '',
      imageUrl: collection.imageUrl || '',
      isPublished: collection.isPublished,
      order: collection.order?.toString() || '',
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
      const res = await fetch(`/api/admin/collections/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        setCollections(collections.filter((c) => c.id !== deleteId));
      }
    } catch (error) {
      console.error('Failed to delete collection:', error);
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingCollection
        ? `/api/admin/collections/${editingCollection.id}`
        : '/api/admin/collections';
      
      const method = editingCollection ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        order: Number(formData.order) || 0,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.refresh();
        setIsModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to save collection:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
    description: '',
    imageUrl: '',
    isPublished: true,
    order: '',
    });
    setEditingCollection(null);
  };

  const handleOpenModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <>
      <PageHeader
        title="Collections"
        description="Organize and manage your product collections"
        actions={
          <Button
            icon={<Plus className="w-4 h-4" />}
            onClick={handleOpenModal}
          >
            Add Collection
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={collections}
        emptyMessage="No collections yet"
        emptyIcon={<FolderOpen className="w-12 h-12" />}
        searchable
        searchPlaceholder="Search collections..."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCollection ? 'Edit Collection' : 'Add Collection'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} loading={loading}>
              {editingCollection ? 'Update' : 'Create'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Collection Name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (!editingCollection) {
                setFormData({ 
                  ...formData, 
                  name: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                });
              }
            }}
            required
            placeholder="e.g., Summer Collection"
          />

          <Input
            label="Slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            placeholder="summer-collection"
            helperText="URL-friendly version of the name"
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the collection..."
          />

          <ImageUpload
            label="Image"
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
          />

          <Input
            label="Display Order"
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: e.target.value })}
            helperText="Lower numbers appear first"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="w-4 h-4 rounded border-white/20 bg-white/10 text-white focus:ring-white/30"
            />
            <label htmlFor="isPublished" className="text-sm text-white/80">
              Publish collection
            </label>
          </div>
        </form>
      </Modal>
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={executeDelete}
        title="Delete collection"
        message={`Are you sure you want to delete this collection? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={loading}
      />
    </>
  );
}
