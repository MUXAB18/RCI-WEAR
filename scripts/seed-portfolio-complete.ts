import 'dotenv/config';
import prisma from '../src/lib/prisma';

// Import existing data from products.ts and extend to 29 items
const portfolioItems = [
  // Existing 25 items from products.ts
  { title: 'Celestial Blue Zip-Up', category: 'Hoodies', description: 'Blue heavyweight zip-up with white star graphics', imageUrl: '/portfolio/custom_hoodie_1.jpg', isFeatured: true, isPublished: true, order: 1, tags: ['new-arrival', 'hoodies', 'zip-up'] },
  { title: 'Celestial Purple Zip-Up', category: 'Hoodies', description: 'Purple heavyweight zip-up with white star graphics', imageUrl: '/portfolio/custom_hoodie_2.jpg', isFeatured: true, isPublished: true, order: 2, tags: ['new-arrival', 'hoodies', 'zip-up'] },
  { title: 'Celestial Blue Detail', category: 'Hoodies', description: 'Detailed view of the blue star zip-up hoodie', imageUrl: '/portfolio/custom_hoodie_3.webp', isFeatured: false, isPublished: true, order: 3, tags: ['hoodies', 'detail'] },
  { title: 'Celestial Purple Detail', category: 'Hoodies', description: 'Detailed view of the purple star zip-up hoodie', imageUrl: '/portfolio/custom_hoodie_4.webp', isFeatured: false, isPublished: true, order: 4, tags: ['hoodies', 'detail'] },
  { title: 'Dead Snake Custom', category: 'Hoodies', description: 'Black hoodie with red serpent graphic', imageUrl: '/portfolio/IMG_5442.PNG', isFeatured: true, isPublished: true, order: 5, tags: ['limited', 'hoodies', 'custom'] },
  { title: 'Forever Havin Motion', category: 'Hoodies', description: 'Heavyweight black hoodie with white puff print', imageUrl: '/portfolio/IMG_5441.PNG', isFeatured: true, isPublished: true, order: 6, tags: ['signature', 'hoodies', 'puff-print'] },
  { title: 'Jetlag Studios Signature', category: 'Hoodies', description: 'Two-tone sleeve lettering with chest logo', imageUrl: '/portfolio/IMG_5440.PNG', isFeatured: true, isPublished: true, order: 7, tags: ['premium', 'hoodies', 'logo'] },
  { title: 'Dark Root Minimal', category: 'Hoodies', description: 'Subtle gray root graphic on pure black', imageUrl: '/portfolio/IMG_5443.PNG', isFeatured: false, isPublished: true, order: 8, tags: ['hoodies', 'minimal'] },
  { title: 'Neon Benji 21', category: 'Hoodies', description: 'Bright green hoodie with patches & print', imageUrl: '/portfolio/IMG_5444.PNG', isFeatured: false, isPublished: true, order: 9, tags: ['new', 'hoodies', 'patches'] },
  { title: 'Premium Edition', category: 'Hoodies', description: 'Custom crafted detailing', imageUrl: '/portfolio/IMG_5445.PNG', isFeatured: false, isPublished: true, order: 10, tags: ['hoodies', 'premium'] },
  { title: 'Classic Heavyweight', category: 'Hoodies', description: 'High-quality cotton construction', imageUrl: '/portfolio/IMG_5446.PNG', isFeatured: false, isPublished: true, order: 11, tags: ['hoodies', 'heavyweight'] },
  { title: 'Signature Drop', category: 'Hoodies', description: 'Exclusive release garment', imageUrl: '/portfolio/IMG_5447.PNG', isFeatured: false, isPublished: true, order: 12, tags: ['exclusive', 'hoodies'] },
  { title: 'First 48 Crimson Set', category: 'Tees & Essentials', description: 'Red motion matching short set', imageUrl: '/portfolio/IMG_5454.PNG', isFeatured: true, isPublished: true, order: 13, tags: ['new', 'tees', 'set'] },
  { title: 'Plain White Heavyweight', category: 'Tees & Essentials', description: 'Premium cotton construction tee', imageUrl: '/portfolio/IMG_5449.PNG', isFeatured: false, isPublished: true, order: 14, tags: ['tees', 'heavyweight'] },
  { title: 'Broken Tears Graphic', category: 'Tees & Essentials', description: 'Raven puff print back design', imageUrl: '/portfolio/IMG_5450.PNG', isFeatured: true, isPublished: true, order: 15, tags: ['limited', 'tees', 'graphic'] },
  { title: 'First 48 Midnight Set', category: 'Tees & Essentials', description: 'Black motion matching short set', imageUrl: '/portfolio/IMG_5453.PNG', isFeatured: false, isPublished: true, order: 16, tags: ['tees', 'set'] },
  { title: 'First 48 Snow Set', category: 'Tees & Essentials', description: 'White motion matching short set', imageUrl: '/portfolio/IMG_5455.PNG', isFeatured: false, isPublished: true, order: 17, tags: ['new', 'tees', 'set'] },
  { title: 'Essential Core Tee', category: 'Tees & Essentials', description: 'Minimalist street styling', imageUrl: '/portfolio/IMG_5448.PNG', isFeatured: false, isPublished: true, order: 18, tags: ['tees', 'essential'] },
  { title: 'Lounge Comfort Set', category: 'Tees & Essentials', description: 'Premium relaxation fit', imageUrl: '/portfolio/IMG_5451.PNG', isFeatured: false, isPublished: true, order: 19, tags: ['tees', 'comfort'] },
  { title: 'Signature Athletic Gear', category: 'Tees & Essentials', description: 'High motion mobility set', imageUrl: '/portfolio/IMG_5452.PNG', isFeatured: false, isPublished: true, order: 20, tags: ['tees', 'athletic'] },
  { title: 'Pain 2 Champain Noir', category: 'Tracksuits', description: 'Black heavyweight tracksuit matching set', imageUrl: '/portfolio/IMG_5456.PNG', isFeatured: true, isPublished: true, order: 21, tags: ['signature', 'tracksuits'] },
  { title: 'Money Crazy Noir', category: 'Tracksuits', description: 'Full zip black tracksuit with patches', imageUrl: '/portfolio/IMG_5457.PNG', isFeatured: true, isPublished: true, order: 22, tags: ['limited', 'tracksuits', 'patches'] },
  { title: 'Noir Tracksuit Profile', category: 'Tracksuits', description: 'Form-fitting custom black activewear', imageUrl: '/portfolio/IMG_5458.PNG', isFeatured: false, isPublished: true, order: 23, tags: ['tracksuits', 'activewear'] },
  { title: 'Noir Back Graphic', category: 'Tracksuits', description: 'Bold back print on premium fleece', imageUrl: '/portfolio/IMG_5459.PNG', isFeatured: false, isPublished: true, order: 24, tags: ['tracksuits', 'graphic'] },
  { title: 'Pain 2 Champain Ash', category: 'Tracksuits', description: 'Gray heavyweight tracksuit with embroidery', imageUrl: '/portfolio/IMG_5460.PNG', isFeatured: false, isPublished: true, order: 25, tags: ['new', 'tracksuits', 'embroidery'] },
  
  // Add 4 more items to reach 29 total
  { title: 'Ash Back Graphic', category: 'Tracksuits', description: 'Signature back motif on premium heather', imageUrl: '/portfolio/IMG_5461.PNG', isFeatured: false, isPublished: true, order: 26, tags: ['tracksuits', 'signature'] },
  { title: 'Core Logo Singlet Stack', category: 'Gymwear', description: 'Red and black high-performance gym wear', imageUrl: '/portfolio/IMG_5462.PNG', isFeatured: true, isPublished: true, order: 27, tags: ['performance', 'gymwear', 'stack'] },
  { title: 'Signature Training Top', category: 'Gymwear', description: 'Sleek black B-logo performance singlet', imageUrl: '/portfolio/IMG_5463.jpg', isFeatured: false, isPublished: true, order: 28, tags: ['gymwear', 'training'] },
  { title: 'Crimson Training Top', category: 'Gymwear', description: 'Bold red B-logo performance singlet', imageUrl: '/portfolio/IMG_5464.jpg', isFeatured: false, isPublished: true, order: 29, tags: ['new', 'gymwear', 'training'] },
];

