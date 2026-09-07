import { getJourneyWork, JOURNEY_WORKS } from "@/lib/journey";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamicParams = false;

export function generateStaticParams() {
  return JOURNEY_WORKS.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getJourneyWork(slug);
  return { title: work?.title ?? "Artwork" };
}

export default async function JourneyWorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getJourneyWork(slug);
  if (!work) notFound();
  const i = JOURNEY_WORKS.findIndex((w) => w.slug === work.slug);
  const prev = JOURNEY_WORKS[(i - 1 + JOURNEY_WORKS.length) % JOURNEY_WORKS.length];
  const next = JOURNEY_WORKS[(i + 1) % JOURNEY_WORKS.length];

  return (
    <div className="mx-auto max-w-page px-4 py-8 md:px-8">
      <p className="mb-4 text-sm text-ink-soft">
        <Link href="/blog" className="hover:text-pink-deep">
          Blog
        </Link>{" "}
        / {work.title}
      </p>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="relative min-h-[70vw] overflow-hidden rounded-[22px] border border-line bg-[#f6ead8] sm:min-h-[32rem]">
          <Image src={work.src} alt={work.title} fill sizes="90vw" className="object-contain p-3" priority unoptimized />
        </div>
        <div>
          {work.badge ? <p className="font-script text-lg text-pink-deep">{work.badge}</p> : null}
          <h1 className="font-display text-3xl font-bold text-ink">{work.title}</h1>
          <p className="mt-2 text-sm text-ink-soft">{work.category}</p>
          {work.dateLabel ? <p className="mt-1 text-sm text-ink-soft">{work.dateLabel}</p> : null}
          <p className="mt-4 leading-relaxed text-ink-soft">{work.description}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href={`/blog/${prev.slug}`}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold hover:border-pink"
            >
              ← {prev.title}
            </Link>
            <Link
              href={`/blog/${next.slug}`}
              className="rounded-full bg-pink px-4 py-2 text-sm font-bold text-white hover:bg-pink-deep"
            >
              {next.title} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
