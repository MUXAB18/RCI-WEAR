import { MetadataRoute } from 'next';
import { products } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rasheedclothingintl.me';

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/products',
    '/manufacturing',
    '/custom-manufacturing',
    '/customization',
    '/private-label',
    '/quality',
    '/fabrics',
    '/lookbook',
    '/request-quote'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const dynamicProductRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicProductRoutes];
}
