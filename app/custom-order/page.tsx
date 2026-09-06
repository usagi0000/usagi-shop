"use client";

import { CanvasSizePreview } from "@/components/CanvasSizePreview";
import { parseOrder, sendCustomOrder } from "@/lib/custom-order";
import { useEffect, useRef, useState } from "react";

export default function CustomOrderPage() {
  const [width, setWidth] = useState("30");
  const [height, setHeight] = useState("40");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const okRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!sent) return;
    okRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSent(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sent]);

  return (
    <div className="mx-auto max-w-page px-4 py-10 md:px-8">
      <form
        ref={formRef}
        className="grid items-start gap-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-12"
        onSubmit={async (e) => {
          e.preventDefault();
          if (sending) return;
          setError("");
          const data = new FormData(e.currentTarget);
          setSending(true);
          try {
            const order = parseOrder({
              name: data.get("name"),
              email: data.get("email"),
              paint: data.get("paint"),
              budget: data.get("budget"),
              width: data.get("canvasWidth"),
              height: data.get("canvasHeight"),
            });
            if (!order) {
              setError("Need name, email, painting, and canvas size.");
              return;
            }
            await sendCustomOrder(order);
            formRef.current?.reset();
            setWidth("30");
            setHeight("40");
            setSent(true);
          } catch {
            setError("Could not send just now. Try again.");
          } finally {
            setSending(false);
          }
        }}
      >
        <div>
          <p className="font-script text-lg text-pink-deep">Tell me the picture in your head</p>
          <h1 className="font-display text-3xl font-bold text-ink">Custom order</h1>
          <p className="mt-3 mb-6 max-w-xl text-ink-soft">
            Pets, quiet landscapes, Ghibli-inspired homage (not official posters). Lead time three to five weeks.
          </p>
          <div className="grid max-w-lg gap-3">
            <label className="grid gap-1 text-sm font-semibold">
              Name
              <input
                name="name"
                required
                autoComplete="name"
                className="rounded-2xl border border-line bg-white px-3 py-2 font-normal"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Email
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="rounded-2xl border border-line bg-white px-3 py-2 font-normal"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              What should I paint?
              <textarea
                name="paint"
                required
                rows={5}
                className="rounded-2xl border border-line bg-white px-3 py-2 font-normal"
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Budget
              <select name="budget" className="rounded-2xl border border-line bg-white px-3 py-2 font-normal">
                <option>$40–$80 small original</option>
                <option>$80–$150 original</option>
                <option>$150+ larger piece</option>
              </select>
            </label>
            {error ? <p className="text-sm font-semibold text-pink-deep">{error}</p> : null}
            <button
              type="submit"
              disabled={sending}
              className="mt-2 rounded-full bg-pink py-3 font-bold text-white hover:bg-pink-deep disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send request"}
            </button>
          </div>
        </div>
        <CanvasSizePreview
          width={width}
          height={height}
          onWidthChange={setWidth}
          onHeightChange={setHeight}
        />
      </form>

      {sent ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/35 p-4"
          onClick={() => setSent(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-sent-title"
            className="w-full max-w-sm rounded-[28px] border border-line bg-cream-2 px-6 py-7 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-script text-2xl text-pink-deep">Thank you ♡</p>
            <h2 id="request-sent-title" className="mt-1 font-display text-2xl font-bold text-ink">
              Request sent
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Your custom order is on its way. I will write you soon about the piece.
            </p>
            <button
              ref={okRef}
              type="button"
              className="mt-5 rounded-full bg-pink px-8 py-2.5 font-bold text-white hover:bg-pink-deep"
              onClick={() => setSent(false)}
            >
              OK
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
