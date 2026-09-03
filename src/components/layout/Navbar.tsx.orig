'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { navigation } from '@/data/navigation';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
              "bg-[#0f0f0f]/80 backdrop-blur-3xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] rounded-full p-2 pl-6"
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
              className="lg:hidden relative z-50 p-4 text-white hover:bg-white/10 rounded-full transition-colors mr-1 outline-none focus:outline-none focus:ring-0 active:outline-none -webkit-tap-highlight-color-transparent"
              style={{ WebkitTapHighlightColor: 'transparent' }}
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

      {/* Mobile Menu — Left Drawer Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[99] bg-black/60"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu — Left Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-[100dvh] z-[100] bg-[#0a0a0a] border-l border-white/[0.07] shadow-[-4px_0_40px_rgba(0,0,0,0.6)] flex flex-col"
            style={{ width: "min(82vw, 380px)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 pt-[calc(env(safe-area-inset-top)+20px)] pb-5 border-b border-white/[0.07] shrink-0">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="relative flex items-center"
                style={{ width: 88, height: 30 }}
              >
                <Image
                  src="/logo-v2.png"
                  alt="Rasheed Clothing International"
                  fill
                  className="object-contain object-left brightness-0 invert opacity-90"
                  priority
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.12] text-white/70 hover:text-white hover:border-white/25 hover:bg-white/[0.04] transition-all duration-200"
                aria-label="Close navigation menu"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <X className="w-[18px] h-[18px]" strokeWidth={1.2} />
              </button>
            </div>

            {/* Navigation Links — evenly distributed */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 flex flex-col justify-center py-4">
              <nav className="flex flex-col h-full justify-evenly" aria-label="Main navigation">
                {navigation.main.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.045,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-5 group border-b border-white/[0.06] w-full",
                      )}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <span
                        className={cn(
                          "text-[26px] font-sans font-light tracking-[0.01em] leading-none transition-colors duration-200",
                          pathname === item.href
                            ? "text-white"
                            : "text-white/60 group-hover:text-white/90 group-active:text-white"
                        )}
                      >
                        {item.name}
                      </span>
                      <ArrowRight
                        className="w-4 h-4 text-white/0 group-hover:text-white/35 -translate-x-2 group-hover:translate-x-0 transition-all duration-250 shrink-0"
                        strokeWidth={1.5}
                      />
                    </Link>

                    {/* Sub-items (e.g. Collections dropdown) */}
                    {item.dropdown && (
                      <div className="flex flex-col gap-1 pl-3 pt-3 pb-4 ml-1 border-l border-white/[0.08]">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-[14px] font-light tracking-wide text-white/40 hover:text-white/75 active:text-white py-1.5 transition-colors duration-200"
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Bottom CTA — pinned to drawer bottom */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 pt-5 pb-36 border-t border-white/[0.07] shrink-0"
            >
              <Button
                href="/request-quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#efefef] text-[#0a0a0a] py-[15px] rounded-full text-[10px] font-semibold uppercase tracking-[0.22em] border-none hover:bg-white active:bg-white/90 transition-colors duration-200 flex items-center justify-center gap-2.5 group"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                Order Now
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
