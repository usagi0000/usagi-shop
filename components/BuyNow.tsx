"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { withBase } from "@/lib/paths";

function isDownload(href: string) {
  return href.includes("/download") || href.endsWith(".zip");
}

export function BuyNow({ slug, href = "/checkout" }: { slug: string; href?: string }) {
  const { add } = useCart();
  const external = /^https?:/i.test(href);
  const download = isDownload(href);
  const label = download ? "Download ♡" : "Buy Now ♡";
  const className =
    "inline-flex items-center justify-center rounded-full bg-pink px-6 py-2.5 font-bold text-white shadow-sm transition hover:bg-pink-deep";

  if (external || download) {
    return (
      <a
        className={className}
        href={external ? href : withBase(href)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        if (href === "/checkout" || href.startsWith("/checkout?")) add(slug);
      }}
    >
      {label}
    </Link>
  );
}
