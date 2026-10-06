"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, ShoppingBag, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/storefront";
import { formatMoney } from "@/lib/products";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export function ProductCard({ product }: { product: Product }) {
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const { toggleItem, items } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);
  const liked = items.includes(product.id);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 36, scale: 0.96 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      whileHover={reduceMotion ? undefined : { y: -8, scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 240, damping: 17, mass: 0.8 }}
      className="group relative overflow-hidden rounded-xl border border-[#080808]/10 bg-white"
    >
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-[380px] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </Link>
        {(product.hoverImage || product.images[1]) && (
          <img
            src={product.hoverImage ?? product.images[1]}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
          />
        )}

        <button
          type="button"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleItem(product.id)}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#080808]/15 bg-[#f4f2ed]/80 backdrop-blur-sm transition hover:bg-[#080808] hover:text-[#f4f2ed] md:right-4 md:top-4"
        >
          <Heart size={16} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.22em] text-[#5f5f5f]">
          <span>{product.category}</span>
          <span className="flex items-center gap-1"><Star size={12} className="fill-current" /> {product.rating}</span>
        </div>

        <Link href={`/products/${product.slug}`} className="block text-lg font-medium tracking-[-0.04em] text-[#080808]">
          {product.name}
        </Link>

        <div className="flex items-center justify-between">
          <div className="text-sm text-[#080808]">{formatMoney(product.price)}</div>
          <div className="text-xs uppercase tracking-[0.18em] text-[#6c6c6c]">{product.colors[0]}</div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => setQuickAddOpen(true)}
            aria-label={`Quick add ${product.name}`}
            title="Quick add"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#080808] bg-[#080808] text-[#f4f2ed] transition hover:bg-[#f4f2ed] hover:text-[#080808]"
          >
            <ShoppingCart size={18} />
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="flex min-h-10 flex-1 items-center justify-center rounded-md border border-[#080808]/20 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#080808] transition hover:border-[#080808]"
          >
            View
          </Link>
        </div>
      </div>

      <QuickAddDrawer
        product={product}
        open={quickAddOpen}
        onClose={() => setQuickAddOpen(false)}
        onAdd={(selectedColor, selectedSize) => {
          addItem({
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            color: selectedColor,
            size: selectedSize,
            image: product.images[0],
            quantity: 1,
          });
          setQuickAddOpen(false);
        }}
      />
    </motion.div>
  );
}

function QuickAddDrawer({
  product,
  open,
  onClose,
  onAdd,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
  onAdd: (color: string, size: string) => void;
}) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#080808]/60 p-2 sm:p-4 md:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[82dvh] w-full max-w-md overflow-y-auto rounded-t-xl border border-[#080808]/10 bg-[#f4f2ed] p-4 text-[#080808] sm:rounded-xl sm:p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={product.images[0]} alt={product.name} className="h-14 w-12 rounded-md object-cover" />
                <div>
                  <div className="text-sm font-medium">{product.name}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#5f5f5f]">{formatMoney(product.price)}</div>
                </div>
              </div>
              <button type="button" onClick={onClose} className="rounded-md px-2 py-2 text-xs uppercase tracking-[0.16em]">Close</button>
            </div>

            <div className="mb-3">
              <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[#5f5f5f]">Color</div>
              <div className="flex flex-wrap gap-1.5">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-md border px-2.5 py-1.5 text-[9px] uppercase tracking-[0.16em] ${
                      selectedColor === color ? "border-[#080808] bg-[#080808] text-[#f4f2ed]" : "border-[#080808]/15 bg-transparent text-[#080808]"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[#5f5f5f]">Size</div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-md border px-2.5 py-1.5 text-[9px] uppercase tracking-[0.16em] ${
                      selectedSize === size ? "border-[#080808] bg-[#080808] text-[#f4f2ed]" : "border-[#080808]/15 bg-transparent text-[#080808]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onAdd(selectedColor, selectedSize)}
              className="flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-[#080808] px-3 py-2.5 text-[9px] uppercase tracking-[0.2em] text-[#f4f2ed] transition hover:bg-[#f4f2ed] hover:text-[#080808] hover:border hover:border-[#080808] sm:text-[10px] sm:tracking-[0.28em]"
            >
              <ShoppingBag size={15} />
              Add to Bag
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
