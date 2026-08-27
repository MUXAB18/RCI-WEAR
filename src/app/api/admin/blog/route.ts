import { NextRequest, NextResponse } from 'next/server';
import { createBlogPost } from '@/lib/api/blog.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const post = await createBlogPost(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Failed to create blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
