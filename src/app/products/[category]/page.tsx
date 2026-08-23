'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { products } from '@/data/products';
import { Button } from '@/components/ui/Button';

// NOTE: Since we are not fetching from a DB right now, we use a simple generic layout for the category.
// If this were a real server component, we'd use generateStaticParams. For now, it's a client component for animations.

export default function CategoryPage({ params }: { params: { category: string } }) {
  const product = products.find(p => p.id === params.category);

  if (!product) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <Link href="/products" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-near-black/50 hover:text-near-black transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] w-full bg-[#F8F8F8]"
          >
            <Image 
              src={product.img}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-near-black" />
              <span className="text-[10px] font-bold tracking-[3px] uppercase text-near-black/60">
                Product Category
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-8">
              {product.title}
            </h1>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.desc}
            </p>

            <div className="mb-12">
              <h3 className="text-[11px] font-bold tracking-[2px] uppercase text-near-black mb-6">Key Specifications</h3>
              <ul className="space-y-4">
                {[
                  'Custom fabric sourcing and dyeing (Pantone matching)',
                  'Premium finishing (Enzyme wash, Silicon wash)',
                  'Advanced branding (Embroidery, Screen print, DTF, Sublimation)',
                  'Private label tags and retail-ready packaging',
                  'Low Minimum Order Quantities (MOQ)'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm text-near-black/80">
                    <CheckCircle2 className="w-5 h-5 text-near-black/40 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <Button href="/request-quote" variant="primary">
                Request Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
