'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Scissors, PenTool, Shirt, Package } from 'lucide-react';

const steps = [
  {
    icon: PenTool,
    title: 'Pattern Making & Grading',
    description: 'Precision engineering starts here. Our CAD specialists translate your designs into exact digital patterns, ensuring consistent fit across all size grades.',
  },
  {
    icon: Scissors,
    title: 'Automated Cutting',
    description: 'Utilizing state-of-the-art automated cutting machines to guarantee millimeter-level accuracy and minimal fabric waste.',
  },
  {
    icon: Shirt,
    title: 'Expert Assembly',
    description: 'Our skilled craftsmen and specialized sewing machinery assemble each garment with meticulous attention to stitch tension and seam integrity.',
  },
  {
    icon: Package,
    title: 'Finishing & Pressing',
    description: 'Garments undergo specialized pressing, trimming, and final detailing before being carefully packaged to your exact specifications.',
  }
];

export default function ManufacturingPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          eyebrow="Our Process"
          title="Manufacturing Excellence"
          subtitle="A harmonious blend of artisanal craftsmanship and cutting-edge industrial technology in Sialkot, Pakistan."
        />

        <div className="max-w-4xl mx-auto mt-24">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-8 items-start md:items-center p-8 bg-[#F8F8F8] rounded-3xl"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center">
                  <step.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-sans font-black tracking-tight mb-3">
                    <span className="text-near-black/30 mr-3">0{index + 1}</span>
                    {step.title}
                  </h3>
                  <p className="text-near-black/70 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block p-12 bg-black text-white rounded-3xl"
          >
            <h3 className="text-3xl font-sans font-black tracking-tight mb-6">Ready to scale your production?</h3>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Our facilities are equipped to handle runs from boutique collections to global retail fulfillment without ever compromising on quality.
            </p>
            <a href="/request-quote" className="inline-block bg-white text-black px-8 py-4 font-bold tracking-[1px] uppercase text-sm hover:bg-white/90 transition-colors">
              Request a Quote
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
