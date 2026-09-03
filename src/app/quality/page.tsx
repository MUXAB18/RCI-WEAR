'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ShieldCheck, Search, Ruler, BadgeCheck, Award, Target, CheckCircle2, Eye, Scissors, Droplets, Zap, Package, FileCheck } from 'lucide-react';
import { companyData } from '@/data/company';

const QA_PROCESS = [
  {
    icon: Search,
    title: 'Fabric Inspection',
    stage: 'Pre-Production',
    checks: ['GSM weight verification', 'Colorfastness testing', 'Shrinkage testing', 'Defect identification']
  },
  {
    icon: Ruler,
    title: 'Pattern & Cutting',
    stage: 'Production Start',
    checks: ['Pattern accuracy check', 'Cutting precision audit', 'Measurement verification', 'Fabric alignment']
  },
  {
    icon: Scissors,
    title: 'In-Line Inspection',
    stage: 'During Production',
    checks: ['Stitch quality check', 'Seam allowance audit', 'Construction accuracy', 'Real-time monitoring']
  },
  {
    icon: Eye,
    title: 'End-of-Line Check',
    stage: 'Post-Production',
    checks: ['360° garment inspection', 'Measurement verification', 'Symmetry check', 'Loose thread removal']
  },
  {
    icon: Droplets,
    title: 'Washing Test',
    stage: 'Quality Testing',
    checks: ['Color bleeding test', 'Shrinkage measurement', 'Pilling resistance', 'Durability check']
  },
  {
    icon: Package,
    title: 'Final AQL Audit',
    stage: 'Pre-Shipment',
    checks: ['Random sampling', 'Packaging inspection', 'Label verification', 'Carton labeling']
  }
];

const TESTING_STANDARDS = [
  {
    icon: Droplets,
    title: 'Wash Testing',
    description: 'Multiple wash cycles to test colorfastness, shrinkage, and durability',
    standards: ['ISO 105', 'AATCC 61', 'BS EN 20105']
  },
  {
    icon: Zap,
    title: 'Seam Strength',
    description: 'Load testing to ensure seams can withstand stress and wear',
    standards: ['ASTM D1683', 'ISO 13935', 'BS EN ISO 13935']
  },
  {
    icon: Eye,
    title: 'Color Matching',
    description: 'Spectrophotometer testing for consistent color across batches',
    standards: ['Delta E < 1.0', 'Pantone matching', 'Visual assessment']
  },
  {
    icon: Target,
    title: 'Dimensional Stability',
    description: 'Ensuring garments maintain size specifications after washing',
    standards: ['AATCC 135', 'ISO 5077', 'BS 4931']
  }
];

const INSPECTION_POINTS = [
  'Stitch density (SPI verification)',
  'Seam puckering check',
  'Button & hardware attachment',
  'Zipper functionality test',
  'Print alignment accuracy',
  'Embroidery quality check',
  'Label placement verification',
  'Thread color matching',
  'Hem & cuff uniformity',
  'Collar & pocket symmetry',
  'Care label legibility',
  'Overall garment appearance'
];

const QUALITY_METRICS = [
  { label: 'Quality Rate', value: companyData.statistics.qualityRate, icon: Award },
  { label: 'Client Satisfaction', value: companyData.statistics.clientSatisfaction, icon: Target },
  { label: 'AQL Standard', value: '2.5', icon: CheckCircle2 },
  { label: 'Defect Rate', value: '<0.5%', icon: ShieldCheck }
];

const STATS = [
  { value: '98%', label: 'Pass Rate First Time' },
  { value: '100%', label: 'Batch Inspection' },
  { value: '6', label: 'Quality Checkpoints' },
  { value: 'AQL 2.5', label: 'Industry Standard' }
];

export default function QualityPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <SectionHeading 
          eyebrow="Quality Assurance"
          title="Zero-Defect Manufacturing"
          subtitle="Rigorous quality control at every stage from fabric to finished product"
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

        {/* Quality Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUALITY_METRICS.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:border-black hover:shadow-xl transition-all duration-300"
              >
                <metric.icon className="w-10 h-10 mx-auto mb-4 text-black" strokeWidth={1.5} />
                <div className="text-4xl font-sans font-bold text-black mb-2">{metric.value}</div>
                <div className="text-sm text-gray-600 font-sans font-semibold">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* QA Process */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              6-Stage Quality Process
            </h2>
            <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              Comprehensive inspection at every stage of production
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {QA_PROCESS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-black hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white mb-4">
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-sans font-bold text-gray-500 uppercase tracking-wider mb-2">
                  {step.stage}
                </div>
                <h3 className="text-xl font-sans font-bold text-black mb-4">
                  {step.title}
                </h3>
                <ul className="space-y-2">
                  {step.checks.map((check, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {check}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testing Standards */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
              Testing Standards
            </h2>
            <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
              International quality standards we test against
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTING_STANDARDS.map((test, index) => (
              <motion.div
                key={test.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white flex-shrink-0">
                    <test.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-sans font-bold text-black mb-2">
                      {test.title}
                    </h3>
                    <p className="text-gray-600 font-sans text-sm mb-3">
                      {test.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {test.standards.map((standard, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-full border border-gray-200"
                        >
                          {standard}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Inspection Checklist */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-200">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-sans font-bold text-black mb-4">
                12-Point Inspection Checklist
              </h2>
              <p className="text-lg text-gray-600 font-sans max-w-2xl mx-auto">
                Every garment checked against these quality criteria
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {INSPECTION_POINTS.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.03 }}
                  className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-sans font-medium">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="bg-gradient-to-br from-near-black to-gray-900 rounded-3xl p-8 md:p-10 text-center">
            <h3 className="text-3xl font-sans font-bold text-white mb-4">
              Certified & Accredited
            </h3>
            <p className="text-white/80 font-sans text-base mb-8 max-w-2xl mx-auto">
              Our quality commitment is recognized by leading industry bodies
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {companyData.accreditations.map((cert, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                  <span className="text-white font-sans text-sm font-semibold">✓ {cert}</span>
                </div>
              ))}
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
            Experience Quality You Can Trust
          </h2>
          <p className="text-white/80 text-base mb-6 max-w-xl mx-auto font-sans">
            Get a quote and see our quality standards in action
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
