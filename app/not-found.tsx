import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="text-4xl" aria-hidden>
        🐰
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold">That shelf is empty</h1>
      <p className="mt-2 text-ink-soft">Page gone, or never existed.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-pink px-5 py-2 font-bold text-white">
        Back to the stall
      </Link>
    </div>
  );
}
