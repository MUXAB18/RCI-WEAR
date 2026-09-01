'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function CapabilitiesSection() {
  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden relative w-full font-sans">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0 relative">

          {/* HUGE TEXT ON THE LEFT */}
          <div className="lg:w-[35%] z-10 lg:pl-10 relative">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-[110px] font-sans font-black leading-[1.1] text-black tracking-tight"
            >
              Why <br /> Choose <br /> us?
            </motion.h2>
          </div>

          {/* ROTATED CARD ON THE RIGHT */}
          <div className="lg:w-[65%] relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring", bounce: 0.2 }}
              className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] flex flex-col md:flex-row gap-10 md:gap-14 border border-gray-100 transform -rotate-2 md:-rotate-3"
            >

              {/* Left Column of Card: 3 Stacked Images */}
              <div className="w-full md:w-[45%] flex flex-col gap-4">
                <div className="relative w-full aspect-[21/9] md:aspect-[16/7] rounded-3xl overflow-hidden shadow-sm">
                  <Image
                    src="/media__1775818869472.webp"
                    alt="Manufacturing"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-full aspect-[21/9] md:aspect-[16/7] rounded-3xl overflow-hidden shadow-sm">
                  <Image
                    src="/media__1775817925946.webp"
                    alt="Embroidery"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-full aspect-[21/9] md:aspect-[16/7] rounded-3xl overflow-hidden shadow-sm">
                  <Image
                    src="/media__1775817915164.webp"
                    alt="Printing"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right Column of Card: Content */}
              <div className="w-full md:w-[55%] flex flex-col justify-center">
                <h3 className="text-3xl md:text-[38px] font-sans font-extrabold text-black leading-tight mb-4 tracking-tight">
                  Why Choose <br /> RCI?
                </h3>

                <p className="text-gray-500 text-[15px] leading-relaxed mb-8 max-w-sm">
                  Discover the Benefits That Drive Your Apparel Brand Forward.
                </p>

                <div className="space-y-6 mb-10">
                  {/* Feature 1 */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-black text-white rounded-full p-[2px]">
                      <CheckCircle2 className="w-4 h-4" strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-black text-base mb-1">Expert Craftsmanship</h4>
                      <p className="font-sans text-gray-500 text-xs leading-relaxed max-w-xs">
                        Our skilled team provides precision from pattern to finished garment, helping you achieve the perfect fit.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-black text-white rounded-full p-[2px]">
                      <CheckCircle2 className="w-4 h-4" strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-black text-base mb-1">State-of-the-Art Factory</h4>
                      <p className="font-sans text-gray-500 text-xs leading-relaxed max-w-xs">
                        Work with the latest manufacturing technology to maximize your results and production scale.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 bg-black text-white rounded-full p-[2px]">
                      <CheckCircle2 className="w-4 h-4" strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-black text-base mb-1">Comprehensive Quality</h4>
                      <p className="font-sans text-gray-500 text-xs leading-relaxed max-w-xs">
                        Enjoy zero-defect manufacturing with rigorous multi-stage inspections on every production run.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Link
                    href="/contact"
                    className="inline-block bg-black text-white text-sm font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Start Your Project
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
