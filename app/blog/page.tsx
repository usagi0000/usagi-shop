import { PageShell } from "@/components/PageShell";
import { formatBlogDate, listPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await listPosts();

  return (
    <PageShell title="Studio notes" kicker="Blog" center>
      <p className="mb-6">
        <Link href="/blog/write" className="text-sm font-semibold text-pink-deep hover:underline">
          Write a note →
        </Link>
      </p>
      {posts.length === 0 ? (
        <p className="text-ink-soft">No notes yet. Write the first one.</p>
      ) : (
        <ul className="grid w-full max-w-2xl gap-4 text-left">
          {posts.map((post) => (
            <li key={post.slug} className="rounded-[22px] border border-line bg-card p-5">
              <p className="text-xs text-ink-soft">{formatBlogDate(post.date)}</p>
              <Link href={`/blog/${post.slug}`} className="font-display text-xl font-bold hover:text-pink-deep">
                {post.title}
              </Link>
              <p className="mt-1 text-sm text-ink-soft">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
