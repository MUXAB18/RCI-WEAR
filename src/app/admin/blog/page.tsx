import { AdminShell } from '@/app/admin/layout';
import { BlogClient } from './BlogClient';
import { getAllBlogPosts } from '@/lib/api/blog.service';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <AdminShell>
      <div className="p-8 max-w-7xl">
        <BlogClient initialPosts={posts} />
      </div>
    </AdminShell>
  );
}
