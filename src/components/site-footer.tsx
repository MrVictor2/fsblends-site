export default function SiteFooter() {
  return (
    <footer className="border-t bg-brand-sand/95 backdrop-blur text-[clamp(0.9rem,1.6vw,1rem)]">

<div className="mx-auto flex max-w-[min(90rem,92vw)] items-center justify-between px-6 md:px-8 py-2">
        <p className="text-brand-ink/80">
          © {new Date().getFullYear()} FS Blends. Hand poured soy candles.
        </p>

        {/* optional tiny links — remove if you don’t want them */}
        <nav className="hidden gap-4 text-brand-ink/80 sm:flex">
          <a href="/privacy" className="hover:text-brand-brown">Privacy</a>
          <a href="/terms" className="hover:text-brand-brown">Terms</a>
          <a href="/contact" className="hover:text-brand-brown">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
