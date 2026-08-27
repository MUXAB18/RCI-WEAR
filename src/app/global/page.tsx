'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Globe2, Plane, Ship, Clock } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Globe2,
    title: '50+ Countries',
    description: 'We successfully export to North America, Europe, Australia, and the Middle East, understanding the unique compliance and sizing standards of each region.'
  },
  {
    icon: Plane,
    title: 'Air Freight',
    description: 'For time-sensitive collections, we partner with DHL, FedEx, and UPS to deliver door-to-door in 3-5 business days.'
  },
  {
    icon: Ship,
    title: 'Sea Freight',
    description: 'For bulk orders, we manage FCL (Full Container Load) and LCL (Less than Container Load) logistics, handling customs clearance effortlessly.'
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'We pride ourselves on our 98% on-time delivery rate. Your launch dates are non-negotiable to us.'
  }
];

export default function GlobalPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          eyebrow="Logistics & Shipping"
          title="From Sialkot to the World"
          subtitle="Seamless global logistics ensuring your garments arrive exactly when and where you need them."
        />

        <div className="mt-24 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full h-64 md:h-96 bg-[#F8F8F8] rounded-3xl mb-16 relative overflow-hidden flex items-center justify-center"
          >
             <Globe2 className="w-48 h-48 text-near-black/5 absolute" />
             <div className="relative z-10 text-center px-4">
                <h3 className="text-4xl md:text-5xl font-sans font-black tracking-tight mb-2">Border-less Manufacturing</h3>
                <p className="text-near-black/50 font-bold uppercase tracking-[2px]">FCA • FOB • CIF • DDP</p>
             </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {HIGHLIGHTS.map((highlight, index) => (
              <motion.div 
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <highlight.icon className="w-8 h-8 text-near-black" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xl font-sans font-black tracking-tight mb-2">{highlight.title}</h4>
                  <p className="text-near-black/70 leading-relaxed font-sans">{highlight.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
