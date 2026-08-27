import 'dotenv/config';
import prisma from '../src/lib/prisma';

async function verifyData() {
  console.log('🔍 Verifying database data...\n');

  // Portfolio count
  const portfolioStats = await prisma.portfolioProject.aggregate({
    _count: { _all: true },
  });
  const featuredPortfolio = await prisma.portfolioProject.count({
    where: { isFeatured: true }
  });
  const publishedPortfolio = await prisma.portfolioProject.count({
    where: { isPublished: true }
  });

  console.log('📁 PORTFOLIO STATISTICS:');
  console.log(`Total Portfolio Projects: ${portfolioStats._count._all}`);
  console.log(`Featured Portfolio: ${featuredPortfolio}`);
  console.log(`Published Portfolio: ${publishedPortfolio}`);
  console.log(`Draft Portfolio: ${portfolioStats._count._all - publishedPortfolio}\n`);

  // Collections count
  const collectionStats = await prisma.collection.aggregate({
    _count: { _all: true },
  });
  const publishedCollections = await prisma.collection.count({
    where: { isPublished: true }
  });

  console.log('📦 COLLECTIONS STATISTICS:');
  console.log(`Total Collections: ${collectionStats._count._all}`);
  console.log(`Published Collections: ${publishedCollections}`);
  console.log(`Draft Collections: ${collectionStats._count._all - publishedCollections}\n`);

  // Products count
  const productStats = await prisma.product.aggregate({
    _count: { _all: true },
  });
  const featuredProducts = await prisma.product.count({
    where: { isFeatured: true }
  });
  const publishedProducts = await prisma.product.count({
    where: { isPublished: true }
  });
  const stockValue = await prisma.product.aggregate({
    _sum: { stock: true },
  });

  console.log('🛍️ PRODUCTS STATISTICS:');
  console.log(`Total Products: ${productStats._count._all}`);
  console.log(`Featured Products: ${featuredProducts}`);
  console.log(`Published Products: ${publishedProducts}`);
  console.log(`Draft Products: ${productStats._count._all - publishedProducts}`);
  console.log(`Total Stock Units: ${stockValue._sum.stock}\n`);

  // List collections with product counts
  console.log('📊 COLLECTIONS WITH PRODUCT COUNTS:');
  const collections = await prisma.collection.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: {
        select: {
          products: true
        }
      }
    }
  });

  collections.forEach(collection => {
    console.log(`${collection.name}: ${collection._count.products} products`);
  });

  console.log('\n✅ VERIFICATION COMPLETE!');
  console.log('\nSUMMARY:');
  console.log(`✓ Portfolio Items: ${portfolioStats._count._all} (Target: 29) ${portfolioStats._count._all === 29 ? '✅' : '❌'}`);
  console.log(`✓ Collections: ${collectionStats._count._all} (Target: 6) ${collectionStats._count._all === 6 ? '✅' : '❌'}`);
  console.log(`✓ Products: ${productStats._count._all} (Target: 25+) ${productStats._count._all >= 25 ? '✅' : '❌'}`);
}

verifyData()
  .catch((e) => {
    console.error('❌ Error verifying data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });