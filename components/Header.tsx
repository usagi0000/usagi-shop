"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { formatPrice, productHref, searchProducts, shopCatalog } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { BagIcon, SearchIcon, UserIcon } from "./Icons";
import { Logo } from "./Logo";
import { scrollToPageTop } from "@/lib/scroll-top";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/ui-icons", label: "UI Icons" },
  { href: "/custom-order", label: "Custom Order" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const path = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="header-scallop bg-cream text-ink">
          <div className="mx-auto flex max-w-page items-center justify-between gap-3 px-4 py-3 md:px-8">
            <Link href="/" scroll={false} onClick={scrollToPageTop} className="flex items-center gap-2 shrink-0">
              <Logo className="h-12 w-auto" preload />
              <span className="leading-tight">
                <span className="block font-display text-xl font-bold tracking-tight text-ink">
                  Usagi Art
                </span>
                <span className="font-script text-[15px] text-ink-soft">Art made with love</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-5 lg:flex" aria-label="Main">
              {NAV.map((item) => {
                const active = path === item.href || path.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    scroll={item.href === "/" ? false : undefined}
                    onClick={item.href === "/" ? scrollToPageTop : undefined}
                    className={`text-[15px] font-semibold transition-colors ${
                      active ? "text-pink-deep" : "text-ink hover:text-pink-deep"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="rounded-full p-2 text-ink hover:bg-cream-2"
              >
                <SearchIcon />
              </button>
              <Link href="/account" aria-label="Account" className="rounded-full p-2 text-ink hover:bg-cream-2">
                <UserIcon />
              </Link>
              <Link href="/cart" aria-label="Cart" className="relative rounded-full p-2 text-ink hover:bg-cream-2">
                <BagIcon />
                {count > 0 ? (
                  <span className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-pink-deep px-1 text-[10px] font-bold text-white">
                    {count}
                  </span>
                ) : null}
              </Link>
              <button
                type="button"
                className="ml-1 rounded-full p-2 lg:hidden"
                aria-label="Menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="block h-0.5 w-5 bg-ink" />
                <span className="mt-1 block h-0.5 w-5 bg-ink" />
                <span className="mt-1 block h-0.5 w-5 bg-ink" />
              </button>
            </div>
          </div>

          {open ? (
            <nav className="grid gap-1 px-4 pb-4 lg:hidden">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={item.href === "/" ? false : undefined}
                  onClick={() => {
                    if (item.href === "/") scrollToPageTop();
                    setOpen(false);
                  }}
                  className="rounded-xl px-3 py-2 font-semibold hover:bg-cream-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
        {searchOpen ? <SearchModal onClose={() => setSearchOpen(false)} /> : null}
      </header>
      <div className="h-[4.5rem]" aria-hidden />
    </>
  );
}

function SearchModal({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const id = useId();
  const hits = q.trim() ? searchProducts(q).slice(0, 8) : shopCatalog().slice(0, 5);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-ink/30 p-4 pt-24" onClick={onClose}>
      <div
        role="dialog"
        aria-labelledby={id}
        className="w-full max-w-lg rounded-3xl border border-line bg-cream-2 p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={id} className="sr-only">
          Search the shop
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/shop?q=${encodeURIComponent(q)}`);
            onClose();
          }}
        >
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search paintings…"
            className="w-full rounded-full border border-line bg-white px-4 py-3 text-ink outline-none focus:border-pink"
          />
        </form>
        <ul className="mt-3 divide-y divide-line">
          {hits.map((p) => (
            <li key={p.slug}>
              <Link
                href={productHref(p)}
                onClick={onClose}
                className="flex items-center justify-between gap-3 py-2.5 text-sm hover:text-pink-deep"
              >
                <span className="font-semibold">{p.name}</span>
                <span className="text-ink-soft">{p.price === 0 ? "Free" : formatPrice(p.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
