"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

type Order = { id: string; email: string; total: number };

function subscribe() {
  return () => {};
}

function read(): Order | null {
  try {
    const raw = localStorage.getItem("usagi-last-order");
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}

export default function SuccessPage() {
  const order = useSyncExternalStore(subscribe, read, () => null);

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <p className="text-4xl" aria-hidden>
        🐰
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold">Thank you</h1>
      <p className="mt-3 text-ink-soft">
        {order
          ? `Order ${order.id} is in for ${order.email}. I will write you to confirm packing and shipping.`
          : "Order recorded. I will write you to confirm packing and shipping."}
      </p>
      <Link href="/shop" className="mt-6 inline-block rounded-full bg-pink px-6 py-2.5 font-bold text-white">
        Back to shop
      </Link>
    </div>
  );
}
