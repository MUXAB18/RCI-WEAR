export type ProductItem = {
  id: number | string;
  cat: string;
  title: string;
  desc: string;
  img: string;
  badge?: string;
};

export const products: ProductItem[] = [
  { id: 101, cat: 'Hoodies', title: 'Celestial Blue Zip-Up', desc: 'Blue heavyweight zip-up with white star graphics', img: '/portfolio/custom_hoodie_1.jpg', badge: 'New Arrival' },
  { id: 102, cat: 'Hoodies', title: 'Celestial Purple Zip-Up', desc: 'Purple heavyweight zip-up with white star graphics', img: '/portfolio/custom_hoodie_2.jpg', badge: 'New Arrival' },
  { id: 103, cat: 'Hoodies', title: 'Celestial Blue Detail', desc: 'Detailed view of the blue star zip-up hoodie', img: '/portfolio/custom_hoodie_3.webp' },
  { id: 104, cat: 'Hoodies', title: 'Celestial Purple Detail', desc: 'Detailed view of the purple star zip-up hoodie', img: '/portfolio/custom_hoodie_4.webp' },
  { id: 1, cat: 'Hoodies', title: 'Dead Snake Custom', desc: 'Black hoodie with red serpent graphic', img: '/portfolio/IMG_5442.PNG', badge: 'Limited' },
  { id: 2, cat: 'Hoodies', title: 'Forever Havin Motion', desc: 'Heavyweight black hoodie with white puff print', img: '/portfolio/IMG_5441.PNG', badge: 'Signature' },
  { id: 3, cat: 'Hoodies', title: 'Jetlag Studios Signature', desc: 'Two-tone sleeve lettering with chest logo', img: '/portfolio/IMG_5440.PNG', badge: 'Premium' },
  { id: 4, cat: 'Hoodies', title: 'Dark Root Minimal', desc: 'Subtle gray root graphic on pure black', img: '/portfolio/IMG_5443.PNG' },
  { id: 5, cat: 'Hoodies', title: 'Neon Benji 21', desc: 'Bright green hoodie with patches & print', img: '/portfolio/IMG_5444.PNG', badge: 'New' },
  { id: 6, cat: 'Hoodies', title: 'Premium Edition', desc: 'Custom crafted detailing', img: '/portfolio/IMG_5445.PNG' },
  { id: 7, cat: 'Hoodies', title: 'Classic Heavyweight', desc: 'High-quality cotton construction', img: '/portfolio/IMG_5446.PNG' },
  { id: 8, cat: 'Hoodies', title: 'Signature Drop', desc: 'Exclusive release garment', img: '/portfolio/IMG_5447.PNG', badge: 'Exclusive' },
  { id: 9, cat: 'Tees & Essentials', title: 'First 48 Crimson Set', desc: 'Red motion matching short set', img: '/portfolio/IMG_5454.PNG', badge: 'New' },
  { id: 10, cat: 'Tees & Essentials', title: 'Plain White Heavyweight', desc: 'Premium cotton construction tee', img: '/portfolio/IMG_5449.PNG' },
  { id: 11, cat: 'Tees & Essentials', title: 'Broken Tears Graphic', desc: 'Raven puff print back design', img: '/portfolio/IMG_5450.PNG', badge: 'Limited' },
  { id: 12, cat: 'Tees & Essentials', title: 'First 48 Midnight Set', desc: 'Black motion matching short set', img: '/portfolio/IMG_5453.PNG' },
  { id: 13, cat: 'Tees & Essentials', title: 'First 48 Snow Set', desc: 'White motion matching short set', img: '/portfolio/IMG_5455.PNG', badge: 'New' },
  { id: 14, cat: 'Tees & Essentials', title: 'Essential Core Tee', desc: 'Minimalist street styling', img: '/portfolio/IMG_5448.PNG' },
  { id: 15, cat: 'Tees & Essentials', title: 'Lounge Comfort Set', desc: 'Premium relaxation fit', img: '/portfolio/IMG_5451.PNG' },
  { id: 16, cat: 'Tees & Essentials', title: 'Signature Athletic Gear', desc: 'High motion mobility set', img: '/portfolio/IMG_5452.PNG' },
  { id: 17, cat: 'Tracksuits', title: 'Pain 2 Champain Noir', desc: 'Black heavyweight tracksuit matching set', img: '/portfolio/IMG_5456.PNG', badge: 'Signature' },
  { id: 18, cat: 'Tracksuits', title: 'Money Crazy Noir', desc: 'Full zip black tracksuit with patches', img: '/portfolio/IMG_5457.PNG', badge: 'Limited' },
  { id: 19, cat: 'Tracksuits', title: 'Noir Tracksuit Profile', desc: 'Form-fitting custom black activewear', img: '/portfolio/IMG_5458.PNG' },
  { id: 20, cat: 'Tracksuits', title: 'Noir Back Graphic', desc: 'Bold back print on premium fleece', img: '/portfolio/IMG_5459.PNG' },
  { id: 21, cat: 'Tracksuits', title: 'Pain 2 Champain Ash', desc: 'Gray heavyweight tracksuit with embroidery', img: '/portfolio/IMG_5460.PNG', badge: 'New' },
  { id: 22, cat: 'Tracksuits', title: 'Ash Back Graphic', desc: 'Signature back motif on premium heather', img: '/portfolio/IMG_5461.PNG' },
  { id: 23, cat: 'Gymwear', title: 'Core Logo Singlet Stack', desc: 'Red and black high-performance gym wear', img: '/portfolio/IMG_5462.PNG', badge: 'Performance' },
  { id: 24, cat: 'Gymwear', title: 'Signature Training Top', desc: 'Sleek black B-logo performance singlet', img: '/portfolio/IMG_5463.jpg' },
  { id: 25, cat: 'Gymwear', title: 'Crimson Training Top', desc: 'Bold red B-logo performance singlet', img: '/portfolio/IMG_5464.jpg', badge: 'New' },
];

