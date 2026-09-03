export type NavItem = {
  name: string;
  href: string;
  dropdown?: { name: string; href: string; }[];
};

export const navigation: {
  main: NavItem[];
  footer: Record<string, NavItem[]>;
} = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
      name: 'Collections',
      href: '/collections'
    },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Design Studio', href: '/design-studio' },
    { name: 'Quote', href: '/contact' },
  ],
  footer: {
    quickLinks: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Collections', href: '/collections' },
      { name: 'Contact Us', href: '/contact' },
    ],
    explore: [
      { name: 'Manufacturing', href: '/manufacturing' },
      { name: 'Quality Control', href: '/quality' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Global Reach', href: '/global' },
      { name: 'Export Services', href: '/export-services' },
    ],
    services: [
      { name: 'Private Label', href: '/private-label' },
      { name: 'Custom Manufacturing', href: '/custom-manufacturing' },
      { name: 'Customization & Printing', href: '/customization' },
      { name: 'Fabric Sourcing', href: '/fabrics' },
    ],
    resources: [
      { name: 'Design Studio', href: '/design-studio' },
      { name: 'Blog', href: '/blog' },
      { name: 'FAQ', href: '/faq' },
    ]
  }
};
