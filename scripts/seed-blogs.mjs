import 'dotenv/config';
import prisma from '../src/lib/prisma.js';

const posts = [
  {
    title: 'The Future of Sustainable Textile Dyeing',
    slug: 'future-of-sustainable-textile-dyeing',
    excerpt: 'Exploring closed-loop systems and bio-based dyes that are dramatically reducing the environmental footprint of apparel manufacturing.',
    content: `The apparel industry is undergoing a radical transformation in how it approaches textile dyeing — one of the most water-intensive and chemically demanding steps in garment production.

Traditional dyeing processes consume enormous amounts of fresh water and release chemical-laden wastewater into local ecosystems. But a new wave of innovation is changing all of that.

## Closed-Loop Dyeing Systems

Closed-loop systems recapture and recycle water and chemicals used during the dyeing process, reducing water consumption by up to 95%. Leading manufacturers in Pakistan and Bangladesh are already adopting these systems as export markets demand cleaner production credentials.

## Bio-Based and Natural Dyes

Beyond water savings, bio-based dyes derived from plants, insects, and minerals are re-entering the industry after decades of synthetic dominance. These dyes are biodegradable, non-toxic, and produce genuinely unique color variations that consumers are increasingly drawn to.

## What This Means for Your Brand

At Rasheed Clothing International, we continuously evaluate and adopt sustainable dyeing practices to help our partners meet their ESG targets. Whether you're building a sustainability-first brand or simply want to future-proof your supply chain, we're ready to help.`,
    coverImage: '/media__1775817922243.webp',
    author: 'RCI Editorial',
    tags: ['Sustainability', 'Manufacturing', 'Textiles'],
    isPublished: true,
    isFeatured: true,
    publishedAt: new Date('2026-10-12'),
  },
  {
    title: 'Understanding GSM: Choosing the Right Fabric Weight',
    slug: 'understanding-gsm-choosing-the-right-weight',
    excerpt: 'A comprehensive guide to Grams per Square Meter and how it affects the drape, warmth, and luxury feel of your streetwear collections.',
    content: `When sourcing fabrics for your clothing line, one of the most critical specifications you'll encounter is GSM — Grams per Square Meter. Understanding GSM is essential to choosing the right material for your product and your customer.

## What is GSM?

GSM measures the density or weight of a fabric. A higher GSM means a heavier, thicker fabric, while a lower GSM indicates something lighter and more breathable. Here's a quick reference:

- **80–120 GSM** — Lightweight t-shirts, summer shirts, inner liners
- **150–200 GSM** — Standard t-shirts, polos, everyday essentials
- **220–280 GSM** — Premium heavyweight tees, structured sweatshirts
- **300–450 GSM** — Hoodies, joggers, outerwear, winter blankets

## Why It Matters for Streetwear

The streetwear market increasingly demands "heavyweight" garments. Consumers associate higher GSM with quality and durability. A 300 GSM hoodie simply feels more premium in hand than a 220 GSM version — and your customers notice.

## Our Recommendation

For most premium streetwear collections, we recommend 280–320 GSM for hoodies and 220–260 GSM for tees. This hits the sweet spot between comfort, durability, and perceived quality.

Reach out to our team at RCI to request fabric swatches at your preferred GSM range.`,
    coverImage: '/media__1775818866466.webp',
    author: 'RCI Editorial',
    tags: ['Education', 'Fabrics', 'Streetwear'],
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2026-09-28'),
  },
  {
    title: 'From Tech Pack to Production: A Case Study',
    slug: 'from-tech-pack-to-production',
    excerpt: 'How we translated a fragmented concept into a perfectly graded, 5,000-piece production run in under 45 days.',
    content: `One of our long-standing clients — a UK-based streetwear brand — came to us with a vision but without a complete tech pack. They had mood boards, a few hand-drawn sketches, and a very tight deadline. Here's how we made it work.

## The Challenge

The brand needed 5,000 units of a signature oversized hoodie — in 3 colorways and 5 sizes — within 45 days. Their existing manufacturer had failed to deliver on quality and they were under pressure from a launch campaign already in motion.

## Step 1: Tech Pack Development

Our in-house design team worked with the client's creative director to produce a complete tech pack within 72 hours. This included construction details, measurement specs, print placements, and material callouts.

## Step 2: Sampling

We produced 3 size-graded samples within 7 days. The client approved on the second round, with only minor adjustments to the shoulder seam and label placement.

## Step 3: Production & QC

Our factory team executed the full run across two production lines. Every batch went through our 12-point quality control process before packing.

## The Result

All 5,000 units shipped within 43 days — 2 days ahead of schedule — with zero defect returns from the client's end.

This is the RCI difference: experienced teams, transparent communication, and a commitment to getting it right the first time.`,
    coverImage: '/media__1775818869472.webp',
    author: 'RCI Editorial',
    tags: ['Process', 'Case Study', 'Production'],
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2026-08-15'),
  },
  {
    title: 'The Rise of Technical Activewear in Everyday Fashion',
    slug: 'rise-of-technical-activewear',
    excerpt: 'Why 4-way stretch interlocks and moisture-wicking fabrics are becoming the new standard for casual luxury brands.',
    content: `The boundary between athletic wear and everyday fashion has almost completely dissolved. What was once reserved for the gym or the running track is now standard wardrobe in offices, coffee shops, and social events.

## The Athleisure Evolution

Athleisure has been growing for years, but what we're seeing now goes beyond simple comfort dressing. Consumers want garments that perform — fabrics that move with them, manage moisture, and look sharp at the same time.

## Key Technical Fabrics Driving the Trend

**4-Way Stretch Interlock** — Offers full range of motion in every direction. Commonly used in joggers, shorts, and polo shirts. Retains structure after washing.

**Moisture-Wicking Jersey** — Draws sweat away from the skin and promotes rapid evaporation. A must for any activewear-adjacent garment.

**Bonded and Seamless Construction** — Eliminates chafe points and creates a sleek, premium look that works equally well in performance and lifestyle contexts.

## Opportunity for Brands

If you're building a lifestyle or luxury streetwear brand, integrating technical fabrics into your collection is one of the highest-impact moves you can make. Consumers are willing to pay premium prices for garments that genuinely perform.

At RCI, we stock a wide range of technical fabric options and can help you develop a collection that bridges the gap between performance and style. Contact us to learn more.`,
    coverImage: '/media__1775818888792.webp',
    author: 'RCI Editorial',
    tags: ['Trends', 'Activewear', 'Fabrics'],
    isPublished: true,
    isFeatured: false,
    publishedAt: new Date('2026-07-22'),
  },
];

async function main() {
  console.log('🌱 Seeding blog posts...');

  for (const post of posts) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: post.slug } });
    if (existing) {
      console.log(`⏭️  Skipping "${post.title}" — already exists.`);
      continue;
    }
    await prisma.blogPost.create({ data: post });
    console.log(`✅ Created: "${post.title}"`);
  }

  console.log('\n🎉 Done! 4 blog posts seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
