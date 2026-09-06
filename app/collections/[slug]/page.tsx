import { ProductCard } from "@/components/ProductCard";
import { PageShell } from "@/components/PageShell";
import { collections, getCollection, productsByCollection } from "@/lib/data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: getCollection(slug)?.label ?? "Collection" };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const col = getCollection(slug);
  if (!col) notFound();
  const list = productsByCollection(col.id);

  return (
    <PageShell title={col.label} kicker="Collection">
      <p className="mb-6 max-w-xl text-ink-soft">{col.blurb}</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </PageShell>
  );
}
