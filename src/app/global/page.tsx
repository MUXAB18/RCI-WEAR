'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Globe2, Plane, Ship, Clock, MapPin, Package, CheckCircle, TrendingUp } from 'lucide-react';

const REGIONS = [
  {
    icon: '🇺🇸',
    region: 'North America',
    countries: ['USA', 'Canada', 'Mexico'],
    description: 'Serving major brands and retailers across the United States and Canada with full compliance'
  },
  {
    icon: '🇪🇺',
    region: 'Europe',
    countries: ['UK', 'Germany', 'France', 'Italy', 'Netherlands', 'Spain'],
    description: 'CE marking, REACH compliance, and EU sizing standards - we understand European requirements'
  },
  {
    icon: '🕌',
    region: 'Middle East',
    countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait'],
    description: 'Strong presence in GCC markets with local understanding of modest fashion and regional preferences'
  },
  {
    icon: '🌏',
    region: 'Asia Pacific',
    countries: ['Australia', 'Japan', 'Singapore', 'Hong Kong'],
    description: 'Fast shipping to APAC markets with full documentation and customs support'
  }
];

const SHIPPING_OPTIONS = [
  {
    icon: Plane,
    title: 'Express Air Freight',
    duration: '3-5 Days',
    features: ['Door-to-door delivery', 'Real-time tracking', 'Priority handling', 'Insurance included'],
    ideal: 'Small orders, samples, urgent shipments'
  },
  {
    icon: Plane,
    title: 'Standard Air Freight',
    duration: '7-10 Days',
    features: ['Airport-to-airport', 'Cost-effective', 'Reliable carriers', 'Customs documentation'],
    ideal: 'Medium orders, seasonal collections'
  },
  {
    icon: Ship,
    title: 'Sea Freight (LCL)',
    duration: '4-6 Weeks',
    features: ['Less than Container Load', 'Shared container', 'Lower cost per unit', 'Port-to-port'],
    ideal: 'Bulk orders, cost-conscious shipments'
  },
  {
    icon: Ship,
    title: 'Sea Freight (FCL)',
    duration: '4-6 Weeks',
    features: ['Full Container Load', 'Exclusive container', 'Best unit price', 'Direct shipping'],
    ideal: 'Large volume orders, wholesale'
  }
];

const CAPABILITIES = [
  { icon: CheckCircle, title: 'Full Export Documentation', desc: 'Commercial invoices, packing lists, certificates of origin' },
  { icon: CheckCircle, title: 'Customs Clearance Support', desc: 'HS codes, duty calculations, broker coordination' },
  { icon: CheckCircle, title: 'DDP & DDU Options', desc: 'Delivered Duty Paid or Unpaid - your choice' },
  { icon: CheckCircle, title: 'Cargo Insurance', desc: 'Comprehensive coverage for peace of mind' },
  { icon: CheckCircle, title: 'Real-Time Tracking', desc: 'Track your shipment from factory to destination' },
  { icon: CheckCircle, title: 'Multi-Currency Payments', desc: 'USD, EUR, GBP - flexible payment options' }
];

const STATS = [
  { value: '15+', label: 'Countries Served' },
  { value: '98%', label: 'On-Time Delivery' },
  { value: '3-5', label: 'Days Express Shipping' },
  { value: '100%', label: 'Export Compliance' }
];

export default function GlobalPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <SectionHeading 
          eyebrow="Global Reach"
          title="Manufacturing for the World"
          subtitle="From Pakistan to your doorstep - seamless international logistics and export services"
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

        {/* Regions */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              Where We Ship
            </h2>
            <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              Delivering quality apparel to brands across four continents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REGIONS.map((region, index) => (
              <motion.div
                key={region.region}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-black hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{region.icon}</div>
                <h3 className="text-2xl font-sans font-bold text-black mb-3">
                  {region.region}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {region.countries.map((country, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {country}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 font-sans text-sm">
                  {region.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Shipping Options */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              Shipping Options
            </h2>
            <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              Flexible logistics to match your timeline and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHIPPING_OPTIONS.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-black hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                  <option.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-sans font-bold text-black mb-2">
                  {option.title}
                </h3>
                <div className="text-2xl font-sans font-bold text-black mb-4">
                  {option.duration}
                </div>
                <ul className="space-y-2 mb-4">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-sans font-semibold">
                    IDEAL FOR: {option.ideal}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Capabilities */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              Export Capabilities
            </h2>
            <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              Complete logistics support from factory to your door
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
                className="flex items-start gap-4"
              >
                <capability.icon className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-sans font-bold text-black mb-1">
                    {capability.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-sans">
                    {capability.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Map Visual */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="w-full h-80 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 relative overflow-hidden flex items-center justify-center">
            <Globe2 className="w-64 h-64 text-gray-200 absolute" />
            <div className="relative z-10 text-center px-4">
              <h3 className="text-4xl md:text-5xl font-sans font-bold tracking-tight mb-4 text-black">
                Border-less Manufacturing
              </h3>
              <p className="text-gray-600 font-sans font-bold uppercase tracking-wider text-sm">
                FCA • FOB • CIF • DDP • DDU
              </p>
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
            Ready to Ship Worldwide?
          </h2>
          <p className="text-white/80 text-base mb-6 max-w-xl mx-auto font-sans">
            Get a detailed quote including manufacturing and shipping to your destination
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
