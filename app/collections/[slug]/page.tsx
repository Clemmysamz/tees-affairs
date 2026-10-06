import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { collectionList } from "@/data/storefront";
import { getCollectionMeta, getProductsByCollection } from "@/lib/products";

export function generateStaticParams() {
  return collectionList.map((collection) => ({ slug: collection.slug }));
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollectionMeta(slug);

  if (!collection) {
    notFound();
  }

  const products = getProductsByCollection(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-8 overflow-hidden border border-[#080808]/10 bg-white">
        <img src={collection.heroImage} alt={collection.title} className="h-[420px] w-full object-cover" />
      </div>

      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-[#666]">Collection</div>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">{collection.title.toUpperCase()}</h1>
        </div>
        <p className="max-w-2xl text-base text-[#4a4a4a]">{collection.description}</p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.25em] text-[#666]">
        <Link href="/shop" className="border border-[#080808]/10 px-3 py-2">Shop All</Link>
        <Link href="/collections/new-arrivals" className="border border-[#080808]/10 px-3 py-2">New Arrivals</Link>
        <Link href="/collections/essentials" className="border border-[#080808]/10 px-3 py-2">Essentials</Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {products.length ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <div className="col-span-full border border-[#080808]/10 bg-white p-10 text-center">
            <div className="text-[10px] uppercase tracking-[0.35em] text-[#666]">No products in this collection yet</div>
          </div>
        )}
      </div>
    </div>
  );
}
