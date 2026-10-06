import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 md:px-6">
      <div className="border border-[#080808]/10 bg-white p-8 text-center md:p-12">
        <div className="text-[10px] uppercase tracking-[0.35em] text-[#666]">Order confirmed</div>
        <h1 className="mt-4 font-display text-5xl md:text-6xl">THANK YOU.</h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-[#444]">
          Your order has been received and is now being prepared for dispatch. A confirmation email is on the way with tracking details.
        </p>
        <div className="mt-8 inline-flex border border-[#080808] bg-[#080808] px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-[#f4f2ed]">
          Order #VER-2048
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/shop" className="border border-[#080808] px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-[#080808]">Continue Shopping</Link>
          <Link href="/account" className="border border-[#080808]/10 bg-[#f4f2ed] px-5 py-3 text-[10px] uppercase tracking-[0.28em] text-[#080808]">View Account</Link>
        </div>
      </div>
    </div>
  );
}
