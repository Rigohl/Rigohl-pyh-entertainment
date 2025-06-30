
import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dualmuse-demo.web.app';
  const pages = [
    '/',
    '/proceso',
    '/ejemplos',
    '/formularios',
    '/quienes-somos',
    '/faq',
    '/ayuda',
    '/contacto',
    '/terms',
    '/privacy',
    '/test-pago'
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: page === '/' ? 1 : 0.8,
  }));
}
