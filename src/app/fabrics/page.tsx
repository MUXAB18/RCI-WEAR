'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  Palette,
  Droplets,
  Feather,
  Shield,
  Leaf,
  Zap,
  Wind,
  Layers,
  CheckCircle,
  ArrowRight,
  Globe,
  FlaskConical,
  Thermometer,
  Waves,
} from 'lucide-react';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const FABRIC_CATEGORIES = [
  {
    category: 'Luxury Cotton Essentials',
    tag: 'Most Popular',
    description:
      'The backbone of premium streetwear, basics, and casual collections. Sourced from certified Pima and Egyptian cotton mills.',
    icon: Feather,
    items: [
      { name: 'Heavyweight French Terry',  weight: '400–500 GSM', origin: 'Pakistan / Turkey',      feel: 'Plush & Structured',     uses: 'Hoodies, Sweatshirts',     colors: 'Unlimited' },
      { name: 'Combed Ring-Spun Jersey',   weight: '180–280 GSM', origin: 'Pakistan / India',       feel: 'Buttery Soft',           uses: 'T-Shirts, Crop Tops',      colors: 'Unlimited' },
      { name: 'Brushed Fleece',            weight: '350–450 GSM', origin: 'Pakistan',               feel: 'Ultra-Warm',             uses: 'Hoodies, Joggers',         colors: 'Unlimited' },
      { name: 'Waffle Knit',              weight: '220–300 GSM', origin: 'Pakistan / Portugal',    feel: 'Textured & Breathable',  uses: 'Thermal Tops, Layering',   colors: '200+ Options' },
      { name: 'Pique Polo Knit',          weight: '200–260 GSM', origin: 'Pakistan / Bangladesh',  feel: 'Crisp & Structured',     uses: 'Polos, Collar Tees',       colors: 'Unlimited' },
      { name: 'Slub / Vintage Jersey',    weight: '160–220 GSM', origin: 'Pakistan',               feel: 'Raw & Lived-In',         uses: 'Vintage Tees, Tanks',      colors: '150+ Options' },
    ],
  },
  {
    category: 'Technical & Performance',
    tag: 'Activewear',
    description:
      'Performance-driven materials engineered for movement, moisture management, and durability under high-intensity use.',
    icon: Zap,
    items: [
      { name: 'Nylon Taslan / Supplex',   weight: '120–180 GSM', origin: 'China / Taiwan',         feel: 'Smooth & Durable',       uses: 'Track Pants, Windbreakers',  colors: '300+ Options' },
      { name: '4-Way Stretch Interlock',  weight: '200–280 GSM', origin: 'Pakistan / Sri Lanka',   feel: 'Elastic & Supportive',   uses: 'Leggings, Cycling Shorts',   colors: 'Unlimited' },
      { name: 'Micro-Mesh / Air Mesh',    weight: '80–140 GSM',  origin: 'China / Vietnam',        feel: 'Ultra-Breathable',       uses: 'Sports Tops, Linings',       colors: '200+ Options' },
      { name: 'Compression Fabric',       weight: '220–300 GSM', origin: 'Sri Lanka / China',      feel: 'Firm & Supportive',      uses: 'Compression Tights, Bras',   colors: '150+ Options' },
      { name: 'DWR Softshell',            weight: '260–380 GSM', origin: 'Taiwan / China',         feel: 'Weather-Resistant',      uses: 'Outdoor Jackets, Shells',    colors: '200+ Options' },
      { name: 'Tricot / Athletic Knit',   weight: '150–220 GSM', origin: 'Pakistan / Bangladesh',  feel: 'Smooth & Sleek',         uses: 'Jerseys, Tracksuits',        colors: 'Unlimited' },
    ],
  },
  {
    category: 'Sustainable & Eco Fabrics',
    tag: 'Green Line',
    description:
      'GOTS and OEKO-TEX certified materials for brands committed to sustainability without sacrificing hand-feel or quality.',
    icon: Leaf,
    items: [
      { name: 'Organic Cotton Jersey',    weight: '160–280 GSM', origin: 'India / Turkey',         feel: 'Natural & Soft',         uses: 'Eco Tees, Basics',           colors: '200+ Options' },
      { name: 'Recycled Polyester Fleece',weight: '300–420 GSM', origin: 'Taiwan / China',         feel: 'Plush & Eco',            uses: 'Hoodies, Fleece Jackets',    colors: '250+ Options' },
      { name: 'Bamboo Lyocell Blend',     weight: '160–220 GSM', origin: 'China / Austria',        feel: 'Silk-Like & Cool',       uses: 'Luxury Basics, Loungewear',  colors: '100+ Options' },
      { name: 'Hemp / Cotton Blend',      weight: '200–280 GSM', origin: 'China / France',         feel: 'Earthy & Durable',       uses: 'Outdoor Wear, Utility',      colors: '80+ Options' },
      { name: 'TENCEL™ Modal Jersey',     weight: '150–200 GSM', origin: 'Austria',                feel: 'Ultra-Smooth',           uses: 'Premium Basics, Sleepwear',  colors: '150+ Options' },
      { name: 'rPET / GRS Certified Knit',weight: '180–240 GSM', origin: 'Taiwan / China',         feel: 'Soft & Responsible',     uses: 'Sustainable Streetwear',     colors: '200+ Options' },
    ],
  },
  {
    category: 'Woven & Premium Outerwear',
    tag: 'Outerwear',
    description:
      'Structured woven fabrics and shell materials for jackets, workwear, and high-end outerwear collections.',
    icon: Layers,
    items: [
      { name: 'Ripstop Nylon',            weight: '100–160 GSM', origin: 'China / Taiwan',         feel: 'Lightweight & Tough',    uses: 'Cargo Pants, Bombers',       colors: '300+ Options' },
      { name: 'Waxed / Duck Canvas',      weight: '280–500 GSM', origin: 'USA / Pakistan',         feel: 'Rugged & Classic',       uses: 'Workwear, Utility Jackets',  colors: '60+ Options' },
      { name: 'Twill / Chino Weave',      weight: '200–340 GSM', origin: 'Pakistan / China',       feel: 'Smooth & Structured',    uses: 'Chinos, Overshirts',         colors: 'Unlimited' },
      { name: 'Oxford Cloth',             weight: '160–250 GSM', origin: 'China / Pakistan',       feel: 'Classic & Breathable',   uses: 'Shirts, Light Jackets',      colors: '200+ Options' },
      { name: 'Denim (6–16 oz)',          weight: '200–550 GSM', origin: 'Pakistan / Turkey',      feel: 'Iconic & Durable',       uses: 'Jeans, Jackets, Shorts',     colors: 'Multiple Washes' },
      { name: 'Quilted Shell / Padding',  weight: '300–600 GSM', origin: 'China / Pakistan',       feel: 'Warm & Insulated',       uses: 'Puffer Jackets, Vests',      colors: '150+ Options' },
    ],
  },
];

