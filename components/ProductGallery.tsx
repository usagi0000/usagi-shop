"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  name,
  images,
}: {
  name: string;
  images: string[];
}) {
  const [active, setActive] = useState(0);
  const src = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-[28px] border border-line bg-card">
        <Image
          src={src}
          alt={name}
          fill
          className="object-contain p-3"
          sizes="50vw"
          preload
        />
      </div>
      {images.length > 1 ? (
        <div className="mt-3 flex gap-2">
          {images.map((img, idx) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(idx)}
              aria-label={`${name} photo ${idx + 1}`}
              aria-pressed={idx === active}
              className={`relative h-16 w-16 overflow-hidden rounded-2xl border ${
                idx === active ? "border-pink ring-1 ring-pink" : "border-line"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
