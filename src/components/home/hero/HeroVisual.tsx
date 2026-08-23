'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

export function HeroVisual() {
  return (
    <motion.div 
      className="w-full h-full flex gap-3 md:gap-4 py-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Left Column (Staggered down slightly) */}
      <div className="flex flex-col gap-3 md:gap-4 w-1/2 mt-12 h-full">
        {/* Top Left (Flex 1.2) */}
        <motion.div variants={itemVariants} className="relative w-full flex-[1.2] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm bg-gray-100">
          <Image
            src="/media__1775818866466.webp"
            alt="Manufacturing process"
            fill
            sizes="(max-width: 1024px) 45vw, 25vw"
            className="object-cover"
            priority
          />
        </motion.div>
        
        {/* Middle Left (Flex 1.5 - Square-ish) */}
        <motion.div variants={itemVariants} className="relative w-full flex-[1.5] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm bg-[#223B65]">
          <Image
            src="/custom_hoodie_1.webp"
            alt="Custom hoodie"
            fill
            sizes="(max-width: 1024px) 45vw, 25vw"
            className="object-cover opacity-90"
          />
        </motion.div>

        {/* Bottom Left (Flex 1 - Landscape) */}
        <motion.div variants={itemVariants} className="relative w-full flex-1 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm bg-gray-100">
          <Image
            src="/media__1775818866466.webp"
            alt="Fabric details"
            fill
            sizes="(max-width: 1024px) 45vw, 25vw"
            className="object-cover object-bottom"
          />
        </motion.div>
      </div>

      {/* Right Column (Starts at top) */}
      <div className="flex flex-col gap-3 md:gap-4 w-1/2 h-full mb-12">
        {/* Top Right (Flex 1.8 - Portrait) */}
        <motion.div variants={itemVariants} className="relative w-full flex-[1.8] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm bg-gray-100">
          <Image
            src="/custom_hoodie_1.webp"
            alt="Apparel model"
            fill
            sizes="(max-width: 1024px) 45vw, 25vw"
            className="object-cover object-top"
            priority
          />
        </motion.div>
        
        {/* Bottom Right (Flex 1.2 - Landscape to match bottom alignment) */}
        <motion.div variants={itemVariants} className="relative w-full flex-[1.2] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm bg-[#90B79B]">
          <Image
            src="/media__1775818866466.webp"
            alt="Product details"
            fill
            sizes="(max-width: 1024px) 45vw, 25vw"
            className="object-cover object-left opacity-90"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
