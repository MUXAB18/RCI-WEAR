'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Calendar, Clock, Tag } from 'lucide-react';

type Post = {
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  tags: string[];
  publishedAt: Date | null;
  createdAt: Date;
  author?: string;
};

export function BlogList({ posts }: { posts: Post[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [displayCount, setDisplayCount] = useState(6);

  // Extract unique categories from tags
  const allCategories = ['All', ...Array.from(new Set(posts.flatMap(post => post.tags)))];

  // Filter posts by category
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.tags.includes(selectedCategory));

  // Get featured post (latest post)
  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1, displayCount);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  return (
    <div className="mt-16">
      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-3 mb-12 pb-8 border-b border-gray-200">
        <span className="text-sm font-sans font-bold text-gray-500 uppercase tracking-wider mr-2">
          Filter:
        </span>
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setDisplayCount(6);
            }}
            className={`px-4 py-2 rounded-full font-sans text-sm font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-near-black text-white scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 font-sans text-lg">No articles found in this category.</p>
        </div>
      )}

      {filteredPosts.length > 0 && (
        <>
          {/* Featured Article */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <Link href={`/blog/${featuredPost.slug}`} className="group block">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden border border-gray-200 hover:border-near-black transition-all duration-500 hover:shadow-2xl">
                  {/* Image */}
                  <div className="aspect-[16/10] lg:aspect-auto lg:h-full relative overflow-hidden">
                    {featuredPost.coverImage ? (
                      <Image
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <span className="font-sans font-bold text-gray-400">NO IMAGE</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12">
                    <div className="inline-block bg-yellow-400 text-black text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
                      ⭐ Featured Article
                    </div>

                    <div className="flex items-center gap-4 mb-4 flex-wrap">
                      {featuredPost.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-600">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold tracking-tight mb-4 group-hover:text-gray-700 transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>

                    <p className="text-gray-600 font-sans text-lg leading-relaxed mb-6 line-clamp-3">
                      {featuredPost.excerpt || 'Click to read the full article.'}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.publishedAt || featuredPost.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        5 min read
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-2 text-near-black font-sans font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                      Read Article
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Regular Articles Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="h-full flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-near-black hover:shadow-xl transition-all duration-500">
                      {/* Image */}
                      <div className="aspect-[16/9] relative overflow-hidden bg-gray-100">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                            <span className="font-sans font-bold text-gray-400 text-sm">NO IMAGE</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Tags & Date */}
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          {post.tags.slice(0, 1).map((tag, i) => (
                            <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                          <span className="text-xs font-sans text-gray-500">
                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-sans font-bold tracking-tight mb-3 group-hover:text-gray-700 transition-colors line-clamp-2 flex-grow">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 font-sans text-sm leading-relaxed line-clamp-2 mb-4">
                          {post.excerpt || 'Read more...'}
                        </p>

                        {/* Read More Link */}
                        <div className="flex items-center gap-2 text-near-black font-sans font-semibold text-sm group-hover:gap-3 transition-all">
                          Read More
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Load More Button */}
          {filteredPosts.length > displayCount && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-16 flex justify-center"
            >
              <button
                onClick={handleLoadMore}
                className="bg-white border-2 border-near-black text-near-black px-8 py-4 rounded-full font-sans font-bold text-sm uppercase tracking-wider hover:bg-near-black hover:text-white transition-all duration-300 hover:scale-105"
              >
                Load More Articles
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
