'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { SectionHeading } from '@/components/ui/SectionHeading';

export default function ProductsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          eyebrow="Our Catalog"
          title="Manufacturing Capabilities"
          subtitle="Explore our core product categories, engineered for premium brands worldwide."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative h-[500px] overflow-hidden bg-[#F8F8F8]"
            >
              <Image
                src={product.img}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <h3 className="text-3xl font-display mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {product.title}
                </h3>
                <p className="text-white/80 text-sm mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 line-clamp-3">
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.desc}</p>
                </p>
                <Link 
                  href={`/products/${product.id}`}
                  className="inline-block mt-2 font-medium text-black hover:underline underline-offset-4"
                >
                  Explore Category <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
