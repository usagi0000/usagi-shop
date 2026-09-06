import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyNow } from "@/components/BuyNow";
import { PageShell } from "@/components/PageShell";
import { Sparkle } from "@/components/Icons";
import { listAdamIconsGrouped } from "@/lib/adam-icons";
import { getProduct, productsByCategory } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return productsByCategory("ui-icons").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product?.name ?? "UI Icons" };
}

export default async function UiIconProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.category !== "ui-icons") notFound();

  const groups = listAdamIconsGrouped();
  const icons = groups.flatMap((group) => group.srcs);

  if (icons.length === 0) {
    return (
      <PageShell title={product.name} kicker="UI Icons" center>
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
      <p className="mb-6 text-sm text-ink-soft">
        <Link href="/ui-icons" className="hover:text-pink-deep">
          UI Icons
        </Link>{" "}
        / {product.name}
      </p>
      <article className="grid items-start gap-8 md:grid-cols-2">
        <div className="rounded-[28px] border border-line bg-[#fff8ec] p-5 shadow-[0_1px_0_rgba(74,55,40,0.04)] md:p-6">
          <div className="flex flex-col gap-5">
            {groups.map((group) => (
              <div key={group.label}>
                <h3 className="mb-2 font-script text-lg text-pink-deep">{group.label}</h3>
                <ul className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                  {group.srcs.map((src) => (
                    <li key={src} className="relative aspect-square">
                      <Image src={src} alt="" fill sizes="12vw" className="object-contain" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">{product.name}</h2>
          <p className="mt-2 text-ink-soft">Complete UI icon set</p>
          <p className="mt-4 max-w-md leading-relaxed text-ink-soft">{product.description}</p>
          {product.facts?.length ? (
            <ul className="mt-5 space-y-1.5 text-sm text-ink-soft">
              {product.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          ) : null}
          <div className="mt-6">
            <BuyNow slug={product.slug} href={product.buyUrl ?? "/checkout"} />
          </div>
        </div>
      </article>
    </PageShell>
  );
}
