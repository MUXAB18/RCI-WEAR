'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const POSTS = [
  {
    title: 'The Future of Sustainable Textile Dyeing',
    category: 'Sustainability',
    date: 'Oct 12, 2026',
    excerpt: 'Exploring closed-loop systems and bio-based dyes that are dramatically reducing the environmental footprint of apparel manufacturing.',
    delay: 0.1
  },
  {
    title: 'Understanding GSM: Choosing the Right Weight',
    category: 'Education',
    date: 'Sep 28, 2026',
    excerpt: 'A comprehensive guide to Grams per Square Meter and how it affects the drape, warmth, and luxury feel of your streetwear collections.',
    delay: 0.2
  },
  {
    title: 'From Tech Pack to Production: A Case Study',
    category: 'Process',
    date: 'Aug 15, 2026',
    excerpt: 'How we translated a fragmented concept into a perfectly graded, 5,000-piece production run in under 45 days.',
    delay: 0.3
  },
  {
    title: 'The Rise of Technical Activewear in Everyday Fashion',
    category: 'Trends',
    date: 'Jul 22, 2026',
    excerpt: 'Why 4-way stretch interlocks and moisture-wicking fabrics are becoming the new standard for casual luxury brands.',
    delay: 0.4
  }
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          eyebrow="Insights & News"
          title="Industry Intelligence"
          subtitle="Thoughts, trends, and technical knowledge from the forefront of global apparel manufacturing."
          align="left"
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {POSTS.map((post) => (
            <motion.article 
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: post.delay }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] bg-[#F8F8F8] mb-8 relative overflow-hidden">
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                 <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-black" />
                 </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-[1px] text-black bg-black/5 px-3 py-1 rounded-full">{post.category}</span>
                <span className="text-sm font-sans text-near-black/50">{post.date}</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-sans font-black tracking-tight mb-4 group-hover:text-black/70 transition-colors">
                {post.title}
              </h3>
              
              <p className="text-near-black/70 font-sans leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
        
        <div className="mt-24 flex justify-center">
           <button className="border border-near-black/20 text-near-black px-8 py-4 font-bold tracking-[1px] uppercase text-sm hover:border-black hover:bg-black hover:text-white transition-colors duration-300">
             Load More Articles
           </button>
        </div>
      </div>
    </div>
  );
}
