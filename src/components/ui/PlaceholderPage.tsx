'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="pt-32 pb-24 min-h-[80vh] flex flex-col justify-center bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[800px] bg-[#F8F8F8] rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-near-black/50 hover:text-near-black transition-colors mb-16">
          <ArrowLeft className="w-4 h-4" /> Return Home
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-near-black text-white rounded-full flex items-center justify-center mx-auto mb-8">
            <Clock className="w-8 h-8" />
          </div>
          
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="w-8 h-[1px] bg-near-black/30" />
            <span className="text-[10px] font-bold tracking-[3px] uppercase text-near-black/60">
              Coming Soon
            </span>
            <span className="w-8 h-[1px] bg-near-black/30" />
          </div>

          <h1 className="text-5xl md:text-7xl font-display mb-6">
            {title}
          </h1>

          <p className="text-xl text-near-black/70 max-w-2xl mx-auto font-light leading-relaxed">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <Button href="/contact" variant="primary">
            Contact Us
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