const GSM_GUIDE = [
  {
    range: '80–150', label: 'Lightweight', icon: Wind,
    color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-700',
    description: 'Sheer, breathable fabrics ideal for summer tees, mesh linings, and lightweight performance wear.',
    examples: ['Micro-Mesh', 'Air Mesh', 'Slub Jersey'],
  },
  {
    range: '150–250', label: 'Mid-Weight', icon: Feather,
    color: 'bg-green-50 border-green-200', textColor: 'text-green-700',
    description: 'The sweet spot for everyday tees, polos, and versatile basics that drape well year-round.',
    examples: ['Jersey', 'Pique', 'Waffle Knit'],
  },
  {
    range: '250–350', label: 'Heavy-Weight', icon: Layers,
    color: 'bg-orange-50 border-orange-200', textColor: 'text-orange-700',
    description: 'Structured and premium-feeling. Perfect for sweatshirts, joggers, and premium layering pieces.',
    examples: ['French Terry', 'Fleece', 'Interlock'],
  },
  {
    range: '350–600+', label: 'Ultra-Heavy', icon: Shield,
    color: 'bg-red-50 border-red-200', textColor: 'text-red-700',
    description: 'Outerwear-grade fabrics offering maximum warmth, structure, and durability for jackets and coats.',
    examples: ['Duck Canvas', 'Puffer Shell', 'Denim 14oz+'],
  },
];

const CERTIFICATIONS = [
  { name: 'GOTS Certified',   full: 'Global Organic Textile Standard', icon: Leaf,    desc: 'Guarantees the organic status of textiles from harvesting of raw materials through environmentally and socially responsible manufacturing.' },
  { name: 'OEKO-TEX® 100',   full: 'Standard 100 by OEKO-TEX',        icon: Shield,  desc: 'Every component — yarns, threads, and buttons — has been tested for harmful substances and is harmless to human health.' },
  { name: 'GRS Certified',    full: 'Global Recycled Standard',         icon: Globe,   desc: 'Tracks and verifies the content of recycled materials in the supply chain and ensures responsible social, environmental, and chemical practices.' },
  { name: 'BLUESIGN®',        full: 'Bluesign System Partner',          icon: Droplets,desc: 'Eliminates harmful substances from the textile manufacturing process, conserves resources, and promotes occupational health and safety.' },
];

