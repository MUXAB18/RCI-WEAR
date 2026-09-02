'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

interface HeroContentProps {
  mobile?: boolean;
}

export function HeroContent({ mobile = false }: HeroContentProps) {
  return (
    <motion.div
      className="flex flex-col z-20 w-full h-full justify-center pt-8 lg:pt-0"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Eyebrow label — mobile only */}
      {mobile && (
        <motion.div variants={fadeInUp} className="mb-5">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium">
            Premium Apparel Manufacturing
          </span>
        </motion.div>
      )}

      {/* Main Headline */}
      <motion.div variants={fadeInUp} className="mb-6 lg:mb-8">
        <h1
          className={`font-sans text-[clamp(3rem,5vw,5rem)] font-bold leading-[1.05] tracking-tight ${
            mobile ? 'text-white' : 'text-near-black'
          }`}
        >
          Turn Your Ideas
          <br />
          into Premium
          <br />
          Apparel
        </h1>
      </motion.div>

      {/* Supporting Copy */}
      <motion.div variants={fadeInUp} className="mb-10 lg:mb-12">
        <p
          className={`text-base md:text-lg max-w-[90%] lg:max-w-md font-medium leading-relaxed ${
            mobile ? 'text-white/85' : 'text-near-black/70'
          }`}
        >
          Describe anything you imagine, and let our manufacturing precision bring it to life in breathtaking, high-quality garments.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-16"
      >
        <Button
          href="/request-quote"
          className={`rounded-full px-8 h-14 flex items-center justify-center text-[13px] font-semibold whitespace-nowrap transition-colors duration-300 border-none shadow-md ${
            mobile
              ? 'bg-white text-[#0a0a0a] hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.15)]'
              : 'bg-near-black text-white hover:bg-[#2A2A28]'
          }`}
        >
          START CREATING
        </Button>
        <Button
          href="/portfolio"
          variant="outline"
          className={`rounded-full px-8 h-14 flex items-center justify-center text-[13px] font-semibold whitespace-nowrap transition-colors duration-300 ${
            mobile
              ? 'border border-white/40 text-white hover:bg-white/15'
              : 'border border-near-black/10 text-near-black hover:bg-black/5'
          }`}
        >
          EXPLORE GALLERY
        </Button>
      </motion.div>

      {/* Social Proof — hidden on mobile */}
      {!mobile && (
        <motion.div variants={fadeInUp} className="hidden lg:flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative"
              >
                <img
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <p className="text-xs font-medium max-w-[140px] leading-snug text-near-black/60">
            Join{' '}
            <span className="font-bold text-near-black">100+ Brands</span>{' '}
            and start manufacturing now
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
