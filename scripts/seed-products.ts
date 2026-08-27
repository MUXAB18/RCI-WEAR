import 'dotenv/config';
import prisma from '../src/lib/prisma';

// Product data converted from products.ts with proper pricing and SKUs
const productsData = [
  // Hoodies
  { name: 'Celestial Blue Zip-Up', slug: 'celestial-blue-zip-up', description: 'Blue heavyweight zip-up with white star graphics', price: 89.99, sku: 'HOD-CEL-BLU-001', images: ['/portfolio/custom_hoodie_1.jpg'], category: 'Hoodies', isPublished: true, isFeatured: true, stock: 25, minOrder: 1, tags: ['new-arrival', 'zip-up'], collectionSlug: 'hoodies' },
  { name: 'Celestial Purple Zip-Up', slug: 'celestial-purple-zip-up', description: 'Purple heavyweight zip-up with white star graphics', price: 89.99, sku: 'HOD-CEL-PUR-002', images: ['/portfolio/custom_hoodie_2.jpg'], category: 'Hoodies', isPublished: true, isFeatured: true, stock: 30, minOrder: 1, tags: ['new-arrival', 'zip-up'], collectionSlug: 'hoodies' },
  { name: 'Dead Snake Custom', slug: 'dead-snake-custom', description: 'Black hoodie with red serpent graphic', price: 94.99, sku: 'HOD-DSN-BLK-003', images: ['/portfolio/IMG_5442.PNG'], category: 'Hoodies', isPublished: true, isFeatured: true, stock: 15, minOrder: 1, tags: ['limited', 'custom'], collectionSlug: 'hoodies' },
  { name: 'Forever Havin Motion', slug: 'forever-havin-motion', description: 'Heavyweight black hoodie with white puff print', price: 92.99, sku: 'HOD-FHM-BLK-004', images: ['/portfolio/IMG_5441.PNG'], category: 'Hoodies', isPublished: true, isFeatured: true, stock: 20, minOrder: 1, tags: ['signature', 'puff-print'], collectionSlug: 'hoodies' },
  { name: 'Jetlag Studios Signature', slug: 'jetlag-studios-signature', description: 'Two-tone sleeve lettering with chest logo', price: 99.99, sku: 'HOD-JET-SIG-005', images: ['/portfolio/IMG_5440.PNG'], category: 'Hoodies', isPublished: true, isFeatured: true, stock: 18, minOrder: 1, tags: ['premium', 'logo'], collectionSlug: 'hoodies' },
  { name: 'Dark Root Minimal', slug: 'dark-root-minimal', description: 'Subtle gray root graphic on pure black', price: 79.99, sku: 'HOD-DRT-MIN-006', images: ['/portfolio/IMG_5443.PNG'], category: 'Hoodies', isPublished: true, isFeatured: false, stock: 35, minOrder: 1, tags: ['minimal'], collectionSlug: 'hoodies' },
  { name: 'Neon Benji 21', slug: 'neon-benji-21', description: 'Bright green hoodie with patches & print', price: 87.99, sku: 'HOD-NBJ-GRN-007', images: ['/portfolio/IMG_5444.PNG'], category: 'Hoodies', isPublished: true, isFeatured: false, stock: 22, minOrder: 1, tags: ['patches'], collectionSlug: 'hoodies' },
  { name: 'Premium Edition', slug: 'premium-edition', description: 'Custom crafted detailing', price: 104.99, sku: 'HOD-PRE-EDT-008', images: ['/portfolio/IMG_5445.PNG'], category: 'Hoodies', isPublished: true, isFeatured: false, stock: 12, minOrder: 1, tags: ['premium'], collectionSlug: 'hoodies' },

  // Tees & Essentials
  { name: 'First 48 Crimson Set', slug: 'first-48-crimson-set', description: 'Red motion matching short set', price: 65.99, sku: 'TEE-F48-CRI-009', images: ['/portfolio/IMG_5454.PNG'], category: 'Tees & Essentials', isPublished: true, isFeatured: true, stock: 40, minOrder: 1, tags: ['set'], collectionSlug: 'tees' },
  { name: 'Plain White Heavyweight', slug: 'plain-white-heavyweight', description: 'Premium cotton construction tee', price: 34.99, sku: 'TEE-PLN-WHT-010', images: ['/portfolio/IMG_5449.PNG'], category: 'Tees & Essentials', isPublished: true, isFeatured: false, stock: 50, minOrder: 1, tags: ['heavyweight'], collectionSlug: 'tees' },
  { name: 'Broken Tears Graphic', slug: 'broken-tears-graphic', description: 'Raven puff print back design', price: 42.99, sku: 'TEE-BRK-GRA-011', images: ['/portfolio/IMG_5450.PNG'], category: 'Tees & Essentials', isPublished: true, isFeatured: true, stock: 28, minOrder: 1, tags: ['limited', 'graphic'], collectionSlug: 'tees' },
  { name: 'First 48 Midnight Set', slug: 'first-48-midnight-set', description: 'Black motion matching short set', price: 65.99, sku: 'TEE-F48-MID-012', images: ['/portfolio/IMG_5453.PNG'], category: 'Tees & Essentials', isPublished: true, isFeatured: false, stock: 35, minOrder: 1, tags: ['set'], collectionSlug: 'tees' },
  { name: 'First 48 Snow Set', slug: 'first-48-snow-set', description: 'White motion matching short set', price: 65.99, sku: 'TEE-F48-SNW-013', images: ['/portfolio/IMG_5455.PNG'], category: 'Tees & Essentials', isPublished: true, isFeatured: false, stock: 32, minOrder: 1, tags: ['set'], collectionSlug: 'tees' },
  { name: 'Essential Core Tee', slug: 'essential-core-tee', description: 'Minimalist street styling', price: 29.99, sku: 'TEE-ESS-COR-014', images: ['/portfolio/IMG_5448.PNG'], category: 'Tees & Essentials', isPublished: true, isFeatured: false, stock: 60, minOrder: 1, tags: ['essential'], collectionSlug: 'tees' },

  // Tracksuits
  { name: 'Pain 2 Champain Noir', slug: 'pain-2-champain-noir', description: 'Black heavyweight tracksuit matching set', price: 149.99, sku: 'TRK-P2C-NOR-015', images: ['/portfolio/IMG_5456.PNG'], category: 'Tracksuits', isPublished: true, isFeatured: true, stock: 15, minOrder: 1, tags: ['signature'], collectionSlug: 'tracksuits' },
  { name: 'Money Crazy Noir', slug: 'money-crazy-noir', description: 'Full zip black tracksuit with patches', price: 159.99, sku: 'TRK-MCZ-NOR-016', images: ['/portfolio/IMG_5457.PNG'], category: 'Tracksuits', isPublished: true, isFeatured: true, stock: 12, minOrder: 1, tags: ['limited', 'patches'], collectionSlug: 'tracksuits' },
  { name: 'Noir Tracksuit Profile', slug: 'noir-tracksuit-profile', description: 'Form-fitting custom black activewear', price: 139.99, sku: 'TRK-NOR-PRO-017', images: ['/portfolio/IMG_5458.PNG'], category: 'Tracksuits', isPublished: true, isFeatured: false, stock: 18, minOrder: 1, tags: ['activewear'], collectionSlug: 'tracksuits' },
  { name: 'Pain 2 Champain Ash', slug: 'pain-2-champain-ash', description: 'Gray heavyweight tracksuit with embroidery', price: 149.99, sku: 'TRK-P2C-ASH-018', images: ['/portfolio/IMG_5460.PNG'], category: 'Tracksuits', isPublished: true, isFeatured: false, stock: 20, minOrder: 1, tags: ['embroidery'], collectionSlug: 'tracksuits' },

  // Gymwear
  { name: 'Core Logo Singlet Stack', slug: 'core-logo-singlet-stack', description: 'Red and black high-performance gym wear', price: 54.99, sku: 'GYM-COR-STK-019', images: ['/portfolio/IMG_5462.PNG'], category: 'Gymwear', isPublished: true, isFeatured: true, stock: 30, minOrder: 1, tags: ['performance'], collectionSlug: 'gymwear' },
  { name: 'Signature Training Top', slug: 'signature-training-top', description: 'Sleek black B-logo performance singlet', price: 44.99, sku: 'GYM-SIG-TRN-020', images: ['/portfolio/IMG_5463.jpg'], category: 'Gymwear', isPublished: true, isFeatured: false, stock: 40, minOrder: 1, tags: ['training'], collectionSlug: 'gymwear' },
  { name: 'Crimson Training Top', slug: 'crimson-training-top', description: 'Bold red B-logo performance singlet', price: 44.99, sku: 'GYM-CRI-TRN-021', images: ['/portfolio/IMG_5464.jpg'], category: 'Gymwear', isPublished: true, isFeatured: false, stock: 38, minOrder: 1, tags: ['training'], collectionSlug: 'gymwear' },

  // Additional products for Corporate Uniforms and Outerwear to match collections
  { name: 'Executive Polo Set', slug: 'executive-polo-set', description: 'Professional polo shirt with embroidered logo', price: 69.99, sku: 'CRP-EXE-POL-022', images: ['/corporate-uniform.png'], category: 'Corporate Uniforms', isPublished: true, isFeatured: true, stock: 25, minOrder: 5, tags: ['corporate', 'polo'], collectionSlug: 'corporate' },
  { name: 'Business Casual Shirt', slug: 'business-casual-shirt', description: 'Premium button-down for corporate wear', price: 79.99, sku: 'CRP-BUS-SHR-023', images: ['/corporate-uniform.png'], category: 'Corporate Uniforms', isPublished: true, isFeatured: false, stock: 30, minOrder: 5, tags: ['corporate', 'formal'], collectionSlug: 'corporate' },
  { name: 'Weatherproof Jacket', slug: 'weatherproof-jacket', description: 'All-weather protection with technical features', price: 199.99, sku: 'OUT-WEA-JKT-024', images: ['/outerwear.png'], category: 'Outerwear & Jackets', isPublished: true, isFeatured: true, stock: 15, minOrder: 1, tags: ['weatherproof', 'technical'], collectionSlug: 'outerwear' },
  { name: 'Premium Winter Coat', slug: 'premium-winter-coat', description: 'Insulated heavy-duty winter protection', price: 249.99, sku: 'OUT-WIN-COT-025', images: ['/outerwear.png'], category: 'Outerwear & Jackets', isPublished: true, isFeatured: false, stock: 10, minOrder: 1, tags: ['winter', 'insulated'], collectionSlug: 'outerwear' },
];

