"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/data";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, subtotal, clear, ready } = useCart();
  const router = useRouter();
  const [err, setErr] = useState("");

  if (!ready) return <div className="mx-auto max-w-xl px-4 py-10">Loading…</div>;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-10">
        <h1 className="font-display text-3xl font-bold">Checkout</h1>
        <p className="mt-4 text-ink-soft">
          Bag empty.{" "}
          <Link href="/shop" className="text-pink-deep">
            Shop first
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 md:px-8">
      <h1 className="font-display text-3xl font-bold">Checkout</h1>
      <p className="mt-2 text-sm text-ink-soft">Original acrylics. Shipping added after I pack the canvas.</p>
      <ul className="mt-6 space-y-1 text-sm">
        {items.map(({ product, qty }) => (
          <li key={product.slug} className="flex justify-between">
            <span>
              {product.name} × {qty}
            </span>
            <span>{formatPrice(product.price * qty)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 font-bold">Total {formatPrice(subtotal)} + shipping</p>
      <form
        className="mt-6 grid gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const email = (form.elements.namedItem("email") as HTMLInputElement).value;
          if (!email.includes("@")) {
            setErr("Need a real-looking email.");
            return;
          }
          const order = {
            id: `UA-${Date.now().toString(36).toUpperCase()}`,
            email,
            total: subtotal,
            items: items.map((i) => ({ slug: i.product.slug, qty: i.qty })),
            at: new Date().toISOString(),
          };
          localStorage.setItem("usagi-last-order", JSON.stringify(order));
          clear();
          router.push("/checkout/success");
        }}
      >
        <Field name="name" label="Name" required />
        <Field name="email" label="Email" type="email" required />
        <Field name="address" label="Address" required />
        <Field name="city" label="City" required />
        <Field name="country" label="Country" required />
        {err ? <p className="text-sm text-pink-deep">{err}</p> : null}
        <button type="submit" className="mt-2 rounded-full bg-pink py-3 font-bold text-white hover:bg-pink-deep">
          Place order
        </button>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-2xl border border-line bg-white px-3 py-2 font-normal outline-none focus:border-pink"
      />
    </label>
  );
}
