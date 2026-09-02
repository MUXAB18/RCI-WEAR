'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowRight, ArrowLeft, CheckCircle2, UploadCloud, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


const InputField = ({ label, id, type = 'text', required = false, placeholder = '', formData, setFormData }: any) => (
  <div className="space-y-2 group">
    <label htmlFor={id} className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">{label} {required && '*'}</label>
    <div className="relative">
      <input required={required} type={type} id={id} placeholder={placeholder}
        value={formData[id as keyof typeof formData] as string} onChange={e => setFormData((prev: any) => ({ ...prev, [id]: e.target.value }))}
        className={cn(
          "w-full bg-[#F8F8F8] border border-gray-100 rounded-xl p-4 font-sans focus:outline-none focus:ring-4 focus:ring-black/5 focus:bg-white focus:border-black transition-all shadow-sm",
          type === 'date' ? "cursor-pointer date-input-custom text-gray-700" : ""
        )} />
      {type === 'date' && (
        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none group-focus-within:text-black transition-colors" />
      )}
    </div>
  </div>
);

const PhoneInputField = ({ label, id, required = false, formData, setFormData }: any) => (
  <div className="space-y-2 group">
    <label htmlFor={id} className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">{label} {required && '*'}</label>
    <div className="relative">
      <PhoneInput
        international
        defaultCountry="US"
        value={formData[id as keyof typeof formData] || undefined}
        onChange={(value) => setFormData((prev: any) => ({ ...prev, [id]: value }))}
        onKeyDown={(e: any) => {
          if (e.key === ' ') {
            e.preventDefault();
            setFormData((prev: any) => ({ ...prev, [id]: '+1' }));
          }
        }}
        className="w-full bg-[#F8F8F8] border border-gray-100 rounded-xl p-4 font-sans focus-within:ring-4 focus-within:ring-black/5 focus-within:bg-white focus-within:border-black transition-all shadow-sm"
        required={required}
      />
    </div>
  </div>
);

const SelectField = ({ label, id, options, required = false, formData, setFormData }: any) => (
  <div className="space-y-2 group">
    <label htmlFor={id} className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">{label} {required && '*'}</label>
    <select required={required} id={id}
      value={formData[id as keyof typeof formData] as string} onChange={e => setFormData((prev: any) => ({ ...prev, [id]: e.target.value }))}
      className="w-full bg-[#F8F8F8] border border-gray-100 rounded-xl p-4 font-sans focus:outline-none focus:ring-4 focus:ring-black/5 focus:bg-white focus:border-black transition-all shadow-sm appearance-none cursor-pointer">
      <option value="">Select option</option>
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const CheckboxGroup = ({ label, field, options, formData, handleCheck }: any) => (
  <div className="space-y-3">
    <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500">{label}</label>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map((opt: string) => (
        <label key={opt} className={cn(
          "flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all text-sm font-sans font-bold text-center hover:-translate-y-0.5",
          (formData[field as keyof typeof formData] as string[]).includes(opt) ? "bg-black text-white border-black shadow-md" : "bg-white border-gray-100 text-gray-600 hover:border-black/30 hover:shadow-sm"
        )}>
          <input type="checkbox" className="hidden" checked={(formData[field as keyof typeof formData] as string[]).includes(opt)} onChange={() => handleCheck(field, opt)} />
          {opt}
        </label>
      ))}
    </div>
  </div>
);

export default function RequestQuotePage() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', website: '', country: '',
    category: '', fabric: '', gsm: '', quantity: '', sizes: [] as string[],
    decoration: [] as string[], extras: [] as string[], colors: '',
    timeline: '', budget: '', comments: '',
    attachments: [] as { name: string, content: string, type: string }[]
  });

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1 && formData.phone) {
      if (!isValidPhoneNumber(formData.phone)) {
        alert('Please enter a valid phone number including your country code.');
        return;
      }
    }

    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      setIsSubmitting(true);
      try {
        const qtyMatch = formData.quantity.match(/\d+/);
        const parsedQty = qtyMatch ? parseInt(qtyMatch[0], 10) : 1;

        const budgetMatch = formData.budget.match(/[\d.]+/);
        const parsedPrice = budgetMatch ? parseFloat(budgetMatch[0]) : 0;

        const payload = {
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          company: formData.company,
          website: formData.website,
          country: formData.country,
          category: formData.category,
          fabric: formData.fabric,
          gsm: formData.gsm,
          quantity: formData.quantity, // Keep the original string as a reference
          sizes: formData.sizes,
          decoration: formData.decoration,
          extras: formData.extras,
          colors: formData.colors,
          timeline: formData.timeline,
          budget: formData.budget, // Keep original string
          comments: formData.comments,
          attachments: formData.attachments,
          status: 'pending',
          items: [{ name: 'Custom Manufacturing Request', quantity: parsedQty, price: parsedPrice }]
        };
        const res = await fetch('/api/admin/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          setStep(5);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          console.error('Failed to submit order request');
        }
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  const handleBack = () => setStep(prev => prev - 1);
  const handleCheck = (field: 'sizes' | 'decoration' | 'extras', val: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(val) ? prev[field].filter(v => v !== val) : [...prev[field], val]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      // 10MB limit
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Max size is 10MB.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = (event.target?.result as string).split(',')[1];
        setFormData(prev => ({
          ...prev,
          attachments: [...prev.attachments, { name: file.name, content: base64String, type: file.type }]
        }));
      };
      reader.readAsDataURL(file);
    });
    // clear input
    e.target.value = '';
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };




  const steps = [
    {
      id: 1, title: 'Company Details',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField formData={formData} setFormData={setFormData} label="Full Name" id="name" required placeholder="John Doe" />
          <InputField formData={formData} setFormData={setFormData} label="Work Email" id="email" type="email" required placeholder="john@brand.com" />
          <PhoneInputField formData={formData} setFormData={setFormData} label="Phone Number" id="phone" required />
          <InputField formData={formData} setFormData={setFormData} label="Brand / Company Name" id="company" required placeholder="Your Brand Ltd." />
          <InputField formData={formData} setFormData={setFormData} label="Website / Instagram" id="website" placeholder="brand.com or @brand" />
          <InputField formData={formData} setFormData={setFormData} label="Country" id="country" required placeholder="United States" />
        </div>
      )
    },
    {
      id: 2, title: 'Product Requirements',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField formData={formData} setFormData={setFormData} label="Product Category" id="category" required options={['Hoodies / Sweatshirts', 'T-Shirts', 'Tracksuits / Joggers', 'Outerwear / Jackets', 'Activewear', 'Custom Uniforms']} />
            <SelectField formData={formData} setFormData={setFormData} label="Fabric Preference" id="fabric" required options={['100% Cotton (French Terry)', '100% Cotton (Fleece)', 'Poly-Cotton Blend', 'Nylon / Polyester', 'Organic Cotton', 'Unsure - Need Advice']} />
            <SelectField formData={formData} setFormData={setFormData} label="Fabric Weight (GSM)" id="gsm" required options={['Lightweight (< 200 GSM)', 'Midweight (200 - 350 GSM)', 'Heavyweight (350 - 500+ GSM)']} />
            <InputField formData={formData} setFormData={setFormData} label="Estimated Quantity" id="quantity" required placeholder="e.g. 325, 450, or Sample (2-5 pieces)" />
          </div>
          <CheckboxGroup formData={formData} handleCheck={handleCheck} label="Size Breakdown" field="sizes" options={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL+']} />
        </div>
      )
    },
    {
      id: 3, title: 'Customization & Branding',
      content: (
        <div className="space-y-6">
          <CheckboxGroup formData={formData} handleCheck={handleCheck} label="Decoration Methods" field="decoration" options={['Screen Print', 'Puff Print', 'Embroidery', 'Direct to Garment (DTG)', 'Sublimation', 'Custom Patches']} />
          <CheckboxGroup formData={formData} handleCheck={handleCheck} label="Branding Extras" field="extras" options={['Custom Woven Neck Labels', 'Hang Tags', 'Polybag Packaging', 'Custom Zippers/Hardware', 'Care Labels']} />
          <div className="space-y-2 group">
            <label htmlFor="colors" className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">Color Requirements</label>
            <textarea id="colors" rows={2} value={formData.colors} onChange={e => setFormData({ ...formData, colors: e.target.value })} className="w-full bg-[#F8F8F8] border border-gray-100 rounded-xl p-4 font-sans focus:outline-none focus:ring-4 focus:ring-black/5 focus:bg-white focus:border-black transition-all resize-none shadow-sm" placeholder="List specific Pantone colors or standard colors..."></textarea>
          </div>
        </div>
      )
    },
    {
      id: 4, title: 'Final Details & Uploads',
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500">Upload Tech Packs / Artwork</label>
            <label className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-[#F8F8F8] hover:border-gray-400 transition-colors cursor-pointer group w-full">
              <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-black transition-colors mb-4" />
              <p className="text-sm font-sans font-medium text-gray-600 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs font-sans text-gray-400">PDF, PNG, JPG, AI up to 10MB</p>
              <input type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.ai" onChange={handleFileUpload} className="hidden" />
            </label>
            {formData.attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.attachments.map((file, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <span className="text-sm text-gray-700 truncate mr-4 font-sans">{file.name}</span>
                    <button type="button" onClick={() => removeAttachment(i)} className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wider">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField formData={formData} setFormData={setFormData} label="Target Delivery Date" id="timeline" type="date" />
            <InputField formData={formData} setFormData={setFormData} label="Target Budget (Per Unit) - Optional" id="budget" placeholder="$ USD" />
          </div>
          <div className="space-y-2 group">
            <label htmlFor="comments" className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-black transition-colors">Additional Comments</label>
            <textarea id="comments" rows={4} value={formData.comments} onChange={e => setFormData({ ...formData, comments: e.target.value })} className="w-full bg-[#F8F8F8] border border-gray-100 rounded-xl p-4 font-sans focus:outline-none focus:ring-4 focus:ring-black/5 focus:bg-white focus:border-black transition-all resize-none shadow-sm" placeholder="Any specific details we should know about?"></textarea>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        {step < 5 && (
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-near-black mb-4">Start Your Order</h1>
            <p className="text-gray-600 font-sans max-w-xl mx-auto">Fill out our detailed order form to receive a precise quote and timeline from our manufacturing specialists.</p>
          </div>
        )}

        {step < 5 ? (
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 relative">
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-12 relative max-w-lg mx-auto">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 z-0 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-black"
                  initial={{ width: `${((step - 1) / 3) * 100}%` }}
                  animate={{ width: `${((step - 1) / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className={cn(
                  "relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                  step >= s ? "bg-black text-white" : "bg-gray-100 text-gray-400",
                  step === s && "ring-4 ring-black/10 scale-110"
                )}>
                  {s}
                </div>
              ))}
            </div>

            <form onSubmit={handleNext}>
              <h2 className="text-2xl font-sans font-bold text-near-black mb-8 border-b border-gray-100 pb-4">{steps[step - 1].title}</h2>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {steps[step - 1].content}
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 flex items-center justify-between pt-6 border-t border-gray-100">
                <button type="button" onClick={handleBack} disabled={step === 1} className={cn(
                  "flex items-center text-sm font-bold uppercase tracking-widest transition-colors",
                  step === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"
                )}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>
                <button type="submit" disabled={isSubmitting} className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-[2px] text-xs hover:bg-gray-800 transition-colors flex items-center group disabled:opacity-50 disabled:cursor-not-allowed">
                  {step === 4 ? (isSubmitting ? 'Submitting...' : 'Submit Request') : 'Next Step'}
                  {step !== 4 && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black text-white p-12 md:p-20 rounded-3xl text-center shadow-2xl max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-8">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-4xl md:text-5xl font-sans font-black tracking-tight mb-6">Order Request Received</h3>
            <p className="text-white/70 font-sans text-lg leading-relaxed mb-10">
              Thank you, {formData.name.split(' ')[0] || 'there'}. We've received your comprehensive manufacturing request for {formData.company || 'your brand'}. Our production team will review your requirements and reach out within 24 hours to schedule a consultation.
            </p>
            <button onClick={() => window.location.href = '/'} className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors">
              Return Home
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
