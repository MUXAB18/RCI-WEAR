'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  Tag,
  PackageOpen,
  Shirt,
  PenTool,
  Shield,
  Layers,
  Palette,
  CheckCircle,
  ArrowRight,
  Eye,
  Lock,
  Zap,
  Globe,
  Award,
  Scissors,
  Box,
  Star,
} from 'lucide-react';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: Tag,
    title: 'Custom Woven Labels & Hangtags',
    description:
      'Premium woven neck labels, care tags, size tabs, and heavy-stock hangtags printed or woven to your exact brand specifications. Every garment leaves as a retail-ready finished product.',
    features: ['Woven & printed neck labels', 'Custom care / wash labels', 'Heavy-stock hangtags', 'Size tabs & flag labels'],
  },
  {
    icon: PackageOpen,
    title: 'Bespoke Packaging',
    description:
      'From frosted zip-lock polybags embossed with your logo to custom branded tissue paper, branded shipping mailers, and sticker seals — we handle the complete unboxing experience your customers will love.',
    features: ['Custom poly bags & mailers', 'Branded tissue paper', 'Sticker seals & thank-you cards', 'Folded & presentation packing'],
  },
  {
    icon: Scissors,
    title: 'Custom Hardware & Trims',
    description:
      'Elevate your pieces with custom-molded zippers, embossed metal eyelets, engraved drawcord aglets, branded snaps, and custom-dyed ribbing that makes your construction details impossible to copy.',
    features: ['Custom YKK & branded zippers', 'Embossed metal eyelets', 'Engraved aglets & toggles', 'Custom-dyed ribbing & trims'],
  },
  {
    icon: PenTool,
    title: 'Branding & Decoration',
    description:
      'High-density puff prints, DTG, discharge printing, 3D puff embroidery, rubber patches, woven patches, and heat-transfer labels — all applied flawlessly to your private label blanks.',
    features: ['Puff & high-density screen print', 'DTG & discharge printing', '3D puff & flat embroidery', 'Rubber & woven patches'],
  },
  {
    icon: Shirt,
    title: 'Blank Garment Development',
    description:
      'Don\'t want to use our existing blanks? We develop custom-fitted garment bases — your own silhouettes, with your own GSM, your own fit, exclusively for your brand with full pattern ownership.',
    features: ['Bespoke pattern & block making', 'Custom GSM & fabric selection', 'Full fit grading (XS–5XL)', 'Pattern ownership included'],
  },
  {
    icon: Box,
    title: 'Retail & Wholesale Ready',
    description:
      'Whether you\'re shipping to boutiques, launching on Shopify, or supplying a department store, we prep every order with folded presentation, UPC barcodes, retail hangers, and compliance labelling.',
    features: ['UPC & barcode integration', 'Retail hanger presentation', 'Compliance & country-of-origin labels', 'Bulk & single-unit packing'],
  },
];

const WHAT_IS_INCLUDED = [
  { icon: Lock,         label: 'Full Brand Confidentiality',    desc: 'We sign NDA by default. Your designs never leave our secure production environment.' },
  { icon: Eye,          label: 'No RCI Branding',               desc: 'Zero trace of our name — every product is 100% yours, inside and out.' },
  { icon: Globe,        label: 'Worldwide Shipping',            desc: 'DDP, DDU, or FOB — we handle customs documentation and global fulfilment.' },
  { icon: Award,        label: 'Compliance Certificates',       desc: 'OEKO-TEX, GOTS, GRS, and social audit reports available on request.' },
  { icon: Zap,          label: 'Fast Lead Times',               desc: '30–45 days from approved sample to your door, including private label setup.' },
  { icon: Star,         label: 'Dedicated Account Manager',     desc: 'One point of contact from your first email to final delivery.' },
];

