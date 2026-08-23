'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SectionHeading } from '@/components/ui/SectionHeading';

// Types
type GarmentType = 'HOODIE' | 'SHIRT' | 'TRACKSUIT' | 'TEAM UNIFORM';
type ViewType = 'FRONT' | 'BACK';

interface ActivePatch {
  id: string;
  src: string;
  x: number;
  y: number;
}

const patches = [
  { id: 'tiger', src: '/studio/patch_tiger.webp', alt: 'Tiger Patch' },
  { id: 'vintage', src: '/studio/patch_vintage.webp', alt: 'Vintage Patch' },
];

const colors = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Ash Grey', value: '#E2E2E2' },
  { name: 'Black', value: '#2C2C2C' },
  { name: 'Navy', value: '#1E293B' },
  { name: 'Forest', value: '#14532D' },
  { name: 'Crimson', value: '#7F1D1D' },
];

export function DesignStudio() {
  const [garment, setGarment] = useState<GarmentType>('HOODIE');
  const [view, setView] = useState<ViewType>('FRONT');
  const [activeColor, setActiveColor] = useState(colors[0]);
  const [activePatches, setActivePatches] = useState<ActivePatch[]>([]);
  
  // Ref for the constraint box (the garment mockup)
  const constraintsRef = useRef<HTMLDivElement>(null);

  const getGarmentImage = () => {
    const formatStr = garment.toLowerCase().replace(' ', '');
    return `/studio/base_${formatStr}_${view.toLowerCase()}.webp`;
  };

  const addPatch = (patchSrc: string) => {
    setActivePatches(prev => [
      ...prev,
      {
        id: `patch-${Date.now()}`,
        src: patchSrc,
        // Start roughly in the middle
        x: 0,
        y: 0,
      }
    ]);
  };

  const handleUploadArtwork = () => {
    alert("Artwork upload modal would open here.");
  };

  const handleAddText = () => {
    alert("Add text modal would open here.");
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <SectionHeading 
          eyebrow="Design Studio"
          title="Create Your Vision"
          subtitle="Customize a premium garment with your colors, artwork, and patches."
        />

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12">
          
          {/* Left Column - Configuration */}
          <div className="lg:col-span-3 flex flex-col gap-8 bg-[#F8F8F8] border border-gray-100 rounded-2xl p-6 shadow-sm">
            
            {/* Garment Selection */}
            <div>
              <h3 className="text-[10px] font-sans font-bold tracking-[2px] text-gray-500 uppercase mb-4">
                1. Select Garment
              </h3>
              <div className="flex flex-col gap-2">
                {(['HOODIE', 'SHIRT', 'TRACKSUIT', 'TEAM UNIFORM'] as GarmentType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setGarment(type)}
                    className={cn(
                      "py-3 px-4 rounded-md text-left text-sm font-sans font-semibold transition-all duration-300",
                      garment === type 
                        ? 'bg-black text-white shadow-md' 
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-black hover:text-black'
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-[10px] font-sans font-bold tracking-[2px] text-gray-500 uppercase mb-4">
                2. Select Color
              </h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setActiveColor(color)}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 transition-transform duration-300",
                      activeColor.name === color.name ? 'scale-110 border-black' : 'border-gray-200 hover:scale-110'
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
                {/* Custom Color Picker */}
                <label
                  className={cn(
                    "w-10 h-10 rounded-full border-2 cursor-pointer transition-transform duration-300 relative overflow-hidden flex items-center justify-center",
                    activeColor.name === 'Custom' ? 'scale-110 border-black' : 'border-gray-200 hover:scale-110'
                  )}
                  style={activeColor.name === 'Custom' ? { backgroundColor: activeColor.value } : {}}
                  title="Custom Color"
                >
                  {activeColor.name !== 'Custom' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-green-400 to-blue-500" />
                  )}
                  <input 
                    type="color" 
                    className="absolute opacity-0 w-[200%] h-[200%] cursor-pointer left-[-50%] top-[-50%]"
                    onChange={(e) => setActiveColor({ name: 'Custom', value: e.target.value })}
                  />
                </label>
              </div>
              <p className="text-xs font-sans text-gray-500 mt-3">{activeColor.name}</p>
            </div>

            {/* View Selection */}
            <div>
              <h3 className="text-[10px] font-sans font-bold tracking-[2px] text-gray-500 uppercase mb-4">
                3. Camera View
              </h3>
              <div className="flex gap-2">
                {(['FRONT', 'BACK'] as ViewType[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={cn(
                      "flex-1 py-3 px-4 rounded-md text-center text-sm font-sans font-semibold transition-all duration-300",
                      view === v 
                        ? 'bg-black text-white shadow-md' 
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-black hover:text-black'
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column - Mockup Canvas */}
          <div className="lg:col-span-6 flex items-center justify-center bg-[#F5F5F0] rounded-3xl p-8 shadow-inner relative h-[500px] lg:h-[700px] overflow-hidden">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`${garment}-${view}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full flex items-center justify-center"
                ref={constraintsRef}
              >
                {/* Colored Garment Image (Mix Blend Trick) */}
                <div className="relative w-full h-full max-w-[500px]">
                  {/* The Base Image (Texture and Shadows) */}
                  <Image
                    src={getGarmentImage()}
                    alt={`${garment} ${view}`}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {/* Color Overlay (Tinted exactly to the shape of the garment) */}
                  <div 
                    className="absolute inset-0 transition-colors duration-500 mix-blend-multiply pointer-events-none"
                    style={{ 
                      backgroundColor: activeColor.value,
                      maskImage: `url(${getGarmentImage()})`,
                      WebkitMaskImage: `url(${getGarmentImage()})`,
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                    }}
                  />
                </div>

                {/* Draggable Patches on top of garment */}
                {activePatches.map((patch) => (
                  <motion.div
                    key={patch.id}
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    dragMomentum={false}
                    whileHover={{ scale: 1.1, cursor: 'grab' }}
                    whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
                    className="absolute w-24 h-24 z-20 flex items-center justify-center"
                    style={{ x: patch.x, y: patch.y }}
                  >
                    <div className="relative w-full h-full">
                      <Image 
                        src={patch.src} 
                        alt="Patch" 
                        fill 
                        className="object-contain drop-shadow-xl" 
                      />
                    </div>
                    {/* Delete button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePatches(prev => prev.filter(p => p.id !== patch.id));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold opacity-0 hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </motion.div>
                ))}

              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-6 text-center text-xs font-sans text-gray-500 font-bold tracking-widest uppercase pointer-events-none">
              Drag Patches To Position
            </div>
          </div>

          {/* Right Column - Tools */}
          <div className="lg:col-span-3 flex flex-col gap-8 bg-[#F8F8F8] border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div>
              <h3 className="text-[10px] font-sans font-bold tracking-[2px] text-gray-500 uppercase mb-4">
                4. Add Design
              </h3>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleUploadArtwork}
                  className="py-3 px-4 rounded-md text-sm font-sans font-bold bg-white border border-gray-200 text-gray-700 hover:text-black hover:border-black transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  Upload Artwork
                </button>
                <button 
                  onClick={handleAddText}
                  className="py-3 px-4 rounded-md text-sm font-sans font-bold bg-white border border-gray-200 text-gray-700 hover:text-black hover:border-black transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                  Add Text
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-sans font-bold tracking-[2px] text-gray-500 uppercase mb-4">
                5. Patch Library
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {patches.map((patch) => (
                  <button
                    key={patch.id}
                    onClick={() => addPatch(patch.src)}
                    className="relative aspect-square rounded-md bg-white border border-gray-200 flex items-center justify-center p-4 hover:border-black transition-colors group overflow-hidden"
                  >
                    <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={patch.src}
                        alt={patch.alt}
                        fill
                        className="object-contain drop-shadow-sm mix-blend-multiply"
                      />
                    </div>
                    {/* Plus icon overlay on hover */}
                    <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-black text-2xl font-light">+</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-auto pt-6 border-t border-gray-200">
              <button 
                className="w-full bg-black text-white hover:bg-[#2A2A28] rounded-full px-8 h-14 flex items-center justify-center text-[13px] font-semibold uppercase whitespace-nowrap transition-colors duration-300 font-sans"
              >
                Save & Proceed
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
