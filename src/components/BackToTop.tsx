"use client";

import * as React from "react";

export default function BackToTop() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    let ticking = false;
    const threshold = 700; // px from top before showing the button

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShow(window.scrollY > threshold && document.body.scrollHeight > window.innerHeight * 2);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialize
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = React.useCallback(() => {
    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Back to top"
      className={[
        "fixed z-[80]",                 // above footer/header; adjust if needed
        "right-4 bottom-[max(1rem,env(safe-area-inset-bottom))]",
        "md:right-6 md:bottom-[max(1.5rem,env(safe-area-inset-bottom))]",
        "h-12 w-12 rounded-full shadow-md",
        "backdrop-blur bg-brand-sand/90 text-brand-ink border border-black/5",
        "flex items-center justify-center",
        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu",
        show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none",
        // keep it above a right-side cart drawer; nudge left if needed:
        "md:mr-0",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown/50",
      ].join(" ")}
    >
      {/* Up chevron (accessible icon) */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="translate-y-[1px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
