'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What is your minimum order quantity (MOQ)?",
    answer: "Our standard minimum order quantity is typically 100 pieces per style and color. This allows us to maintain strict quality control while offering cost-effective production runs for both emerging labels and established global brands."
  },
  {
    question: "Do you provide custom sampling before bulk production?",
    answer: "Absolutely. We require a rigorous sampling phase before any bulk production begins. You will receive a high-fidelity physical prototype to evaluate fit, fabric feel, and construction, ensuring everything meets your exact specifications."
  },
  {
    question: "What is the typical turnaround time for orders?",
    answer: "Sample development usually takes 7-14 days depending on design complexity. Once the final sample is approved, bulk production is generally completed within 4 to 6 weeks. We prioritize efficiency without compromising on our premium quality standards."
  },
  {
    question: "Can you handle custom fabric sourcing and hardware?",
    answer: "Yes, we offer comprehensive material sourcing. Whether you need heavyweight French terry, specialized technical fabrics, custom Pantone dyeing, or bespoke branded hardware like engraved zippers and aglets, our supply chain can deliver."
  },
  {
    question: "Do you offer international shipping?",
    answer: "We ship globally, having served clients in over 15 countries. We partner with top-tier logistics providers like DHL and FedEx to ensure fast, secure, and fully trackable air and sea freight delivery directly to your warehouse."
  }
];

export function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-4xl">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-xs md:text-sm font-sans font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 block">
            Common Questions
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-near-black tracking-tight">
            Frequently Asked
          </h2>
        </motion.div>

        {/* FAQs Accordion */}
        <div className="space-y-4 md:space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`border-b transition-colors duration-500 ${isOpen ? 'border-near-black' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className={`text-lg md:text-xl font-sans font-medium transition-colors duration-500 ${isOpen ? 'text-near-black' : 'text-gray-600 group-hover:text-near-black'}`}>
                    {faq.question}
                  </span>
                  <div className="ml-6 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 group-hover:border-near-black transition-colors duration-500">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-near-black" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-400 group-hover:text-near-black transition-colors duration-500" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-gray-500 font-sans text-sm md:text-base leading-relaxed max-w-3xl pr-12">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
