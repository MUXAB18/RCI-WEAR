import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Twitter, Linkedin } from '@/components/icons/SocialIcons';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { companyData } from '@/data/company';

export function Footer() {
  return (
    <footer className="bg-near-black text-white pt-10 pb-6 border-t border-white/10 relative overflow-hidden">
      
      {/* Ambient background effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 mb-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4 relative h-16 w-16 md:h-20 md:w-20 transition-all duration-300">
              <Image 
                src="/logo-v2.png" 
                alt="RCI Logo" 
                fill 
                className="object-contain brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-white/60 text-xs max-w-sm mb-6 leading-relaxed">
              Premium apparel manufacturing and private-label clothing solutions. 
              Engineering every piece for comfort, durability, and standout style in {companyData.location}.
            </p>
            <div className="flex flex-col gap-3 text-xs text-white/80">
              <a href={`mailto:${companyData.emails.primary}`} className="hover:text-white transition-colors flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                  <Mail size={14} className="text-white/60" />
                </div>
                <span>{companyData.emails.primary}</span>
              </a>
              {companyData.phones.map(phone => (
                <a key={phone.country} href={`tel:${phone.code}`} className="hover:text-white transition-colors flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all relative overflow-hidden">
                    <span className="text-[9px] font-bold text-white/60 z-10">{phone.country}</span>
                    <Phone size={24} className="absolute text-white/5 opacity-50" />
                  </div>
                  <span>{phone.number}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:pt-8">
            <h4 className="font-serif text-[10px] font-medium tracking-[3px] uppercase text-white/50 mb-6">Company</h4>
            <ul className="flex flex-col gap-3">
              {navigation.footer.company.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-white/70 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pt-8">
            <h4 className="font-serif text-[10px] font-medium tracking-[3px] uppercase text-white/50 mb-6">Products</h4>
            <ul className="flex flex-col gap-3">
              {navigation.footer.products.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-white/70 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pt-8">
            <h4 className="font-serif text-[10px] font-medium tracking-[3px] uppercase text-white/50 mb-6">Services</h4>
            <ul className="flex flex-col gap-3">
              {navigation.footer.services.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-xs text-white/70 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="mt-8 relative">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="mt-6 bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 p-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden group">
            {/* Ambient hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
            
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 z-10">
              <div className="flex items-center gap-4 text-xs text-white/50">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                  <span className="text-white/80">©</span>
                </div>
                <p className="tracking-wide">
                  {new Date().getFullYear()} {companyData.name}.
                  <span className="hidden md:inline"> All rights reserved.</span>
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 z-10">
              <a href={companyData.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
                <Instagram width={18} height={18} />
              </a>
              <a href={companyData.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
                <Twitter width={18} height={18} />
              </a>
              <a href={companyData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
                <Linkedin width={18} height={18} />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-[11px] font-medium tracking-wider uppercase text-white/40 z-10">
              <Link href="/privacy" className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Terms of Service</Link>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Sitemap</Link>
            </div>
          </div>
          
          {/* Centered Credit Below */}
          <div className="mt-6 flex justify-center w-full relative z-10">
            <div className="flex items-center gap-2 text-[13px] text-white/50">
              <span>Designed & Developed by</span>
              <a 
                href="https://musabiftikhar.tech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white border-b border-white/40 hover:text-white/80 hover:border-white/80 transition-colors flex items-center gap-1 font-semibold pb-0.5"
              >
                Musab Iftikhar
                <ExternalLink size={12} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
