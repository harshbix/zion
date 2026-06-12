/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable Next.js image optimisation (was previously disabled)
    unoptimized: false,
    // Serve modern formats where supported
    formats: ['image/avif', 'image/webp'],
    // Device breakpoints for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum cache TTL of 1 hour
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Compress HTML/JS responses
  compress: true,
  // Powered-By header removal
  poweredByHeader: false,
};

module.exports = nextConfig;
