import 'dotenv/config';
import prisma from '../src/lib/prisma';

// Collections data from products.ts
const collectionsData = [
  {
    name: 'Hoodies',
    slug: 'hoodies',
    description: 'Engineered from premium 450gsm fleece for a structured, luxury fit that withstands daily wear and tear.',
    imageUrl: '/hoodie-new.png',
    isPublished: true,
    order: 1
  },
  {
    name: 'Tees & Essentials',
    slug: 'tees',
    description: 'Crafted from tightly knit, enzyme-washed cotton for an incredibly soft hand-feel and perfect drape.',
    imageUrl: '/tees-essential.png',
    isPublished: true,
    order: 2
  },
  {
    name: 'Tracksuits',
    slug: 'tracksuits',
    description: 'Moisture-wicking tech-fleece sets with sleek profiles, designed for mobility and effortless off-duty style.',
    imageUrl: '/tracksuit.png',
    isPublished: true,
    order: 3
  },
  {
    name: 'Gymwear',
    slug: 'gymwear',
    description: 'Built for high-intensity output with four-way stretch fabrics and targeted breathability to withstand the toughest workouts.',
    imageUrl: '/gymwear.png',
    isPublished: true,
    order: 4
  },
  {
    name: 'Corporate Uniforms',
    slug: 'corporate',
    description: 'Bespoke corporate apparel designed to perfectly translate your brand identity into professional, highly durable daily wear.',
    imageUrl: '/corporate-uniform.png',
    isPublished: true,
    order: 5
  },
  {
    name: 'Outerwear & Jackets',
    slug: 'outerwear',
    description: 'Constructed with weatherproof materials and technical hardware, offering ultimate protection without compromising on modern style.',
    imageUrl: '/outerwear.png',
    isPublished: true,
    order: 6
  }
];

async function main() {
  console.log('🧹 Cleaning existing collections...');
  await prisma.collection.deleteMany();

  console.log('🌱 Seeding 6 collections...');
  
  for (const collection of collectionsData) {
    await prisma.collection.create({
      data: collection,
    });
  }

  console.log('✅ Seeded 6 collections successfully!');
  
  // Show statistics
  const stats = await prisma.collection.aggregate({
    _count: { _all: true },
  });
  
  const publishedCount = await prisma.collection.count({
    where: { isPublished: true }
  });

  console.log('\n📊 Collection Statistics:');
  console.log(`Total Collections: ${stats._count._all}`);
  console.log(`Published Collections: ${publishedCount}`);
  console.log(`Draft Collections: ${stats._count._all - publishedCount}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding collections:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });