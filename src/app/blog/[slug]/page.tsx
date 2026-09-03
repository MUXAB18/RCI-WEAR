import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import Image from 'next/image';
import { getBlogPostBySlug } from '@/lib/api/blog.service';
import { notFound } from 'next/navigation';
import { BlogViewTracker } from '@/components/blog/BlogViewTracker';
import { SocialShare } from '@/components/blog/SocialShare';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.isPublished) {
    notFound();
  }

  // Construct the full URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rasheedclothingintl.me';
  const postUrl = `${baseUrl}/blog/${slug}`;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <BlogViewTracker slug={slug} />
      
      {/* Back Button & Breadcrumb */}
      <div className="container mx-auto px-6 md:px-12 max-w-5xl mb-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-gray-600 hover:text-black transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>
      </div>

      <article className="container mx-auto px-6 md:px-12 max-w-5xl">
        {/* Header Section */}
        <header className="mb-12">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black bg-yellow-100 px-4 py-2 rounded-full"
              >
                {tag}
              </span>
            ))}
            {!post.tags.length && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black bg-gray-100 px-4 py-2 rounded-full">
                Article
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight mb-8 leading-tight text-black">
            {post.title}
          </h1>

          {/* Meta Info Bar */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-semibold">By {post.author || 'RCI Team'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>5 min read</span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-12 -mx-6 md:-mx-12 lg:mx-0">
            <div className="aspect-[21/9] relative overflow-hidden rounded-none lg:rounded-3xl bg-gray-100">
              <Image 
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Social Share - Desktop Sidebar */}
        <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-20">
          <div className="flex flex-col gap-4 items-center">
            <div className="w-px h-12 bg-gray-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 [writing-mode:vertical-lr] rotate-180">
              Share
            </span>
            <div className="w-px h-12 bg-gray-300" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Article Content */}
          <div className="lg:col-span-8">
            <div
              className="prose prose-lg max-w-none font-sans
                prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-black prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-black prose-strong:font-bold
                prose-ul:my-6 prose-li:my-2
                prose-img:rounded-2xl prose-img:shadow-lg
                prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags at Bottom */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-gray-500 mb-4">
                Tagged in:
              </h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-8">
              {/* Share Section */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Share2 className="w-5 h-5 text-gray-700" />
                  <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-gray-700">
                    Share Article
                  </h3>
                </div>
                <SocialShare 
                  url={postUrl}
                  title={post.title}
                  description={post.excerpt || post.title}
                />
              </div>

              {/* About Author */}
              <div className="bg-gradient-to-br from-near-black to-gray-900 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                    {(post.author || 'RCI Team').charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-lg">
                      {post.author || 'RCI Team'}
                    </h3>
                    <p className="text-white/70 text-sm">Author</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Expert insights from Rasheed Clothing International's manufacturing team, sharing industry knowledge and best practices.
                </p>
              </div>

              {/* Quick Info */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-gray-700 mb-4">
                  Article Info
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Published</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Reading Time</span>
                    <span className="font-semibold text-gray-900">5 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-semibold text-gray-900">
                      {post.tags[0] || 'General'}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-2xl p-6">
                <h3 className="text-lg font-sans font-bold text-black mb-3">
                  Ready to Start Manufacturing?
                </h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  Get a free quote for your apparel manufacturing needs.
                </p>
                <a
                  href="/contact"
                  className="block w-full bg-black text-white text-center px-6 py-3 rounded-full font-sans font-bold text-sm uppercase tracking-wider hover:bg-gray-900 transition-all duration-300"
                >
                  Get Quote
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 bg-gradient-to-br from-near-black to-gray-900 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-white mb-4">
            Found This Helpful?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Explore more insights about apparel manufacturing, industry trends, and best practices
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-white text-near-black px-8 py-4 rounded-full font-sans font-bold text-sm uppercase tracking-wider hover:bg-gray-100 transition-all duration-300"
            >
              View All Articles
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-sans font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
