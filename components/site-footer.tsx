import Link from "next/link";
import { ArrowUpRight, Camera, Music2, Send } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#080808]/10 bg-[#f4f2ed] text-[#080808]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-1">
            <div className="mb-4 text-[11px] uppercase tracking-[0.25em]">Tees Affairs</div>
            <p className="max-w-xs text-sm text-[#4f4f4f]">
              Contemporary essentials for movement, presence, and everyday distinction.
            </p>
          </div>

          <div>
            <div className="mb-4 text-[10px] uppercase tracking-[0.28em] text-[#747474]">Shop</div>
            <ul className="space-y-2 text-sm text-[#080808]/80">
              <li><Link href="/shop">Shop All</Link></li>
              <li><Link href="/collections/new-arrivals">New Arrivals</Link></li>
              <li><Link href="/collections/essentials">Essentials</Link></li>
              <li><Link href="/collections/outerwear">Outerwear</Link></li>
              <li><Link href="/collections/tops">Tops</Link></li>
              <li><Link href="/collections/accessories">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[10px] uppercase tracking-[0.28em] text-[#747474]">About</div>
            <ul className="space-y-2 text-sm text-[#080808]/80">
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/lookbook">Lookbook</Link></li>
              <li><Link href="/journal">Journal</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[10px] uppercase tracking-[0.28em] text-[#747474]">Help</div>
            <ul className="space-y-2 text-sm text-[#080808]/80">
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/size-guide">Size Guide</Link></li>
              <li><Link href="/shipping-returns">Shipping & Returns</Link></li>
              <li><Link href="/track-order">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[10px] uppercase tracking-[0.28em] text-[#747474]">Social</div>
            <div className="mb-5 flex gap-3">
              <a href="https://instagram.com" aria-label="Instagram" className="rounded-full border border-[#080808]/15 p-2 transition hover:bg-[#080808] hover:text-[#f4f2ed]"><Camera size={15} /></a>
              <a href="https://www.tiktok.com" aria-label="TikTok" className="rounded-full border border-[#080808]/15 p-2 transition hover:bg-[#080808] hover:text-[#f4f2ed]"><Music2 size={15} /></a>
              <a href="https://www.pinterest.com" aria-label="Pinterest" className="rounded-full border border-[#080808]/15 p-2 transition hover:bg-[#080808] hover:text-[#f4f2ed]"><ArrowUpRight size={15} /></a>
            </div>
            <div className="rounded-xl border border-[#080808]/10 bg-white p-2">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#080808]">
                <Send size={12} />
                Join Tees Affairs
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[#080808]/10 pt-6 text-xs text-[#4f4f4f] md:flex-row md:items-center md:justify-between">
          <div className="flex gap-5">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/shipping-returns">Returns</Link>
          </div>
          <div className="flex gap-2">
            <span className="rounded border border-[#080808]/15 px-2 py-1">Visa</span>
            <span className="rounded border border-[#080808]/15 px-2 py-1">Mastercard</span>
            <span className="rounded border border-[#080808]/15 px-2 py-1">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