async function main() {
  console.log('🧹 Cleaning existing products...');
  await prisma.product.deleteMany();

  console.log('🔍 Getting collections for relationship mapping...');
  const collections = await prisma.collection.findMany();
  const collectionMap = new Map(collections.map(c => [c.slug, c.id]));

  console.log('🌱 Seeding products...');
  
  for (const product of productsData) {
    const collectionId = collectionMap.get(product.collectionSlug);
    if (!collectionId) {
      console.warn(`⚠️  Collection '${product.collectionSlug}' not found for product '${product.name}'`);
    }

    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        sku: product.sku,
        images: product.images,
        category: product.category,
        isPublished: product.isPublished,
        isFeatured: product.isFeatured,
        stock: product.stock,
        minOrder: product.minOrder,
        tags: product.tags,
        collectionId: collectionId,
      },
    });
  }

  console.log(`✅ Seeded ${productsData.length} products successfully!`);
  
  // Show statistics
  const stats = await prisma.product.aggregate({
    _count: { _all: true },
  });
  
  const featuredCount = await prisma.product.count({
    where: { isFeatured: true }
  });
  
  const publishedCount = await prisma.product.count({
    where: { isPublished: true }
  });

  const stockValue = await prisma.product.aggregate({
    _sum: { stock: true },
  });

  console.log('\n📊 Product Statistics:');
  console.log(`Total Products: ${stats._count._all}`);
  console.log(`Featured Products: ${featuredCount}`);
  console.log(`Published Products: ${publishedCount}`);
  console.log(`Draft Products: ${stats._count._all - publishedCount}`);
  console.log(`Total Stock Units: ${stockValue._sum.stock}`);

  // Show products by collection
  console.log('\n📦 Products by Collection:');
  for (const collection of collections) {
    const productCount = await prisma.product.count({
      where: { collectionId: collection.id }
    });
    console.log(`${collection.name}: ${productCount} products`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Error seeding products:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });