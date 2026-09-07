import { PageShell } from "@/components/PageShell";
import { WriteForm } from "./WriteForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Write a note" };

export default function WriteBlogPage() {
  const needPassword = Boolean(process.env.BLOG_PASSWORD);

  return (
    <PageShell title="Write a note" kicker="Blog" center>
      <p className="mb-6 max-w-xl text-sm text-ink-soft">
        Title, a short line, and the note. Optional image path such as{" "}
        <span className="font-semibold text-ink">/images/blog/my-drawing.jpg</span> — drop the file in{" "}
        <span className="font-semibold text-ink">public/images/blog/</span> first.
        {needPassword ? " Password is the one in BLOG_PASSWORD." : null}
      </p>
      <WriteForm needPassword={needPassword} />
    </PageShell>
  );
}
