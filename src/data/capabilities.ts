export type Capability = {
  id: string;
  num: string;
  title: string;
  desc: string;
  image: string;
};

export const capabilities: Capability[] = [
  {
    id: 'cut-and-sew',
    num: '01',
    title: 'CUT & SEW',
    desc: 'Precision craftsmanship from pattern to finished garment.',
    image: '/media__1775818869472.webp', // factory image
  },
  {
    id: 'embroidery',
    num: '02',
    title: 'EMBROIDERY',
    desc: 'Detailed embroidery and branded garment finishing.',
    image: '/media__1775817925946.webp',
  },
  {
    id: 'printing',
    num: '03',
    title: 'PRINTING',
    desc: 'Modern printing techniques for high-quality visual identity.',
    image: '/media__1775817915164.webp', 
  },
  {
    id: 'fabric-sourcing',
    num: '04',
    title: 'FABRIC SOURCING',
    desc: 'Materials selected around performance, comfort and brand requirements.',
    image: '/media__1775818876935.webp', // factory image
  },
  {
    id: 'private-label',
    num: '05',
    title: 'PRIVATE LABEL',
    desc: 'Custom labels, tags, packaging and complete brand identity.',
    image: '/media__1775818866466.webp', 
  },
  {
    id: 'packaging',
    num: '06',
    title: 'PACKAGING',
    desc: 'Finished garments prepared according to brand requirements.',
    image: '/media__1775818871661.webp',
  },
  {
    id: 'quality-control',
    num: '07',
    title: 'QUALITY CONTROL',
    desc: 'Inspection throughout the production process.',
    image: '/media__1775818888792.webp',
  },
  {
    id: 'global-shipping',
    num: '08',
    title: 'GLOBAL SHIPPING',
    desc: 'Reliable delivery and export support.',
    image: '/media__1775818899078.webp',
  },
];
