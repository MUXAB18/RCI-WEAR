'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { companyData } from '@/data/company';
import { SectionHeading } from '@/components/ui/SectionHeading';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          eyebrow="Our Story"
          title="About Rasheed Clothing International"
          subtitle={`A legacy of manufacturing excellence based in ${companyData.location}.`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-3xl font-sans font-black tracking-tight mb-6">Built on Craftsmanship. <br /> Scaled by Technology.</h3>
            <p className="text-near-black/70 leading-relaxed mb-6">
              {companyData.description}
            </p>
            <p className="text-near-black/70 leading-relaxed mb-8">
              We started with a simple mission: to bridge the gap between premium international fashion brands and high-quality, reliable manufacturing. Today, we are proud to be the trusted manufacturing partner for brands across North America, Europe, and Oceania.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-sans font-black tracking-tight mb-2">15+</div>
                <div className="text-xs font-bold tracking-[2px] uppercase text-near-black/50 font-sans">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-sans font-black tracking-tight mb-2">50+</div>
                <div className="text-xs font-bold tracking-[2px] uppercase text-near-black/50 font-sans">Global Partners</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-full min-h-[400px] lg:min-h-0 w-full bg-[#F8F8F8] rounded-3xl overflow-hidden"
          >
            <Image
              src="/media__1775817925946.webp" // Worker image
              alt="Manufacturing Facility"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>

        <SectionHeading 
          eyebrow="Our Values"
          title="The RCI Difference"
          subtitle="What sets us apart in the global apparel supply chain."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Ethical Manufacturing",
              desc: "We strictly adhere to fair labor practices, ensuring safe working conditions and equitable compensation for all our craftsmen."
            },
            {
              title: "Sustainable Practices",
              desc: "From minimizing fabric waste to adopting eco-friendly dyes, we are committed to reducing the environmental footprint of fashion."
            },
            {
              title: "Uncompromising Quality",
              desc: "Every garment is subjected to a rigorous multi-stage inspection process, guaranteeing retail-ready perfection upon delivery."
            }
          ].map((val, i) => (
            <motion.div 
              key={val.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 border border-gray-100 bg-[#F8F8F8]"
            >
              <CheckCircle2 className="w-8 h-8 text-near-black mb-6" />
              <h4 className="text-xl font-sans font-black tracking-tight mb-4">{val.title}</h4>
              <p className="text-sm font-sans text-near-black/70 leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
