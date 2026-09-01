'use client';

import React from 'react';
import { HeroContent } from './HeroContent';
import { HeroVisual } from './HeroVisual';

export function Hero() {
  return (
    <section className="relative h-[100dvh] w-full bg-white overflow-hidden pt-20 lg:pt-28 pb-6 lg:pb-12 selection:bg-near-black selection:text-white flex items-center">
      {/* 
        SaaS-style layout:
        Strict single-page fit (100dvh).
      */}
      <div className="container mx-auto px-6 md:px-12 h-full flex items-center">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full h-full max-h-[800px] relative">

          {/* Content Column (Left) — full width on mobile */}
          <div className="col-span-1 lg:col-span-6 flex items-center h-full z-20">
            <HeroContent />
          </div>

          {/* Visual Column (Right) — hidden on mobile */}
          <div className="hidden lg:flex lg:col-span-6 w-full h-full items-center justify-center lg:pl-8 z-10">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
}
