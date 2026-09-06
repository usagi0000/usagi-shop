"use client";

import type { ReactNode } from "react";
import { ProductCard } from "@/components/ProductCard";
import { PageShell } from "@/components/PageShell";
import { collections, searchProducts, shopCatalog } from "@/lib/data";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function ShopCatalog() {
  const sp = useSearchParams();
  const q = sp.get("q") ?? undefined;
  const collection = sp.get("collection") ?? undefined;
  let list = q ? searchProducts(q) : shopCatalog();

  if (collection && collections.some((c) => c.id === collection)) {
    list = list.filter((p) => p.collection === collection);
  }

  const heading = q
    ? `Search: ${q}`
    : (collections.find((c) => c.id === collection)?.label ?? "All products");

  return (
    <PageShell title={heading} kicker="The stall">
      <div className="mb-6 flex flex-wrap gap-2">
        <Chip href="/shop" active={!collection && !q}>
          All
        </Chip>
        {collections.map((c) => (
          <Chip key={c.id} href={`/shop?collection=${c.id}`} active={collection === c.id}>
            {c.label}
          </Chip>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="text-ink-soft">Nothing here yet. Try another shelf.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </PageShell>
  );
}

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3 py-1 text-sm font-semibold ${
        active ? "border-pink bg-pink text-white" : "border-line bg-card text-ink hover:border-pink"
      }`}
    >
      {children}
    </Link>
  );
}
