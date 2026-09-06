"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, productHref, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { CartPlusIcon } from "./Icons";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const href = productHref(product);
  const digital = Boolean(product.buyUrl);
  const previews =
    product.category === "ui-icons"
      ? [product.image, ...(product.gallery ?? [])].filter(Boolean).slice(0, 4)
      : [];
  const collage = previews.length > 1;

  return (
    <article className="group overflow-hidden rounded-[22px] border border-line bg-card shadow-[0_1px_0_rgba(74,55,40,0.04)]">
      <Link href={href} className="block">
        <div className="relative aspect-square overflow-hidden bg-cream-2">
          {collage ? (
            <div className="grid h-full grid-cols-2 grid-rows-2 gap-1.5 p-3">
              {previews.map((src) => (
                <span key={src} className="relative min-h-0">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="12vw"
                    className="object-contain p-0.5 transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </span>
              ))}
            </div>
          ) : (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className={`${digital ? "object-contain p-4" : "object-cover"} transition-transform duration-300 group-hover:scale-[1.04]`}
            />
          )}
        </div>
      </Link>
      <div className="flex items-end justify-between gap-2 bg-[#fbf3e6] px-3 py-3">
        <div className="min-w-0">
          <Link href={href} className="block truncate text-sm font-bold text-ink">
            {product.name}
          </Link>
          <p className="text-sm text-ink-soft">{product.price === 0 ? "Free" : formatPrice(product.price)}</p>
        </div>
        {digital ? null : (
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => add(product.slug)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink text-white shadow-sm transition hover:bg-pink-deep"
          >
            <CartPlusIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </article>
  );
}
