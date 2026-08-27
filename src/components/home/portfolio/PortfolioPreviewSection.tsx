'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortfolioProject } from '@prisma/client';

export function PortfolioPreviewSection({ projects }: { projects: PortfolioProject[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="bg-[#faf9f6] py-32 md:py-48 overflow-hidden w-full selection:bg-black selection:text-white">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <span className="w-8 h-[1px] bg-black" />
              <span className="text-[10px] font-sans font-bold tracking-[3px] uppercase text-gray-500">
                Our Work
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-[72px] font-sans font-black leading-[0.9] tracking-tight text-black"
            >
              Selected <br /> Portfolio
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/portfolio"
              className="group flex items-center gap-4 border-b border-black pb-1 hover:border-gray-400 transition-colors"
            >
              <span className="text-xs font-sans font-bold tracking-[2px] uppercase text-black">
                View All Projects
              </span>
              <span className="text-black transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {projects.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative flex flex-col"
            >
              <Link href="/portfolio" className="relative w-full aspect-[4/5] overflow-hidden bg-[#F7F5F0] rounded-2xl mb-6">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] mix-blend-multiply"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>

              <div>
                <p className="text-[10px] font-sans font-bold tracking-[2px] uppercase text-gray-400 mb-2">
                  {item.category}
                </p>
                <h3 className="text-lg font-sans font-bold text-black tracking-tight">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button (shows only on mobile, hidden on md+) */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link
            href="/portfolio"
            className="inline-block bg-black text-white text-sm font-sans font-bold py-4 px-8 rounded-lg w-full text-center hover:bg-gray-800 transition-colors"
          >
            View Full Portfolio
          </Link>
        </div>

      </div>
    </section>
  );
}
