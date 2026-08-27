'use client';

import { useState } from 'react';
import { Plus, FileText, Edit, Trash2, Eye, Star } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { Button } from '@/components/admin/ui/Button';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { Badge } from '@/components/admin/ui/Badge';
import { Modal } from '@/components/admin/ui/Modal';
import { ConfirmModal } from '@/components/admin/ui/ConfirmModal';
import { Input } from '@/components/admin/ui/Input';
import { Textarea } from '@/components/admin/ui/Textarea';
import { useRouter } from 'next/navigation';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  author: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  createdAt: Date;
};

type Props = {
  initialPosts: any[];
};

export function BlogClient({ initialPosts }: Props) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    author: 'Admin',
    tags: '',
    isPublished: false,
    isFeatured: false,
  });

  const columns: Column<BlogPost>[] = [
    {
      key: 'title',
      label: 'Post',
      render: (item) => (
        <div className="flex items-center gap-3">
          {item.coverImage ? (
            <img 
              src={item.coverImage} 
              alt={item.title}
              className="w-16 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-16 h-12 rounded-lg bg-white/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white/40" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-white">{item.title}</p>
              {item.isFeatured && (
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              )}
            </div>
            <p className="text-xs text-white/40">/{item.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'author',
      label: 'Author',
      render: (item) => <span className="text-white/60">{item.author}</span>,
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
      key: 'views',
      label: 'Views',
      render: (item) => (
        <div className="flex items-center gap-1 text-white/60">
          <Eye className="w-3.5 h-3.5" />
          <span>{item.views}</span>
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Created',
      render: (item) => (
        <span className="text-white/60 text-sm">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
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

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      coverImage: post.coverImage || '',
      author: post.author,
      tags: post.tags.join(', '),
      isPublished: post.isPublished,
      isFeatured: post.isFeatured,
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
      const res = await fetch(`/api/admin/blog/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== deleteId));
      }
    } catch (error) {
      console.error('Failed to delete blog post:', error);
    } finally {
      setLoading(false);
      setDeleteId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingPost
        ? `/api/admin/blog/${editingPost.id}`
        : '/api/admin/blog';
      
      const method = editingPost ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
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
      console.error('Failed to save blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: '',
      author: 'Admin',
      tags: '',
      isPublished: false,
      isFeatured: false,
    });
    setEditingPost(null);
  };

  const handleOpenModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Calculate statistics
  const stats = {
    total: posts.length,
    published: posts.filter(p => p.isPublished).length,
    draft: posts.filter(p => !p.isPublished).length,
    featured: posts.filter(p => p.isFeatured).length,
    totalViews: posts.reduce((sum, p) => sum + p.views, 0),
  };

  return (
    <>
      <PageHeader
        title="Blog Posts"
        description="Create and manage blog content"
        actions={
          <Button
            icon={<Plus className="w-4 h-4" />}
            onClick={handleOpenModal}
          >
            Add Post
          </Button>
        }
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Total Posts</p>
          <p className="text-2xl font-semibold text-white">{stats.total}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Published</p>
          <p className="text-2xl font-semibold text-green-500">{stats.published}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Drafts</p>
          <p className="text-2xl font-semibold text-gray-500">{stats.draft}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Featured</p>
          <p className="text-2xl font-semibold text-yellow-500">{stats.featured}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-4">
          <p className="text-white/60 text-sm mb-1">Total Views</p>
          <p className="text-2xl font-semibold text-white">{stats.totalViews}</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={posts}
        emptyMessage="No blog posts yet"
        emptyIcon={<FileText className="w-12 h-12" />}
        searchable
        searchPlaceholder="Search posts..."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPost ? 'Edit Post' : 'Add Post'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} loading={loading}>
              {editingPost ? 'Update' : 'Create'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <Input
            label="Post Title"
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
              if (!editingPost) {
                setFormData({ 
                  ...formData, 
                  title: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                });
              }
            }}
            required
            placeholder="e.g., 10 Tips for Quality Manufacturing"
          />

          <Input
            label="Slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            placeholder="10-tips-for-quality-manufacturing"
            helperText="URL-friendly version of the title"
          />

          <Textarea
            label="Excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            placeholder="Brief summary of the post..."
            rows={2}
            helperText="Short description shown in previews"
          />

          <Textarea
            label="Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write your post content here..."
            rows={8}
            required
          />

          <Input
            label="Cover Image URL"
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />

          <Input
            label="Author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
            placeholder="Admin"
          />

          <Input
            label="Tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="manufacturing, quality, tips"
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
                Featured post
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
                Publish post
              </label>
            </div>
          </div>
        </form>
      </Modal>
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={executeDelete}
        title="Delete blog post"
        message={`Are you sure you want to delete this blog post? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={loading}
      />
    </>
  );
}
