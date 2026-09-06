import { Leaf, Sparkle } from "./Icons";
import { ProductCard } from "./ProductCard";
import { ShareButton } from "./ShareButton";
import { collections, products } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

const WHY = [
  {
    title: "Handmade with Love",
    text: "Every piece is painted by hand in acrylic.",
    icon: "heart",
  },
  {
    title: "Original canvas",
    text: "One-of-a-kind paintings. What you see is what ships.",
    icon: "shield",
  },
  {
    title: "Worldwide Shipping",
    text: "I ship originals with tracking. Write me if a parcel arrives bent.",
    icon: "globe",
  },
  {
    title: "Support Small Artist",
    text: "Thank you for supporting an independent painter.",
    icon: "bunny",
  },
];

export function HomeSections() {
  const featured = products.filter((p) => p.featured);

  return (
    <div className="mx-auto max-w-page px-4 pb-8 md:px-8">
      <section className="mt-8">
        <div className="mb-4 flex items-end gap-3">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
            <Sparkle className="h-3.5 w-3.5 text-gold" />
            <Sparkle className="h-2.5 w-2.5 text-gold" />
            Featured Pieces
          </h2>
          <div className="mb-2 h-px flex-1 bg-line" />
          <Link href="/shop" className="mb-1 shrink-0 text-sm font-semibold text-pink-deep hover:underline">
            View all →
          </Link>
          <Leaf className="mb-1 h-5 w-5" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="relative mt-10 overflow-hidden rounded-[28px] border border-line bg-[#efe3cf] px-4 py-8 md:px-8">
        <h2 className="mb-6 text-center font-display text-lg font-bold text-ink">
          Why shop with Usagi Art? <span aria-hidden>🌷</span>
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((item, i) => (
            <div key={item.title} className="relative px-3 text-center">
              {i > 0 ? (
                <span className="absolute top-6 -left-3 hidden h-[70%] w-px bg-line lg:block" />
              ) : null}
              <WhyIcon name={item.icon} />
              <h3 className="mt-3 font-display text-[15px] font-bold text-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-ink">
          Explore Collections
          <span className="text-base" aria-hidden>
            🌱
          </span>
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {collections.map((c) => (
            <Link
              key={c.id}
              href={`/collections/${c.id}`}
              className="group overflow-hidden rounded-[22px] border border-line bg-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>
              <div className="bg-[#fff8ea] py-3 text-center">
                <p className="text-sm font-semibold text-ink">{c.label}</p>
                <span className="text-ink-soft" aria-hidden>
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mt-10">
        <div className="h-16 sm:h-24 md:h-32" aria-hidden />
        <div className="relative rounded-[28px] border border-blue-deep/25 bg-blue">
          <div className="grid items-center gap-4 py-6 pr-36 pl-6 sm:pr-44 md:grid-cols-2 md:py-8 md:pr-56 md:pl-8 lg:pr-64">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo1.png"
                  alt=""
                  width={851}
                  height={1051}
                  className="h-14 w-auto shrink-0"
                />
                <div>
                  <h2 className="font-display text-xl font-bold text-[#2b4a6b]">Welcome</h2>
                  <p className="text-sm text-[#4d6a88]">
                    Acrylic paintings, works in progress, and finished pieces. I hope they bring a little joy to your
                    day.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/shop" className="rounded-xl bg-blue-deep px-4 py-2 text-sm font-bold text-white">
                  Shop paintings
                </Link>
                <Link
                  href="/custom-order"
                  className="rounded-xl bg-[#f7edd4] px-4 py-2 text-sm font-bold text-[#2b4a6b]"
                >
                  Custom order
                </Link>
              </div>
            </div>

            <div className="py-1 md:py-0">
              <h3 className="font-display font-bold text-[#2b4a6b]">The stall</h3>
              <p className="mt-2 text-sm text-[#4d6a88]">
                Add a canvas to the bag, check out here. I pack originals myself.
              </p>
              <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[11px] font-semibold text-[#2b4a6b]">
                <Link href="/shop" className="flex flex-col items-center gap-1">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-deep/40 bg-white">
                    ♡
                  </span>
                  Shop
                </Link>
                <Link href="/contact" className="flex flex-col items-center gap-1">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-deep/40 bg-white">
                    ✉
                  </span>
                  Newsletter
                </Link>
                <ShareButton />
                <Link href="/custom-order" className="flex flex-col items-center gap-1">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-deep/40 bg-white">
                    ★
                  </span>
                  Custom
                </Link>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute right-0 z-10 -top-16 h-52 w-36 sm:-top-24 sm:h-64 sm:w-40 md:top-auto md:bottom-0 md:h-[calc(100%+8rem)] md:w-56 lg:w-64">
            <Image
              src="/images/usagi.png"
              alt="Shopkeeper with a sketchbook and paintbrush"
              fill
              className="object-contain object-right-bottom"
              sizes="(max-width: 768px) 10rem, 16rem"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function WhyIcon({ name }: { name: string }) {
  if (name === "heart") {
    return (
      <svg viewBox="0 0 64 48" className="mx-auto h-12 w-16" aria-hidden>
        <path d="M32 40 C12 26 10 12 20 10 c6-1 10 4 12 8 c2-4 6-9 12-8 10 2 8 16-12 30 Z" fill="#f4b6b0" />
        <ellipse cx="40" cy="22" rx="10" ry="7" fill="#e8d5b0" stroke="#4a3728" strokeWidth="1" />
        <circle cx="36" cy="20" r="2" fill="#e07870" />
        <circle cx="42" cy="21" r="2" fill="#6b9bc4" />
        <circle cx="39" cy="25" r="2" fill="#8fbf84" />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg viewBox="0 0 48 48" className="mx-auto h-12 w-12" aria-hidden>
        <path d="M24 6 l16 6 v12 c0 10-8 16-16 20 C16 40 8 34 8 24 V12 Z" fill="#e8c56a" stroke="#4a3728" strokeWidth="1.2" />
        <path d="M24 16 l2 6 h6 l-5 4 2 6-5-3-5 3 2-6-5-4 h6 Z" fill="#fff8ea" />
      </svg>
    );
  }
  if (name === "globe") {
    return (
      <svg viewBox="0 0 48 48" className="mx-auto h-12 w-12" aria-hidden>
        <circle cx="24" cy="24" r="14" fill="#a8d4c4" stroke="#4a3728" strokeWidth="1.2" />
        <ellipse cx="24" cy="24" rx="6" ry="14" fill="none" stroke="#4a3728" strokeWidth="1" />
        <path d="M10 24 h28 M14 16 h20 M14 32 h20" stroke="#4a3728" strokeWidth="1" />
        <path d="M30 10 q14 8 10 22" fill="none" stroke="#6b9bc4" strokeWidth="1.6" />
      </svg>
    );
  }
  return (
    <Image
      src="/images/logo1.png"
      alt=""
      width={851}
      height={1051}
      className="mx-auto h-12 w-auto"
    />
  );
}
