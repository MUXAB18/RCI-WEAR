'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Upload, X, Star } from 'lucide-react';
import { Input } from '@/components/admin/ui/Input';
import { Textarea } from '@/components/admin/ui/Textarea';
import { Button } from '@/components/admin/ui/Button';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import Link from 'next/link';

type Props = {
  post?: {
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
  } | null;
};

export function BlogEditor({ post }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    coverImage: post?.coverImage || '',
    author: post?.author || 'RCI Editorial',
    tags: post?.tags?.join(', ') || '',
    isPublished: post?.isPublished ?? false,
    isFeatured: post?.isFeatured ?? false,
  });

  // Auto-generate slug from title when creating new
  useEffect(() => {
    if (!post) {
      setFormData(prev => ({
        ...prev,
        slug: prev.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      }));
    }
  }, [formData.title, post]);

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) setFormData(prev => ({ ...prev, coverImage: data.url }));
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const url = post ? `/api/admin/blog/${post.id}` : '/api/admin/blog';
      const method = post ? 'PUT' : 'POST';
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        publishedAt: formData.isPublished ? new Date().toISOString() : undefined,
      };
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push('/admin/blog');
        router.refresh();
      }
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-[#080808] text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0a] border-b border-white/[0.08] backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blog"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Posts
          </Link>
          <div className="w-px h-4 bg-white/10" />
          <h1 className="text-sm font-semibold text-white">
            {post ? 'Edit Post' : 'New Post'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Publish toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setFormData(prev => ({ ...prev, isPublished: !prev.isPublished }))}
              className={`relative w-10 h-5 rounded-full transition-colors ${formData.isPublished ? 'bg-green-500' : 'bg-white/10'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${formData.isPublished ? 'left-5' : 'left-0.5'}`} />
            </div>
            <span className="text-sm text-white/70">{formData.isPublished ? 'Published' : 'Draft'}</span>
          </label>

          <Button onClick={() => handleSubmit()} loading={loading} icon={<Save className="w-4 h-4" />}>
            {post ? 'Save Changes' : 'Publish Post'}
          </Button>
        </div>
      </div>

      {/* Main layout: editor left, settings right */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-0 min-h-[calc(100vh-61px)]">
        {/* Left: content */}
        <div className="p-8 border-r border-white/[0.06]">
          {/* Title */}
          <textarea
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Post Title..."
            rows={2}
            className="w-full bg-transparent text-4xl font-black text-white placeholder-white/20 resize-none focus:outline-none mb-4 leading-tight"
          />

          {/* Excerpt */}
          <textarea
            value={formData.excerpt}
            onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            placeholder="Short excerpt shown in blog cards..."
            rows={2}
            className="w-full bg-transparent text-lg text-white/50 placeholder-white/20 resize-none focus:outline-none mb-8 leading-relaxed border-b border-white/[0.06] pb-6"
          />

          {/* Rich text editor */}
          <RichTextEditor
            content={formData.content}
            onChange={html => setFormData(prev => ({ ...prev, content: html }))}
          />
        </div>

        {/* Right: settings panel */}
        <div className="p-6 space-y-6 bg-[#0a0a0a]">
          {/* Cover Image */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">Cover Image</p>
            {formData.coverImage ? (
              <div className="relative rounded-xl overflow-hidden aspect-video mb-3">
                <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, coverImage: '' }))}
                  className="absolute top-2 right-2 w-7 h-7 bg-black/70 rounded-full flex items-center justify-center hover:bg-red-500/80 transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleImageUpload(f); }}
                className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-white/30 hover:bg-white/[0.02] transition-all mb-3"
              >
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); }} />
                {uploadingImage ? (
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-white/30" />
                    <span className="text-sm text-white/40">Click or drag to upload</span>
                  </>
                )}
              </div>
            )}
            <input
              type="text"
              value={formData.coverImage}
              onChange={e => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
              placeholder="Or paste image URL..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/60 placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Slug */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">URL Slug</p>
            <input
              type="text"
              value={formData.slug}
              onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="my-post-slug"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/60 placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors font-mono"
            />
            <p className="text-xs text-white/20 mt-1">/blog/{formData.slug || 'my-post-slug'}</p>
          </div>

          {/* Tags */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">Tags</p>
            <input
              type="text"
              value={formData.tags}
              onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="sustainability, trends, education"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/60 placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
            />
            <p className="text-xs text-white/20 mt-1">Comma-separated</p>
          </div>

          {/* Author */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">Author</p>
            <input
              type="text"
              value={formData.author}
              onChange={e => setFormData(prev => ({ ...prev, author: e.target.value }))}
              placeholder="RCI Editorial"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/60 placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Options */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">Options</p>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={e => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                  className="w-4 h-4 rounded border-white/20 bg-white/10"
                />
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-white/70">Featured post</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
