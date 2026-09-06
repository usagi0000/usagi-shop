"use client";

import { useState } from "react";
import { withBase } from "@/lib/paths";

export function WriteForm({ needPassword }: { needPassword: boolean }) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <form
      className="grid max-w-xl gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        if (pending) return;
        setError("");
        setPending(true);
        try {
          const res = await fetch(withBase("/api/blog"), {
            method: "POST",
            body: new FormData(e.currentTarget),
          });
          const json = (await res.json().catch(() => null)) as
            | { ok?: boolean; error?: string; slug?: string }
            | null;
          if (res.ok && json?.ok && json.slug) {
            window.location.assign(withBase(`/blog/${json.slug}`));
            return;
          }
          setError(json?.error || "Could not save just now. Try again.");
        } catch {
          setError("Could not save just now. Try again.");
        } finally {
          setPending(false);
        }
      }}
    >
      {needPassword ? (
        <label className="grid gap-1 text-sm font-semibold">
          Password
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="rounded-2xl border border-line bg-white px-3 py-2 font-normal"
          />
        </label>
      ) : null}
      <label className="grid gap-1 text-sm font-semibold">
        Title
        <input
          name="title"
          required
          maxLength={120}
          className="rounded-2xl border border-line bg-white px-3 py-2 font-normal"
        />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Short line <span className="font-normal text-ink-soft">(optional)</span>
        <input name="excerpt" maxLength={200} className="rounded-2xl border border-line bg-white px-3 py-2 font-normal" />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Note
        <textarea
          name="body"
          required
          rows={12}
          className="rounded-2xl border border-line bg-white px-3 py-2 font-normal"
        />
      </label>
      {error ? <p className="text-sm font-semibold text-pink-deep">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-pink py-3 font-bold text-white hover:bg-pink-deep disabled:opacity-60"
      >
        {pending ? "Saving…" : "Publish"}
      </button>
    </form>
  );
}
