'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function HomeCtaSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#F5F5F0]">
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-sans font-black tracking-tight text-black mb-8">
            Ready to scale your brand?
          </h2>
          <p className="text-xl text-gray-600 mb-12 font-light font-sans">
            Partner with Rasheed Clothing International for premium, reliable, and scalable apparel manufacturing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/contact" variant="primary" className="bg-black text-white hover:bg-[#2A2A28] rounded-full px-8 h-14 flex items-center justify-center text-[13px] font-semibold uppercase whitespace-nowrap transition-colors duration-300 font-sans">
              Start a Project
            </Button>
            <Button href="/catalog.pdf" download variant="outline" className="border border-black/20 text-black hover:bg-black/5 rounded-full px-8 h-14 flex items-center justify-center text-[13px] font-semibold uppercase whitespace-nowrap transition-colors duration-300 font-sans">
              Download Catalog
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
