"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatMoney } from "@/lib/products";
import { useCartStore } from "@/store/cart-store";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [promo, setPromo] = useState("");
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    country: "United States",
    card: "",
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 150 ? 0 : 24;
  const discount = promo.trim().toUpperCase() === "TEESAFAIRS10" ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleChange = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearCart();
    router.push("/checkout/success");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-8">
        <div className="text-[10px] uppercase tracking-[0.35em] text-[#666]">Checkout</div>
        <h1 className="mt-3 font-display text-5xl md:text-7xl">SECURE CHECKOUT</h1>
      </div>

      {items.length === 0 ? (
        <div className="border border-[#080808]/10 bg-white p-12 text-center">
          <div className="text-[10px] uppercase tracking-[0.35em] text-[#666]">Your bag is empty</div>
          <p className="mt-3 text-sm text-[#444]">Add a few essentials before completing your order.</p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="border border-[#080808]/10 bg-white p-6">
              <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#666]">Contact</div>
              <div className="grid gap-4 md:grid-cols-2">
                <input required value={form.email} onChange={handleChange("email")} placeholder="Email address" className="md:col-span-2 border border-[#080808]/10 bg-[#f4f2ed] px-3 py-3 text-sm outline-none focus:border-[#080808]" />
              </div>
            </div>

            <div className="border border-[#080808]/10 bg-white p-6">
              <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#666]">Shipping</div>
              <div className="grid gap-4 md:grid-cols-2">
                <input required value={form.firstName} onChange={handleChange("firstName")} placeholder="First name" className="border border-[#080808]/10 bg-[#f4f2ed] px-3 py-3 text-sm outline-none focus:border-[#080808]" />
                <input required value={form.lastName} onChange={handleChange("lastName")} placeholder="Last name" className="border border-[#080808]/10 bg-[#f4f2ed] px-3 py-3 text-sm outline-none focus:border-[#080808]" />
                <input required value={form.address} onChange={handleChange("address")} placeholder="Address" className="md:col-span-2 border border-[#080808]/10 bg-[#f4f2ed] px-3 py-3 text-sm outline-none focus:border-[#080808]" />
                <input required value={form.city} onChange={handleChange("city")} placeholder="City" className="border border-[#080808]/10 bg-[#f4f2ed] px-3 py-3 text-sm outline-none focus:border-[#080808]" />
                <input required value={form.zip} onChange={handleChange("zip")} placeholder="ZIP code" className="border border-[#080808]/10 bg-[#f4f2ed] px-3 py-3 text-sm outline-none focus:border-[#080808]" />
                <select value={form.country} onChange={handleChange("country")} className="md:col-span-2 border border-[#080808]/10 bg-[#f4f2ed] px-3 py-3 text-sm outline-none focus:border-[#080808]">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>France</option>
                  <option>Italy</option>
                </select>
              </div>
            </div>

            <div className="border border-[#080808]/10 bg-white p-6">
              <div className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#666]">Payment</div>
              <input required value={form.card} onChange={handleChange("card")} placeholder="Card number" className="w-full border border-[#080808]/10 bg-[#f4f2ed] px-3 py-3 text-sm outline-none focus:border-[#080808]" />
            </div>

            <button type="submit" className="w-full border border-[#080808] bg-[#080808] px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-[#f4f2ed]">
              Place Order
            </button>
          </form>

          <aside className="h-fit border border-[#080808]/10 bg-white p-6">
            <div className="mb-4 text-[10px] uppercase tracking-[0.35em] text-[#666]">Order Summary</div>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-3 border-b border-[#080808]/10 pb-3 last:border-none last:pb-0">
                  <img src={item.image} alt={item.name} className="h-20 w-16 object-cover" />
                  <div className="flex-1 text-sm">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-[#666]">{item.color} / {item.size}</div>
                  </div>
                  <div className="text-sm">{formatMoney(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-2">
              <input value={promo} onChange={(event) => setPromo(event.target.value)} placeholder="Promo code" className="flex-1 border border-[#080808]/10 bg-[#f4f2ed] px-3 py-3 text-sm outline-none focus:border-[#080808]" />
              <button type="button" onClick={() => setPromo("TEESAFAIRS10")} className="border border-[#080808] px-4 py-3 text-[10px] uppercase tracking-[0.2em]">Apply</button>
            </div>

            <div className="mt-6 space-y-3 text-sm text-[#3b3b3b]">
              <div className="flex items-center justify-between"><span>Subtotal</span><span>{formatMoney(subtotal)}</span></div>
              <div className="flex items-center justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatMoney(shipping)}</span></div>
              <div className="flex items-center justify-between"><span>Discount</span><span>-{formatMoney(discount)}</span></div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#080808]/10 pt-4 text-lg font-medium">
              <span>Total</span>
              <span>{formatMoney(total)}</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
