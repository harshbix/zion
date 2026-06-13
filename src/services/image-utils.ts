/**
 * lib/image-utils.ts
 * Utilities for generating inline shimmer/blur data URIs used as
 * Next.js <Image> placeholder props, eliminating layout shift during load.
 */

/**
 * Converts a number to a base64 string character.
 * Used to build compact shimmer SVG data URIs.
 */
function toBase64(str: string): string {
  if (typeof window === 'undefined') {
    // Node / Edge runtime
    return Buffer.from(str).toString('base64');
  }
  // Browser
  return window.btoa(str);
}

/**
 * Generates an animated shimmer SVG as a base64 data URI.
 * Pass it to Next.js Image as:
 *  
 *   blurDataURL={shimmerDataURL(w, h)}
 *
 * @param w  Width of the placeholder (px)
 * @param h  Height of the placeholder (px)
 */
export function shimmerDataURL(w: number, h: number): string {
  const svg = `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop stop-color="#FBF8F3" offset="0%"/>
      <stop stop-color="#F4ECE1" offset="50%"/>
      <stop stop-color="#FBF8F3" offset="100%"/>
    </linearGradient>
    <animateTransform
      attributeName="gradientTransform"
      type="translate"
      from="-1 0"
      to="1 0"
      dur="1.5s"
      repeatCount="indefinite"/>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
</svg>`.trim();

  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}

/**
 * A static 1×1 cream-toned pixel as a base64 PNG.
 * Lighter weight than the animated shimmer — use for small UI elements
 * (logo, avatar, thumbnail).
 */
export const CREAM_BLUR_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==';
