"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { JourneyWork } from "@/lib/journey";
import { JOURNEY_SECTIONS, JOURNEY_WORKS } from "@/lib/journey";
import { JourneyLightbox } from "./JourneyLightbox";

function spanClass(size: JourneyWork["size"]) {
  if (size === "large") return "col-span-6";
  if (size === "medium") return "col-span-6 sm:col-span-3";
  return "col-span-3";
}

function heightClass(size: JourneyWork["size"]) {
  if (size === "large") return "min-h-[22rem] sm:min-h-[34rem]";
  if (size === "medium") return "min-h-[18rem] sm:min-h-[24rem]";
  return "min-h-[14rem] sm:min-h-[18rem]";
}

export function JourneyGallery() {
  const [open, setOpen] = useState<string | null>(null);
  const current = useMemo(() => JOURNEY_WORKS.find((w) => w.slug === open) ?? null, [open]);

  useEffect(() => {
    const fromHash = window.location.hash.replace(/^#/, "");
    if (fromHash && JOURNEY_WORKS.some((w) => w.slug === fromHash)) {
      setOpen(fromHash);
    }
  }, []);

  function shift(dir: number) {
    if (!current) return;
    const i = JOURNEY_WORKS.findIndex((w) => w.slug === current.slug);
    const next = (i + dir + JOURNEY_WORKS.length) % JOURNEY_WORKS.length;
    setOpen(JOURNEY_WORKS[next].slug);
  }

  return (
    <>
      {JOURNEY_SECTIONS.map((section) => (
        <section
          key={section.id}
          className={`mt-12 journey-fade ${
            section.tone === "digital"
              ? "rounded-[28px] border border-blue-deep/20 bg-blue/35 px-4 py-8 md:px-6"
              : section.tone === "sketch"
                ? "rounded-[28px] border border-dashed border-line bg-[#fbf3e6] px-4 py-8 md:px-6"
                : ""
          }`}
        >
          <h2 className="font-display text-xl font-bold text-ink md:text-2xl">{section.heading}</h2>
          {section.description ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">{section.description}</p> : null}
          <div className="mt-6 grid grid-cols-6 gap-3 sm:gap-4">
            {section.works.map((work, i) => (
              <button
                key={work.slug}
                type="button"
                id={work.slug}
                onClick={() => setOpen(work.slug)}
                className={`journey-card group text-left ${spanClass(work.size)} ${
                  work.size === "small" && i % 2 === 1 ? "sm:rotate-[0.5deg]" : ""
                } ${work.size === "small" && i % 2 === 0 ? "sm:-rotate-[0.5deg]" : ""}`}
              >
                <article
                  className={`overflow-hidden rounded-[22px] border border-line bg-card shadow-[0_2px_10px_rgba(74,55,40,0.06)] ${
                    work.size === "small" ? "journey-print" : ""
                  }`}
                >
                  <div className={`relative ${heightClass(work.size)} bg-[#f6ead8]`}>
                    <Image
                      src={work.src}
                      alt={work.title}
                      fill
                      sizes={work.size === "large" ? "90vw" : "(max-width: 768px) 100vw, 50vw"}
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03] sm:p-3"
                      unoptimized
                    />
                  </div>
                  <div className="bg-[#fbf3e6] px-3 py-3 sm:px-4">
                    {work.badge ? <p className="font-script text-base text-pink-deep">{work.badge}</p> : null}
                    <h3 className="font-display text-base font-bold text-ink sm:text-lg">{work.title}</h3>
                    <p className="mt-0.5 text-xs text-ink-soft sm:text-sm">
                      {work.category}
                      {work.dateLabel ? ` · ${work.dateLabel}` : ""}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{work.description}</p>
                  </div>
                </article>
              </button>
            ))}
          </div>
        </section>
      ))}
      {current ? (
        <JourneyLightbox work={current} onClose={() => setOpen(null)} onPrev={() => shift(-1)} onNext={() => shift(1)} />
      ) : null}
    </>
  );
}
