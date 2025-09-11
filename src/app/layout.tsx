import BackToTop from "@/components/BackToTop";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CartDrawer from "@/components/cart-drawer";
import { CartProvider } from "@/lib/cart";
import BackgroundLogo from "@/components/BackgroundLogo"; // ← add
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#FFF7E6] text-brand-ink antialiased">
        <CartProvider>
          <div className="min-h-screen flex flex-col relative">
            <SiteHeader />

            {/* Global background logo layer */}
            <BackgroundLogo />

            {/* Content above the background */}
            <main className="flex-1 relative z-[2]">{children}</main>

            <SiteFooter />
          </div>
          <CartDrawer />
          <BackToTop />

        </CartProvider>
      </body>
    </html>
  );
}
