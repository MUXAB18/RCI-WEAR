'use client';

import { useState } from 'react';
import { Plus, Briefcase, Edit, Trash2, Star, Calendar, User } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { Button } from '@/components/admin/ui/Button';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { Badge } from '@/components/admin/ui/Badge';
import { Modal } from '@/components/admin/ui/Modal';
import { ConfirmModal } from '@/components/admin/ui/ConfirmModal';
import { Input } from '@/components/admin/ui/Input';
import { Textarea } from '@/components/admin/ui/Textarea';
import { useRouter } from 'next/navigation';

type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  imageUrl: string;
  images: string[];
  clientName: string | null;
  projectDate: Date | null;
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
  order: number;
};

type Props = {
  initialProjects: any[];
};

export function PortfolioClient({ initialProjects }: Props) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    imageUrl: '',
    images: '',
    clientName: '',
    projectDate: '',
    tags: '',
    isFeatured: false,
    isPublished: true,
    order: 0,
  });

  const columns: Column<PortfolioProject>[] = [
    {
      key: 'title',
      label: 'Project',
      render: (item) => (
        <div className="flex items-center gap-3">
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="w-16 h-12 rounded-lg object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-white">{item.title}</p>
              {item.isFeatured && (
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              )}
            </div>
            {item.clientName && (
              <p className="text-xs text-white/40">Client: {item.clientName}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (item) => <span className="text-white/60">{item.category}</span>,
    },
    {
      key: 'tags',
      label: 'Tags',
      render: (item) => (
        <div className="flex gap-1 flex-wrap">
          {item.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="text-xs bg-white/10 px-2 py-0.5 rounded text-white/60">
              {tag}
            </span>
          ))}
          {item.tags.length > 2 && (
            <span className="text-xs text-white/40">+{item.tags.length - 2}</span>
          )}
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Project Date',
      render: (item) => (
        <span className="text-white/60 text-sm">
          {item.projectDate ? new Date(item.projectDate).toLocaleDateString() : 'N/A'}
        </span>
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

  const handleEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description || '',
      imageUrl: project.imageUrl,
      images: project.images.join('\n'),
      clientName: project.clientName || '',
      projectDate: project.projectDate ? new Date(project.projectDate).toISOString().split('T')[0] : '',
      tags: project.tags.join(', '),
      isFeatured: project.isFeatured,
      isPublished: project.isPublished,
      order: project.order,
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
      const res = await fetch(`/api/admin/portfolio/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== deleteId));
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingProject
        ? `/api/admin/portfolio/${editingProject.id}`
        : '/api/admin/portfolio';
      
      const method = editingProject ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        order: parseInt(formData.order.toString()),
        images: formData.images.split('\n').filter(url => url.trim()),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        projectDate: formData.projectDate || null,
        clientName: formData.clientName || null,
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
      console.error('Failed to save project:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      imageUrl: '',
      images: '',
      clientName: '',
      projectDate: '',
      tags: '',
      isFeatured: false,
      isPublished: true,
      order: 0,
    });
    setEditingProject(null);
  };

  const handleOpenModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Calculate statistics
  const stats = {
    total: projects.length,
    published: projects.filter(p => p.isPublished).length,
    featured: projects.filter(p => p.isFeatured).length,
    draft: projects.filter(p => !p.isPublished).length,
  };

  return (
    <>
      <PageHeader
        title="Portfolio"
        description="Showcase your best work and completed projects"
        actions={
          <Button
            icon={<Plus className="w-4 h-4" />}
            onClick={handleOpenModal}
          >
            Add Project
          </Button>
        }
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Total Projects</p>
          <p className="text-2xl font-semibold text-white">{stats.total}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Published</p>
          <p className="text-2xl font-semibold text-green-500">{stats.published}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Featured</p>
          <p className="text-2xl font-semibold text-yellow-500">{stats.featured}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Drafts</p>
          <p className="text-2xl font-semibold text-gray-500">{stats.draft}</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={projects}
        emptyMessage="No projects yet"
        emptyIcon={<Briefcase className="w-12 h-12" />}
        searchable
        searchPlaceholder="Search projects..."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Add Project'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} loading={loading}>
              {editingProject ? 'Update' : 'Create'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <Input
            label="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="e.g., Custom Uniform Collection"
          />

          <Input
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            placeholder="e.g., Corporate Wear, Sports Apparel"
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Detailed project description..."
            rows={3}
          />

          <Input
            label="Main Image URL"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            required
            placeholder="https://example.com/main-image.jpg"
          />

          <Textarea
            label="Additional Images"
            value={formData.images}
            onChange={(e) => setFormData({ ...formData, images: e.target.value })}
            placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
            helperText="One URL per line"
            rows={4}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Client Name"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              placeholder="Company XYZ"
            />

            <Input
              label="Project Date"
              type="date"
              value={formData.projectDate}
              onChange={(e) => setFormData({ ...formData, projectDate: e.target.value })}
            />
          </div>

          <Input
            label="Tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="uniform, corporate, custom"
            helperText="Comma-separated tags"
          />

          <Input
            label="Display Order"
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            helperText="Lower numbers appear first"
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
                Featured project
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
                Publish project
              </label>
            </div>
          </div>
        </form>
      </Modal>
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={executeDelete}
        title="Delete project"
        message={`Are you sure you want to delete this project? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={loading}
      />
    </>
  );
}
