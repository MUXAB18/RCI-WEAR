'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { collectionsData } from '@/data/products';

export function CollectionsSection() {
  return (
    <section id="collections" className="py-24 lg:py-32 bg-[#F5F5F0] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-near-black" />
            <span className="text-[11px] font-bold tracking-[4px] uppercase text-near-black">
              What We Offer
            </span>
            <span className="w-12 h-[2px] bg-near-black" />
          </div>
          <h2 className="text-6xl md:text-[80px] font-sans font-black text-near-black tracking-tighter leading-[0.95] mb-6">
            Our Collections
          </h2>
          <p className="text-xl md:text-2xl font-sans text-near-black/70 max-w-2xl">
            Describe anything you imagine, and let our manufacturing precision bring it to life in breathtaking, high-quality garments.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {collectionsData.map((item, index) => (
            <div key={item.id} className="relative group flex flex-col">
              
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
                  Plate No. {item.number}
                </div>
                <div className="absolute bottom-4 right-4 border-b border-r border-near-black/30 w-3 h-3" />

                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
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
                  {item.label}
                </div>
                <h3 className="text-3xl font-sans font-black text-near-black tracking-tight mb-1">
                  {item.title}
                </h3>
                <h4 className="text-sm font-sans italic text-gray-400 mb-4">
                  {item.subtitle}
                </h4>
                <p className="text-sm text-near-black/70 leading-relaxed mb-6 flex-grow pr-16 relative z-10">
                  {item.description}
                </p>
                <div className="flex justify-between items-end relative z-10">
                  <Link 
                    href={`/portfolio?category=${item.title}`}
                    className="inline-flex items-center text-[11px] font-bold tracking-[2px] text-near-black uppercase border-b border-near-black/20 hover:border-near-black pb-1 w-max transition-colors"
                  >
                    View Collection &rarr;
                  </Link>
                </div>
                
                {/* Outlined Background Number in Text Area */}
                <div 
                  className="absolute bottom-0 right-0 text-[100px] leading-[0.75] font-sans italic font-black text-transparent pointer-events-none select-none z-0 translate-y-4 translate-x-4"
                  style={{ WebkitTextStroke: '1px rgba(166, 124, 82, 0.4)' }}
                >
                  {item.number}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