export const productCategories = [
  'Hoodies',
  'Tees & Essentials',
  'Tracksuits',
  'Gymwear',
  'Corporate Uniforms',
  'Outerwear & Jackets'
];

export type CollectionItem = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  number: string;
};

export const collectionsData: CollectionItem[] = [
  {
    id: 'hoodies',
    label: 'PREMIUM',
    title: 'Hoodies',
    subtitle: 'Heavyweight Comfort',
    description: 'Engineered from premium 450gsm fleece for a structured, luxury fit that withstands daily wear and tear.',
    image: '/hoodie-new.png',
    number: '01'
  },
  {
    id: 'tees',
    label: 'CORE',
    title: 'Tees & Essentials',
    subtitle: 'Everyday Staples',
    description: 'Crafted from tightly knit, enzyme-washed cotton for an incredibly soft hand-feel and perfect drape.',
    image: '/tees-essential.png',
    number: '02'
  },
  {
    id: 'tracksuits',
    label: 'SIGNATURE',
    title: 'Tracksuits',
    subtitle: 'Athleisure Excellence',
    description: 'Moisture-wicking tech-fleece sets with sleek profiles, designed for mobility and effortless off-duty style.',
    image: '/tracksuit.png',
    number: '03'
  },
  {
    id: 'gymwear',
    label: 'ACTIVE',
    title: 'Gymwear',
    subtitle: 'Performance Focus',
    description: 'Built for high-intensity output with four-way stretch fabrics and targeted breathability to withstand the toughest workouts.',
    image: '/gymwear.png',
    number: '04'
  },
  {
    id: 'corporate',
    label: 'CUSTOM',
    title: 'Corporate Uniforms',
    subtitle: 'Brand Excellence',
    description: 'Bespoke corporate apparel designed to perfectly translate your brand identity into professional, highly durable daily wear.',
    image: '/corporate-uniform.png',
    number: '05'
  },
  {
    id: 'outerwear',
    label: 'EXCLUSIVE',
    title: 'Outerwear & Jackets',
    subtitle: 'Weather-Ready Style',
    description: 'Constructed with weatherproof materials and technical hardware, offering ultimate protection without compromising on modern style.',
    image: '/outerwear.png',
    number: '06'
  }
];
