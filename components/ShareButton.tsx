"use client";

import { useState } from "react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.origin;
    const payload = {
      title: "Usagi Art",
      text: "Cute handmade paintings from UsagiArt ♡",
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        return;
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void share()}
      aria-label="Share with friends"
      className="flex flex-col items-center gap-1 text-center text-[11px] font-semibold text-[#2b4a6b]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-deep/40 bg-white">
        ↗
      </span>
      {copied ? "Copied" : "Share"}
    </button>
  );
}
