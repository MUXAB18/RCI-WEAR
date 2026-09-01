'use client';

import { useState } from 'react';
import { Plus, LayoutGrid, Edit, Trash2 } from 'lucide-react';
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

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  isPublished: boolean;
  _count: { products: number };
};

type Props = {
  initialCategories: Category[];
};

export function CategoriesClient({ initialCategories }: Props) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    imageUrl: '',
    isPublished: true,
  });

  const columns: Column<Category>[] = [
    {
      key: 'name',
      label: 'Category',
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
              <LayoutGrid className="w-6 h-6 text-white/40" />
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
        <span className="text-white/60">{item._count?.products || 0} products</span>
      ),
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

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      imageUrl: category.imageUrl || '',
      isPublished: category.isPublished,
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
      const res = await fetch(`/api/admin/categories/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories(categories.filter((c) => c.id !== deleteId));
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingCategory
        ? `/api/admin/categories/${editingCategory.id}`
        : '/api/admin/categories';
      
      const method = editingCategory ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.refresh();
        setIsModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to save category:', error);
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
    });
    setEditingCategory(null);
  };

  const handleOpenModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <>
      <PageHeader
        title="Categories"
        description="Organize and manage your product categories"
        actions={
          <Button
            icon={<Plus className="w-4 h-4" />}
            onClick={handleOpenModal}
          >
            Add Category
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={categories}
        emptyMessage="No categories yet"
        emptyIcon={<LayoutGrid className="w-12 h-12" />}
        searchable
        searchPlaceholder="Search categories..."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} loading={loading}>
              {editingCategory ? 'Update' : 'Create'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Category Name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (!editingCategory) {
                setFormData({ 
                  ...formData, 
                  name: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                });
              }
            }}
            required
            placeholder="e.g., T-Shirts"
          />

          <Input
            label="Slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            placeholder="t-shirts"
            helperText="URL-friendly version of the name"
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the category..."
          />

          <ImageUpload
            label="Image"
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
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
              Publish category
            </label>
          </div>
        </form>
      </Modal>
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={executeDelete}
        title="Delete category"
        message={`Are you sure you want to delete this category? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={loading}
      />
    </>
  );
}
