#!/usr/bin/env node

/**
 * Image Compression & Optimization Script
 * 
 * This script:
 * 1. Compresses JPG/PNG images using imagemin
 * 2. Converts to WebP/AVIF formats
 * 3. Generates responsive sizes (800px, 1200px, 1600px)
 * 4. Creates a manifest for easy reference
 * 
 * Usage:
 * npm run compress-images
 * 
 * Requirements:
 * npm install imagemin imagemin-mozjpeg imagemin-pngquant imagemin-webp imagemin-avif --save-dev
 */

import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import imageminAvif from 'imagemin-avif';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PUBLIC_DIR = path.join(__dirname, '../public');
const SIZES = [400, 800, 1200, 1600];

/**
 * Compress original images with imagemin
 */
async function compressOriginals() {
  console.log('📦 Compressing original images...');
  
  try {
    // Process images in public directory root
    await imagemin([`${PUBLIC_DIR}/*.{jpg,png}`], {
      destination: PUBLIC_DIR,
      plugins: [
        imageminMozjpeg({ quality: 80, progressive: true }),
        imageminPngquant({
          quality: [0.6, 0.8],
          strip: true,
        }),
      ],
    });
    
    // Process images in portfolio subdirectory
    await imagemin([`${PUBLIC_DIR}/portfolio/*.{jpg,png,PNG}`], {
      destination: `${PUBLIC_DIR}/portfolio`,
      plugins: [
        imageminMozjpeg({ quality: 80, progressive: true }),
        imageminPngquant({
          quality: [0.6, 0.8],
          strip: true,
        }),
      ],
    });
    
    console.log('✅ Original images compressed');
  } catch (error) {
    console.error('❌ Compression error:', error);
  }
}

/**
 * Convert images to WebP
 */
async function convertToWebP() {
  console.log('🌐 Converting to WebP...');
  
  try {
    // Convert root images
    await imagemin([`${PUBLIC_DIR}/*.{jpg,png}`], {
      destination: PUBLIC_DIR,
      plugins: [imageminWebp({ quality: 80 })],
      rename: {
        extname: '.webp',
      },
    });

    // Convert portfolio images
    await imagemin([`${PUBLIC_DIR}/portfolio/*.{jpg,png,PNG}`], {
      destination: `${PUBLIC_DIR}/portfolio`,
      plugins: [imageminWebp({ quality: 80 })],
      rename: {
        extname: '.webp',
      },
    });
    
    console.log('✅ WebP conversion complete');
  } catch (error) {
    console.error('❌ WebP conversion error:', error);
  }
}

/**
 * Convert images to AVIF
 */
async function convertToAVIF() {
  console.log('🚀 Converting to AVIF (best compression)...');
  
  try {
    // Convert root images
    await imagemin([`${PUBLIC_DIR}/*.{jpg,png}`], {
      destination: PUBLIC_DIR,
      plugins: [imageminAvif({ quality: 60 })],
      rename: {
        extname: '.avif',
      },
    });

    // Convert portfolio images
    await imagemin([`${PUBLIC_DIR}/portfolio/*.{jpg,png,PNG}`], {
      destination: `${PUBLIC_DIR}/portfolio`,
      plugins: [imageminAvif({ quality: 60 })],
      rename: {
        extname: '.avif',
      },
    });
    
    console.log('✅ AVIF conversion complete');
  } catch (error) {
    console.warn('⚠️  AVIF conversion skipped (optional):', error.message);
  }
}

/**
 * Generate responsive image sizes
 */
