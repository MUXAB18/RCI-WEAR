'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { companyData } from '@/data/company';
import { Check, Globe, FileText, Package, Shield, TrendingUp, Truck } from 'lucide-react';

export function ExportServicesClient() {
  const services = [
    {
      icon: Globe,
      title: 'Global Shipping',
      description: `Ship to ${companyData.statistics.countriesServed} countries with express, air, and sea freight options`,
      features: ['Express (3-5 days)', 'Air freight (7-10 days)', 'Sea freight (4-6 weeks)']
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Complete export paperwork and documentation handled',
      features: ['Commercial invoices', 'Packing lists', 'Certificate of origin']
    },
    {
      icon: Shield,
      title: 'Customs Support',
      description: 'Expert guidance through customs procedures and compliance',
      features: ['HS code classification', 'Duty calculations', 'Compliance verification']
    },
    {
      icon: Package,
      title: 'Secure Packaging',
      description: 'Professional packaging for safe product delivery',
      features: ['Poly bags', 'Reinforced cartons', 'Waterproof wrapping']
    },
    {
      icon: TrendingUp,
      title: 'Shipment Tracking',
      description: 'Real-time tracking and updates throughout shipping',
      features: ['Track & trace', 'Status updates', 'Delivery confirmation']
    },
    {
      icon: Truck,
      title: 'Insurance',
      description: 'Comprehensive cargo insurance and protection options',
      features: ['Cargo insurance', 'Damage protection', 'Claims assistance']
    },
  ];

  const exportMarkets = [
    { region: 'Europe', countries: ['UK', 'Germany', 'France', 'Netherlands', 'Italy'], icon: '🇪🇺' },
    { region: 'North America', countries: ['USA', 'Canada', 'Mexico'], icon: '🌎' },
    { region: 'Middle East', countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait'], icon: '🕌' },
    { region: 'Asia Pacific', countries: ['Australia', 'Japan', 'Singapore', 'Hong Kong'], icon: '🌏' },
  ];

  const processSteps = [
    { number: '01', title: 'Production Complete', description: 'Quality inspection and approval' },
    { number: '02', title: 'Documentation', description: 'Export documents prepared' },
    { number: '03', title: 'Packaging', description: 'Secure packaging with branding' },
    { number: '04', title: 'Customs Clearance', description: 'Export clearance from Pakistan' },
    { number: '05', title: 'Delivery', description: 'Safe arrival at your destination' }
  ];

  const shippingPartners = companyData.exportInfo.shippingPartners;

  return (
    <div className="space-y-20">
      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {[
          { label: 'Countries Served', value: '15+' },
          { label: 'Shipping Partners', value: '5+' },
          { label: 'Express Delivery', value: '3-5 Days' },
          { label: 'Sea Freight', value: '4-6 Weeks' }
        ].map((stat, index) => (
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

      {/* Services Grid */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
            Export Services
          </h2>
          <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
            Complete logistics support for international shipping
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-black hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-sans font-bold text-black mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 font-sans mb-4 text-sm">
                {service.description}
              </p>
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-sans">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Export Markets */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-near-black to-gray-900 rounded-3xl p-8 md:p-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-white mb-4">
            Our Export Markets
          </h2>
          <p className="text-white/70 font-sans text-base">
            Delivering to brands across the globe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exportMarkets.map((market, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="text-3xl mb-3">{market.icon}</div>
              <h3 className="text-lg font-sans font-bold text-white mb-3">
                {market.region}
              </h3>
              <ul className="space-y-1.5">
                {market.countries.map((country, idx) => (
                  <li key={idx} className="text-sm text-white/80 font-sans">
                    • {country}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Shipping Partners */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
          Trusted Partners
        </h2>
        <p className="text-gray-600 font-sans text-base mb-10">
          Industry-leading carriers for reliable delivery
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {shippingPartners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 hover:shadow-lg transition-all duration-300"
            >
              <span className="text-xl font-bold text-gray-800 font-sans">{partner}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Process */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
            Export Process
          </h2>
          <p className="text-gray-600 font-sans text-base">
            Simple process from production to delivery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center relative"
            >
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-base font-sans font-bold text-black mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 font-sans">
                {step.description}
              </p>
              {/* Connector Line */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-200" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-near-black to-gray-900 rounded-3xl p-8 md:p-10 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-3">
          Ready to Start Exporting?
        </h2>
        <p className="text-white/80 text-base mb-6 max-w-xl mx-auto font-sans">
          Get a quote for manufacturing and export - we handle everything
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
  );
}
