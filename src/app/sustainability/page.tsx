'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Leaf, Recycle, Droplets, Sun } from 'lucide-react';

const pillars = [
  {
    icon: Leaf,
    title: 'Ethical Labor',
    description: 'We believe that beautiful garments can only be made by people who are treated beautifully. Our facilities operate strictly above global labor standards, ensuring fair wages, safe environments, and reasonable hours.'
  },
  {
    icon: Recycle,
    title: 'Waste Reduction',
    description: 'Through precision CAD pattern-making and automated cutting, we maximize fabric utilization. Scrap materials are collected and upcycled into industrial textiles, minimizing our landfill footprint.'
  },
  {
    icon: Droplets,
    title: 'Eco-Friendly Dyes',
    description: 'We utilize closed-loop dyeing processes and OEKO-TEX certified, non-toxic dyes that dramatically reduce water consumption and prevent harmful chemical runoff.'
  },
  {
    icon: Sun,
    title: 'Energy Efficiency',
    description: 'Our manufacturing floors are designed to maximize natural light, and we are aggressively transitioning our power grid to solar alternatives to reduce our carbon footprint.'
  }
];

export default function SustainabilityPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          eyebrow="Our Commitment"
          title="Conscious Craftsmanship"
          subtitle="Redefining the global supply chain with practices that respect both people and the planet."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div 
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-10 border border-gray-100 bg-[#F8F8F8] hover:bg-black hover:text-white transition-colors duration-500 group"
            >
              <pillar.icon className="w-10 h-10 mb-8 text-near-black group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
              <h3 className="text-2xl font-sans font-black tracking-tight mb-4">{pillar.title}</h3>
              <p className="text-near-black/70 group-hover:text-white/70 leading-relaxed font-sans transition-colors duration-500">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 max-w-4xl mx-auto text-center p-16 bg-[#F8F8F8] rounded-3xl"
        >
          <h2 className="text-3xl font-sans font-black tracking-tight mb-6">Partnering for a Greener Future</h2>
          <p className="text-near-black/70 leading-relaxed mb-8">
            Are you a sustainable brand looking for a manufacturing partner who shares your values? Let's build a supply chain you can be proud of.
          </p>
          <a href="/request-quote" className="inline-block bg-black text-white px-8 py-4 font-bold tracking-[1px] uppercase text-sm hover:bg-near-black transition-colors">
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
}
