import { PageShell } from "@/components/PageShell";
import { WriteForm } from "./WriteForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Write a note" };

export default function WriteBlogPage() {
  const needPassword = Boolean(process.env.BLOG_PASSWORD);

  return (
    <PageShell title="Write a note" kicker="Blog" center>
      <p className="mb-6 max-w-xl text-sm text-ink-soft">
        Title + text. Shows on the blog after you publish.
        {needPassword ? " Password is the one in BLOG_PASSWORD." : null}
      </p>
      <WriteForm needPassword={needPassword} />
    </PageShell>
  );
}
