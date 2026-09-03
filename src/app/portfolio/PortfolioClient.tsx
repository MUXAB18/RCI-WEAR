'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Type for portfolio project from database
type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  imageUrl: string;
  images: string[];
  isFeatured: boolean;
  isPublished: boolean;
  order: number;
  tags: string[];
  clientName: string | null;
  projectDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

interface PortfolioClientProps {
  projects: PortfolioProject[];
  categories: string[];
}

export function PortfolioClient({ projects, categories }: PortfolioClientProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<PortfolioProject | null>(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  // Update active category when query param changes
  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory('All');
    }
  }, [categoryParam, categories]);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  // Helper function to get badge text from tags
  const getBadge = (project: PortfolioProject) => {
    if (project.tags.includes('new-arrival')) return 'New Arrival';
    if (project.tags.includes('limited')) return 'Limited';
    if (project.tags.includes('signature')) return 'Signature';
    if (project.tags.includes('premium')) return 'Premium';
    if (project.tags.includes('exclusive')) return 'Exclusive';
    if (project.tags.includes('new')) return 'New';
    if (project.tags.includes('performance')) return 'Performance';
    return null;
  };

  return (
    <>
      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
        <button
          onClick={() => setActiveCategory('All')}
          className={cn(
            "text-sm font-sans tracking-wide transition-colors duration-300",
            activeCategory === 'All' 
              ? "text-black font-bold" 
              : "text-gray-400 hover:text-black font-medium"
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "text-sm font-sans tracking-wide transition-colors duration-300",
              activeCategory === category 
                ? "text-black font-bold" 
                : "text-gray-400 hover:text-black font-medium"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const badge = getBadge(project);
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                key={project.id}
                className="group relative flex flex-col"
              >
                {/* Image Container */}
                <div 
                  className="relative w-full aspect-[4/5] bg-[#F8F8F8] border border-gray-200 rounded-2xl overflow-hidden mb-4 cursor-pointer"
                  onClick={() => setSelectedProduct(project)}
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Badge */}
                  {badge && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-black">
                        {badge}
                      </span>
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-sans text-sm font-medium tracking-wide uppercase px-6 py-2 border border-white/50 rounded-full">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-sans uppercase tracking-wider mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-base font-sans font-bold text-black mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm font-sans text-gray-600 line-clamp-2">
                    {project.description || `Premium ${project.category.toLowerCase()} manufactured to perfection.`}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
      
      {filteredProjects.length === 0 && (
        <div className="w-full py-24 text-center">
          <p className="text-gray-500 font-sans">No items found in this category.</p>
        </div>
      )}

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedProduct(null)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 max-h-[90vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors border border-gray-200 shadow-sm"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Image Side */}
              <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:min-h-[600px] bg-[#F8F8F8]">
                <Image
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {getBadge(selectedProduct) && (
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                    <span className="text-xs font-sans font-bold uppercase tracking-wider text-black">
                      {getBadge(selectedProduct)}
                    </span>
                  </div>
                )}
              </div>

              {/* Details Side */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center overflow-y-auto">
                <span className="text-xs text-gray-500 font-sans uppercase tracking-[3px] mb-2">
                  {selectedProduct.category}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-black text-black tracking-tight leading-[1.1] mb-4">
                  {selectedProduct.title}
                </h2>
                
                <div className="w-10 h-[3px] bg-black mb-4" />
                
                <p className="text-sm font-sans text-gray-600 leading-relaxed mb-6">
                  {selectedProduct.description || `Premium ${selectedProduct.category.toLowerCase()} manufactured with attention to every detail. Crafted from high-quality materials and designed for durability and style.`}
                </p>

                {/* Client and Date Info */}
                {(selectedProduct.clientName || selectedProduct.projectDate) && (
                  <div className="bg-[#F8F8F8] rounded-xl p-4 sm:p-5 mb-4 border border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProduct.clientName && (
                        <div>
                          <span className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider mb-1 block">
                            Client
                          </span>
                          <span className="text-sm font-sans text-black font-semibold">
                            {selectedProduct.clientName}
                          </span>
                        </div>
                      )}
                      {selectedProduct.projectDate && (
                        <div>
                          <span className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider mb-1 block">
                            Project Date
                          </span>
                          <span className="text-sm font-sans text-black font-semibold">
                            {new Date(selectedProduct.projectDate).toLocaleDateString('en-US', { 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Manufacturing Specifications */}
                <div className="bg-[#F8F8F8] rounded-xl p-4 sm:p-5 mb-6 border border-gray-100">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                    <div>
                      <span className="flex items-center gap-2 text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        Material
                      </span>
                      <span className="text-sm font-sans text-black font-semibold">Premium Blend</span>
                    </div>
                    <div>
                      <span className="flex items-center gap-2 text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                        MOQ
                      </span>
                      <span className="text-sm font-sans text-black font-semibold">50 Units</span>
                    </div>
                    <div>
                      <span className="flex items-center gap-2 text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                        Methods
                      </span>
                      <span className="text-sm font-sans text-black font-semibold">Print / Embroidery</span>
                    </div>
                    <div>
                      <span className="flex items-center gap-2 text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Lead Time
                      </span>
                      <span className="text-sm font-sans text-black font-semibold">3-4 Weeks</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4 sm:pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                  <a 
                    href={`/contact?subject=${encodeURIComponent(`Inquiry about ${selectedProduct.title}`)}&message=${encodeURIComponent(`Hi,\n\nI am interested in the piece "${selectedProduct.title}" from the ${selectedProduct.category} collection.\n\nProject Details:\nClient: ${selectedProduct.clientName || 'N/A'}\nProject Date: ${selectedProduct.projectDate ? new Date(selectedProduct.projectDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}\n\nPlease let me know how we can proceed with a similar project.\n\nThank you.`)}`}
                    className="flex-1 bg-black text-white px-6 py-3 sm:py-4 rounded-full font-sans text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-gray-900 transition-colors text-center"
                  >
                    Inquire About This Piece
                  </a>
                  <a 
                    href="/design-studio"
                    className="flex-1 bg-transparent border border-black text-black px-6 py-3 sm:py-4 rounded-full font-sans text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-gray-50 transition-colors text-center"
                  >
                    Design Similar
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}