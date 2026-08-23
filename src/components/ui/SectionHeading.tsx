'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ 
  eyebrow, 
  title, 
  subtitle, 
  align = 'center',
  className 
}: SectionHeadingProps) {
  return (
    <div className={cn(
      "flex flex-col mb-16",
      align === 'center' ? 'items-center text-center' : 'items-start text-left',
      className
    )}>
      {eyebrow && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="eyebrow mb-6"
        >
          {eyebrow}
        </motion.div>
      )}
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-5xl lg:text-7xl mb-6 text-balance font-sans font-black tracking-tight"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-lg md:text-xl max-w-2xl text-near-black/70 font-sans"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
