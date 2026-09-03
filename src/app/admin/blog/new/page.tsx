import { BlogEditor } from '@/components/admin/BlogEditor';
import { AdminShell } from '@/app/admin/layout';

export default function NewBlogPostPage() {
  return (
    <AdminShell>
      <BlogEditor post={null} />
    </AdminShell>
  );
}