async function generateResponsiveSizes() {
  console.log('📐 Generating responsive sizes...');
  
  // Process root images
  const rootFiles = fs.readdirSync(PUBLIC_DIR)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  
  for (const file of rootFiles) {
    const inputPath = path.join(PUBLIC_DIR, file);
    const baseName = file.replace(/\.(jpg|jpeg|png)$/i, '');
    
    try {
      const metadata = await sharp(inputPath).metadata();
      
      for (const size of SIZES) {
        if (size < metadata.width) {
          await sharp(inputPath)
            .resize(size, Math.round((size / metadata.width) * metadata.height))
            .webp({ quality: 80 })
            .toFile(path.join(PUBLIC_DIR, `${baseName}_${size}w.webp`));
          
          await sharp(inputPath)
            .resize(size, Math.round((size / metadata.width) * metadata.height))
            .avif({ quality: 60 })
            .toFile(path.join(PUBLIC_DIR, `${baseName}_${size}w.avif`));
        }
      }
      console.log(`✅ Generated responsive sizes for: ${baseName}`);
    } catch (error) {
      console.warn(`⚠️  Skipped ${file}:`, error.message);
    }
  }

  // Process portfolio directory
  const portfolioPath = path.join(PUBLIC_DIR, 'portfolio');
  if (fs.existsSync(portfolioPath)) {
    const portfolioFiles = fs.readdirSync(portfolioPath)
      .filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    
    for (const file of portfolioFiles) {
      const inputPath = path.join(portfolioPath, file);
      const baseName = file.replace(/\.(jpg|jpeg|png)$/i, '');
      
      try {
        const metadata = await sharp(inputPath).metadata();
        
        for (const size of SIZES) {
          if (size < metadata.width) {
            await sharp(inputPath)
              .resize(size, Math.round((size / metadata.width) * metadata.height))
              .webp({ quality: 80 })
              .toFile(path.join(portfolioPath, `${baseName}_${size}w.webp`));
            
            await sharp(inputPath)
              .resize(size, Math.round((size / metadata.width) * metadata.height))
              .avif({ quality: 60 })
              .toFile(path.join(portfolioPath, `${baseName}_${size}w.avif`));
          }
        }
        console.log(`✅ Generated responsive sizes for: portfolio/${baseName}`);
      } catch (error) {
        console.warn(`⚠️  Skipped portfolio/${file}:`, error.message);
      }
    }
  }
}

/**
 * Create manifest of all images
 */
function createManifest() {
  console.log('📋 Creating image manifest...');
  
  const imageFiles = fs.readdirSync(PUBLIC_DIR)
    .filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));
  
  const manifest = {};
  
  imageFiles.forEach(file => {
    const filePath = path.join(PUBLIC_DIR, file);
    const stats = fs.statSync(filePath);
    const baseName = file.replace(/[\._]\d+w\.(jpg|jpeg|png|webp|avif)$/i, '');
    
    if (!manifest[baseName]) {
      manifest[baseName] = {
        original: null,
        webp: [],
        avif: [],
        size: stats.size,
      };
    }
    
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      manifest[baseName].original = file;
    } else if (file.includes('_') && file.endsWith('.webp')) {
      const match = file.match(/_(\d+)w\.webp/);
      if (match) {
        manifest[baseName].webp.push({
          file,
          size: match[1],
          bytes: stats.size,
        });
      }
    } else if (file.includes('_') && file.endsWith('.avif')) {
      const match = file.match(/_(\d+)w\.avif/);
      if (match) {
        manifest[baseName].avif.push({
          file,
          size: match[1],
          bytes: stats.size,
        });
      }
    } else if (file.endsWith('.webp')) {
      manifest[baseName].webp.push({
        file,
        size: 'full',
        bytes: stats.size,
      });
    } else if (file.endsWith('.avif')) {
      manifest[baseName].avif.push({
        file,
        size: 'full',
        bytes: stats.size,
      });
    }
  });
  
  fs.writeFileSync(
    path.join(__dirname, '../IMAGE_MANIFEST.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('✅ Manifest created: IMAGE_MANIFEST.json');
}

/**
 * Print summary
 */
function printSummary() {
  const imageFiles = fs.readdirSync(PUBLIC_DIR)
    .filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));
  
  let totalSize = 0;
  imageFiles.forEach(file => {
    const filePath = path.join(PUBLIC_DIR, file);
    const stats = fs.statSync(filePath);
    totalSize += stats.size;
  });
  
  const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total images: ${imageFiles.length}`);
  console.log(`Total size: ${totalSizeMB} MB`);
  console.log(`Formats: JPEG, PNG, WebP, AVIF`);
  console.log(`Responsive sizes: ${SIZES.join(', ')}px`);
  console.log('='.repeat(50) + '\n');
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  try {
    await compressOriginals();
    await convertToWebP();
    await convertToAVIF();
    await generateResponsiveSizes();
    createManifest();
    printSummary();
    
    console.log('✨ Image optimization complete!');
    console.log('💡 All original images and optimized formats are ready to use');
  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

if (import.meta.main) {
  main();
}

export { compressOriginals, convertToWebP, convertToAVIF, generateResponsiveSizes };
