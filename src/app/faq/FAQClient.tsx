'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { companyData } from '@/data/company';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export function FAQClient() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = ['All', 'Orders & MOQ', 'Pricing', 'Production & Quality', 'Shipping & Logistics', 'Custom Manufacturing'];

  const faqs: FAQItem[] = [
    // Orders & MOQ
    {
      category: 'Orders & MOQ',
      question: 'What is your minimum order quantity (MOQ)?',
      answer: `Our standard MOQ is ${companyData.capabilities.moq}. This allows us to maintain competitive pricing while ensuring quality production. For established clients or specific projects, we can discuss flexible MOQ options. Contact us to discuss your specific needs.`
    },
    {
      category: 'Orders & MOQ',
      question: 'Can I order samples before placing a bulk order?',
      answer: `Yes! We highly encourage sample orders. Sample production typically takes ${companyData.capabilities.sampleLeadTime}. You can order 1-5 samples to evaluate quality, fit, and finishing before committing to bulk production. Sample costs are typically deducted from your first bulk order.`
    },
    {
      category: 'Orders & MOQ',
      question: 'How do I place an order?',
      answer: `Ordering is simple: 1) Contact us via email, WhatsApp, or our contact form. 2) Share your design specifications, quantities, and timeline. 3) Receive a detailed quote within 24-48 hours. 4) Approve the quote and provide tech pack/design files. 5) Pay deposit (usually 50%). 6) We begin production. 7) Quality check and final payment. 8) Shipping arranged.`
    },
    {
      category: 'Orders & MOQ',
      question: 'Do you accept small orders for startups?',
      answer: 'Absolutely! We work with startups and emerging brands. Our 50-unit MOQ is designed to be accessible for new businesses. We offer guidance throughout the process and can help with technical specifications, sizing, and material selection.'
    },

    // Pricing
    {
      category: 'Pricing',
      question: 'How much does custom apparel manufacturing cost?',
      answer: 'Pricing varies based on: garment type, fabric quality, quantity, customization complexity (printing/embroidery), and additional features. Generally, bulk orders range from $8-$30 per unit depending on specifications. Contact us with your requirements for an accurate quote within 24 hours.'
    },
    {
      category: 'Pricing',
      question: 'What payment methods do you accept?',
      answer: `We accept multiple secure payment methods: ${companyData.exportInfo.paymentMethods.join(', ')}. For first-time orders, we typically require 50% deposit upfront and 50% before shipping. Established clients may qualify for different payment terms.`
    },
    {
      category: 'Pricing',
      question: 'Are there any hidden costs or additional fees?',
      answer: 'We believe in transparent pricing. Our quotes include production costs, printing/embroidery, and packaging. Additional costs may include: sample shipping (if samples requested), custom packaging beyond standard poly bags, rush orders, and international shipping (quoted separately based on destination).'
    },
    {
      category: 'Pricing',
      question: 'Do you offer discounts for large orders?',
      answer: 'Yes! Volume discounts are available. The more you order, the better the per-unit price. Orders of 500+ units, 1000+ units, and 5000+ units each have progressive discount tiers. Contact us for volume pricing specific to your order.'
    },

    // Production & Quality
    {
      category: 'Production & Quality',
      question: 'What is your typical production lead time?',
      answer: `Standard production lead time is ${companyData.capabilities.leadTime} from order confirmation and deposit. This includes manufacturing, quality control, and preparation for shipping. Samples take ${companyData.capabilities.sampleLeadTime}. Rush orders can be accommodated with additional fees - contact us for expedited timelines.`
    },
    {
      category: 'Production & Quality',
      question: 'What quality control measures do you have?',
      answer: `We maintain a ${companyData.statistics.qualityRate} quality rate through rigorous QC: 1) Raw material inspection before production. 2) In-line quality checks during production. 3) Final inspection of finished garments. 4) Random sampling and measurement verification. 5) Photo/video documentation for client approval. 6) Pre-shipment inspection available.`
    },
    {
      category: 'Production & Quality',
      question: 'What customization options are available?',
      answer: `We offer comprehensive customization: ${companyData.capabilities.productionMethods.join(', ')}, custom labels and tags, woven/printed neck labels, custom packaging, hang tags, size charts, custom fabric blends, and unique design features. Share your vision and we'll make it happen.`
    },
    {
      category: 'Production & Quality',
      question: 'Can you match specific fabric or color requirements?',
      answer: 'Yes! We can source specific fabrics and match exact colors using Pantone references. We provide fabric swatches and strike-off samples for color approval before bulk production. Our access to premium Pakistani cotton and textile markets ensures we can meet diverse material requirements.'
    },
    {
      category: 'Production & Quality',
      question: 'Do you provide tech packs or design assistance?',
      answer: 'Yes! If you have a concept but no tech pack, our design team can help create professional specifications. We provide guidance on sizing, measurements, construction details, and material selection. For clients with tech packs, we review and optimize them for production.'
    },

    // Shipping & Logistics
    {
      category: 'Shipping & Logistics',
      question: 'Which countries do you ship to?',
      answer: `We ship globally! We've successfully delivered to ${companyData.statistics.countriesServed} countries including ${companyData.exportInfo.mainMarkets.slice(0, 4).join(', ')}, and more. We work with trusted logistics partners: ${companyData.exportInfo.shippingPartners.join(', ')}.`
    },
    {
      category: 'Shipping & Logistics',
      question: 'How long does international shipping take?',
      answer: 'Shipping times vary by destination and method: Express (DHL/FedEx/UPS): 3-5 business days. Air Freight: 7-10 business days. Sea Freight: 4-6 weeks (economical for large orders). We provide tracking information and handle customs documentation.'
    },
    {
      category: 'Shipping & Logistics',
      question: 'Who handles customs and import duties?',
      answer: 'We handle export documentation and provide all necessary paperwork (commercial invoice, packing list, certificate of origin). Import duties and customs clearance at destination are typically the buyer\'s responsibility. We can arrange DDP (Delivered Duty Paid) shipping for an additional fee.'
    },
    {
      category: 'Shipping & Logistics',
      question: 'How are orders packaged for shipping?',
      answer: 'Standard packaging includes individual poly bags per garment, inner cartons, and master cartons with shipping labels. We can arrange custom packaging, branded boxes, tissue paper, stickers, and premium presentation - just let us know your requirements.'
    },

    // Custom Manufacturing
    {
      category: 'Custom Manufacturing',
      question: 'Can you manufacture my brand\'s clothing line?',
      answer: 'Absolutely! We specialize in private label and custom manufacturing. Bring your designs, we handle everything: material sourcing, sampling, production, quality control, labeling, and packaging. Many international brands trust us as their manufacturing partner.'
    },
    {
      category: 'Custom Manufacturing',
      question: 'Do you sign Non-Disclosure Agreements (NDAs)?',
      answer: 'Yes, we respect intellectual property and confidentiality. We\'re happy to sign NDAs before discussing your designs or business details. Your proprietary information, designs, and brand identity are always protected.'
    },
    {
      category: 'Custom Manufacturing',
      question: 'Can you replicate a garment I already have?',
      answer: 'Yes! Send us a sample garment and we can replicate it with exact measurements, fabric matching, and construction details. We can also suggest improvements or cost-effective alternatives while maintaining quality.'
    },
    {
      category: 'Custom Manufacturing',
      question: 'What types of clothing do you manufacture?',
      answer: `Our specializations include: ${companyData.capabilities.specializations.join(', ')}. We have expertise in hoodies, t-shirts, joggers, tracksuits, polo shirts, jackets, uniforms, and custom designs. If you don\'t see your product type listed, ask us!`
    },
    {
      category: 'Custom Manufacturing',
      question: 'Do you offer design and development services?',
      answer: 'Yes! Our experienced team can help bring your ideas to life. We offer: concept development, technical design, pattern making, sample development, fit adjustments, and material recommendations. We partner with you from concept to finished product.'
    },
    {
      category: 'Custom Manufacturing',
      question: 'Can I visit your factory?',
      answer: 'Yes! We welcome client visits to our facility in Sialkot, Pakistan. Schedule an appointment and we\'ll arrange a comprehensive factory tour. You can meet our team, see production processes, and quality control procedures firsthand. Virtual tours via video call are also available.'
    },
  ];

  const filteredFAQs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <SectionHeading
          eyebrow="Help Center"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about working with Rasheed Clothing International"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-sans text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-near-black text-white scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence mode="wait">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={`${activeCategory}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors"
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <span className="inline-block text-[10px] font-sans font-bold tracking-wider uppercase text-gray-400 mb-2">
                      {faq.category}
                    </span>
                    <h3 className="text-base md:text-lg font-sans font-bold text-black">
                      {faq.question}
                    </h3>
                  </div>
                  
                  {/* Icon */}
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                        <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="bg-gradient-to-br from-near-black to-gray-900 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-white/70 font-sans text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Our team is here to help. Reach out via email, WhatsApp, or phone and we'll respond within 2 hours during business hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-near-black px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wider uppercase hover:bg-gray-100 transition-all duration-300"
              >
                Contact Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href={companyData.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wider uppercase hover:bg-[#20BA5A] transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
