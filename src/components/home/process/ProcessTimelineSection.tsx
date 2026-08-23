'use client';

import React from 'react';
import { motion } from 'framer-motion';

const processSteps = [
  {
    number: '01',
    title: 'The Blueprint',
    description: 'Every masterpiece begins with absolute clarity. We decode your vision—analyzing technical requirements, aesthetic goals, and precise measurements to establish an uncompromising blueprint for production.',
    position: 'bottom'
  },
  {
    number: '02',
    title: 'Material Curation',
    description: 'We meticulously curate premium textiles and bespoke trims from trusted global mills. Only materials that meet our rigorous standards for drape, durability, and texture are selected for your garments.',
    position: 'top'
  },
  {
    number: '03',
    title: 'The Prototype',
    description: 'Before full-scale production, our master pattern-makers construct a pristine sample. This physical prototype undergoes exhaustive fittings to ensure the silhouette and construction are flawless.',
    position: 'bottom'
  },
  {
    number: '04',
    title: 'Precision Assembly',
    description: 'Our artisans bring the blueprint to life. Utilizing advanced machinery and time-honored tailoring techniques, each panel is cut, embroidered, and stitched with exacting precision in our Sialkot facility.',
    position: 'top'
  },
  {
    number: '05',
    title: 'Final Audit',
    description: 'Excellence is never left to chance. Every single garment is subjected to a rigorous quality audit—inspecting seams, finishes, and dimensions—before being elegantly packaged for global dispatch.',
    position: 'bottom'
  }
];

export function ProcessTimelineSection() {
  return (
    <section className="bg-[#F5F5F0] py-24 md:py-32 overflow-hidden w-full">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        
        {/* Header (Optional, but good for context if needed, though screenshot doesn't show one. I'll add a minimal one just in case, or leave it out if they just want the timeline. I'll add a subtle header.) */}
        <div className="mb-24 flex flex-col items-center text-center">
           <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="w-8 h-[1px] bg-black" />
            <span className="text-[10px] font-sans font-bold tracking-[3px] uppercase text-gray-500">
              Our Process
            </span>
            <span className="w-8 h-[1px] bg-black" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-black tracking-tight font-sans"
          >
            How We Build It
          </motion.h2>
        </div>

        {/* Timeline Desktop Container */}
        <div className="hidden lg:block relative w-full pt-12 pb-12">
          {/* Continuous Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#E0DCD3] -translate-y-1/2 z-0" />

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {processSteps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center h-[350px]">
                
                {/* Top Content */}
                <div className={`w-full px-4 flex flex-col justify-end h-1/2 pb-12 ${step.position === 'top' ? 'opacity-100' : 'opacity-0 invisible'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-[#C1A67B] font-sans italic text-sm">{step.number}</span>
                      <h3 className="text-xl font-sans font-bold text-black">{step.title}</h3>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Center Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[1px] border-black bg-[#F5F5F0] flex items-center justify-center z-10 shadow-[0_0_0_4px_#F5F5F0]">
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                </div>

                {/* Bottom Content */}
                <div className={`w-full px-4 flex flex-col justify-start h-1/2 pt-12 ${step.position === 'bottom' ? 'opacity-100' : 'opacity-0 invisible'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-[#C1A67B] font-sans italic text-sm">{step.number}</span>
                      <h3 className="text-xl font-sans font-bold text-black">{step.title}</h3>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Timeline (Vertical) */}
        <div className="lg:hidden flex flex-col gap-12 relative pl-6">
          {/* Vertical Line */}
          <div className="absolute top-2 left-6 bottom-2 w-[1px] bg-[#E0DCD3] z-0 -translate-x-[7px]" />
          
          {processSteps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative z-10 pl-8"
            >
              {/* Node */}
              <div className="absolute top-1.5 -left-[7px] -translate-x-1/2 w-4 h-4 rounded-full border-[1px] border-black bg-[#F5F5F0] flex items-center justify-center z-10 shadow-[0_0_0_4px_#F5F5F0]">
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
              </div>
              
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[#C1A67B] font-sans italic text-sm">{step.number}</span>
                <h3 className="text-lg font-sans font-bold text-black">{step.title}</h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
