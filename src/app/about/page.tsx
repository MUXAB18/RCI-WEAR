'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, Factory, Users, Target, Award } from 'lucide-react';
import { companyData } from '@/data/company';
import { SectionHeading } from '@/components/ui/SectionHeading';

export default function AboutPage() {

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          eyebrow="Our Story"
          title="About Rasheed Clothing International"
          subtitle={`${companyData.slogan} - A legacy of manufacturing excellence from ${companyData.location}.`}
        />

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-3xl font-sans font-black tracking-tight mb-6">
              Built on Craftsmanship. <br /> Scaled by Technology.
            </h3>
            <p className="text-near-black/70 leading-relaxed mb-6">
              {companyData.description}
            </p>
            <p className="text-near-black/70 leading-relaxed mb-8">
              Since {companyData.founded}, we've been bridging the gap between premium international fashion brands and high-quality, reliable manufacturing. Today, we're proud to be the trusted manufacturing partner for brands across North America, Europe, and beyond.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-sans font-black tracking-tight mb-2">
                  {companyData.statistics.yearsOfExperience}+
                </div>
                <div className="text-xs font-bold tracking-[2px] uppercase text-near-black/50 font-sans">
                  Years Excellence
                </div>
              </div>
              <div>
                <div className="text-4xl font-sans font-black tracking-tight mb-2">
                  {companyData.statistics.countriesServed}
                </div>
                <div className="text-xs font-bold tracking-[2px] uppercase text-near-black/50 font-sans">
                  Countries Served
                </div>
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
              src="/media__1775817925946.webp"
              alt="Manufacturing Facility"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-gradient-to-br from-near-black to-gray-900 rounded-3xl p-8 md:p-12 text-white">
            <Target className="w-12 h-12 mb-6" />
            <h3 className="text-2xl md:text-3xl font-sans font-bold mb-4">Our Mission</h3>
            <p className="text-white/80 leading-relaxed font-sans">
              To empower fashion brands worldwide with premium, ethically-manufactured apparel that exceeds expectations in quality, reliability, and value. We transform creative visions into tangible products that brands are proud to wear their name on.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-8 md:p-12">
            <Award className="w-12 h-12 mb-6 text-near-black" />
            <h3 className="text-2xl md:text-3xl font-sans font-bold text-black mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed font-sans">
              To be recognized globally as the most trusted and innovative apparel manufacturing partner, setting new industry standards in quality, sustainability, and client satisfaction while showcasing Pakistan's manufacturing excellence.
            </p>
          </div>
        </motion.section>

        {/* Values */}
        <SectionHeading 
          eyebrow="Our Values"
          title="The RCI Difference"
          subtitle="What sets us apart in the global apparel supply chain."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
              className="p-8 border border-gray-100 bg-[#F8F8F8] rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <CheckCircle2 className="w-8 h-8 text-near-black mb-6" />
              <h4 className="text-xl font-sans font-black tracking-tight mb-4">{val.title}</h4>
              <p className="text-sm font-sans text-near-black/70 leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-br from-near-black to-gray-900 rounded-3xl p-12"
        >
          <h3 className="text-3xl md:text-4xl font-sans font-bold text-white mb-4">
            Ready to Work Together?
          </h3>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto font-sans">
            Let's discuss how we can bring your apparel vision to life with our manufacturing expertise
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-near-black px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wider uppercase hover:bg-gray-100 transition-all duration-300 hover:scale-105"
          >
            Start Your Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
