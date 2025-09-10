export default function SiteFooter() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-[60] border-t bg-brand-sand/95 backdrop-blur">

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <p className="text-xs text-brand-ink/80">
          © {new Date().getFullYear()} FS Blends. Hand poured soy candles.
        </p>

        {/* optional tiny links — remove if you don’t want them */}
        <nav className="hidden gap-4 text-xs text-brand-ink/80 sm:flex">
          <a href="/privacy" className="hover:text-brand-brown">Privacy</a>
          <a href="/terms" className="hover:text-brand-brown">Terms</a>
          <a href="/contact" className="hover:text-brand-brown">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