const LAUNCH_PROCESS = [
  {
    step: '01',
    title: 'Brand Discovery Call',
    desc: 'We understand your brand identity, target customer, aesthetic direction, and budget. You share mood boards, reference garments, or just an idea — we translate it into a production brief.',
    icon: Palette,
  },
  {
    step: '02',
    title: 'Sampling & Label Design',
    desc: 'We produce a physical sample with your woven labels, custom hardware, and chosen branding applied. You see exactly how your brand will look on product before committing to bulk.',
    icon: Scissors,
  },
  {
    step: '03',
    title: 'Sample Approval & Sign-Off',
    desc: 'Review your sample, request any changes, and sign off on final production specs — fabric, fit, wash, label placement, packaging, and folding method all locked in writing.',
    icon: CheckCircle,
  },
  {
    step: '04',
    title: 'Bulk Production',
    desc: 'Your order enters production under strict QC at every stage — fabric inspection, cutting accuracy, sewing quality, washing results, and final label & packaging inspection.',
    icon: Shirt,
  },
  {
    step: '05',
    title: 'Quality Inspection & Packing',
    desc: 'Every unit is individually inspected, tagged, folded to your spec, and packed for retail or e-commerce. Final AQL reports are provided before shipment.',
    icon: Shield,
  },
  {
    step: '06',
    title: 'Worldwide Delivery',
    desc: 'We ship DDP (delivered duty paid) globally — you receive product directly to your warehouse, 3PL, or fulfilment centre, fully duty-cleared with all compliance documents.',
    icon: Globe,
  },
];

const WHY_PRIVATE_LABEL = [
  {
    title: 'Total Brand Ownership',
    desc: 'No white-label compromises. Every detail from the stitching to the hangtag is yours — built from scratch around your brand identity.',
    icon: Award,
  },
  {
    title: 'Higher Retail Margins',
    desc: 'Private label garments command 3–5× higher retail prices than branded wholesale goods. You own the brand equity, not a distributor.',
    icon: Zap,
  },
  {
    title: 'Differentiated Product',
    desc: 'Your silhouettes, your GSM, your hardware. Nothing on the market looks exactly like what you sell — that\'s a genuine competitive moat.',
    icon: Layers,
  },
  {
    title: 'Scalable Infrastructure',
    desc: 'Start with 50 units per style and scale to 10,000+ without changing manufacturers. Your brand grows on a foundation built for volume.',
    icon: Globe,
  },
];

