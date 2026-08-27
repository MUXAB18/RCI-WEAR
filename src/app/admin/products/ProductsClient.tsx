'use client';

import { useState } from 'react';
import { Plus, Package, Edit, Trash2, Star, Image as ImageIcon } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { Button } from '@/components/admin/ui/Button';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { Badge } from '@/components/admin/ui/Badge';
import { Modal } from '@/components/admin/ui/Modal';
import { ConfirmModal } from '@/components/admin/ui/ConfirmModal';
import { Input } from '@/components/admin/ui/Input';
import { Textarea } from '@/components/admin/ui/Textarea';
import { Select } from '@/components/admin/ui/Select';
import { useRouter } from 'next/navigation';

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  sku: string;
  category: string | null;
  images: string[];
  stockLevel: number;
  minOrderQuantity: number;
  isFeatured: boolean;
  isPublished: boolean;
  tags: string[];
  collectionId: string | null;
  collection: { id: string; name: string } | null;
};

type Collection = {
  id: string;
  name: string;
};

type Props = {
  initialProducts: any[];
  collections: Collection[];
};

export function ProductsClient({ initialProducts, collections }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: 0,
    sku: '',
    category: '',
    images: '',
    stockLevel: 0,
    minOrderQuantity: 1,
    isFeatured: false,
    isPublished: true,
    tags: '',
    collectionId: '',
  });

  const columns: Column<Product>[] = [
    {
      key: 'name',
      label: 'Product',
      render: (item) => (
        <div className="flex items-center gap-3">
          {item.images.length > 0 ? (
            <img 
              src={item.images[0]} 
              alt={item.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-white/40" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-white">{item.name}</p>
              {item.isFeatured && (
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              )}
            </div>
            <p className="text-xs text-white/40">{item.sku}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'collection',
      label: 'Collection',
      render: (item) => (
        <span className="text-white/60">
          {item.collection?.name || 'No collection'}
        </span>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      render: (item) => (
        <span className="text-white font-medium">${item.price.toFixed(2)}</span>
      ),
    },
    {
      key: 'stock',
      label: 'Stock',
      render: (item) => (
        <Badge variant={item.stockLevel > 0 ? 'success' : 'danger'}>
          {item.stockLevel} units
        </Badge>
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

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      price: product.price,
      sku: product.sku,
      category: product.category || '',
      images: product.images.join('\n'),
      stockLevel: product.stockLevel,
      minOrderQuantity: product.minOrderQuantity,
      isFeatured: product.isFeatured,
      isPublished: product.isPublished,
      tags: product.tags.join(', '),
      collectionId: product.collectionId || '',
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
      const res = await fetch(`/api/admin/products/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== deleteId));
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products';
      
      const method = editingProduct ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        price: parseFloat(formData.price.toString()),
        stockLevel: parseInt(formData.stockLevel.toString()),
        minOrderQuantity: parseInt(formData.minOrderQuantity.toString()),
        images: formData.images.split('\n').filter(url => url.trim()),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        collectionId: formData.collectionId || null,
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
      console.error('Failed to save product:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: 0,
      sku: '',
      category: '',
      images: '',
      stockLevel: 0,
      minOrderQuantity: 1,
      isFeatured: false,
      isPublished: true,
      tags: '',
      collectionId: '',
    });
    setEditingProduct(null);
  };

  const handleOpenModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <>
      <PageHeader
        title="Products"
        description="Manage your product catalog and inventory"
        actions={
          <Button
            icon={<Plus className="w-4 h-4" />}
            onClick={handleOpenModal}
          >
            Add Product
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={products}
        emptyMessage="No products yet"
        emptyIcon={<Package className="w-12 h-12" />}
        searchable
        searchPlaceholder="Search products..."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} loading={loading}>
              {editingProduct ? 'Update' : 'Create'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <Input
            label="Product Name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (!editingProduct) {
                setFormData({ 
                  ...formData, 
                  name: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                });
              }
            }}
            required
            placeholder="e.g., Premium Cotton T-Shirt"
          />

          <Input
            label="Slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            placeholder="premium-cotton-t-shirt"
            helperText="URL-friendly version of the name"
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Product description..."
            rows={3}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (USD)"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              required
              placeholder="29.99"
            />

            <Input
              label="SKU"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              required
              placeholder="TSH-001"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Stock Level"
              type="number"
              value={formData.stockLevel}
              onChange={(e) => setFormData({ ...formData, stockLevel: parseInt(e.target.value) || 0 })}
              required
              placeholder="100"
            />

            <Input
              label="Min Order Quantity"
              type="number"
              value={formData.minOrderQuantity}
              onChange={(e) => setFormData({ ...formData, minOrderQuantity: parseInt(e.target.value) || 1 })}
              required
              placeholder="1"
            />
          </div>

          <Input
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="e.g., T-Shirts, Hoodies"
          />

          <Select
            label="Collection"
            value={formData.collectionId}
            onChange={(e) => setFormData({ ...formData, collectionId: e.target.value })}
            options={[
              { value: '', label: 'No Collection' },
              ...collections.map(c => ({ value: c.id, label: c.name }))
            ]}
          />

          <Textarea
            label="Image URLs"
            value={formData.images}
            onChange={(e) => setFormData({ ...formData, images: e.target.value })}
            placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
            helperText="One URL per line"
            rows={3}
          />

          <Input
            label="Tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="cotton, premium, summer"
            helperText="Comma-separated tags"
          />

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-white focus:ring-white/30"
              />
              <label htmlFor="isFeatured" className="text-sm text-white/80">
                Featured product
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-white focus:ring-white/30"
              />
              <label htmlFor="isPublished" className="text-sm text-white/80">
                Publish product
              </label>
            </div>
          </div>
        </form>
      </Modal>
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={executeDelete}
        title="Delete product"
        message={`Are you sure you want to delete this product? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={loading}
      />
    </>
  );
}
