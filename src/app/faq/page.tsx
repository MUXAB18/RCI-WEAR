import React from 'react';
import { Metadata } from 'next';
import { FAQClient } from './FAQClient';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | Rasheed Clothing International',
  description: 'Find answers to common questions about our apparel manufacturing services, MOQ, pricing, lead times, shipping, and custom orders. B2B clothing manufacturer in Pakistan.',
  keywords: 'clothing manufacturer FAQ, MOQ Pakistan, apparel manufacturing questions, private label FAQ, custom clothing questions',
};

export default function FAQPage() {
  return <FAQClient />;
}
