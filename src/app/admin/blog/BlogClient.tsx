'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, FileText, Edit, Trash2, Eye, Star, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { Button } from '@/components/admin/ui/Button';
import { DataTable, Column } from '@/components/admin/ui/DataTable';
import { Badge } from '@/components/admin/ui/Badge';
import { ConfirmModal } from '@/components/admin/ui/ConfirmModal';
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
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const refreshData = useCallback(() => {
    router.refresh();
  }, [router]);

  // Auto-refresh every 30 seconds so view counts stay live
  useEffect(() => {
    const interval = setInterval(refreshData, 30_000);
    return () => clearInterval(interval);
  }, [refreshData]);

  // Sync posts when server re-renders with fresh data
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  const handleManualRefresh = async () => {
    setRefreshing(true);
    router.refresh();
    // Give the router a moment then clear spinner
    setTimeout(() => setRefreshing(false), 1000);
  };

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
              router.push(`/admin/blog/${item.id}/edit`);
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
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              icon={<RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />}
              onClick={handleManualRefresh}
              disabled={refreshing}
            >
              Refresh
            </Button>
            <Button icon={<Plus className="w-4 h-4" />} onClick={() => router.push('/admin/blog/new')}>
              Add Post
            </Button>
          </div>
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
