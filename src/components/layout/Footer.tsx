import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navigation } from '@/data/navigation';
import { companyData } from '@/data/company';

export function Footer() {
  return (
    <footer className="bg-near-black text-white pt-24 pb-12 border-t border-white/10 relative overflow-hidden">
      
      {/* Ambient background effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 relative h-16 w-16">
              <Image 
                src="/logo.png" 
                alt="RCI Logo" 
                fill 
                className="object-contain"
              />
            </Link>
            <p className="text-white/60 text-sm max-w-sm mb-8 leading-relaxed">
              Premium apparel manufacturing and private-label clothing solutions. 
              Engineering every piece for comfort, durability, and standout style in {companyData.location}.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/80">
              <a href={`mailto:${companyData.emails.primary}`} className="hover:text-white transition-colors flex items-center gap-3">
                <span className="w-8 h-[1px] bg-white/20" /> {companyData.emails.primary}
              </a>
              {companyData.phones.map(phone => (
                <a key={phone.country} href={`tel:${phone.code}`} className="hover:text-white transition-colors flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-white/20" /> {phone.number}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[3px] uppercase text-white/40 mb-6">Company</h4>
            <ul className="flex flex-col gap-4">
              {navigation.footer.company.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[3px] uppercase text-white/40 mb-6">Products</h4>
            <ul className="flex flex-col gap-4">
              {navigation.footer.products.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-[3px] uppercase text-white/40 mb-6">Services</h4>
            <ul className="flex flex-col gap-4">
              {navigation.footer.services.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} {companyData.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
