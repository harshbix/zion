import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/account', '/order-tracking', '/cart', '/checkout', '/sign-in'],
      },
    ],
    sitemap: 'https://zioncakesandbites.co.tz/sitemap.xml',
    host: 'https://zioncakesandbites.co.tz',
  };
}
