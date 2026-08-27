'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowRight } from 'lucide-react';

const STUDIES = [
  {
    client: 'Apex Athletics',
    category: 'Activewear',
    stats: [
      { label: 'Units Delivered', value: '25,000+' },
      { label: 'Defect Rate', value: '< 0.1%' },
      { label: 'Timeline', value: '60 Days' }
    ],
    description: 'A rapidly scaling performance brand needed a manufacturer capable of producing custom 4-way stretch fabrics while maintaining strict color consistency across 12 different styles.',
    delay: 0.1
  },
  {
    client: 'Nouveau Street',
    category: 'Luxury Streetwear',
    stats: [
      { label: 'Units Delivered', value: '5,000' },
      { label: 'Custom Wash', value: 'Enzyme/Acid' },
      { label: 'Timeline', value: '45 Days' }
    ],
    description: 'An emerging Parisian label required ultra-heavyweight 500 GSM hoodies with complex vintage acid washes and high-density puff printing for their seasonal capsule.',
    delay: 0.2
  },
  {
    client: 'Global Logistics Corp',
    category: 'Corporate Uniforms',
    stats: [
      { label: 'Units Delivered', value: '50,000+' },
      { label: 'Durability', value: 'Industrial Wash' },
      { label: 'Timeline', value: '90 Days' }
    ],
    description: 'A multinational shipping company needed highly durable, stain-resistant uniforms for their global workforce, requiring robust hardware and standardized sizing across continents.',
    delay: 0.3
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          eyebrow="Our Track Record"
          title="Success Stories"
          subtitle="Real challenges. Proven solutions. See how we've helped brands scale their production without compromising their aesthetic."
        />

        <div className="mt-24 space-y-24 max-w-6xl mx-auto">
          {STUDIES.map((study, idx) => (
            <motion.div 
              key={study.client}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: study.delay }}
              className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center group"
            >
              <div className={`w-full lg:w-1/2 aspect-square bg-[#F8F8F8] rounded-3xl relative overflow-hidden ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                 {/* Image Placeholder */}
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
                 <div className="absolute inset-0 flex items-center justify-center text-near-black/10 font-black text-6xl uppercase tracking-tighter transform -rotate-12 select-none">
                    {study.client}
                 </div>
              </div>
              
              <div className={`w-full lg:w-1/2 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div className="mb-8 border-b border-near-black/10 pb-8">
                  <span className="text-sm font-bold uppercase tracking-[2px] text-near-black/50 block mb-2">{study.category}</span>
                  <h3 className="text-4xl md:text-5xl font-sans font-black tracking-tight">{study.client}</h3>
                </div>
                
                <p className="text-xl text-near-black/70 leading-relaxed font-sans mb-12">
                  {study.description}
                </p>
                
                <div className="grid grid-cols-3 gap-6 mb-12">
                  {study.stats.map(stat => (
                    <div key={stat.label}>
                      <div className="text-2xl md:text-3xl font-black tracking-tight mb-1">{stat.value}</div>
                      <div className="text-xs uppercase tracking-[1px] font-bold text-near-black/50">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <button className="flex items-center text-sm font-bold uppercase tracking-[2px] hover:opacity-70 transition-opacity">
                  Read Full Case Study <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
