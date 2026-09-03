'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Shirt, Sparkles, Users, Globe, Award, Package, Zap, Heart, BadgeCheck, TrendingUp, Shield } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

export default function CustomManufacturingPage() {
  const productCategories = [
    {
      icon: Shirt,
      title: 'Streetwear & Casual',
      products: ['T-Shirts', 'Hoodies', 'Sweatshirts', 'Joggers', 'Shorts', 'Tank Tops']
    },
    {
      icon: Users,
      title: 'Corporate & Uniforms',
      products: ['Polo Shirts', 'Button-Downs', 'Work Shirts', 'Aprons', 'Chef Coats', 'Scrubs']
    },
    {
      icon: Zap,
      title: 'Activewear & Sports',
      products: ['Leggings', 'Sports Bras', 'Tracksuits', 'Jerseys', 'Compression Wear', 'Gym Wear']
    },
    {
      icon: Sparkles,
      title: 'Fashion & Premium',
      products: ['Dresses', 'Jackets', 'Blazers', 'Skirts', 'Pants', 'Outerwear']
    },
    {
      icon: Heart,
      title: 'Kids & Baby',
      products: ['Kids T-Shirts', 'Baby Onesies', 'Kids Hoodies', 'Kids Shorts', 'Rompers', 'Sleepwear']
    },
    {
      icon: Package,
      title: 'Accessories & More',
      products: ['Bags', 'Caps', 'Beanies', 'Scarves', 'Gloves', 'Face Masks']
    }
  ];

  const capabilities = [
    {
      icon: BadgeCheck,
      title: 'Any Design, Any Style',
      description: 'From tech packs to sketches, we bring your vision to life'
    },
    {
      icon: Package,
      title: 'Full Package Service',
      description: 'Fabric sourcing, sampling, production, quality control, shipping'
    },
    {
      icon: TrendingUp,
      title: 'Scalable Production',
      description: 'MOQ 50 units per style - scale up to 50,000+ pieces'
    },
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'Expert craftsmen with 8+ years of manufacturing experience'
    },
    {
      icon: Globe,
      title: 'Global Shipping',
      description: 'Export to 15+ countries with full logistics support'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: '98% client satisfaction with strict quality control standards'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Share Your Design',
      description: 'Send us your tech pack, sketches, or samples. We review and provide feasibility analysis.'
    },
    {
      number: '02',
      title: 'Fabric & Material Selection',
      description: 'Choose from our fabric library or we source exactly what you need.'
    },
    {
      number: '03',
      title: 'Sample Development',
      description: 'We create prototypes for your approval before bulk production.'
    },
    {
      number: '04',
      title: 'Bulk Production',
      description: 'Manufacturing with quality checks at every stage of production.'
    },
    {
      number: '05',
      title: 'Final Inspection & Shipping',
      description: 'Complete QC inspection and worldwide shipping to your destination.'
    }
  ];

  const whyChooseUs = [
    'Expert pattern makers and skilled tailors',
    'State-of-the-art manufacturing facility in Pakistan',
    'Competitive pricing with premium quality',
    'Fast turnaround: 15-25 days production',
    'Strict quality control at every stage',
    'Full transparency and regular updates',
    'Eco-friendly and sustainable practices',
    'Dedicated account manager for your brand'
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <SectionHeading
          eyebrow="Custom Manufacturing"
          title="Manufacture Any Custom Apparel"
          subtitle="From concept to delivery, we manufacture high-quality custom garments tailored to your exact specifications"
        />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { label: 'Product Types', value: '100+' },
            { label: 'Min Order Qty', value: '50 Units' },
            { label: 'Production Time', value: '15-25 Days' },
            { label: 'Countries Served', value: '15+' }
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

        {/* Product Categories */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              What We Manufacture
            </h2>
            <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              We produce any type of apparel across all categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-black hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-sans font-bold text-black mb-4">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.products.map((product, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {product}
                    </span>
                  ))}
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
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              Our Manufacturing Capabilities
            </h2>
            <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              End-to-end solutions for your apparel brand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-4">
                  <capability.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-sans font-bold text-black mb-3">
                  {capability.title}
                </h3>
                <p className="text-gray-600 font-sans text-sm">
                  {capability.description}
                </p>
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
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              Our Manufacturing Process
            </h2>
            <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              Simple 5-step journey from design to delivery
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
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-base font-sans font-bold text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-sans">
                    {step.description}
                  </p>
                </div>
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-200" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
                Why Choose Rasheed Clothing?
              </h2>
              <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
                Your trusted manufacturing partner
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {whyChooseUs.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-sans font-medium">{reason}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-near-black to-gray-900 rounded-3xl p-8 md:p-10 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-3">
            Ready to Start Manufacturing?
          </h2>
          <p className="text-white/80 text-base mb-6 max-w-xl mx-auto font-sans">
            Share your design and get a detailed quote within 24 hours
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/request-quote"
              className="inline-flex items-center gap-2 bg-white text-near-black px-8 py-3 rounded-full font-sans font-bold text-sm uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              Get Quote
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
