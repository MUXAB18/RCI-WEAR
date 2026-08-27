'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Palette, Droplets, Feather } from 'lucide-react';

const FABRICS = [
  {
    category: 'Luxury Essentials',
    description: 'The backbone of premium streetwear and casual collections.',
    items: [
      { name: 'Heavyweight French Terry', weight: '400-500 GSM', icon: Palette },
      { name: 'Combed Cotton Jersey', weight: '220-280 GSM', icon: Feather },
      { name: 'Brushed Fleece', weight: '350-450 GSM', icon: Palette },
    ]
  },
  {
    category: 'Technical & Active',
    description: 'Performance-driven materials engineered for movement and durability.',
    items: [
      { name: 'Nylon Taslan/Supplex', feature: 'Water Repellent', icon: Droplets },
      { name: 'Spandex Interlock', feature: '4-Way Stretch', icon: Feather },
      { name: 'Micro-Mesh', feature: 'Moisture Wicking', icon: Droplets },
    ]
  }
];

export default function FabricsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          eyebrow="Raw Materials"
          title="The Foundation of Luxury"
          subtitle="Exceptional garments require exceptional fabrics. We source, develop, and weave premium textiles from the world's best mills."
        />

        <div className="mt-24 max-w-6xl mx-auto space-y-24">
          {FABRICS.map((section, idx) => (
            <div key={section.category} className="space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center md:text-left border-b border-near-black/10 pb-8"
              >
                <h3 className="text-3xl font-sans font-black tracking-tight mb-3">{section.category}</h3>
                <p className="text-near-black/60 font-sans text-lg max-w-2xl">{section.description}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="group bg-[#F8F8F8] p-8 rounded-3xl hover:bg-black transition-colors duration-500"
                  >
                    <item.icon className="w-8 h-8 mb-6 text-near-black group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                    <h4 className="text-xl font-sans font-black tracking-tight mb-2 group-hover:text-white transition-colors duration-500">{item.name}</h4>
                    <p className="text-sm font-sans text-near-black/50 group-hover:text-white/70 uppercase tracking-[1px] font-bold transition-colors duration-500">
                      {'weight' in item ? item.weight : item.feature}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-16 bg-black text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-3xl font-sans font-black tracking-tight mb-4">Custom Fabric Development</h3>
            <p className="text-white/70 leading-relaxed font-sans">
              Need a proprietary blend or a specific Pantone dye? Our R&D team works directly with mills to develop bespoke textiles exclusively for your collections. Minimum order quantities apply.
            </p>
          </div>
          <a href="/request-quote" className="whitespace-nowrap inline-block bg-white text-black px-8 py-4 font-bold tracking-[1px] uppercase text-sm hover:bg-white/90 transition-colors">
            Inquire About Custom Fabrics
          </a>
        </motion.div>
      </div>
    </div>
  );
}
