import { JourneyGallery } from "@/components/JourneyGallery";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-page overflow-x-hidden px-4 py-8 md:px-8 md:py-10">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">Blog</h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          A little collection of the drawings, characters and paintings that have been part of my artistic journey.
        </p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
          From pencil sketches and manga-inspired drawings to colorful marker illustrations and painted scenes, these
          artworks capture different moments of my journey as an artist.
        </p>
        <p className="mt-3 font-script text-xl text-pink-deep">draw • create • imagine ♡</p>
      </header>
      <JourneyGallery />
    </div>
  );
}
