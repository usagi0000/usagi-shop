import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { PageShell } from "@/components/PageShell";
import { Sparkle } from "@/components/Icons";
import { categories, productsByCategory } from "@/lib/data";

export const metadata: Metadata = { title: "UI Icons" };

export default function UiIconsPage() {
  const list = productsByCategory("ui-icons");
  const blurb = categories.find((c) => c.id === "ui-icons")?.blurb;

  if (list.length === 0) {
    return (
      <PageShell title="UI Icons" kicker="The stall" center>
        <Sparkle className="h-8 w-8 text-gold" />
        <p className="mt-3 font-script text-3xl text-pink-deep">Coming Soon</p>
        <p className="mt-3 max-w-xl text-ink-soft">
          New cute UI icons are being prepared with love ♥
        </p>
      </PageShell>
    );
  }

  return (
    <PageShell title="UI Icons" kicker="The stall">
      {blurb ? <p className="mb-6 max-w-xl text-ink-soft">{blurb}</p> : null}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </PageShell>
  );
}