const SOURCING_PROCESS = [
  { step: '01', title: 'Brand Brief',         icon: Palette,      desc: 'You share your design concept, target customer, performance needs, and budget. We assess the ideal fabric category and weight range.' },
  { step: '02', title: 'Swatch Library',      icon: Layers,       desc: 'We dispatch a curated physical swatch book from our in-house library of 500+ fabrics, tailored to your specific product direction.' },
  { step: '03', title: 'Mill Sampling',       icon: FlaskConical, desc: 'After you select candidates, we order lab-dip samples from vetted mills to confirm colour accuracy, hand-feel, and weight before bulk commitment.' },
  { step: '04', title: 'Quality Testing',     icon: Thermometer,  desc: 'All fabrics undergo shrinkage, tensile strength, colorfastness, and pilling resistance tests to our internal benchmarks before approval.' },
  { step: '05', title: 'Bulk Procurement',    icon: Waves,        desc: 'Once approved, we procure fabric in bulk directly from the mill — cutting out middlemen and passing cost savings on to you.' },
  { step: '06', title: 'Production Cut',      icon: CheckCircle,  desc: 'Fabric enters your production order with full traceability. Any defects found during spreading are immediately replaced before cutting.' },
];

const FABRIC_PROPERTIES = [
  { label: 'Breathability',       icon: Wind,        desc: 'Air permeability rated for comfort across all climates' },
  { label: 'Moisture Wicking',    icon: Droplets,    desc: 'Rapid moisture transport from skin to fabric surface' },
  { label: 'Stretch & Recovery',  icon: Zap,         desc: 'Elastane blend for 2-way or 4-way stretch performance' },
  { label: 'Colorfastness',       icon: Palette,     desc: 'ISO 105 rated wash, light, and rub fastness testing' },
  { label: 'Pilling Resistance',  icon: Shield,      desc: 'Martindale abrasion cycles before pilling appears' },
  { label: 'Shrinkage Control',   icon: Thermometer, desc: 'Pre-shrunk and sanforized for dimensional stability' },
  { label: 'Eco Credentials',     icon: Leaf,        desc: 'Certification chain verified from fibre to finished fabric' },
  { label: 'Weight (GSM)',        icon: Layers,      desc: 'Grams per square metre defining drape and structure' },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function FabricsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">

        {/* Hero */}
        <SectionHeading
          eyebrow="Fabric Sourcing"
          title="The Foundation of Every Great Garment"
          subtitle="We source, develop, and quality-test over 500 premium textiles from certified mills across Pakistan, Turkey, China, India, and Europe — so your collections feel as good as they look."
          align="center"
        />

        {/* Key Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto"
        >
          {[
            { num: '500+', label: 'Fabric Options' },
            { num: '30+',  label: 'Certified Mills' },
            { num: '12',   label: 'Countries Sourced' },
            { num: '100%', label: 'Quality Tested' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-8 bg-[#F8F8F8] rounded-3xl">
              <p className="text-4xl font-sans font-black tracking-tight mb-2">{stat.num}</p>
              <p className="text-sm text-near-black/50 uppercase tracking-[1px] font-bold">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Fabric Categories */}
        <div className="mt-32 space-y-24">
          {FABRIC_CATEGORIES.map((section) => (
            <div key={section.category}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row md:items-end justify-between border-b border-near-black/10 pb-8 mb-12 gap-4"
              >
                <div>
                  <span className="inline-block bg-black text-white text-xs font-bold uppercase tracking-[2px] px-3 py-1 rounded-full mb-4">
                    {section.tag}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-sans font-black tracking-tight mb-2">{section.category}</h2>
                  <p className="text-near-black/60 font-sans text-lg max-w-2xl">{section.description}</p>
                </div>
                <section.icon className="w-10 h-10 text-near-black/20 shrink-0" strokeWidth={1} />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="group bg-[#F8F8F8] p-8 rounded-3xl hover:bg-black transition-colors duration-500 flex flex-col gap-4"
                  >
                    <div>
                      <h4 className="text-xl font-sans font-black tracking-tight mb-1 group-hover:text-white transition-colors duration-500">
                        {item.name}
                      </h4>
                      <p className="text-xs font-bold uppercase tracking-[1px] text-near-black/40 group-hover:text-white/40 transition-colors duration-500">
                        {item.weight}
                      </p>
                    </div>
                    <div className="border-t border-near-black/10 group-hover:border-white/10 transition-colors duration-500 pt-4 grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                      {([
                        ['Origin', item.origin],
                        ['Feel',   item.feel],
                        ['Best For', item.uses],
                        ['Colors',  item.colors],
                      ] as [string, string][]).map(([label, value]) => (
                        <div key={label}>
                          <p className="text-xs text-near-black/40 group-hover:text-white/40 uppercase tracking-[0.5px] font-bold transition-colors duration-500">{label}</p>
                          <p className="text-near-black/80 group-hover:text-white/80 font-sans font-medium transition-colors duration-500">{value}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GSM Weight Guide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <SectionHeading
            eyebrow="GSM Guide"
            title="Choosing the Right Weight"
            subtitle="GSM (grams per square metre) is the universal measure of fabric weight. It directly affects warmth, structure, drape, and garment feel."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {GSM_GUIDE.map((g, i) => (
              <motion.div
                key={g.range}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-3xl border ${g.color}`}
              >
                <p className={`text-3xl font-black tracking-tight mb-1 ${g.textColor}`}>{g.range}</p>
                <p className={`text-xs font-bold uppercase tracking-[1px] mb-4 ${g.textColor}`}>{g.label} GSM</p>
                <g.icon className={`w-7 h-7 mb-4 ${g.textColor}`} strokeWidth={1.5} />
                <p className="text-near-black/70 text-sm leading-relaxed mb-4">{g.description}</p>
                <div className="flex flex-col gap-1">
                  {g.examples.map((ex) => (
                    <span key={ex} className="text-xs text-near-black/50 font-medium">→ {ex}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 8 Quality Properties */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <SectionHeading
            eyebrow="Quality Assurance"
            title="8 Properties We Test on Every Fabric"
            subtitle="Before a single metre enters production, our QA team runs a full battery of physical and chemical tests to our in-house benchmarks."
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {FABRIC_PROPERTIES.map((prop, i) => (
              <motion.div
                key={prop.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group p-8 bg-[#F8F8F8] rounded-3xl hover:bg-black transition-colors duration-500"
              >
                <prop.icon className="w-8 h-8 mb-5 text-near-black group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                <h4 className="font-sans font-black text-lg tracking-tight mb-2 group-hover:text-white transition-colors duration-500">{prop.label}</h4>
                <p className="text-near-black/60 group-hover:text-white/60 text-sm leading-relaxed font-sans transition-colors duration-500">{prop.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <SectionHeading
            eyebrow="Certifications"
            title="Certified From Fibre to Fabric"
            subtitle="We work exclusively with mills that hold internationally recognised textile certifications — so you can make verified sustainability claims to your customers."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-8 border border-near-black/10 rounded-3xl hover:border-black transition-colors duration-300"
              >
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-black flex items-center justify-center">
                  <cert.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-sans font-black text-lg tracking-tight mb-0.5">{cert.name}</p>
                  <p className="text-xs text-near-black/40 uppercase tracking-[1px] font-bold mb-3">{cert.full}</p>
                  <p className="text-near-black/70 text-sm leading-relaxed font-sans">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sourcing Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <SectionHeading
            eyebrow="How It Works"
            title="Our Fabric Sourcing Process"
            subtitle="From your first brief to bulk delivery — a transparent, step-by-step process with zero guesswork."
            align="center"
          />
          <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOURCING_PROCESS.map((step, i) => (
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

        {/* Global Mill Network */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-16 bg-[#F8F8F8] rounded-3xl"
        >
          <SectionHeading
            eyebrow="Global Mill Network"
            title="Where We Source"
            subtitle="Our mill network spans 12 countries, combining cost-efficiency with world-class quality standards."
            align="center"
          />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { country: 'Pakistan',    specialty: 'Cotton, Denim, Fleece' },
              { country: 'Turkey',      specialty: 'Organic Cotton, Denim' },
              { country: 'China',       specialty: 'Nylon, Polyester, Tech' },
              { country: 'India',       specialty: 'Cotton, Linen Blends' },
              { country: 'Taiwan',      specialty: 'Recycled, Performance' },
              { country: 'Sri Lanka',   specialty: 'Stretch, Compression' },
              { country: 'Bangladesh',  specialty: 'Knits, Basics' },
              { country: 'Vietnam',     specialty: 'Mesh, Sportswear' },
              { country: 'Austria',     specialty: 'TENCEL™, Lyocell' },
              { country: 'Portugal',    specialty: 'Waffle, Premium Knit' },
              { country: 'France',      specialty: 'Hemp, Natural Fibres' },
              { country: 'USA',         specialty: 'Selvedge Denim, Canvas' },
            ].map((r) => (
              <div key={r.country} className="bg-white p-5 rounded-2xl text-center">
                <p className="font-black font-sans text-sm tracking-tight mb-1">{r.country}</p>
                <p className="text-near-black/40 text-xs leading-snug">{r.specialty}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 md:p-16 bg-black text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-3xl font-sans font-black tracking-tight mb-4">Custom Fabric Development</h3>
            <p className="text-white/70 leading-relaxed font-sans">
              Need a proprietary blend, a custom GSM, or a specific Pantone-matched dye? Our R&D team works directly
              with mills to develop bespoke textiles exclusively for your collections. Minimum order quantities apply.
            </p>
          </div>
          <a
            href="/request-quote"
            className="whitespace-nowrap inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-bold tracking-[1px] uppercase text-sm hover:bg-white/90 transition-colors rounded-xl"
          >
            Request Fabric Swatches
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </div>
  );
}