async function main() {
  console.log('🧹 Cleaning existing portfolio projects...');
  await prisma.portfolioProject.deleteMany();

  console.log('🌱 Seeding 29 portfolio projects...');
  
  for (const item of portfolioItems) {
    await prisma.portfolioProject.create({
      data: {
        title: item.title,
        category: item.category,
        description: item.description,
        imageUrl: item.imageUrl,
        isFeatured: item.isFeatured,
        isPublished: item.isPublished,
        order: item.order,
        tags: item.tags,
        // Optional fields
        clientName: `Client ${Math.floor(Math.random() * 50) + 1}`, // Random client for demo
        projectDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1), // Random 2024 date
      },
    });
  }

  console.log('✅ Seeded 29 portfolio projects successfully!');
  
  // Show statistics
  const stats = await prisma.portfolioProject.aggregate({
    _count: { _all: true },
  });
  
  const featuredCount = await prisma.portfolioProject.count({
    where: { isFeatured: true }
  });
  
  const publishedCount = await prisma.portfolioProject.count({
    where: { isPublished: true }
  });

  console.log('\n📊 Portfolio Statistics:');
  console.log(`Total Projects: ${stats._count._all}`);
  console.log(`Featured Projects: ${featuredCount}`);
  console.log(`Published Projects: ${publishedCount}`);
  console.log(`Draft Projects: ${stats._count._all - publishedCount}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding portfolio:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });