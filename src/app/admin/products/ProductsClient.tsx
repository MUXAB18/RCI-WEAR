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
import { MultiImageUpload } from '@/components/admin/ui/MultiImageUpload';
import { useRouter } from 'next/navigation';

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  salePrice: number | null;
  sku: string;
  categoryId: string | null;
  categoryRef: { id: string; name: string } | null;
  images: string[];
  stock: number;
  minOrder: number;
  isFeatured: boolean;
  isPublished: boolean;
  tags: string[];
  collectionId: string | null;
  collection: { id: string; name: string } | null;
  variants: {
    id?: string;
    size: string | null;
    color: string | null;
    sku: string | null;
    price: number | null;
    stock: number;
  }[];
};

type Collection = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
};

type Props = {
  initialProducts: any[];
  collections: Collection[];
  categories: Category[];
};

export function ProductsClient({ initialProducts, collections, categories }: Props) {
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
    price: '',
    salePrice: '',
    sku: '',
    categoryId: '',
    images: [] as string[],
    stock: '',
    minOrder: '',
    isFeatured: false,
    isPublished: true,
    tags: '',
    collectionId: '',
    variants: [] as { size: string; color: string; sku: string; price: string; stock: string }[],
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
        <Badge variant={item.stock > 0 ? 'success' : 'danger'}>
          {item.stock} units
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
      price: String(product.price || ''),
      salePrice: product.salePrice ? String(product.salePrice) : '',
      sku: product.sku || '',
      categoryId: product.categoryId || '',
      images: product.images || [],
      stock: String(product.stock || 0),
      minOrder: String(product.minOrder || 1),
      isFeatured: product.isFeatured,
      isPublished: product.isPublished,
      tags: product.tags.join(', '),
      collectionId: product.collectionId || '',
      variants: product.variants?.map(v => ({
        size: v.size || '',
        color: v.color || '',
        sku: v.sku || '',
        price: v.price ? String(v.price) : '',
        stock: String(v.stock || 0),
      })) || [],
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
        price: Number(formData.price) || 0,
        salePrice: formData.salePrice ? Number(formData.salePrice) : null,
        stock: Number(formData.stock) || 0,
        minOrder: Number(formData.minOrder) || 1,
        images: formData.images,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        collectionId: formData.collectionId || null,
        categoryId: formData.categoryId || null,
        variants: formData.variants.map(v => ({
          size: v.size || null,
          color: v.color || null,
          sku: v.sku || null,
          price: v.price ? Number(v.price) : null,
          stock: Number(v.stock) || 0,
        })),
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
      price: '',
      salePrice: '',
      sku: '',
      categoryId: '',
      images: [],
      stock: '',
      minOrder: '',
      isFeatured: false,
      isPublished: true,
      tags: '',
      collectionId: '',
      variants: [],
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
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              placeholder="29.99"
            />

            <Input
              label="Sale Price (USD)"
              type="number"
              step="0.01"
              value={formData.salePrice}
              onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
              placeholder="19.99"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="SKU"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              placeholder="TSH-001"
            />
            
            <Input
              label="Stock"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              required
              placeholder="100"
            />

            <Input
              label="Min Order Qty"
              type="number"
              value={formData.minOrder}
              onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
              required
              placeholder="1"
            />
          </div>

          <Select
            label="Category"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            options={[
              { value: '', label: 'No Category' },
              ...categories.map(c => ({ value: c.id, label: c.name }))
            ]}
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

          <MultiImageUpload
            label="Images"
            value={formData.images}
            onChange={(images) => setFormData({ ...formData, images })}
            helperText="Upload images or paste URLs"
          />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white/80">Product Variants</label>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                icon={<Plus className="w-3.5 h-3.5" />}
                onClick={() => setFormData({
                  ...formData,
                  variants: [...formData.variants, { size: '', color: '', sku: '', price: '', stock: '0' }]
                })}
              >
                Add Variant
              </Button>
            </div>
            {formData.variants.map((variant, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 bg-white/5 p-3 rounded-lg relative group">
                <div className="col-span-3"><Input placeholder="Size" value={variant.size} onChange={(e) => { const newV = [...formData.variants]; newV[index].size = e.target.value; setFormData({ ...formData, variants: newV }) }} /></div>
                <div className="col-span-3"><Input placeholder="Color" value={variant.color} onChange={(e) => { const newV = [...formData.variants]; newV[index].color = e.target.value; setFormData({ ...formData, variants: newV }) }} /></div>
                <div className="col-span-2"><Input placeholder="SKU" value={variant.sku} onChange={(e) => { const newV = [...formData.variants]; newV[index].sku = e.target.value; setFormData({ ...formData, variants: newV }) }} /></div>
                <div className="col-span-2"><Input placeholder="Price" type="number" value={variant.price} onChange={(e) => { const newV = [...formData.variants]; newV[index].price = e.target.value; setFormData({ ...formData, variants: newV }) }} /></div>
                <div className="col-span-2"><Input placeholder="Stock" type="number" value={variant.stock} onChange={(e) => { const newV = [...formData.variants]; newV[index].stock = e.target.value; setFormData({ ...formData, variants: newV }) }} /></div>
                <button
                  type="button"
                  onClick={() => { const newV = [...formData.variants]; newV.splice(index, 1); setFormData({ ...formData, variants: newV }) }}
                  className="absolute -right-2 -top-2 w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

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
