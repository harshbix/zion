
/**
 * SkipLink — renders a visually hidden link that becomes visible on :focus.
 * Lets keyboard / screen-reader users jump directly to the main content.
 * Place this as the first element inside <body> (before Navbar).
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        fixed top-4 left-4 z-[9999]
        bg-amber-600 text-white
        font-sans-luxury text-xs font-bold uppercase tracking-widest
        px-6 py-3
        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-600
        transition-all
      "
    >
      Skip to main content
    </a>
  );
}
