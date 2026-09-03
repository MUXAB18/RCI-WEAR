import { BlogEditor } from '@/components/admin/BlogEditor';
import { getBlogPostBySlug } from '@/lib/api/blog.service';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { AdminShell } from '@/app/admin/layout';

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });

  if (!post) {
    notFound();
  }

  return (
    <AdminShell>
      <BlogEditor post={post} />
    </AdminShell>
  );
}
