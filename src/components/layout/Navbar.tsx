'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation } from '@/data/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setHoveredMenu(null);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 z-50 flex justify-center transition-all duration-500 px-4 md:px-8 pointer-events-none",
          scrolled ? "top-4" : "top-0 pt-6"
        )}
      >
        <div 
          className={cn(
            "pointer-events-auto flex items-center justify-between transition-all duration-500 w-full",
            scrolled 
              ? "max-w-5xl bg-white/70 backdrop-blur-xl shadow-lg border border-white/40 rounded-full px-6 py-3" 
              : "container mx-auto px-0 py-2 bg-transparent"
          )}
        >
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center h-10 w-10 md:h-12 md:w-12">
            <Image 
              src="/logo.png" 
              alt="RCI Logo" 
              fill 
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.main.map((item) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={() => setHoveredMenu(item.name)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 text-[11px] font-bold tracking-[2px] uppercase transition-colors duration-300 py-2",
                    pathname === item.href ? "text-near-black" : "text-near-black/70 hover:text-near-black"
                  )}
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown className={cn(
                      "w-3 h-3 transition-transform duration-300",
                      hoveredMenu === item.name ? "rotate-180" : ""
                    )} />
                  )}
                </Link>

                {/* Dropdown with Framer Motion */}
                <AnimatePresence>
                  {item.dropdown && hoveredMenu === item.name && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                    >
                      <div className="bg-white/90 backdrop-blur-xl shadow-2xl border border-gray-100/50 rounded-2xl p-4 min-w-[220px] flex flex-col gap-2 relative overflow-hidden">
                        {item.dropdown.map((subItem) => (
                          <Link 
                            key={subItem.name} 
                            href={subItem.href}
                            className="text-[13px] font-medium text-near-black/70 hover:text-near-black hover:bg-gray-50 px-4 py-2 rounded-xl transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button 
              href="/request-quote" 
              className="py-2.5 px-6 rounded-full bg-near-black text-white hover:bg-black transition-colors border-none"
            >
              Request Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden relative z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-near-black" />
            ) : (
              <Menu className="w-6 h-6 text-near-black" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-white/90 pt-28 pb-8 px-6 overflow-y-auto flex flex-col"
          >
            <nav className="flex flex-col gap-8 mt-8">
              {navigation.main.map((item, i) => (
                <motion.div 
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05), ease: "easeOut" }}
                  className="flex flex-col gap-4"
                >
                  <Link 
                    href={item.href}
                    className="text-4xl font-display text-near-black tracking-tight"
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="flex flex-col gap-4 pl-4 border-l-2 border-near-black/10">
                      {item.dropdown.map((subItem) => (
                        <Link 
                          key={subItem.name} 
                          href={subItem.href}
                          className="text-sm font-bold text-near-black/60 hover:text-near-black uppercase tracking-[2px] transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-auto pt-12"
            >
              <Button href="/request-quote" className="w-full bg-near-black text-white py-4 rounded-full text-sm font-bold uppercase tracking-widest border-none">
                Request a Quote
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
