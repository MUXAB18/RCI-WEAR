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
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-500 pointer-events-none pt-4 md:pt-6 px-4 md:px-8"
        )}
      >
        <div className="w-full max-w-5xl relative group pointer-events-auto">
          {/* Ambient Glow Behind Navbar */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          
          <div
            className={cn(
              "relative z-10 w-full flex items-center justify-between transition-all duration-500",
              "bg-[#0f0f0f]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] rounded-full p-2 pl-6"
            )}
          >
            {/* Logo (White) */}
            <Link
              href="/"
              className="flex-shrink-0 relative w-16 h-10 md:w-20 md:h-12 flex items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/logo-v2.png"
                  alt="RCI Logo"
                  fill
                  className="object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav 
              className="hidden lg:flex items-center gap-2 xl:gap-4 px-4"
              onMouseLeave={() => setHoveredMenu(null)}
            >
              {navigation.main.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setHoveredMenu(item.name)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-1 text-[14px] font-medium transition-colors duration-300 px-4 py-2.5 rounded-full z-10",
                      pathname === item.href ? "text-white" : "text-white/70 hover:text-white"
                    )}
                  >
                    {/* Magnetic Sliding Hover Pill */}
                    {hoveredMenu === item.name && (
                      <motion.div
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 bg-white/10 rounded-full z-[-1]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform duration-300",
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
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-6 pointer-events-auto"
                      >
                        <div className="bg-[#1a1a1a]/95 backdrop-blur-xl shadow-2xl border border-white/10 rounded-2xl p-4 min-w-[220px] flex flex-col gap-2 relative overflow-hidden">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="text-[14px] font-medium text-white/70 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-colors"
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
            <div className="hidden lg:block shrink-0 relative overflow-hidden rounded-full group/btn">
              {/* Glossy Shine Effect on Hover */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-1000 z-20 pointer-events-none skew-x-12" />
              
              <Button
                href="/request-quote"
                className="relative py-3.5 px-8 md:px-10 rounded-full bg-white text-black hover:bg-gray-100 transition-colors border-none text-[14px] font-semibold z-10 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Order Now
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden relative z-50 p-4 text-white hover:bg-white/10 rounded-full transition-colors mr-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

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
                Order Now
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
