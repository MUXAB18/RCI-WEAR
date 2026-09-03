import { NextRequest, NextResponse } from 'next/server';
import { incrementViews } from '@/lib/api/blog.service';
import { getBlogPostBySlug } from '@/lib/api/blog.service';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    await incrementViews(post.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to increment views:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
