"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { formatPrice, productHref } from "@/lib/data";

export default function CartPage() {
  const { items, setQty, remove, subtotal, ready } = useCart();

  if (!ready) {
    return <div className="mx-auto max-w-page px-4 py-10">Loading bag…</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-8">
      <h1 className="font-display text-3xl font-bold">Your bag</h1>
      {items.length === 0 ? (
        <p className="mt-6 text-ink-soft">
          Empty. The stall is open.{" "}
          <Link href="/shop" className="font-semibold text-pink-deep">
            Go browse
          </Link>
          .
        </p>
      ) : (
        <>
          <ul className="mt-6 divide-y divide-line">
            {items.map(({ product, qty }) => (
              <li key={product.slug} className="flex gap-4 py-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-line">
                  <Image src={product.image} alt="" fill className="object-cover" sizes="96px" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={productHref(product)} className="font-bold hover:text-pink-deep">
                    {product.name}
                  </Link>
                  <p className="text-sm text-ink-soft">{formatPrice(product.price)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <label className="text-sm">
                      Qty{" "}
                      <input
                        type="number"
                        min={1}
                        value={qty}
                        onChange={(e) => setQty(product.slug, Number(e.target.value) || 1)}
                        className="w-14 rounded-full border border-line px-2 py-1 text-center"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => remove(product.slug)}
                      className="text-sm font-semibold text-pink-deep hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between">
            <p className="font-bold">Subtotal {formatPrice(subtotal)}</p>
            <Link
              href="/checkout"
              className="rounded-full bg-pink px-6 py-2.5 font-bold text-white hover:bg-pink-deep"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
