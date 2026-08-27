'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { companyData } from '@/data/company';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', company: '', message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          eyebrow="Get in Touch"
          title="Start Your Project"
          subtitle="Reach out to discuss your manufacturing requirements, request samples, or ask for a quote."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-12"
          >
            <div>
              <h3 className="text-2xl font-display mb-8">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F8F8F8] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-near-black" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-near-black/50 mb-1">Headquarters</h4>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">{companyData.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F8F8F8] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-near-black" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-near-black/50 mb-1">Phone / WhatsApp</h4>
                    {companyData.phones.map(phone => (
                      <p key={phone.country} className="text-sm text-near-black/80">
                        {phone.country}: <a href={`tel:${phone.code}`} className="hover:underline">{phone.number}</a>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F8F8F8] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-near-black" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-near-black/50 mb-1">Email</h4>
                    <p className="text-sm text-near-black/80">
                      <a href={`mailto:${companyData.emails.primary}`} className="hover:underline">{companyData.emails.primary}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F8F8F8] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-near-black" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-near-black/50 mb-1">Business Hours</h4>
                    <p className="text-sm text-near-black/80">Monday - Saturday</p>
                    <p className="text-sm text-near-black/80">9:00 AM - 6:00 PM (PKT)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#F8F8F8] p-8 md:p-12 border border-gray-100"
          >
            <h3 className="text-2xl font-display mb-8">Send us a message</h3>
            
            {formStatus === 'success' ? (
              <div className="bg-green-50 text-green-800 p-6 flex flex-col items-center text-center">
                <CheckCircle2 className="w-12 h-12 mb-4 text-green-500" />
                <h4 className="text-xl font-bold mb-2">Message Sent Successfully</h4>
                <p className="text-sm">Thank you for reaching out. One of our manufacturing experts will get back to you within 24 hours.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-6 text-sm font-bold underline"
                >
                  Send another message
                </button>
              </div>
            ) : formStatus === 'error' ? (
              <div className="bg-red-50 text-red-800 p-6 flex flex-col items-center text-center">
                <h4 className="text-xl font-bold mb-2">Something went wrong</h4>
                <p className="text-sm">Please try again or email us directly.</p>
                <button onClick={() => setFormStatus('idle')} className="mt-6 text-sm font-bold underline">Try again</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-[10px] font-bold tracking-[2px] uppercase text-near-black/70">First Name</label>
                    <input type="text" id="firstName" required value={formData.firstName} onChange={handleChange} className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-near-black transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-[10px] font-bold tracking-[2px] uppercase text-near-black/70">Last Name</label>
                    <input type="text" id="lastName" required value={formData.lastName} onChange={handleChange} className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-near-black transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-bold tracking-[2px] uppercase text-near-black/70">Email Address</label>
                  <input type="email" id="email" required value={formData.email} onChange={handleChange} className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-near-black transition-colors" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="company" className="text-[10px] font-bold tracking-[2px] uppercase text-near-black/70">Company / Brand Name</label>
                  <input type="text" id="company" value={formData.company} onChange={handleChange} className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-near-black transition-colors" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] font-bold tracking-[2px] uppercase text-near-black/70">Project Details</label>
                  <textarea id="message" required value={formData.message} onChange={handleChange} rows={5} className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-near-black transition-colors resize-none" placeholder="Please describe your requirements, expected quantities, and timeline..." />
                </div>
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
