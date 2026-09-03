'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function WhyPakistanSection() {
  const advantages = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Cost-Effective Excellence',
      description: 'Premium quality at competitive rates. Pakistan offers 30-40% cost savings compared to European manufacturers without compromising on quality standards.',
      highlight: '30-40% Cost Savings'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'World-Class Quality',
      description: 'Sialkot is renowned globally for precision manufacturing. Our craftsmen combine traditional expertise with modern technology to deliver exceptional products.',
      highlight: '99.5% Quality Rate'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: 'Rich Textile Heritage',
      description: 'Pakistan is the 4th largest cotton producer globally. Direct access to premium raw materials means superior fabric quality and faster production cycles.',
      highlight: '4th Largest Cotton Producer'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Strategic Location',
      description: 'Perfectly positioned for global trade. Easy access to Middle East, Europe, and Asia markets with established logistics networks and shipping routes.',
      highlight: 'Global Export Hub'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: 'Advanced Technology',
      description: 'State-of-the-art machinery and manufacturing processes. We invest in the latest equipment to ensure precision, consistency, and efficiency in every order.',
      highlight: 'Modern Facilities'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Skilled Workforce',
      description: 'Generations of craftsmanship. Our experienced team brings decades of specialized knowledge in garment construction, finishing, and quality control.',
      highlight: 'Expert Craftsmen'
    },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-xs md:text-sm font-sans font-bold tracking-[3px] uppercase text-gray-500 mb-4">
            Manufacturing Excellence
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-black mb-6 leading-tight">
            Why Choose Pakistan<br />for Manufacturing?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-sans max-w-3xl mx-auto leading-relaxed">
            Sialkot, Pakistan is a global leader in precision manufacturing, 
            combining centuries of textile heritage with cutting-edge technology.
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 h-full hover:bg-white hover:border-near-black hover:shadow-xl transition-all duration-500">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-near-black text-white mb-5 group-hover:scale-110 transition-transform duration-300">
                  {advantage.icon}
                </div>

                {/* Highlight Badge */}
                <div className="inline-block bg-black/5 px-3 py-1 rounded-full mb-4">
                  <span className="text-[10px] md:text-xs font-sans font-bold text-black uppercase tracking-wider">
                    {advantage.highlight}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-serif font-bold text-black mb-3">
                  {advantage.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed">
                  {advantage.description}
                </p>

                {/* Hover Accent */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-near-black group-hover:w-full transition-all duration-500 rounded-b-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pakistan Flag & Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-[#01411C] to-[#01411C] rounded-3xl p-8 md:p-12 overflow-hidden"
        >
          {/* Flag Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="60" cy="50" r="15" fill="white" />
                <path d="M65 35 L75 50 L65 65 Z" fill="white" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-4xl font-serif font-bold text-white mb-4">
                Made in Pakistan, Trusted Worldwide
              </h3>
              <p className="text-white/80 font-sans text-base md:text-lg mb-6">
                Join hundreds of international brands who trust Pakistani manufacturing 
                for their apparel needs. Quality, reliability, and competitive pricing.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#01411C] px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wider uppercase hover:bg-gray-100 transition-all duration-300"
              >
                Start Your Project
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">$20B+</div>
                <div className="text-sm text-white/70 font-sans">Textile Exports</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">150+</div>
                <div className="text-sm text-white/70 font-sans">Export Countries</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
