"use client";

import { useId, useState } from "react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  const emailId = useId();

  if (done) {
    return <p className="mt-3 text-sm font-semibold text-blue-deep">You are on the list. Thank you.</p>;
  }

  return (
    <form
      className="mt-3 flex min-w-0 flex-col gap-2 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label className="sr-only" htmlFor={emailId}>
        Email
      </label>
      <input
        id={emailId}
        type="email"
        required
        placeholder="Your email"
        className="min-w-0 flex-1 rounded-full border border-ink/40 bg-white px-4 py-2 text-sm outline-none focus:border-pink"
      />
      <button
        type="submit"
        className="rounded-full bg-pink px-4 py-2 text-sm font-bold text-white hover:bg-pink-deep"
      >
        Subscribe
      </button>
    </form>
  );
}
