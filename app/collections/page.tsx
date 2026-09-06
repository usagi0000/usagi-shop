import { PageShell } from "@/components/PageShell";
import { collections } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Collections" };

export default function CollectionsPage() {
  return (
    <PageShell title="Explore Collections" kicker="Pick a mood">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c) => (
          <Link
            key={c.id}
            href={`/collections/${c.id}`}
            className="overflow-hidden rounded-[28px] border border-line bg-card"
          >
            <div className="relative aspect-[16/10]">
              <Image src={c.image} alt="" fill className="object-cover" sizes="33vw" />
            </div>
            <div className="px-5 py-4">
              <h2 className="font-display text-lg font-bold">{c.label}</h2>
              <p className="mt-1 text-sm text-ink-soft">{c.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
