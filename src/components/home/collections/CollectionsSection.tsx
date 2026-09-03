'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Type for collection from database
type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  isPublished: boolean;
  order: number;
  products: any[];
};

interface CollectionsSectionProps {
  collections: Collection[];
}

// Define collection labels and subtitles based on the collection name/slug
const collectionMeta: Record<string, { label: string; subtitle: string; number: string }> = {
  'hoodies': { label: 'PREMIUM', subtitle: 'Heavyweight Comfort', number: '01' },
  'tees': { label: 'CORE', subtitle: 'Everyday Staples', number: '02' },
  'tracksuits': { label: 'SIGNATURE', subtitle: 'Athleisure Excellence', number: '03' },
  'gymwear': { label: 'ACTIVE', subtitle: 'Performance Focus', number: '04' },
  'corporate': { label: 'CUSTOM', subtitle: 'Brand Excellence', number: '05' },
  'outerwear': { label: 'EXCLUSIVE', subtitle: 'Weather-Ready Style', number: '06' },
};

export function CollectionsSection({ collections = [] }: CollectionsSectionProps) {
  return (
    <section id="collections" className="py-24 lg:py-32 bg-[#F5F5F0] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header Section */}
        <div className="mb-12 lg:mb-20 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-4 lg:mb-6">
            <span className="w-12 h-[2px] bg-near-black" />
            <span className="text-[11px] font-bold tracking-[4px] uppercase text-near-black">
              What We Offer
            </span>
            <span className="w-12 h-[2px] bg-near-black" />
          </div>
          <h2 className="text-[clamp(2.8rem,10vw,80px)] font-sans font-black text-near-black tracking-tighter leading-[0.95] mb-4 lg:mb-6">
            Our Collections
          </h2>
          <p className="text-base md:text-xl lg:text-2xl font-sans text-near-black/70 max-w-2xl mx-auto lg:mx-0">
            Describe anything you imagine, and let our manufacturing precision bring it to life in breathtaking, high-quality garments.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {collections.map((collection, index) => {
            const meta = collectionMeta[collection.slug] || {
              label: 'PREMIUM',
              subtitle: 'Crafted Excellence',
              number: String(index + 1).padStart(2, '0')
            };

            return (
              <div key={collection.id} className="relative group flex flex-col">

                {/* Image Container */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative bg-white rounded-sm p-4 md:p-6 mb-6 aspect-[1.5/1] flex items-center justify-center border border-transparent group-hover:border-near-black/10 transition-colors duration-500 z-10 shadow-sm"
                >
                  {/* Corner Accents */}
                  <div className="absolute top-4 left-4 border-t border-l border-near-black/30 w-3 h-3" />
                  <div className="absolute top-4 left-5 text-[9px] font-sans text-near-black/40">
                    Plate No. {meta.number}
                  </div>
                  <div className="absolute bottom-4 right-4 border-b border-r border-near-black/30 w-3 h-3" />

                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={collection.imageUrl || '/placeholder-collection.png'}
                      alt={collection.name}
                      fill
                      className="object-contain scale-[0.85] group-hover:scale-95 transition-transform duration-700 ease-out mix-blend-multiply"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                  className="relative z-10 flex flex-col flex-grow"
                >
                  <div className="text-[10px] font-bold tracking-[3px] text-[#A67C52] uppercase mb-2">
                    {meta.label}
                  </div>
                  <h3 className="text-3xl font-sans font-black text-near-black tracking-tight mb-1">
                    {collection.name}
                  </h3>
                  <h4 className="text-sm font-sans italic text-gray-400 mb-4">
                    {meta.subtitle}
                  </h4>
                  <p className="text-sm text-near-black/70 leading-relaxed mb-6 flex-grow pr-16 relative z-10">
                    {collection.description || `Expertly crafted ${collection.name.toLowerCase()} designed for quality, comfort, and style.`}
                  </p>
                  <div className="flex justify-between items-end relative z-10">
                    <Link
                      href={`/request-quote?category=${collection.slug}`}
                      className="inline-flex items-center text-[11px] font-bold tracking-[2px] text-near-black uppercase border-b border-near-black/20 hover:border-near-black pb-1 w-max transition-colors"
                    >
                      Order Now &rarr;
                    </Link>
                  </div>

                  {/* Outlined Background Number in Text Area */}
                  <div
                    className="absolute bottom-0 right-0 text-[100px] leading-[0.75] font-sans italic font-black text-transparent pointer-events-none select-none z-0 translate-y-4 translate-x-4"
                    style={{ WebkitTextStroke: '1px rgba(166, 124, 82, 0.4)' }}
                  >
                    {meta.number}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {collections.length === 0 && (
          <div className="w-full py-24 text-center">
            <p className="text-gray-500 font-sans">No collections available at this time.</p>
          </div>
        )}

      </div>
    </section>
  );
}
