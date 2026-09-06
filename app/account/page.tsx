import { PageShell } from "@/components/PageShell";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <PageShell title="Account" kicker="Orders and points later">
      <div className="max-w-md rounded-[28px] border border-line bg-card p-6">
        <p className="text-ink-soft">No login yet. Guest checkout works from the bag.</p>
        <form className="mt-5 grid gap-3">
          <label className="grid gap-1 text-sm font-semibold">
            Email
            <input type="email" placeholder="you@mail.com" className="rounded-2xl border border-line px-3 py-2 font-normal" />
          </label>
          <button type="button" className="rounded-full bg-pink py-2.5 font-bold text-white">
            Magic link (soon)
          </button>
        </form>
        <Link href="/shop" className="mt-4 inline-block text-sm font-semibold text-pink-deep">
          Keep shopping →
        </Link>
      </div>
    </PageShell>
  );
}
