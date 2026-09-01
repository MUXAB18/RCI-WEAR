'use client';

import { useState } from 'react';
import { Package, Edit, ExternalLink, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { Button } from '@/components/admin/ui/Button';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { Badge } from '@/components/admin/ui/Badge';
import { Modal } from '@/components/admin/ui/Modal';
import { Input } from '@/components/admin/ui/Input';
import { useRouter } from 'next/navigation';

type Product = {
  id: string;
  name: string;
  sku: string;
  images: string[];
  stock: number;
  variants: {
    id?: string;
    size: string | null;
    color: string | null;
    sku: string | null;
    stock: number;
  }[];
};

type Props = {
  initialProducts: any[];
};

export function InventoryClient({ initialProducts }: Props) {
  const router = useRouter();
  
  // Flatten products and variants into inventory items
  const inventoryItems = initialProducts.flatMap(product => {
    const items = [];
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach((v: any) => {
        items.push({
          id: `${product.id}-${v.id || Math.random()}`,
          productId: product.id,
          name: `${product.name} - ${v.size || ''} ${v.color || ''}`.trim(),
          sku: v.sku || product.sku,
          image: product.images[0],
          stock: v.stock,
          isVariant: true,
          variantData: v,
          productData: product,
        });
      });
    } else {
      items.push({
        id: product.id,
        productId: product.id,
        name: product.name,
        sku: product.sku,
        image: product.images[0],
        stock: product.stock,
        isVariant: false,
        productData: product,
      });
    }
    return items;
  }).sort((a, b) => a.stock - b.stock);

  const [items, setItems] = useState(inventoryItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [newStock, setNewStock] = useState('');

  const columns: Column<any>[] = [
    {
      key: 'name',
      label: 'Item',
      render: (item) => (
        <div className="flex items-center gap-3">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-white/40" />
            </div>
          )}
          <div>
            <p className="font-medium text-white flex items-center gap-2">
              {item.name}
              {item.stock <= 5 && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
            </p>
            <p className="text-xs text-white/40">{item.sku}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (item) => (
        <span className="text-white/60 text-sm">
          {item.isVariant ? 'Variant' : 'Main Product'}
        </span>
      ),
    },
    {
      key: 'stock',
      label: 'Current Stock',
      render: (item) => (
        <Badge variant={item.stock > 10 ? 'success' : item.stock > 0 ? 'warning' : 'danger'}>
          {item.stock} units
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
            onClick={() => {
              setEditingItem(item);
              setNewStock(String(item.stock));
              setIsModalOpen(true);
            }}
          >
            Update Stock
          </Button>
          <Button
            size="sm"
            variant="ghost"
            icon={<ExternalLink className="w-3.5 h-3.5" />}
            onClick={() => router.push(`/admin/products`)}
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    
    setLoading(true);

    try {
      // We must update the whole product to modify stock
      const product = editingItem.productData;
      let payload = { ...product };
      
      if (editingItem.isVariant) {
        payload.variants = product.variants.map((v: any) => {
          if (v.id === editingItem.variantData.id || (v.size === editingItem.variantData.size && v.color === editingItem.variantData.color)) {
            return { ...v, stock: Number(newStock) };
          }
          return v;
        });
      } else {
        payload.stock = Number(newStock);
      }

      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.refresh();
        
        // Optimistic UI update
        const updatedItems = items.map(i => 
          i.id === editingItem.id ? { ...i, stock: Number(newStock) } : i
        );
        setItems(updatedItems);
        
        setIsModalOpen(false);
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Failed to update stock:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Inventory Tracking"
        description="Monitor and quickly update stock levels across all products and variants"
      />

      <DataTable
        columns={columns}
        data={items}
        emptyMessage="No inventory items found"
        emptyIcon={<Package className="w-12 h-12" />}
        searchable
        searchPlaceholder="Search by product name or SKU..."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Quick Update Stock"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} loading={loading}>
              Save Stock
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white/5 p-4 rounded-xl mb-4 flex items-center gap-4">
            {editingItem?.image && (
              <img src={editingItem.image} alt={editingItem.name} className="w-16 h-16 rounded-lg object-cover" />
            )}
            <div>
              <p className="font-medium text-white">{editingItem?.name}</p>
              <p className="text-sm text-white/40">SKU: {editingItem?.sku}</p>
            </div>
          </div>
          
          <Input
            label="New Stock Quantity"
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
            required
            autoFocus
          />
        </form>
      </Modal>
    </>
  );
}