const MOQ_TABLE = [
  { service: 'Private Label Blanks (existing silhouette)', moq: '50 units / style', lead: '25–35 days' },
  { service: 'Custom Silhouette Development',               moq: '100 units / style', lead: '35–50 days' },
  { service: 'Custom Woven Labels',                         moq: '500 labels',       lead: '10–14 days' },
  { service: 'Hangtags (printed)',                          moq: '200 units',        lead: '7–10 days' },
  { service: 'Custom Packaging (poly bags, mailers)',        moq: '200 units',        lead: '14–21 days' },
  { service: 'Full Brand Launch Package',                   moq: '200 units total',  lead: '45–60 days' },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function PrivateLabelPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">

        {/* ── Hero ── */}
        <SectionHeading
          eyebrow="White Label & Private Label"
          title="Your Brand. Our Expertise. Total Invisibility."
          subtitle="End-to-end private label manufacturing — from custom silhouettes and woven labels to branded packaging and worldwide delivery. We remain invisible so your brand can shine."
          align="center"
        />

        {/* ── Key Numbers ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto"
        >
          {[
            { num: '50',    label: 'Minimum Units' },
            { num: '100%',  label: 'NDA Guaranteed' },
            { num: '45',    label: 'Day Lead Time' },
            { num: '0',     label: 'RCI Branding on Product' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-8 bg-[#F8F8F8] rounded-3xl">
              <p className="text-4xl font-sans font-black tracking-tight mb-2">{stat.num}</p>
              <p className="text-sm text-near-black/50 uppercase tracking-[1px] font-bold">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Why Private Label ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <SectionHeading
            eyebrow="Why Private Label?"
            title="The Business Case for Building Your Own Brand"
            subtitle="Private label gives you something no wholesale reselling ever can — your own identity, your own margins, your own moat."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {WHY_PRIVATE_LABEL.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 bg-[#F8F8F8] rounded-3xl hover:bg-black transition-colors duration-500"
              >
                <item.icon className="w-8 h-8 mb-5 text-near-black group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                <h4 className="font-sans font-black text-lg tracking-tight mb-2 group-hover:text-white transition-colors duration-500">
                  {item.title}
                </h4>
                <p className="text-near-black/60 group-hover:text-white/60 text-sm leading-relaxed font-sans transition-colors duration-500">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Services ── */}
        <div className="mt-32">
          <SectionHeading
            eyebrow="What We Deliver"
            title="Complete Private Label Services"
            subtitle="Every component of a finished, branded product — designed, sourced, applied, packed, and shipped by us."
            align="center"
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group border border-near-black/10 hover:border-black p-8 rounded-3xl transition-all duration-300 flex flex-col gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center shrink-0">
                  <service.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-sans font-black tracking-tight mb-2">{service.title}</h3>
                  <p className="text-near-black/60 text-sm leading-relaxed font-sans">{service.description}</p>
                </div>
                <ul className="mt-auto border-t border-near-black/10 pt-5 space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-near-black/70">
                      <CheckCircle className="w-4 h-4 text-black shrink-0" strokeWidth={2} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── What's Always Included ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-16 bg-[#F8F8F8] rounded-3xl"
        >
          <SectionHeading
            eyebrow="Always Included"
            title="Standard With Every Private Label Order"
            subtitle="No hidden extras. These are included as standard with every private label order we produce."
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_IS_INCLUDED.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white p-7 rounded-2xl flex gap-5"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-sans font-black text-base tracking-tight mb-1">{item.label}</p>
                  <p className="text-near-black/60 text-sm leading-relaxed font-sans">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Launch Process ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <SectionHeading
            eyebrow="From Idea to Delivery"
            title="How We Launch Your Private Label Brand"
            subtitle="A clear, linear process with no guesswork — from your first call to your first delivery."
            align="center"
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LAUNCH_PROCESS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 bg-[#F8F8F8] rounded-3xl overflow-hidden"
              >
                <span className="text-7xl font-black text-near-black/5 absolute top-2 right-4 select-none font-sans leading-none">
                  {step.step}
                </span>
                <step.icon className="w-8 h-8 mb-6 text-near-black" strokeWidth={1.5} />
                <h4 className="font-sans font-black text-xl tracking-tight mb-3">{step.title}</h4>
                <p className="text-near-black/60 text-sm leading-relaxed font-sans">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── MOQ & Lead Times Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <SectionHeading
            eyebrow="MOQ & Lead Times"
            title="Minimum Orders & Timelines"
            subtitle="Transparent minimums and lead times — no surprises after you've placed your order."
            align="center"
          />
          <div className="mt-16 max-w-4xl mx-auto overflow-hidden rounded-3xl border border-near-black/10">
            <div className="grid grid-cols-3 bg-black text-white px-8 py-4 text-xs uppercase tracking-[1px] font-bold">
              <span>Service</span>
              <span className="text-center">Min. Order</span>
              <span className="text-right">Lead Time</span>
            </div>
            {MOQ_TABLE.map((row, i) => (
              <motion.div
                key={row.service}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`grid grid-cols-3 px-8 py-5 text-sm items-center ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8F8F8]'}`}
              >
                <span className="font-sans font-semibold text-near-black">{row.service}</span>
                <span className="text-center font-bold font-sans text-near-black">{row.moq}</span>
                <span className="text-right text-near-black/60 font-sans">{row.lead}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 md:p-16 bg-black text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-3xl font-sans font-black tracking-tight mb-4">
              Ready to Launch Your Private Label Brand?
            </h3>
            <p className="text-white/70 leading-relaxed font-sans">
              Share your brand vision with us — a mood board, a reference garment, or just a concept — and we'll
              build a complete production roadmap tailored to your collection, budget, and timeline.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href="/request-quote"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-bold tracking-[1px] uppercase text-sm hover:bg-white/90 transition-colors rounded-xl whitespace-nowrap"
            >
              Start Your Brand
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 font-bold tracking-[1px] uppercase text-sm hover:bg-white/10 transition-colors rounded-xl whitespace-nowrap"
            >
              Ask a Question
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
