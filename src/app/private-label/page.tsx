'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tag, PackageOpen, Shirt, PenTool } from 'lucide-react';

const SERVICES = [
  {
    icon: Tag,
    title: 'Custom Woven Labels & Hangtags',
    description: 'We weave, print, and attach premium neck labels, care tags, and heavy-stock hangtags to give your garments a complete retail-ready finish.'
  },
  {
    icon: PackageOpen,
    title: 'Bespoke Packaging',
    description: 'From frosted zip-lock polybags with your logo to custom branded shipping mailers, we handle the complete unboxing experience.'
  },
  {
    icon: Shirt,
    title: 'Custom Hardware',
    description: 'Elevate your pieces with custom-molded zippers, embossed metal eyelets, engraved drawcord aglets, and branded snaps.'
  },
  {
    icon: PenTool,
    title: 'Screenprint & Embroidery',
    description: 'High-density puff prints, DTG, discharge printing, and 3D puff embroidery applied flawlessly to your private label blanks.'
  }
];

export default function PrivateLabelPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          eyebrow="White Label Services"
          title="Your Brand, Our Expertise"
          subtitle="End-to-end private label manufacturing. We remain invisible so your brand can shine."
        />

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-10 border border-near-black/10 rounded-3xl hover:border-near-black/30 transition-colors"
            >
              <div className="w-14 h-14 bg-[#F8F8F8] rounded-full flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-near-black" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-sans font-black tracking-tight mb-4">{service.title}</h3>
              <p className="text-near-black/70 leading-relaxed font-sans">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
