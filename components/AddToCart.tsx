"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";

export function AddToCart({ slug }: { slug: string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <label className="flex items-center gap-2 text-sm font-semibold">
        Qty
        <input
          type="number"
          min={1}
          max={20}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          className="w-16 rounded-full border border-line bg-white px-3 py-2 text-center"
        />
      </label>
      <button
        type="button"
        onClick={() => {
          add(slug, qty);
          setAdded(true);
        }}
        className="rounded-full bg-pink px-6 py-2.5 font-bold text-white hover:bg-pink-deep"
      >
        Add to cart
      </button>
      {added ? (
        <span className="text-sm font-semibold text-blue-deep">In the bag.</span>
      ) : null}
    </div>
  );
}
