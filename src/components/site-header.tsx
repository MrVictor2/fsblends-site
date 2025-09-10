"use client";
import { useCart } from "@/lib/cart";
import * as React from "react";
import Link from "next/link";

export default function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const { toggle, count } = useCart();

  return (
    <>
      {/* --- TOP NAV BAR (slim + sticky) --- */}
      <div className="fixed inset-x-0 top-0 z-[60] border-b bg-brand-sand/95 backdrop-blur">

        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 h-12">
          {/* LEFT: Social icons */}
          <div className="flex items-center gap-3 text-brand-ink">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/fsblends"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FS Blends on Instagram"
              className="hover:text-brand-brown transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.2" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/fsblends/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FS Blends on Facebook"
              className="hover:text-brand-brown transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.02H8.08v-2.92h2.36V9.41c0-2.33 1.39-3.62 3.52-3.62.7 0 1.44.12 1.44.12v2.5h-.81c-1.27 0-1.67.8-1.67 1.61v1.94h2.84l-.45 2.92h-2.39V22c4.78-.76 8.44-4.92 8.44-9.94z" />
              </svg>
            </a>

            {/* Pinterest */}
            <a
              href="https://www.pinterest.com/fsblends/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="FS Blends on Pinterest"
              className="hover:text-brand-brown transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.49 2 2 6.27 2 11.5c0 3.89 2.46 7.22 5.94 8.45-.08-.72-.16-1.85.03-2.65.17-.73 1.13-4.65 1.13-4.65s-.29-.58-.29-1.44c0-1.35.78-2.36 1.75-2.36.83 0 1.23.62 1.23 1.36 0 .83-.53 2.07-.81 3.22-.23.97.49 1.77 1.44 1.77 1.73 0 3.06-1.82 3.06-4.45 0-2.33-1.67-3.96-4.05-3.96-2.76 0-4.38 2.06-4.38 4.19 0 .83.32 1.72.73 2.2a.3.3 0 01.07.29c-.08.31-.26.97-.3 1.11-.05.17-.17.22-.39.13-1.45-.67-2.36-2.77-2.36-4.46 0-3.63 2.64-6.96 7.6-6.96 3.98 0 7.07 2.83 7.07 6.62 0 3.95-2.49 7.13-5.95 7.13-1.16 0-2.26-.6-2.63-1.32l-.71 2.7c-.26.98-.96 2.2-1.43 2.94.98.3 2.01.46 3.08.46 5.51 0 10-4.27 10-9.5C22 6.27 17.51 2 12 2z" />
              </svg>
            </a>
          </div>

          {/* Brand text (kept small so bar stays slim) */}
          <Link
            href="/"
            className="ml-3 text-base font-semibold text-brand-brown"
            aria-label="FS Blends — Home"
          >
            FS Blends
          </Link>

{/* RIGHT: nav + cart (pinned right) */}
<div className="ml-auto hidden md:flex items-center gap-8">
  <nav className="flex items-center gap-8 text-sm font-medium leading-none text-brand-ink">
    <Link href="/products" className="hover:text-brand-brown">Products</Link>
    <Link href="/collection" className="hover:text-brand-brown">Collections</Link>
    <Link href="/gift" className="hover:text-brand-brown">Gift</Link>
    <Link href="/about" className="hover:text-brand-brown">About</Link>
    <Link href="/blog" className="hover:text-brand-brown">Blog</Link>
    <Link href="/wholesale" className="hover:text-brand-brown">Wholesale</Link>
    <Link href="/contact" className="hover:text-brand-brown">Contact</Link>
  </nav>

  <button
    onClick={toggle}
    className="relative h-9 items-center justify-center rounded-lg border px-3 text-brand-ink hover:bg-brand-brown/10"
    aria-label="Open cart"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="20" r="1" />
      <circle cx="17" cy="20" r="1" />
      <path d="M5 6h2l1 10h10l2-8H7" />
    </svg>

    {count > 0 && (
      <span className="absolute -right-1 -top-1 rounded-full bg-brand-brown px-1.5 text-[10px] leading-4 text-white">
        {count}
      </span>
    )}
  </button>
</div>



          {/* Mobile hamburger */}
          <button
            type="button"
            className="ml-auto md:hidden rounded-lg border px-3 py-2 text-brand-ink"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6"  x2="21" y2="6"  />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            
          </button>
        </div>

        {/* Mobile menu (collapsible) */}
        <div
          id="mobile-nav"
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
            open ? "max-h-96" : "max-h-0"
          }`}
        >
          <nav
            className="mx-auto grid max-w-6xl gap-2 border-t bg-white/95 px-4 py-3 text-brand-ink"
            onClick={() => setOpen(false)}
          >
            <Link href="/products" className="py-1">Products</Link>
            <Link href="/collection" className="py-1">Collections</Link>
            <Link href="/gift" className="py-1">Gift</Link>
            <Link href="/about" className="py-1">About</Link>
            <Link href="/blog" className="py-1">Blog</Link>
            <Link href="/wholesale" className="py-1">Wholesale</Link>
            <Link href="/contact" className="py-1">Contact</Link>

            {/* Socials row for mobile */}
            <div className="mt-2 flex items-center gap-4 pt-2 text-brand-ink border-t">
              <a href="https://www.instagram.com/fsblends" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-brand-brown">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1.2" />
                </svg>
              </a>
              <a href="https://www.facebook.com/fsblends/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-brand-brown">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.02H8.08v-2.92h2.36V9.41c0-2.33 1.39-3.62 3.52-3.62.7 0 1.44.12 1.44.12v2.5h-.81c-1.27 0-1.67.8-1.67 1.61v1.94h2.84l-.45 2.92h-2.39V22c4.78-.76 8.44-4.92 8.44-9.94z" />
                </svg>
              </a>
              <a href="https://www.pinterest.com/fsblends/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="hover:text-brand-brown">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.49 2 2 6.27 2 11.5c0 3.89 2.46 7.22 5.94 8.45-.08-.72-.16-1.85.03-2.65.17-.73 1.13-4.65 1.13-4.65s-.29-.58-.29-1.44c0-1.35.78-2.36 1.75-2.36.83 0 1.23.62 1.23 1.36 0 .83-.53 2.07-.81 3.22-.23.97.49 1.77 1.44 1.77 1.73 0 3.06-1.82 3.06-4.45 0-2.33-1.67-3.96-4.05-3.96-2.76 0-4.38 2.06-4.38 4.19 0 .83.32 1.72.73 2.2a.3.3 0 01.07.29c-.08.31-.26.97-.3 1.11-.05.17-.17.22-.39.13-1.45-.67-2.36-2.77-2.36-4.46 0-3.63 2.64-6.96 7.6-6.96 3.98 0 7.07 2.83 7.07 6.62 0 3.95-2.49 7.13-5.95 7.13-1.16 0-2.26-.6-2.63-1.32l-.71 2.7c-.26.98-.96 2.2-1.43 2.94.98.3 2.01.46 3.08.46 5.51 0 10-4.27 10-9.5C22 6.27 17.51 2 12 2z" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* --- LOGO ROW (centered on cream) --- */}
      
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-[0px] md:h-[150px] items-center justify-center">
            
          </div>
        </div>
      
    </>
  );
}
