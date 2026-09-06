"use client";

import { PageShell } from "@/components/PageShell";
import { useState } from "react";

export default function ContactPage() {
  const [done, setDone] = useState(false);

  return (
    <PageShell title="Contact" kicker="Questions, shipping, love letters">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3 text-sm text-ink-soft">
          <p>
            <strong className="text-ink">Shipping.</strong> I post originals with tracking, flat with a backing
            board.
          </p>
          <p>
            <strong className="text-ink">Returns.</strong> Damaged in the post? Photo me. I send another. Changed
            your mind on an original? Write within 14 days, unused, and we talk.
          </p>
        </div>
        {done ? (
          <p className="font-semibold text-blue-deep">Got it. I will write back.</p>
        ) : (
          <form
            className="grid gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <label className="grid gap-1 text-sm font-semibold">
              Name
              <input required className="rounded-2xl border border-line bg-white px-3 py-2 font-normal" />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Email
              <input type="email" required className="rounded-2xl border border-line bg-white px-3 py-2 font-normal" />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Message
              <textarea required rows={5} className="rounded-2xl border border-line bg-white px-3 py-2 font-normal" />
            </label>
            <button type="submit" className="rounded-full bg-pink py-3 font-bold text-white hover:bg-pink-deep">
              Send
            </button>
          </form>
        )}
      </div>
    </PageShell>
  );
}
