import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Twitter, Linkedin } from '@/components/icons/SocialIcons';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { companyData } from '@/data/company';

export function Footer() {
  return (
    <footer className="bg-near-black text-white pt-10 md:pt-14 pb-6 border-t border-white/10 relative overflow-hidden">

      {/* Ambient background effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 mb-8 lg:mb-12">

          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-5 flex flex-col items-start text-left">
            <Link href="/" className="inline-block mb-5 relative h-14 w-14 md:h-24 md:w-24 transition-all duration-300 hover:scale-105">
              <Image
                src="/logo-v2.png"
                alt="RCI Logo"
                fill
                className="object-contain brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-white/60 text-[13px] md:text-sm mb-6 leading-relaxed max-w-[280px] lg:max-w-none">
              Premium apparel manufacturing and private-label clothing solutions.
              Engineering every piece for comfort, durability, and standout style in {companyData.location}.
            </p>
            <div className="flex flex-col items-start gap-3 text-[11px] md:text-xs text-white/80">
              <a href={`mailto:${companyData.emails.primary}`} className="hover:text-white transition-colors flex items-center gap-2 group">
                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Mail size={13} className="text-white/80" />
                </div>
                <span className="tracking-wide font-medium">{companyData.emails.primary}</span>
              </a>
              {companyData.phones.map(phone => (
                <a key={phone.country} href={`tel:${phone.code}`} className="hover:text-white transition-colors flex items-center gap-2 group">
                  <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:bg-white/10 transition-colors">
                    <span className="text-[9px] font-bold text-white/80 z-10">{phone.country}</span>
                    <Phone size={20} className="absolute text-white/10 opacity-50" />
                  </div>
                  <span className="tracking-wide font-medium">{phone.number}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="col-span-1 lg:col-span-6 lg:col-start-7 grid grid-cols-2 gap-x-8 gap-y-8 w-full lg:pt-[116px]">
            <div className="flex flex-col items-start text-left">
              <h4 className="font-sans text-[10px] font-bold tracking-[2px] uppercase text-white mb-4">Quick Links</h4>
              <ul className="flex flex-col gap-3">
                {navigation.main.slice(0, 3).map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[12px] md:text-[13px] text-white/70 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-start text-left">
              <h4 className="font-sans text-[10px] font-bold tracking-[2px] uppercase text-white mb-4">Explore</h4>
              <ul className="flex flex-col gap-3">
                {navigation.main.slice(3, 6).map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[12px] md:text-[13px] text-white/70 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Compact Bottom Bar */}
        <div className="relative pt-6 md:pt-0">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-white/10 to-transparent md:via-white/20 md:to-transparent" />

          <div className="md:mt-8 md:bg-white/[0.02] md:backdrop-blur-xl md:rounded-[2rem] md:border md:border-white/10 md:py-5 md:px-6 flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-6 md:gap-4 relative overflow-hidden group">
            
            {/* Ambient hover effect (desktop only) */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            {/* Copyright & Credit (Stacked closely on mobile) */}
            <div className="flex flex-col items-start gap-1 z-10 w-full md:w-auto text-left">
              <p className="text-[10px] md:text-xs text-white/50 tracking-wide">
                © {new Date().getFullYear()} {companyData.name}. All rights reserved.
              </p>
              
              <div className="md:hidden flex items-center gap-1 text-[10px] text-white/40">
                <span>Designed & Developed by</span>
                <a
                  href="https://musabiftikhar.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors flex items-center gap-1 font-semibold"
                >
                  Musab Iftikhar
                  <ExternalLink size={10} strokeWidth={2.5} />
                </a>
              </div>
            </div>

            {/* Credit Line (Desktop absolute center) */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 text-[12px] text-white/40 bg-white/5 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm z-10 hover:bg-white/10 transition-colors">
              <span>Designed & Developed by</span>
              <a
                href="https://musabiftikhar.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors flex items-center gap-1.5 font-semibold"
              >
                Musab Iftikhar
                <ExternalLink size={12} strokeWidth={2.5} />
              </a>
            </div>

            {/* Right side: Social & Legal */}
            <div className="flex flex-col-reverse sm:flex-row md:items-center gap-5 md:gap-6 w-full md:w-auto items-start">
              
              {/* Legal Links */}
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold tracking-[1px] uppercase text-white/40 z-10">
                <Link href="/privacy" className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white after:transition-all after:duration-300">Terms</Link>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 z-10">
                <a href={companyData.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <Instagram width={14} height={14} />
                </a>
                <a href={companyData.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <Twitter width={14} height={14} />
                </a>
                <a href={companyData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <Linkedin width={14} height={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
