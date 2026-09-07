"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { JourneyWork } from "@/lib/journey";
import { JOURNEY_WORKS } from "@/lib/journey";

export function JourneyLightbox({
  work,
  onClose,
  onPrev,
  onNext,
}: {
  work: JourneyWork;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const startX = useRef<number | null>(null);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onKey]);

  const i = JOURNEY_WORKS.findIndex((w) => w.slug === work.slug);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/70 p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="journey-light-title"
    >
      <button
        type="button"
        className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-cream text-lg font-bold text-ink hover:bg-white"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      <button
        type="button"
        className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-xl font-bold text-ink hover:bg-white sm:flex"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous"
      >
        ←
      </button>
      <button
        type="button"
        className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-xl font-bold text-ink hover:bg-white sm:flex"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next"
      >
        →
      </button>
      <div
        className="flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-auto rounded-[22px] border border-line bg-cream-2 shadow-xl sm:flex-row"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          startX.current = e.changedTouches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = startX.current;
          const end = e.changedTouches[0]?.clientX;
          startX.current = null;
          if (start == null || end == null) return;
          const dx = end - start;
          if (dx > 56) onPrev();
          if (dx < -56) onNext();
        }}
      >
        <div className="relative min-h-[50dvh] flex-1 bg-[#f3e6d4] sm:min-h-[80dvh]">
          <Image src={work.src} alt={work.title} fill sizes="90vw" className="object-contain p-3" priority unoptimized />
        </div>
        <div className="w-full shrink-0 p-5 sm:w-72 sm:overflow-y-auto">
          {work.badge ? <p className="font-script text-lg text-pink-deep">{work.badge}</p> : null}
          <h2 id="journey-light-title" className="font-display text-2xl font-bold text-ink">
            {work.title}
          </h2>
          <p className="mt-1 text-sm text-ink-soft">{work.category}</p>
          {work.dateLabel ? <p className="mt-1 text-sm text-ink-soft">{work.dateLabel}</p> : null}
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{work.description}</p>
          <p className="mt-4 text-xs text-ink-soft">
            {i + 1} / {JOURNEY_WORKS.length}
          </p>
          <div className="mt-4 flex gap-2 sm:hidden">
            <button
              type="button"
              className="flex-1 rounded-full border border-line bg-white py-2 text-sm font-bold"
              onClick={onPrev}
            >
              ← Prev
            </button>
            <button
              type="button"
              className="flex-1 rounded-full border border-line bg-white py-2 text-sm font-bold"
              onClick={onNext}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
