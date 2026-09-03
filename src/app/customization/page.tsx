'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check, Palette, Layers, Sparkles, Zap, Award } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

export default function CustomizationPage() {
  const customizationMethods = [
    {
      icon: Palette,
      title: 'Screen Printing',
      description: 'Vibrant, durable prints ideal for bulk orders and solid color designs.',
      highlights: ['Cost-effective', 'Long-lasting', 'MOQ: 50 units'],
      applications: ['T-shirts', 'Hoodies', 'Uniforms']
    },
    {
      icon: Layers,
      title: 'Embroidery',
      description: 'Premium 3D textured branding for a professional, luxury appearance.',
      highlights: ['Highly durable', 'Premium look', 'Corporate ideal'],
      applications: ['Polo Shirts', 'Caps', 'Jackets']
    },
    {
      icon: Sparkles,
      title: 'Heat Transfer',
      description: 'High-resolution prints perfect for detailed graphics and photos.',
      highlights: ['Full-color', 'Quick turnaround', 'No MOQ'],
      applications: ['Custom Designs', 'Small Batches', 'Photos']
    },
    {
      icon: Zap,
      title: 'Sublimation',
      description: 'All-over printing for seamless, photo-realistic designs on polyester.',
      highlights: ['Full coverage', 'Won\'t crack', 'Unlimited colors'],
      applications: ['Activewear', 'Sportswear', 'Performance Wear']
    },
    {
      icon: Award,
      title: 'DTG Printing',
      description: 'Direct-to-Garment for detailed, colorful designs on demand.',
      highlights: ['Eco-friendly inks', 'High detail', 'No setup costs'],
      applications: ['Custom Art', 'Photo Prints', 'Small Orders']
    },
    {
      icon: Sparkles,
      title: 'Vinyl Printing',
      description: 'Cut vinyl graphics for bold, solid color designs and lettering.',
      highlights: ['Sharp edges', 'Flexible', 'Quick production'],
      applications: ['Names & Numbers', 'Team Jerseys', 'Logos']
    }
  ];

  const additionalServices = [
    { title: 'Custom Labels & Tags', icon: '🏷️' },
    { title: 'Hang Tags', icon: '📎' },
    { title: 'Custom Packaging', icon: '📦' },
    { title: 'Appliqué Patches', icon: '🎨' },
    { title: 'Foil Printing', icon: '✨' },
    { title: 'Puff Printing', icon: '💫' }
  ];

  const processSteps = [
    { number: '01', title: 'Design Consultation', description: 'Share your design. We suggest the best method.' },
    { number: '02', title: 'Sample Approval', description: 'Physical samples created for your review.' },
    { number: '03', title: 'Production', description: 'Bulk production with strict quality control.' },
    { number: '04', title: 'Delivery', description: 'Carefully packaged and shipped worldwide.' }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <SectionHeading
          eyebrow="Customization & Printing"
          title="Bring Your Designs to Life"
          subtitle="Professional customization services to perfectly brand your apparel with logos, graphics, and unique designs"
        />

        {/* Hero Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { label: 'Printing Methods', value: '6+' },
            { label: 'Colors Available', value: 'Unlimited' },
            { label: 'Min Order Qty', value: '50 Units' },
            { label: 'Sample Time', value: '5-7 Days' }
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

        {/* Customization Methods Grid */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              Our Customization Methods
            </h2>
            <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              Professional printing techniques for every need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {customizationMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-black hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                  <method.icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-sans font-bold text-black mb-3">
                  {method.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 font-sans mb-4 text-sm leading-relaxed">
                  {method.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 mb-4">
                  {(method.highlights ?? []).map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-sans">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Applications */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                  {(method.applications ?? []).map((app, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold text-black bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Additional Services */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-gray-600 font-sans">
              Complete branding solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white border-2 border-gray-200 rounded-xl p-4 text-center hover:border-black hover:shadow-lg transition-all duration-300"
              >
                <div className="text-3xl mb-2">{service.icon}</div>
                <h3 className="text-sm font-sans font-bold text-black">
                  {service.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Process Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 font-sans">
              Simple 4-step process from design to delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-sans font-bold text-black mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 font-sans">
                  {step.description}
                </p>
              </motion.div>
            ))}
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
            Ready to Customize Your Apparel?
          </h2>
          <p className="text-white/80 text-base mb-6 max-w-xl mx-auto font-sans">
            Get a free quote and bring your design vision to life
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
