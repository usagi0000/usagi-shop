import { PageShell } from "@/components/PageShell";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <PageShell title="About me" kicker="UsagiArt" center>
      <div className="max-w-2xl space-y-4 leading-relaxed text-ink-soft">
        <p className="font-display text-lg font-bold text-ink">
          Just a girl who loves turning cute ideas into art. ♡
        </p>
        <p>
          Welcome to <strong className="text-ink">UsagiArt</strong>, my little corner where I share the things I love
          to create.
        </p>
        <p>
          I love drawing and painting cute little things — from animals and food to cozy scenes, characters, and
          everyday objects. I mostly work with acrylics, but I also enjoy creating digital art and illustrations.
        </p>
        <p>
          Everything here is made by me, from the first sketch to the finished piece. I don&apos;t do human portraits,
          but if you have a cute idea, a character, or a reference that you&apos;d love to see turned into art, you can
          always ask!
        </p>
        <p>
          You&apos;ll find original paintings, finished pieces, works in progress, and custom creations here. I
          carefully pack every order myself and hope each little piece brings some joy to its new home. ♡
        </p>
        <p>Have something specific in mind?</p>
        <p>
          <Link href="/custom-order" className="font-semibold text-pink-deep">
            Custom orders
          </Link>{" "}
          are open in small batches. You can share an idea, a reference, or simply tell me the kind of cute thing
          you&apos;d like — and we&apos;ll create something from there.
        </p>
        <p>Thank you for being here and supporting my little art journey.</p>
        <p>Every order, message, and visit means more than you know. 🌷</p>
      </div>
    </PageShell>
  );
}
