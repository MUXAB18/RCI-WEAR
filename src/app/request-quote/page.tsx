'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RequestQuotePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          eyebrow="Get Started"
          title="Start Your Production"
          subtitle="Tell us about your project, and our production specialists will get back to you within 24 hours."
        />

        <div className="mt-16 max-w-2xl mx-auto">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black text-white p-12 rounded-3xl text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-sans font-black tracking-tight mb-4">Request Received</h3>
              <p className="text-white/70 font-sans leading-relaxed">
                Thank you for considering Rasheed Clothing International. A member of our team will review your requirements and reach out shortly to schedule a consultation.
              </p>
            </motion.div>
          ) : (
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-bold uppercase tracking-[1px] text-near-black">Name *</label>
                  <input required type="text" id="name" className="w-full bg-[#F8F8F8] border-none rounded-none p-4 font-sans focus:ring-1 focus:ring-black outline-none transition-shadow" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-bold uppercase tracking-[1px] text-near-black">Email *</label>
                  <input required type="email" id="email" className="w-full bg-[#F8F8F8] border-none rounded-none p-4 font-sans focus:ring-1 focus:ring-black outline-none transition-shadow" placeholder="jane@brand.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="block text-sm font-bold uppercase tracking-[1px] text-near-black">Brand / Company Name</label>
                <input type="text" id="company" className="w-full bg-[#F8F8F8] border-none rounded-none p-4 font-sans focus:ring-1 focus:ring-black outline-none transition-shadow" placeholder="Your Brand Ltd." />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-bold uppercase tracking-[1px] text-near-black">Product Category *</label>
                <select required id="category" className="w-full bg-[#F8F8F8] border-none rounded-none p-4 font-sans focus:ring-1 focus:ring-black outline-none transition-shadow appearance-none">
                  <option value="">Select a category</option>
                  <option value="streetwear">Streetwear & Casuals</option>
                  <option value="activewear">Activewear & Performance</option>
                  <option value="corporate">Corporate & Uniforms</option>
                  <option value="other">Other / Custom</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="qty" className="block text-sm font-bold uppercase tracking-[1px] text-near-black">Estimated Quantity per Style</label>
                <select id="qty" className="w-full bg-[#F8F8F8] border-none rounded-none p-4 font-sans focus:ring-1 focus:ring-black outline-none transition-shadow appearance-none">
                  <option value="under_100">Under 100 pcs (Sampling/Boutique)</option>
                  <option value="100_500">100 - 500 pcs</option>
                  <option value="500_2000">500 - 2,000 pcs</option>
                  <option value="2000_plus">2,000+ pcs</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="details" className="block text-sm font-bold uppercase tracking-[1px] text-near-black">Project Details</label>
                <textarea id="details" rows={6} className="w-full bg-[#F8F8F8] border-none rounded-none p-4 font-sans focus:ring-1 focus:ring-black outline-none transition-shadow resize-none" placeholder="Tell us about your tech packs, timeline, and any specific fabric requirements..."></textarea>
              </div>

              <button type="submit" className="w-full bg-black text-white p-5 font-bold uppercase tracking-[2px] text-sm hover:bg-near-black transition-colors flex items-center justify-center group">
                Submit Request
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
}
