import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getPublishedBlogPosts } from '@/lib/api/blog.service';
import { BlogList } from '@/components/blog/BlogList';

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          eyebrow="Insights & News"
          title="Industry Intelligence"
          subtitle="Thoughts, trends, and technical knowledge from the forefront of global apparel manufacturing."
          align="center"
        />
        <BlogList posts={posts} />
      </div>
    </div>
  );
}
