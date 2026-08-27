'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShieldCheck, Search, Ruler, BadgeCheck } from 'lucide-react';

const QA_STEPS = [
  {
    icon: Search,
    title: 'Raw Material Audit',
    description: 'Before a single cut is made, all incoming fabrics and trims are inspected for colorfastness, shrinkage, weight (GSM), and weave integrity.'
  },
  {
    icon: Ruler,
    title: 'In-Line Inspection',
    description: 'Quality controllers monitor the assembly line in real-time, checking seam allowances, stitch density, and alignment at every sewing station.'
  },
  {
    icon: ShieldCheck,
    title: 'End-of-Line Audit',
    description: 'Every completed garment undergoes a rigorous 360-degree inspection for loose threads, symmetrical measurements, and hardware functionality.'
  },
  {
    icon: BadgeCheck,
    title: 'Pre-Shipment Verification',
    description: 'A final randomized AQL (Acceptable Quality Limit) audit ensures the entire batch meets your exact retail specifications before boxing.'
  }
];

export default function QualityPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          eyebrow="Quality Assurance"
          title="Uncompromising Standards"
          subtitle="A zero-defect mentality engineered into every stage of production."
        />

        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-square bg-[#F8F8F8] rounded-3xl relative overflow-hidden"
          >
            {/* Placeholder for QC image */}
            <div className="absolute inset-0 bg-near-black/5 flex items-center justify-center">
              <ShieldCheck className="w-32 h-32 text-near-black/10" />
            </div>
          </motion.div>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-sans font-black tracking-tight mb-4">Retail-Ready Perfection</h3>
              <p className="text-near-black/70 leading-relaxed">
                We understand that your brand's reputation hangs on the thread of every garment we produce. That's why our Quality Assurance team operates independently from our production managers, giving them the ultimate authority to halt production if standards are not met.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {QA_STEPS.map((step, index) => (
                <motion.div 
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <step.icon className="w-8 h-8 mb-4 text-near-black" strokeWidth={1.5} />
                  <h4 className="text-lg font-sans font-black tracking-tight mb-2">{step.title}</h4>
                  <p className="text-sm text-near-black/70 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
