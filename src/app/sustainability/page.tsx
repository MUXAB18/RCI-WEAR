'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Leaf, Recycle, Droplets, Sun, Users, Shield, Award, CheckCircle, Heart, Zap, Trees, Wind } from 'lucide-react';

const PILLARS = [
  {
    icon: Users,
    title: 'Ethical Labor',
    description: 'Fair wages, safe working conditions, and reasonable hours - our people are our strength',
    features: ['Living wages above minimum', 'Safe working environment', 'No child labor', 'Regular health checkups']
  },
  {
    icon: Droplets,
    title: 'Water Conservation',
    description: 'Closed-loop dyeing and water recycling systems reducing consumption by 60%',
    features: ['Recycled water systems', 'OEKO-TEX certified dyes', 'Low-impact washing', 'Zero toxic discharge']
  },
  {
    icon: Recycle,
    title: 'Waste Reduction',
    description: 'Precision cutting and fabric recycling to minimize landfill waste',
    features: ['CAD pattern optimization', 'Scrap fabric recycling', '90% waste reduction', 'Zero-waste packaging']
  },
  {
    icon: Sun,
    title: 'Clean Energy',
    description: 'Transitioning to renewable energy and maximizing natural light',
    features: ['Solar power integration', 'LED lighting throughout', 'Energy-efficient machines', 'Carbon footprint tracking']
  },
  {
    icon: Trees,
    title: 'Sustainable Materials',
    description: 'Organic, recycled, and eco-friendly fabric options available',
    features: ['Organic cotton', 'Recycled polyester', 'Bamboo & Tencel', 'BCI certified cotton']
  },
  {
    icon: Heart,
    title: 'Social Responsibility',
    description: 'Supporting local communities and empowering workers',
    features: ['Skills training programs', 'Women empowerment', 'Community development', 'Healthcare support']
  }
];

const CERTIFICATIONS = [
  { name: 'OEKO-TEX', desc: 'Certified safe textile production' },
  { name: 'WRAP', desc: 'Worldwide Responsible Accredited Production' },
  { name: 'BCI', desc: 'Better Cotton Initiative member' },
  { name: 'GOTS Ready', desc: 'Global Organic Textile Standard compliance' },
  { name: 'ISO 9001', desc: 'Quality management certified' },
  { name: 'SA8000', desc: 'Social accountability certified' }
];

const INITIATIVES = [
  {
    icon: Droplets,
    title: 'Water Recycling System',
    impact: '60% reduction in water use',
    description: 'Our closed-loop system recycles and treats water used in dyeing and washing processes'
  },
  {
    icon: Recycle,
    title: 'Fabric Scrap Upcycling',
    impact: '90% waste diverted from landfills',
    description: 'Leftover fabric is collected and transformed into industrial textiles and insulation'
  },
  {
    icon: Sun,
    title: 'Solar Power Transition',
    impact: '40% renewable energy',
    description: 'Installing solar panels across our facilities to reduce carbon emissions'
  },
  {
    icon: Trees,
    title: 'Tree Planting Program',
    impact: '500+ trees planted annually',
    description: 'Carbon offset initiative supporting local reforestation projects'
  }
];

const STATS = [
  { value: '60%', label: 'Water Saved' },
  { value: '90%', label: 'Waste Reduced' },
  { value: '40%', label: 'Renewable Energy' },
  { value: '100%', label: 'Fair Wages' }
];

export default function SustainabilityPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <SectionHeading 
          eyebrow="Sustainability"
          title="Conscious Manufacturing"
          subtitle="Building a responsible supply chain that respects people and planet"
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

        {/* Sustainability Pillars */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              Our Sustainability Pillars
            </h2>
            <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              Six core commitments driving our responsible manufacturing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-black hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-sans font-bold text-black mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 font-sans mb-4 text-sm">
                  {pillar.description}
                </p>
                <div className="space-y-2">
                  {pillar.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-sans">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Key Initiatives */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              Active Initiatives
            </h2>
            <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              Measurable actions creating real environmental impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INITIATIVES.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:border-black hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white flex-shrink-0">
                    <initiative.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-sans font-bold text-black mb-1">
                      {initiative.title}
                    </h3>
                    <p className="text-green-600 font-sans font-bold text-sm">
                      {initiative.impact}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 font-sans text-sm">
                  {initiative.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              Certifications & Standards
            </h2>
            <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              Verified compliance with global sustainability standards
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center hover:border-black hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-3">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-sm font-sans font-bold text-black mb-1">
                  {cert.name}
                </h3>
                <p className="text-xs text-gray-600 font-sans">
                  {cert.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Commitment Statement */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-200"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-6">
              Our Commitment to You
            </h2>
            <p className="text-gray-700 font-sans leading-relaxed mb-8">
              We believe that sustainable manufacturing isn't just good for the planet — it's good for business. 
              When you partner with Rasheed Clothing, you're choosing a manufacturer that prioritizes ethical 
              practices, environmental responsibility, and transparent operations. Together, we can build a 
              supply chain you can be proud of.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-sans font-bold text-gray-700">Transparent Reporting</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-sans font-bold text-gray-700">Continuous Improvement</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-sans font-bold text-gray-700">Third-Party Audited</span>
              </div>
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
            Build a Sustainable Supply Chain
          </h2>
          <p className="text-white/80 text-base mb-6 max-w-xl mx-auto font-sans">
            Partner with a manufacturer that shares your values
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
              Learn More
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
