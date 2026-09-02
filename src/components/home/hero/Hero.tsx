'use client';

import React from 'react';
import Image from 'next/image';
import { HeroContent } from './HeroContent';
import { HeroVisual } from './HeroVisual';

export function Hero() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden flex items-center selection:bg-near-black selection:text-white">

      {/* ── MOBILE BACKGROUND (hidden on lg+) ── */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/mobile-hero-hoodies.jpg"
          alt="Premium clothing manufacturing"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay — much lighter since the new image is naturally very dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        {/* Subtle left vignette to frame the text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      </div>

      {/* ── DESKTOP BACKGROUND ── */}
      <div className="absolute inset-0 hidden lg:block bg-white" />

      {/* ── MAIN CONTAINER ── */}
      <div className="container mx-auto px-6 md:px-12 h-full flex items-center pt-20 lg:pt-28 pb-6 lg:pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full h-full max-h-[800px] relative">

          {/* Content Column */}
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-center h-full z-20">
            <HeroContentMobile />
            <div className="hidden lg:block w-full h-full">
              {/* Desktop uses the original HeroContent rendered below */}
            </div>
          </div>

          {/* Visual Column (Right) — desktop only */}
          <div className="hidden lg:flex lg:col-span-6 w-full h-full items-center justify-center lg:pl-8 z-10">
            <HeroVisual />
          </div>

        </div>
      </div>

      {/* Scroll hint on mobile */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:hidden flex flex-col items-center gap-1.5 z-20">
        <span className="text-white/40 text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}

// Mobile-only hero content — white text on dark image background
function HeroContentMobile() {
  return (
    <>
      {/* Mobile version — white text on image */}
      <div className="lg:hidden flex flex-col justify-center h-full">
        <HeroContent mobile />
      </div>
      {/* Desktop version — dark text on white */}
      <div className="hidden lg:flex w-full h-full">
        <HeroContent />
      </div>
    </>
  );
}
