'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortfolioProject } from '@prisma/client';

export function PortfolioPreviewSection({ projects }: { projects: PortfolioProject[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="bg-[#faf9f6] py-16 md:py-32 lg:py-48 overflow-hidden w-full selection:bg-black selection:text-white">
      <div className="container mx-auto px-5 md:px-8 max-w-[1400px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-16 gap-4 md:gap-8 text-center md:text-left">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center md:justify-start gap-4 mb-3 md:mb-4"
            >
              <span className="w-8 h-[1px] bg-black" />
              <span className="text-[10px] font-sans font-bold tracking-[3px] uppercase text-gray-500">
                Our Work
              </span>
              <span className="w-8 h-[1px] bg-black" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(2.2rem,8vw,72px)] font-sans font-black leading-[0.9] tracking-tight text-black"
            >
              Selected <br /> Portfolio
            </motion.h2>
          </div>

          {/* View All — hidden on mobile, visible md+ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block"
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

        {/* Grid — 2 cols on mobile, 2 on md, 4 on lg */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
          {projects.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative flex flex-col"
            >
              <Link href="/portfolio" className="relative w-full aspect-[3/4] overflow-hidden bg-[#F7F5F0] rounded-xl md:rounded-2xl mb-3 md:mb-6 block">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] mix-blend-multiply"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>

              <div>
                <p className="text-[9px] md:text-[10px] font-sans font-bold tracking-[2px] uppercase text-gray-400 mb-1 md:mb-2 truncate">
                  {item.category}
                </p>
                <h3 className="text-sm md:text-lg font-sans font-bold text-black tracking-tight leading-tight line-clamp-1">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 border border-black text-black text-[11px] font-sans font-bold tracking-[2px] uppercase py-3.5 px-8 rounded-full hover:bg-black hover:text-white transition-colors duration-300"
          >
            View Full Portfolio
            <span>&rarr;</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
