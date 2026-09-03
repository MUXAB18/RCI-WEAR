'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Scissors, PenTool, Shirt, Package, Zap, Users, Factory, Settings, CheckCircle, Layers, Clock, TrendingUp } from 'lucide-react';

const MANUFACTURING_PROCESS = [
  {
    icon: PenTool,
    title: 'Pattern Making & Grading',
    description: 'CAD specialists translate designs into precise digital patterns with consistent fit across all sizes',
    capabilities: ['CAD pattern design', 'Size grading (XS-5XL)', 'Fit optimization', 'Digital tech packs']
  },
  {
    icon: Layers,
    title: 'Fabric Sourcing & Inspection',
    description: 'Premium fabric sourcing with rigorous quality inspection before production',
    capabilities: ['Global fabric network', 'GSM testing', 'Colorfastness check', 'Shrinkage testing']
  },
  {
    icon: Scissors,
    title: 'Automated Cutting',
    description: 'State-of-the-art cutting machines for precision and minimal waste',
    capabilities: ['Computer-aided cutting', 'Pattern optimization', 'Fabric efficiency', 'Zero-waste approach']
  },
  {
    icon: Shirt,
    title: 'Expert Assembly',
    description: 'Skilled craftsmen and specialized machinery for perfect construction',
    capabilities: ['Lock stitch machines', 'Overlock finishing', 'Bartack reinforcement', 'Quality stitching']
  },
  {
    icon: Settings,
    title: 'Decoration & Branding',
    description: 'Complete customization with printing, embroidery, and labeling',
    capabilities: ['Screen printing', 'Embroidery', 'Heat transfer', 'Custom labels']
  },
  {
    icon: Package,
    title: 'Finishing & Packaging',
    description: 'Professional pressing, quality check, and retail-ready packaging',
    capabilities: ['Steam pressing', 'Final inspection', 'Poly bagging', 'Carton packing']
  }
];

const FACILITIES = [
  {
    icon: Factory,
    title: 'Production Capacity',
    stats: [
      { label: 'Monthly Output', value: '50,000+' },
      { label: 'Production Lines', value: '6' },
      { label: 'Sewing Machines', value: '150+' }
    ]
  },
  {
    icon: Users,
    title: 'Workforce',
    stats: [
      { label: 'Skilled Workers', value: '200+' },
      { label: 'QC Inspectors', value: '15+' },
      { label: 'Years Experience', value: '8+' }
    ]
  },
  {
    icon: Zap,
    title: 'Technology',
    stats: [
      { label: 'CAD Systems', value: '10+' },
      { label: 'Auto Cutters', value: '5' },
      { label: 'Quality Scanners', value: '8' }
    ]
  },
  {
    icon: Clock,
    title: 'Lead Times',
    stats: [
      { label: 'Sampling', value: '7-10 Days' },
      { label: 'Production', value: '15-25 Days' },
      { label: 'Rush Orders', value: 'Available' }
    ]
  }
];

const CAPABILITIES = [
  { title: 'Cut & Sew Manufacturing', desc: 'Complete garment production from raw fabric' },
  { title: 'CMT (Cut, Make, Trim)', desc: 'You provide fabric, we handle the rest' },
  { title: 'Full Package Service', desc: 'From design to delivery - everything included' },
  { title: 'Private Label Production', desc: 'Your brand, our manufacturing expertise' },
  { title: 'Sampling Services', desc: 'Physical samples before bulk production' },
  { title: 'Small to Large Runs', desc: 'MOQ 50 units - scale to 50,000+' }
];

const EQUIPMENT = [
  { name: 'Single Needle Lock Stitch', count: '80+', use: 'Primary seam construction' },
  { name: 'Overlock/Serger Machines', count: '40+', use: 'Edge finishing and seam binding' },
  { name: 'Flatlock Machines', count: '15+', use: 'Activewear and stretch seams' },
  { name: 'Bartack Machines', count: '10+', use: 'Stress point reinforcement' },
  { name: 'Button Hole & Attaching', count: '12+', use: 'Button work and closures' },
  { name: 'Embroidery Machines', count: '8+', use: 'Logo and design embroidery' }
];

const STATS = [
  { value: '50K+', label: 'Garments/Month' },
  { value: '6', label: 'Production Lines' },
  { value: '200+', label: 'Skilled Workers' },
  { value: '15-25', label: 'Days Production' }
];

export default function ManufacturingPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <SectionHeading 
          eyebrow="Manufacturing"
          title="World-Class Production Facility"
          subtitle="Advanced manufacturing combining skilled craftsmanship with modern technology in Sialkot, Pakistan"
        />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {STATS.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="text-3xl md:text-4xl font-sans font-bold text-black mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Manufacturing Process */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              Our Manufacturing Process
            </h2>
            <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              6-stage production process ensuring quality at every step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MANUFACTURING_PROCESS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-black hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-sans font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Step {index + 1}
                </div>
                <h3 className="text-xl font-sans font-bold text-black mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 font-sans mb-4 text-sm">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.capabilities.map((capability, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Facilities Overview */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              Our Facilities
            </h2>
            <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              State-of-the-art production facility in Sialkot
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FACILITIES.map((facility, index) => (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                  <facility.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-sans font-bold text-black mb-4">
                  {facility.title}
                </h3>
                <div className="space-y-3">
                  {facility.stats.map((stat, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-sans">{stat.label}</span>
                      <span className="text-lg font-sans font-bold text-black">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Manufacturing Capabilities */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              Manufacturing Capabilities
            </h2>
            <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              Flexible services to match your production needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {CAPABILITIES.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-black hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-base font-sans font-bold text-black mb-1">
                      {capability.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-sans">
                      {capability.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Equipment List */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-200">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
                Manufacturing Equipment
              </h2>
              <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
                Advanced machinery for precision manufacturing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {EQUIPMENT.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.03 }}
                  className="bg-white p-6 rounded-xl border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-sans font-bold text-black">
                      {item.name}
                    </h3>
                    <span className="text-lg font-sans font-bold text-black">
                      {item.count}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-sans">
                    {item.use}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 bg-gradient-to-br from-near-black to-gray-900 rounded-3xl p-8 md:p-10 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-3">
            Ready to Start Manufacturing?
          </h2>
          <p className="text-white/80 text-base mb-6 max-w-xl mx-auto font-sans">
            From boutique collections to large-scale production - we scale with you
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/request-quote"
              className="inline-flex items-center gap-2 bg-white text-near-black px-8 py-3 rounded-full font-sans font-bold text-sm uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              Request Quote
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-sans font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
