import 'dotenv/config';
import prisma from './src/lib/prisma';

const portfolioHighlights = [
  {
    title: 'Dead Snake Custom',
    category: 'Hoodies',
    imageUrl: '/portfolio/IMG_5442.PNG',
    isFeatured: true,
    order: 1,
  },
  {
    title: 'First 48 Crimson Set',
    category: 'Tees & Essentials',
    imageUrl: '/portfolio/IMG_5454.PNG',
    isFeatured: true,
    order: 2,
  },
  {
    title: 'Pain 2 Champain',
    category: 'Tracksuits',
    imageUrl: '/portfolio/IMG_5456.PNG',
    isFeatured: true,
    order: 3,
  },
  {
    title: 'Core Logo Stack',
    category: 'Gymwear',
    imageUrl: '/portfolio/IMG_5462.PNG',
    isFeatured: true,
    order: 4,
  }
];

async function main() {
  console.log('Seeding portfolio projects...');
  for (const item of portfolioHighlights) {
    await prisma.portfolioProject.create({
      data: item,
    });
  }
  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
