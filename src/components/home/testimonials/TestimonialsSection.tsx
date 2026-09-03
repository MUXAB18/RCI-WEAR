'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  country: string;
  countryFlag: string;
  role: string;
  testimonial: string;
  rating: number;
  orderSize: string;
  image?: string;
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'James Mitchell',
      company: 'Urban Threads Co.',
      country: 'United Kingdom',
      countryFlag: '🇬🇧',
      role: 'Founder & CEO',
      testimonial: 'Working with Rasheed Clothing International has been exceptional. The quality of their hoodies and streetwear exceeds our expectations. They understand international standards and deliver on time, every time. Our customers love the products!',
      rating: 5,
      orderSize: '500+ units/month'
    },
    {
      id: 2,
      name: 'Sarah Thompson',
      company: 'FitLife Apparel',
      country: 'United States',
      countryFlag: '🇺🇸',
      role: 'Operations Director',
      testimonial: 'Outstanding manufacturing partner! From samples to bulk production, everything was seamless. The attention to detail in quality control and the competitive pricing make them our go-to manufacturer. Communication is excellent and they truly care about our success.',
      rating: 5,
      orderSize: '1000+ units/quarter'
    },
    {
      id: 3,
      name: 'Michael Chen',
      company: 'ActiveWear Pro',
      country: 'Australia',
      countryFlag: '🇦🇺',
      role: 'Brand Manager',
      testimonial: 'The team at RCI brings our designs to life perfectly. Their expertise in fabric selection and manufacturing techniques is impressive. Fast turnaround times and excellent customer service. We\'ve been working together for 2 years and couldn\'t be happier.',
      rating: 5,
      orderSize: '750+ units/order'
    },
    {
      id: 4,
      name: 'Emma Williams',
      company: 'Elite Sports Gear',
      country: 'Canada',
      countryFlag: '🇨🇦',
      role: 'Procurement Manager',
      testimonial: 'Professional, reliable, and high-quality manufacturing. They helped us develop our complete activewear line from concept to production. The quality-to-price ratio is unbeatable. Shipping to Canada is smooth and they handle all documentation perfectly.',
      rating: 5,
      orderSize: '600+ units/month'
    },
    {
      id: 5,
      name: 'Ahmed Al-Rashid',
      company: 'Desert Fashion LLC',
      country: 'UAE',
      countryFlag: '🇦🇪',
      role: 'Managing Partner',
      testimonial: 'Excellent craftsmanship and attention to detail. We manufacture our premium corporate uniforms with RCI and the quality is consistently outstanding. Their team understands luxury finishing and delivers products that impress our high-end clients.',
      rating: 5,
      orderSize: '300+ units/order'
    },
    {
      id: 6,
      name: 'Sophie Laurent',
      company: 'Atelier Mode',
      country: 'France',
      countryFlag: '🇫🇷',
      role: 'Creative Director',
      testimonial: 'RCI has been instrumental in bringing our fashion concepts to reality. They work with us on custom designs, provide excellent samples, and their production quality rivals European manufacturers at much better prices. True partners in our business.',
      rating: 5,
      orderSize: '400+ units/season'
    },
  ];

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-xs md:text-sm font-sans font-bold tracking-[3px] uppercase text-gray-500 mb-4">
            Client Success Stories
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-black mb-6">
            Trusted by Brands Worldwide
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-sans max-w-3xl mx-auto">
            Hear from international brands who trust us with their apparel manufacturing
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative h-[500px] md:h-[400px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      {/* Avatar Placeholder */}
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-2xl md:text-3xl font-bold text-gray-600">
                        {testimonials[currentIndex].name.charAt(0)}
                      </div>
                      
                      {/* Info */}
                      <div>
                        <h3 className="text-lg md:text-xl font-sans font-bold text-black">
                          {testimonials[currentIndex].name}
                        </h3>
                        <p className="text-sm text-gray-600 font-sans">
                          {testimonials[currentIndex].role}
                        </p>
                        <p className="text-xs text-gray-500 font-sans mt-1">
                          {testimonials[currentIndex].company} {testimonials[currentIndex].countryFlag}
                        </p>
                      </div>
                    </div>

                    {/* Quote Icon */}
                    <svg className="w-10 h-10 md:w-12 md:h-12 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-base md:text-lg text-gray-700 font-sans leading-relaxed mb-6 flex-1">
                    "{testimonials[currentIndex].testimonial}"
                  </blockquote>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-semibold">{testimonials[currentIndex].orderSize}</span>
                    </div>
                    <span className="text-xs md:text-sm font-sans font-semibold text-gray-400 uppercase tracking-wider">
                      {testimonials[currentIndex].country}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-near-black rounded-full'
                    : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-gray-600 font-sans text-base md:text-lg mb-6">
            Join these successful brands and start your manufacturing journey with us
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-near-black text-white px-8 py-4 rounded-full font-sans font-bold text-sm tracking-wider uppercase hover:bg-gray-900 transition-all duration-300 hover:scale-105"
          >
            Get Started Today
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
